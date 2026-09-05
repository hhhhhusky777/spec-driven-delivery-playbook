#!/usr/bin/env node

import { readFile, realpath } from "node:fs/promises";
import { createHash } from "node:crypto";
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
const LEGACY_SCHEMAS = JSON.parse(await readFile(
  path.join(REPOSITORY_ROOT, "config", "sdd-lifecycle-schema-v2.json"), "utf8",
));
const V3_SCHEMAS = JSON.parse(await readFile(
  path.join(REPOSITORY_ROOT, "config", "sdd-lifecycle-schema-v3.json"), "utf8",
));

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

function rawControlField(tables, field) {
  for (const table of tables) {
    if (table.headers.length !== 2 || table.headers[0] !== "Field") {
      continue;
    }
    const row = table.rows.find((item) => normalizeValue(item.Field) === field);
    if (row) {
      return row[table.headers[1]];
    }
  }
  return "";
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

function hasRecordedValue(value) {
  const normalized = normalizeValue(value || "");
  return !(
    isNone(normalized) ||
    /^(?:not recorded|not available|not[ _-]+selected|pending|placeholder|tbd|todo|unknown)(?:\s*\/|$)/i.test(
      normalized,
    ) ||
    /<[^>]+>/.test(normalized)
  );
}

function hasMarkdownLink(value) {
  return /\[[^\]]+\]\([^)]+\)/.test(String(value || ""));
}

function hasDispositionEvidence(value, allowedDispositions) {
  const normalized = normalizeValue(value || "");
  const match = /^([A-Z_]+)\s+\/\s+(.+)$/.exec(normalized);
  return Boolean(
    match &&
      allowedDispositions.includes(match[1]) &&
      hasRecordedValue(match[2]) &&
      hasMarkdownLink(value),
  );
}

function hasRevisionDispositionEvidence(
  value,
  allowedDispositions,
  revisionKind,
  expectedRevision,
) {
  const normalized = normalizeValue(value || "");
  const match = /^([A-Z_]+)\s+(HEAD|MERGE)\s+([0-9a-f]{40})\s+\/\s+(.+)$/i.exec(
    normalized,
  );
  return Boolean(
    match &&
    allowedDispositions.includes(match[1].toUpperCase()) &&
    match[2].toUpperCase() === revisionKind &&
    match[3].toLowerCase() === expectedRevision &&
    hasRecordedValue(match[4]) &&
    hasMarkdownLink(value),
  );
}

function parseTaskAndPrEvidence(value) {
  const normalized = normalizeValue(value || "");
  const identity = /^([A-Z][A-Z0-9_-]*)\s+\/\s+PR\s+#?(\d+)$/i.exec(normalized);
  const links = [
    ...String(value || "").matchAll(/\[[^\]]+\]\(([^)]+)\)/g),
  ];
  const pull = links.length === 1
    ? /https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)\/pull\/(\d+)(?:[?#][^)]*)?$/i.exec(links[0][1])
    : null;
  if (!identity || !pull || identity[2] !== pull[2]) {
    return null;
  }
  return {
    taskId: identity[1].toLowerCase(),
    repository: pull[1].toLowerCase(),
    pullNumber: pull[2],
  };
}

function isStableIdentifier(value) {
  const normalized = normalizeValue(value || "");
  return hasRecordedValue(normalized) && /^[A-Za-z][A-Za-z0-9_-]*$/.test(normalized);
}

function parseGitHubRepository(value) {
  const match = /^https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/i.exec(
    normalizeValue(value || ""),
  );
  return match ? match[1].toLowerCase() : null;
}

function hasReviewTargetLink(value, targetId, repository) {
  const links = [
    ...String(value || "").matchAll(
      /\[([^\]]+)\]\(https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)\/pull\/(\d+)(?:[?#][^)]*)?\)/gi,
    ),
  ];
  if (links.length !== 1) {
    return false;
  }
  const label = normalizeValue(links[0][1]).toLowerCase();
  const labelIds = label.split(/[^a-z0-9_-]+/).filter(Boolean);
  const labelPr = /(?:^|\s)PR\s+#?(\d+)(?:$|\s)/i.exec(label);
  return labelIds.includes(normalizeValue(targetId).toLowerCase()) &&
    Boolean(
      labelPr &&
      labelPr[1] === links[0][3] &&
      repository &&
      links[0][2].toLowerCase() === repository,
    );
}

function parseHeadAndMergeEvidence(value) {
  const normalized = normalizeValue(value || "");
  const match = /^HEAD\s+([0-9a-f]{40})\s+\/\s+MERGE\s+([0-9a-f]{40})$/i.exec(
    normalized,
  );
  return match ? { head: match[1].toLowerCase(), merge: match[2].toLowerCase() } : null;
}

function mergeEvidenceMatches(value, repository, mergeRevision) {
  if (!hasDispositionEvidence(value, ["MERGED"])) {
    return false;
  }
  const links = [...String(value || "").matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  const commit = links.length === 1
    ? /https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)\/commit\/([0-9a-f]{40})(?:[?#][^)]*)?$/i.exec(
        links[0][1],
      )
    : null;
  return Boolean(
    commit &&
    repository &&
    mergeRevision &&
    commit[1].toLowerCase() === repository &&
    commit[2].toLowerCase() === mergeRevision,
  );
}

function parseStableIdentifierList(value) {
  const normalized = normalizeValue(value || "");
  if (!hasRecordedValue(normalized)) {
    return null;
  }
  const identifiers = normalized.split(",").map((item) => item.trim());
  const reserved = new Set(["task", "pr", "pull", "branch", "feature", "main", "master"]);
  if (
    identifiers.length === 0 ||
    identifiers.some((item) => !isStableIdentifier(item)) ||
    identifiers.some((item) => reserved.has(item.toLowerCase())) ||
    new Set(identifiers.map((item) => item.toLowerCase())).size !== identifiers.length
  ) {
    return null;
  }
  return identifiers.map((item) => item.toLowerCase());
}

function parseReviewerRoster(value) {
  const normalized = normalizeValue(value || "");
  if (!hasRecordedValue(normalized)) {
    return null;
  }
  const reviewers = normalized.split(",").map((item) => item.trim());
  const canonicalReviewers = reviewers.map((item) =>
    item.replace(/^\/+/, "").toLowerCase(),
  );
  if (
    reviewers.length === 0 ||
    reviewers.some((item) => !/^\/?[A-Za-z0-9][A-Za-z0-9_.:/-]*$/.test(item)) ||
    new Set(canonicalReviewers).size !== reviewers.length
  ) {
    return null;
  }
  return canonicalReviewers;
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
    if (!hasRecordedValue(value)) {
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

function hasActiveFreshReviewSession(fields) {
  const state = normalizeValue(fields.get("Fresh-context review state") || "").toUpperCase();
  return (
    hasRecordedValue(fields.get("Fresh-context review session ID") || "") ||
    (hasRecordedValue(state) && !["NOT_STARTED", "NOT_APPLICABLE"].includes(state))
  );
}

function checkReviewSessionRoster(file, fields, reviewRequired) {
  if (!reviewRequired) {
    return [];
  }
  const reviewSessionId = fields.get("Fresh-context review session ID") || "";
  const assignedReviewers = parseReviewerRoster(
    fields.get("Fresh-context assigned reviewers") || "",
  );
  const requiredApprovals = fields.get("Fresh-context required approvals") || "";
  if (
    !isStableIdentifier(reviewSessionId) ||
    !assignedReviewers ||
    requiredApprovals !== "2" ||
    assignedReviewers.length !== 2
  ) {
    return [
      diagnostic(
        file,
        1,
        "SDD_FRESH_REVIEW_SESSION",
        "review requires a stable session with exactly two unique assigned reviewers and two required approvals",
      ),
    ];
  }
  return [];
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
  const assignedReviewers = parseReviewerRoster(
    fields.get("Fresh-context assigned reviewers") || "",
  );
  const approvedReviewers = parseReviewerRoster(
    fields.get("Fresh-context approved reviewers") || "",
  );
  const assignedReviewerSet = new Set(
    (assignedReviewers || []).map((item) => item.toLowerCase()),
  );
  const approvedReviewerSet = new Set(
    (approvedReviewers || []).map((item) => item.toLowerCase()),
  );
  if (
    !assignedReviewers ||
    !approvedReviewers ||
    assignedReviewerSet.size !== approvedReviewerSet.size ||
    [...assignedReviewerSet].some((item) => !approvedReviewerSet.has(item))
  ) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_FRESH_REVIEW_SESSION",
        "approval requires both assigned reviewers to approve the exact candidate",
      ),
    );
  }
  for (const field of ["Fresh-context reviewed revision", "Fresh-context review evidence"]) {
    const value = fields.get(field) || "";
    if (!hasRecordedValue(value)) {
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
      if (!hasRecordedValue(value)) {
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
  } else if (humanRequired === false && fields.get("Human review state") !== "NOT_APPLICABLE") {
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
      "Implementation repository",
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

  const implementationScopeIds = parseStableIdentifierList(
    fields.get("Implementation mode scope") || "",
  );
  if (mode !== "NOT_SELECTED" && !implementationScopeIds) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_IMPLEMENTATION_MODE_SCOPE",
        "Implementation mode scope must be a comma-separated list of unique stable task IDs without prose",
      ),
    );
  }
  const implementationRepository = parseGitHubRepository(
    fields.get("Implementation repository") || "",
  );
  if (mode !== "NOT_SELECTED" && !implementationRepository) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_IMPLEMENTATION_REPOSITORY",
        "Implementation repository must be an exact https://github.com/owner/repository URL",
      ),
    );
  }

  const dependencyTable = findTable(tables, [
    "Artifact ID",
    "Artifact/link",
    "Depends on",
    "Consumed version",
    "Current version",
    "Change impact",
    "Freshness",
    "Blocked by",
  ]);
  const registeredIds = new Set(
    (dependencyTable?.rows || []).map((row) =>
      normalizeValue(row["Artifact ID"] || "").toLowerCase(),
    ),
  );

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
  if (!reviewLedger) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_IMPLEMENTATION_REVIEW_LEDGER",
        "workflow requires the canonical implementation PR and post-merge review ledger",
      ),
    );
  }
  const invalidModeRows = (reviewLedger?.rows || []).filter(
    (row) =>
      !["HUMAN_REVIEW_BEFORE_MERGE", "AGENT_AUTO_MERGE"].includes(
        leadingDisposition(row["Implementation mode/authority"]),
      ),
  );
  if (invalidModeRows.length > 0) {
    diagnostics.push(
      diagnostic(
        file,
        reviewLedger.line,
        "SDD_IMPLEMENTATION_REVIEW_MODE",
        "implementation review ledger mode must lead with HUMAN_REVIEW_BEFORE_MERGE or AGENT_AUTO_MERGE",
      ),
    );
  }
  const invalidMergeRows = (reviewLedger?.rows || []).filter(
    (row) => !["MERGED", "STOPPED"].includes(leadingDisposition(row["Merge result"])),
  );
  if (invalidMergeRows.length > 0) {
    diagnostics.push(
      diagnostic(
        file,
        reviewLedger.line,
        "SDD_MERGE_RESULT",
        "implementation review ledger Merge result must lead with MERGED or STOPPED",
      ),
    );
  }
  const mergedRows = (reviewLedger?.rows || []).filter(
    (row) => leadingDisposition(row["Merge result"]) === "MERGED",
  );
  for (const row of reviewLedger?.rows || []) {
    const mergeDisposition = leadingDisposition(row["Merge result"]);
    const taskPr = parseTaskAndPrEvidence(row["Task/PR"]);
    const commonEvidence = [
      ["Task/PR", Boolean(taskPr)],
      [
        "Implementation mode/authority",
        hasDispositionEvidence(row["Implementation mode/authority"], [
          "HUMAN_REVIEW_BEFORE_MERGE",
          "AGENT_AUTO_MERGE",
        ]),
      ],
      [
        "Merge result",
        hasDispositionEvidence(row["Merge result"], ["MERGED", "STOPPED"]),
      ],
    ];
    for (const [field, valid] of commonEvidence) {
      if (!valid) {
        diagnostics.push(
          diagnostic(
            file,
            reviewLedger.line,
            "SDD_IMPLEMENTATION_REVIEW_EVIDENCE",
            `an implementation review row requires recorded ${field} evidence`,
          ),
        );
      }
    }
    if (
      taskPr &&
      (!registeredIds.has(taskPr.taskId) ||
        taskPr.repository !== implementationRepository)
    ) {
      diagnostics.push(
        diagnostic(
          file,
          reviewLedger.line,
          "SDD_IMPLEMENTATION_REVIEW_BINDING",
          "implementation ledger task/PR must match the dependency register and implementation repository",
        ),
      );
    }
    if (mergeDisposition === "STOPPED") {
      if (
        !hasRecordedValue(row["Findings/follow-up"] || "") ||
        !hasMarkdownLink(row["Findings/follow-up"])
      ) {
        diagnostics.push(
          diagnostic(
            file,
            reviewLedger.line,
            "SDD_STOPPED_REVIEW_EVIDENCE",
            "a STOPPED implementation row requires linked findings/follow-up evidence",
          ),
        );
      }
      continue;
    }
    if (mergeDisposition !== "MERGED") {
      continue;
    }
    const revisions = parseHeadAndMergeEvidence(row["Head and merge commit"]);
    const requiredEvidence = [
      ["Head and merge commit", Boolean(revisions)],
      [
        "Self-review",
        Boolean(
          revisions &&
          hasRevisionDispositionEvidence(
            row["Self-review"],
            ["SELF_REVIEW_PASSED"],
            "HEAD",
            revisions.head,
          ),
        ),
      ],
      [
        "Fresh-context review",
        Boolean(
          revisions &&
          hasRevisionDispositionEvidence(
            row["Fresh-context review"],
            ["APPROVED"],
            "HEAD",
            revisions.head,
          ),
        ),
      ],
      [
        "Required checks",
        Boolean(
          revisions &&
          hasRevisionDispositionEvidence(
            row["Required checks"],
            ["PASS"],
            "HEAD",
            revisions.head,
          ),
        ),
      ],
      [
        "Merge result",
        Boolean(
          revisions &&
          mergeEvidenceMatches(
            row["Merge result"],
            implementationRepository,
            revisions.merge,
          ),
        ),
      ],
    ];
    for (const [field, valid] of requiredEvidence) {
      if (!valid) {
        diagnostics.push(
          diagnostic(
            file,
            reviewLedger.line,
            "SDD_IMPLEMENTATION_REVIEW_EVIDENCE",
            `a merged implementation row requires recorded ${field} evidence`,
          ),
        );
      }
    }
    if (
      !revisions ||
      !hasRevisionDispositionEvidence(
        row["Fresh-context review"],
        ["APPROVED"],
        "HEAD",
        revisions.head,
      )
    ) {
      diagnostics.push(
        diagnostic(
          file,
          reviewLedger.line,
          "SDD_MERGED_FRESH_REVIEW",
          "an implementation row cannot be merged without fresh-context APPROVED evidence",
        ),
      );
    }
    if (
      leadingDisposition(row["Implementation mode/authority"]) ===
        "HUMAN_REVIEW_BEFORE_MERGE" &&
      (!revisions ||
        !hasRevisionDispositionEvidence(
          row["Human review"],
          ["APPROVED"],
          "HEAD",
          revisions.head,
        ))
    ) {
      diagnostics.push(
        diagnostic(
          file,
          reviewLedger.line,
          "SDD_MANUAL_MERGE_HUMAN_REVIEW",
          "a HUMAN_REVIEW_BEFORE_MERGE row cannot be merged without human APPROVED evidence",
        ),
      );
    }
  }

  if (["COMPLETE", "ARCHIVED"].includes(state)) {
    if (mergedRows.length === 0) {
      diagnostics.push(
        diagnostic(
          file,
          reviewLedger?.line || 1,
          "SDD_IMPLEMENTATION_REVIEW_EMPTY",
          `${state} requires at least one auditable MERGED implementation PR review-ledger row`,
        ),
      );
    }
    const invalidRows = (reviewLedger?.rows || []).filter((row) => {
      const mergeDisposition = leadingDisposition(row["Merge result"]);
      if (mergeDisposition === "STOPPED") {
        return !hasDispositionEvidence(row["Human review"], [
          "APPROVED",
          "ACCEPTED",
          "FOLLOW_UP_COMPLETE",
        ]);
      }
      const revisions = parseHeadAndMergeEvidence(row["Head and merge commit"]);
      const modeDisposition = leadingDisposition(row["Implementation mode/authority"]);
      if (!revisions) {
        return true;
      }
      if (modeDisposition === "HUMAN_REVIEW_BEFORE_MERGE") {
        return !hasRevisionDispositionEvidence(
          row["Human review"],
          ["APPROVED"],
          "HEAD",
          revisions.head,
        );
      }
      return !hasRevisionDispositionEvidence(
        row["Human review"],
        ["ACCEPTED", "FOLLOW_UP_COMPLETE"],
        "MERGE",
        revisions.merge,
      );
    });
    if (invalidRows.length > 0) {
      diagnostics.push(
        diagnostic(
          file,
          reviewLedger.line,
          "SDD_POST_MERGE_REVIEW_OPEN",
          `${state} requires each human-review row to record revision-bound APPROVED, ACCEPTED, or FOLLOW_UP_COMPLETE evidence`,
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
      ["IN_REVIEW", "CHANGES_REQUESTED", "APPROVED"].includes(
        fields.get("Review state"),
      ) || hasActiveFreshReviewSession(fields),
    ),
  );
  diagnostics.push(
    ...checkReviewSessionRoster(
      file,
      fields,
      ["IN_REVIEW", "CHANGES_REQUESTED", "APPROVED"].includes(
        fields.get("Review state"),
      ) || hasActiveFreshReviewSession(fields),
    ),
  );
  diagnostics.push(
    ...checkIndependentReviewGate(
      file,
      fields,
      fields.get("Review state") === "APPROVED" ||
        fields.get("Fresh-context review state") === "APPROVED",
      fields.get("Review state") === "APPROVED" ? true : null,
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
  const byId = new Map(
    rows.map((row) => [normalizeValue(row["Artifact ID"]).toLowerCase(), row]),
  );
  const result = new Map();
  function visit(id, stack = new Set()) {
    const normalizedId = normalizeValue(id).toLowerCase();
    if (result.has(normalizedId)) {
      return result.get(normalizedId);
    }
    if (stack.has(normalizedId)) {
      result.set(normalizedId, "BLOCKED");
      return "BLOCKED";
    }
    const row = byId.get(normalizedId);
    if (!row) {
      return "CURRENT";
    }
    const own = ownFreshness(row);
    if (own !== "CURRENT") {
      result.set(normalizedId, own);
      return own;
    }
    const nextStack = new Set(stack).add(normalizedId);
    const dependencies = splitIdentifiers(row["Depends on"] || "None");
    const dependencyStates = dependencies.map((dependency) => visit(dependency, nextStack));
    const state = dependencyStates.includes("BLOCKED")
      ? "BLOCKED"
      : dependencyStates.includes("STALE")
        ? "STALE"
        : "CURRENT";
    result.set(normalizedId, state);
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

async function checkDeliveryWorkflow(file, absoluteFile, root, text, tables, fields, schema, version) {
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

  const deliveryManifest = findTable(tables, [
    "Order",
    "Artifact ID",
    "Artifact",
    "Decision",
    "Reason/trigger",
    "Template or authority",
    "Owner",
    "Review owner",
    "Review state/link",
  ]);
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
  const blockerTable = findTable(tables, [
    "Blocker ID",
    "Evidence/unblock condition",
    "Blocks",
    "State",
    "Owner",
  ]);
  for (const [name, table] of [
    ["delivery manifest", deliveryManifest],
    ["artifact dependency and freshness register", freshnessTable],
    ["scoped blocker register", blockerTable],
  ]) {
    if (!table) {
      diagnostics.push(
        diagnostic(
          file,
          1,
          "SDD_REQUIRED_TABLE",
          `workflow requires the canonical ${name} table and exact headers`,
        ),
      );
    }
  }
  for (const [name, table, field] of [
    ["delivery manifest", deliveryManifest, "Artifact ID"],
    ["dependency register", freshnessTable, "Artifact ID"],
  ]) {
    const seen = new Set();
    for (const row of table?.rows || []) {
      const id = normalizeValue(row[field]);
      const key = id.toLowerCase();
      if (!isStableIdentifier(id)) {
        diagnostics.push(
          diagnostic(
            file,
            table.line,
            "SDD_ARTIFACT_ID",
            `${name} requires a non-sentinel stable ${field}: ${id || "missing"}`,
          ),
        );
      } else if (seen.has(key)) {
        diagnostics.push(
          diagnostic(
            file,
            table.line,
            "SDD_ARTIFACT_ID",
            `${name} contains duplicate ${field}: ${id}`,
          ),
        );
      }
      seen.add(key);
    }
  }
  diagnostics.push(
    ...checkSelfReviewGate(
      file,
      fields,
      ["IN_REVIEW", "CHANGES_REQUESTED", "APPROVED"].includes(
        fields.get("Current artifact review state"),
      ) ||
        ["MANIFEST_IN_REVIEW", "ARTIFACT_IN_REVIEW", "GATES_READY"].includes(
          fields.get("State"),
        ) ||
        hasActiveFreshReviewSession(fields),
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
  diagnostics.push(
    ...checkReviewSessionRoster(
      file,
      fields,
      ["IN_REVIEW", "CHANGES_REQUESTED", "APPROVED"].includes(artifactReviewState) ||
        ["MANIFEST_IN_REVIEW", "ARTIFACT_IN_REVIEW"].includes(fields.get("State")) ||
        hasActiveFreshReviewSession(fields),
    ),
  );
  const reviewPhase = fields.get("Current review phase");
  const allowedReviewPhases = new Set([
    "DESIGN",
    "IMPLEMENTATION",
    "VALIDATION",
    "ARCHIVE",
  ]);
  if (!allowedReviewPhases.has(reviewPhase)) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_REVIEW_PHASE",
        `unsupported Current review phase: ${reviewPhase || "missing"}`,
      ),
    );
  }
  const reviewTarget = fields.get("Current review target ID") || "";
  const implementationScope = new Set(
    parseStableIdentifierList(fields.get("Implementation mode scope") || "") || [],
  );
  const implementationRepository = parseGitHubRepository(
    fields.get("Implementation repository") || "",
  );
  const registeredImplementationTargets = new Set(
    (freshnessTable?.rows || []).map((row) =>
      normalizeValue(row["Artifact ID"] || "").toLowerCase(),
    ),
  );
  const implementationReviewInScope =
    reviewPhase === "IMPLEMENTATION" &&
    hasRecordedValue(reviewTarget) &&
    implementationScope.has(normalizeValue(reviewTarget).toLowerCase()) &&
    registeredImplementationTargets.has(normalizeValue(reviewTarget).toLowerCase()) &&
    hasReviewTargetLink(
      rawControlField(tables, "Current artifact/gate"),
      reviewTarget,
      implementationRepository,
    );
  if (reviewPhase === "IMPLEMENTATION" && !implementationReviewInScope) {
    diagnostics.push(
      diagnostic(
        file,
        1,
        "SDD_IMPLEMENTATION_REVIEW_SCOPE",
        "implementation review requires a registered target ID inside Implementation mode scope and a linked PR in Implementation repository",
      ),
    );
  }
  const agentAutoMergeReview =
    fields.get("State") === "DELIVERY_ACTIVE" &&
    fields.get("Implementation continuation mode") === "AGENT_AUTO_MERGE" &&
    implementationReviewInScope;
  diagnostics.push(
    ...checkIndependentReviewGate(
      file,
      fields,
      artifactApproved ||
        reviewApprovedRequired ||
        fields.get("Fresh-context review state") === "APPROVED",
      artifactApproved || reviewApprovedRequired ? !agentAutoMergeReview : null,
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

  const postMergeControlMode = fields.get("Post-merge control mode");
  if (postMergeControlMode && !["NOT_SELECTED", "PREAUTHORIZED_CONTROL_RECEIPT"].includes(postMergeControlMode)) {
    diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_MODE", `unsupported post-merge control mode: ${postMergeControlMode}`));
  }
  if (postMergeControlMode === "PREAUTHORIZED_CONTROL_RECEIPT") {
    const required = [
      "Post-merge control authority",
      "Post-merge control source revision",
      "Post-merge control PR",
      "Post-merge control allowed paths",
      "Post-merge control changed paths",
      "Post-merge control allowed fields",
      "Post-merge control changed fields",
      "Post-merge control required gates",
      "Post-merge control evidence owner",
      "Post-merge cleanup targets",
      "Post-merge cleanup authority",
    ];
    diagnostics.push(...checkRequiredFields(file, fields, required));
    for (const field of required.slice(0, -2)) {
      if (!hasRecordedValue(fields.get(field) || "")) {
        diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_AUTHORITY", `${field} must be predeclared`));
      }
    }
    const sourceRevision = normalizeValue(fields.get("Post-merge control source revision") || "");
    const reviewRevisions = [
      fields.get("Self-review candidate revision"),
      fields.get("Fresh-context reviewed revision"),
      fields.get("Human reviewed revision"),
    ].map((value) => normalizeValue(value || ""));
    if (!/^[a-f0-9]{40}$/.test(sourceRevision) || reviewRevisions.some((value) => value !== sourceRevision)) {
      diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_SOURCE", "control receipt source must be the exact self-reviewed, independently approved, and human-approved closure revision"));
    }
    if (
      version !== 4 ||
      fields.get("State") !== "ARCHIVED" ||
      fields.get("Previous state") !== "COMPLETE" ||
      fields.get("Current review phase") !== "ARCHIVE" ||
      fields.get("Current artifact review state") !== "APPROVED" ||
      fields.get("Fresh-context review state") !== "APPROVED" ||
      fields.get("Human review state") !== "APPROVED" ||
      fields.get("Review mode") !== "AUTO_CONTINUE"
    ) {
      diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_BOUNDARY", "pre-authorized control receipts apply only to COMPLETE -> ARCHIVED after the accepted archive gate and use AUTO_CONTINUE"));
    }
    const repository = parseGitHubRepository(fields.get("Implementation repository") || "");
    const sourcePr = markdownLinkTarget(rawControlField(tables, "Current artifact/gate"));
    const receiptPr = markdownLinkTarget(rawControlField(tables, "Post-merge control PR"));
    const evidenceOwner = markdownLinkTarget(rawControlField(tables, "Post-merge control evidence owner"));
    const prPrefix = repository ? `https://github.com/${repository}/pull/` : "";
    if (!sourcePr || !receiptPr || receiptPr === sourcePr || receiptPr !== evidenceOwner || !receiptPr.startsWith(prPrefix) || !/\/pull\/[1-9]\d*$/.test(receiptPr)) {
      diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_PUBLICATION", "control receipt requires a distinct same-repository PR that owns its immutable post-merge evidence"));
    }
    const allowedPaths = splitPaths(fields.get("Post-merge control allowed paths") || "");
    const changedPaths = splitPaths(fields.get("Post-merge control changed paths") || "");
    const globalPathScope = allowedPaths.some((scope) =>
      path.posix.normalize(normalizeValue(scope).replace(/\\/g, "/")).replace(/\/$/, "") === "*"
    );
    if (!allowedPaths.length || !changedPaths.length || globalPathScope || changedPaths.some((target) => !allowedPaths.some((scope) => pathWithinScope(target, scope)))) {
      diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_SCOPE", "every changed path must be enumerated inside a non-global pre-approved control scope"));
    }
    const allowedFields = splitPaths(fields.get("Post-merge control allowed fields") || "").map((field) => field.toLowerCase());
    const changedFields = splitPaths(fields.get("Post-merge control changed fields") || "").map((field) => field.toLowerCase());
    if (!allowedFields.length || !changedFields.length || changedFields.some((field) => !allowedFields.includes(field))) {
      diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_FIELDS", "every changed field must be enumerated in the pre-approved mutable control-field list"));
    }
    if (normalizeValue(fields.get("Post-merge control required gates") || "") !== normalizeValue(fields.get("Required automatic gates") || "")) {
      diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CONTROL_GATES", "receipt gates must exactly match the predeclared automatic gates"));
    }
    const cleanupTargets = splitPaths(fields.get("Post-merge cleanup targets") || "");
    if (cleanupTargets.length && (!hasRecordedValue(fields.get("Post-merge cleanup authority") || "") || cleanupTargets.some((target) => !allowedPaths.some((scope) => pathWithinScope(target, scope))))) {
      diagnostics.push(diagnostic(file, 1, "SDD_POST_MERGE_CLEANUP_AUTHORITY", "cleanup requires explicit authority and targets inside the pre-approved scope"));
    }
  }

  const freshnessRows = freshnessTable?.rows || [];
  const computed = computeTransitiveFreshness(freshnessRows);
  const freshnessIds = new Set(
    freshnessRows.map((row) => normalizeValue(row["Artifact ID"]).toLowerCase()),
  );
  for (const row of freshnessRows) {
    const id = normalizeValue(row["Artifact ID"]);
    const declared = normalizeValue(row.Freshness);
    const expected = computed.get(id.toLowerCase());
    if (declared !== expected) {
      diagnostics.push(
        diagnostic(file, freshnessTable.line, "SDD_FRESHNESS_MISMATCH", `${id} declares ${declared}; dependency graph requires ${expected}`),
      );
    }
    for (const dependency of splitIdentifiers(row["Depends on"] || "None")) {
      if (!freshnessIds.has(dependency.toLowerCase())) {
        diagnostics.push(
          diagnostic(
            file,
            freshnessTable.line,
            "SDD_DEPENDENCY_REFERENCE",
            `${id} depends on missing artifact ID ${dependency}`,
          ),
        );
      }
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
    if ((deliveryManifest?.rows || []).length === 0) {
      diagnostics.push(
        diagnostic(
          file,
          deliveryManifest?.line || 1,
          "SDD_DELIVERY_MANIFEST_EMPTY",
          "GATES_READY requires at least one reviewed delivery-manifest row",
        ),
      );
    }
    if (freshnessRows.length === 0) {
      diagnostics.push(
        diagnostic(
          file,
          freshnessTable?.line || 1,
          "SDD_DEPENDENCY_REGISTER_EMPTY",
          "GATES_READY requires a non-empty dependency and freshness register",
        ),
      );
    }
    const outputIds = new Set(version === 4 ? (findTable(tables, ["Artifact ID", "Role", "Production phase"])?.rows || [])
      .filter(row => normalizeValue(row.Role) === "FUTURE_OUTPUT").map(row => normalizeValue(row["Artifact ID"]).toLowerCase()) : []);
    const selectedManifestRows = (deliveryManifest?.rows || []).filter((row) =>
      !["SKIP", "DEFER", "BLOCKED"].includes(normalizeValue(row.Decision)) && !outputIds.has(normalizeValue(row["Artifact ID"]).toLowerCase()),
    );
    const uncovered = [];
    if (!freshnessIds.has("workflow")) {
      uncovered.push("workflow");
    }
    for (const targetId of targetIds) {
      if (!freshnessIds.has(targetId.toLowerCase())) {
        uncovered.push(`next target ${targetId}`);
      }
    }
    for (const row of selectedManifestRows) {
      const artifactId = normalizeValue(row["Artifact ID"]);
      if (!freshnessIds.has(artifactId.toLowerCase())) {
        uncovered.push(`manifest artifact ${artifactId}`);
      }
    }
    if (uncovered.length > 0) {
      diagnostics.push(
        diagnostic(
          file,
          freshnessTable?.line || 1,
          "SDD_DEPENDENCY_COVERAGE",
          `GATES_READY dependency register does not cover: ${uncovered.join(", ")}`,
        ),
      );
    }
    for (const row of deliveryManifest?.rows || []) {
      const decision = normalizeValue(row.Decision);
      if (["SKIP", "DEFER", "BLOCKED"].includes(decision)) {
        continue;
      }
      if (outputIds.has(normalizeValue(row["Artifact ID"]).toLowerCase())) continue;
      const review = leadingDisposition(row["Review state/link"]);
      if (!["APPROVED", "CURRENT", "JUSTIFIED"].includes(review)) {
        diagnostics.push(
          diagnostic(file, deliveryManifest.line, "SDD_UNAPPROVED_PREREQUISITE", `${normalizeValue(row.Artifact)} is not approved/current`),
        );
      }
    }
  }
  diagnostics.push(
    ...(await checkWorkflowValidatingPlan(file, absoluteFile, root, tables, fields, computed)),
  );
  return diagnostics;
}

// Version 4 keeps output obligations separate from existing inputs. Pure graph
// validation is shared by workflow and plan entry points; disk bindings are
// checked separately so neither entry point can bypass the consumption gate.
export function evaluatePhaseReadiness(roles, inputs, outputs, tasks, state, selected = []) {
  const errors = [];
  const fail = message => errors.push(message);
  const value = (row, key) => normalizeValue(row?.[key] || "");
  const ids = raw => splitIdentifiers(raw || "None").map(id => id.toLowerCase());
  const index = (rows, key, name) => {
    const map = new Map();
    for (const row of rows) {
      const id = value(row, key).toLowerCase();
      if (!/^[a-z0-9][a-z0-9_-]*$/i.test(id) || map.has(id)) fail(`${name}: missing/duplicate/invalid ID ${id}`);
      map.set(id, row);
    }
    return map;
  };
  const roleMap = index(roles, "Artifact ID", "roles");
  const inputMap = index(inputs, "Artifact ID", "inputs");
  const outputMap = index(outputs, "Artifact ID", "outputs");
  const taskMap = index(tasks, "ID", "tasks");
  const dependencies = (map, label) => {
    const closure = new Map();
    const visit = (id, stack = new Set()) => {
      if (stack.has(id)) { fail(`${label}: dependency cycle at ${id}`); return new Set(); }
      if (closure.has(id)) return closure.get(id);
      const result = new Set();
      for (const dep of ids(map.get(id)?.["Depends on"])) {
        if (!map.has(dep)) { fail(`${label}: missing dependency ${dep}`); continue; }
        result.add(dep);
        for (const ancestor of visit(dep, new Set([...stack, id]))) result.add(ancestor);
      }
      closure.set(id, result);
      return result;
    };
    for (const id of map.keys()) visit(id);
    return closure;
  };
  const taskDeps = dependencies(taskMap, "tasks");
  dependencies(roleMap, "artifacts");
  for (const id of selected.map(id => id.toLowerCase())) if (!roleMap.has(id)) fail(`Selected artifact ${id} lacks a role`);
  for (const id of [...inputMap.keys(), ...outputMap.keys()]) if (!roleMap.has(id)) fail(`Register artifact ${id} lacks a role`);
  const phases = { EXISTING: 0, IMPLEMENTATION: 1, VALIDATION: 2, CLOSURE: 3 };
  const gates = { IMPLEMENTATION: "VALIDATING", VALIDATION: "COMPLETE", CLOSURE: "ARCHIVED" };
  for (const [id, row] of roleMap) {
    const phase = value(row, "Production phase");
    const producer = value(row, "Producer task").toLowerCase();
    const role = value(row, "Role");
    if (role === "PREREQUISITE") {
      if (phase !== "EXISTING" || value(row, "Required gate") !== "GATES_READY" || producer !== "none" || !inputMap.has(id) || outputMap.has(id)) fail(`${id}: invalid prerequisite membership/phase`);
      const a = ids(row["Depends on"]).sort().join(",");
      const b = ids(inputMap.get(id)?.["Depends on"]).sort().join(",");
      if (a !== b) fail(`${id}: contradictory input dependencies`);
    } else if (role === "FUTURE_OUTPUT") {
      if (!(phase in gates) || value(row, "Required gate") !== gates[phase] || !outputMap.has(id) || inputMap.has(id)) fail(`${id}: invalid output membership/phase deadline`);
      if (phase === "IMPLEMENTATION" ? !taskMap.has(producer) : producer !== "phase") fail(`${id}: invalid producer`);
    } else fail(`${id}: unknown role`);
    if (!hasRecordedValue(row.Evidence)) fail(`${id}: missing role evidence`);
    for (const dep of ids(row["Depends on"])) {
      const parent = roleMap.get(dep);
      if (!parent) continue;
      const parentPhase = value(parent, "Production phase");
      if (phases[parentPhase] > phases[phase] || (role === "PREREQUISITE" && value(parent, "Role") === "FUTURE_OUTPUT")) fail(`${id}: dependency on later producer ${dep}`);
      if (phase === "IMPLEMENTATION" && parentPhase === "IMPLEMENTATION" && !taskDeps.get(producer)?.has(value(parent, "Producer task").toLowerCase())) fail(`${id}: output producer is not a predecessor`);
    }
  }
  const combined = [...inputs, ...outputs.map(row => ({
    ...row, "Depends on": roleMap.get(value(row, "Artifact ID").toLowerCase())?.["Depends on"] || "None",
    "Consumed version": row["Verified version"],
  }))];
  const freshness = computeTransitiveFreshness(combined);
  const ready = (id, stack = new Set()) => {
    if (stack.has(id)) return false;
    const row = outputMap.get(id);
    const outputParents = ids(roleMap.get(id)?.["Depends on"]).filter(dep => outputMap.has(dep));
    return row && value(row, "State") === "COMPLETE" && isNone(value(row, "Blocked by")) &&
      value(row, "Freshness") === "CURRENT" && freshness.get(id) === "CURRENT" &&
      /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(value(row, "Current version")) &&
      value(row, "Current version") === value(row, "Verified version") &&
      value(row, "Review state") === "APPROVED" && hasRecordedValue(row["Review evidence"]) &&
      outputParents.every(dep => ready(dep, new Set([...stack, id])));
  };
  const boundary = { VALIDATING: 1, COMPLETE: 2, ARCHIVED: 3 }[state] || 0;
  for (const [id, row] of outputMap) {
    if (!["NOT_STARTED", "IN_PROGRESS", "COMPLETE"].includes(value(row, "State"))) fail(`${id}: invalid output state`);
    if (value(row, "State") === "COMPLETE" && !ready(id)) fail(`${id}: COMPLETE output lacks exact approved/current evidence`);
    const role = roleMap.get(id);
    if (boundary >= phases[value(role, "Production phase")] && phases[value(role, "Production phase")] > 0) {
      if (!ready(id)) fail(`${id}: output is required at ${state}`);
      if (value(role, "Production phase") === "IMPLEMENTATION" && value(taskMap.get(value(role, "Producer task").toLowerCase()), "State") !== "DONE") fail(`${id}: producer is not DONE`);
    }
  }
  for (const [id, task] of taskMap) {
    if (!Object.hasOwn(task, "Required output IDs") || !value(task, "Required output IDs")) fail(`${id}: Required output IDs must be explicit`);
    const required = ids(task["Required output IDs"]);
    if (new Set(required).size !== required.length) fail(`${id}: duplicate required outputs`);
    const bindings = new Map();
    const rawBindings = value(task, "Consumed output versions");
    if (!isNone(rawBindings)) {
      for (const token of rawBindings.split(",")) {
        const match = /^([a-z0-9][a-z0-9_-]*)=([a-f0-9]{40}|[a-f0-9]{64})$/i.exec(token.trim());
        if (!match) { fail(`${id}: malformed consumed output binding`); continue; }
        const key = match[1].toLowerCase();
        if (bindings.has(key)) fail(`${id}: duplicate consumed output binding ${key}`);
        if (!required.includes(key)) fail(`${id}: binding for undeclared output ${key}`);
        bindings.set(key, match[2].toLowerCase());
      }
    }
    for (const role of roles) {
      if (value(role, "Production phase") !== "IMPLEMENTATION" || value(role, "Producer task").toLowerCase() !== id) continue;
      for (const dep of ids(role["Depends on"]).filter(dep => outputMap.has(dep))) {
        if (!required.includes(dep)) fail(`${id}: produced output dependency ${dep} must be declared in Required output IDs`);
      }
    }
    for (const output of required) {
      const role = roleMap.get(output);
      const producer = value(role, "Producer task").toLowerCase();
      if (!outputMap.has(output) || value(role, "Production phase") !== "IMPLEMENTATION" || !taskDeps.get(id)?.has(producer)) fail(`${id}: required output ${output} is not from a predecessor`);
      if (["READY", "IN_PROGRESS", "VERIFYING", "DONE"].includes(value(task, "State")) || value(task, "Next") === "NEXT") {
        if (value(taskMap.get(producer), "State") !== "DONE" || !ready(output)) fail(`${id}: required output ${output} is not ready`);
        if (bindings.get(output) !== value(outputMap.get(output), "Current version")) fail(`${id}: context does not bind ${output}`);
      }
    }
  }
  return errors;
}

async function checkV4Workflow(file, root, tables, fields, schemas, ancestors) {
  const relative = path.relative(root, file);
  const errors = [];
  const fail = message => errors.push(diagnostic(relative, 1, "SDD_PHASE_READINESS", message));
  try {
    // The ordinary router precedes plan generation. Only an explicit None in
    // an early, unbatched workflow defers the reciprocal plan-dependent gate.
    // Supplied links must always validate, and blocked/ready execution cannot
    // use this preparation-only escape hatch.
    const early = ["AWAITING_HANDOFF", "ROUTING", "MANIFEST_IN_REVIEW", "ARTIFACTS_SELECTED", "ARTIFACT_GENERATING", "ARTIFACT_IN_REVIEW"];
    if (early.includes(fields.get("State")) &&
        normalizeValue(rawControlField(tables, "Implementation plan") || "") === "None" &&
        normalizeValue(rawControlField(tables, "Review batch") || "") === "None") {
      const outputs = findTable(tables, ["Artifact ID", "State", "Current version", "Verified version", "Change impact", "Freshness", "Review state", "Review evidence", "Blocked by"]);
      if (outputs?.rows.some(row => normalizeValue(row.State) !== "NOT_STARTED")) {
        fail("A workflow with produced outputs requires its implementation plan");
      }
      return errors;
    }
    const planLink = (rawControlField(tables, "Implementation plan") || "").match(/\]\(([^)]+)\)/)?.[1];
    const planFile = await containedFile(root, file, planLink);
    const planText = await readFile(planFile, "utf8");
    if (extractMarker(planText)?.artifact !== "implementation-plan" || extractMarker(planText)?.version !== 4) throw new Error("requires v4 implementation plan");
    const planTables = parseMarkdownTables(planText);
    errors.push(...await checkSddLifecycleDocument(planFile, root, schemas, ancestors));
    const backLink = (rawControlField(planTables, "Delivery workflow") || "").match(/\]\(([^)]+)\)/)?.[1];
    if (await containedFile(root, planFile, backLink) !== await realpath(file)) throw new Error("plan/workflow links disagree");
    const roles = findTable(tables, ["Artifact ID", "Role", "Production phase", "Required gate", "Producer task", "Depends on", "Evidence"]);
    const outputs = findTable(tables, ["Artifact ID", "State", "Current version", "Verified version", "Change impact", "Freshness", "Review state", "Review evidence", "Blocked by"]);
    const inputs = findTable(tables, ["Artifact ID", "Artifact/link", "Consumed version", "Depends on"]);
    if (!roles || !outputs || !inputs) throw new Error("required role/input/output register missing");
    const manifest = findTable(tables, ["Artifact ID", "Decision", "Review state/link"]);
    const selected = (manifest?.rows || []).filter(row => !["SKIP", "DEFER", "BLOCKED"].includes(normalizeValue(row.Decision))).map(row => normalizeValue(row["Artifact ID"]));
    for (const message of evaluatePhaseReadiness(roles.rows, inputs.rows, outputs.rows, taskRows(planTables), fields.get("State"), selected)) fail(message);
    for (const row of outputs.rows) {
      if (normalizeValue(row.State) !== "COMPLETE") continue;
      const role = roles.rows.find(item => normalizeValue(item["Artifact ID"]).toLowerCase() === normalizeValue(row["Artifact ID"]).toLowerCase());
      const target = (role?.Evidence || "").match(/\]\(([^)]+)\)/)?.[1];
      const bytes = await readFile(await containedFile(root, file, target));
      const sha = normalizeValue(row["Current version"]);
      const actual = sha.length === 40 ? createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex") : createHash("sha256").update(bytes).digest("hex");
      if (actual !== sha) fail(`${row["Artifact ID"]}: output bytes differ from verified identity`);
    }
  } catch (error) { fail(`Cannot validate phase readiness: ${error.message}`); }
  return errors;
}

async function checkV4PlanLink(file, root, tables, fields, schemas, ancestors) {
  try {
    const target = (rawControlField(tables, "Delivery workflow") || "").match(/\]\(([^)]+)\)/)?.[1];
    const workflowFile = await containedFile(root, file, target);
    const text = await readFile(workflowFile, "utf8");
    if (extractMarker(text)?.artifact !== "delivery-workflow" || extractMarker(text)?.version !== 4) throw new Error("requires v4 workflow");
    const workflowTables = parseMarkdownTables(text);
    const planLink = markdownLinkTarget(rawControlField(workflowTables, "Implementation plan"));
    if (await containedFile(root, workflowFile, planLink) !== await realpath(file)) throw new Error("plan/workflow links disagree");
    return await checkSddLifecycleDocument(workflowFile, root, schemas, ancestors);
  } catch (error) { return [diagnostic(path.relative(root, file), 1, "SDD_PHASE_READINESS", error.message)]; }
}

async function containedFile(root, ownerFile, target) {
  if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || path.isAbsolute(target)) throw new Error("invalid local path");
  const absoluteRoot = await realpath(root);
  const absolute = await realpath(path.resolve(path.dirname(ownerFile), decodeURIComponent(target)));
  const relative = path.relative(absoluteRoot, absolute);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error("scope escape");
  return absolute;
}

function hasBatchValue(value) {
  return hasRecordedValue(value) && !/^(?:NOT_STARTED|NOT_SELECTED|NOT_VERIFIED|DRAFT|IN_REVIEW|STALE|BLOCKED)$/i.test(normalizeValue(value || ""));
}

// Compare only explicitly enumerated live controls. Scope, dependencies,
// contracts, risk, acceptance criteria and ordinary prose remain byte-bound.
function normativeProjection(text) {
  const controls = new Set([
    "State", "Previous state", "Status", "Previous status", "Current phase",
    "Current task", "Next ready task(s)", "Review state", "Current artifact review state",
    "Self-review state", "Self-review candidate revision", "Self-review evidence",
    "Fresh-context review state",
    "Fresh-context approved reviewers", "Fresh-context reviewed revision", "Fresh-context review evidence",
    "Human review state", "Human reviewed revision", "Human review evidence",
    "Context receipt", "Context verification", "Context source revision", "Verified source revision",
    "Verification evidence", "Verified at", "Last updated", "Actual change summary",
  ]);
  let headers = [];
  return text.split(/\r?\n/).map(line => {
    if (!/^\s*\|/.test(line)) { headers = []; return line; }
    const cells = splitMarkdownRow(line);
    if (!headers.length) { headers = cells; return line; }
    if (isSeparatorRow(cells)) return line;
    if (headers.length === 2 && headers[0] === "Field" && controls.has(normalizeValue(cells[0]))) return `| ${cells[0]} | CONTROL |`;
    if (headers.includes("ID") && headers.includes("State") && headers.includes("Depends on")) {
      return cells.map((value, index) => ["State", "Next", "Source freshness", "PR"].includes(headers[index]) ? "CONTROL" : value).join("|");
    }
    return line;
  }).join("\n");
}

async function checkReviewBatch(file, root, tables, fields, schema, schemas, ancestors) {
  const relative = path.relative(root, file);
  const errors = checkRequiredFields(relative, fields, schema.requiredFields);
  const fail = (rule, message) => errors.push(diagnostic(relative, 1, rule, message));
  const state = fields.get("State");
  const previous = fields.get("Previous state");
  errors.push(...checkTransition(relative, previous, state, schema.transitions, "batch"));
  if (!Object.hasOwn(schema.transitions, state || "")) fail("SDD_BATCH_STATE", "Unknown batch state");
  if (previous === "BLOCKED" && state !== "BLOCKED" && state !== fields.get("Resume state")) {
    fail("SDD_BATCH_RESUME", "Resume must return to the recorded pre-block state");
  }
  if (state === "BLOCKED" && (!["PREPARING", "IN_REVIEW", "ACCEPTED", "EXECUTING", "VERIFIED"].includes(fields.get("Resume state")) ||
      (previous !== "BLOCKED" && fields.get("Resume state") !== previous))) {
    fail("SDD_BATCH_RESUME", "BLOCKED requires a valid prior resume state");
  }
  for (const key of ["Batch ID", "Delivery ID"]) {
    if (!isStableIdentifier(fields.get(key))) fail("SDD_BATCH_ID", `${key} requires a stable identity`);
  }
  if (!parseGitHubRepository(fields.get("Repository"))) fail("SDD_BATCH_REPOSITORY", "Repository requires an exact GitHub repository URL");
  if (!["ADOPTION", "PLANNING", "IMPLEMENTATION", "CLOSURE", "UPGRADE"].includes(fields.get("Phase"))) fail("SDD_BATCH_PHASE", "Unsupported batch phase");
  const active = !["BLOCKED", "CANCELLED", "CLOSED"].includes(state);
  if (active && (fields.get("Authority status") !== "CURRENT" || ["Preparation authority", "Authority evidence", "Allowed paths", "Owner", "Approval owner", "Expiry/end condition", "Checkpoint", "Next action", "Action owner"].some(key => !hasBatchValue(fields.get(key))))) {
    fail("SDD_BATCH_AUTHORITY", "Active batch requires current, explicit scoped authority and expiry/end condition");
  }
  const expiry = fields.get("Expiry/end condition") || "";
  if (/^\d{4}-\d{2}-\d{2}T/.test(expiry) && (!Number.isFinite(Date.parse(expiry)) || Date.parse(expiry) <= Date.now()) && active) fail("SDD_BATCH_AUTHORITY", "Batch authority has expired");
  for (const [limit, count] of [["Transient retry limit", "Transient retry count"], ["No-progress limit", "No-progress count"]]) {
    if (fields.get(limit) !== "2" || !/^\d+$/.test(fields.get(count) || "")) fail("SDD_BATCH_RECOVERY", `${limit} must be 2 and ${count} a nonnegative integer`);
    if (active && Number(fields.get(count)) > 2) fail("SDD_BATCH_RECOVERY", "Exhausted recovery budget cannot authorize continuation");
  }
  if (active && Number(fields.get("No-progress count")) >= 2) fail("SDD_BATCH_RECOVERY", "Two no-progress rounds require escalation");
  const reviewed = ["IN_REVIEW", "ACCEPTED", "EXECUTING", "VERIFIED", "CLOSED"].includes(state);
  const accepted = ["ACCEPTED", "EXECUTING", "VERIFIED", "CLOSED"].includes(state);
  let humanRequired = true;
  if (fields.get("Phase") === "IMPLEMENTATION" && state !== "CLOSED" && fields.get("Human review state") === "NOT_APPLICABLE") {
    try {
      const linked = await containedFile(root, file, markdownLinkTarget(rawControlField(tables, "Implementation workflow")));
      const workflowText = await readFile(linked, "utf8");
      const marker = extractMarker(workflowText);
      const workflowTables = parseMarkdownTables(workflowText);
      const workflowFields = extractControlFields(workflowTables);
      const batchVersion = extractMarker(await readFile(file, "utf8"))?.version;
      const result = marker?.artifact === "delivery-workflow" && (batchVersion === 4 ? marker.version === 4 : [2, 3].includes(marker.version))
        ? await checkSddLifecycleDocument(linked, root, schemas, ancestors) : ["invalid workflow"];
      const pr = markdownLinkTarget(rawControlField(tables, "PR"));
      const targetLink = markdownLinkTarget(rawControlField(workflowTables, "Current artifact/gate"));
      humanRequired = result.length !== 0 || workflowFields.get("State") !== "DELIVERY_ACTIVE" ||
        workflowFields.get("Current review phase") !== "IMPLEMENTATION" || workflowFields.get("Implementation continuation mode") !== "AGENT_AUTO_MERGE" ||
        workflowFields.get("Implementation repository") !== fields.get("Repository") || !pr || pr !== targetLink;
      if (humanRequired) fail("SDD_BATCH_EXECUTION", "Automatic implementation batch lacks matching valid live workflow authority");
    } catch { fail("SDD_BATCH_EXECUTION", "Automatic implementation batch requires an available scoped workflow"); }
  }
  errors.push(...checkSelfReviewGate(relative, fields, reviewed));
  errors.push(...checkReviewSessionRoster(relative, fields, reviewed));
  errors.push(...checkIndependentReviewGate(relative, fields, accepted, humanRequired));
  if (reviewed && fields.get("Self-review candidate revision") !== fields.get("Candidate revision")) fail("SDD_BATCH_CANDIDATE", "Self-review must name this batch candidate");
  if (accepted && (fields.get("Fresh-context reviewed revision") !== fields.get("Candidate revision") || (humanRequired && fields.get("Human reviewed revision") !== fields.get("Candidate revision")))) fail("SDD_BATCH_CANDIDATE", "Acceptance must bind the exact batch candidate");
  if (reviewed && !isNone(fields.get("PR") || "")) {
    const repo = parseGitHubRepository(fields.get("Repository"));
    const pr = markdownLinkTarget(rawControlField(tables, "PR"));
    if (!pr || !pr.startsWith(`https://github.com/${repo}/pull/`) || !/\/pull\/[1-9]\d*$/.test(pr) || !/^[a-f0-9]{40}$/.test(fields.get("Base revision") || "") || !/^[a-f0-9]{40}$/.test(fields.get("Candidate revision") || "")) {
      fail("SDD_BATCH_CANDIDATE", "PR review requires matching repository/PR and full base/head hashes");
    }
  }
  const artifacts = findTable(tables, ["Artifact ID", "Path", "Candidate hash", "Depends on", "Required control IDs", "Disposition", "Evidence"]);
  const controls = findTable(tables, ["Control ID", "Owning source", "Satisfaction point", "Evidence", "Disposition"]);
  if (!artifacts || !controls || (reviewed && (!artifacts.rows.length || !controls.rows.length))) fail("SDD_BATCH_INVENTORY", "Batch requires artifact and control inventories; reviewed inventories cannot be empty");
  const ids = new Map(), controlIds = new Set();
  for (const row of controls?.rows || []) {
    const id = normalizeValue(row["Control ID"]).toLowerCase();
    if (!isStableIdentifier(id) || controlIds.has(id)) fail("SDD_BATCH_INVENTORY", "Control IDs must be unique stable identities");
    controlIds.add(id);
    if (["Owning source", "Satisfaction point"].some(k => !hasBatchValue(row[k]))) fail("SDD_BATCH_CONTROL", `${id} lacks its owner or satisfaction point`);
    if (accepted && (!hasBatchValue(row.Evidence) || !["APPROVED", "SATISFIED"].includes(normalizeValue(row.Disposition)))) fail("SDD_BATCH_CONTROL", `${id} lacks accepted control evidence`);
  }
  for (const row of artifacts?.rows || []) {
    const id = normalizeValue(row["Artifact ID"]).toLowerCase();
    if (!isStableIdentifier(id) || ids.has(id)) fail("SDD_BATCH_INVENTORY", "Artifact IDs must be unique stable identities");
    ids.set(id, splitIdentifiers(row["Depends on"]).map(x => x.toLowerCase()));
    if (!splitIdentifiers(row["Required control IDs"]).length || splitIdentifiers(row["Required control IDs"]).some(x => !controlIds.has(x.toLowerCase()))) fail("SDD_BATCH_CONTROL", `${id} must reference known required controls`);
    const target = normalizeValue(row.Path);
    const allowed = splitPaths(fields.get("Allowed paths") || "");
    if (!target || target.split(/[\\/]/).includes("..") || path.isAbsolute(target) || !allowed.some(scope => target === scope || target.startsWith(`${scope.replace(/\/$/, "")}/`))) fail("SDD_BATCH_SCOPE", `${id} path is outside explicit allowed paths`);
    if (reviewed) {
      try {
        const absolute = await containedFile(root, path.join(root, "batch-root"), target);
        const resolvedTarget = path.relative(await realpath(root), absolute).split(path.sep).join("/");
        if (!allowed.some(scope => resolvedTarget === scope || resolvedTarget.startsWith(`${scope.replace(/\/$/, "")}/`))) {
          fail("SDD_BATCH_SCOPE", `${id} resolved artifact is outside explicit allowed paths`);
        }
        let content = await readFile(absolute);
        const snapshot = normalizeValue(row["Reviewed snapshot"] || "");
        if (!isNone(snapshot)) {
          const snapshotFile = await containedFile(root, path.join(root, "batch-root"), snapshot);
          const original = await readFile(snapshotFile);
          if (!hasBatchValue(row["Control delta evidence"]) || normativeProjection(content.toString("utf8")) !== normativeProjection(original.toString("utf8"))) {
            fail("SDD_BATCH_CONTROL_DELTA", `${id} changed normative content or lacks exact control-delta evidence`);
          }
          content = original;
        }
        const declared = normalizeValue(row["Candidate hash"]);
        const sha256 = createHash("sha256").update(content).digest("hex");
        const blob = createHash("sha1").update(`blob ${content.length}\0`).update(content).digest("hex");
        if (declared !== `sha256:${sha256}` && declared !== `git:${blob}`) fail("SDD_BATCH_HASH", `${id} candidate hash does not match its current content`);
      } catch { fail("SDD_BATCH_SCOPE", `${id} candidate is unavailable or escapes the root`); }
    }
    if (accepted && (normalizeValue(row.Disposition) !== "APPROVED" || !hasBatchValue(row.Evidence))) fail("SDD_BATCH_CONTROL", `${id} lacks exact approval evidence`);
  }
  const visited = new Set(), stack = new Set();
  const visit = id => {
    if (stack.has(id)) { fail("SDD_BATCH_DEPENDENCY", "Artifact dependency cycle"); return; }
    if (visited.has(id)) return;
    visited.add(id); stack.add(id);
    for (const dependency of ids.get(id) || []) {
      if (!ids.has(dependency)) fail("SDD_BATCH_DEPENDENCY", `${id} depends on unknown ${dependency}`);
      else visit(dependency);
    }
    stack.delete(id);
  };
  for (const id of ids.keys()) visit(id);
  if (accepted && !isNone(fields.get("Unresolved finding IDs") || "")) fail("SDD_BATCH_FINDINGS", "Unresolved findings prevent acceptance");
  if (["EXECUTING", "VERIFIED", "CLOSED"].includes(state) && (!hasBatchValue(fields.get("Execution authority")) || fields.get("Inputs freshness") !== "CURRENT" || fields.get("Phase prerequisites") !== "SATISFIED")) fail("SDD_BATCH_EXECUTION", "Execution requires explicit authority, current inputs and phase prerequisites");
  if (["VERIFIED", "CLOSED"].includes(state) && !hasBatchValue(fields.get("Completion evidence"))) fail("SDD_BATCH_COMPLETION", "Verified state requires actual completion evidence");
  if (["CLOSED", "CANCELLED"].includes(state) && !hasBatchValue(fields.get("Closure acceptance"))) fail("SDD_BATCH_COMPLETION", "Closure/cancellation requires owner acceptance");
  return errors;
}

async function checkBatchReference(file, root, text, tables, schemas, ancestors) {
  const raw = rawControlField(tables, "Review batch");
  if (!raw || normalizeValue(raw) === "None") return [];
  const relative = path.relative(root, file);
  const failure = (message) => [diagnostic(relative, 1, "SDD_BATCH_REFERENCE", message)];
  const target = markdownLinkTarget(raw);
  if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || path.isAbsolute(target)) {
    return failure("Review batch requires None or one local project-contained Markdown link");
  }
  try {
    const absoluteRoot = await realpath(root);
    const absolute = await realpath(path.resolve(path.dirname(file), decodeURIComponent(target)));
    const within = path.relative(absoluteRoot, absolute);
    if (within === ".." || within.startsWith(`..${path.sep}`) || path.isAbsolute(within)) {
      return failure("Review batch escapes the project root");
    }
    const batchText = await readFile(absolute, "utf8");
    const marker = extractMarker(batchText);
    if (marker?.artifact !== "review-batch" || marker.version !== extractMarker(text)?.version || !schemas.artifacts["review-batch"]) {
      return failure("Review batch must resolve to a supported matching-version review-batch record");
    }
    const result = await checkSddLifecycleDocument(absolute, root, schemas, ancestors);
    const batchTables = parseMarkdownTables(batchText);
    const batchFields = extractControlFields(batchTables);
    const callerFields = extractControlFields(tables);
    const advanced = ["READY", "IMPLEMENTING", "VALIDATING", "COMPLETE"].includes(callerFields.get("Status")) ||
      ["GATES_READY", "DELIVERY_ACTIVE", "VALIDATING", "COMPLETE", "ARCHIVED"].includes(callerFields.get("State"));
    if (advanced && !["ACCEPTED", "EXECUTING", "VERIFIED", "CLOSED"].includes(batchFields.get("State"))) {
      result.push(...failure("Caller cannot advance using an unaccepted batch"));
    }
    const inventory = findTable(batchTables, ["Artifact ID", "Path", "Candidate hash"]);
    const callerPath = path.relative(absoluteRoot, await realpath(file)).split(path.sep).join("/");
    if (!(inventory?.rows || []).some(row => normalizeValue(row.Path) === callerPath)) {
      result.push(...failure("Batch inventory does not contain this governed artifact"));
    }
    const callerMarker = extractMarker(text);
    if (callerMarker?.artifact === "implementation-plan") {
      for (const task of taskRows(tables)) {
        if (!["IN_PROGRESS", "VERIFYING", "DONE"].includes(normalizeValue(task.State))) continue;
        const id = normalizeValue(task.ID);
        const parts = text.split(/<!--\s*sdd-task-spec:\s*([A-Za-z0-9_-]+)\s*-->/);
        const position = parts.findIndex((part, index) => index % 2 === 1 && part === id);
        const context = extractControlFields(parseMarkdownTables(position < 0 ? "" : parts[position + 1]));
        const verified = Date.parse(context.get("Verified at") || "");
        if (context.get("Context receipt") !== "APPROVED" || context.get("Context verification") !== "CURRENT" ||
            !/^[a-f0-9]{40}$/.test(context.get("Verified source revision") || "") ||
            !hasBatchValue(context.get("Verification evidence")) || !Number.isFinite(verified) || verified > Date.now()) {
          result.push(diagnostic(relative, 1, "SDD_BATCH_TASK_CONTEXT", `${id} requires its own approved context and actual current source verification`));
        }
      }
    }
    return result;
  } catch {
    return failure("Review batch path is invalid, unavailable or unreadable");
  }
}

export async function checkSddLifecycleDocument(file, root, schemas, ancestors = new Set()) {
  // Bidirectional workflow/batch links are expected. Validate each node once
  // on this traversal path; callers still validate every edge and accumulate
  // all node diagnostics before the outer validation can succeed.
  const identity = await realpath(file);
  if (ancestors.has(identity)) return [];
  ancestors = new Set([...ancestors, identity]);
  const text = await readFile(file, "utf8");
  const marker = extractMarker(text);
  if (!marker) {
    return [];
  }
  const relative = path.relative(root, file);
  if (relative.split(path.sep)[0] === "templates") {
    return [];
  }
  const selectedSchemas = marker.version === 2 && schemas.schemaVersion >= 3
    ? LEGACY_SCHEMAS : marker.version === 3 && schemas.schemaVersion >= 4 ? V3_SCHEMAS : schemas;
  if (marker.version !== selectedSchemas.schemaVersion) {
    return [
      diagnostic(relative, 1, "SDD_SCHEMA_VERSION", `artifact schema ${marker.version} does not match supported schema ${schemas.schemaVersion}`),
    ];
  }
  const schema = selectedSchemas.artifacts[marker.artifact];
  if (!schema) {
    return [diagnostic(relative, 1, "SDD_SCHEMA_UNKNOWN", `unknown artifact schema: ${marker.artifact}`)];
  }
  const tables = parseMarkdownTables(text);
  const fields = extractControlFields(tables);
  if (marker.artifact === "review-batch") return checkReviewBatch(file, root, tables, fields, schema, schemas, ancestors);
  const batchDiagnostics = marker.version >= 3 && marker.artifact !== "review-batch"
    ? await checkBatchReference(file, root, text, tables, schemas, ancestors) : [];
  if (marker.artifact === "implementation-plan") {
    return [...batchDiagnostics, ...checkImplementationPlan(relative, marker, text, tables, fields, schema),
      ...(marker.version === 4 ? await checkV4PlanLink(file, root, tables, fields, schemas, ancestors) : [])];
  }
  if (marker.artifact === "delivery-workflow") {
    return [...batchDiagnostics, ...await checkDeliveryWorkflow(relative, file, root, text, tables, fields, schema, marker.version),
      ...(marker.version === 4 ? await checkV4Workflow(file, root, tables, fields, schemas, ancestors) : [])];
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
