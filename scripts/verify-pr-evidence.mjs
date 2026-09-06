#!/usr/bin/env node

import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const sha = value => typeof value === "string" && /^[a-f0-9]{40}$/.test(value);
const repo = value => typeof value === "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value);
const branch = value => typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value) && !value.includes("..") && !value.includes("//") && !value.includes("@{");
const digest = body => `sha256:${createHash("sha256").update(body).digest("hex")}`;
const normalize = value => String(value ?? "").trim().replace(/^`|`$/g, "");
const includesExact = (value, expected) => String(value ?? "").includes(expected);

function assignments(value, keys) {
  const entries = new Map();
  for (const part of String(value ?? "").split(";")) {
    const match = part.trim().match(/^([A-Za-z ]+)\s*=\s*(.+)$/);
    if (!match) return false;
    const key = match[1].trim().toUpperCase();
    if (!keys.includes(key)) return false;
    if (entries.has(key) || !normalize(match[2])) return false;
    entries.set(key, normalize(match[2]));
  }
  return keys.every(key => entries.has(key)) && entries.size === keys.length ? entries : false;
}

function markdownTables(body, startIndex = 0) {
  const lines = String(body ?? "").split(/\r?\n/);
  const tables = [];
  for (let index = startIndex; index < lines.length - 1; index += 1) {
    if (!/^\s*\|/.test(lines[index]) || !/^\s*\|/.test(lines[index + 1])) continue;
    const headers = splitRow(lines[index]);
    const separator = splitRow(lines[index + 1]);
    if (headers.length < 2 || separator.length !== headers.length || !separator.every(cell => /^:?-{3,}:?$/.test(cell))) continue;
    const rows = [];
    let cursor = index + 2;
    let valid = true;
    for (; cursor < lines.length && /^\s*\|/.test(lines[cursor]); cursor += 1) {
      const cells = splitRow(lines[cursor]);
      if (cells.length !== headers.length) {
        valid = false;
        break;
      }
      rows.push(new Map(headers.map((header, position) => [normalize(header), normalize(cells[position])])));
    }
    if (valid && rows.length) tables.push({ headers: headers.map(normalize), rows });
    index = Math.max(index, cursor - 1);
  }
  return tables;
}

function fieldTable(body, requiredFields, startIndex = 0) {
  const candidates = [];
  for (const table of markdownTables(body, startIndex)) {
    if (table.headers.length !== 2 || table.headers[0] !== "Field" || table.headers[1] !== "Value") continue;
    const fields = new Map();
    let valid = true;
    for (const row of table.rows) {
      const key = row.get("Field");
      if (!key || fields.has(key)) {
        valid = false;
        break;
      }
      fields.set(key, row.get("Value"));
    }
    if (valid && requiredFields.every(field => fields.has(field))) candidates.push(fields);
  }
  if (candidates.length !== 1) return null;
  const allRows = markdownTables(body, startIndex).flatMap(table => table.rows);
  if (requiredFields.some(field => allRows.filter(row => row.has("Field") && row.get("Field") === field).length !== 1)) return null;
  return candidates[0];
}

function commaList(value) {
  if (normalize(value).toUpperCase() === "NONE") return [];
  const values = String(value ?? "").split(",").map(normalize).filter(Boolean);
  return values.length && new Set(values).size === values.length ? values.sort() : null;
}

const inventoryHeaders = [
  "Item ID", "Kind", "Exact identity", "Ownership evidence", "Disposition",
  "Reuse reason", "Authorized operation", "State",
];
const inventoryKinds = new Set(["FILE", "BRANCH", "WORKTREE", "RUNTIME"]);
const inventoryStates = new Set(["PLANNED", "VERIFIED"]);
const unsafeExternalParents = new Set([
  "/", "/tmp", "/private", "/private/tmp", "/var", "/var/tmp", "/private/var",
  "/private/var/tmp", "/private/var/folders", "/Users", "/home", "/root", "/usr",
  "/opt", "/etc", "/Applications", "/Library", "/System", "/Volumes",
]);
const recorded = value => Boolean(normalize(value)) && !/^(?:none|not applicable|n\/a|—|-)$/i.test(normalize(value));
const exactToken = (value, expected) => {
  const escaped = expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[\\s'"\x60=:;,])${escaped}(?=$|[\\s'"\x60;,])`).test(String(value ?? ""));
};

const ownershipToken = (value, expected) => {
  const escaped = expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[\\s'"\x60=:;,])${escaped}(?:/\\.sdd-owned-checkout)?(?=$|[\\s'"\x60;,])`).test(String(value ?? ""));
};

const unresolvedOperation = value => /[*?\[\]{}]|\$\{|\$[A-Za-z_]|(?:^|[\\s/])\.\.(?=$|[\\s/])|(?:^|\s)~(?:\/|$)/.test(String(value ?? ""));

function operationTargetsOnlyIdentity(value, expected) {
  const escaped = expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let matched = 0;
  const withoutExpected = String(value ?? "").replace(
    new RegExp(`(^|[\\s'"\x60=:;,])${escaped}(?=$|[\\s'"\x60;,])`, "g"),
    (_, prefix) => {
      matched += 1;
      return `${prefix}<EXACT_RESET_IDENTITY>`;
    },
  );
  return matched > 0 && !withoutExpected.includes("/");
}

function pathAliases(value) {
  const resolved = path.resolve(value);
  const aliases = new Set([resolved]);
  if (resolved.startsWith("/private/var/")) aliases.add(resolved.slice("/private".length));
  if (resolved.startsWith("/var/")) aliases.add(`/private${resolved}`);
  return [...aliases];
}

function protectsBoundary(candidate, protectedPath) {
  return protectedPath === candidate || protectedPath.startsWith(`${candidate}${path.sep}`);
}

function isProtectedExternalParent(candidate) {
  const protectedRoots = [process.cwd(), os.tmpdir(), process.env.TMPDIR].filter(Boolean).flatMap(pathAliases);
  return pathAliases(candidate).some(alias => protectedRoots.some(root => protectsBoundary(alias, root)));
}

function validInventoryIdentity(kind, identity) {
  if (!identity || /[*?\[\]{}]/.test(identity) || /(^|\/)\.\.($|\/)/.test(identity) || /\$\{|\$[A-Za-z_]|^~(?:\/|$)/.test(identity)) return false;
  if (kind === "FILE") return !path.isAbsolute(identity) && !identity.includes("\\") && !identity.split("/").some(part => ["", ".", ".."].includes(part)) && identity !== ".git" && !identity.startsWith(".git/");
  if (kind === "BRANCH") return /^refs\/heads\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(identity) && !identity.includes("..") && !identity.includes("//");
  if (!["WORKTREE", "RUNTIME"].includes(kind) || !path.isAbsolute(identity)) return false;
  const resolved = path.resolve(identity);
  return identity === resolved && !unsafeExternalParents.has(resolved) && !/^\/(?:Users|home)\/[^/]+$/.test(resolved) &&
    !isProtectedExternalParent(resolved);
}

function resetInventory(body) {
  const candidates = markdownTables(body).filter(table =>
    table.headers.length === inventoryHeaders.length && inventoryHeaders.every((header, index) => table.headers[index] === header));
  if (candidates.length !== 1) return null;
  const result = { REMOVE: [], RESET: [], KEEP: [] };
  const itemIds = new Set();
  const identities = new Set();
  for (const row of candidates[0].rows) {
    const itemId = normalize(row.get("Item ID"));
    const kind = normalize(row.get("Kind")).toUpperCase();
    const identity = normalize(row.get("Exact identity"));
    const ownership = normalize(row.get("Ownership evidence"));
    const disposition = normalize(row.get("Disposition")).toUpperCase();
    const reuseReason = normalize(row.get("Reuse reason"));
    const operation = normalize(row.get("Authorized operation"));
    const state = normalize(row.get("State")).toUpperCase();
    if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(itemId) || itemIds.has(itemId.toLowerCase()) ||
        !inventoryKinds.has(kind) || !validInventoryIdentity(kind, identity) || identities.has(identity) ||
        !recorded(ownership) || !Object.hasOwn(result, disposition) || !inventoryStates.has(state) ||
        (disposition === "KEEP" ? (!recorded(reuseReason) || normalize(operation).toUpperCase() !== "NONE") :
          (normalize(reuseReason).toUpperCase() !== "NONE" || !recorded(operation))) ||
        (["WORKTREE", "RUNTIME"].includes(kind) && disposition !== "KEEP" &&
          (!ownershipToken(ownership, identity) || !exactToken(operation, identity) || unresolvedOperation(operation) ||
            !operationTargetsOnlyIdentity(operation, identity)))) return null;
    itemIds.add(itemId.toLowerCase());
    identities.add(identity);
    result[disposition].push(identity);
  }
  for (const values of Object.values(result)) values.sort();
  return result;
}

function resetPlan(value, repository, expectedHead, inventoryFiles, changedFiles) {
  const entries = assignments(value, ["REMOVE", "RESET", "KEEP", "INVENTORY"]);
  if (!entries) return false;
  const inventory = entries.get("INVENTORY") || "";
  if (!inventory.startsWith(`https://github.com/${repository}/blob/${expectedHead}/`)) return false;
  const inventoryFile = inventoryFiles.find(item => item.url === inventory);
  const parsed = inventoryFile ? resetInventory(inventoryFile.body) : null;
  if (!parsed) return false;
  const classifiedRepositoryFiles = new Set(Object.values(parsed).flat().filter(identity => !path.isAbsolute(identity) && !identity.startsWith("refs/heads/")));
  if (!Array.isArray(changedFiles) || changedFiles.some(file => !classifiedRepositoryFiles.has(normalize(file)))) return false;
  return ["REMOVE", "RESET", "KEEP"].every(key => {
    const listed = commaList(entries.get(key));
    return listed && listed.length === parsed[key].length && listed.every((item, index) => item === parsed[key][index]);
  }) ? { entries, inventoryFile } : false;
}

function reviewerReceipt(body, expectedHead, expectedBase, expectedSubject) {
  const requiredFields = [
    "Review session ID", "Review round", "Reviewer seat", "Assigned reviewer ID",
    "Reviewer agent/runtime", "Context isolation", "Subject", "Reviewed candidate revision",
    "Reviewed base revision", "Governing inputs inspected", "Gates/evidence inspected",
    "Summary comment", "Inline comments", "Durable findings", "Disposition",
    "Recommended next action", "Reviewed at",
  ];
  const fields = fieldTable(body, requiredFields);
  if (!fields || /(?:^|\n)(?:Review session(?: ID)?|Review round|Reviewer seat|Assigned reviewer ID|Context isolation|Reviewed candidate revision|Reviewed base revision|Durable findings|Disposition):/i.test(String(body ?? ""))) return null;
  const seat = normalize(fields.get("Reviewer seat")).toUpperCase();
  const session = normalize(fields.get("Review session ID"));
  const round = normalize(fields.get("Review round")).toUpperCase();
  const assignedReviewer = normalize(fields.get("Assigned reviewer ID"));
  const candidate = normalize(fields.get("Reviewed candidate revision"));
  const isolation = normalize(fields.get("Context isolation")).toUpperCase();
  const findings = normalize(fields.get("Durable findings"));
  const disposition = normalize(fields.get("Disposition")).toUpperCase();
  const next = normalize(fields.get("Recommended next action")).toUpperCase();
  const allValuesPresent = requiredFields.every(field => normalize(fields.get(field)));
  return allValuesPresent && ["R1", "R2"].includes(seat) && /^[A-Za-z0-9._-]+$/.test(session) && /^R\d+$/.test(round) &&
    /^[A-Za-z0-9._/-]+$/.test(assignedReviewer) && candidate === expectedHead && includesExact(fields.get("Reviewed base revision"), expectedBase) &&
    normalize(fields.get("Subject")) === expectedSubject && isolation.startsWith("FRESH_CONTEXT") && !isolation.includes("ISOLATION_UNVERIFIED") &&
    /^(?:NONE|ALL PRIOR FINDINGS RESOLVED)[.!]?$/i.test(findings) &&
    disposition === "APPROVED" && ["HUMAN_REVIEW", "MERGE_GATE"].includes(next) ? { seat, session, assignedReviewer } : null;
}

function selfReviewReceipt(body, expectedHead) {
  const fields = fieldTable(body, ["Exact candidate revision"]);
  const results = [...String(body ?? "").matchAll(/(?:^|\n)Result:\s*`?(SELF_REVIEW_PASSED|SELF_REVIEW_FAILED)`?\s*$/gim)];
  return fields && normalize(fields.get("Exact candidate revision")) === expectedHead && results.length === 1 && results[0][1].toUpperCase() === "SELF_REVIEW_PASSED";
}

function requestedAuthority(value, expectedHead) {
  const entries = assignments(value, ["STATE", "CANDIDATE", "SCOPE", "RESET TARGET", "RESET MODE"]);
  return entries && entries.get("STATE").toUpperCase() === "PENDING" && entries.get("CANDIDATE") === expectedHead && entries.get("SCOPE") &&
    branch(entries.get("RESET TARGET")) && ["HUMAN_REVIEW_BEFORE_MERGE", "AGENT_AUTO_MERGE"].includes(entries.get("RESET MODE").toUpperCase())
    ? { scope: entries.get("SCOPE"), target: entries.get("RESET TARGET"), mode: entries.get("RESET MODE").toUpperCase() }
    : null;
}

function ownerDecision(body) {
  const keys = ["DECISION", "CANDIDATE", "SCOPE", "RESET TARGET", "RESET MODE"];
  const lines = String(body ?? "").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (lines.length !== 1) return null;
  const entries = assignments(lines[0], keys);
  if (!entries) return null;
  return entries.get("DECISION").toUpperCase() === "APPROVED" && sha(entries.get("CANDIDATE")) && entries.get("SCOPE") && branch(entries.get("RESET TARGET")) &&
    ["HUMAN_REVIEW_BEFORE_MERGE", "AGENT_AUTO_MERGE"].includes(entries.get("RESET MODE").toUpperCase()) ?
    { candidate: entries.get("CANDIDATE"), scope: entries.get("SCOPE"), target: entries.get("RESET TARGET"), mode: entries.get("RESET MODE").toUpperCase() } : null;
}

function resetAuthorization(value, expectedScope, expectedTarget, expectedMode, expectedAuthority) {
  const entries = assignments(value, ["SCOPE", "RESET TARGET", "RESET MODE", "AUTHORITY"]);
  return entries && entries.get("SCOPE") === expectedScope && entries.get("RESET TARGET") === expectedTarget &&
    entries.get("RESET MODE").toUpperCase() === expectedMode && entries.get("AUTHORITY") === expectedAuthority;
}

function splitRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "")
    .split(/(?<!\\)\|/).map(cell => cell.replace(/\\\|/g, "|").trim());
}

function evidenceTable(body, marker) {
  const lines = String(body ?? "").split(/\r?\n/);
  const markerIndex = lines.findIndex(line => line.trim() === marker);
  if (markerIndex < 0 || lines.filter(line => line.trim() === marker).length !== 1) return null;
  return fieldTable(lines.slice(markerIndex + 1).join("\n"), [], 0);
}

const markers = {
  review: "<!-- sdd-pr-review/v1 -->",
  acceptance: "<!-- sdd-pr-acceptance/v1 -->",
  target: "<!-- sdd-target-receipt/v1 -->",
};

const required = {
  review: ["Repository and target", "Design", "Tasks", "Candidate", "Self-review", "Independent review", "Findings", "Requested owner authority", "Checks", "Limits and follow-ups", "Reset plan"],
  acceptance: ["Candidate", "Owner decision", "Merge/reset scope", "Owner comment", "Owner comment body digest", "Review evidence digest"],
  target: ["Merge identity", "Target proof", "Check proof", "Evidence availability", "Runtime/project proof", "Reset authorization", "Exceptions/follow-ups"],
};

function urls(value) {
  return [...String(value ?? "").matchAll(/https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/(?:pull|issues)\/\d+(?:#(?:issuecomment|pullrequestreview|discussion_r)-\d+)?/g)].map(match => match[0]);
}

function bodyObjects(snapshot) {
  return [...snapshot.issueComments, ...snapshot.reviews, ...snapshot.reviewComments];
}

function findEvidence(snapshot, kind, fail) {
  const matches = snapshot.issueComments.filter(comment => String(comment.body).includes(markers[kind]));
  if (matches.length !== 1) {
    fail("EVIDENCE_MARKER_COUNT", kind);
    return null;
  }
  const fields = evidenceTable(matches[0].body, markers[kind]);
  if (!fields) {
    fail("EVIDENCE_TABLE", kind);
    return null;
  }
  for (const field of required[kind]) {
    if (!fields.has(field) || !normalize(fields.get(field))) fail("EVIDENCE_FIELD", `${kind}:${field}`);
  }
  return { ...matches[0], fields };
}

export function evaluatePrEvidence(input) {
  const discrepancies = [];
  const fail = (rule, identity) => discrepancies.push({ rule, ...(identity ? { identity } : {}) });
  if (!input || typeof input !== "object" || input.schemaVersion !== 1 || !["PRE_MERGE", "RESET_READY"].includes(input.mode) ||
      !repo(input.repository) || !Number.isSafeInteger(input.pr) || input.pr < 1 || !sha(input.expectedHead) ||
      !sha(input.expectedBase) || !branch(input.target) ||
      !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(input.owner || "") ||
      !Array.isArray(input.requiredChecks) || input.requiredChecks.some(value => !normalize(value)) ||
      new Set(input.requiredChecks.map(value => normalize(value))).size !== input.requiredChecks.length || !input.snapshot) {
    return { status: "INVALID", exitCode: 2, discrepancies: [{ rule: "INPUT_SCHEMA" }] };
  }
  const snapshot = input.snapshot;
  for (const key of ["issueComments", "reviews", "reviewComments", "checkRuns", "inventoryFiles", "changedFiles"]) {
    if (!Array.isArray(snapshot[key])) fail("SNAPSHOT_SCHEMA", key);
  }
  if (discrepancies.length) return { status: "INVALID", exitCode: 2, discrepancies };
  if (!snapshot.paginationComplete) fail("INCOMPLETE_PAGINATION");
  const pull = snapshot.pull || {};
  if (String(pull.repository).toLowerCase() !== input.repository.toLowerCase() || pull.number !== input.pr || pull.head !== input.expectedHead || pull.base !== input.expectedBase || pull.target !== input.target) fail("PR_IDENTITY");
  if (input.mode === "PRE_MERGE" && pull.state !== "OPEN") fail("PR_NOT_OPEN");
  if (input.mode === "RESET_READY" && (pull.state !== "MERGED" || !sha(pull.mergeSha))) fail("PR_NOT_MERGED");

  const review = findEvidence(snapshot, "review", fail);
  const acceptance = findEvidence(snapshot, "acceptance", fail);
  const target = input.mode === "RESET_READY" ? findEvidence(snapshot, "target", fail) : null;
  if (review && normalize(review.fields.get("Candidate")) !== input.expectedHead) fail("CANDIDATE_BINDING", String(review.id));
  if (acceptance && normalize(acceptance.fields.get("Candidate")) !== input.expectedHead) fail("CANDIDATE_BINDING", String(acceptance.id));
  if ([review, acceptance, target].filter(Boolean).map(item => item.id).length !== new Set([review, acceptance, target].filter(Boolean).map(item => item.id)).size) fail("EVIDENCE_OBJECT_DISTINCT");
  if (review) {
    const binding = String(review.fields.get("Repository and target"));
    if (!binding.toLowerCase().includes(input.repository.toLowerCase()) || !binding.includes(input.target) || !binding.includes(input.expectedBase)) fail("REPOSITORY_BINDING", "review");
    if (/\b(?:OPEN|UNRESOLVED|CHANGES_NEEDED|BLOCKED)\b/i.test(review.fields.get("Findings"))) fail("UNRESOLVED_FINDINGS");
  }
  let selfReviewEvidence = [];
  let authorityRequest = null;
  let reviewedResetPlan = null;
  if (review) {
    const selfReviewUrls = urls(review.fields.get("Self-review"));
    selfReviewEvidence = bodyObjects(snapshot).filter(item => selfReviewUrls.includes(item.url));
    if (selfReviewUrls.length !== 1 || selfReviewEvidence.length !== 1 ||
        !String(review.fields.get("Self-review")).includes(digest(selfReviewEvidence[0]?.body ?? "")) ||
        !selfReviewReceipt(selfReviewEvidence[0]?.body, input.expectedHead)) fail("SELF_REVIEW_EVIDENCE");
    authorityRequest = requestedAuthority(review.fields.get("Requested owner authority"), input.expectedHead);
    if (!authorityRequest || authorityRequest.target !== input.target) fail("OWNER_AUTHORITY_PENDING");
    reviewedResetPlan = resetPlan(review.fields.get("Reset plan"), input.repository, input.expectedHead, snapshot.inventoryFiles, snapshot.changedFiles);
    if (!reviewedResetPlan) fail("RESET_PLAN");
  }
  if (acceptance && review && acceptance.fields.get("Review evidence digest") !== digest(review.body)) fail("REVIEW_DIGEST");
  if (acceptance && normalize(acceptance.fields.get("Owner decision")).toUpperCase() !== "APPROVED") fail("OWNER_DECISION");
  let ownerEvidence = [];
  if (acceptance) {
    const ownerUrls = urls(acceptance.fields.get("Owner comment"));
    ownerEvidence = bodyObjects(snapshot).filter(item => ownerUrls.includes(item.url));
    if (ownerUrls.length !== 1 || ownerEvidence.length !== 1 || [review?.id, acceptance.id, target?.id].includes(ownerEvidence[0]?.id) || acceptance.fields.get("Owner comment body digest") !== digest(ownerEvidence[0]?.body ?? "")) fail("OWNER_EVIDENCE");
    if (ownerEvidence[0]?.author !== input.owner) fail("OWNER_IDENTITY");
    const ownerBody = String(ownerEvidence[0]?.body ?? "");
    const decision = ownerDecision(ownerBody);
    const acceptedScope = normalize(acceptance.fields.get("Merge/reset scope"));
    if (!decision || decision.candidate !== input.expectedHead || !acceptedScope || decision.scope !== acceptedScope ||
        acceptedScope !== authorityRequest?.scope || decision.target !== authorityRequest?.target || decision.mode !== authorityRequest?.mode) fail("OWNER_SCOPE_BINDING");
  }
  let reviewReceipts = [];
  if (review) {
    const receiptUrls = urls(review.fields.get("Independent review"));
    reviewReceipts = bodyObjects(snapshot).filter(item => receiptUrls.includes(item.url));
    const expectedSubject = `https://github.com/${input.repository}/pull/${input.pr}`;
    const parsedReceipts = reviewReceipts.map(item => reviewerReceipt(item.body, input.expectedHead, input.expectedBase, expectedSubject));
    if (new Set(receiptUrls).size !== 2 || reviewReceipts.length !== 2 || reviewReceipts.some(item => [review.id, acceptance?.id, target?.id, ownerEvidence[0]?.id, selfReviewEvidence[0]?.id].includes(item.id)) || parsedReceipts.some(item => !item) || new Set(parsedReceipts.map(item => item?.seat)).size !== 2 || !parsedReceipts.some(item => item?.seat === "R1") || !parsedReceipts.some(item => item?.seat === "R2") || new Set(parsedReceipts.map(item => item?.session)).size !== 1 || new Set(parsedReceipts.map(item => item?.assignedReviewer)).size !== 2 || reviewReceipts.some(item => !String(review.fields.get("Independent review")).includes(digest(item.body)))) {
      fail("INDEPENDENT_REVIEW_EVIDENCE");
    }
  }
  for (const name of input.requiredChecks) {
    const matchingChecks = snapshot.checkRuns.filter(item => item.name === name);
    const check = matchingChecks[0];
    if (matchingChecks.length !== 1 || !check || check.head !== input.expectedHead || check.status !== "completed" || check.conclusion !== "success" || !check.url) fail("REQUIRED_CHECK", name);
    if (review && (!String(review.fields.get("Checks")).includes(name) || !String(review.fields.get("Checks")).includes(check?.url))) fail("CHECK_EVIDENCE_BINDING", name);
    if (target && (!String(target.fields.get("Check proof")).includes(name) || !String(target.fields.get("Check proof")).includes(check?.url))) fail("TARGET_CHECK_BINDING", name);
  }
  if (target) {
    const mergeIdentity = String(target.fields.get("Merge identity"));
    const targetProof = String(target.fields.get("Target proof"));
    if (!sha(pull.mergeSha) || typeof pull.mergedAt !== "string" || !pull.mergedAt || !includesExact(mergeIdentity, pull.mergeSha) || !includesExact(mergeIdentity, input.target) || !includesExact(mergeIdentity, pull.mergedAt) ||
        !includesExact(targetProof, input.expectedHead) || !includesExact(targetProof, pull.mergeSha) || !includesExact(targetProof, pull.targetSha) ||
        !sha(pull.headTree) || !sha(pull.mergeTree) || pull.headTree !== pull.mergeTree || !sha(pull.targetSha) ||
        pull.targetMergeBase !== pull.mergeSha || !["ahead", "identical"].includes(pull.targetCompareStatus)) fail("TARGET_PROOF");
    const acceptedScope = normalize(acceptance?.fields.get("Merge/reset scope"));
    if (!resetAuthorization(target.fields.get("Reset authorization"), acceptedScope, authorityRequest?.target, authorityRequest?.mode, ownerEvidence[0]?.url)) fail("TARGET_RESET_AUTHORIZATION");
    for (const item of [review, acceptance, ...selfReviewEvidence, ...reviewReceipts, ...ownerEvidence, reviewedResetPlan?.inventoryFile]) {
      if (!item || !String(target.fields.get("Evidence availability")).includes(item.url) || !String(target.fields.get("Evidence availability")).includes(digest(item.body))) fail("TARGET_EVIDENCE_AVAILABILITY", item?.id ? String(item.id) : "missing");
    }
  }
  if (discrepancies.length) return { status: "BLOCKED", exitCode: 1, discrepancies };
  return { status: "VERIFIED", exitCode: 0, discrepancies: [], evidence: {
    review: { url: review.url, digest: digest(review.body) },
    acceptance: { url: acceptance.url, digest: digest(acceptance.body) },
    ...(target ? { target: { url: target.url, digest: digest(target.body), mergeSha: pull.mergeSha } } : {}),
  } };
}

async function githubJson(fetchImpl, url, token) {
  const response = await fetchImpl(url, { headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  if (!response.ok) throw new Error(`GitHub request failed with status ${response.status}`);
  return response.json();
}

async function paged(fetchImpl, url, token, property) {
  const result = [];
  for (let page = 1; ; page += 1) {
    const separator = url.includes("?") ? "&" : "?";
    const data = await githubJson(fetchImpl, `${url}${separator}per_page=100&page=${page}`, token);
    const items = property ? data[property] : data;
    if (!Array.isArray(items)) throw new Error("GitHub pagination response is not an array");
    result.push(...items);
    if (items.length < 100) return result;
  }
}

function inventoryLocation(url, repository) {
  const prefix = `https://github.com/${repository}/blob/`;
  if (!String(url ?? "").startsWith(prefix)) return null;
  const remainder = url.slice(prefix.length);
  const separator = remainder.indexOf("/");
  if (separator < 0) return null;
  const revision = remainder.slice(0, separator);
  const file = remainder.slice(separator + 1);
  return sha(revision) && file && !file.split("/").some(part => ["", ".", ".."].includes(part)) ? { revision, file } : null;
}

export async function collectGitHubSnapshot({ repository, pr, credential, fetchImpl = fetch }) {
  const base = `https://api.github.com/repos/${repository}`;
  const pull = await githubJson(fetchImpl, `${base}/pulls/${pr}`, credential);
  const [issueComments, reviews, reviewComments, changedFiles, checkRuns, headCommit, mergeCommit] = await Promise.all([
    paged(fetchImpl, `${base}/issues/${pr}/comments`, credential),
    paged(fetchImpl, `${base}/pulls/${pr}/reviews`, credential),
    paged(fetchImpl, `${base}/pulls/${pr}/comments`, credential),
    paged(fetchImpl, `${base}/pulls/${pr}/files`, credential),
    paged(fetchImpl, `${base}/commits/${pull.head.sha}/check-runs`, credential, "check_runs"),
    githubJson(fetchImpl, `${base}/git/commits/${pull.head.sha}`, credential),
    pull.merged_at && pull.merge_commit_sha ? githubJson(fetchImpl, `${base}/git/commits/${pull.merge_commit_sha}`, credential) : Promise.resolve(null),
  ]);
  const comment = item => ({ id: item.id, url: item.html_url, author: item.user?.login, body: item.body ?? "" });
  const normalizedIssueComments = issueComments.map(comment);
  const reviewEvidence = normalizedIssueComments.find(item => String(item.body).includes(markers.review));
  const reviewFields = reviewEvidence ? evidenceTable(reviewEvidence.body, markers.review) : null;
  const planEntries = reviewFields ? assignments(reviewFields.get("Reset plan"), ["REMOVE", "RESET", "KEEP", "INVENTORY"]) : null;
  const location = planEntries ? inventoryLocation(planEntries.get("INVENTORY"), repository) : null;
  const inventoryFiles = [];
  if (location) {
    const encodedPath = location.file.split("/").map(encodeURIComponent).join("/");
    const file = await githubJson(fetchImpl, `${base}/contents/${encodedPath}?ref=${location.revision}`, credential);
    if (file.type !== "file" || file.encoding !== "base64" || typeof file.content !== "string") throw new Error("GitHub inventory response is not a base64 file");
    inventoryFiles.push({ url: planEntries.get("INVENTORY"), body: Buffer.from(file.content.replace(/\s/g, ""), "base64").toString("utf8") });
  }
  let targetRef = null;
  let targetComparison = null;
  if (pull.merged_at && pull.merge_commit_sha) {
    const targetPath = pull.base.ref.split("/").map(encodeURIComponent).join("/");
    targetRef = await githubJson(fetchImpl, `${base}/git/ref/heads/${targetPath}`, credential);
    if (sha(targetRef?.object?.sha)) {
      targetComparison = await githubJson(fetchImpl, `${base}/compare/${pull.merge_commit_sha}...${targetRef.object.sha}`, credential);
    }
  }
  return {
    pull: { repository: repository.toLowerCase(), number: pull.number, head: pull.head.sha, base: pull.base.sha, target: pull.base.ref, headTree: headCommit.tree?.sha, mergeTree: mergeCommit?.tree?.sha ?? null, state: pull.merged_at ? "MERGED" : String(pull.state).toUpperCase(), mergeSha: pull.merge_commit_sha, mergedAt: pull.merged_at, targetSha: targetRef?.object?.sha ?? null, targetMergeBase: targetComparison?.merge_base_commit?.sha ?? null, targetCompareStatus: targetComparison?.status ?? null },
    issueComments: normalizedIssueComments,
    reviews: reviews.map(comment),
    reviewComments: reviewComments.map(comment),
    changedFiles: changedFiles.map(item => item.filename),
    checkRuns: checkRuns.map(item => ({ name: item.name, head: item.head_sha, status: item.status, conclusion: item.conclusion, url: item.html_url })),
    inventoryFiles,
    paginationComplete: true,
  };
}

function argumentsFrom(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    if (!argv[index]?.startsWith("--") || argv[index + 1] === undefined) return null;
    values[argv[index].slice(2)] = argv[index + 1];
  }
  const parsed = { mode: values.mode, repository: values.repository, pr: Number(values.pr), expectedHead: values.head, expectedBase: values.base, target: values.target, owner: values.owner, requiredChecks: values.checks ? values.checks.split(",").map(value => value.trim()).filter(Boolean) : [] };
  return ["PRE_MERGE", "RESET_READY"].includes(parsed.mode) && repo(parsed.repository) && Number.isSafeInteger(parsed.pr) && parsed.pr > 0 && sha(parsed.expectedHead) && sha(parsed.expectedBase) && branch(parsed.target) && /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(parsed.owner || "") ? parsed : null;
}

async function main() {
  const input = argumentsFrom(process.argv.slice(2));
  if (!input) {
    process.stderr.write("usage: verify-pr-evidence --mode PRE_MERGE|RESET_READY --repository owner/repo --pr N --head SHA --base SHA --target branch [--checks name,name] [--owner login]\n");
    process.exitCode = 2;
    return;
  }
  try {
    const snapshot = await collectGitHubSnapshot({ repository: input.repository, pr: input.pr, credential: process.env.GITHUB_TOKEN });
    const result = evaluatePrEvidence({ schemaVersion: 1, ...input, snapshot });
    process.stdout.write(`${JSON.stringify(result)}\n`);
    process.exitCode = result.exitCode;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
