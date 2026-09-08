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
  for (const phrase of ["clear boundaries", "stable outcomes", "key information only", "proportional effort", "agent discretion", "necessary complexity"]) {
    assert.match(workflow.toLowerCase().replace(/\s+/g, " "), new RegExp(phrase));
  }
  assert.match(workflow, /Do not create additional documents that duplicate/);
  assert.match(workflow, /pull request owns review comments, checks, approvals/);
  assert.match(workflow, /required machine-local untracked/);
  assert.match(workflow, /keep\s+it ignored and untracked/);
  assert.match(workflow, /Before final pull-request review/);
  assert.match(workflow, /Do not defer predictable tracked-state updates/);
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
});

test("installer uses PR evidence and outcome guidance", async () => {
  const installer = await read("install-sdd.sh");
  assert.doesNotMatch(installer, /templates\/adoption\/playbook-upgrade-assessment\.md/);
  assert.match(installer, /Review evidence destination \| Pull request/);
  assert.match(installer, /Adoption outcome and boundaries/);
  assert.match(installer, /Delivery outcome and boundaries/);
});
