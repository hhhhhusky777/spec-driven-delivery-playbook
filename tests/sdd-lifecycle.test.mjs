import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  checkSddLifecycleDocument,
  computeTransitiveFreshness,
} from "../scripts/sdd-lifecycle.mjs";

const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCHEMAS = JSON.parse(
  await readFile(path.join(REPOSITORY_ROOT, "config", "sdd-lifecycle-schema.json"), "utf8"),
);

async function fixture(t, content) {
  const root = await mkdtemp(path.join(os.tmpdir(), "sdd-lifecycle-test-"));
  t.after(async () => rm(root, { recursive: true, force: true }));
  const file = path.join(root, "artifact.md");
  await writeFile(file, content, "utf8");
  return { root, file };
}

const PLAN_SECTIONS = `
<!-- sdd-section: task-state-rules -->
<!-- sdd-section: definition-of-ready -->
<!-- sdd-section: context-receipt-gate -->
<!-- sdd-section: definition-of-done -->
<!-- sdd-section: task-ledger -->
<!-- sdd-section: task-specifications -->
<!-- sdd-section: material-corrections -->`;

function plan({
  status = "READY",
  previousStatus = "CONTRACT_REVIEW",
  reviewState = "APPROVED",
  taskState = "READY",
  taskFreshness = "CURRENT",
  next = "NEXT",
  spec = true,
  secondTask = false,
  secondTaskFreshness = "STALE",
  correctionState = null,
  affectedIds = "API-01",
  affectedTasks = "T01",
  correctionEvidence = true,
  reviewEvidence = null,
  changeClass = "CONTROL_ONLY",
  changeCorrectionId = "None",
} = {}) {
  const correctionRow = correctionState
    ? `| \`C-01\` | \`${correctionState}\` | \`${affectedIds}\` | \`${affectedTasks}\` | ${correctionEvidence ? "old -> current" : "None"} | ${correctionEvidence ? "Sections 4, 8, 10" : "None"} | ${correctionEvidence ? "plan CURRENT" : "None"} | ${reviewEvidence ?? (correctionEvidence ? "reviewer; APPROVED; v2" : "None")} |`
    : "";
  const secondTaskRow = secondTask
    ? `| \`T02\` | \`PLANNED\` | | \`None\` | \`None\` | \`${secondTaskFreshness}\` |`
    : "";
  return `# Plan

<!-- sdd-schema: implementation-plan@2; mode: FULL -->

| Field | Value |
| --- | --- |
| Status | \`${status}\` |
| Previous status | \`${previousStatus}\` |
| Plan mode | \`FULL\` |
| Next ready task(s) | \`T01\` |
| Blockers | \`None\` |
| Review state | \`${reviewState}\` |

${PLAN_SECTIONS}

| ID | State | Next | Depends on | Blocked by | Source freshness |
| --- | --- | --- | --- | --- | --- |
| \`T01\` | \`${taskState}\` | \`${next}\` | \`None\` | \`None\` | \`${taskFreshness}\` |
${secondTaskRow}

${spec ? "<!-- sdd-task-spec: T01 -->" : ""}

| Correction ID | State | Affected IDs | Affected tasks | Supersedes/current authority | Reconciled locations | Dependent impact/freshness | Review evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
${correctionRow}

| Time | Changed by | Change class | Sections | Change and reason | Contract/task impact | Correction ID |
| --- | --- | --- | --- | --- | --- | --- |
| now | owner | ${changeClass} | plan | update | impact | ${changeCorrectionId} |
`;
}

test("READY plan requires one complete READY/NEXT task", async (t) => {
  const valid = await fixture(t, plan());
  assert.deepEqual(await checkSddLifecycleDocument(valid.file, valid.root, SCHEMAS), []);

  const invalid = await fixture(t, plan({ taskState: "PLANNED", next: "" }));
  const diagnostics = await checkSddLifecycleDocument(invalid.file, invalid.root, SCHEMAS);
  assert.ok(diagnostics.some((item) => item.rule === "SDD_PLAN_NOT_READY"));
});

test("future PLANNED tasks may remain concise but active tasks require specifications", async (t) => {
  const planned = await fixture(t, plan({ status: "CONTRACT_REVIEW", previousStatus: "DRAFT", reviewState: "IN_REVIEW", taskState: "PLANNED", next: "", spec: false }));
  assert.deepEqual(await checkSddLifecycleDocument(planned.file, planned.root, SCHEMAS), []);

  const ready = await fixture(t, plan({ spec: false }));
  const diagnostics = await checkSddLifecycleDocument(ready.file, ready.root, SCHEMAS);
  assert.ok(diagnostics.some((item) => item.rule === "SDD_TASK_SPEC_REQUIRED"));
});

test("plan lifecycle and review gates reject illegal READY transitions", async (t) => {
  const illegal = await fixture(t, plan({ previousStatus: "DRAFT" }));
  const transitionDiagnostics = await checkSddLifecycleDocument(illegal.file, illegal.root, SCHEMAS);
  assert.ok(transitionDiagnostics.some((item) => item.rule === "SDD_ILLEGAL_TRANSITION"));

  const unapproved = await fixture(t, plan({ reviewState: "IN_REVIEW" }));
  const reviewDiagnostics = await checkSddLifecycleDocument(unapproved.file, unapproved.root, SCHEMAS);
  assert.ok(reviewDiagnostics.some((item) => item.rule === "SDD_PLAN_REVIEW"));
});

test("open material corrections block only affected tasks", async (t) => {
  const affectedReady = await fixture(
    t,
    plan({
      correctionState: "OPEN",
      correctionEvidence: false,
      changeClass: "MATERIAL",
      changeCorrectionId: "C-01",
    }),
  );
  const blockedDiagnostics = await checkSddLifecycleDocument(
    affectedReady.file,
    affectedReady.root,
    SCHEMAS,
  );
  assert.ok(blockedDiagnostics.some((item) => item.rule === "SDD_OPEN_CORRECTION_TASK"));
  assert.ok(
    blockedDiagnostics.some((item) => item.rule === "SDD_OPEN_CORRECTION_FRESHNESS"),
  );

  const independentReady = await fixture(
    t,
    plan({
      secondTask: true,
      correctionState: "IN_REVIEW",
      correctionEvidence: false,
      affectedTasks: "T02",
      changeClass: "MATERIAL",
      changeCorrectionId: "C-01",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(independentReady.file, independentReady.root, SCHEMAS),
    [],
  );

  const completedHistory = await fixture(
    t,
    plan({
      status: "IMPLEMENTING",
      previousStatus: "READY",
      taskState: "DONE",
      taskFreshness: "STALE",
      next: "",
      correctionState: "OPEN",
      correctionEvidence: false,
      changeClass: "MATERIAL",
      changeCorrectionId: "C-01",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(completedHistory.file, completedHistory.root, SCHEMAS),
    [],
  );
});

test("material correction approval requires reconciliation and change-log evidence", async (t) => {
  const incomplete = await fixture(
    t,
    plan({
      correctionState: "APPROVED",
      correctionEvidence: false,
      changeClass: "MATERIAL",
      changeCorrectionId: "C-01",
    }),
  );
  const incompleteDiagnostics = await checkSddLifecycleDocument(
    incomplete.file,
    incomplete.root,
    SCHEMAS,
  );
  assert.ok(
    incompleteDiagnostics.some((item) => item.rule === "SDD_CORRECTION_APPROVAL_EVIDENCE"),
  );

  const unapprovedReview = await fixture(
    t,
    plan({
      correctionState: "APPROVED",
      reviewEvidence: "reviewer; CHANGES_REQUESTED; v2",
      changeClass: "MATERIAL",
      changeCorrectionId: "C-01",
    }),
  );
  const unapprovedReviewDiagnostics = await checkSddLifecycleDocument(
    unapprovedReview.file,
    unapprovedReview.root,
    SCHEMAS,
  );
  assert.ok(
    unapprovedReviewDiagnostics.some((item) => item.rule === "SDD_CORRECTION_REVIEW"),
  );

  const missingLink = await fixture(t, plan({ changeClass: "MATERIAL" }));
  const missingLinkDiagnostics = await checkSddLifecycleDocument(
    missingLink.file,
    missingLink.root,
    SCHEMAS,
  );
  assert.ok(
    missingLinkDiagnostics.some((item) => item.rule === "SDD_CHANGE_CORRECTION_REQUIRED"),
  );

  const approved = await fixture(
    t,
    plan({
      correctionState: "APPROVED",
      changeClass: "MATERIAL",
      changeCorrectionId: "C-01",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(approved.file, approved.root, SCHEMAS),
    [],
  );
});

test("artifact-specific schema versions do not force workflow migration", async (t) => {
  const oldPlan = await fixture(t, plan().replace("implementation-plan@2", "implementation-plan@1"));
  const planDiagnostics = await checkSddLifecycleDocument(oldPlan.file, oldPlan.root, SCHEMAS);
  assert.ok(planDiagnostics.some((item) => item.rule === "SDD_SCHEMA_VERSION"));

  const currentWorkflow = await fixture(t, workflow());
  assert.deepEqual(
    await checkSddLifecycleDocument(currentWorkflow.file, currentWorkflow.root, SCHEMAS),
    [],
  );
});

test("transitive freshness propagates only material or unknown changes", () => {
  const rows = [
    {
      "Artifact ID": "plan",
      "Depends on": "None",
      "Consumed version": "v1",
      "Current version": "v2",
      "Change impact": "MATERIAL",
      "Blocked by": "None",
    },
    {
      "Artifact ID": "receipt",
      "Depends on": "plan",
      "Consumed version": "v1",
      "Current version": "v1",
      "Change impact": "CONTROL_ONLY",
      "Blocked by": "None",
    },
    {
      "Artifact ID": "navigation",
      "Depends on": "None",
      "Consumed version": "v1",
      "Current version": "v2",
      "Change impact": "CONTROL_ONLY",
      "Blocked by": "None",
    },
  ];
  assert.deepEqual(
    Object.fromEntries(computeTransitiveFreshness(rows)),
    { plan: "STALE", receipt: "STALE", navigation: "CURRENT" },
  );
});

function workflow({
  state = "GATES_READY",
  previousState = "ARTIFACT_IN_REVIEW",
  planConsumed = "v1",
  planCurrent = "v1",
  impact = "CONTROL_ONLY",
  freshness = "CURRENT",
  blockerBlocks = "other-task",
  writeTarget = "docs/plan.md",
} = {}) {
  return `# Delivery Workflow

<!-- sdd-schema: delivery-workflow@1 -->

| Field | Value |
| --- | --- |
| State | \`${state}\` |
| Previous state | \`${previousState}\` |
| Current artifact/gate | \`plan\` |
| Next action | Prepare task |
| Next action target IDs | \`task-1\` |
| Allowed write scope | \`docs\` |
| Next action write targets | \`${writeTarget}\` |

<!-- sdd-section: delivery-manifest -->
| Order | Artifact | Decision | Review state/link |
| --- | --- | --- | --- |
| 1 | Plan | GENERATE_FULL | APPROVED |

<!-- sdd-section: artifact-dependencies -->
| Artifact ID | Depends on | Consumed version | Current version | Change impact | Freshness | Blocked by |
| --- | --- | --- | --- | --- | --- | --- |
| plan | None | ${planConsumed} | ${planCurrent} | ${impact} | ${freshness} | None |
| task-1 | plan | v1 | v1 | CONTROL_ONLY | ${freshness} | None |

<!-- sdd-section: blocker-register -->
| Blocker ID | Blocks | State |
| --- | --- | --- |
| B-01 | ${blockerBlocks} | OPEN |

<!-- sdd-section: delivery-state -->
| Field | Current value |
| --- | --- |
| Stale artifacts | \`None\` |
`;
}

test("GATES_READY rejects stale prerequisites and only scoped blockers", async (t) => {
  const valid = await fixture(t, workflow());
  assert.deepEqual(await checkSddLifecycleDocument(valid.file, valid.root, SCHEMAS), []);

  const stale = await fixture(
    t,
    workflow({ planCurrent: "v2", impact: "MATERIAL", freshness: "CURRENT" }),
  );
  const staleDiagnostics = await checkSddLifecycleDocument(stale.file, stale.root, SCHEMAS);
  assert.ok(staleDiagnostics.some((item) => item.rule === "SDD_FRESHNESS_MISMATCH"));
  assert.ok(staleDiagnostics.some((item) => item.rule === "SDD_GATES_NOT_READY"));

  const blocked = await fixture(t, workflow({ blockerBlocks: "task-1" }));
  const blockedDiagnostics = await checkSddLifecycleDocument(blocked.file, blocked.root, SCHEMAS);
  assert.ok(blockedDiagnostics.some((item) => item.rule === "SDD_BLOCKED_NEXT"));
});

test("next-action write targets must stay within allowed scope", async (t) => {
  const invalid = await fixture(t, workflow({ state: "ARTIFACT_GENERATING", writeTarget: "app/code.py" }));
  const diagnostics = await checkSddLifecycleDocument(invalid.file, invalid.root, SCHEMAS);
  assert.ok(diagnostics.some((item) => item.rule === "SDD_WRITE_SCOPE"));
});

test("workflow lifecycle rejects illegal transitions and unsafe relative targets", async (t) => {
  const illegal = await fixture(t, workflow({ previousState: "AWAITING_HANDOFF" }));
  const transitionDiagnostics = await checkSddLifecycleDocument(illegal.file, illegal.root, SCHEMAS);
  assert.ok(transitionDiagnostics.some((item) => item.rule === "SDD_ILLEGAL_TRANSITION"));

  const traversal = await fixture(t, workflow({ state: "ARTIFACT_GENERATING", previousState: "ARTIFACTS_SELECTED", writeTarget: "docs/../app/code.py" }));
  const scopeDiagnostics = await checkSddLifecycleDocument(traversal.file, traversal.root, SCHEMAS);
  assert.ok(scopeDiagnostics.some((item) => item.rule === "SDD_WRITE_SCOPE"));
});
