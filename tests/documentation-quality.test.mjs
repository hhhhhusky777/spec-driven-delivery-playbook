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

test("project adoption architecture remains connected to runbook and manifest", async () => {
  const readme = await readFile(path.join(REPOSITORY_ROOT, "README.md"), "utf8");
  const runbook = await readFile(
    path.join(REPOSITORY_ROOT, "docs", "project-adoption-runbook.md"),
    "utf8",
  );
  const manifest = await readFile(
    path.join(
      REPOSITORY_ROOT,
      "templates",
      "adoption",
      "project-adoption-manifest.md",
    ),
    "utf8",
  );
  const agentTrigger = await readFile(
    path.join(
      REPOSITORY_ROOT,
      "templates",
      "adoption",
      "agent-adoption-trigger.md",
    ),
    "utf8",
  );
  const templateCatalog = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "README.md"),
    "utf8",
  );

  assert.match(readme, /^## Project adoption architecture$/m);
  assert.match(readme, /^## Contents$/m);
  assert.match(readme, /^## How to use$/m);
  assert.match(readme, /\[First-time project adoption\]\(#first-time-project-adoption\)/);
  assert.match(readme, /\[Deliver future needs\]\(#deliver-future-needs\)/);
  assert.match(readme, /\[`install-sdd\.sh`\]\(install-sdd\.sh\)/);
  assert.match(readme, /generated `\.sdd-runtime\/agent-guide\.md` exactly/);
  assert.match(readme, /docs\/project-adoption-runbook\.md/);
  assert.match(readme, /templates\/adoption\/project-adoption-manifest\.md/);
  assert.match(readme, /^### Deliver future needs$/m);
  assert.match(readme, /^### Use this playbook for this repository$/m);
  assert.match(runbook, /^## 2\. Authority and conflict gate$/m);
  assert.match(runbook, /Upstream playbook changes never overwrite/);
  assert.match(runbook, /^## 5\. Executable integration sequence$/m);
  assert.match(runbook, /\.sdd-runtime\/agent-guide\.md/);
  assert.match(runbook, /^### Step 7 — Re-enter for future deliveries$/m);
  assert.match(runbook, /project-adoption-manifest\.md/);
  assert.match(runbook, /target project root as its working directory/);
  assert.match(runbook, /machine-specific playbook locator at runtime/);
  assert.match(runbook, /Neither the manifest nor agent searches the filesystem/);
  assert.match(runbook, /^## 8\. Pilot one real delivery$/m);
  assert.match(runbook, /^## 11\. Playbook updates and drift$/m);
  assert.match(runbook, /`EXAMPLE_REVIEWED` is the\s+terminal state/);
  assert.match(manifest, /\| Playbook revision \| `<immutable commit or release>` \|/);
  assert.match(manifest, /\| Playbook source repository \|/);
  assert.match(manifest, /\| Runtime playbook locator contract \|/);
  assert.match(manifest, /^## 5\. Adoption routing manifest$/m);
  assert.match(manifest, /^## 9\. Pilot delivery$/m);
  assert.match(manifest, /^## 10\. Adoption review$/m);
  assert.match(manifest, /BLOCKED \/ EXAMPLE_REVIEWED/);
  assert.match(manifest, /\| Allowed write scope \|/);
  assert.match(manifest, /\| Required documentation checks \|/);
  assert.match(agentTrigger, /^## Prompt A — Bootstrap discovery$/m);
  assert.match(agentTrigger, /^## Prompt B — Continue one adoption action$/m);
  assert.match(agentTrigger, /^## Prompt C — Initialize the empty solution whiteboard$/m);
  assert.match(agentTrigger, /Do not request, infer, or record a need/);
  assert.match(agentTrigger, /\| Execution working directory \|/);
  assert.match(agentTrigger, /<PLAYBOOK_RUNTIME_LOCATOR>/);
  assert.match(agentTrigger, /make no edit and report `BLOCKED`/);
  assert.match(agentTrigger, /Do not advance Adoption state/);
  assert.match(templateCatalog, /adoption\/project-adoption-manifest\.md/);
  assert.match(templateCatalog, /\[`install-sdd\.sh`\]\(\.\.\/install-sdd\.sh\)/);
});

test("installer guide and repository skills preserve the adoption boundary", async () => {
  const installer = await readFile(path.join(REPOSITORY_ROOT, "install-sdd.sh"), "utf8");
  const adoptionSkill = await readFile(
    path.join(REPOSITORY_ROOT, "skills", "sdd-project-adoption", "SKILL.md"),
    "utf8",
  );
  const workflowSkill = await readFile(
    path.join(REPOSITORY_ROOT, "skills", "sdd-project-workflow", "SKILL.md"),
    "utf8",
  );
  const whiteboard = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "discovery", "solution-whiteboard.md"),
    "utf8",
  );
  const developmentPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "policies", "development-policy.md"),
    "utf8",
  );
  const deliveryWorkflow = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "workflows", "sdd-delivery-workflow.md"),
    "utf8",
  );

  assert.match(installer, /Required skill/);
  assert.match(installer, /Resolved revision/);
  assert.match(installer, /Ownership marker/);
  assert.match(installer, /Follow %s exactly/);
  assert.doesNotMatch(installer, /^\s*- Next action:/m);
  assert.match(adoptionSkill, /After recorded authority moves the manifest to `INSTALLED`/);
  assert.match(adoptionSkill, /do not\s+infer a need/);
  assert.match(workflowSkill, /project-owned solution whiteboard/);
  assert.match(workflowSkill, /\*\*`EMPTY`:\*\*/);
  assert.match(workflowSkill, /\*\*`CONCLUDED`:\*\*/);
  assert.match(workflowSkill, /\*\*`ARCHIVED`:\*\*/);
  assert.match(workflowSkill, /Do not\s+overwrite it or admit a second need/);
  assert.match(whiteboard, /`EMPTY`: installation is ready/);
  assert.match(whiteboard, /Only one need may own a stable working-whiteboard path/);
  assert.match(developmentPolicy, /Permit only one need in each stable working-whiteboard path/);
  assert.match(deliveryWorkflow, /stable project working-whiteboard path is replaced/);
});

test("SGLang example demonstrates automated adoption through an empty whiteboard", async () => {
  const exampleRoot = path.join(
    REPOSITORY_ROOT,
    "examples",
    "project-adoption",
    "sglang",
  );
  const walkthrough = await readFile(path.join(exampleRoot, "README.md"), "utf8");
  const bootstrap = await readFile(
    path.join(exampleRoot, "00-bootstrap-prompt.md"),
    "utf8",
  );
  const manifest = await readFile(
    path.join(exampleRoot, "01-project-adoption-manifest.md"),
    "utf8",
  );
  const entrypoint = await readFile(
    path.join(exampleRoot, "02-project-entrypoint.md"),
    "utf8",
  );
  const generatedGuide = await readFile(
    path.join(exampleRoot, "06-generated-agent-guide.md"),
    "utf8",
  );
  const installationPrompt = await readFile(
    path.join(exampleRoot, "05-installation-prompt.md"),
    "utf8",
  );

  assert.match(walkthrough, /d315eb725044e435b146c85488b7c6d9222f7fec/);
  assert.match(walkthrough, /\.\/install-sdd\.sh --revision/);
  assert.match(walkthrough, /Follow \.sdd-runtime\/agent-guide\.md exactly/);
  assert.match(walkthrough, /generated guide is the only prompt/);
  assert.match(walkthrough, /\.github\/spec-driven-delivery\/project-adoption-manifest\.md/);
  assert.match(walkthrough, /changes no SGLang\s+repository/);
  assert.match(bootstrap, /update only\s+\.github\/spec-driven-delivery\/project-adoption-manifest\.md/);
  assert.match(bootstrap, /keep Adoption state as DISCOVERY/);
  assert.match(bootstrap, /Execution working directory: PROJECT_ROOT_FROM_STEP_1/);
  assert.match(bootstrap, /Read-only playbook root: PLAYBOOK_ROOT_FROM_STEP_1/);
  assert.match(bootstrap, /Do not search for or guess another playbook checkout/);
  assert.match(manifest, /\| Adoption state \| `REVIEW` \|/);
  assert.match(manifest, /\| Runtime playbook locator contract \|/);
  assert.match(manifest, /Orientation-CD\/spec-driven-delivery-playbook\.git/);
  assert.match(manifest, /`ACTIVE` is prohibited/);
  assert.match(entrypoint, /^## Use the solution whiteboard$/m);
  assert.match(entrypoint, /^## Runtime source binding$/m);
  assert.match(installationPrompt, /Perform exactly one Next action/);
  assert.match(installationPrompt, /PLAYBOOK_ROOT_FROM_STEP_1\/docs\/project-adoption-runbook\.md/);
  assert.match(installationPrompt, /Do not advance the Adoption state/);
  assert.match(generatedGuide, /Required skill.*`sdd-project-adoption`/s);
  assert.match(generatedGuide, /Do not request or infer a product need/);
  assert.match(generatedGuide, /solution-whiteboard\.md/);
  assert.match(walkthrough, /grants no authority to install or discuss a real SGLang need/);
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
