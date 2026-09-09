import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validator = path.join(repositoryRoot, "scripts", "pr-fast-validation.mjs");

function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "sdd-fast-validation-"));
  t.after(() => rm(root, { force: true, recursive: true }));
  git(root, ["init", "--quiet"]);
  git(root, ["config", "user.email", "tests@example.invalid"]);
  git(root, ["config", "user.name", "SDD Tests"]);
  await mkdir(path.join(root, "tests"));
  await writeFile(path.join(root, "changed.md"), "# Initial\n");
  await writeFile(path.join(root, "unchanged.md"), "#Broken unchanged Markdown\n");
  await writeFile(
    path.join(root, "tests", "changed.test.mjs"),
    'import test from "node:test";\ntest("changed passes", () => {});\n',
  );
  await writeFile(
    path.join(root, "tests", "unchanged.test.mjs"),
    'import assert from "node:assert/strict";\nimport test from "node:test";\ntest("must stay excluded", () => assert.fail());\n',
  );
  git(root, ["add", "."]);
  git(root, ["commit", "--quiet", "-m", "base"]);
  return { base: git(root, ["rev-parse", "HEAD"]), root };
}

function runValidator(root, base) {
  const env = { ...process.env, SDD_VALIDATION_ROOT: root };
  delete env.NODE_TEST_CONTEXT;
  return spawnSync(process.execPath, [validator, base, "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env,
  });
}

async function commit(root, files, message) {
  for (const [relative, content] of Object.entries(files)) {
    await writeFile(path.join(root, relative), content);
  }
  git(root, ["add", "."]);
  git(root, ["commit", "--quiet", "-m", message]);
}

test("fast validation checks changed files and excludes unchanged failures", async (t) => {
  const { base, root } = await fixture(t);
  await commit(root, {
    "changed.md": "# Changed\n",
    "tests/changed.test.mjs": 'import test from "node:test";\ntest("changed passes", () => {});\n',
  }, "valid change");

  const result = runValidator(root, base);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Fast validation: 1 changed files, 1 Markdown files, 0 changed test files/);
});

test("fast validation rejects invalid changed Markdown", async (t) => {
  const { base, root } = await fixture(t);
  await commit(root, { "changed.md": "#Broken changed Markdown\n" }, "invalid Markdown");

  const result = runValidator(root, base);
  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}\n${result.stderr}`, /MD018|space after hash/i);
});

test("fast validation rejects changed-line whitespace errors", async (t) => {
  const { base, root } = await fixture(t);
  await commit(root, { "changed.md": "# Changed \n" }, "invalid whitespace");

  const result = runValidator(root, base);
  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}\n${result.stderr}`, /trailing whitespace/i);
});

test("fast validation rejects invalid changed Mermaid", async (t) => {
  const { base, root } = await fixture(t);
  await commit(root, {
    "changed.md": "# Changed\n\n```mermaid\nflowchart TD\n    A -->\n```\n",
  }, "invalid Mermaid");

  const result = runValidator(root, base);
  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}\n${result.stderr}`, /MERMAID_SYNTAX/);
});

test("fast validation executes and propagates changed test failures", async (t) => {
  const { base, root } = await fixture(t);
  await commit(root, {
    "tests/changed.test.mjs": 'import assert from "node:assert/strict";\nimport test from "node:test";\ntest("changed fails", () => assert.fail());\n',
  }, "failing changed test");

  const result = runValidator(root, base);
  assert.notEqual(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(`${result.stdout}\n${result.stderr}`, /changed fails/);
});
