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
  freshReviewState = "APPROVED",
  freshReviewSessionId = "RS-01",
  freshAssignedReviewers = "reviewer-1, reviewer-2",
  freshRequiredApprovals = "2",
  freshApprovedReviewers = "reviewer-1, reviewer-2",
  freshReviewRevision = "candidate-v1",
  freshReviewEvidence = "reviews/fresh-review.md",
  humanReviewState = "APPROVED",
  humanReviewRevision = "candidate-v1",
  humanReviewEvidence = "reviews/human-review.md",
} = {}) {
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
| Self-review state | \`${selfReviewState}\` |
| Self-review candidate revision | \`${selfReviewRevision}\` |
| Self-review evidence | \`${selfReviewEvidence}\` |
| Fresh-context review state | \`${freshReviewState}\` |
| Fresh-context review session ID | \`${freshReviewSessionId}\` |
| Fresh-context assigned reviewers | \`${freshAssignedReviewers}\` |
| Fresh-context required approvals | \`${freshRequiredApprovals}\` |
| Fresh-context approved reviewers | \`${freshApprovedReviewers}\` |
| Fresh-context reviewed revision | \`${freshReviewRevision}\` |
| Fresh-context review evidence | \`${freshReviewEvidence}\` |
| Human review state | \`${humanReviewState}\` |
| Human reviewed revision | \`${humanReviewRevision}\` |
| Human review evidence | \`${humanReviewEvidence}\` |

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

<!-- sdd-schema: implementation-plan@2; mode: FULL -->

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
| Fresh-context review state | \`APPROVED\` |
| Fresh-context review session ID | \`RS-01\` |
| Fresh-context assigned reviewers | \`reviewer-1, reviewer-2\` |
| Fresh-context required approvals | \`2\` |
| Fresh-context approved reviewers | \`reviewer-1, reviewer-2\` |
| Fresh-context reviewed revision | \`candidate-v1\` |
| Fresh-context review evidence | \`reviews/fresh-review.md\` |
| Human review state | \`APPROVED\` |
| Human reviewed revision | \`candidate-v1\` |
| Human review evidence | \`reviews/human-review.md\` |

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

  const oneReviewerInReview = await fixture(
    t,
    plan({
      reviewState: "IN_REVIEW",
      freshReviewState: "NOT_STARTED",
      freshAssignedReviewers: "reviewer-1",
      freshRequiredApprovals: "1",
      freshApprovedReviewers: "Not recorded",
    }),
  );
  const oneReviewerInReviewDiagnostics = await checkSddLifecycleDocument(
    oneReviewerInReview.file,
    oneReviewerInReview.root,
    SCHEMAS,
  );
  assert.ok(
    oneReviewerInReviewDiagnostics.some(
      (item) => item.rule === "SDD_FRESH_REVIEW_SESSION",
    ),
  );

  const oneReviewerChangesRequested = await fixture(
    t,
    plan({
      reviewState: "CHANGES_REQUESTED",
      freshReviewState: "CHANGES_REQUESTED",
      freshAssignedReviewers: "reviewer-1",
      freshRequiredApprovals: "1",
      freshApprovedReviewers: "Not recorded",
    }),
  );
  const oneReviewerChangesRequestedDiagnostics = await checkSddLifecycleDocument(
    oneReviewerChangesRequested.file,
    oneReviewerChangesRequested.root,
    SCHEMAS,
  );
  assert.ok(
    oneReviewerChangesRequestedDiagnostics.some(
      (item) => item.rule === "SDD_FRESH_REVIEW_SESSION",
    ),
  );

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

  const missingFreshReview = await fixture(
    t,
    plan({
      freshReviewState: "CHANGES_REQUESTED",
      freshReviewEvidence: "Not recorded",
    }),
  );
  const freshReviewDiagnostics = await checkSddLifecycleDocument(
    missingFreshReview.file,
    missingFreshReview.root,
    SCHEMAS,
  );
  assert.ok(
    freshReviewDiagnostics.some((item) => item.rule === "SDD_FRESH_REVIEW_STATE"),
  );
  assert.ok(
    freshReviewDiagnostics.some((item) => item.rule === "SDD_FRESH_REVIEW_EVIDENCE"),
  );

  const missingHumanReview = await fixture(
    t,
    plan({
      humanReviewState: "NOT_STARTED",
      humanReviewEvidence: "Not recorded",
    }),
  );
  const humanReviewDiagnostics = await checkSddLifecycleDocument(
    missingHumanReview.file,
    missingHumanReview.root,
    SCHEMAS,
  );
  assert.ok(
    humanReviewDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_STATE"),
  );

  assert.ok(
    humanReviewDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_EVIDENCE"),
  );

  const mismatchedReview = await fixture(
    t,
    plan({ freshReviewRevision: "candidate-v0", humanReviewRevision: "candidate-v2" }),
  );
  const mismatchDiagnostics = await checkSddLifecycleDocument(
    mismatchedReview.file,
    mismatchedReview.root,
    SCHEMAS,
  );
  assert.equal(
    mismatchDiagnostics.filter((item) => item.rule === "SDD_REVIEW_REVISION_MISMATCH").length,
    2,
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
      "Artifact ID": "Plan",
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
  nextActionTargetIds = "task-1",
  writeTarget = "docs/plan.md",
  planLink = "[Plan](implementation-plan.md)",
  includePlan = true,
  reviewMode = "EXPLICIT_REVIEW",
  semanticDecision = "NO",
  automaticGateResult = "NOT_APPLICABLE",
  automationBoundary = "task-1",
  automationException = "None",
  includeManifestTable = true,
  includeDependencyTable = true,
  includeDependencyRows = true,
  includeBlockerTable = true,
  workflowArtifactId = "workflow",
  workflowConsumed = "v1",
  workflowCurrent = "v1",
  workflowImpact = "CONTROL_ONLY",
  workflowFreshness = "CURRENT",
  extraDependencyRows = "",
  artifactReviewState = "APPROVED",
  currentReviewPhase,
  currentReviewTargetId = "task-1",
  currentArtifactGate,
  selfReviewState = "SELF_REVIEW_PASSED",
  selfReviewRevision = "candidate-v1",
  selfReviewEvidence = "reviews/self-review.md",
  freshReviewState = "APPROVED",
  freshReviewSessionId = "RS-01",
  freshAssignedReviewers = "reviewer-1, reviewer-2",
  freshRequiredApprovals = "2",
  freshApprovedReviewers = "reviewer-1, reviewer-2",
  freshReviewRevision = "candidate-v1",
  freshReviewEvidence = "reviews/fresh-review.md",
  humanReviewState,
  humanReviewRevision,
  humanReviewEvidence,
  implementationMode = "HUMAN_REVIEW_BEFORE_MERGE",
  implementationModeAuthority = "user instruction 2026-09-03",
  implementationModeScope = "task-1",
  implementationRepository = "https://github.com/example/project",
  implementationModeSelectedAt = "2026-09-03 10:00 UTC",
  manifestReviewState = "APPROVED",
  manifestArtifactId,
  manifestArtifact,
  taskDependsOn,
  postMergeHumanReview = null,
  postMergeFreshReview = "APPROVED HEAD 1111111111111111111111111111111111111111 / [fresh review](reviews/fresh-review.md)",
  postMergeResult = "MERGED / [merge](https://github.com/example/project/commit/2222222222222222222222222222222222222222)",
  postMergeMode = "AGENT_AUTO_MERGE / [authority](delivery-workflow.md)",
  postMergeTaskPr = "task-1 / [PR #1](https://github.com/example/project/pull/1)",
  postMergeRevisions = "HEAD 1111111111111111111111111111111111111111 / MERGE 2222222222222222222222222222222222222222",
  postMergeSelfReview = "SELF_REVIEW_PASSED HEAD 1111111111111111111111111111111111111111 / [self review](reviews/self-review.md)",
  postMergeChecks = "PASS HEAD 1111111111111111111111111111111111111111 / [checks](https://github.com/example/project/actions/runs/1)",
  postMergeFindings = "None",
  includeReviewLedger = true,
  reviewLedgerHumanHeader = "Human review",
} = {}) {
  const resolvedHumanReviewState =
    humanReviewState ??
    (state === "DELIVERY_ACTIVE" && implementationMode === "AGENT_AUTO_MERGE"
      ? "NOT_APPLICABLE"
      : "APPROVED");
  const resolvedHumanReviewRevision =
    humanReviewRevision ??
    (resolvedHumanReviewState === "NOT_APPLICABLE" ? "Not applicable" : "candidate-v1");
  const resolvedHumanReviewEvidence =
    humanReviewEvidence ??
    (resolvedHumanReviewState === "NOT_APPLICABLE"
      ? "Not applicable"
      : "reviews/human-review.md");
  const resolvedReviewPhase =
    currentReviewPhase ??
    (state === "DELIVERY_ACTIVE"
      ? "IMPLEMENTATION"
      : state === "VALIDATING"
        ? "VALIDATION"
        : ["COMPLETE", "ARCHIVED"].includes(state)
          ? "ARCHIVE"
          : "DESIGN");
  const resolvedArtifactGate =
    currentArtifactGate ??
    (resolvedReviewPhase === "IMPLEMENTATION"
      ? `[task-1 PR #1](https://github.com/example/project/pull/1)`
      : `[plan](implementation-plan.md)`);
  const resolvedManifestArtifactId =
    manifestArtifactId ?? (includePlan ? "plan" : "documentation");
  const dependencyRows = includePlan
    ? `| whiteboard | Whiteboard | None | v1 | v1 | CONTROL_ONLY | CURRENT | None |
| ${workflowArtifactId} | Workflow | whiteboard | ${workflowConsumed} | ${workflowCurrent} | ${workflowImpact} | ${workflowFreshness} | None |
| plan | ${planLink} | workflow | ${planConsumed} | ${planCurrent} | ${impact} | ${freshness} | None |
| task-1 | Task 1 | ${taskDependsOn ?? "plan"} | v1 | v1 | CONTROL_ONLY | ${freshness} | None |${extraDependencyRows}`
    : `| whiteboard | Whiteboard | None | v1 | v1 | CONTROL_ONLY | CURRENT | None |
| ${workflowArtifactId} | Workflow | whiteboard | ${workflowConsumed} | ${workflowCurrent} | ${workflowImpact} | ${workflowFreshness} | None |
| documentation | Documentation | workflow | v1 | v1 | CONTROL_ONLY | CURRENT | None |
| task-1 | Task 1 | ${taskDependsOn ?? "workflow"} | v1 | v1 | CONTROL_ONLY | ${freshness} | None |${extraDependencyRows}`;
  const resolvedManifestArtifact =
    manifestArtifact ?? (includePlan ? "Plan" : "Documentation");
  return `# Delivery Workflow

<!-- sdd-schema: delivery-workflow@2 -->

| Field | Value |
| --- | --- |
| State | \`${state}\` |
| Previous state | \`${previousState}\` |
| Current artifact/gate | ${resolvedArtifactGate} |
| Current review phase | \`${resolvedReviewPhase}\` |
| Current review target ID | \`${currentReviewTargetId}\` |
| Current artifact review state | \`${artifactReviewState}\` |
| Self-review state | \`${selfReviewState}\` |
| Self-review candidate revision | \`${selfReviewRevision}\` |
| Self-review evidence | \`${selfReviewEvidence}\` |
| Fresh-context review state | \`${freshReviewState}\` |
| Fresh-context review session ID | \`${freshReviewSessionId}\` |
| Fresh-context assigned reviewers | \`${freshAssignedReviewers}\` |
| Fresh-context required approvals | \`${freshRequiredApprovals}\` |
| Fresh-context approved reviewers | \`${freshApprovedReviewers}\` |
| Fresh-context reviewed revision | \`${freshReviewRevision}\` |
| Fresh-context review evidence | \`${freshReviewEvidence}\` |
| Human review state | \`${resolvedHumanReviewState}\` |
| Human reviewed revision | \`${resolvedHumanReviewRevision}\` |
| Human review evidence | \`${resolvedHumanReviewEvidence}\` |
| Implementation continuation mode | \`${implementationMode}\` |
| Implementation mode authority | \`${implementationModeAuthority}\` |
| Implementation mode scope | \`${implementationModeScope}\` |
| Implementation repository | \`${implementationRepository}\` |
| Implementation mode selected at | \`${implementationModeSelectedAt}\` |
| Next action | Prepare task |
| Next action target IDs | \`${nextActionTargetIds}\` |
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
${includeManifestTable ? `| Order | Artifact ID | Artifact | Decision | Reason/trigger | Template or authority | Owner | Review owner | Review state/link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ${resolvedManifestArtifactId} | ${resolvedManifestArtifact} | ${includePlan ? "GENERATE_FULL" : "REUSE"} | Required | artifact.md | Author | Reviewer | ${manifestReviewState} |` : ""}

<!-- sdd-section: artifact-dependencies -->
${includeDependencyTable ? `| Artifact ID | Artifact/link | Depends on | Consumed version | Current version | Change impact | Freshness | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
${includeDependencyRows ? dependencyRows : ""}` : ""}

<!-- sdd-section: blocker-register -->
${includeBlockerTable ? `| Blocker ID | Evidence/unblock condition | Blocks | State | Owner |
| --- | --- | --- | --- | --- |
| B-01 | evidence | ${blockerBlocks} | OPEN | owner |` : ""}

<!-- sdd-section: delivery-state -->
| Field | Current value |
| --- | --- |
| Stale artifacts | \`None\` |

<!-- sdd-section: implementation-review-ledger -->
${includeReviewLedger ? `| Task/PR | Head and merge commit | Implementation mode/authority | Self-review | Fresh-context review | Required checks | Merge result | ${reviewLedgerHumanHeader} | Findings/follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${postMergeHumanReview === null ? "" : `| ${postMergeTaskPr} | ${postMergeRevisions} | ${postMergeMode} | ${postMergeSelfReview} | ${postMergeFreshReview} | ${postMergeChecks} | ${postMergeResult} | ${postMergeHumanReview} | ${postMergeFindings} |`}` : ""}
`;
}

test("GATES_READY rejects stale prerequisites and only scoped blockers", async (t) => {
  const valid = await fixture(t, workflow());
  assert.deepEqual(await checkSddLifecycleDocument(valid.file, valid.root, SCHEMAS), []);

  const twoReviewerSession = await fixture(
    t,
    workflow({
      freshAssignedReviewers: "reviewer-1, reviewer-2",
      freshRequiredApprovals: "2",
      freshApprovedReviewers: "reviewer-1, reviewer-2",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(
      twoReviewerSession.file,
      twoReviewerSession.root,
      SCHEMAS,
    ),
    [],
  );

  for (const sessionOverride of [
    { freshReviewSessionId: "Pending" },
    {
      freshAssignedReviewers: "reviewer-1",
      freshRequiredApprovals: "1",
      freshApprovedReviewers: "reviewer-1",
    },
    { freshAssignedReviewers: "reviewer-1, reviewer-1", freshRequiredApprovals: "2" },
    {
      freshAssignedReviewers: "/root/reviewer-1, root/reviewer-1",
      freshRequiredApprovals: "2",
      freshApprovedReviewers: "/root/reviewer-1, root/reviewer-1",
    },
    {
      freshAssignedReviewers: "reviewer-1, reviewer-2, reviewer-3",
      freshRequiredApprovals: "2",
      freshApprovedReviewers: "reviewer-1, reviewer-2, reviewer-3",
    },
    {
      freshAssignedReviewers: "reviewer-1, reviewer-2",
      freshRequiredApprovals: "1",
      freshApprovedReviewers: "reviewer-1, reviewer-2",
    },
    {
      freshAssignedReviewers: "reviewer-1, reviewer-2",
      freshRequiredApprovals: "2",
      freshApprovedReviewers: "reviewer-1",
    },
  ]) {
    const invalidSession = await fixture(t, workflow(sessionOverride));
    const invalidSessionDiagnostics = await checkSddLifecycleDocument(
      invalidSession.file,
      invalidSession.root,
      SCHEMAS,
    );
    assert.ok(
      invalidSessionDiagnostics.some(
        (item) => item.rule === "SDD_FRESH_REVIEW_SESSION",
      ),
    );
  }

  const stale = await fixture(
    t,
    workflow({ planCurrent: "v2", impact: "MATERIAL", freshness: "CURRENT" }),
  );
  const staleDiagnostics = await checkSddLifecycleDocument(stale.file, stale.root, SCHEMAS);
  assert.ok(staleDiagnostics.some((item) => item.rule === "SDD_FRESHNESS_MISMATCH"));
  assert.ok(staleDiagnostics.some((item) => item.rule === "SDD_GATES_NOT_READY"));

  const caseVariedDependency = await fixture(
    t,
    workflow({
      workflowArtifactId: "Workflow",
      workflowCurrent: "v2",
      workflowImpact: "MATERIAL",
      workflowFreshness: "STALE",
    }),
  );
  const caseVariedDiagnostics = await checkSddLifecycleDocument(
    caseVariedDependency.file,
    caseVariedDependency.root,
    SCHEMAS,
  );
  assert.ok(
    caseVariedDiagnostics.some(
      (item) =>
        item.rule === "SDD_FRESHNESS_MISMATCH" &&
        item.message.includes("plan declares CURRENT"),
    ),
    "case-varied dependency IDs must still propagate staleness",
  );

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

  const missingFreshReview = await fixture(
    t,
    workflow({ freshReviewState: "NOT_STARTED", freshReviewEvidence: "Not recorded" }),
  );
  const freshReviewDiagnostics = await checkSddLifecycleDocument(
    missingFreshReview.file,
    missingFreshReview.root,
    SCHEMAS,
  );
  assert.ok(
    freshReviewDiagnostics.some((item) => item.rule === "SDD_FRESH_REVIEW_STATE"),
  );

  const missingHumanReview = await fixture(
    t,
    workflow({ humanReviewState: "NOT_STARTED", humanReviewEvidence: "Not recorded" }),
  );
  const humanReviewDiagnostics = await checkSddLifecycleDocument(
    missingHumanReview.file,
    missingHumanReview.root,
    SCHEMAS,
  );
  assert.ok(
    humanReviewDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_STATE"),
  );

  const misleadingPrerequisite = await fixture(
    t,
    workflow({ manifestReviewState: "NOT_APPROVED" }),
  );
  const misleadingPrerequisiteDiagnostics = await checkSddLifecycleDocument(
    misleadingPrerequisite.file,
    misleadingPrerequisite.root,
    SCHEMAS,
  );
  assert.ok(
    misleadingPrerequisiteDiagnostics.some(
      (item) => item.rule === "SDD_UNAPPROVED_PREREQUISITE",
    ),
  );

  for (const [name, override] of [
    ["delivery manifest", { includeManifestTable: false }],
    ["artifact dependency and freshness register", { includeDependencyTable: false }],
    ["scoped blocker register", { includeBlockerTable: false }],
  ]) {
    const missingCoreTable = await fixture(t, workflow(override));
    const missingCoreTableDiagnostics = await checkSddLifecycleDocument(
      missingCoreTable.file,
      missingCoreTable.root,
      SCHEMAS,
    );
    assert.ok(
      missingCoreTableDiagnostics.some(
        (item) => item.rule === "SDD_REQUIRED_TABLE" && item.message.includes(name),
      ),
      `workflow must reject a missing ${name} table even when its marker remains`,
    );
  }

  const emptyDependencies = await fixture(
    t,
    workflow({ includeDependencyRows: false }),
  );
  const emptyDependencyDiagnostics = await checkSddLifecycleDocument(
    emptyDependencies.file,
    emptyDependencies.root,
    SCHEMAS,
  );
  assert.ok(
    emptyDependencyDiagnostics.some(
      (item) => item.rule === "SDD_DEPENDENCY_REGISTER_EMPTY",
    ),
  );

  const uncoveredTarget = await fixture(
    t,
    workflow({ nextActionTargetIds: "task-2" }),
  );
  const uncoveredTargetDiagnostics = await checkSddLifecycleDocument(
    uncoveredTarget.file,
    uncoveredTarget.root,
    SCHEMAS,
  );
  assert.ok(
    uncoveredTargetDiagnostics.some(
      (item) => item.rule === "SDD_DEPENDENCY_COVERAGE",
    ),
  );

  const uncoveredManifestArtifact = await fixture(
    t,
    workflow({ manifestArtifactId: "policy", manifestArtifact: "Policy" }),
  );
  const uncoveredManifestDiagnostics = await checkSddLifecycleDocument(
    uncoveredManifestArtifact.file,
    uncoveredManifestArtifact.root,
    SCHEMAS,
  );
  assert.ok(
    uncoveredManifestDiagnostics.some(
      (item) => item.rule === "SDD_DEPENDENCY_COVERAGE",
    ),
  );

  const danglingDependency = await fixture(
    t,
    workflow({ taskDependsOn: "missing-plan" }),
  );
  const danglingDependencyDiagnostics = await checkSddLifecycleDocument(
    danglingDependency.file,
    danglingDependency.root,
    SCHEMAS,
  );
  assert.ok(
    danglingDependencyDiagnostics.some(
      (item) => item.rule === "SDD_DEPENDENCY_REFERENCE",
    ),
  );

  for (const invalidIdFixture of [
    workflow({ manifestArtifactId: "None" }),
    workflow({ workflowArtifactId: "None" }),
    workflow({
      extraDependencyRows:
        "\n| plan | Duplicate plan | workflow | v1 | v1 | CONTROL_ONLY | CURRENT | None |",
    }),
  ]) {
    const invalidArtifactIds = await fixture(t, invalidIdFixture);
    const invalidIdDiagnostics = await checkSddLifecycleDocument(
      invalidArtifactIds.file,
      invalidArtifactIds.root,
      SCHEMAS,
    );
    assert.ok(
      invalidIdDiagnostics.some((item) => item.rule === "SDD_ARTIFACT_ID"),
    );
  }

  for (const pendingValue of [
    "Pending",
    "<placeholder>",
    "Pending / [receipt](reviews/pending.md)",
  ]) {
    const pendingReviewEvidence = await fixture(
      t,
      workflow({
        selfReviewRevision: pendingValue,
        selfReviewEvidence: pendingValue,
        freshReviewRevision: pendingValue,
        freshReviewEvidence: pendingValue,
        humanReviewRevision: pendingValue,
        humanReviewEvidence: pendingValue,
      }),
    );
    const pendingReviewDiagnostics = await checkSddLifecycleDocument(
      pendingReviewEvidence.file,
      pendingReviewEvidence.root,
      SCHEMAS,
    );
    assert.ok(
      pendingReviewDiagnostics.some(
        (item) => item.rule === "SDD_SELF_REVIEW_EVIDENCE",
      ),
    );
    assert.ok(
      pendingReviewDiagnostics.some(
        (item) => item.rule === "SDD_FRESH_REVIEW_EVIDENCE",
      ),
    );
    assert.ok(
      pendingReviewDiagnostics.some(
        (item) => item.rule === "SDD_HUMAN_REVIEW_EVIDENCE",
      ),
    );
  }

  const prematureReady = await fixture(
    t,
    workflow({ artifactReviewState: "IN_REVIEW" }),
  );
  const prematureReadyDiagnostics = await checkSddLifecycleDocument(
    prematureReady.file,
    prematureReady.root,
    SCHEMAS,
  );
  assert.ok(
    prematureReadyDiagnostics.some((item) => item.rule === "SDD_WORKFLOW_REVIEW_STATE"),
  );

  const invalidReviewState = await fixture(
    t,
    workflow({ state: "ARTIFACT_GENERATING", artifactReviewState: "PASSED" }),
  );
  const invalidReviewDiagnostics = await checkSddLifecycleDocument(
    invalidReviewState.file,
    invalidReviewState.root,
    SCHEMAS,
  );
  assert.ok(
    invalidReviewDiagnostics.some((item) => item.rule === "SDD_WORKFLOW_REVIEW_STATE"),
  );
});

test("active or retained workflow review sessions require both reviewers", async (t) => {
  for (const stateOverride of [
    {
      state: "ARTIFACT_IN_REVIEW",
      previousState: "MANIFEST_REVIEWED",
      artifactReviewState: "NOT_STARTED",
    },
    {
      state: "BLOCKED",
      previousState: "ARTIFACT_IN_REVIEW",
      artifactReviewState: "NOT_STARTED",
    },
  ]) {
    const oneReviewer = await fixture(
      t,
      workflow({
        ...stateOverride,
        freshAssignedReviewers: "reviewer-1",
        freshRequiredApprovals: "1",
        freshApprovedReviewers: "Not recorded",
      }),
    );
    const diagnostics = await checkSddLifecycleDocument(
      oneReviewer.file,
      oneReviewer.root,
      SCHEMAS,
    );
    assert.ok(
      diagnostics.some((item) => item.rule === "SDD_FRESH_REVIEW_SESSION"),
    );
  }
});

test("implementation review requires fresh approval in both continuation modes", async (t) => {
  const auto = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
    }),
  );
  assert.deepEqual(await checkSddLifecycleDocument(auto.file, auto.root, SCHEMAS), []);

  const designGateInAutoMode = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      currentReviewPhase: "DESIGN",
    }),
  );
  const designGateDiagnostics = await checkSddLifecycleDocument(
    designGateInAutoMode.file,
    designGateInAutoMode.root,
    SCHEMAS,
  );
  assert.ok(
    designGateDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_STATE"),
  );

  const outOfScopeImplementationGate = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      currentReviewTargetId: "task-2",
    }),
  );
  const outOfScopeDiagnostics = await checkSddLifecycleDocument(
    outOfScopeImplementationGate.file,
    outOfScopeImplementationGate.root,
    SCHEMAS,
  );
  assert.ok(
    outOfScopeDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_SCOPE",
    ),
  );
  assert.ok(
    outOfScopeDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_STATE"),
  );

  const unregisteredImplementationGate = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      implementationModeScope: "task-1, T99",
      currentReviewTargetId: "T99",
      currentArtifactGate:
        "[T99 PR #99](https://github.com/example/project/pull/99)",
    }),
  );
  const unregisteredGateDiagnostics = await checkSddLifecycleDocument(
    unregisteredImplementationGate.file,
    unregisteredImplementationGate.root,
    SCHEMAS,
  );
  assert.ok(
    unregisteredGateDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_SCOPE",
    ),
  );
  assert.ok(
    unregisteredGateDiagnostics.some(
      (item) => item.rule === "SDD_HUMAN_REVIEW_STATE",
    ),
  );

  const nonPrImplementationGate = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      currentArtifactGate: "[plan](implementation-plan.md)",
    }),
  );
  const nonPrGateDiagnostics = await checkSddLifecycleDocument(
    nonPrImplementationGate.file,
    nonPrImplementationGate.root,
    SCHEMAS,
  );
  assert.ok(
    nonPrGateDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_SCOPE",
    ),
  );
  assert.ok(
    nonPrGateDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_STATE"),
  );

  const ambiguousTargetLabel = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      currentArtifactGate:
        "[task-10 PR #1](https://github.com/example/project/pull/1)",
    }),
  );
  const ambiguousTargetDiagnostics = await checkSddLifecycleDocument(
    ambiguousTargetLabel.file,
    ambiguousTargetLabel.root,
    SCHEMAS,
  );
  assert.ok(
    ambiguousTargetDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_SCOPE",
    ),
  );

  const mismatchedPrIdentity = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      currentArtifactGate:
        "[task-1 PR #1](https://github.com/example/project/pull/2)",
    }),
  );
  const mismatchedPrDiagnostics = await checkSddLifecycleDocument(
    mismatchedPrIdentity.file,
    mismatchedPrIdentity.root,
    SCHEMAS,
  );
  assert.ok(
    mismatchedPrDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_SCOPE",
    ),
  );

  const proseScope = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      implementationModeScope: "task-1 task PR",
    }),
  );
  const proseScopeDiagnostics = await checkSddLifecycleDocument(
    proseScope.file,
    proseScope.root,
    SCHEMAS,
  );
  assert.ok(
    proseScopeDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_MODE_SCOPE",
    ),
  );
  assert.ok(
    proseScopeDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_STATE"),
  );

  for (const implementationModeScope of [
    "task-1, task-1",
    "task-1; task-2",
    "PR",
  ]) {
    const malformedScope = await fixture(
      t,
      workflow({ implementationModeScope }),
    );
    const malformedScopeDiagnostics = await checkSddLifecycleDocument(
      malformedScope.file,
      malformedScope.root,
      SCHEMAS,
    );
    assert.ok(
      malformedScopeDiagnostics.some(
        (item) => item.rule === "SDD_IMPLEMENTATION_MODE_SCOPE",
      ),
    );
  }

  const invalidRepository = await fixture(
    t,
    workflow({ implementationRepository: "example/project" }),
  );
  const invalidRepositoryDiagnostics = await checkSddLifecycleDocument(
    invalidRepository.file,
    invalidRepository.root,
    SCHEMAS,
  );
  assert.ok(
    invalidRepositoryDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REPOSITORY",
    ),
  );

  const unrelatedRepository = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      currentArtifactGate:
        "[task-1 PR #1](https://github.com/unrelated/project/pull/1)",
    }),
  );
  const unrelatedRepositoryDiagnostics = await checkSddLifecycleDocument(
    unrelatedRepository.file,
    unrelatedRepository.root,
    SCHEMAS,
  );
  assert.ok(
    unrelatedRepositoryDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_SCOPE",
    ),
  );

  const autoWithoutFresh = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      freshReviewState: "NOT_STARTED",
    }),
  );
  const autoDiagnostics = await checkSddLifecycleDocument(
    autoWithoutFresh.file,
    autoWithoutFresh.root,
    SCHEMAS,
  );
  assert.ok(autoDiagnostics.some((item) => item.rule === "SDD_FRESH_REVIEW_STATE"));

  const mergedWithoutFreshReview = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      artifactReviewState: "IN_REVIEW",
      postMergeHumanReview: "PENDING",
      postMergeFreshReview: "NOT_APPROVED",
    }),
  );
  const mergedWithoutFreshDiagnostics = await checkSddLifecycleDocument(
    mergedWithoutFreshReview.file,
    mergedWithoutFreshReview.root,
    SCHEMAS,
  );
  assert.ok(
    mergedWithoutFreshDiagnostics.some(
      (item) => item.rule === "SDD_MERGED_FRESH_REVIEW",
    ),
  );

  const annotatedMergeWithoutFresh = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      artifactReviewState: "IN_REVIEW",
      postMergeHumanReview: "PENDING",
      postMergeFreshReview: "NOT_APPROVED",
      postMergeResult: "MERGED / [merge](https://github.com/example/project/commit/2222222222222222222222222222222222222222)",
    }),
  );
  const annotatedMergeDiagnostics = await checkSddLifecycleDocument(
    annotatedMergeWithoutFresh.file,
    annotatedMergeWithoutFresh.root,
    SCHEMAS,
  );
  assert.ok(
    annotatedMergeDiagnostics.some(
      (item) => item.rule === "SDD_MERGED_FRESH_REVIEW",
    ),
  );

  const invalidMergeResult = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      implementationMode: "AGENT_AUTO_MERGE",
      artifactReviewState: "IN_REVIEW",
      postMergeHumanReview: "PENDING",
      postMergeResult: "UNKNOWN / [evidence](reviews/merge.md)",
    }),
  );
  const invalidMergeDiagnostics = await checkSddLifecycleDocument(
    invalidMergeResult.file,
    invalidMergeResult.root,
    SCHEMAS,
  );
  assert.ok(invalidMergeDiagnostics.some((item) => item.rule === "SDD_MERGE_RESULT"));

  const manualMergeWithoutFresh = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      artifactReviewState: "IN_REVIEW",
      postMergeHumanReview: "APPROVED HEAD 1111111111111111111111111111111111111111 / [human review](reviews/human.md)",
      postMergeFreshReview: "NOT_APPROVED",
      postMergeMode: "HUMAN_REVIEW_BEFORE_MERGE / [authority](delivery-workflow.md)",
    }),
  );
  const manualMergeDiagnostics = await checkSddLifecycleDocument(
    manualMergeWithoutFresh.file,
    manualMergeWithoutFresh.root,
    SCHEMAS,
  );
  assert.ok(
    manualMergeDiagnostics.some(
      (item) => item.rule === "SDD_MERGED_FRESH_REVIEW",
    ),
  );

  const unknownRowMode = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      artifactReviewState: "IN_REVIEW",
      postMergeHumanReview: "PENDING",
      postMergeFreshReview: "NOT_APPROVED",
      postMergeMode: "AGENT_AUTO_MERG / user",
    }),
  );
  const unknownModeDiagnostics = await checkSddLifecycleDocument(
    unknownRowMode.file,
    unknownRowMode.root,
    SCHEMAS,
  );
  assert.ok(
    unknownModeDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_MODE",
    ),
  );

  const manualMergeWithoutHuman = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      artifactReviewState: "IN_REVIEW",
      postMergeHumanReview: "PENDING",
      postMergeMode: "HUMAN_REVIEW_BEFORE_MERGE / [authority](delivery-workflow.md)",
    }),
  );
  const manualHumanDiagnostics = await checkSddLifecycleDocument(
    manualMergeWithoutHuman.file,
    manualMergeWithoutHuman.root,
    SCHEMAS,
  );
  assert.ok(
    manualHumanDiagnostics.some(
      (item) => item.rule === "SDD_MANUAL_MERGE_HUMAN_REVIEW",
    ),
  );

  for (const [field, override] of [
    ["Task/PR", { postMergeTaskPr: "None" }],
    ["Task/PR", { postMergeTaskPr: "bananas" }],
    [
      "Task/PR",
      {
        postMergeTaskPr:
          "T01 / [PR #1](https://github.com/example/project/pull/2)",
      },
    ],
    ["Head and merge commit", { postMergeRevisions: "None" }],
    [
      "Head and merge commit",
      { postMergeRevisions: "HEAD potato / MERGE turnip" },
    ],
    ["Implementation mode/authority", { postMergeMode: "AGENT_AUTO_MERGE" }],
    ["Self-review", { postMergeSelfReview: "SELF_REVIEW_PASSED" }],
    ["Fresh-context review", { postMergeFreshReview: "APPROVED" }],
    ["Required checks", { postMergeChecks: "None" }],
    ["Merge result", { postMergeResult: "MERGED" }],
  ]) {
    const missingRowEvidence = await fixture(
      t,
      workflow({
        state: "COMPLETE",
        previousState: "VALIDATING",
        postMergeHumanReview: "ACCEPTED MERGE 2222222222222222222222222222222222222222 / [human review](reviews/human.md)",
        ...override,
      }),
    );
    const missingEvidenceDiagnostics = await checkSddLifecycleDocument(
      missingRowEvidence.file,
      missingRowEvidence.root,
      SCHEMAS,
    );
    assert.ok(
      missingEvidenceDiagnostics.some(
        (item) =>
          item.rule === "SDD_IMPLEMENTATION_REVIEW_EVIDENCE" &&
          item.message.includes(field),
      ),
      `merged row must reject missing ${field} evidence`,
    );
  }

  const unregisteredTask = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationModeScope: "task-1, T99",
      postMergeTaskPr:
        "T99 / [PR #99](https://github.com/example/project/pull/99)",
      postMergeHumanReview: "ACCEPTED MERGE 2222222222222222222222222222222222222222 / [human review](reviews/human.md)",
    }),
  );
  const unregisteredTaskDiagnostics = await checkSddLifecycleDocument(
    unregisteredTask.file,
    unregisteredTask.root,
    SCHEMAS,
  );
  assert.ok(
    unregisteredTaskDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_BINDING",
    ),
  );

  const contradictoryMergeEvidence = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      postMergeResult:
        "MERGED / [merge](https://github.com/example/project/commit/3333333333333333333333333333333333333333)",
      postMergeHumanReview: "ACCEPTED MERGE 2222222222222222222222222222222222222222 / [human review](reviews/human.md)",
    }),
  );
  const contradictoryMergeDiagnostics = await checkSddLifecycleDocument(
    contradictoryMergeEvidence.file,
    contradictoryMergeEvidence.root,
    SCHEMAS,
  );
  assert.ok(
    contradictoryMergeDiagnostics.some(
      (item) =>
        item.rule === "SDD_IMPLEMENTATION_REVIEW_EVIDENCE" &&
        item.message.includes("Merge result"),
    ),
  );

  const wrongRepositoryLedger = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      postMergeTaskPr:
        "task-1 / [PR #1](https://github.com/unrelated/project/pull/1)",
      postMergeHumanReview: "ACCEPTED MERGE 2222222222222222222222222222222222222222 / [human review](reviews/human.md)",
    }),
  );
  const wrongRepositoryLedgerDiagnostics = await checkSddLifecycleDocument(
    wrongRepositoryLedger.file,
    wrongRepositoryLedger.root,
    SCHEMAS,
  );
  assert.ok(
    wrongRepositoryLedgerDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_BINDING",
    ),
  );

  for (const [field, override] of [
    [
      "Self-review",
      {
        postMergeSelfReview:
          "SELF_REVIEW_PASSED HEAD 3333333333333333333333333333333333333333 / [self review](reviews/self-review.md)",
      },
    ],
    [
      "Fresh-context review",
      {
        postMergeFreshReview:
          "APPROVED HEAD 3333333333333333333333333333333333333333 / [fresh review](reviews/fresh-review.md)",
      },
    ],
    [
      "Required checks",
      {
        postMergeChecks:
          "PASS HEAD 3333333333333333333333333333333333333333 / [checks](https://github.com/example/project/actions/runs/1)",
      },
    ],
  ]) {
    const contradictoryHeadReceipt = await fixture(
      t,
      workflow({
        state: "COMPLETE",
        previousState: "VALIDATING",
        postMergeHumanReview: "ACCEPTED MERGE 2222222222222222222222222222222222222222 / [human review](reviews/human.md)",
        ...override,
      }),
    );
    const contradictoryHeadDiagnostics = await checkSddLifecycleDocument(
      contradictoryHeadReceipt.file,
      contradictoryHeadReceipt.root,
      SCHEMAS,
    );
    assert.ok(
      contradictoryHeadDiagnostics.some(
        (item) =>
          item.rule === "SDD_IMPLEMENTATION_REVIEW_EVIDENCE" &&
          item.message.includes(field),
      ),
      `${field} must bind to the recorded head revision`,
    );
  }

  const stoppedOnlyClosure = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      postMergeRevisions: "Not applicable",
      postMergeSelfReview: "Not applicable",
      postMergeFreshReview: "Not applicable",
      postMergeChecks: "Not applicable",
      postMergeResult: "STOPPED / [stop record](reviews/stopped.md)",
      postMergeHumanReview: "ACCEPTED / [human review](reviews/human.md)",
      postMergeFindings: "[finding](reviews/stopped.md)",
    }),
  );
  const stoppedOnlyDiagnostics = await checkSddLifecycleDocument(
    stoppedOnlyClosure.file,
    stoppedOnlyClosure.root,
    SCHEMAS,
  );
  assert.ok(
    stoppedOnlyDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_EMPTY",
    ),
  );

  for (const [state, previousState] of [
    ["COMPLETE", "VALIDATING"],
    ["ARCHIVED", "COMPLETE"],
  ]) {
    const emptyClosureLedger = await fixture(
      t,
      workflow({ state, previousState, postMergeHumanReview: null }),
    );
    const emptyClosureDiagnostics = await checkSddLifecycleDocument(
      emptyClosureLedger.file,
      emptyClosureLedger.root,
      SCHEMAS,
    );
    assert.ok(
      emptyClosureDiagnostics.some(
        (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_EMPTY",
      ),
      `${state} must reject an empty implementation review ledger`,
    );
  }

  const missingLedger = await fixture(t, workflow({ includeReviewLedger: false }));
  const missingLedgerDiagnostics = await checkSddLifecycleDocument(
    missingLedger.file,
    missingLedger.root,
    SCHEMAS,
  );
  assert.ok(
    missingLedgerDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_LEDGER",
    ),
  );
  assert.ok(
    !missingLedgerDiagnostics.some((item) => item.rule === "SDD_REQUIRED_SECTION"),
    "the semantic marker alone must not satisfy the ledger-table obligation",
  );

  const malformedLedger = await fixture(
    t,
    workflow({ reviewLedgerHumanHeader: "Post review" }),
  );
  const malformedLedgerDiagnostics = await checkSddLifecycleDocument(
    malformedLedger.file,
    malformedLedger.root,
    SCHEMAS,
  );
  assert.ok(
    malformedLedgerDiagnostics.some(
      (item) => item.rule === "SDD_IMPLEMENTATION_REVIEW_LEDGER",
    ),
  );

  const manualWithoutHuman = await fixture(
    t,
    workflow({
      state: "DELIVERY_ACTIVE",
      previousState: "GATES_READY",
      humanReviewState: "NOT_APPLICABLE",
      humanReviewRevision: "Not applicable",
      humanReviewEvidence: "Not applicable",
    }),
  );
  const manualDiagnostics = await checkSddLifecycleDocument(
    manualWithoutHuman.file,
    manualWithoutHuman.root,
    SCHEMAS,
  );
  assert.ok(manualDiagnostics.some((item) => item.rule === "SDD_HUMAN_REVIEW_STATE"));
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

  const annotatedPendingReview = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "AGENT_AUTO_MERGE",
      postMergeHumanReview: "PENDING / reviews/human.md",
    }),
  );
  const annotatedPendingDiagnostics = await checkSddLifecycleDocument(
    annotatedPendingReview.file,
    annotatedPendingReview.root,
    SCHEMAS,
  );
  assert.ok(
    annotatedPendingDiagnostics.some(
      (item) => item.rule === "SDD_POST_MERGE_REVIEW_OPEN",
    ),
  );

  const invalidHumanReview = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "AGENT_AUTO_MERGE",
      postMergeHumanReview: "UNKNOWN / reviews/human.md",
    }),
  );
  const invalidHumanDiagnostics = await checkSddLifecycleDocument(
    invalidHumanReview.file,
    invalidHumanReview.root,
    SCHEMAS,
  );
  assert.ok(
    invalidHumanDiagnostics.some(
      (item) => item.rule === "SDD_POST_MERGE_REVIEW_OPEN",
    ),
  );

  const reviewed = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "AGENT_AUTO_MERGE",
      postMergeHumanReview: "ACCEPTED MERGE 2222222222222222222222222222222222222222 / [human review](reviews/human.md)",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(reviewed.file, reviewed.root, SCHEMAS),
    [],
  );

  const manuallyReviewed = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "HUMAN_REVIEW_BEFORE_MERGE",
      postMergeMode:
        "HUMAN_REVIEW_BEFORE_MERGE / [authority](delivery-workflow.md)",
      postMergeHumanReview:
        "APPROVED HEAD 1111111111111111111111111111111111111111 / [human review](reviews/human.md)",
    }),
  );
  assert.deepEqual(
    await checkSddLifecycleDocument(
      manuallyReviewed.file,
      manuallyReviewed.root,
      SCHEMAS,
    ),
    [],
  );

  const reviewedWrongMerge = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "AGENT_AUTO_MERGE",
      postMergeHumanReview:
        "ACCEPTED MERGE 3333333333333333333333333333333333333333 / [human review](reviews/human.md)",
    }),
  );
  const reviewedWrongMergeDiagnostics = await checkSddLifecycleDocument(
    reviewedWrongMerge.file,
    reviewedWrongMerge.root,
    SCHEMAS,
  );
  assert.ok(
    reviewedWrongMergeDiagnostics.some(
      (item) => item.rule === "SDD_POST_MERGE_REVIEW_OPEN",
    ),
  );

  const reviewedWithoutEvidence = await fixture(
    t,
    workflow({
      state: "COMPLETE",
      previousState: "VALIDATING",
      implementationMode: "AGENT_AUTO_MERGE",
      postMergeHumanReview: "ACCEPTED",
    }),
  );
  const reviewedWithoutEvidenceDiagnostics = await checkSddLifecycleDocument(
    reviewedWithoutEvidence.file,
    reviewedWithoutEvidence.root,
    SCHEMAS,
  );
  assert.ok(
    reviewedWithoutEvidenceDiagnostics.some(
      (item) => item.rule === "SDD_POST_MERGE_REVIEW_OPEN",
    ),
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
