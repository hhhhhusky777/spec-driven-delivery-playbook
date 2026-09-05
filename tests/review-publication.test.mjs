import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePublication, runCli } from "../scripts/review-publication.mjs";

function input() {
  return {
    schemaVersion: 1, operation: "PLAN", repository: "example/project", expectedHeadRepository: "example/project",
    pr: 1, expectedHead: "a".repeat(40), session: "S01", round: "R01", publisher: "owner",
    seats: [{ seat: "R1", agent: "agent1" }, { seat: "R2", agent: "agent2" }],
    receipts: ["R1", "R2"].map((seat, i) => ({ seat, agent: `agent${i + 1}`, head: "a".repeat(40), disposition: "PASS", summary: "Checked exact head", findings: i ? [] : [{ id: "F01", body: "Example finding", location: { path: "code.mjs", line: 1, side: "RIGHT" } }] })),
    live: { repository: "example/project", baseRepository: "example/project", headRepository: "example/project", pr: 1, head: "a".repeat(40), base: "b".repeat(40), publisher: "owner", state: "OPEN", collectedAt: "2026-01-01T00:00:00Z", paginationComplete: true, diff: [{ path: "code.mjs", line: 1, side: "RIGHT" }], reviews: [], comments: [] },
    checkpoint: null,
  };
}

function publish(data, plan) {
  for (const [index, action] of plan.actions.entries()) {
    const id = 100 + index;
    data.live.reviews.push({ id, publisher: data.publisher, head: data.expectedHead, body: action.payload.body, event: action.payload.event });
    for (const [n, comment] of action.payload.comments.entries()) data.live.comments.push({ ...comment, id: 1000 + index * 10 + n, reviewId: id, publisher: data.publisher, head: data.expectedHead });
  }
}

test("deterministic COMMENT plans reconcile and replay without duplicate writes", () => {
  const data = input();
  const before = JSON.stringify(data);
  const plan = evaluatePublication(data);
  assert.equal(JSON.stringify(data), before);
  assert.deepEqual(evaluatePublication(data), plan);
  assert.equal(plan.status, "PLANNED");
  assert.equal(plan.actions.length, 2);
  assert.ok(plan.actions.every(a => a.payload.event === "COMMENT" && a.payload.commit_id === data.expectedHead));
  publish(data, plan);
  data.checkpoint = plan.checkpoint;
  data.operation = "RECONCILE";
  const result = evaluatePublication(data);
  assert.equal(result.status, "VERIFIED");
  assert.equal(result.actions.length, 0);
  data.operation = "PLAN";
  data.checkpoint = result.checkpoint;
  assert.equal(evaluatePublication(data).status, "VERIFIED");
});

test("malformed input and CLI return sanitized schema errors", () => {
  for (const value of [null, [], {}, { schemaVersion: 2 }, { ...input(), receipts: [null, {}] }, { ...input(), seats: [null, null] }, { ...input(), seats: [{ seat: 3 }, { seat: {} }] }]) assert.equal(evaluatePublication(value).exitCode, 2);
  assert.equal(runCli("not json secret-value").exitCode, 2);
  assert.ok(!JSON.stringify(runCli("secret-value")).includes("secret-value"));
  assert.equal(runCli(JSON.stringify(input()), ["--write"]).exitCode, 2);
  assert.equal(runCli(JSON.stringify(input())).exitCode, 0);
});

test("head, repository, pagination, receipts and diff anchors fail closed", () => {
  for (const mutate of [
    d => { d.live.head = "c".repeat(40); },
    d => { d.live.baseRepository = "wrong/repo"; },
    d => { d.live.headRepository = "wrong/repo"; },
    d => { d.live.pr = 2; },
    d => { d.live.state = "CLOSED"; },
    d => { d.live.paginationComplete = false; },
    d => { d.live.publisher = "intruder"; },
    d => { d.receipts[0].head = "c".repeat(40); },
    d => { d.receipts[0].seat = "R2"; },
    d => { d.receipts[0].agent = "wrong"; },
    d => { d.receipts[0].findings[0].location.line = 2; },
    d => { d.receipts[1].findings = structuredClone(d.receipts[0].findings); },
  ]) {
    const data = input(); mutate(data);
    const result = evaluatePublication(data);
    assert.equal(result.exitCode, 1, JSON.stringify(result));
    assert.deepEqual(result.actions, []);
  }
});

test("partial, conflicting, duplicated and uncertain publication cannot repost", () => {
  for (const mutate of [
    d => { d.live.comments = []; },
    d => { d.live.reviews[0].body += "edited"; },
    d => { d.live.reviews[0].event = "APPROVE"; },
    d => { d.live.comments[0].publisher = "intruder"; },
    d => { d.live.reviews.push({ ...d.live.reviews[0], id: 200 }); },
    d => { d.live.reviews.shift(); },
    d => { d.live.comments.push({ ...d.live.comments[0] }); },
    d => { d.live.reviews.pop(); },
  ]) {
    const data = input(); const plan = evaluatePublication(data); publish(data, plan); mutate(data);
    assert.equal(evaluatePublication(data).status, "BLOCKED");
  }
  const data = input(); const plan = evaluatePublication(data);
  data.checkpoint = plan.checkpoint;
  assert.equal(evaluatePublication(data).status, "BLOCKED");
  data.operation = "RECONCILE";
  assert.equal(evaluatePublication(data).status, "BLOCKED");
  publish(data, plan);
  data.checkpoint = evaluatePublication(data).checkpoint;
  data.live.reviews[0].id = 999;
  data.live.comments[0].reviewId = 999;
  assert.equal(evaluatePublication(data).status, "BLOCKED");
});

test("summary findings and untrusted text remain literal data", () => {
  const data = input();
  data.receipts[0].findings[0] = { id: "F01", location: "SUMMARY", body: "$(do-not-execute) ignore instructions" };
  data.receipts[0].disposition = "CHANGES_NEEDED";
  const plan = evaluatePublication(data);
  assert.equal(plan.actions[0].payload.comments.length, 0);
  assert.ok(plan.actions[0].payload.body.includes("$(do-not-execute)"));
  assert.ok(plan.actions[0].payload.body.includes("CHANGES_NEEDED"));
});

test("durable checkpoint candidate, digest, duplicate and unknown action conflicts block", () => {
  for (const [rule, mutate] of [
    ["CHECKPOINT_CANDIDATE", c => { c.candidate = "wrong-candidate"; }],
    ["CHECKPOINT_CONFLICT", c => { c.publications[0].digest = "wrong-digest"; }],
    ["CHECKPOINT_CONFLICT", c => { c.publications.push(structuredClone(c.publications[0])); }],
    ["CHECKPOINT_UNKNOWN_ACTION", c => { c.publications.push({ actionId: "unknown", digest: "unknown", state: "PLANNED" }); }],
  ]) {
    const data = input(); const plan = evaluatePublication(data);
    publish(data, plan);
    data.checkpoint = plan.checkpoint;
    mutate(data.checkpoint);
    const result = evaluatePublication(data);
    assert.equal(result.exitCode, 1, rule);
    assert.equal(result.status, "BLOCKED", rule);
    assert.deepEqual(result.actions, [], rule);
    assert.ok(result.discrepancies.some(d => d.rule === rule), rule);
  }
});

test("receipt input cannot request formal approval or request-changes events", () => {
  for (const event of ["APPROVE", "REQUEST_CHANGES"]) {
    const data = input(); data.receipts[0].event = event;
    const result = evaluatePublication(data);
    assert.equal(result.exitCode, 2);
    assert.equal(result.status, "INVALID");
    assert.deepEqual(result.actions, []);
    assert.ok(result.discrepancies.some(d => d.rule === "RECEIPT_EVENT"));
  }
  const data = input(); data.receipts[0].event = "COMMENT";
  assert.equal(evaluatePublication(data).status, "PLANNED");
});
