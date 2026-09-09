#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import {
  REPOSITORY_ROOT,
} from "./documentation-quality.mjs";
import { validateMermaidBlocks } from "./check-mermaid.mjs";

const MARKDOWN_EXTENSIONS = new Set([".md", ".markdown", ".mdx"]);

function run(command, args) {
  execFileSync(command, args, {
    cwd: REPOSITORY_ROOT,
    env: {
      ...process.env,
      PATH: `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`,
    },
    stdio: "inherit",
  });
}

function gitOutput(args) {
  return execFileSync("git", args, {
    cwd: REPOSITORY_ROOT,
    encoding: "utf8",
  }).trim();
}

async function existingChangedFiles(base, head) {
  const output = gitOutput([
    "diff",
    "--name-only",
    "--diff-filter=ACMR",
    `${base}...${head}`,
  ]);
  const files = output ? output.split("\n") : [];
  const existing = [];
  for (const file of files) {
    const absolute = path.join(REPOSITORY_ROOT, file);
    try {
      if ((await stat(absolute)).isFile()) {
        existing.push({ absolute, relative: file });
      }
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }
  }
  return existing;
}

async function main() {
  const [base, head = "HEAD"] = process.argv.slice(2);
  if (!base) {
    throw new Error("usage: pr-fast-validation.mjs <base-revision> [head-revision]");
  }

  run("git", ["diff", "--check", `${base}...${head}`]);
  const changed = await existingChangedFiles(base, head);
  const markdown = changed.filter(({ relative }) =>
    MARKDOWN_EXTENSIONS.has(path.extname(relative).toLowerCase()),
  );
  const changedTests = changed.filter(({ relative }) =>
    /^tests\/.+\.test\.mjs$/.test(relative),
  );

  if (markdown.length > 0) {
    const executable = path.join(
      REPOSITORY_ROOT,
      "node_modules",
      ".bin",
      process.platform === "win32" ? "markdownlint-cli2.cmd" : "markdownlint-cli2",
    );
    run(executable, ["--no-globs", ...markdown.map(({ relative }) => `:${relative}`)]);
    const diagnostics = await validateMermaidBlocks(
      markdown.map(({ absolute }) => absolute),
    );
    if (diagnostics.length > 0) {
      for (const item of diagnostics) {
        console.error(`${item.file}:${item.line} [${item.rule}] ${item.message}`);
      }
      process.exitCode = 1;
      return;
    }
  }

  if (changedTests.length > 0) {
    run(process.execPath, ["--test", ...changedTests.map(({ relative }) => relative)]);
  }

  console.log(
    `Fast validation: ${changed.length} changed files, ${markdown.length} Markdown files, ${changedTests.length} changed test files`,
  );
}

await main();
