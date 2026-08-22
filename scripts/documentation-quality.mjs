#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REPOSITORY_ROOT = path.resolve(SCRIPT_DIR, "..");
const CONFIG_PATH = path.join(REPOSITORY_ROOT, "config", "documentation-quality.json");

const MARKDOWN_EXTENSIONS = new Set([".md", ".markdown", ".mdx"]);
const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".js",
  ".json",
  ".jsonc",
  ".markdown",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);
const SKIPPED_DIRECTORIES = new Set([".git", "node_modules"]);
const ALLOWED_HTML_TAGS = new Set([
  "a",
  "abbr",
  "b",
  "blockquote",
  "br",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "kbd",
  "li",
  "ol",
  "p",
  "pre",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "ul",
]);

const SECRET_PATTERNS = [
  {
    name: "PRIVATE_KEY",
    pattern: /-----BEGIN (?:EC |OPENSSH |RSA |DSA )?PRIVATE KEY-----/,
  },
  { name: "AWS_ACCESS_KEY", pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "GITHUB_TOKEN", pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{40,})\b/ },
  {
    name: "EMBEDDED_CREDENTIAL_URL",
    pattern: /\b[a-z][a-z0-9+.-]*:\/\/[^\s/:]+:[^\s/@]+@/i,
  },
  {
    name: "BEARER_TOKEN",
    pattern: /\bAuthorization\s*:\s*Bearer\s+[A-Za-z0-9._~-]{20,}/i,
  },
  {
    name: "ASSIGNED_SECRET",
    pattern: /\b(?:api[_-]?key|client[_-]?secret|password|secret|token)\s*[:=]\s*["']?[A-Za-z0-9._~+/=-]{16,}/i,
  },
];

const LOCAL_PATH_PATTERNS = [
  { name: "MAC_USER_PATH", pattern: /(?:^|[\s('"`])\/Users\/[^\s/]+\// },
  { name: "LINUX_USER_PATH", pattern: /(?:^|[\s('"`])\/home\/[^\s/]+\// },
  { name: "WINDOWS_USER_PATH", pattern: /\b[A-Za-z]:\\Users\\[^\s\\]+\\/ },
  { name: "FILE_URI", pattern: /\bfile:\/\//i },
  { name: "TEMP_PATH", pattern: /(?:^|[\s('"`])\/(?:private\/)?tmp\// },
  { name: "MAC_TEMP_PATH", pattern: /(?:^|[\s('"`])\/private\/var\/folders\// },
];

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function diagnostic(file, line, rule, message) {
  return { file: toPosix(file), line, rule, message };
}

export async function loadConfig(configPath = CONFIG_PATH) {
  return JSON.parse(await readFile(configPath, "utf8"));
}

export async function collectFiles(root = REPOSITORY_ROOT) {
  const result = [];

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      if (entry.isDirectory() && SKIPPED_DIRECTORIES.has(entry.name)) {
        continue;
      }
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolute);
      } else if (entry.isFile()) {
        result.push(absolute);
      }
    }
  }

  await visit(root);
  return result;
}

export function parseFencedBlocks(text) {
  const lines = text.split(/\r?\n/);
  const blocks = [];
  const diagnostics = [];
  let current = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (current === null) {
      const opening = line.match(/^ {0,3}(`{3,}|~{3,})\s*([^\s`]*)?.*$/);
      if (opening) {
        current = {
          marker: opening[1][0],
          length: opening[1].length,
          language: (opening[2] || "").toLowerCase(),
          startLine: index + 1,
          lines: [],
        };
      }
      continue;
    }

    const closingPattern = new RegExp(
      `^ {0,3}${current.marker === "`" ? "`" : "~"}{${current.length},}\\s*$`,
    );
    if (closingPattern.test(line)) {
      blocks.push({ ...current, content: current.lines.join("\n") });
      current = null;
    } else {
      current.lines.push(line);
    }
  }

  if (current !== null) {
    diagnostics.push(
      diagnostic("", current.startLine, "UNBALANCED_FENCE", "code fence is not closed"),
    );
  }
  return { blocks, diagnostics };
}

function lineNumberAt(text, offset) {
  return text.slice(0, offset).split(/\r?\n/).length;
}

function maskFencedContent(text) {
  const lines = text.split(/\r?\n/);
  let fence = null;
  return lines
    .map((line) => {
      if (fence === null) {
        const opening = line.match(/^ {0,3}(`{3,}|~{3,})/);
        if (opening) {
          fence = { character: opening[1][0], length: opening[1].length };
          return "";
        }
        return line;
      }
      const closingPattern = new RegExp(
        `^ {0,3}${fence.character === "`" ? "`" : "~"}{${fence.length},}\\s*$`,
      );
      if (closingPattern.test(line)) {
        fence = null;
      }
      return "";
    })
    .join("\n");
}

export function extractMarkdownLinks(text) {
  const links = [];
  const visibleText = maskFencedContent(text);
  const inline = /!?\[[^\]]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+["'][^)]*["'])?\s*\)/g;
  const reference = /^\s*\[[^\]]+\]:\s*(<[^>]+>|\S+)/gm;
  for (const pattern of [inline, reference]) {
    for (const match of visibleText.matchAll(pattern)) {
      const raw = match[1].replace(/^<|>$/g, "");
      links.push({ target: raw, line: lineNumberAt(visibleText, match.index || 0) });
    }
  }
  return links;
}

function githubHeadingSlugs(text) {
  const counts = new Map();
  const slugs = new Set();
  for (const line of maskFencedContent(text).split(/\r?\n/)) {
    const heading = line.match(/^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
    if (!heading) {
      continue;
    }
    const base = heading[1]
      .replace(/!?(?:\[([^\]]+)\]\([^)]*\))/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/[`*_~]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s_-]/gu, "")
      .replace(/\s/g, "-");
    const seen = counts.get(base) || 0;
    counts.set(base, seen + 1);
    slugs.add(seen === 0 ? base : `${base}-${seen}`);
  }
  return slugs;
}

function isExternalTarget(target) {
  return /^(?:https?:|mailto:|tel:|data:)/i.test(target);
}

export async function checkLocalLinks(markdownFiles, root = REPOSITORY_ROOT) {
  const diagnostics = [];
  for (const file of markdownFiles) {
    const text = await readFile(file, "utf8");
    for (const { target, line } of extractMarkdownLinks(text)) {
      if (isExternalTarget(target)) {
        continue;
      }
      const hashIndex = target.indexOf("#");
      const rawPath = hashIndex === -1 ? target : target.slice(0, hashIndex);
      const rawFragment = hashIndex === -1 ? "" : target.slice(hashIndex + 1);
      let decodedPath;
      let fragment;
      try {
        decodedPath = decodeURIComponent(rawPath.split("?", 1)[0]);
        fragment = decodeURIComponent(rawFragment).toLowerCase();
      } catch {
        diagnostics.push(
          diagnostic(path.relative(root, file), line, "LOCAL_LINK", `invalid encoding: ${target}`),
        );
        continue;
      }
      const destination = decodedPath
        ? decodedPath.startsWith("/")
          ? path.resolve(root, decodedPath.slice(1))
          : path.resolve(path.dirname(file), decodedPath)
        : file;
      try {
        await stat(destination);
      } catch {
        diagnostics.push(
          diagnostic(path.relative(root, file), line, "LOCAL_LINK", `missing target: ${target}`),
        );
        continue;
      }
      if (rawFragment && MARKDOWN_EXTENSIONS.has(path.extname(destination).toLowerCase())) {
        const slugs = githubHeadingSlugs(await readFile(destination, "utf8"));
        if (!slugs.has(fragment)) {
          diagnostics.push(
            diagnostic(
              path.relative(root, file),
              line,
              "LOCAL_ANCHOR",
              `missing Markdown heading: ${target}`,
            ),
          );
        }
      }
    }
  }
  return diagnostics;
}

function isWithinConfiguredRoot(relativeFile, roots) {
  const normalized = toPosix(relativeFile);
  return roots.some((root) => normalized === root || normalized.startsWith(`${root}/`));
}

function lineMatchesAllowlist(line, allowlist) {
  return allowlist.some((entry) => new RegExp(entry).test(line));
}

export function checkMarkdownContent(relativeFile, text, config) {
  const diagnostics = [];
  const { diagnostics: fenceDiagnostics } = parseFencedBlocks(text);
  diagnostics.push(...fenceDiagnostics.map((item) => ({ ...item, file: toPosix(relativeFile) })));

  const templateFile = isWithinConfiguredRoot(relativeFile, config.templateRoots);
  const lines = maskFencedContent(text).split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (templateFile) {
      continue;
    }
    for (const match of line.matchAll(/<([^>\n]+)>/g)) {
      const tagName = match[1].replace(/^\//, "").split(/[\s/]/, 1)[0].toLowerCase();
      if (
        /^(?:https?:|mailto:)/i.test(match[1]) ||
        ALLOWED_HTML_TAGS.has(tagName) ||
        lineMatchesAllowlist(match[0], config.placeholderAllowlist)
      ) {
        continue;
      }
      diagnostics.push(
        diagnostic(relativeFile, index + 1, "PLACEHOLDER", `unresolved token: ${match[0]}`),
      );
    }
  }
  return diagnostics;
}

export function checkSensitiveContent(relativeFile, text, config) {
  const diagnostics = [];
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    for (const { name, pattern } of SECRET_PATTERNS) {
      if (pattern.test(line)) {
        diagnostics.push(
          diagnostic(relativeFile, index + 1, "LIKELY_SECRET", `${name} pattern detected`),
        );
      }
    }
    if (!lineMatchesAllowlist(line, config.localPathAllowlist)) {
      for (const { name, pattern } of LOCAL_PATH_PATTERNS) {
        if (pattern.test(line)) {
          diagnostics.push(
            diagnostic(relativeFile, index + 1, "LOCAL_PATH", `${name} pattern detected`),
          );
        }
      }
    }
  }
  return diagnostics;
}

function isTextFile(file) {
  return TEXT_EXTENSIONS.has(path.extname(file).toLowerCase());
}

export async function runBlockingChecks(root = REPOSITORY_ROOT, config) {
  const resolvedConfig = config || (await loadConfig());
  const files = await collectFiles(root);
  const markdownFiles = files.filter((file) => MARKDOWN_EXTENSIONS.has(path.extname(file).toLowerCase()));
  const diagnostics = await checkLocalLinks(markdownFiles, root);

  for (const file of files.filter(isTextFile)) {
    const relativeFile = toPosix(path.relative(root, file));
    const text = await readFile(file, "utf8");
    diagnostics.push(...checkSensitiveContent(relativeFile, text, resolvedConfig));
    if (MARKDOWN_EXTENSIONS.has(path.extname(file).toLowerCase())) {
      diagnostics.push(...checkMarkdownContent(relativeFile, text, resolvedConfig));
    }
  }
  return diagnostics;
}

export async function collectExternalLinks(root = REPOSITORY_ROOT, config) {
  const resolvedConfig = config || (await loadConfig());
  const files = (await collectFiles(root)).filter((file) =>
    MARKDOWN_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );
  const exclusions = resolvedConfig.externalLinkExclusions.map((entry) => new RegExp(entry));
  const links = new Map();
  for (const file of files) {
    const text = await readFile(file, "utf8");
    for (const { target, line } of extractMarkdownLinks(text)) {
      if (!/^https?:/i.test(target) || exclusions.some((pattern) => pattern.test(target))) {
        continue;
      }
      if (!links.has(target)) {
        links.set(target, { file: toPosix(path.relative(root, file)), line });
      }
    }
  }
  return links;
}

export async function fetchWithRetry(url, options, fetchImplementation = fetch) {
  let lastResult = null;
  for (let attempt = 0; attempt <= options.retries; attempt += 1) {
    try {
      const response = await fetchImplementation(url, {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent": options.userAgent,
          Range: "bytes=0-0",
        },
        signal: AbortSignal.timeout(options.timeoutMs),
      });
      try {
        await response.body?.cancel();
      } catch {
        // The status is still valid evidence when a remote stream cannot be cancelled cleanly.
      }
      lastResult = { ok: response.status >= 200 && response.status < 400, status: response.status };
      if (lastResult.ok || ![408, 425, 429, 500, 502, 503, 504].includes(response.status)) {
        return lastResult;
      }
    } catch (error) {
      lastResult = { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
    if (attempt < options.retries) {
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
    }
  }
  return lastResult;
}

export async function checkExternalLinks(root = REPOSITORY_ROOT, config) {
  const resolvedConfig = config || (await loadConfig());
  const links = [...(await collectExternalLinks(root, resolvedConfig)).entries()];
  const failures = [];
  let cursor = 0;

  async function worker() {
    while (cursor < links.length) {
      const index = cursor;
      cursor += 1;
      const [url, source] = links[index];
      const result = await fetchWithRetry(url, resolvedConfig.externalLinks);
      if (!result?.ok) {
        failures.push({ url, source, result });
      }
    }
  }

  const workerCount = Math.min(resolvedConfig.externalLinks.concurrency, links.length || 1);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return { checked: links.length, failures };
}

function printDiagnostics(diagnostics) {
  for (const item of diagnostics) {
    console.error(`${item.file}:${item.line} [${item.rule}] ${item.message}`);
  }
}

async function main() {
  const command = process.argv[2] || "check";
  if (command === "check") {
    const diagnostics = await runBlockingChecks();
    if (diagnostics.length > 0) {
      printDiagnostics(diagnostics);
      process.exitCode = 1;
      return;
    }
    console.log("documentation structure: links, anchors, fences, placeholders, secrets, and paths OK");
    return;
  }
  if (command === "external") {
    const { checked, failures } = await checkExternalLinks();
    for (const failure of failures) {
      const detail = failure.result?.status || failure.result?.error || "unknown failure";
      console.error(
        `${failure.source.file}:${failure.source.line} [EXTERNAL_LINK] ${failure.url} (${detail})`,
      );
    }
    console.log(`external links checked: ${checked}; advisory failures: ${failures.length}`);
    process.exitCode = failures.length > 0 ? 1 : 0;
    return;
  }
  console.error(`unknown command: ${command}`);
  process.exitCode = 2;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
