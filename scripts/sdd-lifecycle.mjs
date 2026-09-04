#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { collectFiles } from "./documentation-quality.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REPOSITORY_ROOT = path.resolve(SCRIPT_DIR, "..");
const DEFAULT_SCHEMA_PATH = path.join(
  REPOSITORY_ROOT,
  "config",
  "sdd-lifecycle-schema.json",
);

function diagnostic(file, line, rule, message) {
  return { file: file.split(path.sep).join("/"), line, rule, message };
}

function normalizeValue(value) {
  return value
    .trim()
    .replace(/^`|`$/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}

function splitMarkdownRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.replace(/\\\|/g, "|").trim());
}

function isSeparatorRow(cells) {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function parseMarkdownTables(text) {
  const lines = text.split(/\r?\n/);
  const tables = [];
  for (let index = 0; index < lines.length - 1; index += 1) {
    if (!/^\s*\|/.test(lines[index]) || !/^\s*\|/.test(lines[index + 1])) {
      continue;
    }
    const headers = splitMarkdownRow(lines[index]);
    const separator = splitMarkdownRow(lines[index + 1]);
    if (headers.length !== separator.length || !isSeparatorRow(separator)) {
      continue;
    }
    const rows = [];
    let cursor = index + 2;
    while (cursor < lines.length && /^\s*\|/.test(lines[cursor])) {
      const cells = splitMarkdownRow(lines[cursor]);
      if (cells.length === headers.length) {
        rows.push(
          Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex]])),
        );
      }
      cursor += 1;
    }
    tables.push({ headers, rows, line: index + 1 });
    index = cursor - 1;
  }
  return tables;
}

function extractControlFields(tables) {
  const fields = new Map();
  for (const table of tables) {
    if (table.headers.length !== 2 || table.headers[0] !== "Field") {
      continue;
    }
    for (const row of table.rows) {
      const key = normalizeValue(row.Field);
      if (!fields.has(key)) {
        fields.set(key, normalizeValue(row[table.headers[1]]));
      }
    }
  }
  return fields;
}

function extractMarker(text) {
  const match = text.match(
    /<!--\s*sdd-schema:\s*([a-z-]+)@(\d+)(?:;\s*mode:\s*([A-Z]+))?\s*-->/,
  );
  return match
    ? { artifact: match[1], version: Number(match[2]), mode: match[3] || null }
    : null;
}

function extractSectionMarkers(text) {
  return new Set(
    [...text.matchAll(/<!--\s*sdd-section:\s*([a-z-]+)\s*-->/g)].map(
      (match) => match[1],
    ),
  );
}

function extractTaskSpecificationMarkers(text) {
  return new Set(
    [...text.matchAll(/<!--\s*sdd-task-spec:\s*([A-Za-z0-9_-]+)\s*-->/g)].map(
      (match) => match[1],
    ),
  );
}

function findTable(tables, requiredHeaders) {
  return tables.find((table) =>
    requiredHeaders.every((header) => table.headers.includes(header)),
  );
}

function isNone(value) {
  return /^(?:|none|not applicable|—|-)$/.test(normalizeValue(value).toLowerCase());
}

function leadingDisposition(value) {
  const normalized = normalizeValue(value || "");
  const match = /^([A-Z_]+)(?:\s+\/\s+.+)?$/.exec(normalized);
  return match ? match[1] : null;
}

function splitIdentifiers(value) {
  if (isNone(value)) {
    return [];
  }
  return normalizeValue(value)
    .split(/[,;\s]+/)
    .map((item) => item.replace(/^`|`$/g, ""))
    .filter(Boolean);
}

function splitPaths(value) {
  if (isNone(value)) {
    return [];
  }
  return normalizeValue(value)
    .split(/[;,]+/)
    .map((item) => item.replace(/^`|`$/g, "").trim())
    .filter(Boolean);
}

function checkTransition(file, previous, current, transitions, label) {
  if (!previous || !current || previous === current) {
    return [];
  }
  if ((transitions[previous] || []).includes(current)) {
    return [];
  }
  return [
    diagnostic(
      file,
      1,
      "SDD_ILLEGAL_TRANSITION",
      `${label} transition ${previous} -> ${current} is not allowed`,
    ),
  ];
}

function checkRequiredFields(file, fields, requiredFields) {
  return requiredFields
    .filter((field) => !fields.has(field))
    .map((field) => diagnostic(file, 1, "SDD_REQUIRED_FIELD", `missing control field: ${field}`));
}

function checkSelfReviewGate(file, fields, reviewRequired) {
  if (!reviewRequired) {
    return [];
  }
  const diagnostics = [];
  if (fields.get("Self-review state") !== "SELF_REVIEW_PASSED") {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_SELF_REVIEW_STATE",
        "review requires Self-review state SELF_REVIEW_PASSED",
      ),
    );
  }
  for (const field of ["Self-review candidate revision", "Self-review evidence"]) {
    const value = fields.get(field) || "";
    if (isNone(value) || /^not recorded$/i.test(normalizeValue(value))) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_SELF_REVIEW_EVIDENCE",
          `review requires a recorded ${field}`,
        ),
      );
    }
  }
  return diagnostics;
}

function checkIndependentReviewGate(file, fields, approvalRequired, humanRequired = true) {
  if (!approvalRequired) {
    return [];
  }
  const diagnostics = [];
  if (fields.get("Fresh-context review state") !== "APPROVED") {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_FRESH_REVIEW_STATE",
        "approval requires Fresh-context review state APPROVED",
      ),
    );
  }
  for (const field of ["Fresh-context reviewed revision", "Fresh-context review evidence"]) {
    const value = fields.get(field) || "";
    if (isNone(value) || /^not recorded$/i.test(normalizeValue(value))) {
      diagnostics.push(
        diagnostic(file, 1, "SDD_FRESH_REVIEW_EVIDENCE", `approval requires a recorded ${field}`),
      );
    }
  }
  const candidateRevision = fields.get("Self-review candidate revision");
  const freshRevision = fields.get("Fresh-context reviewed revision");
  if (
    candidateRevision &&
    freshRevision &&
    !isNone(candidateRevision) &&
    !isNone(freshRevision) &&
    normalizeValue(candidateRevision) !== normalizeValue(freshRevision)
  ) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_REVIEW_REVISION_MISMATCH",
        "Fresh-context reviewed revision must match Self-review candidate revision",
      ),
    );
  }
  if (humanRequired) {
    if (fields.get("Human review state") !== "APPROVED") {
      diagnostics.push(
        diagnostic(file, 1, "SDD_HUMAN_REVIEW_STATE", "approval requires Human review state APPROVED"),
      );
    }
    for (const field of ["Human reviewed revision", "Human review evidence"]) {
      const value = fields.get(field) || "";
      if (isNone(value) || /^not recorded$/i.test(normalizeValue(value))) {
        diagnostics.push(
          diagnostic(file, 1, "SDD_HUMAN_REVIEW_EVIDENCE", `approval requires a recorded ${field}`),
        );
      }
    }
    const humanRevision = fields.get("Human reviewed revision");
    if (
      candidateRevision &&
      humanRevision &&
      !isNone(candidateRevision) &&
      !isNone(humanRevision) &&
      normalizeValue(candidateRevision) !== normalizeValue(humanRevision)
    ) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_REVIEW_REVISION_MISMATCH",
          "Human reviewed revision must match Self-review candidate revision",
        ),
      );
    }
  } else if (fields.get("Human review state") !== "NOT_APPLICABLE") {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_HUMAN_REVIEW_MODE",
        "AGENT_AUTO_MERGE review gates require Human review state NOT_APPLICABLE before merge",
      ),
    );
  }
  return diagnostics;
}

function isUnselected(value) {
  return isNone(value || "") || /^not selected$/i.test(normalizeValue(value || ""));
}

function checkImplementationContinuation(file, fields, tables) {
  const diagnostics = [];
  const mode = fields.get("Implementation continuation mode");
  const state = fields.get("State");
  const allowedModes = new Set([
    "NOT_SELECTED",
    "HUMAN_REVIEW_BEFORE_MERGE",
    "AGENT_AUTO_MERGE",
  ]);
  if (!allowedModes.has(mode)) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_IMPLEMENTATION_MODE",
        `unsupported implementation continuation mode: ${mode || "missing"}`,
      ),
    );
    return diagnostics;
  }

  const designStates = new Set([
    "AWAITING_HANDOFF",
    "ROUTING",
    "MANIFEST_IN_REVIEW",
    "CHANGES_REQUESTED",
    "ARTIFACTS_SELECTED",
    "ARTIFACT_GENERATING",
    "ARTIFACT_IN_REVIEW",
    "RETURN_TO_WHITEBOARD",
  ]);
  if (designStates.has(state) && mode !== "NOT_SELECTED") {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_IMPLEMENTATION_MODE_PHASE",
        `${mode} cannot be selected during design state ${state}`,
      ),
    );
  }

  const implementationStates = new Set([
    "DELIVERY_ACTIVE",
    "VALIDATING",
    "COMPLETE",
    "ARCHIVED",
  ]);
  if (implementationStates.has(state) && mode === "NOT_SELECTED") {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_IMPLEMENTATION_MODE_REQUIRED",
        `${state} requires a user-selected implementation continuation mode`,
      ),
    );
  }

  if (mode !== "NOT_SELECTED") {
    for (const field of [
      "Implementation mode authority",
      "Implementation mode scope",
      "Implementation mode selected at",
    ]) {
      if (isUnselected(fields.get(field))) {
        diagnostics.push(
          diagnostic(
            file,
            1,
            "SDD_IMPLEMENTATION_MODE_AUTHORITY",
            `${mode} requires recorded ${field}`,
          ),
        );
      }
    }
  }

  const reviewLedger = findTable(tables, [
    "Task/PR",
    "Head and merge commit",
    "Implementation mode/authority",
    "Self-review",
    "Fresh-context review",
    "Required checks",
    "Merge result",
    "Human review",
    "Findings/follow-up",
  ]);
  const mergedAutoRows = (reviewLedger?.rows || []).filter(
    (row) =>
      /AGENT_AUTO_MERGE/.test(normalizeValue(row["Implementation mode/authority"])) &&
      normalizeValue(row["Merge result"]).toUpperCase() === "MERGED",
  );
  for (const row of mergedAutoRows) {
    if (leadingDisposition(row["Fresh-context review"]) !== "APPROVED") {
      diagnostics.push(
        diagnostic(
          file,
          reviewLedger.line,
          "SDD_AUTO_MERGE_FRESH_REVIEW",
          "an AGENT_AUTO_MERGE row cannot be merged without fresh-context APPROVED evidence",
        ),
      );
    }
  }

  if (["COMPLETE", "ARCHIVED"].includes(state)) {
    const invalidRows = (reviewLedger?.rows || []).filter((row) => {
      const disposition = leadingDisposition(row["Human review"]);
      return !["APPROVED", "ACCEPTED", "FOLLOW_UP_COMPLETE"].includes(disposition);
    });
    if (invalidRows.length > 0) {
      diagnostics.push(
        diagnostic(
          file,
          reviewLedger.line,
          "SDD_POST_MERGE_REVIEW_OPEN",
          `${state} requires each human-review row to be APPROVED, ACCEPTED, or FOLLOW_UP_COMPLETE`,
        ),
      );
    }
  }
  return diagnostics;
}

function checkRequiredSections(file, sections, requiredSections) {
  return requiredSections
    .filter((section) => !sections.has(section))
    .map((section) =>
      diagnostic(file, 1, "SDD_REQUIRED_SECTION", `missing semantic section: ${section}`),
    );
}

function taskRows(tables) {
  const table = findTable(tables, ["ID", "State", "Next", "Depends on"]);
  return table?.rows || [];
}

function checkValidatingPlanState(file, tables, fields) {
  if (fields.get("Status") !== "VALIDATING") {
    return [];
  }
  const diagnostics = [];
  const tasks = taskRows(tables);
  const nonTerminal = tasks.filter(
    (task) => !["DONE", "CANCELLED"].includes(normalizeValue(task.State)),
  );
  if (tasks.length === 0 || nonTerminal.length > 0) {
    const detail = tasks.length === 0
      ? "the task ledger is empty"
      : `non-terminal tasks: ${nonTerminal
          .map((task) => `${normalizeValue(task.ID)}=${normalizeValue(task.State)}`)
          .join(", ")}`;
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_PLAN_VALIDATING_TASKS",
        `plan status VALIDATING requires every task to be DONE or CANCELLED; ${detail}`,
      ),
    );
  }
  const nextTasks = tasks.filter((task) => !isNone(task.Next || ""));
  if (nextTasks.length > 0) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_PLAN_VALIDATING_NEXT",
        `plan status VALIDATING cannot retain next-task markers: ${nextTasks
          .map((task) => normalizeValue(task.ID))
          .join(", ")}`,
      ),
    );
  }
  if (!isNone(fields.get("Next ready task(s)") || "")) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_PLAN_VALIDATING_NEXT_READY",
        "plan status VALIDATING requires Next ready task(s) to be None",
      ),
    );
  }
  return diagnostics;
}

function checkImplementationPlan(file, marker, text, tables, fields, schema) {
  const diagnostics = [];
  diagnostics.push(...checkRequiredFields(file, fields, schema.requiredFields));
  const mode = marker.mode || fields.get("Plan mode");
  const modeSchema = schema.modes[mode];
  if (!modeSchema) {
    diagnostics.push(diagnostic(file, 1, "SDD_PLAN_MODE", `unsupported plan mode: ${mode}`));
    return diagnostics;
  }
  diagnostics.push(
    ...checkRequiredSections(file, extractSectionMarkers(text), modeSchema.requiredSections),
  );
  diagnostics.push(
    ...checkTransition(
      file,
      fields.get("Previous status"),
      fields.get("Status"),
      schema.transitions,
      "plan",
    ),
  );
  diagnostics.push(
    ...checkSelfReviewGate(
      file,
      fields,
      ["IN_REVIEW", "APPROVED"].includes(fields.get("Review state")),
    ),
  );
  diagnostics.push(
    ...checkIndependentReviewGate(
      file,
      fields,
      fields.get("Review state") === "APPROVED",
    ),
  );

  const tasks = taskRows(tables);
  diagnostics.push(...checkValidatingPlanState(file, tables, fields));
  const detailedTasks = extractTaskSpecificationMarkers(text);
  const activeStates = new Set(["READY", "IN_PROGRESS", "VERIFYING", "DONE"]);
  const allowedSpecStates = new Set(["SPEC_PENDING", "COMPLETE"]);
  for (const task of tasks) {
    const id = normalizeValue(task.ID);
    const state = normalizeValue(task.State);
    const next = normalizeValue(task.Next);
    const specState = normalizeValue(task["Spec state"] || "");
    const requiresCompleteSpec = activeStates.has(state) || next === "NEXT";
    if (!allowedSpecStates.has(specState)) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_TASK_SPEC_STATE",
          `${id} has unsupported Spec state ${specState || "missing"}`,
        ),
      );
    }
    if (requiresCompleteSpec && specState !== "COMPLETE") {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_TASK_SPEC_INCOMPLETE",
          `${id} is ${state}${next === "NEXT" ? " and NEXT" : ""} but Spec state is ${specState || "missing"}`,
        ),
      );
    }
    if ((requiresCompleteSpec || specState === "COMPLETE") && !detailedTasks.has(id)) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_TASK_SPEC_REQUIRED",
          `${id} declares or requires a complete task specification but has no matching task-spec marker`,
        ),
      );
    }
    if (next === "NEXT" && task["Blocked by"] && !isNone(task["Blocked by"])) {
      diagnostics.push(
        diagnostic(file, 1, "SDD_BLOCKED_NEXT", `${id} is NEXT but is blocked by ${task["Blocked by"]}`),
      );
    }
    if (activeStates.has(state) && task["Source freshness"] && normalizeValue(task["Source freshness"]) !== "CURRENT") {
      diagnostics.push(
        diagnostic(file, 1, "SDD_STALE_TASK_SOURCE", `${id} is ${state} with non-current sources`),
      );
    }
  }

  if (fields.get("Status") === "READY") {
    const ready = tasks.some(
      (task) => normalizeValue(task.State) === "READY" && normalizeValue(task.Next) === "NEXT",
    );
    if (!ready) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_PLAN_NOT_READY",
          "plan status READY requires at least one task with State READY and Next NEXT",
        ),
      );
    }
    if (fields.get("Review state") !== "APPROVED") {
      diagnostics.push(
        diagnostic(file, 1, "SDD_PLAN_REVIEW", "plan status READY requires review state APPROVED"),
      );
    }
  }
  return diagnostics;
}

function markdownLinkTarget(value) {
  const match = String(value || "").match(/\[[^\]]*\]\(([^)]+)\)/);
  return match?.[1]?.trim() || null;
}

async function checkWorkflowValidatingPlan(file, absoluteFile, root, tables, fields, computed) {
  if (fields.get("State") !== "VALIDATING") {
    return [];
  }
  const freshnessTable = findTable(tables, [
    "Artifact ID",
    "Artifact/link",
    "Depends on",
    "Consumed version",
    "Current version",
    "Change impact",
    "Freshness",
    "Blocked by",
  ]);
  const planRow = freshnessTable?.rows.find(
    (row) => normalizeValue(row["Artifact ID"]) === "plan",
  );
  if (!planRow) {
    return [];
  }
  const diagnostics = [];
  if (computed.get("plan") !== "CURRENT") {
    diagnostics.push(
      diagnostic(
        file,
        freshnessTable.line,
        "SDD_WORKFLOW_PLAN_FRESHNESS",
        "workflow status VALIDATING requires its implementation plan to be CURRENT",
      ),
    );
  }
  const link = markdownLinkTarget(planRow["Artifact/link"]);
  if (!link || /^[a-z][a-z0-9+.-]*:/i.test(link) || path.isAbsolute(link)) {
    diagnostics.push(
      diagnostic(
        file,
        freshnessTable.line,
        "SDD_WORKFLOW_PLAN_LINK",
        "workflow status VALIDATING requires the plan artifact row to contain a repository-relative Markdown link",
      ),
    );
    return diagnostics;
  }
  let decodedLink;
  try {
    decodedLink = decodeURIComponent(link.split("#", 1)[0].split("?", 1)[0]);
  } catch {
    decodedLink = link.split("#", 1)[0].split("?", 1)[0];
  }
  const linkedPlan = path.resolve(path.dirname(absoluteFile), decodedLink);
  const relativePlan = path.relative(root, linkedPlan);
  if (relativePlan.startsWith("..") || path.isAbsolute(relativePlan)) {
    diagnostics.push(
      diagnostic(
        file,
        freshnessTable.line,
        "SDD_WORKFLOW_PLAN_LINK",
        "workflow plan link resolves outside the checked project root",
      ),
    );
    return diagnostics;
  }
  let planText;
  try {
    planText = await readFile(linkedPlan, "utf8");
  } catch {
    diagnostics.push(
      diagnostic(
        file,
        freshnessTable.line,
        "SDD_WORKFLOW_PLAN_LINK",
        `workflow plan link does not resolve: ${decodedLink}`,
      ),
    );
    return diagnostics;
  }
  const planMarker = extractMarker(planText);
  const planTables = parseMarkdownTables(planText);
  const planFields = extractControlFields(planTables);
  if (planMarker?.artifact !== "implementation-plan") {
    diagnostics.push(
      diagnostic(
        relativePlan,
        1,
        "SDD_WORKFLOW_PLAN_LINK",
        "workflow plan link does not identify an SDD implementation plan",
      ),
    );
    return diagnostics;
  }
  if (planFields.get("Status") !== "VALIDATING") {
    diagnostics.push(
      diagnostic(
        relativePlan,
        1,
        "SDD_WORKFLOW_PLAN_STATE",
        `workflow is VALIDATING while its implementation plan is ${planFields.get("Status") || "missing Status"}`,
      ),
    );
  }
  return diagnostics;
}

function ownFreshness(row) {
  const consumed = normalizeValue(row["Consumed version"] || "");
  const current = normalizeValue(row["Current version"] || "");
  const impact = normalizeValue(row["Change impact"] || "UNKNOWN");
  if (!isNone(row["Blocked by"] || "None")) {
    return "BLOCKED";
  }
  if (consumed !== current && ["MATERIAL", "UNKNOWN"].includes(impact)) {
    return "STALE";
  }
  return "CURRENT";
}

export function computeTransitiveFreshness(rows) {
  const byId = new Map(rows.map((row) => [normalizeValue(row["Artifact ID"]), row]));
  const result = new Map();
  function visit(id, stack = new Set()) {
    if (result.has(id)) {
      return result.get(id);
    }
    if (stack.has(id)) {
      result.set(id, "BLOCKED");
      return "BLOCKED";
    }
    const row = byId.get(id);
    if (!row) {
      return "CURRENT";
    }
    const own = ownFreshness(row);
    if (own !== "CURRENT") {
      result.set(id, own);
      return own;
    }
    const nextStack = new Set(stack).add(id);
    const dependencies = splitIdentifiers(row["Depends on"] || "None");
    const dependencyStates = dependencies.map((dependency) => visit(dependency, nextStack));
    const state = dependencyStates.includes("BLOCKED")
      ? "BLOCKED"
      : dependencyStates.includes("STALE")
        ? "STALE"
        : "CURRENT";
    result.set(id, state);
    return state;
  }
  for (const id of byId.keys()) {
    visit(id);
  }
  return result;
}

function pathWithinScope(target, scope) {
  const rawTarget = normalizeValue(target).replace(/\\/g, "/");
  const rawScope = normalizeValue(scope).replace(/\\/g, "/");
  if (
    path.posix.isAbsolute(rawTarget) ||
    path.posix.isAbsolute(rawScope) ||
    rawTarget.split("/").includes("..") ||
    rawScope.split("/").includes("..")
  ) {
    return false;
  }
  const normalizedTarget = path.posix.normalize(rawTarget).replace(/\/$/, "");
  const normalizedScope = path.posix.normalize(rawScope).replace(/\/$/, "");
  return normalizedScope === "*" || normalizedTarget === normalizedScope || normalizedTarget.startsWith(`${normalizedScope}/`);
}

async function checkDeliveryWorkflow(file, absoluteFile, root, text, tables, fields, schema) {
  const diagnostics = [];
  diagnostics.push(...checkRequiredFields(file, fields, schema.requiredFields));
  diagnostics.push(
    ...checkRequiredSections(file, extractSectionMarkers(text), schema.requiredSections),
  );
  diagnostics.push(
    ...checkTransition(
      file,
      fields.get("Previous state"),
      fields.get("State"),
      schema.transitions,
      "workflow",
    ),
  );
  diagnostics.push(
    ...checkSelfReviewGate(
      file,
      fields,
      ["IN_REVIEW", "APPROVED"].includes(fields.get("Current artifact review state")) ||
        ["MANIFEST_IN_REVIEW", "ARTIFACT_IN_REVIEW", "GATES_READY"].includes(
          fields.get("State"),
        ),
    ),
  );
  const artifactReviewState = fields.get("Current artifact review state");
  const allowedArtifactReviewStates = new Set([
    "NOT_STARTED",
    "IN_REVIEW",
    "CHANGES_REQUESTED",
    "APPROVED",
    "BLOCKED",
    "STALE",
  ]);
  if (artifactReviewState && !allowedArtifactReviewStates.has(artifactReviewState)) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_WORKFLOW_REVIEW_STATE",
        `unsupported Current artifact review state: ${artifactReviewState}`,
      ),
    );
  }
  const reviewApprovedRequired = ["GATES_READY", "COMPLETE", "ARCHIVED"].includes(
    fields.get("State"),
  );
  if (reviewApprovedRequired && artifactReviewState !== "APPROVED") {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_WORKFLOW_REVIEW_STATE",
        `${fields.get("State")} requires Current artifact review state APPROVED`,
      ),
    );
  }
  const artifactApproved = artifactReviewState === "APPROVED";
  const agentAutoMergeReview =
    fields.get("State") === "DELIVERY_ACTIVE" &&
    fields.get("Implementation continuation mode") === "AGENT_AUTO_MERGE";
  diagnostics.push(
    ...checkIndependentReviewGate(
      file,
      fields,
      artifactApproved || reviewApprovedRequired,
      !agentAutoMergeReview,
    ),
  );
  diagnostics.push(...checkImplementationContinuation(file, fields, tables));

  const reviewMode = fields.get("Review mode");
  if (reviewMode) {
    const allowedReviewModes = new Set([
      "EXPLICIT_REVIEW",
      "AUTO_CONTINUE",
      "REVIEW_ON_EXCEPTION",
    ]);
    if (!allowedReviewModes.has(reviewMode)) {
      diagnostics.push(
        diagnostic(file, 1, "SDD_REVIEW_MODE", `unsupported review mode: ${reviewMode}`),
      );
    } else if (reviewMode !== "EXPLICIT_REVIEW") {
      const requiredAutomationFields = [
        "Review mode authority",
        "Automation boundary",
        "Required automatic gates",
        "Automatic gate result",
        "Semantic decision introduced",
        "Automation exception",
        "Automation audit record",
      ];
      diagnostics.push(
        ...checkRequiredFields(file, fields, requiredAutomationFields),
      );
      const configurationFields = [
        "Review mode authority",
        "Automation boundary",
        "Required automatic gates",
        "Automation audit record",
      ];
      const missingConfiguration = configurationFields.filter(
        (field) => !fields.has(field) || isNone(fields.get(field)),
      );
      for (const field of missingConfiguration) {
        diagnostics.push(
          diagnostic(
            file,
            1,
            "SDD_AUTO_CONFIGURATION",
            `automatic continuation requires a non-empty ${field}`,
          ),
        );
      }
      if (fields.get("Semantic decision introduced") !== "NO") {
        diagnostics.push(
          diagnostic(
            file,
            1,
            "SDD_AUTO_SEMANTIC_DECISION",
            "automatic continuation cannot introduce a semantic decision",
          ),
        );
      }
      if (fields.get("Automatic gate result") !== "PASS") {
        diagnostics.push(
          diagnostic(
            file,
            1,
            "SDD_AUTO_GATE_BLOCKED",
            "automatic continuation requires every declared gate to pass",
          ),
        );
      }
      if (!isNone(fields.get("Automation exception") || "")) {
        diagnostics.push(
          diagnostic(
            file,
            1,
            "SDD_AUTO_EXCEPTION",
            "automatic continuation must stop on an exception or ambiguity",
          ),
        );
      }
    }
  }

  const freshnessTable = findTable(tables, [
    "Artifact ID",
    "Depends on",
    "Consumed version",
    "Current version",
    "Change impact",
    "Freshness",
    "Blocked by",
  ]);
  const freshnessRows = freshnessTable?.rows || [];
  const computed = computeTransitiveFreshness(freshnessRows);
  for (const row of freshnessRows) {
    const id = normalizeValue(row["Artifact ID"]);
    const declared = normalizeValue(row.Freshness);
    const expected = computed.get(id);
    if (declared !== expected) {
      diagnostics.push(
        diagnostic(file, freshnessTable.line, "SDD_FRESHNESS_MISMATCH", `${id} declares ${declared}; dependency graph requires ${expected}`),
      );
    }
  }

  const allowedScopes = splitPaths(fields.get("Allowed write scope") || "");
  const writeTargets = splitPaths(fields.get("Next action write targets") || "");
  for (const target of writeTargets) {
    if (!allowedScopes.some((scope) => pathWithinScope(target, scope))) {
      diagnostics.push(
        diagnostic(file, 1, "SDD_WRITE_SCOPE", `next-action target ${target} is outside Allowed write scope`),
      );
    }
  }

  const blockerTable = findTable(tables, ["Blocker ID", "Blocks", "State"]);
  const targetIds = new Set(splitIdentifiers(fields.get("Next action target IDs") || ""));
  for (const blocker of blockerTable?.rows || []) {
    if (normalizeValue(blocker.State) !== "OPEN") {
      continue;
    }
    const blockedIds = splitIdentifiers(blocker.Blocks);
    if (blockedIds.some((id) => targetIds.has(id))) {
      diagnostics.push(
        diagnostic(file, blockerTable.line, "SDD_BLOCKED_NEXT", `next action depends on open blocker ${normalizeValue(blocker["Blocker ID"])}`),
      );
    }
  }

  if (fields.has("Stale artifacts")) {
    const computedStale = [...computed.entries()]
      .filter(([, state]) => state !== "CURRENT")
      .map(([id]) => id);
    const declaredNone = isNone(fields.get("Stale artifacts"));
    if (declaredNone && computedStale.length > 0) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_STALE_SUMMARY_MISMATCH",
          `Stale artifacts declares None; dependency graph contains ${computedStale.join(", ")}`,
        ),
      );
    }
  }

  if (fields.get("State") === "GATES_READY") {
    const nonCurrent = [...computed.entries()].filter(([, state]) => state !== "CURRENT");
    if (nonCurrent.length > 0) {
      diagnostics.push(
        diagnostic(file, 1, "SDD_GATES_NOT_READY", `GATES_READY has non-current artifacts: ${nonCurrent.map(([id]) => id).join(", ")}`),
      );
    }
    const manifest = findTable(tables, ["Order", "Artifact", "Decision", "Review state/link"]);
    for (const row of manifest?.rows || []) {
      const decision = normalizeValue(row.Decision);
      if (["SKIP", "DEFER", "BLOCKED"].includes(decision)) {
        continue;
      }
      const review = normalizeValue(row["Review state/link"]);
      if (!/(?:APPROVED|CURRENT|JUSTIFIED)/i.test(review)) {
        diagnostics.push(
          diagnostic(file, manifest.line, "SDD_UNAPPROVED_PREREQUISITE", `${normalizeValue(row.Artifact)} is not approved/current`),
        );
      }
    }
  }
  diagnostics.push(
    ...(await checkWorkflowValidatingPlan(file, absoluteFile, root, tables, fields, computed)),
  );
  return diagnostics;
}

export async function checkSddLifecycleDocument(file, root, schemas) {
  const text = await readFile(file, "utf8");
  const marker = extractMarker(text);
  if (!marker) {
    return [];
  }
  const relative = path.relative(root, file);
  if (relative.split(path.sep)[0] === "templates") {
    return [];
  }
  if (marker.version !== schemas.schemaVersion) {
    return [
      diagnostic(relative, 1, "SDD_SCHEMA_VERSION", `artifact schema ${marker.version} does not match supported schema ${schemas.schemaVersion}`),
    ];
  }
  const schema = schemas.artifacts[marker.artifact];
  if (!schema) {
    return [diagnostic(relative, 1, "SDD_SCHEMA_UNKNOWN", `unknown artifact schema: ${marker.artifact}`)];
  }
  const tables = parseMarkdownTables(text);
  const fields = extractControlFields(tables);
  if (marker.artifact === "implementation-plan") {
    return checkImplementationPlan(relative, marker, text, tables, fields, schema);
  }
  if (marker.artifact === "delivery-workflow") {
    return checkDeliveryWorkflow(relative, file, root, text, tables, fields, schema);
  }
  return [];
}

export async function runLifecycleChecks(root = REPOSITORY_ROOT, exclusions = [], schemaPath = DEFAULT_SCHEMA_PATH) {
  const schemas = JSON.parse(await readFile(schemaPath, "utf8"));
  const files = (await collectFiles(root, exclusions)).filter((file) => /\.md(?:own|x)?$/i.test(file));
  const diagnostics = [];
  for (const file of files) {
    diagnostics.push(...(await checkSddLifecycleDocument(file, root, schemas)));
  }
  return diagnostics;
}

async function main() {
  const command = process.argv[2] || "check";
  if (command !== "check") {
    console.error(`unknown command: ${command}`);
    process.exitCode = 2;
    return;
  }
  let root = REPOSITORY_ROOT;
  const exclusions = [];
  for (let index = 3; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--root" && process.argv[index + 1]) {
      root = path.resolve(process.argv[index + 1]);
      index += 1;
    } else if (process.argv[index] === "--exclude" && process.argv[index + 1]) {
      exclusions.push(process.argv[index + 1]);
      index += 1;
    } else {
      console.error(`unknown or incomplete option: ${process.argv[index]}`);
      process.exitCode = 2;
      return;
    }
  }
  const diagnostics = await runLifecycleChecks(root, exclusions);
  for (const item of diagnostics) {
    console.error(`${item.file}:${item.line} [${item.rule}] ${item.message}`);
  }
  if (diagnostics.length > 0) {
    process.exitCode = 1;
    return;
  }
  console.log("SDD lifecycle invariants: OK");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
