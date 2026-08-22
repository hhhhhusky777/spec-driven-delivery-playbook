#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { JSDOM } from "jsdom";

import {
  REPOSITORY_ROOT,
  collectFiles,
  parseFencedBlocks,
} from "./documentation-quality.mjs";

const MARKDOWN_EXTENSIONS = new Set([".md", ".markdown", ".mdx"]);
let mermaidPromise;

async function loadMermaid() {
  if (!mermaidPromise) {
    const dom = new JSDOM("<!doctype html><html><body></body></html>");
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    mermaidPromise = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
      return mermaid;
    });
  }
  return mermaidPromise;
}

export async function validateMermaidBlocks(files, root = REPOSITORY_ROOT) {
  const diagnostics = [];
  const mermaid = await loadMermaid();
  for (const file of files) {
    const text = await readFile(file, "utf8");
    const { blocks } = parseFencedBlocks(text);
    for (const block of blocks.filter((candidate) => candidate.language === "mermaid")) {
      try {
        await mermaid.parse(block.content, { suppressErrors: false });
      } catch (error) {
        const message = error instanceof Error ? error.message.split("\n", 1)[0] : String(error);
        diagnostics.push({
          file: path.relative(root, file).split(path.sep).join("/"),
          line: block.startLine,
          rule: "MERMAID_SYNTAX",
          message,
        });
      }
    }
  }
  return diagnostics;
}

async function main() {
  const files = (await collectFiles(REPOSITORY_ROOT)).filter((file) =>
    MARKDOWN_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );
  const diagnostics = await validateMermaidBlocks(files);
  if (diagnostics.length > 0) {
    for (const item of diagnostics) {
      console.error(`${item.file}:${item.line} [${item.rule}] ${item.message}`);
    }
    process.exitCode = 1;
    return;
  }
  console.log("Mermaid syntax: OK");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
