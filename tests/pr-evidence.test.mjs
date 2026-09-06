import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import { collectGitHubSnapshot, evaluatePrEvidence } from "../scripts/verify-pr-evidence.mjs";

const sha256 = body => `sha256:${createHash("sha256").update(body).digest("hex")}`;
const head = "a".repeat(40);
const merge = "b".repeat(40);
const base = "c".repeat(40);
const tree = "d".repeat(40);
const target = "e".repeat(40);
const mergedAt = "2026-01-01T00:00:00Z";
const checkUrl = "https://github.com/example/project/actions/runs/1";
const baseUrl = "https://github.com/example/project/pull/7";
const acceptedScope = "Merge PR 7 and reset only its accepted inventory";
const comment = (id, body, author = "owner") => ({ id, url: `${baseUrl}#issuecomment-${id}`, author, body });
const review = (id, body, author) => ({ id, url: `${baseUrl}#pullrequestreview-${id}`, author, body });
const table = (marker, rows) => `${marker}\n\n| Field | Value |\n| --- | --- |\n${rows.map(([key, value]) => `| ${key} | ${value} |`).join("\n")}`;

function fixture(mode = "PRE_MERGE") {
  const r1 = review(11, `Reviewer seat: R1\nReview session: S01\nCandidate: ${head}\nDisposition: APPROVED`, "agent-r1");
  const r2 = review(12, `Reviewer seat: R2\nReview session: S01\nCandidate: ${head}\nDisposition: APPROVED`, "agent-r2");
  const owner = comment(20, `I APPROVE ${head}. Scope: ${acceptedScope}`);
  const reviewBody = table("<!-- sdd-pr-review/v1 -->", [
    ["Repository and target", `example/project / main / ${base}`],
    ["Design", "Accepted design and risks"],
    ["Tasks", "T01: implement feature"],
    ["Candidate", head],
    ["Self-review", `PASSED ${head}`],
    ["Independent review", `${r1.url} ${sha256(r1.body)}; ${r2.url} ${sha256(r2.body)}`],
    ["Findings", "None"],
    ["Requested owner authority", "PENDING"],
    ["Checks", `docs / success / ${checkUrl}`],
    ["Limits and follow-ups", "None"],
    ["Reset plan", `REMOVE=delivery.md; RESET=runtime; KEEP=policy.md; Inventory=https://github.com/example/project/blob/${head}/reset.md`],
  ]);
  const reviewComment = comment(21, reviewBody, "publisher");
  const acceptanceBody = table("<!-- sdd-pr-acceptance/v1 -->", [
    ["Candidate", head],
    ["Owner decision", "APPROVED"],
    ["Merge/reset scope", acceptedScope],
    ["Owner comment", owner.url],
    ["Owner comment body digest", sha256(owner.body)],
    ["Review evidence digest", sha256(reviewBody)],
  ]);
  const acceptance = comment(22, acceptanceBody, "publisher");
  const targetBody = table("<!-- sdd-target-receipt/v1 -->", [
    ["Merge identity", `${merge} / main / ${mergedAt}`],
    ["Target proof", `head ${head}; merge ${merge}; target ${target}; merge is target ancestor and tree matches`],
    ["Check proof", `docs / success / ${checkUrl}`],
    ["Evidence availability", [reviewComment, acceptance, r1, r2, owner].map(item => `${item.url} ${sha256(item.body)}`).join("; ")],
    ["Runtime/project proof", "CURRENT"],
    ["Reset authorization", "Enumerated reset PR may be prepared"],
    ["Exceptions/follow-ups", "None"],
  ]);
  return {
    schemaVersion: 1,
    mode,
    repository: "example/project",
    pr: 7,
    expectedHead: head,
    expectedBase: base,
    target: "main",
    owner: "owner",
    requiredChecks: ["docs"],
    snapshot: {
      pull: { repository: "example/project", number: 7, head, base, target: "main", headTree: tree, mergeTree: mode === "RESET_READY" ? tree : null, state: mode === "RESET_READY" ? "MERGED" : "OPEN", mergeSha: mode === "RESET_READY" ? merge : null, mergedAt: mode === "RESET_READY" ? mergedAt : null, targetSha: mode === "RESET_READY" ? target : null, targetMergeBase: mode === "RESET_READY" ? merge : null, targetCompareStatus: mode === "RESET_READY" ? "ahead" : null },
      issueComments: [owner, reviewComment, acceptance, ...(mode === "RESET_READY" ? [comment(23, targetBody, "publisher")] : [])],
      reviews: [r1, r2],
      reviewComments: [],
      checkRuns: [{ name: "docs", head, status: "completed", conclusion: "success", url: checkUrl }],
      paginationComplete: true,
    },
  };
}

test("pre-merge evidence verifies exact candidate, owner decision, reviews and checks", () => {
  assert.equal(evaluatePrEvidence(fixture()).status, "VERIFIED");
});

test("reset readiness additionally verifies merge, target receipt and evidence availability", () => {
  const result = evaluatePrEvidence(fixture("RESET_READY"));
  assert.equal(result.status, "VERIFIED", JSON.stringify(result));
  assert.equal(result.evidence.target.mergeSha, merge);
});

test("missing, duplicate, mutated or inaccessible evidence blocks reset", () => {
  for (const mutate of [
    data => { data.snapshot.issueComments = data.snapshot.issueComments.filter(item => !item.body.includes("sdd-pr-acceptance")); },
    data => { data.snapshot.issueComments.push(structuredClone(data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")))); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body += " edited"; },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body += "\n<!-- sdd-pr-review/v1 -->"; },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body += `\n| Candidate | ${head} |`; },
    data => { data.snapshot.paginationComplete = false; },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-target-receipt")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-target-receipt")).body.replace(data.snapshot.reviews[0].url, "missing-review-url"); },
    data => { data.snapshot.pull.mergeTree = "e".repeat(40); },
    data => { data.snapshot.pull.targetMergeBase = "f".repeat(40); },
    data => { data.snapshot.pull.targetCompareStatus = "diverged"; },
    data => { data.snapshot.pull.targetSha = "f".repeat(40); },
  ]) {
    const data = fixture("RESET_READY");
    mutate(data);
    assert.equal(evaluatePrEvidence(data).status, "BLOCKED");
  }
});

test("head, repository, owner and required-check mismatches fail closed", () => {
  for (const mutate of [
    data => { data.snapshot.pull.head = "c".repeat(40); },
    data => { data.snapshot.pull.base = "e".repeat(40); },
    data => { data.snapshot.pull.target = "release"; },
    data => { data.snapshot.pull.repository = "wrong/project"; },
    data => { data.snapshot.issueComments[0].author = "not-owner"; },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-acceptance")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-acceptance")).body.replace("APPROVED", "REJECTED"); },
    data => { data.snapshot.reviews[0].body = data.snapshot.reviews[0].body.replace("Disposition: APPROVED", "Disposition: CHANGES_NEEDED"); },
    data => { data.snapshot.reviews[1].body = data.snapshot.reviews[1].body.replace("Reviewer seat: R2", "Reviewer seat: R1"); },
    data => { data.snapshot.issueComments[0].body = "Approved in general"; },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace(/REMOVE=.*Inventory=[^|]+/, "REMOVE=x; RESET=x; KEEP=x; Inventory=x"); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace("| Findings | None |", "| Findings | F01 OPEN |"); },
    data => { data.snapshot.checkRuns[0].conclusion = "failure"; },
    data => { data.snapshot.checkRuns[0].head = "c".repeat(40); },
    data => { data.snapshot.checkRuns.push(structuredClone(data.snapshot.checkRuns[0])); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace(checkUrl, "https://github.com/example/project/actions/runs/2"); },
  ]) {
    const data = fixture();
    mutate(data);
    assert.equal(evaluatePrEvidence(data).status, "BLOCKED");
  }
});

test("malformed input is invalid and never exposes input bodies", () => {
  const result = evaluatePrEvidence({ secret: "do-not-echo" });
  assert.equal(result.status, "INVALID");
  assert.ok(!JSON.stringify(result).includes("do-not-echo"));
});

test("GitHub collector uses read-only paginated endpoints and normalizes evidence", async () => {
  const calls = [];
  const fetchImpl = async url => {
    calls.push(url);
    const json = url.endsWith("/pulls/7")
      ? { number: 7, state: "open", merged_at: null, merge_commit_sha: null, head: { sha: head }, base: { sha: base, ref: "main" } }
      : url.endsWith(`/git/commits/${head}`) ? { tree: { sha: tree } }
      : url.includes("check-runs") ? { check_runs: [] } : [];
    return { ok: true, json: async () => json };
  };
  const snapshot = await collectGitHubSnapshot({ repository: "example/project", pr: 7, fetchImpl });
  assert.equal(snapshot.pull.head, head);
  assert.equal(snapshot.pull.base, base);
  assert.equal(snapshot.pull.target, "main");
  assert.equal(snapshot.pull.headTree, tree);
  assert.equal(snapshot.paginationComplete, true);
  assert.equal(calls.length, 6);
  assert.ok(calls.every(url => url.startsWith("https://api.github.com/repos/example/project/")));
});

test("GitHub collector retrieves the merged and reviewed tree identities", async () => {
  const calls = [];
  const fetchImpl = async url => {
    calls.push(url);
    const json = url.endsWith("/pulls/7")
      ? { number: 7, state: "closed", merged_at: mergedAt, merge_commit_sha: merge, head: { sha: head }, base: { sha: base, ref: "main" } }
      : url.endsWith(`/git/commits/${head}`) || url.endsWith(`/git/commits/${merge}`) ? { tree: { sha: tree } }
      : url.endsWith("/git/ref/heads/main") ? { object: { sha: target } }
      : url.endsWith(`/compare/${merge}...${target}`) ? { status: "ahead", merge_base_commit: { sha: merge } }
      : url.includes("check-runs") ? { check_runs: [] } : [];
    return { ok: true, json: async () => json };
  };
  const snapshot = await collectGitHubSnapshot({ repository: "example/project", pr: 7, fetchImpl });
  assert.equal(snapshot.pull.state, "MERGED");
  assert.equal(snapshot.pull.mergeSha, merge);
  assert.equal(snapshot.pull.headTree, tree);
  assert.equal(snapshot.pull.mergeTree, tree);
  assert.equal(snapshot.pull.targetSha, target);
  assert.equal(snapshot.pull.targetMergeBase, merge);
  assert.equal(snapshot.pull.targetCompareStatus, "ahead");
  assert.equal(calls.length, 9);
});
