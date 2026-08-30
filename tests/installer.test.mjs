import assert from "node:assert/strict";
import { access, cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INSTALLER = path.join(REPOSITORY_ROOT, "install-sdd.sh");

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  assert.equal(
    result.status,
    0,
    `${command} ${args.join(" ")} failed:\n${result.stdout}\n${result.stderr}`,
  );
  return result.stdout;
}

function runInstaller(project, args = []) {
  return spawnSync("bash", ["install-sdd.sh", ...args], {
    cwd: project,
    encoding: "utf8",
  });
}

async function temporaryDirectory(t, prefix) {
  const directory = await mkdtemp(path.join(os.tmpdir(), prefix));
  t.after(async () => rm(directory, { recursive: true, force: true }));
  return directory;
}

async function createPlaybookFixture(t) {
  const repository = await temporaryDirectory(t, "sdd-installer-source-");
  for (const name of ["sdd-project-adoption", "sdd-project-workflow"]) {
    const directory = path.join(repository, "skills", name);
    await mkdir(directory, { recursive: true });
    await writeFile(
      path.join(directory, "SKILL.md"),
      `---\nname: ${name}\ndescription: Fixture skill.\n---\n\n# Fixture\n`,
      "utf8",
    );
  }
  run("git", ["init", "-b", "main"], repository);
  run("git", ["config", "user.name", "Installer Test"], repository);
  run("git", ["config", "user.email", "installer@example.test"], repository);
  run("git", ["add", "."], repository);
  run("git", ["commit", "-m", "fixture skills"], repository);
  const firstRevision = run("git", ["rev-parse", "HEAD"], repository).trim();
  await writeFile(path.join(repository, "README.md"), "# Fixture update\n", "utf8");
  run("git", ["add", "README.md"], repository);
  run("git", ["commit", "-m", "fixture update"], repository);
  const latestRevision = run("git", ["rev-parse", "HEAD"], repository).trim();
  return { repository, firstRevision, latestRevision };
}

async function createTargetProject(t) {
  const project = await temporaryDirectory(t, "sdd installer target ");
  run("git", ["init", "-b", "main"], project);
  await cp(INSTALLER, path.join(project, "install-sdd.sh"));
  return project;
}

function guideValue(guide, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = guide.match(new RegExp(`^\\| ${escaped} \\| ` + "`([^`]*)`" + ` \\|$`, "m"));
  assert.ok(match, `missing guide field: ${label}`);
  return match[1];
}

test("installer resolves latest main, installs adoption skill, and emits one guide prompt", async (t) => {
  const source = await createPlaybookFixture(t);
  const project = await createTargetProject(t);
  const result = runInstaller(project, ["--repository", source.repository]);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Follow \.sdd-runtime\/agent-guide\.md exactly\./);
  const guide = await readFile(path.join(project, ".sdd-runtime", "agent-guide.md"), "utf8");
  assert.equal(guideValue(guide, "Manifest state detected"), "ABSENT");
  assert.equal(guideValue(guide, "Required skill"), "sdd-project-adoption");
  assert.equal(guideValue(guide, "Requested revision"), "main");
  assert.equal(guideValue(guide, "Resolved revision"), source.latestRevision);
  assert.doesNotMatch(guide, /^- Next action:/m);
  await access(path.join(project, ".agents", "skills", "sdd-project-adoption", "SKILL.md"));
  assert.equal(run("git", ["status", "--short"], project), "");

  const checkout = guideValue(guide, "Playbook checkout");
  await access(checkout);
  const repeated = runInstaller(project, ["--repository", source.repository]);
  assert.notEqual(repeated.status, 0);
  assert.match(repeated.stderr, /checkout is still pending/);
  await access(checkout);

  const cleanup = runInstaller(project, ["--cleanup"]);
  assert.equal(cleanup.status, 0, cleanup.stderr);
  await assert.rejects(access(checkout));
  const cleanedGuide = await readFile(
    path.join(project, ".sdd-runtime", "agent-guide.md"),
    "utf8",
  );
  assert.equal(guideValue(cleanedGuide, "Cleanup state"), "COMPLETE");
  const repeatedCleanup = runInstaller(project, ["--cleanup"]);
  assert.equal(repeatedCleanup.status, 0, repeatedCleanup.stderr);
});

test("installed and active manifests select workflow skill and preserve their pinned revision", async (t) => {
  const source = await createPlaybookFixture(t);
  for (const state of ["INSTALLED", "ACTIVE"]) {
    const project = await createTargetProject(t);
    const manifest = path.join(
      project,
      ".github",
      "spec-driven-delivery",
      "project-adoption-manifest.md",
    );
    await mkdir(path.dirname(manifest), { recursive: true });
    await writeFile(
      manifest,
      `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`${state}\` |\n| Playbook revision | \`${source.firstRevision}\` |\n`,
      "utf8",
    );

    const result = runInstaller(project, ["--repository", source.repository]);
    assert.equal(result.status, 0, result.stderr);
    const guide = await readFile(path.join(project, ".sdd-runtime", "agent-guide.md"), "utf8");
    assert.equal(guideValue(guide, "Required skill"), "sdd-project-workflow");
    assert.equal(guideValue(guide, "Requested revision"), source.firstRevision);
    assert.equal(guideValue(guide, "Resolved revision"), source.firstRevision);
    await access(path.join(project, ".agents", "skills", "sdd-project-workflow", "SKILL.md"));
  }
});

test("cleanup rejects a guide whose checkout is outside the owned temporary boundary", async (t) => {
  const source = await createPlaybookFixture(t);
  const project = await createTargetProject(t);
  const result = runInstaller(project, ["--repository", source.repository]);
  assert.equal(result.status, 0, result.stderr);

  const guidePath = path.join(project, ".sdd-runtime", "agent-guide.md");
  const guide = await readFile(guidePath, "utf8");
  const tampered = guide.replace(
    /^\| Playbook checkout \| `[^`]+` \|$/m,
    `| Playbook checkout | \`${project}\` |`,
  );
  await writeFile(guidePath, tampered, "utf8");

  const cleanup = runInstaller(project, ["--cleanup"]);
  assert.notEqual(cleanup.status, 0);
  assert.match(cleanup.stderr, /refusing cleanup outside/);
  await access(project);
});
