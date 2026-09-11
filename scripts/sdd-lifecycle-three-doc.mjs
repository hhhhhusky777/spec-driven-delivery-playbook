import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHA = /^[a-f0-9]{40}$/;
const ADOPTION_STATES = new Set(["DRAFT", "INSTALLED", "BLOCKED"]);
const UPGRADE_STATES = new Set(["NONE", "ASSESSING", "APPROVED", "APPLYING", "VALIDATING", "COMPLETE", "BLOCKED"]);
const PLAN_STATES = new Set(["DRAFT", "READY", "IMPLEMENTING", "VALIDATING", "COMPLETE", "BLOCKED"]);
const TASK_STATES = new Set(["PLANNED", "READY", "IN_PROGRESS", "VERIFYING", "DONE", "BLOCKED", "CANCELLED"]);

function cells(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map(value => value.trim().replace(/^`|`$/g, ""));
}

export function tables(text) {
  const result = [];
  let current = [];
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*\|/.test(line)) current.push(cells(line));
    else if (current.length) { result.push(current); current = []; }
  }
  if (current.length) result.push(current);
  return result.filter(table => table.length >= 2);
}

function fieldMap(text) {
  const map = new Map();
  for (const table of tables(text)) {
    if (table[0][0] !== "Field" || table[0][1] !== "Value") continue;
    for (const row of table.slice(2)) map.set(row[0], row[1] || "");
  }
  return map;
}

function taskRows(text) {
  for (const table of tables(text)) {
    if (table[0].includes("ID") && table[0].includes("State") && table[0].includes("Depends on")) {
      return table.slice(2).map(row => Object.fromEntries(table[0].map((key, index) => [key, row[index] || ""])));
    }
  }
  return [];
}

function manifestErrors(text) {
  const fields = fieldMap(text);
  const errors = [];
  const adoption = fields.get("Adoption state") || "";
  const prior = fields.get("State before block") || "None";
  if (!ADOPTION_STATES.has(adoption)) errors.push("manifest Adoption state is unsupported");
  if (adoption === "BLOCKED" && !["DRAFT", "INSTALLED"].includes(prior)) {
    errors.push("BLOCKED manifest requires State before block DRAFT or INSTALLED");
  }
  if (adoption !== "BLOCKED" && prior !== "None") errors.push("unblocked manifest State before block must be None");
  if (!SHA.test(fields.get("Playbook revision") || "")) errors.push("manifest Playbook revision must be a full SHA");
  const upgrade = fields.get("Upgrade state") || "";
  if (!UPGRADE_STATES.has(upgrade)) errors.push("manifest Upgrade state is unsupported");
  if (!["NONE", "COMPLETE"].includes(upgrade) && !SHA.test(fields.get("Upgrade candidate") || "")) {
    errors.push("an open manifest upgrade requires a full-SHA Upgrade candidate");
  }
  for (const forbidden of ["Current task", "Next action", "Feature branch / PR", "Current artifact/gate"]) {
    if (fields.has(forbidden)) errors.push(`manifest must not own feature field: ${forbidden}`);
  }
  return errors;
}

function whiteboardErrors(text) {
  const fields = fieldMap(text);
  const state = fields.get("State") || "";
  const errors = [];
  if (!new Set(["EMPTY", "OPEN", "CONCLUDED"]).has(state)) errors.push("whiteboard State must be EMPTY, OPEN, or CONCLUDED");
  if (state === "CONCLUDED") {
    if ((fields.get("Open owner decisions") || "") !== "None") errors.push("concluded whiteboard has open owner decisions");
    const documentTables = tables(text);
    const design = documentTables.find(table => table[0].includes("Design point") && table[0].includes("Accepted outcome"));
    if (!design) {
      errors.push("concluded whiteboard requires a design-outcome table");
    }
    const draft = documentTables.find(table =>
      table[0].includes("ID") && table[0].includes("Agreed item, alternative, constraint, or gap")
    );
    if (!draft?.slice(2).length) errors.push("concluded whiteboard requires a retained discussion draft");
    else {
      const resolutionIndex = draft[0].indexOf("State / resolution");
      const resolved = new Set(["accepted", "changed", "deferred", "rejected"]);
      const seenDraftIds = new Set();
      for (const row of draft.slice(2)) {
        const id = row[0] || "";
        if (!id || seenDraftIds.has(id)) errors.push(`invalid or duplicate whiteboard draft item: ${id || "empty"}`);
        seenDraftIds.add(id);
        if (!resolved.has((row[resolutionIndex] || "").toLowerCase())) {
          errors.push(`unresolved retained whiteboard draft item: ${id || "unknown"}`);
        }
      }
    }
    const reconciliation = documentTables.find(table =>
      table[0].includes("Draft item") && table[0].includes("Concluded design point") && table[0].includes("Disposition")
    );
    if (!reconciliation) errors.push("concluded whiteboard requires draft-to-conclusion reconciliation");
    else {
      const rows = reconciliation.slice(2);
      if (!rows.length) errors.push("concluded whiteboard requires at least one reconciled draft item");
      const allowed = new Set(["accepted", "changed", "deferred", "rejected"]);
      const dispositionIndex = reconciliation[0].indexOf("Disposition");
      const seenReconciliationIds = new Set();
      for (const row of rows) {
        const id = row[0] || "";
        if (!id || seenReconciliationIds.has(id)) {
          errors.push(`invalid or duplicate whiteboard reconciliation item: ${id || "empty"}`);
        }
        seenReconciliationIds.add(id);
        if (!allowed.has((row[dispositionIndex] || "").toLowerCase())) {
          errors.push(`unresolved whiteboard draft item: ${id || "unknown"}`);
        }
      }
      const draftIds = new Set((draft?.slice(2) || []).map(row => row[0]).filter(Boolean));
      const reconciledIds = new Set(rows.map(row => row[0]).filter(Boolean));
      const designIds = new Set((design?.slice(2) || []).map(row => row[0]).filter(Boolean));
      const conclusionIndex = reconciliation[0].indexOf("Concluded design point");
      for (const id of draftIds) {
        if (!reconciledIds.has(id)) errors.push(`whiteboard draft item lacks reconciliation: ${id}`);
      }
      for (const id of reconciledIds) {
        if (!draftIds.has(id)) errors.push(`whiteboard reconciliation references unknown draft item: ${id}`);
      }
      for (const row of rows) {
        const disposition = (row[dispositionIndex] || "").toLowerCase();
        const references = (row[conclusionIndex] || "")
          .split(/[,;]\s*/).map(value => value.replace(/`/g, "")).filter(value => value && value !== "None");
        if (["accepted", "changed"].includes(disposition) && !references.length) {
          errors.push(`resolved whiteboard draft item lacks a design point: ${row[0] || "unknown"}`);
        }
        for (const reference of references) {
          if (!designIds.has(reference)) errors.push(`whiteboard reconciliation references unknown design point: ${reference}`);
        }
      }
    }
  }
  return errors;
}

function planErrors(text) {
  const fields = fieldMap(text);
  const tasks = taskRows(text);
  const errors = [];
  if (!PLAN_STATES.has(fields.get("State") || "")) errors.push("implementation plan State is unsupported");
  if (!tasks.length) errors.push("implementation plan requires at least one task");
  const ids = new Set();
  for (const task of tasks) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(task.ID) || ids.has(task.ID)) errors.push(`invalid or duplicate task ID: ${task.ID}`);
    ids.add(task.ID);
    if (!TASK_STATES.has(task.State)) errors.push(`unsupported task state: ${task.ID}/${task.State}`);
  }
  const active = tasks.filter(task => ["IN_PROGRESS", "VERIFYING"].includes(task.State));
  const recordedActive = (fields.get("Active tasks") || "None")
    .split(/[,;]\s*/).filter(value => value && value !== "None").sort();
  const actualActive = active.map(task => task.ID).sort();
  if (recordedActive.join(",") !== actualActive.join(",")) errors.push("Active tasks must match active task rows");
  const dependencies = new Map(tasks.map(task => [task.ID, (task["Depends on"] || "None").split(/[,;]\s*/).filter(value => value && value !== "None")]));
  for (const [id, deps] of dependencies) for (const dep of deps) if (!ids.has(dep)) errors.push(`${id} depends on unknown task ${dep}`);
  const visiting = new Set();
  const visited = new Set();
  const visit = id => {
    if (visiting.has(id)) { errors.push(`task dependency cycle at ${id}`); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dep of dependencies.get(id) || []) visit(dep);
    visiting.delete(id); visited.add(id);
  };
  for (const id of ids) visit(id);
  for (const task of tasks) {
    if (!["READY", "IN_PROGRESS", "VERIFYING", "DONE"].includes(task.State)) continue;
    for (const dep of dependencies.get(task.ID) || []) {
      const state = tasks.find(candidate => candidate.ID === dep)?.State;
      if (state !== "DONE") errors.push(`${task.ID} has unsatisfied dependency ${dep}`);
    }
  }
  const next = fields.get("Next ready task") || "None";
  if (next !== "None" && !tasks.some(task => task.ID === next && task.State === "READY")) {
    errors.push("Next ready task must identify a READY task");
  }
  const state = fields.get("State") || "";
  if (["VALIDATING", "COMPLETE"].includes(state) && tasks.some(task => !["DONE", "CANCELLED"].includes(task.State))) {
    errors.push(`${state} plan requires every task to be terminal`);
  }
  if (state === "COMPLETE" && (actualActive.length || next !== "None")) {
    errors.push("COMPLETE plan cannot retain active or next-ready tasks");
  }
  return errors;
}

function markerCount(text, marker) {
  return text.split(marker).length - 1;
}

function hasHeading(text, pattern) {
  return text.split(/\r?\n/).some(line => /^#{2,6}\s+/.test(line) && pattern.test(line));
}

function requireArchiveSection(errors, text, pattern, name) {
  if (!hasHeading(text, pattern)) errors.push(`delivery archive required section is missing: ${name}`);
}

function linkedUrl(value, kind) {
  const pattern = kind === "issue"
    ? /https?:\/\/[^\s)]+\/issues\/\d+/
    : /https?:\/\/[^\s)]+\/pull\/\d+/;
  return value.match(pattern)?.[0] || "";
}

function archiveMetadata(text) {
  const marker = "<!-- sdd: archived-whiteboard -->";
  const end = text.indexOf(marker);
  return fieldMap(end === -1 ? text : text.slice(0, end));
}

function deliveryArchiveErrors(text) {
  const errors = [];
  const whiteboardMarker = "<!-- sdd: archived-whiteboard -->";
  const planMarker = "<!-- sdd: archived-implementation-plan -->";
  const archiveFields = archiveMetadata(text);
  const whiteboardCount = markerCount(text, whiteboardMarker);
  const planCount = markerCount(text, planMarker);
  if (whiteboardCount !== 1) errors.push("delivery archive requires exactly one archived whiteboard");
  if (planCount !== 1) errors.push("delivery archive requires exactly one archived implementation plan");
  if (!linkedUrl(archiveFields.get("Issues") || "", "issue")) {
    errors.push("delivery archive requires an archive-level Issues link");
  }
  if (!linkedUrl(archiveFields.get("Closing pull request") || "", "pull")) {
    errors.push("delivery archive requires an archive-level Closing pull request link");
  }
  if (whiteboardCount !== 1 || planCount !== 1) return errors;

  const whiteboardStart = text.indexOf(whiteboardMarker);
  const planStart = text.indexOf(planMarker);
  if (whiteboardStart > planStart) {
    errors.push("delivery archive must place the concluded whiteboard before the completed implementation plan");
    return errors;
  }
  const whiteboard = text.slice(whiteboardStart, planStart);
  const plan = text.slice(planStart);
  requireArchiveSection(errors, whiteboard, /Discussion draft/i, "whiteboard discussion draft");
  requireArchiveSection(errors, whiteboard, /Authority/i, "whiteboard authority and context");
  requireArchiveSection(errors, whiteboard, /Concluded design/i, "whiteboard concluded design");
  requireArchiveSection(errors, whiteboard, /Draft-to-conclusion reconciliation/i, "whiteboard draft reconciliation");
  requireArchiveSection(errors, plan, /Governing inputs.*boundaries/i, "plan governing inputs and boundaries");
  requireArchiveSection(errors, plan, /Design-to-task mapping/i, "plan design-to-task mapping");
  requireArchiveSection(errors, plan, /^#{2,6}\s+Tasks\s*$/i, "plan tasks");
  requireArchiveSection(errors, plan, /Task specifications and context receipts/i, "plan task specifications and context receipts");
  requireArchiveSection(errors, plan, /Planned versus actual outcome/i, "plan actual outcomes and deviations");
  requireArchiveSection(errors, plan, /Delivery Definition of Done/i, "plan validation and Definition of Done");
  requireArchiveSection(errors, plan, /Cleanup inventory/i, "plan cleanup inventory");
  const archivedTasks = tables(plan).find(table =>
    table[0].includes("ID") && table[0].includes("State") && table[0].includes("Depends on")
  );
  if (!archivedTasks?.[0].includes("Outcome") || !archivedTasks?.[0].includes("Validation")) {
    errors.push("archived plan task summary requires Outcome and Validation columns");
  }
  if ((fieldMap(whiteboard).get("State") || "") !== "CONCLUDED") {
    errors.push("archived whiteboard must be CONCLUDED");
  }
  if ((fieldMap(plan).get("State") || "") !== "COMPLETE") {
    errors.push("archived implementation plan must be COMPLETE");
  }
  for (const message of whiteboardErrors(whiteboard)) errors.push(`archived whiteboard: ${message}`);
  for (const message of planErrors(plan)) errors.push(`archived implementation plan: ${message}`);
  return errors;
}

export function checkArchiveSet(entries) {
  const owners = new Map();
  const errors = [];
  for (const [file, text] of entries) {
    if (!text.includes("<!-- sdd: delivery-archive -->")) continue;
    const closingPullRequest = linkedUrl(archiveMetadata(text).get("Closing pull request") || "", "pull");
    if (!closingPullRequest) continue;
    if (owners.has(closingPullRequest)) {
      errors.push(`${file} and ${owners.get(closingPullRequest)} claim the same closing pull request`);
    } else owners.set(closingPullRequest, file);
  }
  return errors;
}

export function checkDocument(file, text) {
  if (text.includes("<!-- sdd: delivery-archive -->")) return deliveryArchiveErrors(text);
  const name = path.basename(file);
  if (name === "project-adoption-manifest.md") return manifestErrors(text);
  if (name === "solution-whiteboard.md") return whiteboardErrors(text);
  if (name === "implementation-plan.md") return planErrors(text);
  return [];
}

async function main() {
  const errors = [];
  const liveRoot = path.join(ROOT, ".github", "spec-driven-delivery");
  const files = [
    path.join(liveRoot, "project-adoption-manifest.md"),
    path.join(liveRoot, "solution-whiteboard.md"),
    path.join(liveRoot, "implementation-plan.md"),
  ];
  for (const file of files) {
    let text;
    try { text = await readFile(file, "utf8"); }
    catch (error) {
      if (error.code === "ENOENT" && path.basename(file) === "implementation-plan.md") continue;
      if (error.code === "ENOENT") errors.push(`${path.relative(ROOT, file)}: required live document is missing`);
      else throw error;
      continue;
    }
    for (const message of checkDocument(file, text)) errors.push(`${path.relative(ROOT, file)}: ${message}`);
  }
  const archiveRoot = path.join(liveRoot, "archive");
  let archiveEntries = [];
  const archiveDocuments = [];
  try { archiveEntries = await readdir(archiveRoot, { withFileTypes: true }); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  for (const entry of archiveEntries) {
    if (!entry.isFile() || path.extname(entry.name) !== ".md") continue;
    const file = path.join(archiveRoot, entry.name);
    const text = await readFile(file, "utf8");
    if (!text.includes("<!-- sdd: delivery-archive -->")) continue;
    archiveDocuments.push([path.relative(ROOT, file), text]);
    for (const message of checkDocument(file, text)) errors.push(`${path.relative(ROOT, file)}: ${message}`);
  }
  for (const message of checkArchiveSet(archiveDocuments)) errors.push(message);
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
  } else console.log("SDD three-document lifecycle: OK");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
