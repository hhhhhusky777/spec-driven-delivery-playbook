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

function checkMaterialCorrections(file, tables, tasks) {
  const diagnostics = [];
  const correctionTable = findTable(tables, [
    "Correction ID",
    "State",
    "Affected IDs",
    "Affected tasks",
    "Supersedes/current authority",
    "Reconciled locations",
    "Dependent impact/freshness",
    "Review evidence",
  ]);
  if (!correctionTable) {
    return [
      diagnostic(
        file,
        1,
        "SDD_CORRECTION_REGISTER_REQUIRED",
        "schema-2 implementation plan requires a material-correction register",
      ),
    ];
  }

  const corrections = new Map();
  const taskById = new Map(tasks.map((task) => [normalizeValue(task.ID), task]));
  const allowedStates = new Set(["OPEN", "IN_REVIEW", "APPROVED", "BLOCKED"]);
  for (const row of correctionTable.rows) {
    const id = normalizeValue(row["Correction ID"]);
    const state = normalizeValue(row.State);
    const affectedIds = splitIdentifiers(row["Affected IDs"]);
    const affectedTasks = splitIdentifiers(row["Affected tasks"]);
    if (isNone(id) || corrections.has(id)) {
      diagnostics.push(
        diagnostic(file, correctionTable.line, "SDD_CORRECTION_ID", `invalid or duplicate correction ID: ${id}`),
      );
      continue;
    }
    corrections.set(id, row);
    if (!allowedStates.has(state)) {
      diagnostics.push(
        diagnostic(file, correctionTable.line, "SDD_CORRECTION_STATE", `${id} has unsupported state ${state}`),
      );
    }
    if (affectedIds.length === 0) {
      diagnostics.push(
        diagnostic(file, correctionTable.line, "SDD_CORRECTION_SCOPE", `${id} must identify affected contract or decision IDs`),
      );
    }
    for (const taskId of affectedTasks) {
      const task = taskById.get(taskId);
      if (!task) {
        diagnostics.push(
          diagnostic(file, correctionTable.line, "SDD_CORRECTION_TASK_UNKNOWN", `${id} references unknown task ${taskId}`),
        );
        continue;
      }
      if (state !== "APPROVED") {
        const taskState = normalizeValue(task.State);
        const next = normalizeValue(task.Next);
        if (["READY", "IN_PROGRESS", "VERIFYING"].includes(taskState) || next === "NEXT") {
          diagnostics.push(
            diagnostic(file, correctionTable.line, "SDD_OPEN_CORRECTION_TASK", `${id} is ${state} but affected task ${taskId} is ${taskState}${next === "NEXT" ? "/NEXT" : ""}`),
          );
        }
        const freshness = normalizeValue(task["Source freshness"] || "");
        if (!["STALE", "BLOCKED"].includes(freshness)) {
          diagnostics.push(
            diagnostic(file, correctionTable.line, "SDD_OPEN_CORRECTION_FRESHNESS", `${id} is ${state} but affected task ${taskId} source freshness is ${freshness || "missing"}`),
          );
        }
      }
    }
    if (state === "APPROVED") {
      for (const field of [
        "Supersedes/current authority",
        "Reconciled locations",
        "Dependent impact/freshness",
        "Review evidence",
      ]) {
        if (isNone(row[field])) {
          diagnostics.push(
            diagnostic(file, correctionTable.line, "SDD_CORRECTION_APPROVAL_EVIDENCE", `${id} is APPROVED without ${field}`),
          );
        }
      }
      if (!/\bAPPROVED\b/.test(normalizeValue(row["Review evidence"]))) {
        diagnostics.push(
          diagnostic(file, correctionTable.line, "SDD_CORRECTION_REVIEW", `${id} is APPROVED without an APPROVED review disposition`),
        );
      }
    }
  }

  const changeLog = findTable(tables, [
    "Time",
    "Changed by",
    "Change class",
    "Correction ID",
  ]);
  if (!changeLog) {
    diagnostics.push(
      diagnostic(file, 1, "SDD_CHANGE_LOG_REQUIRED", "schema-2 implementation plan requires classified change-log entries"),
    );
    return diagnostics;
  }
  const referencedCorrections = new Set();
  for (const row of changeLog.rows) {
    const changeClass = normalizeValue(row["Change class"]);
    const correctionIds = splitIdentifiers(row["Correction ID"]);
    if (!["CONTROL_ONLY", "MATERIAL", "UNKNOWN"].includes(changeClass)) {
      diagnostics.push(
        diagnostic(file, changeLog.line, "SDD_CHANGE_CLASS", `unsupported plan change class: ${changeClass}`),
      );
      continue;
    }
    if (["MATERIAL", "UNKNOWN"].includes(changeClass) && correctionIds.length === 0) {
      diagnostics.push(
        diagnostic(file, changeLog.line, "SDD_CHANGE_CORRECTION_REQUIRED", `${changeClass} plan change must reference a correction ID`),
      );
    }
    if (changeClass === "CONTROL_ONLY" && correctionIds.length > 0) {
      diagnostics.push(
        diagnostic(file, changeLog.line, "SDD_CONTROL_CHANGE_CORRECTION", "CONTROL_ONLY plan change must not claim a material correction ID"),
      );
    }
    for (const correctionId of correctionIds) {
      if (["MATERIAL", "UNKNOWN"].includes(changeClass)) {
        referencedCorrections.add(correctionId);
      }
      if (!corrections.has(correctionId)) {
        diagnostics.push(
          diagnostic(file, changeLog.line, "SDD_CHANGE_CORRECTION_UNKNOWN", `change log references unknown correction ${correctionId}`),
        );
      }
    }
  }
  for (const correctionId of corrections.keys()) {
    if (!referencedCorrections.has(correctionId)) {
      diagnostics.push(
        diagnostic(file, correctionTable.line, "SDD_CORRECTION_CHANGE_LOG", `${correctionId} has no MATERIAL or UNKNOWN change-log entry`),
      );
    }
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

  const tasks = taskRows(tables);
  diagnostics.push(...checkMaterialCorrections(file, tables, tasks));
  const detailedTasks = extractTaskSpecificationMarkers(text);
  const specificationRequiredStates = new Set(["READY", "IN_PROGRESS", "VERIFYING", "DONE"]);
  const currentSourceRequiredStates = new Set(["READY", "IN_PROGRESS", "VERIFYING"]);
  for (const task of tasks) {
    const id = normalizeValue(task.ID);
    const state = normalizeValue(task.State);
    const next = normalizeValue(task.Next);
    if ((specificationRequiredStates.has(state) || next === "NEXT") && !detailedTasks.has(id)) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_TASK_SPEC_REQUIRED",
          `${id} is ${state}${next === "NEXT" ? " and NEXT" : ""} but has no complete task specification`,
        ),
      );
    }
    if (next === "NEXT" && task["Blocked by"] && !isNone(task["Blocked by"])) {
      diagnostics.push(
        diagnostic(file, 1, "SDD_BLOCKED_NEXT", `${id} is NEXT but is blocked by ${task["Blocked by"]}`),
      );
    }
    if (currentSourceRequiredStates.has(state) && task["Source freshness"] && normalizeValue(task["Source freshness"]) !== "CURRENT") {
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

function checkDeliveryWorkflow(file, text, tables, fields, schema) {
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
  const schema = schemas.artifacts[marker.artifact];
  if (!schema) {
    return [diagnostic(relative, 1, "SDD_SCHEMA_UNKNOWN", `unknown artifact schema: ${marker.artifact}`)];
  }
  const supportedVersion = schema.version || schemas.schemaVersion;
  if (marker.version !== supportedVersion) {
    return [
      diagnostic(relative, 1, "SDD_SCHEMA_VERSION", `artifact schema ${marker.version} does not match supported ${marker.artifact} schema ${supportedVersion}`),
    ];
  }
  const tables = parseMarkdownTables(text);
  const fields = extractControlFields(tables);
  if (marker.artifact === "implementation-plan") {
    return checkImplementationPlan(relative, marker, text, tables, fields, schema);
  }
  if (marker.artifact === "delivery-workflow") {
    return checkDeliveryWorkflow(relative, text, tables, fields, schema);
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
