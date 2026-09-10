import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = relative => readFile(path.join(root, relative), "utf8");

async function files(directory, prefix = "") {
  const result = [];
  for (const entry of await readdir(path.join(directory, prefix), { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) result.push(...await files(directory, relative));
    else result.push(relative.split(path.sep).join("/"));
  }
  return result;
}

test("the maintained document model contains exactly three templates", async () => {
  assert.deepEqual((await files(path.join(root, "templates"))).sort(), [
    "README.md",
    "adoption/project-adoption-manifest.md",
    "delivery/implementation-plan.md",
    "discovery/solution-whiteboard.md",
  ]);
});

test("each durable document has one responsibility", async () => {
  const manifest = await read("templates/adoption/project-adoption-manifest.md");
  const whiteboard = await read("templates/discovery/solution-whiteboard.md");
  const plan = await read("templates/delivery/implementation-plan.md");
  assert.match(manifest, /contains no feature-specific state/);
  assert.match(whiteboard, /Concluded design/);
  assert.match(plan, /only active-delivery state authority/);
  assert.match(plan, /Design-to-task mapping/);
  assert.match(plan, /Delivery Definition of Done/);
  for (const document of [manifest, whiteboard, plan]) {
    assert.match(document, /\| Handling \|/);
  }
});

test("the three templates preserve complete proportional delivery information", async () => {
  const manifest = await read("templates/adoption/project-adoption-manifest.md");
  for (const heading of [
    "Adoption outcome and scope",
    "Project discovery inventory",
    "Stable project boundaries",
    "Validation and enforcement",
    "Gaps, deviations, and proportional exclusions",
    "Adoption or upgrade human brief",
  ]) assert.match(manifest, new RegExp(heading));

  const whiteboard = await read("templates/discovery/solution-whiteboard.md");
  for (const heading of [
    "Current understanding",
    "Authority and context",
    "Facts, assumptions, and unknowns",
    "Requirements and acceptance",
    "Current system and gaps",
    "Options, experiments, and tradeoffs",
    "Policy applicability and gaps",
    "Risks and consequences",
    "Decision log",
    "Concluded design",
    "Draft-to-conclusion reconciliation",
    "Design amendments",
    "Human brief",
  ]) assert.match(whiteboard, new RegExp(heading));

  const plan = await read("templates/delivery/implementation-plan.md");
  for (const heading of [
    "Governing inputs and delivery boundaries",
    "System contracts",
    "Proposed design",
    "Delivery strategy and readiness",
    "Design-to-task mapping",
    "Task specifications and context receipts",
    "Recovery, decisions, and change control",
    "Plan validation and completion",
    "Human review brief",
  ]) assert.match(plan, new RegExp(heading));
});

test("workflow skills state six goals and reject duplicate delivery documents", async () => {
  const workflow = await read("skills/sdd-project-workflow/SKILL.md");
  const policy = await read("docs/documentation-quality-policy.md");
  const readme = await read("README.md");
  for (const phrase of ["clear boundaries", "stable outcomes", "key information only", "proportional effort", "agent discretion", "necessary complexity"]) {
    assert.match(workflow.toLowerCase().replace(/\s+/g, " "), new RegExp(phrase));
  }
  assert.match(workflow, /Do not create additional documents that duplicate/);
  assert.match(workflow, /pull request owns review comments, checks, approvals/);
  assert.match(workflow, /required machine-local untracked/);
  assert.match(workflow, /keep\s+it ignored and untracked/);
  assert.match(workflow, /Test the worktree itself with a\s+representative project operation/);
  assert.match(workflow, /copy, recreate, or safely share only\s+the required authorized support/);
  assert.match(workflow, /Before final pull-request review/);
  assert.match(workflow, /Do not defer predictable tracked-state updates/);
  assert.match(workflow, /Regenerate the manifest-pinned runtime in that worktree, then\s+check for and synchronize a newer playbook revision before whiteboard or\s+implementation work/);
  assert.match(workflow, /Do not routinely\s+merge or rebase the target during ordinary work/);
  assert.match(workflow, /Synchronize the completed\s+candidate with its target, then run affected checks on that exact candidate/);
  assert.match(workflow, /After target verification, remove owned delivery\/task worktrees and retire\s+owned merged branches/);
  assert.match(workflow, /Return the coordinating checkout to the accepted target\s+branch when safe/);
  for (const handling of ["HUMAN_DECISION", "AGENT_ACTION", "DISCLOSE", "NONE"]) {
    assert.match(workflow, new RegExp(handling));
  }
  for (const document of [workflow, policy, readme]) {
    assert.match(document, /material awareness-only information/);
    assert.match(document, /no material attention\s+or\s+action remains/);
  }
  for (const document of [policy, readme]) {
    assert.match(document, /Evidence.*Appropriate class/);
    assert.match(document, /waivers?, changed acceptance, or missing authority/);
  }
  assert.match(workflow, /Semantically identify material policy sources/);
  assert.match(workflow, /Filenames are discovery\s+hints, not proof of authority/);
});

test("worktree readiness and focused-to-full validation are outcome based", async () => {
  const workflow = await read("skills/sdd-project-workflow/SKILL.md");
  const policy = await read("docs/documentation-quality-policy.md");
  const readme = await read("README.md");
  const contributing = await read("CONTRIBUTING.md");
  const automation = await read(".github/workflows/documentation-quality.yml");
  const packageSource = await read("package.json");

  for (const document of [workflow, readme, contributing]) {
    const normalized = document.replace(/\s+/g, " ");
    assert.match(normalized, /Focused tests.*only the tests that cover the changed files and lines/i);
    assert.match(normalized, /Implement each task's required tests|Each task still implements the tests|Every task still implements the tests/i);
    assert.match(normalized, /retained (?:agent |feature )?reviewer|same two feature reviewer/i);
    assert.match(normalized, /full (?:applicable )?validation/i);
    assert.doesNotMatch(normalized, /heavy|long-running|full-coverage/i);
    assert.match(normalized, /exact[- ]head|exact candidate/i);
    assert.match(normalized, /stricter .*policy|Project policy may require/i);
    assert.match(normalized, /one hour of active implementation|one task reaches one hour/i);
    assert.match(normalized, /network (?:or|and) environment interruptions/i);
    assert.match(normalized, /review time|code review/i);
    assert.match(normalized, /owner justification or authorization/i);
  }
  assert.match(readme, /representative project operation/);
  assert.match(readme, /copies, recreates, or safely shares only/);
  for (const document of [workflow, readme]) {
    assert.match(document, /never\s+(?:make\s+the\s+worktree\s+depend|depends?)\s+on\s+mutable\s+files\s+or\s+runtime\s+owned\s+by\s+another\s+checkout/i);
    assert.match(document, /stable project-level ownership/);
  }

  const normalizedPolicy = policy.replace(/\s+/g, " ");
  assert.match(normalizedPolicy, /Each task still implements.*before both retained reviewers/i);
  assert.match(normalizedPolicy, /Focused tests.*only the tests that cover the changed files and lines/);
  assert.match(normalizedPolicy, /final candidate that will merge back to the protected integration branch.*full applicable validation/);
  assert.match(readme, /F --> P\["Open or update PR"\]/);
  assert.match(readme, /P --> R1\["Retained feature reviewer 1"\]/);
  assert.match(readme, /P --> R2\["Retained feature reviewer 2"\]/);
  assert.match(readme, /J -->\|"yes"\| G\{"Final candidate to protected target\?"\}/);
  assert.match(readme, /G -->\|"no"\| B\["Task PR human brief"\]/);
  assert.match(readme, /G -->\|"yes"\| V\["Full validation<br\/>on exact head"\]/);
  assert.match(readme, /D -->\|"yes"\| X/);
  assert.match(readme, /X --> F/);
  assert.match(readme, /D -->\|"no; transient"\| Q\["Rerun affected validation"\]/);
  assert.match(readme, /Q --> V/);
  assert.match(contributing, /Defer full validation until the final candidate will merge back to\s+`main`/i);
  assert.match(contributing, /single-task PR targeting `main` is (?:already )?final/i);
  assert.match(automation, /if: github\.event_name == 'pull_request'[\s\S]*npm run docs:focused/);
  assert.match(automation, /if: github\.event_name != 'pull_request'[\s\S]*npm run docs:all/);
  assert.match(automation, /fetch-depth: 0/);
  assert.match(packageSource, /"docs:focused": "node scripts\/pr-focused-validation\.mjs"/);
  assert.match(packageSource, /"docs:test": "node --experimental-test-coverage --test tests/);
  assert.match(policy, /responsibility of an\s+agent changing this repository, not a project agent/);
  assert.match(workflow, /do not run the playbook repository's source suite/);
});

test("feature review cohorts retain context and produce useful change requests", async () => {
  const workflow = await read("skills/sdd-project-workflow/SKILL.md");
  const reviewer = await read("skills/sdd-feature-review/SKILL.md");
  const policy = await read("docs/documentation-quality-policy.md");
  const readme = await read("README.md");
  const contributing = await read("CONTRIBUTING.md");

  for (const document of [workflow, readme, contributing]) {
    const normalized = document.replace(/\s+/g, " ");
    assert.match(normalized, /concluded[- ]whiteboard|whiteboard is formally concluded/i);
    assert.match(normalized, /feature reviewer|feature's review cohort|reviewers for the feature|feature selects its two reviewers/i);
    assert.match(normalized, /planning/);
    assert.match(normalized, /task/);
    assert.match(normalized, /final candidate/);
  }
  const normalizedPolicy = policy.replace(/\s+/g, " ");
  const normalizedWorkflow = workflow.replace(/\s+/g, " ");
  const normalizedReviewer = reviewer.replace(/\s+/g, " ");
  assert.match(normalizedPolicy, /feature review skill.*single execution contract/);
  assert.match(normalizedPolicy, /retains their sessions through merge/);
  assert.match(normalizedWorkflow, /require each one to read the installed sdd-feature-review skill once/);
  assert.match(normalizedWorkflow, /focused context packet defined by the reviewer skill/);
  assert.match(normalizedReviewer, /manifest/);
  assert.match(normalizedReviewer, /project README|entry documentation/i);
  assert.match(normalizedReviewer, /boundar/i);
  assert.match(normalizedReviewer, /Do not reload this skill at every gate/);
  assert.match(normalizedReviewer, /reviewer seat, current gate, exact base and candidate/);
  assert.match(normalizedReviewer, /what was completed and what changed since the previous review/);
  assert.match(normalizedReviewer, /design points, contracts, or task outcomes/);
  assert.match(normalizedReviewer, /expected outcome, scope and non-scope/);
  assert.match(normalizedReviewer, /validation evidence with failed and unrun checks explicit/);
  assert.match(normalizedReviewer, /prior findings and their dispositions/);
  assert.match(normalizedReviewer, /routing context, not authority/);
  assert.match(readme, /feature review skill/);
  assert.match(policy, /\| Design conclusion \| Key design points/);
  assert.match(readme, /B --> A\["Two-agent design review"\]/);
  assert.match(readme, /A --> H\["Human design acceptance"\]/);
  assert.match(readme, /H --> P\["Implementation planning"\]/);
  assert.match(readme, /P --> R1\["Retained feature reviewer 1"\]/);
  assert.match(readme, /P --> R2\["Retained feature reviewer 2"\]/);
  assert.match(normalizedReviewer, /precise evidence and user or system impact/);
  assert.match(normalizedReviewer, /smallest correction/);
  assert.match(normalizedReviewer, /recognized practice genuinely applies, a primary industry standard or authoritative reference/);
  assert.match(normalizedReviewer, /brief explanation of relevance/);
  assert.match(normalizedReviewer, /Never fabricate authority/);
  assert.match(normalizedReviewer, /optional improvements separate from blocking findings/);
  assert.match(normalizedReviewer, /never expand the accepted scope/);
  for (const document of [policy, readme, contributing, workflow]) {
    assert.doesNotMatch(document, /smallest recommended correction|primary industry standard|Never fabricate authority/);
  }
});

test("error handling stays simple, fail closed, and retry safe", async () => {
  const errors = await read("docs/error-handling.md");
  const workflow = await read("skills/sdd-project-workflow/SKILL.md");
  const readme = await read("README.md");
  const templates = await Promise.all([
    read("templates/adoption/project-adoption-manifest.md"),
    read("templates/discovery/solution-whiteboard.md"),
    read("templates/delivery/implementation-plan.md"),
  ]);
  const normalizedErrors = errors.replace(/^>\s?/gm, "").replace(/\s+/g, " ");

  assert.match(errors, /> \[!IMPORTANT\]/);
  assert.match(normalizedErrors, /impossible to enumerate every edge case, race, timing, or failure interleaving/);
  assert.match(normalizedErrors, /Preserve system consistency and fail closed/);
  assert.match(normalizedErrors, /stable retryable outcome and let the client decide when to retry/);
  assert.match(normalizedErrors, /reconcile the authoritative state or rely on an established idempotency boundary before permitting retry/);
  assert.match(errors, /only by a required invariant or observed failure/);
  assert.match(workflow, /preserve invariants, fail closed on uncertainty/);
  assert.match(workflow, /client-controlled retry only when repeating the operation is safe/);
  assert.match(readme, /no design can\s+enumerate every race or edge case/);
  assert.match(readme, /reconcile ambiguous effects\s+before retrying/);
  for (const template of templates) {
    assert.doesNotMatch(template, /impossible to enumerate every edge case/);
    assert.doesNotMatch(template, /stable retryable outcome/);
  }
});

test("testing guidance is risk focused, proportional, and canonically owned", async () => {
  const policy = await read("docs/documentation-quality-policy.md");
  const workflow = await read("skills/sdd-project-workflow/SKILL.md");
  const readme = await read("README.md");
  const templates = await Promise.all([
    read("templates/adoption/project-adoption-manifest.md"),
    read("templates/discovery/solution-whiteboard.md"),
    read("templates/delivery/implementation-plan.md"),
  ]);

  for (const risk of [
    "Boundaries and unexpected input",
    "Failure and recovery",
    "Concurrency and timing",
    "Interfaces and evolution",
    "Critical business journeys",
    "Production behavior",
    "Difficult test oracles",
  ]) assert.match(policy, new RegExp(`\\| ${risk} \\|`));
  assert.match(policy, /do not guarantee absolute quality/);
  assert.match(policy, /do not\s+impose universal test levels, quotas, load, or duration/);
  assert.match(policy, /smallest deterministic regression at the lowest useful\s+layer when practical/);
  assert.match(policy, /it must not be represented as production\s+proof/);

  assert.match(workflow, /material failure risks/);
  assert.match(workflow, /essential critical-path proof/);
  assert.match(workflow, /production-like concurrent system or load\s+evidence when those risks warrant it/);
  assert.match(workflow, /do not impose universal suites or quotas/);

  for (const edge of [
    'O --> K{"Which material risks apply?"}',
    'K -->|"if applicable"| E["Boundaries + error/recovery"]',
    'K -->|"if applicable"| C["Concurrency + timing/order"]',
    'F --> J{"Critical real journey?"}',
    'J -->|"no"| D["Proportional evidence complete"]',
    'L -->|"yes"| P["Production-like system/load/soak"]',
    'L -->|"no"| D',
    'X -->|"yes"| R["Preserve evidence + reduce failure<br/>to focused regression"]',
    'X -->|"no"| D',
    "R --> F",
  ]) assert.match(readme, new RegExp(edge.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(readme, /Not every change needs every layer/);
  assert.match(readme, /implementation plans record only the applicable\s+project-specific test and acceptance contracts/);

  for (const template of templates) {
    assert.doesNotMatch(template, /Risk-focused test design/);
    assert.doesNotMatch(template, /Difficult test oracles/);
  }
});

test("adoption remains reusable while project authority is refreshed", async () => {
  const adoption = await read("skills/sdd-project-adoption/SKILL.md");
  const manifest = await read("templates/adoption/project-adoption-manifest.md");
  const readme = await read("README.md");
  assert.match(adoption, /Adoption is still one-time when project policy evolves/);
  assert.match(manifest, /reconcile this authority index with current repository evidence/);
  assert.match(manifest, /filenames are hints, not authority by themselves/i);
  assert.match(readme, /semantically reconciles current project authority with the\s+manifest/);
});

test("human PR review briefs expose the exact candidate change shape", async () => {
  const workflow = await read("skills/sdd-project-workflow/SKILL.md");
  const policy = await read("docs/documentation-quality-policy.md");
  const readme = await read("README.md");
  const templates = await Promise.all([
    read("templates/adoption/project-adoption-manifest.md"),
    read("templates/discovery/solution-whiteboard.md"),
    read("templates/delivery/implementation-plan.md"),
  ]);
  for (const document of [policy, readme]) {
    assert.match(document, /\| Change category \| Files \| Additions \| Deletions \| Changed lines \|/);
    for (const category of ["Product code", "Documentation", "Tests", "Other"]) {
      assert.match(document, new RegExp(`\\| ${category} \\|`));
    }
  }
  for (const template of templates) {
    assert.doesNotMatch(template, /\| Change category \| Files \| Additions \| Deletions \| Changed lines \|/);
  }
  assert.match(workflow, /> \[!IMPORTANT\]/);
  assert.match(workflow, /Avoid over-engineering/);
  assert.match(workflow, /Prefer one canonical owner and the smallest sufficient solution/);
  assert.match(workflow, /exact pull-request candidate/);
  assert.match(workflow, /actual PR target/);
  assert.match(policy, /Classify every changed file once by its primary responsibility/);
  assert.match(readme, /illustrative example, not live\s+evidence/);
  assert.match(policy, /non-line-countable files/);
  assert.match(policy, /not a risk score\s+or an additional gate/);
});

test("final review requires merge-ready canonical state without predicting PR facts", async () => {
  const plan = await read("templates/delivery/implementation-plan.md");
  const policy = await read("docs/documentation-quality-policy.md");
  const readme = await read("README.md");
  const contributing = await read("CONTRIBUTING.md");
  const example = await read("examples/project-adoption/sglang/delivery-api-key-redaction/04-implementation-plan.md");
  assert.match(plan, /Before final review/);
  assert.match(plan, /task is `DONE`/);
  assert.match(plan, /does not claim that the PR has\s+already been reviewed or merged/);
  assert.match(readme, /Before a pull request enters final review/);
  assert.match(readme, /If the PR does not merge/);
  assert.match(readme, /Closing candidate<br\/>archive \+ reset/);
  assert.match(contributing, /Before final review/);
  assert.match(contributing, /every predictable\s+tracked canonical state/);
  assert.match(contributing, /after merge, verify the exact target/);
  assert.match(policy, /merge-ready state boundary/);
  assert.match(policy, /status-only correction as a defect rather than routine cleanup/);
  assert.match(example, /Before final review, a delivery-closing candidate/);
  assert.match(example, /Review, authorized merge, and exact-target\s+verification remain PR-owned facts/);
  assert.doesNotMatch(example, /After delivery, link the merged PR/);
});

test("upgrade never rewrites feature content and keeps exact acceptance boundaries", async () => {
  const upgrade = await read("skills/sdd-playbook-upgrade/SKILL.md");
  const normalized = upgrade.replace(/\s+/g, " ");
  assert.match(upgrade, /Never rewrite feature-specific whiteboard/);
  assert.match(upgrade, /previous pin authoritative/);
  assert.match(normalized, /two independent reviews, and human acceptance/);
  assert.match(normalized, /pull request brief records old and new revisions/);
  assert.match(normalized, /Run the upgrade in the current delivery's isolated worktree and owned\s+delivery branch/);
  assert.match(normalized, /instead of merging a separate target-branch upgrade/);
});

test("installer uses PR evidence and outcome guidance", async () => {
  const installer = await read("install-sdd.sh");
  assert.doesNotMatch(installer, /templates\/adoption\/playbook-upgrade-assessment\.md/);
  assert.match(installer, /Review evidence destination \| Pull request/);
  assert.match(installer, /Adoption outcome and boundaries/);
  assert.match(installer, /Delivery outcome and boundaries/);
});
