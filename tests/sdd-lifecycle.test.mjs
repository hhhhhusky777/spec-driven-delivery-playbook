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

async function linkedFixture(t, workflowContent, planContent) {
  const root = await mkdtemp(path.join(os.tmpdir(), "sdd-lifecycle-linked-test-"));
  t.after(async () => rm(root, { recursive: true, force: true }));
  const workflowFile = path.join(root, "delivery-workflow.md");
  const planFile = path.join(root, "implementation-plan.md");
  await writeFile(workflowFile, workflowContent, "utf8");
  await writeFile(planFile, planContent, "utf8");
  return { root, workflowFile, planFile };
}

const PLAN_SECTIONS = `
<!-- sdd-section: task-state-rules -->
<!-- sdd-section: definition-of-ready -->
<!-- sdd-section: context-receipt-gate -->
<!-- sdd-section: definition-of-done -->
<!-- sdd-section: task-ledger -->
<!-- sdd-section: task-specifications -->`;

function plan({
  status = "READY",
  previousStatus = "CONTRACT_REVIEW",
  reviewState = "APPROVED",
  taskState = "READY",
  next = "NEXT",
  spec = true,
  specState = "COMPLETE",
  selfReviewState = "SELF_REVIEW_PASSED",
  selfReviewRevision = "candidate-v1",
  selfReviewEvidence = "reviews/self-review.md",
} = {}) {
  return `# Plan

<!-- sdd-schema: implementation-plan@1; mode: FULL -->

| Field | Value |
| --- | --- |
| Status | \`${status}\` |
| Previous status | \`${previousStatus}\` |
| Plan mode | \`FULL\` |
| Next ready task(s) | \`T01\` |
| Blockers | \`None\` |
| Review state | \`${reviewState}\` |
| Self-review state | \`${selfReviewState}\` |
| Self-review candidate revision | \`${selfReviewRevision}\` |
| Self-review evidence | \`${selfReviewEvidence}\` |

${PLAN_SECTIONS}

| ID | State | Next | Depends on | Blocked by | Source freshness | Spec state |
| --- | --- | --- | --- | --- | --- | --- |
| \`T01\` | \`${taskState}\` | \`${next}\` | \`None\` | \`None\` | \`CURRENT\` | \`${specState}\` |

${spec ? "<!-- sdd-task-spec: T01 -->" : ""}
`;
}

function validatingPlan({
  taskOneState = "DONE",
  taskOneNext = "",
  taskTwoState = "DONE",
  taskTwoNext = "",
  nextReadyTasks = "None",
} = {}) {
  return `# Plan

<!-- sdd-schema: implementation-plan@1; mode: FULL -->

| Field | Value |
| --- | --- |
| Status | \`VALIDATING\` |
| Previous status | \`IMPLEMENTING\` |
| Plan mode | \`FULL\` |
| Next ready task(s) | \`${nextReadyTasks}\` |
| Blockers | \`None\` |
| Review state | \`APPROVED\` |
| Self-review state | \`SELF_REVIEW_PASSED\` |
| Self-review candidate revision | \`candidate-v1\` |
| Self-review evidence | \`reviews/self-review.md\` |

${PLAN_SECTIONS}

| ID | State | Next | Depends on | Blocked by | Source freshness | Spec state |
| --- | --- | --- | --- | --- | --- | --- |
| \`T01\` | \`${taskOneState}\` | \`${taskOneNext}\` | \`None\` | \`None\` | \`CURRENT\` | \`COMPLETE\` |
| \`T02\` | \`${taskTwoState}\` | \`${taskTwoNext}\` | \`T01\` | \`None\` | \`CURRENT\` | \`COMPLETE\` |

<!-- sdd-task-spec: T01 -->
<!-- sdd-task-spec: T02 -->
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
  const planned = await fixture(t, plan({ status: "CONTRACT_REVIEW", previousStatus: "DRAFT", reviewState: "IN_REVIEW", taskState: "PLANNED", next: "", spec: false, specState: "SPEC_PENDING" }));
  assert.deepEqual(await checkSddLifecycleDocument(planned.file, planned.root, SCHEMAS), []);

  const ready = await fixture(t, plan({ spec: false }));
  const diagnostics = await checkSddLifecycleDocument(ready.file, ready.root, SCHEMAS);
  assert.ok(diagnostics.some((item) => item.rule === "SDD_TASK_SPEC_REQUIRED"));
});

test("task Spec state is objective and consistent with task readiness", async (t) => {
  const unknown = await fixture(t, plan({ specState: "DRAFT" }));
  const unknownDiagnostics = await checkSddLifecycleDocument(
    unknown.file,
    unknown.root,
    SCHEMAS,
  );
  assert.ok(
    unknownDiagnostics.some((item) => item.rule === "SDD_TASK_SPEC_STATE"),
  );

  const pendingReady = await fixture(t, plan({ specState: "SPEC_PENDING" }));
  const pendingDiagnostics = await checkSddLifecycleDocument(
    pendingReady.file,
    pendingReady.root,
    SCHEMAS,
  );
  assert.ok(
    pendingDiagnostics.some((item) => item.rule === "SDD_TASK_SPEC_INCOMPLETE"),
  );

  const unsupportedComplete = await fixture(
    t,
    plan({
      status: "CONTRACT_REVIEW",
      previousStatus: "DRAFT",
      reviewState: "IN_REVIEW",
      taskState: "PLANNED",
      next: "",
      spec: false,
      specState: "COMPLETE",
    }),
  );
  const unsupportedDiagnostics = await checkSddLifecycleDocument(
    unsupportedComplete.file,
    unsupportedComplete.root,
    SCHEMAS,
  );
  assert.ok(
    unsupportedDiagnostics.some((item) => item.rule === "SDD_TASK_SPEC_REQUIRED"),
  );
});

test("plan lifecycle and review gates reject illegal READY transitions", async (t) => {
  const illegal = await fixture(t, plan({ previousStatus: "DRAFT" }));
  const transitionDiagnostics = await checkSddLifecycleDocument(illegal.file, illegal.root, SCHEMAS);
  assert.ok(transitionDiagnostics.some((item) => item.rule === "SDD_ILLEGAL_TRANSITION"));

  const unapproved = await fixture(t, plan({ reviewState: "IN_REVIEW" }));
  const reviewDiagnostics = await checkSddLifecycleDocument(unapproved.file, unapproved.root, SCHEMAS);
  assert.ok(reviewDiagnostics.some((item) => item.rule === "SDD_PLAN_REVIEW"));

  const missingSelfReview = await fixture(
    t,
    plan({ selfReviewState: "NOT_STARTED", selfReviewRevision: "Not recorded" }),
  );
  const selfReviewDiagnostics = await checkSddLifecycleDocument(
    missingSelfReview.file,
    missingSelfReview.root,
    SCHEMAS,
  );
  assert.ok(
    selfReviewDiagnostics.some((item) => item.rule === "SDD_SELF_REVIEW_STATE"),
  );
  assert.ok(
    selfReviewDiagnostics.some((item) => item.rule === "SDD_SELF_REVIEW_EVIDENCE"),
  );
});

test("VALIDATING plan requires every ledger task terminal and no next task", async (t) => {
  const verifying = await fixture(
    t,
    validatingPlan({ taskOneState: "VERIFYING", taskTwoState: "PLANNED" }),
  );
  const verifyingDiagnostics = await checkSddLifecycleDocument(
    verifying.file,
    verifying.root,
    SCHEMAS,
  );
  assert.ok(
    verifyingDiagnostics.some((item) => item.rule === "SDD_PLAN_VALIDATING_TASKS"),
  );

  const next = await fixture(
    t,
    validatingPlan({ taskOneNext: "NEXT", nextReadyTasks: "T01" }),
  );
  const nextDiagnostics = await checkSddLifecycleDocument(next.file, next.root, SCHEMAS);
  assert.ok(
    nextDiagnostics.some((item) => item.rule === "SDD_PLAN_VALIDATING_NEXT"),
  );
  assert.ok(
    nextDiagnostics.some((item) => item.rule === "SDD_PLAN_VALIDATING_NEXT_READY"),
  );

  const terminal = await fixture(t, validatingPlan({ taskTwoState: "CANCELLED" }));
  assert.deepEqual(
    await checkSddLifecycleDocument(terminal.file, terminal.root, SCHEMAS),
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
  planLink = "[Plan](implementation-plan.md)",
  includePlan = true,
  reviewMode = "EXPLICIT_REVIEW",
  semanticDecision = "NO",
  automaticGateResult = "NOT_APPLICABLE",
  automationBoundary = "task-1",
  automationException = "None",
  artifactReviewState = "APPROVED",
  selfReviewState = "SELF_REVIEW_PASSED",
  selfReviewRevision = "candidate-v1",
  selfReviewEvidence = "reviews/self-review.md",
  implementationMode = "HUMAN_REVIEW_BEFORE_MERGE",
  implementationModeAuthority = "user instruction 2026-09-03",
  implementationModeScope = "task-1",
  implementationModeSelectedAt = "2026-09-03 10:00 UTC",
  postMergeHumanReview = null,
} = {}) {
  const manifestRow = includePlan
    ? "| 1 | Plan | GENERATE_FULL | APPROVED |"
    : "| 1 | Documentation | REUSE | APPROVED |";
  const dependencyRows = includePlan
    ? `| plan | ${planLink} | None | ${planConsumed} | ${planCurrent} | ${impact} | ${freshness} | None |
| task-1 | Task 1 | plan | v1 | v1 | CONTROL_ONLY | ${freshness} | None |`
    : `| task-1 | Task 1 | None | v1 | v1 | CONTROL_ONLY | ${freshness} | None |`;
  return `# Delivery Workflow

<!-- sdd-schema: delivery-workflow@1 -->

| Field | Value |
| --- | --- |
| State | \`${state}\` |
| Previous state | \`${previousState}\` |
| Current artifact/gate | \`plan\` |
| Current artifact review state | \`${artifactReviewState}\` |
| Self-review state | \`${selfReviewState}\` |
| Self-review candidate revision | \`${selfReviewRevision}\` |
| Self-review evidence | \`${selfReviewEvidence}\` |
| Implementation continuation mode | \`${implementationMode}\` |
| Implementation mode authority | \`${implementationModeAuthority}\` |
| Implementation mode scope | \`${implementationModeScope}\` |
| Implementation mode selected at | \`${implementationModeSelectedAt}\` |
| Next action | Prepare task |
| Next action target IDs | \`task-1\` |
| Allowed write scope | \`docs\` |
| Next action write targets | \`${writeTarget}\` |
| Review mode | \`${reviewMode}\` |
| Review mode authority | \`docs/development-policy.md\` |
| Automation boundary | \`${automationBoundary}\` |
| Required automatic gates | \`docs:all\` |
| Automatic gate result | \`${automaticGateResult}\` |
| Semantic decision introduced | \`${semanticDecision}\` |
| Automation exception | \`${automationException}\` |
| Automation audit record | \`docs/automation-audit.md\` |

<!-- sdd-section: delivery-manifest -->
| Order | Artifact | Decision | Review state/link |
| --- | --- | --- | --- |
${manifestRow}

<!-- sdd-section: artifact-dependencies -->
| Artifact ID | Artifact/link | Depends on | Consumed version | Current version | Change impact | Freshness | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
${dependencyRows}

<!-- sdd-section: blocker-register -->
| Blocker ID | Blocks | State |
| --- | --- | --- |
| B-01 | ${blockerBlocks} | OPEN |

<!-- sdd-section: delivery-state -->
| Field | Current value |
| --- | --- |
| Stale artifacts | \`None\` |

${postMergeHumanReview === null ? "" : `| Task/PR | Head and merge commit | Implementation mode/authority | Self-review | Required checks | Merge result | Human review | Findings/follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T01 / PR-1 | head-1 / merge-1 | AGENT_AUTO_MERGE / user | review-1 | checks-1 | merged | ${postMergeHumanReview} | None |`}
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

  const missingSelfReview = await fixture(
    t,
    workflow({ selfReviewState: "NOT_STARTED", selfReviewEvidence: "Not recorded" }),
  );
  const selfReviewDiagnostics = await checkSddLifecycleDocument(
    missingSelfReview.file,
    missingSelfReview.root,
    SCHEMAS,
  );
  assert.ok(
    selfReviewDiagnostics.some((item) => item.rule === "SDD_SELF_REVIEW_STATE"),
  );
  assert.ok(
    selfReviewDiagnostics.some((item) => item.rule === "SDD_SELF_REVIEW_EVIDENCE"),
  );
});

test("next-action write targets must stay within allowed scope", async (t) => {
  const invalid = await fixture(t, workflow({ state: "ARTIFACT_GENERATING", writeTarget: "app/code.py" }));
  const diagnostics = await checkSddLifecycleDocument(invalid.file, invalid.root, SCHEMAS);
  assert.ok(diagnostics.some((item) => item.rule === "SDD_WRITE_SCOPE"));
});

test("automatic continuation fails closed on invalid mode, decisions, or gates", async (t) => {
  const invalidMode = await fixture(t, workflow({ reviewMode: "FAST_TRACK" }));
  const invalidModeDiagnostics = await checkSddLifecycleDocument(
    invalidMode.file,
    invalidMode.root,
    SCHEMAS,
  );
  assert.ok(
    invalidModeDiagnostics.some((item) => item.rule === "SDD_REVIEW_MODE"),
  );

  const semantic = await fixture(
    t,
    workflow({
      reviewMode: "AUTO_CONTINUE",
      semanticDecision: "YES",
      automaticGateResult: "PASS",
    }),
  );
  const semanticDiagnostics = await checkSddLifecycleDocument(
    semantic.file,
    semantic.root,
    SCHEMAS,
  );
  assert.ok(
    semanticDiagnostics.some((item) => item.rule === "SDD_AUTO_SEMANTIC_DECISION"),
  );

  const failedGate = await fixture(
    t,
    workflow({
      reviewMode: "REVIEW_ON_EXCEPTION",
      automaticGateResult: "FAIL",
    }),
  );
  const failedGateDiagnostics = await checkSddLifecycleDocument(
    failedGate.file,
    failedGate.root,
    SCHEMAS,
  );
  assert.ok(
    failedGateDiagnostics.some((item) => item.rule === "SDD_AUTO_GATE_BLOCKED"),
  );

  const missingBoundary = await fixture(
    t,
    workflow({
      reviewMode: "AUTO_CONTINUE",
      automaticGateResult: "PASS",
      automationBoundary: "None",
    }),
  );
  const missingBoundaryDiagnostics = await checkSddLifecycleDocument(
    missingBoundary.file,
    missingBoundary.root,
    SCHEMAS,
  );
  assert.ok(
    missingBoundaryDiagnostics.some(
      (item) => item.rule === "SDD_AUTO_CONFIGURATION",
    ),
  );

  const exception = await fixture(
    t,
    workflow({
      reviewMode: "REVIEW_ON_EXCEPTION",
      automaticGateResult: "PASS",
      automationException: "unexpected output",
    }),
  );
  const exceptionDiagnostics = await checkSddLifecycleDocument(
    exception.file,
    exception.root,
    SCHEMAS,
  );
  assert.ok(
    exceptionDiagnostics.some((item) => item.rule === "SDD_AUTO_EXCEPTION"),
  );

  const valid = await fixture(
    t,
    workflow({ reviewMode: "AUTO_CONTINUE", automaticGateResult: "PASS" }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(valid.file, valid.root, SCHEMAS),
    [],
  );
});

test("implementation continuation is user-selected, implementation-only, and fail closed", async (t) => {
  const awaitingChoice = await fixture(
    t,
    workflow({
      implementationMode: "NOT_SELECTED",
      implementationModeAuthority: "Not selected",
      implementationModeScope: "Not selected",
      implementationModeSelectedAt: "Not selected",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(awaitingChoice.file, awaitingChoice.root, SCHEMAS),
    [],
  );

  const designAuto = await fixture(
    t,
    workflow({
      state: "ARTIFACT_GENERATING",
      previousState: "ARTIFACTS_SELECTED",
      artifactReviewState: "NOT_STARTED",
      selfReviewState: "NOT_STARTED",
      selfReviewRevision: "Not applicable",
      selfReviewEvidence: "Not applicable",
      implementationMode: "AGENT_AUTO_MERGE",
    }),
  );
  const designDiagnostics = await checkSddLifecycleDocument(
    designAuto.file,
    designAuto.root,
    SCHEMAS,
  );
  assert.ok(
    designDiagnostics.some((item) => item.rule === "SDD_IMPLEMENTATION_MODE_PHASE"),
  );

  const missingChoice = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "NOT_SELECTED",
      implementationModeAuthority: "Not selected",
      implementationModeScope: "Not selected",
      implementationModeSelectedAt: "Not selected",
    }),
  );
  const missingChoiceDiagnostics = await checkSddLifecycleDocument(
    missingChoice.file,
    missingChoice.root,
    SCHEMAS,
  );
  assert.ok(
    missingChoiceDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_MODE_REQUIRED",
    ),
  );

  const missingAuthority = await fixture(
    t,
    workflow({ implementationModeAuthority: "Not selected" }),
  );
  const authorityDiagnostics = await checkSddLifecycleDocument(
    missingAuthority.file,
    missingAuthority.root,
    SCHEMAS,
  );
  assert.ok(
    authorityDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_MODE_AUTHORITY",
    ),
  );

  const pendingReview = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "AGENT_AUTO_MERGE",
      postMergeHumanReview: "PENDING",
    }),
  );
  const pendingDiagnostics = await checkSddLifecycleDocument(
    pendingReview.file,
    pendingReview.root,
    SCHEMAS,
  );
  assert.ok(
    pendingDiagnostics.some((item) => item.rule === "SDD_POST_MERGE_REVIEW_OPEN"),
  );

  const reviewed = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "AGENT_AUTO_MERGE",
      postMergeHumanReview: "ACCEPTED",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(reviewed.file, reviewed.root, SCHEMAS),
    [],
  );
});

test("workflow lifecycle rejects illegal transitions and unsafe relative targets", async (t) => {
  const illegal = await fixture(t, workflow({ previousState: "AWAITING_HANDOFF" }));
  const transitionDiagnostics = await checkSddLifecycleDocument(illegal.file, illegal.root, SCHEMAS);
  assert.ok(transitionDiagnostics.some((item) => item.rule === "SDD_ILLEGAL_TRANSITION"));

  const traversal = await fixture(t, workflow({ state: "ARTIFACT_GENERATING", previousState: "ARTIFACTS_SELECTED", writeTarget: "docs/../app/code.py" }));
  const scopeDiagnostics = await checkSddLifecycleDocument(traversal.file, traversal.root, SCHEMAS);
  assert.ok(scopeDiagnostics.some((item) => item.rule === "SDD_WRITE_SCOPE"));
});

test("VALIDATING workflow requires its current linked plan to be VALIDATING", async (t) => {
  const premature = await linkedFixture(
    t,
    workflow({ state: "VALIDATING", previousState: "DELIVERY_ACTIVE" }),
    plan({
      status: "IMPLEMENTING",
      previousStatus: "READY",
      taskState: "VERIFYING",
      next: "",
    }),
  );
  const prematureDiagnostics = await checkSddLifecycleDocument(
    premature.workflowFile,
    premature.root,
    SCHEMAS,
  );
  assert.ok(
    prematureDiagnostics.some((item) => item.rule === "SDD_WORKFLOW_PLAN_STATE"),
  );

  const missingLink = await fixture(
    t,
    workflow({
      state: "VALIDATING",
      previousState: "DELIVERY_ACTIVE",
      planLink: "Plan",
    }),
  );
  const missingLinkDiagnostics = await checkSddLifecycleDocument(
    missingLink.file,
    missingLink.root,
    SCHEMAS,
  );
  assert.ok(
    missingLinkDiagnostics.some((item) => item.rule === "SDD_WORKFLOW_PLAN_LINK"),
  );

  const aligned = await linkedFixture(
    t,
    workflow({ state: "VALIDATING", previousState: "DELIVERY_ACTIVE" }),
    validatingPlan(),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(aligned.planFile, aligned.root, SCHEMAS),
    [],
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(aligned.workflowFile, aligned.root, SCHEMAS),
    [],
  );

  const routeZero = await fixture(
    t,
    workflow({
      state: "VALIDATING",
      previousState: "DELIVERY_ACTIVE",
      includePlan: false,
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(routeZero.file, routeZero.root, SCHEMAS),
    [],
  );
});

test("workflow may return from VALIDATING to DELIVERY_ACTIVE", async (t) => {
  const correction = await fixture(
    t,
    workflow({ state: "DELIVERY_ACTIVE", previousState: "VALIDATING" }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(correction.file, correction.root, SCHEMAS),
    [],
  );
});
