#!/usr/bin/env node

import { createHash } from "node:crypto";
import process from "node:process";
import { pathToFileURL } from "node:url";

const sha = value => typeof value === "string" && /^[a-f0-9]{40}$/.test(value);
const repo = value => typeof value === "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value);
const branch = value => typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value) && !value.includes("..") && !value.includes("//") && !value.includes("@{");
const digest = body => `sha256:${createHash("sha256").update(body).digest("hex")}`;
const normalize = value => String(value ?? "").trim().replace(/^`|`$/g, "");

function splitRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "")
    .split(/(?<!\\)\|/).map(cell => cell.replace(/\\\|/g, "|").trim());
}

function evidenceTable(body, marker) {
  const lines = String(body ?? "").split(/\r?\n/);
  const markerIndex = lines.findIndex(line => line.trim() === marker);
  if (markerIndex < 0 || lines.filter(line => line.trim() === marker).length !== 1) return null;
  for (let index = markerIndex + 1; index < lines.length - 1; index += 1) {
    if (!/^\s*\|/.test(lines[index]) || !/^\s*\|/.test(lines[index + 1])) continue;
    const headers = splitRow(lines[index]);
    const separator = splitRow(lines[index + 1]);
    if (headers.length !== 2 || separator.length !== 2 || !separator.every(cell => /^:?-{3,}:?$/.test(cell))) continue;
    const fields = new Map();
    for (let cursor = index + 2; cursor < lines.length && /^\s*\|/.test(lines[cursor]); cursor += 1) {
      const cells = splitRow(lines[cursor]);
      if (cells.length !== 2 || fields.has(normalize(cells[0]))) return null;
      fields.set(normalize(cells[0]), normalize(cells[1]));
    }
    if (fields.size) return fields;
  }
  return null;
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
      (input.owner !== undefined && input.owner !== "" && !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(input.owner)) ||
      !Array.isArray(input.requiredChecks) || input.requiredChecks.some(value => !normalize(value)) ||
      new Set(input.requiredChecks.map(value => normalize(value))).size !== input.requiredChecks.length || !input.snapshot) {
    return { status: "INVALID", exitCode: 2, discrepancies: [{ rule: "INPUT_SCHEMA" }] };
  }
  const snapshot = input.snapshot;
  for (const key of ["issueComments", "reviews", "reviewComments", "checkRuns"]) {
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
    if (!String(review.fields.get("Self-review")).includes(input.expectedHead) || !/\b(?:PASS|PASSED)\b/i.test(review.fields.get("Self-review"))) fail("SELF_REVIEW_EVIDENCE");
    if (normalize(review.fields.get("Requested owner authority")).toUpperCase() !== "PENDING") fail("OWNER_AUTHORITY_PENDING");
    if (/\b(?:OPEN|UNRESOLVED|CHANGES_NEEDED|BLOCKED)\b/i.test(review.fields.get("Findings"))) fail("UNRESOLVED_FINDINGS");
  }
  if (acceptance && review && acceptance.fields.get("Review evidence digest") !== digest(review.body)) fail("REVIEW_DIGEST");
  if (acceptance && normalize(acceptance.fields.get("Owner decision")).toUpperCase() !== "APPROVED") fail("OWNER_DECISION");
  let ownerEvidence = [];
  if (acceptance) {
    const ownerUrls = urls(acceptance.fields.get("Owner comment"));
    ownerEvidence = bodyObjects(snapshot).filter(item => ownerUrls.includes(item.url));
    if (ownerUrls.length !== 1 || ownerEvidence.length !== 1 || [review?.id, acceptance.id, target?.id].includes(ownerEvidence[0]?.id) || acceptance.fields.get("Owner comment body digest") !== digest(ownerEvidence[0]?.body ?? "")) fail("OWNER_EVIDENCE");
    if (input.owner && ownerEvidence[0]?.author !== input.owner) fail("OWNER_IDENTITY");
  }
  let reviewReceipts = [];
  if (review) {
    const receiptUrls = urls(review.fields.get("Independent review"));
    reviewReceipts = bodyObjects(snapshot).filter(item => receiptUrls.includes(item.url));
    if (new Set(receiptUrls).size !== 2 || reviewReceipts.length !== 2 || reviewReceipts.some(item => [review.id, acceptance?.id, target?.id, ownerEvidence[0]?.id].includes(item.id)) || reviewReceipts.some(item => !String(item.body).includes(input.expectedHead) || !/Disposition:\s*(?:PASS|APPROVED)\b/i.test(item.body)) || reviewReceipts.some(item => !String(review.fields.get("Independent review")).includes(digest(item.body)))) {
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
    if (!String(target.fields.get("Merge identity")).includes(pull.mergeSha) || !String(target.fields.get("Merge identity")).includes(input.target) || !String(target.fields.get("Target proof")).includes(input.expectedHead) || !sha(pull.headTree) || !sha(pull.mergeTree) || pull.headTree !== pull.mergeTree) fail("TARGET_PROOF");
    for (const item of [review, acceptance, ...reviewReceipts, ...ownerEvidence]) {
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

export async function collectGitHubSnapshot({ repository, pr, credential, fetchImpl = fetch }) {
  const base = `https://api.github.com/repos/${repository}`;
  const pull = await githubJson(fetchImpl, `${base}/pulls/${pr}`, credential);
  const [issueComments, reviews, reviewComments, checkRuns, headCommit, mergeCommit] = await Promise.all([
    paged(fetchImpl, `${base}/issues/${pr}/comments`, credential),
    paged(fetchImpl, `${base}/pulls/${pr}/reviews`, credential),
    paged(fetchImpl, `${base}/pulls/${pr}/comments`, credential),
    paged(fetchImpl, `${base}/commits/${pull.head.sha}/check-runs`, credential, "check_runs"),
    githubJson(fetchImpl, `${base}/git/commits/${pull.head.sha}`, credential),
    pull.merged_at && pull.merge_commit_sha ? githubJson(fetchImpl, `${base}/git/commits/${pull.merge_commit_sha}`, credential) : Promise.resolve(null),
  ]);
  const comment = item => ({ id: item.id, url: item.html_url, author: item.user?.login, body: item.body ?? "" });
  return {
    pull: { repository: repository.toLowerCase(), number: pull.number, head: pull.head.sha, base: pull.base.sha, target: pull.base.ref, headTree: headCommit.tree?.sha, mergeTree: mergeCommit?.tree?.sha ?? null, state: pull.merged_at ? "MERGED" : String(pull.state).toUpperCase(), mergeSha: pull.merge_commit_sha },
    issueComments: issueComments.map(comment),
    reviews: reviews.map(comment),
    reviewComments: reviewComments.map(comment),
    checkRuns: checkRuns.map(item => ({ name: item.name, head: item.head_sha, status: item.status, conclusion: item.conclusion, url: item.html_url })),
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
  return ["PRE_MERGE", "RESET_READY"].includes(parsed.mode) && repo(parsed.repository) && Number.isSafeInteger(parsed.pr) && parsed.pr > 0 && sha(parsed.expectedHead) && sha(parsed.expectedBase) && branch(parsed.target) ? parsed : null;
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
