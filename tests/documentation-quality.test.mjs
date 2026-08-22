import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  REPOSITORY_ROOT,
  checkLocalLinks,
  checkMarkdownContent,
  checkSensitiveContent,
  extractMarkdownLinks,
  fetchWithRetry,
  parseFencedBlocks,
} from "../scripts/documentation-quality.mjs";
import { validateMermaidBlocks } from "../scripts/check-mermaid.mjs";

const CONFIG = {
  templateRoots: ["templates"],
  placeholderAllowlist: [],
  localPathAllowlist: [],
  externalLinkExclusions: [],
  externalLinks: {
    concurrency: 2,
    timeoutMs: 100,
    retries: 0,
    userAgent: "documentation-quality-test",
  },
};

async function temporaryDirectory(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "playbook-doc-test-"));
  t.after(async () => rm(directory, { recursive: true, force: true }));
  return directory;
}

test("blocking Markdown formatting check rejects invalid Markdown", async (t) => {
  const directory = await temporaryDirectory(t);
  const invalid = path.join(directory, "invalid.md");
  await writeFile(invalid, "plain text without a heading\n", "utf8");
  const executable = path.join(
    REPOSITORY_ROOT,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "markdownlint-cli2.cmd" : "markdownlint-cli2",
  );
  const result = spawnSync(
    executable,
    ["--config", path.join(REPOSITORY_ROOT, ".markdownlint-cli2.jsonc"), invalid],
    { cwd: REPOSITORY_ROOT, encoding: "utf8" },
  );
  assert.equal(result.error, undefined, "markdownlint must be executable");
  assert.notEqual(result.status, 0, "invalid Markdown must fail markdownlint");
  assert.match(`${result.stdout}\n${result.stderr}`, /MD041/);
});

test("blocking local-link check rejects missing files and headings", async (t) => {
  const directory = await temporaryDirectory(t);
  const source = path.join(directory, "source.md");
  const target = path.join(directory, "target.md");
  await writeFile(target, "# Existing heading\n", "utf8");
  await writeFile(
    source,
    "# Source\n\n[missing](missing.md) and [heading](target.md#absent-heading)\n",
    "utf8",
  );
  const diagnostics = await checkLocalLinks([source], directory);
  assert.deepEqual(
    diagnostics.map((item) => item.rule).sort(),
    ["LOCAL_ANCHOR", "LOCAL_LINK"],
  );
});

test("local-link checks support repository-root targets and malformed encodings", async (t) => {
  const directory = await temporaryDirectory(t);
  const docs = path.join(directory, "docs");
  await mkdir(docs);
  const source = path.join(docs, "source.md");
  await writeFile(path.join(directory, "README.md"), "# Root\n", "utf8");
  await writeFile(source, "# Source\n\n[root](/README.md#root)\n[bad](%ZZ.md)\n", "utf8");
  const diagnostics = await checkLocalLinks([source], directory);
  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0]?.rule, "LOCAL_LINK");
  assert.match(diagnostics[0]?.message || "", /invalid encoding/);
});

test("blocking fence check rejects an unclosed code fence", () => {
  const { diagnostics } = parseFencedBlocks("# Document\n\n```text\nnot closed\n");
  assert.equal(diagnostics[0]?.rule, "UNBALANCED_FENCE");
});

test("blocking placeholder check rejects unresolved tokens outside templates", () => {
  const placeholder = "<" + "project owner>";
  const diagnostics = checkMarkdownContent("docs/example.md", `# Example\n\n${placeholder}\n`, CONFIG);
  assert.equal(diagnostics[0]?.rule, "PLACEHOLDER");
  assert.deepEqual(
    checkMarkdownContent("templates/example.md", `# Template\n\n${placeholder}\n`, CONFIG),
    [],
  );
});

test("placeholder checks permit standard HTML and Markdown autolinks", () => {
  const text = "# Example\n\n<strong>Important</strong> <https://example.com>\n";
  assert.deepEqual(checkMarkdownContent("docs/example.md", text, CONFIG), []);
});

test("blocking sensitive-content check rejects likely committed secrets", () => {
  const accessKey = "AKIA" + "ABCDEFGHIJKLMNOP";
  const diagnostics = checkSensitiveContent("docs/example.md", `key=${accessKey}\n`, CONFIG);
  assert.equal(diagnostics[0]?.rule, "LIKELY_SECRET");
});

test("blocking local-path check rejects private workstation paths", () => {
  const localPath = "/" + "Users/example/private/design.md";
  const diagnostics = checkSensitiveContent("docs/example.md", `See ${localPath}\n`, CONFIG);
  assert.equal(diagnostics[0]?.rule, "LOCAL_PATH");
});

test("blocking Mermaid check accepts valid syntax and rejects invalid syntax", async (t) => {
  const directory = await temporaryDirectory(t);
  const valid = path.join(directory, "valid.md");
  const invalid = path.join(directory, "invalid.md");
  await writeFile(valid, "# Valid\n\n```mermaid\nflowchart LR\n  A --> B\n```\n", "utf8");
  await writeFile(invalid, "# Invalid\n\n```mermaid\nnot-a-diagram A --> B\n```\n", "utf8");
  assert.deepEqual(await validateMermaidBlocks([valid], directory), []);
  const diagnostics = await validateMermaidBlocks([invalid], directory);
  assert.equal(diagnostics[0]?.rule, "MERMAID_SYNTAX");
});

test("link extraction supports inline, image, and reference targets", () => {
  const links = extractMarkdownLinks(
    "[inline](guide.md)\n![image](image.png)\n[reference]: https://example.com\n",
  );
  assert.deepEqual(
    links.map((item) => item.target),
    ["guide.md", "image.png", "https://example.com"],
  );
});

test("link extraction ignores examples inside fenced code", () => {
  const links = extractMarkdownLinks(
    "# Example\n\n```markdown\n[example](missing.md)\n```\n\n[real](guide.md)\n",
  );
  assert.deepEqual(links.map((item) => item.target), ["guide.md"]);
});

test("valid fenced blocks preserve language, content, and source line", () => {
  const { blocks, diagnostics } = parseFencedBlocks(
    "# Example\n\n```mermaid\nflowchart LR\n  A --> B\n```\n",
  );
  assert.deepEqual(diagnostics, []);
  assert.equal(blocks[0]?.language, "mermaid");
  assert.equal(blocks[0]?.startLine, 3);
  assert.match(blocks[0]?.content || "", /A --> B/);
});

test("attention gate remains connected to policy, project template, and PR review", async () => {
  const policy = await readFile(
    path.join(REPOSITORY_ROOT, "docs", "documentation-quality-policy.md"),
    "utf8",
  );
  const strategy = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "testing", "test-strategy.md"),
    "utf8",
  );
  const pullRequest = await readFile(
    path.join(REPOSITORY_ROOT, ".github", "pull_request_template.md"),
    "utf8",
  );

  assert.match(policy, /^### 2\.6 Attention and reviewability gate$/m);
  assert.match(policy, /A reviewer must not approve from the map alone\./);
  assert.match(strategy, /^#### Attention and reviewability gate$/m);
  assert.match(strategy, /Split an artifact or change/);
  assert.match(pullRequest, /^## Reviewer attention map$/m);
  assert.match(pullRequest, /independent\s+inventory of the complete diff/);
});

test("task context receipt remains a READY-to-IN_PROGRESS gate", async () => {
  const developmentPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "policies", "development-policy.md"),
    "utf8",
  );
  const implementationPlan = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "delivery", "implementation-plan.md"),
    "utf8",
  );
  const pullRequest = await readFile(
    path.join(REPOSITORY_ROOT, ".github", "pull_request_template.md"),
    "utf8",
  );
  const workedExample = await readFile(
    path.join(
      REPOSITORY_ROOT,
      "examples",
      "parallel-provider-submissions",
      "04-implementation-plan.md",
    ),
    "utf8",
  );

  assert.match(developmentPolicy, /^### 9\.1 Pre-start task context receipt$/m);
  assert.match(developmentPolicy, /`READY -> IN_PROGRESS` is prohibited/);
  assert.match(developmentPolicy, /mark the receipt `STALE`/);
  assert.match(implementationPlan, /^### 6\.4 Pre-start task context receipt gate$/m);
  assert.match(implementationPlan, /\| Context source revision \|/);
  assert.match(implementationPlan, /\| Review disposition \|/);
  assert.match(pullRequest, /approved, current pre-start\s+context receipt/);
  assert.match(workedExample, /All task context receipts remain `NOT_STARTED`\./);
});

test("external-link checks dispose response bodies before returning status", async () => {
  let cancelCalls = 0;
  const result = await fetchWithRetry(
    "https://example.test/reference",
    CONFIG.externalLinks,
    async () => ({
      status: 204,
      body: {
        cancel: async () => {
          cancelCalls += 1;
        },
      },
    }),
  );

  assert.deepEqual(result, { ok: true, status: 204 });
  assert.equal(cancelCalls, 1);
});
