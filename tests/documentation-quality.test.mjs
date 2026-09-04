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
  collectFiles,
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

test("README leads with value and groups details into reader-oriented chapters", async () => {
  const readme = await readFile(path.join(REPOSITORY_ROOT, "README.md"), "utf8");
  const levelTwoHeadings = [...readme.matchAll(/^## (.+)$/gm)].map((match) => match[1]);

  assert.match(readme, /^# Spec-Driven Delivery Playbook$/m);
  assert.match(readme, /Turn an uncertain request into a reviewable product change/i);
  assert.deepEqual(levelTwoHeadings, [
    "What the playbook gives you",
    "Contents",
    "Understand the delivery model",
    "Adopt and use the playbook",
    "Choose the delivery route and artifacts",
    "Deliver safely",
    "Evolve and verify governance",
    "References",
  ]);
  for (const capability of [
    "Guided project adoption",
    "Solution whiteboarding",
    "Spec-driven routing",
    "Two-agent review sessions",
    "Controlled automation",
    "Versioned upgrades",
  ]) {
    assert.match(readme, new RegExp(`\\| ${capability} \\|`));
  }
  assert.match(readme, /^### Try it in a project$/m);
  assert.match(readme, /\.\/install-sdd\.sh/);
  assert.match(readme, /^### The core idea$/m);
  assert.match(readme, /^### How to use$/m);
  assert.match(readme, /^### Risk-based review gates$/m);
  assert.match(readme, /^### Documentation quality and tests$/m);
});

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
  const text = "# Example\n\n<strong>Important</strong> <https://example.com>\n\n`ACTIVE <-> PAUSED`\n";
  assert.deepEqual(checkMarkdownContent("docs/example.md", text, CONFIG), []);
});

test("anchor checks support duplicate GitHub headings and encoded fragments", async (t) => {
  const directory = await temporaryDirectory(t);
  const source = path.join(directory, "source.md");
  const target = path.join(directory, "target.md");
  await writeFile(target, "# Café state\n\n## Repeat\n\n## Repeat\n", "utf8");
  await writeFile(
    source,
    "# Source\n\n[first](target.md#caf%C3%A9-state) [duplicate](target.md#repeat-1)\n",
    "utf8",
  );
  assert.deepEqual(await checkLocalLinks([source], directory), []);
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

test("intentional Red remains transient across task and merge boundaries", async () => {
  const testStrategy = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "testing", "test-strategy.md"),
    "utf8",
  );
  const developmentPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "policies", "development-policy.md"),
    "utf8",
  );
  const implementationPlan = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "delivery", "implementation-plan.md"),
    "utf8",
  );
  const pullRequestPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "policies", "pull-request-policy.md"),
    "utf8",
  );

  assert.match(testStrategy, /^### Red closure and contract-first sequencing$/m);
  assert.match(testStrategy, /Red is transient diagnostic evidence, not a completed deliverable/);
  assert.match(testStrategy, /return to Green before the task becomes\s+`DONE`/);
  assert.match(testStrategy, /mark the unavailable behavior or interface `PROPOSED`/);
  assert.match(testStrategy, /passing static document, schema, example, or compatibility validation/);
  assert.match(testStrategy, /failing runtime behavioral test in the consuming\s+implementation task/);
  assert.match(developmentPolicy, /close the canonical test strategy's Red-Green cycle/);
  assert.match(implementationPlan, /test strategy's Red closure boundary is satisfied/);
  assert.match(pullRequestPolicy, /canonical test strategy's Red closure boundary is satisfied/);
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
      "project-adoption",
      "sglang",
      "delivery-api-key-redaction",
      "04-implementation-plan.md",
    ),
    "utf8",
  );

  assert.match(developmentPolicy, /^### 9\.2 Pre-start task context receipt$/m);
  assert.match(developmentPolicy, /`READY -> IN_PROGRESS` is prohibited/);
  assert.match(developmentPolicy, /mark the receipt `STALE`/);
  assert.match(implementationPlan, /^### 6\.4 Pre-start task context receipt gate$/m);
  assert.match(implementationPlan, /\| Context source revision \|/);
  assert.match(implementationPlan, /\| Receipt candidate revision \|/);
  assert.match(implementationPlan, /\| Self-review state \/ evidence \|/);
  assert.match(implementationPlan, /\| Fresh-context review state \/ revision \/ receipt \|/);
  assert.match(implementationPlan, /\| Human review state \/ revision \/ evidence \|/);
  assert.match(implementationPlan, /\| Final receipt disposition \|/);
  assert.match(pullRequest, /approved, current pre-start\s+context receipt/);
  assert.match(workedExample, /All task context receipts remain `NOT_STARTED`\./);
});

test("complete task specifications preserve engineering discretion", async () => {
  const developmentPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "policies", "development-policy.md"),
    "utf8",
  );
  const implementationPlan = await readFile(
    path.join(REPOSITORY_ROOT, "templates", "delivery", "implementation-plan.md"),
    "utf8",
  );
  const workflowSkill = await readFile(
    path.join(REPOSITORY_ROOT, "skills", "sdd-project-workflow", "SKILL.md"),
    "utf8",
  );
  const calibrationGuide = await readFile(
    path.join(REPOSITORY_ROOT, "docs", "task-specification-calibration.md"),
    "utf8",
  );

  assert.match(
    developmentPolicy,
    /implement it without\s+inventing or changing product or system behavior/,
  );
  assert.match(developmentPolicy, /contract-equivalent internal\s+engineering choices/);
  assert.match(implementationPlan, /canonical source boundary/);
  assert.match(implementationPlan, /exact current\s+revision/);
  assert.match(workflowSkill, /ordinary internal engineering choices/i);
  assert.match(calibrationGuide, /^## 1\. Framework-only task/m);
  assert.match(calibrationGuide, /^## 2\. Complete bounded task/m);
  assert.match(calibrationGuide, /^## 3\. High-risk migration task/m);
  assert.match(calibrationGuide, /^## 4\. Detailed but behaviorally ambiguous task/m);
});

test("project adoption proves policy conformance before reuse", async () => {
  const read = (relativePath) =>
    readFile(path.join(REPOSITORY_ROOT, relativePath), "utf8");
  const [
    readme,
    runbook,
    manifest,
    trigger,
    skill,
    catalog,
    workflow,
    pullRequestPolicy,
  ] = await Promise.all([
    read("README.md"),
    read("docs/project-adoption-runbook.md"),
    read("templates/adoption/project-adoption-manifest.md"),
    read("templates/adoption/agent-adoption-trigger.md"),
    read("skills/sdd-project-adoption/SKILL.md"),
    read("templates/README.md"),
    read("templates/workflows/sdd-delivery-workflow.md"),
    read("templates/policies/pull-request-policy.md"),
  ]);

  for (const document of [
    readme,
    runbook,
    manifest,
    trigger,
    skill,
    catalog,
    workflow,
    pullRequestPolicy,
  ]) {
    assert.match(document, /decision-level\s+conformance/i);
    assert.match(document, /UPDATE_EXISTING/);
  }

  for (const document of [readme, runbook, manifest, trigger, skill, catalog, pullRequestPolicy]) {
    assert.match(document, /reviewed exception/i);
  }

  assert.match(runbook, /^### PR and branch policy conformance$/m);
  assert.match(runbook, /^### Policy-family conformance inventory$/m);
  assert.match(runbook, /Development and delivery/);
  assert.match(runbook, /Testing and quality/);
  assert.match(runbook, /Documentation and API contracts/);
  assert.match(runbook, /Security, data, concurrency, and performance/);
  assert.match(runbook, /Release, operations, and incident response/);
  assert.match(runbook, /Specialized policies/);
  assert.match(runbook, /task PR targets and final integration PR target/i);
  assert.match(runbook, /merge.*archive/i);
  assert.match(
    runbook,
    /must update that canonical artifact instead of creating a\s+duplicate/i,
  );
  assert.match(manifest, /^### Policy conformance audit$/m);
  assert.match(manifest, /Policy family/);
  assert.match(manifest, /Development and delivery/);
  assert.match(manifest, /Testing and quality/);
  assert.match(manifest, /Documentation and API contracts/);
  assert.match(manifest, /Security, data, concurrency, and performance/);
  assert.match(manifest, /Release, operations, and incident response/);
  assert.match(manifest, /Specialized policies/);
  assert.match(manifest, /Required decision or obligation/);
  assert.match(manifest, /Existing project evidence/);
  assert.match(manifest, /Gap, equivalent control, or exception/);
  assert.match(trigger, /Do not infer conformance from file existence/i);
  assert.match(trigger, /do not create a duplicate\s+policy/i);
  assert.match(skill, /Do not silently copy a playbook default/i);
  assert.match(skill, /never create a parallel or replacement policy/i);
});

test("increment boundaries use self-contained delivery instead of LOC limits", async () => {
  const paths = [
    "README.md",
    "templates/policies/development-policy.md",
    "templates/policies/pull-request-policy.md",
    "templates/delivery/implementation-plan.md",
    "examples/project-adoption/sglang/delivery-api-key-redaction/04-implementation-plan.md",
    "examples/project-adoption/sglang/03-development-policy.md",
  ];
  const documents = await Promise.all(
    paths.map((relativePath) =>
      readFile(path.join(REPOSITORY_ROOT, relativePath), "utf8"),
    ),
  );
  const combined = documents.join("\n");

  assert.doesNotMatch(combined, /\b300\b/);
  assert.doesNotMatch(combined, /\bLOC\b/);
  assert.match(combined, /smallest coherent, self-contained increment/i);
  assert.match(combined, /reviewed, validated, and merged independently/i);
  assert.match(combined, /must not rely on unmerged follow-up work/i);
  assert.match(combined, /may depend on already merged prerequisites/i);
  assert.match(
    combined,
    /leav(?:e|es|ing) the integration target (working|buildable)/i,
  );
});

test("risk-based review gates permit bounded audited auto-continuation", async () => {
  const read = (relativePath) =>
    readFile(path.join(REPOSITORY_ROOT, relativePath), "utf8");
  const [
    readme,
    developmentPolicy,
    testStrategy,
    workflow,
    adoptionManifest,
    adoptionTrigger,
    workflowSkill,
    adoptionSkill,
    workedExample,
  ] = await Promise.all([
    read("README.md"),
    read("templates/policies/development-policy.md"),
    read("templates/testing/test-strategy.md"),
    read("templates/workflows/sdd-delivery-workflow.md"),
    read("templates/adoption/project-adoption-manifest.md"),
    read("templates/adoption/agent-adoption-trigger.md"),
    read("skills/sdd-project-workflow/SKILL.md"),
    read("skills/sdd-project-adoption/SKILL.md"),
    read("examples/project-adoption/sglang/delivery-api-key-redaction/03-delivery-workflow.md"),
  ]);
  const connected = [
    readme,
    developmentPolicy,
    testStrategy,
    workflow,
    adoptionManifest,
    adoptionTrigger,
    workflowSkill,
    adoptionSkill,
    workedExample,
  ];

  for (const document of connected) {
    assert.match(document, /EXPLICIT_REVIEW/);
    assert.match(document, /AUTO_CONTINUE/);
    assert.match(document, /REVIEW_ON_EXCEPTION/);
    assert.match(document, /fail(?:s)? closed/i);
  }

  assert.match(developmentPolicy, /^### Risk-based review and continuation$/m);
  assert.match(developmentPolicy, /default review mode is `EXPLICIT_REVIEW`/i);
  assert.match(developmentPolicy, /must not introduce a new semantic decision/i);
  assert.match(workflow, /^### 1\.2 Review and automation protocol$/m);
  assert.match(workflow, /^### 9\.1 Action control ledger$/m);
  assert.match(workflow, /^### 9\.3 Automation audit ledger$/m);
  assert.match(workflow, /`AUTO_CONTINUED` is not an approval/i);
  assert.match(testStrategy, /^### Automated-continuation gate validation$/m);
  assert.match(
    workflowSkill,
    /continue only until the next mandatory\s+semantic checkpoint/i,
  );
  assert.match(
    adoptionSkill,
    /continue only through the approved\s+automation boundary/i,
  );
  assert.match(workedExample, /^### Risk-based action control$/m);
  assert.match(workedExample, /^### Automation audit ledger$/m);
});

test("multi-task deliveries isolate work on feature integration branches", async () => {
  const read = (relativePath) =>
    readFile(path.join(REPOSITORY_ROOT, relativePath), "utf8");
  const [
    readme,
    pullRequestPolicy,
    developmentPolicy,
    implementationPlan,
    adoptionRunbook,
    workflowSkill,
    workedExample,
  ] = await Promise.all([
    read("README.md"),
    read("templates/policies/pull-request-policy.md"),
    read("templates/policies/development-policy.md"),
    read("templates/delivery/implementation-plan.md"),
    read("docs/project-adoption-runbook.md"),
    read("skills/sdd-project-workflow/SKILL.md"),
    read("examples/project-adoption/sglang/delivery-api-key-redaction/04-implementation-plan.md"),
  ]);

  assert.match(readme, /^### Branch isolation for parallel deliveries$/m);
  assert.match(pullRequestPolicy, /^### Single-task delivery$/m);
  assert.match(pullRequestPolicy, /^### Multi-task feature integration$/m);
  assert.doesNotMatch(pullRequestPolicy, /^### Optional: epic integration branch$/m);
  assert.match(pullRequestPolicy, /task branches -> reviewed task PRs -> feature integration branch/);
  assert.match(pullRequestPolicy, /final validated reviewed PR -> protected branch/);
  assert.match(pullRequestPolicy, /must not target the\s+protected branch/i);
  assert.match(pullRequestPolicy, /Source branch and PR target/);
  assert.match(developmentPolicy, /multi-task delivery uses a\s+delivery-specific feature integration branch/i);
  assert.match(implementationPlan, /Delivery implementation task count/);
  assert.match(implementationPlan, /Feature integration branch/);
  assert.match(implementationPlan, /Task PR target/);
  assert.match(implementationPlan, /Final PR target/);
  assert.match(adoptionRunbook, /single-task and multi-task branch\s+models/i);
  assert.match(workflowSkill, /verify the task branch starts from and the task\s+PR targets the feature integration branch/i);
  assert.match(workedExample, /Multi-task feature integration/);
  assert.match(workedExample, /task PRs\s+target the feature integration branch/i);
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

  assert.match(readme, /^### Project adoption architecture$/m);
  assert.match(readme, /^## Contents$/m);
  assert.match(readme, /^### How to use$/m);
  assert.match(readme, /\[First-time project adoption\]\(#first-time-project-adoption\)/);
  assert.match(readme, /\[Upgrade an installed project\]\(#upgrade-an-installed-project\)/);
  assert.match(readme, /\[Review and resume adoption\]\(#review-and-resume-adoption\)/);
  assert.match(readme, /\[Deliver future needs\]\(#deliver-future-needs\)/);
  assert.match(readme, /\[`install-sdd\.sh`\]\(install-sdd\.sh\)/);
  assert.match(readme, /generated `\.sdd-runtime\/agent-guide\.md` exactly/);
  assert.match(readme, /docs\/project-adoption-runbook\.md/);
  assert.match(readme, /templates\/adoption\/project-adoption-manifest\.md/);
  assert.match(readme, /^#### Review and resume adoption$/m);
  assert.match(readme, /pre-approved,\s+fail-closed automation boundary/);
  assert.match(readme, /Stop at the next explicit checkpoint or exception/);
  assert.match(readme, /Record affected artifacts as\s+`STALE`/);
  assert.match(readme, /Stable entry points reference the\s+manifest for live adoption status/);
  assert.match(readme, /For the initial bootstrap-manifest approval, use `NONE`/);
  assert.match(readme, /Use `DISCOVERY -> MAPPED` only after/);
  assert.match(readme, /Before recording the first need, replace the completed adoption runtime/);
  assert.match(readme, /new guide detects `INSTALLED`, selects `sdd-project-workflow`/);
  assert.match(readme, /^#### Deliver future needs$/m);
  assert.match(readme, /^#### Use this playbook for this repository$/m);
  assert.match(runbook, /^## 2\. Authority and conflict gate$/m);
  assert.match(runbook, /Upstream playbook changes never overwrite/);
  assert.match(runbook, /^## 5\. Executable integration sequence$/m);
  assert.match(runbook, /\.sdd-runtime\/agent-guide\.md/);
  assert.match(runbook, /^### Step 7 — Re-enter for future deliveries$/m);
  assert.match(runbook, /project-adoption-manifest\.md/);
  assert.match(runbook, /target project root as its working directory/);
  assert.match(runbook, /machine-specific playbook locator at runtime/);
  assert.match(runbook, /Neither the manifest nor agent searches the filesystem/);
  assert.match(runbook, /freshness register/);
  assert.match(runbook, /no applicable `STALE` or `BLOCKED` artifact/);
  assert.match(runbook, /installing\s+that checker marks the entry point `STALE`/);
  assert.match(runbook, /^#### Runtime handoff from adoption to delivery$/m);
  assert.match(runbook, /A `PENDING` adoption\s+guide is reusable only while adoption work remains/);
  assert.match(runbook, /^## 8\. Pilot one real delivery$/m);
  assert.match(runbook, /^## 11\. Playbook updates and drift$/m);
  assert.match(runbook, /\.\/install-sdd\.sh --upgrade/);
  assert.match(runbook, /does\s+not prove semantic compatibility/);
  assert.match(runbook, /`EXAMPLE_REVIEWED` is the\s+terminal state/);
  assert.match(manifest, /\| Playbook revision \| `<immutable commit or release>` \|/);
  assert.match(manifest, /\| Playbook source repository \|/);
  assert.match(manifest, /\| Runtime playbook locator contract \|/);
  assert.match(manifest, /^## 5\. Adoption routing manifest$/m);
  assert.match(manifest, /^### Artifact impact and freshness register$/m);
  assert.match(manifest, /Final installation verification is blocked/);
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
  assert.match(agentTrigger, /record every affected artifact as STALE/);
  assert.match(agentTrigger, /for `EXPLICIT_REVIEW`, keep independent review/);
  assert.match(agentTrigger, /do not update a newly stale artifact in this invocation/);
  assert.match(agentTrigger, /^## Adoption-to-workflow runtime handoff$/m);
  assert.match(agentTrigger, /\.\/install-sdd\.sh --cleanup/);
  assert.match(agentTrigger, /If a verified current guide already\s+selects `sdd-project-workflow`, reuse it/);
  assert.match(templateCatalog, /adoption\/project-adoption-manifest\.md/);
  assert.match(templateCatalog, /adoption\/playbook-upgrade-assessment\.md/);
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
  assert.match(installer, /## Runtime replacement/);
  assert.match(installer, /Follow %s exactly/);
  assert.doesNotMatch(installer, /^\s*- Next action:/m);
  assert.match(adoptionSkill, /After recorded authority moves the manifest to `INSTALLED`/);
  assert.match(adoptionSkill, /Record affected artifacts as\s+`STALE`/);
  assert.match(adoptionSkill, /require every applicable freshness\s+entry to be `CURRENT`/);
  assert.match(adoptionSkill, /do not admit a need through a\s+guide that selects this adoption skill/);
  assert.match(adoptionSkill, /new\s+guide selects `sdd-project-workflow`/);
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

test("upgrade mode preserves the active pin until reviewed validation and cutover", async () => {
  const installer = await readFile(path.join(REPOSITORY_ROOT, "install-sdd.sh"), "utf8");
  const readme = await readFile(path.join(REPOSITORY_ROOT, "README.md"), "utf8");
  const runbook = await readFile(
    path.join(REPOSITORY_ROOT, "docs/project-adoption-runbook.md"),
    "utf8",
  );
  const skill = await readFile(
    path.join(REPOSITORY_ROOT, "skills/sdd-playbook-upgrade/SKILL.md"),
    "utf8",
  );
  const assessment = await readFile(
    path.join(REPOSITORY_ROOT, "templates/adoption/playbook-upgrade-assessment.md"),
    "utf8",
  );
  const example = await readFile(
    path.join(
      REPOSITORY_ROOT,
      "examples/project-adoption/sglang/07-playbook-upgrade-assessment.md",
    ),
    "utf8",
  );

  for (const content of [readme, runbook, skill, assessment, example]) {
    assert.match(content, /current (?:revision|pin)|previous pin/i);
    assert.match(content, /candidate revision|immutable candidate/i);
    assert.match(content, /fresh-context (?:approval|review)/i);
    assert.match(content, /human (?:approval|review)/i);
    assert.match(content, /cutover/i);
    assert.match(content, /rollback|restore/i);
  }
  assert.match(installer, /--upgrade/);
  assert.match(installer, /merge-base --is-ancestor/);
  assert.match(installer, /sdd-playbook-upgrade/);
  assert.match(installer, /playbook-upgrade-guide\.md/);
  assert.match(installer, /upgrade is allowed only between tasks/);
  assert.match(skill, /Record `SELF_REVIEW_PASSED` only when every assertion is supported/);
  assert.match(skill, /Never approve the assessment you generated/);
  assert.match(skill, /task is `IN_PROGRESS` or `VERIFYING`/);
  assert.match(assessment, /ACCEPT.*ADAPT.*REJECT.*NOT_APPLICABLE/s);
  assert.match(assessment, /The manifest's\s+current revision remains authoritative/);
});

test("SGLang example demonstrates automated adoption through an empty whiteboard", async () => {
  const exampleRoot = path.join(
    REPOSITORY_ROOT,
    "examples",
    "project-adoption",
    "sglang",
  );
  const walkthrough = await readFile(path.join(exampleRoot, "README.md"), "utf8");
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
  const deliveryWalkthrough = await readFile(
    path.join(exampleRoot, "delivery-api-key-redaction", "README.md"),
    "utf8",
  );
  const deliveryWorkflow = await readFile(
    path.join(exampleRoot, "delivery-api-key-redaction", "03-delivery-workflow.md"),
    "utf8",
  );
  const deliveryPlan = await readFile(
    path.join(exampleRoot, "delivery-api-key-redaction", "04-implementation-plan.md"),
    "utf8",
  );
  const upgradeExample = await readFile(
    path.join(exampleRoot, "07-playbook-upgrade-assessment.md"),
    "utf8",
  );

  assert.match(walkthrough, /d315eb725044e435b146c85488b7c6d9222f7fec/);
  assert.match(walkthrough, /\.\/install-sdd\.sh --revision/);
  assert.match(walkthrough, /Follow \.sdd-runtime\/agent-guide\.md exactly/);
  assert.match(walkthrough, /generated guide is the only prompt/);
  assert.match(walkthrough, /\.github\/spec-driven-delivery\/project-adoption-manifest\.md/);
  assert.match(walkthrough, /changes no SGLang\s+repository/);
  assert.match(manifest, /\| Adoption state \| `REVIEW` \|/);
  assert.match(manifest, /\| Runtime playbook locator contract \|/);
  assert.match(manifest, /hhhhhusky777\/spec-driven-delivery-playbook\.git/);
  assert.match(manifest, /^### Policy conformance audit$/m);
  assert.match(manifest, /^### Artifact impact and freshness register$/m);
  assert.match(manifest, /`ACTIVE` is prohibited/);
  assert.match(entrypoint, /^## Use the solution whiteboard$/m);
  assert.match(entrypoint, /^## Runtime source binding$/m);
  assert.match(generatedGuide, /Required skill.*`sdd-project-adoption`/s);
  const installer = await readFile(path.join(REPOSITORY_ROOT, "install-sdd.sh"), "utf8");
  const generatorVersion = installer.match(/^GENERATOR_VERSION="([^"]+)"$/m)?.[1];
  assert.ok(generatorVersion, "installer must declare its generator version");
  assert.match(generatedGuide, new RegExp(`Generator version.*\`${generatorVersion}\``, "s"));
  assert.match(generatedGuide, /Generator schema version.*`2`/s);
  assert.match(generatedGuide, /\.\/install-sdd\.sh --cleanup/);
  assert.match(generatedGuide, /\.\/install-sdd\.sh --validate/);
  assert.match(generatedGuide, /Do not request or infer a product need/);
  assert.match(generatedGuide, /solution-whiteboard\.md/);
  assert.match(deliveryWalkthrough, /SGLang issue #37457/);
  assert.match(deliveryWalkthrough, /latest playbook controls/i);
  assert.match(deliveryWorkflow, /Route 2 — Multi-task security defect/);
  assert.match(deliveryWorkflow, /^### Artifact dependency and freshness register$/m);
  assert.match(deliveryWorkflow, /^### Risk-based action control$/m);
  assert.match(deliveryPlan, /\| Status \| `CONTRACT_REVIEW` \|/);
  assert.match(deliveryPlan, /All task context receipts remain `NOT_STARTED`/);
  assert.match(deliveryPlan, /This teaching packet claims none of those gates/);
  assert.match(walkthrough, /grants no authority to install or discuss a real SGLang need/);
  assert.match(walkthrough, /Upgrade assessment representation/);
  assert.match(upgradeExample, /\.\/install-sdd\.sh --upgrade/);
  assert.match(upgradeExample, /Follow \.sdd-runtime\/playbook-upgrade-guide\.md exactly/);
});

test("canonical playbook URL and examples use the transferred repository and SGLang only", async () => {
  const installer = await readFile(path.join(REPOSITORY_ROOT, "install-sdd.sh"), "utf8");
  const readme = await readFile(path.join(REPOSITORY_ROOT, "README.md"), "utf8");
  const trackedFiles = await collectFiles(REPOSITORY_ROOT);
  const trackedText = (
    await Promise.all(
      trackedFiles
        .filter((file) => file.endsWith(".md") || file.endsWith(".sh"))
        .map((file) => readFile(file, "utf8")),
    )
  ).join("\n");

  assert.match(installer, /github\.com\/hhhhhusky777\/spec-driven-delivery-playbook\.git/);
  assert.doesNotMatch(trackedText, /Orientation-CD\/spec-driven-delivery-playbook/);
  assert.doesNotMatch(
    trackedFiles.map((file) => path.relative(REPOSITORY_ROOT, file)).join("\n"),
    /examples\/parallel-provider-submissions/,
  );
  const examplePaths = trackedFiles
    .map((file) => path.relative(REPOSITORY_ROOT, file))
    .filter((file) => file.startsWith("examples/"));
  assert.ok(
    examplePaths.every((file) => file.startsWith("examples/project-adoption/sglang/")),
    "every maintained example must use SGLang",
  );
  assert.match(readme, /SGLang API-key redaction delivery/);
});

test("every review gate requires exact-revision agent self-review without granting approval", async () => {
  const reviewArtifacts = [
    "README.md",
    "docs/documentation-quality-policy.md",
    "docs/project-adoption-runbook.md",
    "templates/README.md",
    "templates/adoption/agent-adoption-trigger.md",
    "templates/adoption/project-adoption-manifest.md",
    "templates/adoption/playbook-upgrade-assessment.md",
    "templates/decisions/architecture-decision-record.md",
    "templates/delivery/implementation-plan.md",
    "templates/discovery/solution-whiteboard.md",
    "templates/handoffs/whiteboard-to-workflow.md",
    "templates/policies/development-policy.md",
    "templates/policies/pull-request-policy.md",
    "templates/policies/specialized-policy.md",
    "templates/testing/test-strategy.md",
    "templates/workflows/sdd-delivery-workflow.md",
    "skills/sdd-project-adoption/SKILL.md",
    "skills/sdd-project-workflow/SKILL.md",
    "skills/sdd-playbook-upgrade/SKILL.md",
  ];

  for (const relativePath of reviewArtifacts) {
    const content = await readFile(path.join(REPOSITORY_ROOT, relativePath), "utf8");
    assert.match(
      content,
      /SELF_REVIEW_PASSED|self-review/i,
      `${relativePath} must carry the mandatory self-review gate`,
    );
  }

  const record = await readFile(
    path.join(REPOSITORY_ROOT, "templates/reviews/agent-self-review.md"),
    "utf8",
  );
  const prPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates/policies/pull-request-policy.md"),
    "utf8",
  );
  const prTemplate = await readFile(
    path.join(REPOSITORY_ROOT, ".github/pull_request_template.md"),
    "utf8",
  );
  const exampleManifest = await readFile(
    path.join(
      REPOSITORY_ROOT,
      "examples/project-adoption/sglang/01-project-adoption-manifest.md",
    ),
    "utf8",
  );

  assert.match(record, /Exact candidate revision/);
  assert.match(record, /Contract-to-change map and author annotations/);
  assert.match(record, /SELF_REVIEW_FAILED/);
  assert.match(record, /cannot set\s+`APPROVED`/);
  assert.match(record, /authorize merge, or authorize\s+continuation/);
  assert.match(prPolicy, /exact current PR head/);
  assert.match(prPolicy, /material or non-obvious PR hunks/);
  assert.match(prTemplate, /Contract-to-change map and author annotations/);
  assert.match(prTemplate, /Agent self-review/);
  assert.match(exampleManifest, /\| Self-review state \| `NOT_STARTED` \|/);
  assert.match(exampleManifest, /Complete self-review, then fresh-context review, then request human review/);
});

test("fresh-context review isolates author context and returns an exact-revision receipt", async () => {
  const read = (relativePath) =>
    readFile(path.join(REPOSITORY_ROOT, relativePath), "utf8");
  const [
    readme,
    protocol,
    workflow,
    workflowSkill,
    prPolicy,
    prTemplate,
    catalog,
    example,
  ] = await Promise.all([
      read("README.md"),
      read("templates/reviews/fresh-context-agent-review.md"),
      read("templates/workflows/sdd-delivery-workflow.md"),
      read("skills/sdd-project-workflow/SKILL.md"),
      read("templates/policies/pull-request-policy.md"),
      read(".github/pull_request_template.md"),
      read("templates/README.md"),
      read("examples/project-adoption/sglang/delivery-api-key-redaction/03-delivery-workflow.md"),
    ]);

  assert.match(readme, /^#### Fresh-context agent review design$/m);
  assert.match(readme, /create_agents\(count = 2, inherit_author_conversation = false/);
  assert.match(readme, /process independence, not account independence/i);
  assert.match(protocol, /^## 1\. Phase and continuation policy$/m);
  assert.match(protocol, /^## 2\. Review packet$/m);
  assert.match(protocol, /^## 3\. Fresh-context creation contract$/m);
  assert.match(protocol, /^## 5\. Durable findings and resolution history$/m);
  assert.match(protocol, /^## 6\. Review receipt$/m);
  assert.match(protocol, /^## 7\. Coordinator resume gate$/m);
  assert.match(protocol, /must not edit files, push commits/);
  assert.match(protocol, /assigns exactly two\s+reviewers/i);
  assert.match(protocol, /Required approvals \| `2`/);
  assert.match(protocol, /session, reviewer seat, and reviewer-local sequence/i);
  assert.match(protocol, /S1-R1-F01/);
  assert.match(protocol, /Reviewer seat \| `<R1 or R2; stable for this session>`/);
  assert.match(protocol, /inherits the replaced\s+reviewer's stable seat/i);
  assert.match(protocol, /`ISOLATION_UNVERIFIED` and return `BLOCKED`/);
  assert.match(
    protocol,
    /candidate change.*same assigned\s+reviewer/is,
  );
  assert.match(protocol, /design and manual implementation stop for human review/i);
  assert.match(protocol, /Never overwrite a request for changes/i);
  assert.match(workflow, /Record packets\/receipts, exact revisions/);
  assert.match(workflowSkill, /no\s+inherited authoring conversation/i);
  assert.match(
    workflowSkill,
    /Keep the original task waiting for the structured receipt/,
  );
  assert.match(prPolicy, /Fresh context does not create a second GitHub identity/);
  assert.match(prTemplate, /^## Fresh-context and human review$/m);
  assert.match(prTemplate, /Fresh-context session.*assigned reviewer/i);
  assert.match(prTemplate, /same-actor comment is not represented as a formal approval/i);
  assert.match(catalog, /fresh-context agent review/);
  assert.match(example, /This\s+example does not invent a reviewer/);
  assert.match(readme, /same two reviewers/i);
  assert.match(workflowSkill, /same assigned session reviewer/i);
  assert.match(workflowSkill, /initialize exactly two reviewers/i);
  assert.match(prPolicy, /REJECT_WITH_JUSTIFICATION/);
  assert.match(prTemplate, /same assigned reviewer/i);
});

test("every review gate requires fresh-context review before its phase continuation", async () => {
  const paths = [
    "templates/discovery/solution-whiteboard.md",
    "templates/handoffs/whiteboard-to-workflow.md",
    "templates/decisions/architecture-decision-record.md",
    "templates/delivery/implementation-plan.md",
    "templates/policies/development-policy.md",
    "templates/policies/pull-request-policy.md",
    "templates/policies/specialized-policy.md",
    "templates/testing/test-strategy.md",
    "templates/adoption/playbook-upgrade-assessment.md",
    "templates/workflows/sdd-delivery-workflow.md",
  ];
  const documents = await Promise.all(
    paths.map((relativePath) =>
      readFile(path.join(REPOSITORY_ROOT, relativePath), "utf8"),
    ),
  );

  for (const [index, document] of documents.entries()) {
    assert.match(document, /fresh-context/i, paths[index]);
    assert.match(document, /human review|human approval/i, paths[index]);
  }

  const protocol = await readFile(
    path.join(REPOSITORY_ROOT, "templates/reviews/fresh-context-agent-review.md"),
    "utf8",
  );
  assert.match(protocol, /Every review gate opens one stable review session/);
  assert.match(protocol, /same assigned reviewer/i);
  assert.match(protocol, /REJECT_WITH_JUSTIFICATION/);
  assert.match(protocol, /all required reviewers approve\s+the same exact candidate/i);
  assert.match(protocol, /^### 1\.1 Session control record$/m);
  assert.match(protocol, /REVIEWER_REPLACED/);
  assert.match(protocol, /AGENT_AUTO_MERGE/);
  assert.match(protocol, /`AUTO_CONTINUE` and `REVIEW_ON_EXCEPTION`/);
  assert.match(protocol, /deterministic actions that are not review gates/i);
});

test("implementation auto-merge is human-selected, implementation-only, and rechecked", async () => {
  const playbookReadme = await readFile(
    path.join(REPOSITORY_ROOT, "README.md"),
    "utf8",
  );
  const developmentPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates/policies/development-policy.md"),
    "utf8",
  );
  const prPolicy = await readFile(
    path.join(REPOSITORY_ROOT, "templates/policies/pull-request-policy.md"),
    "utf8",
  );
  const workflow = await readFile(
    path.join(REPOSITORY_ROOT, "templates/workflows/sdd-delivery-workflow.md"),
    "utf8",
  );
  const workflowSkill = await readFile(
    path.join(REPOSITORY_ROOT, "skills/sdd-project-workflow/SKILL.md"),
    "utf8",
  );
  const testStrategy = await readFile(
    path.join(REPOSITORY_ROOT, "templates/testing/test-strategy.md"),
    "utf8",
  );
  const sglangWorkflow = await readFile(
    path.join(
      REPOSITORY_ROOT,
      "examples/project-adoption/sglang/delivery-api-key-redaction/03-delivery-workflow.md",
    ),
    "utf8",
  );

  for (const content of [developmentPolicy, prPolicy, workflow, workflowSkill]) {
    assert.match(content, /HUMAN_REVIEW_BEFORE_MERGE/);
    assert.match(content, /AGENT_AUTO_MERGE/);
    assert.match(content, /user.*choos|user-selected/is);
    assert.match(content, /before (?:each|the) task.*PR.*merge.*continu/is);
    assert.match(content, /design/i);
    assert.match(content, /post-merge (?:human[- ]?)?review/i);
  }
  assert.match(developmentPolicy, /The agent must never infer or select\s+`AGENT_AUTO_MERGE`/);
  assert.match(prPolicy, /must not\s+bypass a repository-required approval/);
  assert.match(prPolicy, /exact-head self-review and the assigned session reviewer/);
  assert.match(prPolicy, /final feature PR[\s\S]*final validation has its required approval/);
  assert.match(workflow, /sdd-section: implementation-review-ledger/);
  assert.match(workflow, /exact table headers present even before/);
  assert.match(workflow, /Every merged row requires fresh-context `APPROVED`/);
  assert.match(workflow, /`COMPLETE` and `ARCHIVED` require at least one/);
  assert.match(workflow, /bare disposition does not pass that gate/);
  assert.match(workflow, /Current review phase/);
  assert.match(workflow, /Current review target ID/);
  assert.match(workflow, /Implementation repository/);
  assert.match(workflow, /comma-separated list of unique stable\s+task IDs/);
  assert.match(workflow, /full 40-character commit SHA/);
  assert.match(workflow, /\| Order \| Artifact ID \| Artifact \|/);
  assert.match(workflow, /ID named by `Depends on`/);
  assert.match(workflow, /case-insensitively unique stable IDs/);
  assert.match(workflow, /single GitHub PR link must identify the same PR/);
  assert.match(workflow, /merge-evidence commit must equal the recorded full merge SHA/);
  assert.match(workflow, /`STOPPED` row cannot satisfy delivery closure/);
  assert.match(developmentPolicy, /Only an\s+`IMPLEMENTATION` target inside that scope/);
  assert.match(workflowSkill, /Current review\s+target ID.*recorded mode scope/s);
  assert.match(workflowSkill, /Never weaken checks, use\s+administrator bypass/);
  assert.match(workflowSkill, /final feature PR only[\s\S]*final validation is already approved/);
  assert.match(testStrategy, /Negative fixtures must block missing\/invalid mode data/);
  assert.match(sglangWorkflow, /\| Implementation continuation mode \| `NOT_SELECTED` \|/);
  assert.match(sglangWorkflow, /does not\s+make that choice for SGLang/);
  assert.match(playbookReadme, /^#### Example: enable auto-continuation during implementation$/m);
  assert.match(playbookReadme, /AGENT_AUTO_MERGE for the T02\s+and T03 task PRs only/);
  assert.match(playbookReadme, /Do not include the final feature PR/);
  assert.match(playbookReadme, /Change the implementation continuation mode to HUMAN_REVIEW_BEFORE_MERGE now/);
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
