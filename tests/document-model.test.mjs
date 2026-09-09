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
  for (const document of [policy, readme, ...templates]) {
    assert.match(document, /\| Change category \| Files \| Additions \| Deletions \| Changed lines \|/);
    for (const category of ["Product code", "Documentation", "Tests", "Other"]) {
      assert.match(document, new RegExp(`\\| ${category} \\|`));
    }
  }
  assert.match(workflow, /exact pull-request candidate/);
  assert.match(workflow, /actual PR target/);
  assert.match(policy, /Classify every changed file once by its primary responsibility/);
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
