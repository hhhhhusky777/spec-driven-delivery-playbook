import { readFile } from "node:fs/promises";
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
    if (!tables(text).some(table => table[0].includes("Design point") && table[0].includes("Accepted outcome"))) {
      errors.push("concluded whiteboard requires a design-outcome table");
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

export function checkDocument(file, text) {
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
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
  } else console.log("SDD three-document lifecycle: OK");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
