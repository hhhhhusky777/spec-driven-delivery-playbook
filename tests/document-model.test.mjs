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

test("workflow skills state five goals and reject duplicate delivery documents", async () => {
  const workflow = await read("skills/sdd-project-workflow/SKILL.md");
  for (const phrase of ["clear boundaries", "stable outcomes", "key information only", "proportional effort", "agent discretion"]) {
    assert.match(workflow.toLowerCase().replace(/\s+/g, " "), new RegExp(phrase));
  }
  assert.match(workflow, /Do not create additional documents that duplicate/);
  assert.match(workflow, /pull request owns review comments, checks, approvals/);
  assert.match(workflow, /required machine-local untracked/);
  assert.match(workflow, /keep\s+it ignored and untracked/);
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
