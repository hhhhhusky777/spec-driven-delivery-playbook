import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

const hash = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
const text = value => typeof value === "string" && value.trim().length > 0;
const id = value => typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value);
const sha = value => typeof value === "string" && /^[a-f0-9]{40}$/.test(value);
const repo = value => typeof value === "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value);
const positive = value => Number.isSafeInteger(value) && value > 0;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const safePath = value => text(value) && !value.startsWith("/") && !value.includes("\\") && !value.split("/").some(x => ["..", ".", ""].includes(x));
const anchor = value => object(value) && safePath(value.path) && positive(value.line) && ["LEFT", "RIGHT"].includes(value.side);
const location = value => ({ path: value.path, line: value.line, side: value.side });

function validate(input) {
  const errors = [];
  const require = (condition, rule) => { if (!condition) errors.push({ rule }); };
  require(object(input), "INPUT_OBJECT");
  if (!object(input)) return errors;
  require(input.schemaVersion === 1, "SCHEMA_VERSION");
  require(["PLAN", "RECONCILE"].includes(input.operation), "OPERATION");
  require(repo(input.repository) && repo(input.expectedHeadRepository), "REPOSITORY");
  require(positive(input.pr) && sha(input.expectedHead), "CANDIDATE");
  require(id(input.session) && id(input.round) && id(input.publisher), "IDENTITY");
  require(Array.isArray(input.seats) && input.seats.length === 2, "TWO_SEATS");
  if (Array.isArray(input.seats)) {
    require(input.seats.every(s => object(s) && id(s.seat) && text(s.agent)), "SEAT_IDENTITY");
    require(new Set(input.seats.map(s => s?.seat?.toLowerCase())).size === 2 && new Set(input.seats.map(s => s?.agent)).size === 2, "UNIQUE_SEATS");
  }
  require(Array.isArray(input.receipts) && input.receipts.length === 2, "TWO_RECEIPTS");
  for (const r of Array.isArray(input.receipts) ? input.receipts : []) {
    require(object(r) && id(r.seat) && text(r.agent) && sha(r.head) && text(r.summary) && ["PASS", "CHANGES_NEEDED", "BLOCKED"].includes(r.disposition) && Array.isArray(r.findings), "RECEIPT_SCHEMA");
    require(!object(r) || r.event === undefined || r.event === "COMMENT", "RECEIPT_EVENT");
    for (const f of Array.isArray(r?.findings) ? r.findings : []) {
      require(object(f) && id(f.id) && text(f.body) && (f.location === "SUMMARY" || anchor(f.location)), "FINDING_SCHEMA");
    }
  }
  require(object(input.live), "LIVE_SNAPSHOT");
  if (object(input.live)) {
    const l = input.live;
    require(repo(l.repository) && repo(l.baseRepository) && repo(l.headRepository) && positive(l.pr) && sha(l.head) && sha(l.base), "LIVE_IDENTITY");
    require(["OPEN", "CLOSED", "MERGED"].includes(l.state) && id(l.publisher) && typeof l.collectedAt === "string" && /^\d{4}-\d{2}-\d{2}T/.test(l.collectedAt) && Number.isFinite(Date.parse(l.collectedAt)), "LIVE_METADATA");
    require(typeof l.paginationComplete === "boolean" && Array.isArray(l.diff) && l.diff.every(anchor), "LIVE_DIFF");
    require(Array.isArray(l.reviews) && Array.isArray(l.comments), "OBSERVATIONS");
    for (const r of Array.isArray(l.reviews) ? l.reviews : []) require(object(r) && positive(r.id) && text(r.publisher) && sha(r.head) && typeof r.body === "string" && text(r.event), "OBSERVED_REVIEW");
    for (const c of Array.isArray(l.comments) ? l.comments : []) require(object(c) && positive(c.id) && positive(c.reviewId) && text(c.publisher) && sha(c.head) && typeof c.body === "string" && anchor(c), "OBSERVED_COMMENT");
  }
  require(input.checkpoint === null || (object(input.checkpoint) && input.checkpoint.schemaVersion === 1 && typeof input.checkpoint.candidate === "string" && Array.isArray(input.checkpoint.publications) && input.checkpoint.publications.every(p => object(p) && text(p.actionId) && text(p.digest) && ["PLANNED", "VERIFIED"].includes(p.state))), "CHECKPOINT_SCHEMA");
  return errors;
}

export function publicationMarker(input, seat) {
  return `<!-- sdd-review:${hash([input.repository.toLowerCase(), input.pr, input.expectedHead, input.session, input.round, seat])} -->`;
}

export function evaluatePublication(input) {
  const malformed = validate(input);
  if (malformed.length) return { status: "INVALID", exitCode: 2, discrepancies: malformed, actions: [] };
  const candidate = hash([input.repository.toLowerCase(), input.pr, input.expectedHead, input.session, input.round]);
  const discrepancies = [];
  const fail = (rule, identity) => discrepancies.push({ rule, ...(identity ? { identity } : {}) });
  const l = input.live;
  if (new Set(l.reviews.map(r => r.id)).size !== l.reviews.length || new Set(l.comments.map(c => c.id)).size !== l.comments.length) fail("DUPLICATE_OBSERVED_ID");
  if (l.repository.toLowerCase() !== input.repository.toLowerCase() || l.baseRepository.toLowerCase() !== input.repository.toLowerCase() || l.headRepository.toLowerCase() !== input.expectedHeadRepository.toLowerCase() || l.pr !== input.pr) fail("PR_REPOSITORY_MISMATCH");
  if (l.head !== input.expectedHead) fail("HEAD_DRIFT");
  if (l.state !== "OPEN") fail("PR_NOT_OPEN");
  if (l.publisher !== input.publisher) fail("PUBLISHER_MISMATCH");
  if (!l.paginationComplete) fail("INCOMPLETE_PAGINATION");
  if (input.checkpoint && input.checkpoint.candidate !== candidate) fail("CHECKPOINT_CANDIDATE");
  const publications = [];
  const ids = new Set();
  const requests = [];
  for (const seat of [...input.seats].sort((a, b) => a.seat.localeCompare(b.seat))) {
    const matches = input.receipts.filter(r => r.seat === seat.seat);
    if (matches.length !== 1) { fail("RECEIPT_SEAT", seat.seat); continue; }
    const receipt = matches[0];
    if (receipt.agent !== seat.agent || receipt.head !== input.expectedHead) fail("RECEIPT_IDENTITY", seat.seat);
    const marker = publicationMarker(input, seat.seat);
    const actionId = marker.slice(4, -4).trim();
    const comments = [];
    const summaries = [];
    for (const finding of receipt.findings) {
      if (ids.has(finding.id.toLowerCase())) fail("DUPLICATE_FINDING_ID", finding.id);
      ids.add(finding.id.toLowerCase());
      const body = `${marker}\n[${finding.id}] Agent-generated ${seat.seat}\n${finding.body}`;
      if (finding.location === "SUMMARY") summaries.push(body);
      else {
        if (!l.diff.some(a => same(location(a), location(finding.location)))) fail("INVALID_DIFF_ANCHOR", finding.id);
        comments.push({ ...location(finding.location), body });
      }
    }
    const body = `${marker}\nAgent-generated review; not a formal GitHub approval.\nSession: ${input.session}; round: ${input.round}; seat: ${seat.seat}; agent: ${seat.agent}\nHead: ${input.expectedHead}\nDisposition: ${receipt.disposition}\n${receipt.summary}${summaries.length ? `\n\n${summaries.join("\n\n")}` : ""}`;
    const payload = { commit_id: input.expectedHead, event: "COMMENT", body, comments };
    const digest = hash(payload);
    const prior = input.checkpoint?.publications.filter(p => p.actionId === actionId) || [];
    if (prior.length > 1 || prior.some(p => p.digest !== digest)) fail("CHECKPOINT_CONFLICT", seat.seat);
    const observed = l.reviews.filter(r => r.body.includes(marker));
    if (l.comments.some(c => c.body.includes(marker) && !observed.some(r => r.id === c.reviewId))) fail("ORPHAN_PUBLICATION", seat.seat);
    if (observed.length > 1) fail("DUPLICATE_PUBLICATION", seat.seat);
    let verified = false;
    let reviewId;
    let commentIds = [];
    if (observed.length === 1) {
      const r = observed[0];
      const actual = l.comments.filter(c => c.reviewId === r.id);
      const expected = comments.map(c => JSON.stringify(c)).sort();
      const normalized = actual.map(c => JSON.stringify({ ...location(c), body: c.body })).sort();
      verified = r.publisher === input.publisher && r.head === input.expectedHead && r.event === "COMMENT" && r.body === body && same(expected, normalized) && actual.every(c => c.publisher === input.publisher && c.head === input.expectedHead) && new Set(actual.map(c => c.id)).size === actual.length;
      if (!verified) fail("PUBLICATION_CONFLICT", seat.seat);
      else {
        reviewId = r.id; commentIds = actual.map(c => c.id).sort((a, b) => a - b);
        if (prior.some(p => p.state === "VERIFIED" && (p.reviewId !== reviewId || !same(p.commentIds, commentIds)))) fail("OBSERVED_ID_CHANGED", seat.seat);
      }
    } else if (!observed.length) {
      if (input.operation === "RECONCILE" || prior.length) fail("PUBLICATION_MISSING_OR_UNCERTAIN", seat.seat);
      else requests.push({ actionId, payload });
    }
    publications.push({ actionId, digest, state: verified ? "VERIFIED" : "PLANNED", ...(verified ? { reviewId, commentIds } : {}) });
  }
  if (input.checkpoint?.publications.some(p => !publications.some(x => x.actionId === p.actionId))) fail("CHECKPOINT_UNKNOWN_ACTION");
  if (requests.length && publications.some(p => p.state === "VERIFIED")) fail("PARTIAL_BATCH");
  // No partial plan can escape a failed precondition or uncertain publication.
  return { status: discrepancies.length ? "BLOCKED" : requests.length ? "PLANNED" : "VERIFIED", exitCode: discrepancies.length ? 1 : 0, candidate, actions: discrepancies.length ? [] : requests, discrepancies, checkpoint: discrepancies.length ? input.checkpoint : { schemaVersion: 1, candidate, publications } };
}

export function runCli(source, args = []) {
  if (args.length) return { status: "INVALID", exitCode: 2, actions: [], discrepancies: [{ rule: "CLI_ARGUMENTS" }] };
  try { return evaluatePublication(JSON.parse(source)); }
  catch { return { status: "INVALID", exitCode: 2, actions: [], discrepancies: [{ rule: "JSON_INPUT" }] }; }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let source = "";
  for await (const chunk of process.stdin) source += chunk;
  const result = runCli(source, process.argv.slice(2));
  process.stdout.write(`${JSON.stringify(result)}\n`);
  process.exitCode = result.exitCode;
}
