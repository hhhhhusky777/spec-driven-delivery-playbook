import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { checkDocument } from "../scripts/sdd-lifecycle-three-doc.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sha = "a".repeat(40);

test("maintained three-document templates satisfy lifecycle ownership", async () => {
  for (const relative of [
    "templates/adoption/project-adoption-manifest.md",
    "templates/discovery/solution-whiteboard.md",
    "templates/delivery/implementation-plan.md",
  ]) {
    const source = (await readFile(path.join(root, relative), "utf8"))
      .replace("<full commit SHA>", sha)
      .replace("<human-review-before-merge or explicitly authorized alternative>", "HUMAN_REVIEW_BEFORE_MERGE");
    assert.deepEqual(checkDocument(relative, source), [], relative);
  }
});

test("manifest rejects feature progress and non-immutable pins", () => {
  const source = `| Field | Value |\n| --- | --- |\n| Adoption state | INSTALLED |\n| Playbook revision | ${sha} |\n| Upgrade state | NONE |\n| Upgrade candidate | None |`;
  assert.deepEqual(checkDocument("project-adoption-manifest.md", source), []);
  assert.ok(checkDocument("project-adoption-manifest.md", source.replace(sha, "main")).some(error => error.includes("full SHA")));
  assert.ok(checkDocument("project-adoption-manifest.md", `${source}\n| Current task | T01 |`).some(error => error.includes("feature field")));
  assert.ok(checkDocument("project-adoption-manifest.md", source.replace("INSTALLED", "BANANA")).some(error => error.includes("Adoption state")));
  assert.ok(checkDocument("project-adoption-manifest.md", source.replace("INSTALLED", "BLOCKED")).some(error => error.includes("State before block")));
  assert.deepEqual(checkDocument("project-adoption-manifest.md", source.replace("| Adoption state | INSTALLED |", "| Adoption state | BLOCKED |\n| State before block | DRAFT |")), []);
});

test("manifest requires an immutable candidate while upgrade is open", () => {
  const source = `| Field | Value |\n| --- | --- |\n| Adoption state | INSTALLED |\n| Playbook revision | ${sha} |\n| Upgrade state | ASSESSING |\n| Upgrade candidate | None |`;
  assert.ok(checkDocument("project-adoption-manifest.md", source).some(error => error.includes("Upgrade candidate")));
  assert.deepEqual(checkDocument("project-adoption-manifest.md", source.replace("None", "b".repeat(40))), []);
});

test("concluded whiteboard requires resolved decisions, outcomes, and draft reconciliation", () => {
  const source = `| Field | Value |\n| --- | --- |\n| State | CONCLUDED |\n| Open owner decisions | None |\n\n| ID | Agreed item, alternative, constraint, or gap | State / resolution |\n| --- | --- | --- |\n| DR01 | need | accepted |\n\n| Design point | Accepted outcome |\n| --- | --- |\n| D01 | outcome |\n\n| Draft item | Concluded design point | Disposition |\n| --- | --- | --- |\n| DR01 | D01 | accepted |`;
  assert.deepEqual(checkDocument("solution-whiteboard.md", source), []);
  assert.ok(checkDocument("solution-whiteboard.md", source.replace("| None |", "| D02 |"))[0]);
  assert.ok(checkDocument("solution-whiteboard.md", source.replace("| DR01 | D01 | accepted |", ""))
    .some(error => error.includes("at least one reconciled")));
  assert.ok(checkDocument("solution-whiteboard.md", source.replace("| DR01 | D01 | accepted |", "| DR01 | D01 | open |"))
    .some(error => error.includes("unresolved whiteboard draft item")));
  assert.ok(checkDocument("solution-whiteboard.md", source.split("\n\n| Draft item")[0])
    .some(error => error.includes("draft-to-conclusion reconciliation")));
  const missing = source.replace("| DR01 | need | accepted |", "| DR01 | need | accepted |\n| DR02 | another need | accepted |");
  assert.ok(checkDocument("solution-whiteboard.md", missing)
    .some(error => error.includes("DR02")));
  assert.ok(checkDocument("solution-whiteboard.md", source.replace("| DR01 | need | accepted |", "| DR01 | need | open |"))
    .some(error => error.includes("unresolved retained")));
  assert.ok(checkDocument("solution-whiteboard.md", source.replace("| DR01 | D01 | accepted |", "| DR01 | D99 | accepted |"))
    .some(error => error.includes("unknown design point")));
  const duplicate = `${source}\n| DR01 | D01 | changed |`;
  assert.ok(checkDocument("solution-whiteboard.md", duplicate)
    .some(error => error.includes("duplicate whiteboard reconciliation")));
});

test("implementation plan owns one coherent task state graph", () => {
  const source = `| Field | Value |\n| --- | --- |\n| State | IMPLEMENTING |\n| Active tasks | T02 |\n| Next ready task | None |\n\n| ID | State | Depends on |\n| --- | --- | --- |\n| T01 | DONE | None |\n| T02 | IN_PROGRESS | T01 |`;
  assert.deepEqual(checkDocument("implementation-plan.md", source), []);
  assert.ok(checkDocument("implementation-plan.md", source.replace("| T01 |", "| T03 |")).some(error => error.includes("unknown task")));
  assert.ok(checkDocument("implementation-plan.md", `${source}\n| T03 | VERIFYING | T01 |`).some(error => error.includes("Active tasks")));
  const parallel = source.replace("| Active tasks | T02 |", "| Active tasks | T02, T03 |") + "\n| T03 | VERIFYING | T01 |";
  assert.deepEqual(checkDocument("implementation-plan.md", parallel), []);
  assert.ok(checkDocument("implementation-plan.md", source.replace("| T01 | DONE |", "| T01 | CANCELLED |")).some(error => error.includes("unsatisfied dependency")));
  const planned = source
    .replace("| Active tasks | T02 |", "| Active tasks | None |")
    .replace("| T01 | DONE |", "| T01 | PLANNED |")
    .replace("| T02 | IN_PROGRESS |", "| T02 | PLANNED |");
  assert.deepEqual(checkDocument("implementation-plan.md", planned), []);
  const incomplete = source
    .replace("| State | IMPLEMENTING |", "| State | COMPLETE |")
    .replace("| Active tasks | T02 |", "| Active tasks | None |")
    .replace("| T02 | IN_PROGRESS |", "| T02 | PLANNED |");
  assert.ok(checkDocument("implementation-plan.md", incomplete).some(error => error.includes("terminal")));
  const falseComplete = `| Field | Value |\n| --- | --- |\n| State | COMPLETE |\n| Active tasks | None |\n| Next ready task | None |\n\n| ID | State | Depends on |\n| --- | --- | --- |\n| T01 | CANCELLED | None |\n| T02 | DONE | T01 |`;
  assert.ok(checkDocument("implementation-plan.md", falseComplete).some(error => error.includes("unsatisfied dependency")));
});
