import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";
import process from "node:process";

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
const inventoryUrl = `https://github.com/example/project/blob/${head}/reset.md`;
const resetTarget = "main";
const resetMode = "HUMAN_REVIEW_BEFORE_MERGE";
const inventoryBody = `# Reset inventory

| Item ID | Kind | Exact identity | Ownership evidence | Disposition | Reuse reason | Authorized operation | State |
| --- | --- | --- | --- | --- | --- | --- | --- |
| delivery | FILE | delivery.md | Git tracked | REMOVE | None | Delete in reset PR | PLANNED |
| runtime | RUNTIME | /srv/project/runtime | marker=/srv/project/runtime | RESET | None | Action=RESET; Target=/srv/project/runtime | PLANNED |
| policy | FILE | policy.md | Git tracked | KEEP | Reused policy | None | PLANNED |`;
const comment = (id, body, author = "owner") => ({ id, url: `${baseUrl}#issuecomment-${id}`, author, body });
const review = (id, body, author) => ({ id, url: `${baseUrl}#pullrequestreview-${id}`, author, body });
const table = (marker, rows) => `${marker}\n\n| Field | Value |\n| --- | --- |\n${rows.map(([key, value]) => `| ${key} | ${value} |`).join("\n")}`;
const receipt = (seat, disposition = "APPROVED", candidate = head, session = "S01") => table("### Section 6 review receipt", [
  ["Review session ID", session],
  ["Review round", "R01"],
  ["Reviewer seat", seat],
  ["Assigned reviewer ID", `agent-${seat.toLowerCase()}`],
  ["Reviewer agent/runtime", "isolated reviewer"],
  ["Context isolation", "FRESH_CONTEXT"],
  ["Subject", baseUrl],
  ["Reviewed candidate revision", candidate],
  ["Reviewed base revision", base],
  ["Governing inputs inspected", "Accepted design"],
  ["Gates/evidence inspected", "Required checks"],
  ["Summary comment", "No finding"],
  ["Inline comments", "None"],
  ["Durable findings", "None"],
  ["Disposition", disposition],
  ["Recommended next action", "HUMAN_REVIEW"],
  ["Reviewed at", "2026-01-01 UTC"],
]);

function fixture(mode = "PRE_MERGE") {
  const r1 = review(11, receipt("R1"), "agent-r1");
  const r2 = review(12, receipt("R2"), "agent-r2");
  const selfReview = comment(19, `${table("### Agent self-review", [
    ["Subject", baseUrl],
    ["Exact candidate revision", head],
    ["Governing inputs", "Accepted design"],
    ["Allowed scope", "Reviewed change"],
    ["Required gates", "docs"],
    ["Reviewing agent", "author"],
    ["Reviewed at", "2026-01-01 UTC"],
  ])}\n\nResult: SELF_REVIEW_PASSED`, "publisher");
  const owner = comment(20, `Decision=APPROVED; Candidate=${head}; Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}`);
  const reviewBody = table("<!-- sdd-pr-review/v1 -->", [
    ["Repository and target", `example/project / main / ${base}`],
    ["Design", "Accepted design and risks"],
    ["Tasks", "T01: implement feature"],
    ["Candidate", head],
    ["Self-review", `${selfReview.url} ${sha256(selfReview.body)}`],
    ["Independent review", `${r1.url} ${sha256(r1.body)}; ${r2.url} ${sha256(r2.body)}`],
    ["Findings", "None"],
    ["Requested owner authority", `State=PENDING; Candidate=${head}; Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}`],
    ["Checks", `docs / success / ${checkUrl}`],
    ["Limits and follow-ups", "None"],
    ["Reset plan", `REMOVE=delivery.md; RESET=/srv/project/runtime; KEEP=policy.md; Inventory=${inventoryUrl}`],
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
    ["Evidence availability", [...[reviewComment, acceptance, selfReview, r1, r2, owner].map(item => `${item.url} ${sha256(item.body)}`), `${inventoryUrl} ${sha256(inventoryBody)}`].join("; ")],
    ["Runtime/project proof", "CURRENT"],
    ["Reset authorization", `Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}; Authority=${owner.url}`],
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
      issueComments: [owner, selfReview, reviewComment, acceptance, ...(mode === "RESET_READY" ? [comment(23, targetBody, "publisher")] : [])],
      reviews: [r1, r2],
      reviewComments: [],
      changedFiles: ["delivery.md", "policy.md"],
      checkRuns: [{ name: "docs", head, status: "completed", conclusion: "success", url: checkUrl }],
      inventoryFiles: [{ url: inventoryUrl, body: inventoryBody }],
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
    data => { data.snapshot.reviews[0].body = data.snapshot.reviews[0].body.replace("| Disposition | APPROVED |", "| Disposition | CHANGES_REQUESTED |"); },
    data => { data.snapshot.reviews[1].body = data.snapshot.reviews[1].body.replace("| Reviewer seat | R2 |", "| Reviewer seat | R1 |"); },
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

test("owner evidence requires a trusted identity and unambiguous affirmative decision", () => {
  const omitted = fixture();
  omitted.owner = "";
  assert.equal(evaluatePrEvidence(omitted).status, "INVALID");
  for (const body of [
    `I do not APPROVE ${head}. Scope: ${acceptedScope}`,
    `NOT APPROVED ${head}. Scope: ${acceptedScope}`,
    `I REJECT ${head}. Scope: ${acceptedScope}`,
    `APPROVED? No. ${head}. Scope: ${acceptedScope}`,
    `I previously APPROVED ${head}, but withdraw that decision. Scope: ${acceptedScope}`,
    `This candidate is not yet APPROVED. ${head}. Scope: ${acceptedScope}`,
    `Approval remains pending; APPROVED may follow. ${head}. Scope: ${acceptedScope}`,
    `If checks pass, I will APPROVE ${head}. Scope: ${acceptedScope}`,
    `Decision=APPROVED; Candidate=${head}; Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}\nI withdraw this approval.`,
    `Use this later:\nDecision=APPROVED; Candidate=${head}; Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}`,
    `Decision=APPROVED; Candidate=${head}; Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}\nDo not act on this.`,
    `Decision=APPROVED; Candidate=${head}; Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}\nI revoke this decision.`,
    `Decision=APPROVED; Candidate=${head}; Scope=${acceptedScope}; Reset target=${resetTarget}; Reset mode=${resetMode}\nI rescind this decision.`,
  ]) {
    const data = fixture();
    data.snapshot.issueComments[0].body = body;
    assert.equal(evaluatePrEvidence(data).status, "BLOCKED");
  }
});

test("canonical reviewer receipts reject contradictory or duplicate machine fields", () => {
  for (const mutate of [
    data => { data.snapshot.reviews[0].body += "\nDisposition: APPROVED"; },
    data => { data.snapshot.reviews[0].body += `\n\n${receipt("R1")}`; },
    data => { data.snapshot.reviews[0].body = data.snapshot.reviews[0].body.replace(head, "f".repeat(40)); },
    data => { data.snapshot.reviews[1].body = data.snapshot.reviews[1].body.replace("| Review session ID | S01 |", "| Review session ID | S02 |"); },
    data => { data.snapshot.reviews[0].body = table("### Section 6 review receipt", [["Review session ID", "S01"], ["Reviewer seat", "R1"], ["Reviewed candidate revision", head], ["Disposition", "APPROVED"]]); },
    data => { data.snapshot.reviews[0].body = data.snapshot.reviews[0].body.replace("| Context isolation | FRESH_CONTEXT |", "| Context isolation | ISOLATION_UNVERIFIED |"); },
    data => { data.snapshot.reviews[0].body = data.snapshot.reviews[0].body.replace("| Durable findings | None |", "| Durable findings | F01 OPEN |"); },
    data => { data.snapshot.reviews[0].body = data.snapshot.reviews[0].body.replace("| Durable findings | None |", "| Durable findings | F01 needs correction |"); },
    data => { data.snapshot.reviews[1].body = data.snapshot.reviews[1].body.replace("agent-r2", "agent-r1"); },
  ]) {
    const data = fixture();
    mutate(data);
    assert.equal(evaluatePrEvidence(data).status, "BLOCKED");
  }
});

test("self-review and pending authority are exact-content bindings", () => {
  for (const mutate of [
    data => { data.snapshot.issueComments.find(item => item.id === 19).body += "\nmutated"; },
    data => { data.snapshot.issueComments.find(item => item.id === 19).body = data.snapshot.issueComments.find(item => item.id === 19).body.replace("SELF_REVIEW_PASSED", "SELF_REVIEW_FAILED"); },
    data => { data.snapshot.issueComments.find(item => item.id === 19).body = data.snapshot.issueComments.find(item => item.id === 19).body.replace(head, "f".repeat(40)); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace("State=PENDING", "State=APPROVED"); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace(`Candidate=${head}`, `Candidate=${"f".repeat(40)}`); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace(`Scope=${acceptedScope}`, "Scope=Different scope"); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace("Reset target=main", "Reset target=release"); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace("Reset mode=HUMAN_REVIEW_BEFORE_MERGE", "Reset mode=UNKNOWN"); },
    data => { data.snapshot.issueComments[0].body = data.snapshot.issueComments[0].body.replace("Reset target=main", "Reset target=release"); },
    data => { data.snapshot.issueComments[0].body = data.snapshot.issueComments[0].body.replace("Reset mode=HUMAN_REVIEW_BEFORE_MERGE", "Reset mode=AGENT_AUTO_MERGE"); },
  ]) {
    const data = fixture();
    mutate(data);
    assert.equal(evaluatePrEvidence(data).status, "BLOCKED");
  }
});

test("reset plan is bound to retrievable exact-head inventory content", () => {
  for (const mutate of [
    data => { data.snapshot.inventoryFiles = []; },
    data => { data.snapshot.inventoryFiles[0].body = "# Unrelated file"; },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("| delivery | FILE | delivery.md", "| delivery | FILE | other.md"); },
    data => { data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review")).body.replace("REMOVE=delivery.md", "REMOVE=other.md"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace(" | Ownership evidence", ""); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("| delivery | FILE", "| delivery | UNKNOWN"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("| runtime | RUNTIME", "| delivery | RUNTIME"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("| Git tracked | REMOVE", "| None | REMOVE"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("| policy.md | Git tracked | KEEP | Reused policy | None | PLANNED |", "| policy.md | Git tracked | KEEP | None | None | PLANNED |"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("| delivery.md | Git tracked | REMOVE | None | Delete in reset PR | PLANNED |", "| delivery.md | Git tracked | REMOVE | None | None | PLANNED |"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replaceAll("PLANNED", "UNKNOWN"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("Action=RESET; Target=/srv/project/runtime", "Action=RESET; Target=/srv/project/runtime/only-child"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("Action=RESET; Target=/srv/project/runtime", "Action=DELETE; Target=/srv/project/runtime/../../etc"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("Action=RESET; Target=/srv/project/runtime", "Action=RESET; Target=/srv/project/runtime; Extra=/etc"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("Action=RESET; Target=/srv/project/runtime", "Action=RESET; Target=//etc"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("Action=RESET; Target=/srv/project/runtime", "Action=RESET; Target=delete(/etc)"); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("Action=RESET; Target=/srv/project/runtime", `Action=RESET; Target=file:${"/".repeat(3)}etc/passwd`); },
    data => { data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replace("Action=RESET; Target=/srv/project/runtime", "Action=CALL; Target=https:example.com"); },
    data => { data.snapshot.changedFiles.push("unclassified.md"); },
  ]) {
    const data = fixture();
    mutate(data);
    assert.equal(evaluatePrEvidence(data).status, "BLOCKED");
  }
});

test("reset inventory accepts a runtime checkout with its exact child ownership marker", () => {
  const runtime = path.join(os.tmpdir(), "sdd-playbook.test", "repository");
  const data = fixture();
  data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body
    .replaceAll("/srv/project/runtime", runtime)
    .replace(`marker=${runtime}`, `marker ${runtime}/.sdd-owned-checkout and generated guide`);
  const evidence = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review"));
  evidence.body = evidence.body.replace("RESET=/srv/project/runtime", `RESET=${runtime}`);
  const acceptance = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-acceptance"));
  acceptance.body = acceptance.body.replace(/(\| Review evidence digest \| )sha256:[a-f0-9]{64}/, `$1${sha256(evidence.body)}`);
  assert.equal(evaluatePrEvidence(data).status, "VERIFIED");
});

test("reset inventory rejects repository and temporary parent targets", () => {
  const candidates = [
    process.cwd(),
    path.dirname(process.cwd()),
    path.dirname(os.tmpdir()),
    path.dirname(path.dirname(os.tmpdir())),
  ];
  for (const candidate of candidates) {
    const data = fixture();
    data.snapshot.inventoryFiles[0].body = data.snapshot.inventoryFiles[0].body.replaceAll("/srv/project/runtime", candidate);
    const evidence = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-review"));
    evidence.body = evidence.body.replace("RESET=/srv/project/runtime", `RESET=${candidate}`);
    const acceptance = data.snapshot.issueComments.find(item => item.body.includes("sdd-pr-acceptance"));
    acceptance.body = acceptance.body.replace(/(\| Review evidence digest \| )sha256:[a-f0-9]{64}/, `$1${sha256(evidence.body)}`);
    assert.equal(evaluatePrEvidence(data).status, "BLOCKED", candidate);
  }
});

test("target receipt reset authorization binds scope, target, mode and owner authority", () => {
  for (const replacement of [
    "None",
    `Scope=Different; Reset target=main; Reset mode=HUMAN_REVIEW_BEFORE_MERGE; Authority=${baseUrl}#issuecomment-20`,
    `Scope=${acceptedScope}; Reset target=release; Reset mode=HUMAN_REVIEW_BEFORE_MERGE; Authority=${baseUrl}#issuecomment-20`,
    `Scope=${acceptedScope}; Reset target=main; Reset mode=UNKNOWN; Authority=${baseUrl}#issuecomment-20`,
    `Scope=${acceptedScope}; Reset target=main; Reset mode=AGENT_AUTO_MERGE; Authority=${baseUrl}#issuecomment-20`,
    `Scope=${acceptedScope}; Reset target=main; Reset mode=HUMAN_REVIEW_BEFORE_MERGE; Authority=${baseUrl}#issuecomment-99`,
  ]) {
    const data = fixture("RESET_READY");
    const targetReceipt = data.snapshot.issueComments.find(item => item.body.includes("sdd-target-receipt"));
    targetReceipt.body = targetReceipt.body.replace(/\| Reset authorization \|.*\|/, `| Reset authorization | ${replacement} |`);
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
  assert.deepEqual(snapshot.changedFiles, []);
  assert.equal(calls.length, 7);
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
  assert.equal(calls.length, 10);
});

test("GitHub collector retrieves the immutable reset inventory body", async () => {
  const calls = [];
  const reviewBody = table("<!-- sdd-pr-review/v1 -->", [
    ["Reset plan", `REMOVE=delivery.md; RESET=/srv/project/runtime; KEEP=policy.md; Inventory=${inventoryUrl}`],
  ]);
  const fetchImpl = async url => {
    calls.push(url);
    const json = url.endsWith("/pulls/7")
      ? { number: 7, state: "open", merged_at: null, merge_commit_sha: null, head: { sha: head }, base: { sha: base, ref: "main" } }
      : url.endsWith(`/git/commits/${head}`) ? { tree: { sha: tree } }
      : url.includes("/issues/7/comments") ? [{ id: 1, html_url: `${baseUrl}#issuecomment-1`, user: { login: "publisher" }, body: reviewBody }]
      : url.includes(`/contents/reset.md?ref=${head}`) ? { type: "file", encoding: "base64", content: Buffer.from(inventoryBody).toString("base64") }
      : url.includes("check-runs") ? { check_runs: [] } : [];
    return { ok: true, json: async () => json };
  };
  const snapshot = await collectGitHubSnapshot({ repository: "example/project", pr: 7, fetchImpl });
  assert.deepEqual(snapshot.inventoryFiles, [{ url: inventoryUrl, body: inventoryBody }]);
  assert.deepEqual(snapshot.changedFiles, []);
  assert.ok(calls.some(url => url.includes(`/contents/reset.md?ref=${head}`)));
});
