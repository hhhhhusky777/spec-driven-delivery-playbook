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
  assert.equal(guideValue(guide, "Manifest state before block"), "NONE");
  assert.equal(guideValue(guide, "Generator version"), "2.0.1");
  assert.equal(guideValue(guide, "Generator schema version"), "2");
  assert.equal(guideValue(guide, "Guide profile"), "adoption");
  assert.equal(guideValue(guide, "Required skill"), "sdd-project-adoption");
  assert.equal(guideValue(guide, "Requested revision"), "main");
  assert.equal(guideValue(guide, "Resolved revision"), source.latestRevision);
  assert.doesNotMatch(guide, /^- Next action:/m);
  assert.match(guide, /^## Runtime replacement$/m);
  assert.match(guide, /^## Adoption execution contract$/m);
  assert.doesNotMatch(guide, /^## Delivery execution contract$/m);
  assert.match(guide, /Never overwrite a pending checkout/);
  assert.match(guideValue(guide, "Content hash"), /^[0-9a-f]{40}$/);
  await access(path.join(project, ".agents", "skills", "sdd-project-adoption", "SKILL.md"));
  assert.equal(run("git", ["status", "--short"], project), "");

  const validation = runInstaller(project, ["--validate"]);
  assert.equal(validation.status, 0, validation.stderr);
  assert.match(validation.stdout, /^CURRENT:/);

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

test("completed adoption replaces its runtime before the first need", async (t) => {
  const source = await createPlaybookFixture(t);
  const project = await createTargetProject(t);
  const initial = runInstaller(project, ["--repository", source.repository]);
  assert.equal(initial.status, 0, initial.stderr);

  const initialGuidePath = path.join(project, ".sdd-runtime", "agent-guide.md");
  const initialGuide = await readFile(initialGuidePath, "utf8");
  assert.equal(guideValue(initialGuide, "Required skill"), "sdd-project-adoption");
  assert.equal(guideValue(initialGuide, "Cleanup state"), "PENDING");

  const manifest = path.join(
    project,
    ".github",
    "spec-driven-delivery",
    "project-adoption-manifest.md",
  );
  await mkdir(path.dirname(manifest), { recursive: true });
  await writeFile(
    manifest,
    `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`INSTALLED\` |\n| Playbook revision | \`${source.latestRevision}\` |\n`,
    "utf8",
  );

  const premature = runInstaller(project, ["--repository", source.repository]);
  assert.notEqual(premature.status, 0);
  assert.match(premature.stderr, /checkout is still pending/);

  const cleanup = runInstaller(project, ["--cleanup"]);
  assert.equal(cleanup.status, 0, cleanup.stderr);
  const replacement = runInstaller(project, ["--repository", source.repository]);
  assert.equal(replacement.status, 0, replacement.stderr);

  const replacementGuide = await readFile(initialGuidePath, "utf8");
  assert.equal(guideValue(replacementGuide, "Manifest state detected"), "INSTALLED");
  assert.equal(guideValue(replacementGuide, "Guide profile"), "workflow");
  assert.equal(guideValue(replacementGuide, "Required skill"), "sdd-project-workflow");
  assert.equal(guideValue(replacementGuide, "Requested revision"), source.latestRevision);
  assert.equal(guideValue(replacementGuide, "Resolved revision"), source.latestRevision);
  assert.equal(guideValue(replacementGuide, "Cleanup state"), "PENDING");
  assert.match(replacementGuide, /^## Delivery execution contract$/m);
  assert.doesNotMatch(replacementGuide, /^## Adoption execution contract$/m);

  await writeFile(
    manifest,
    `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`PILOT\` |\n| Playbook revision | \`${source.latestRevision}\` |\n`,
    "utf8",
  );
  const advanced = runInstaller(project, ["--validate"]);
  assert.equal(advanced.status, 0, advanced.stderr);
  assert.match(advanced.stdout, /^STATE_ADVANCED: manifest moved from INSTALLED to PILOT/);

  const finalCleanup = runInstaller(project, ["--cleanup"]);
  assert.equal(finalCleanup.status, 0, finalCleanup.stderr);
});

test("supported workflow states select the workflow profile and preserve their pinned revision", async (t) => {
  const source = await createPlaybookFixture(t);
  for (const state of ["INSTALLED", "PILOT", "REVIEW", "ACTIVE", "UPDATING", "EXAMPLE_REVIEWED"]) {
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
    assert.equal(guideValue(guide, "Guide profile"), "workflow");
    assert.equal(guideValue(guide, "Requested revision"), source.firstRevision);
    assert.equal(guideValue(guide, "Resolved revision"), source.firstRevision);
    await access(path.join(project, ".agents", "skills", "sdd-project-workflow", "SKILL.md"));
  }
});

test("BLOCKED retains the profile selected by its explicit prior state", async (t) => {
  const source = await createPlaybookFixture(t);
  for (const [priorState, expectedSkill] of [
    ["MAPPED", "sdd-project-adoption"],
    ["PILOT", "sdd-project-workflow"],
  ]) {
    const project = await createTargetProject(t);
    const manifest = path.join(project, ".github", "spec-driven-delivery", "project-adoption-manifest.md");
    await mkdir(path.dirname(manifest), { recursive: true });
    await writeFile(
      manifest,
      `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`BLOCKED\` |\n| State before block | \`${priorState}\` |\n| Playbook revision | \`${source.latestRevision}\` |\n`,
      "utf8",
    );
    const result = runInstaller(project, ["--repository", source.repository]);
    assert.equal(result.status, 0, result.stderr);
    const guide = await readFile(path.join(project, ".sdd-runtime", "agent-guide.md"), "utf8");
    assert.equal(guideValue(guide, "Required skill"), expectedSkill);
  }

  const project = await createTargetProject(t);
  const manifest = path.join(project, ".github", "spec-driven-delivery", "project-adoption-manifest.md");
  await mkdir(path.dirname(manifest), { recursive: true });
  await writeFile(
    manifest,
    `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`BLOCKED\` |\n`,
    "utf8",
  );
  const result = runInstaller(project, ["--repository", source.repository]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /missing State before block/);
});

test("runtime validation fails closed on profile changes, tampering, and unsupported states", async (t) => {
  const source = await createPlaybookFixture(t);
  const project = await createTargetProject(t);
  const installed = runInstaller(project, ["--repository", source.repository]);
  assert.equal(installed.status, 0, installed.stderr);

  const manifest = path.join(project, ".github", "spec-driven-delivery", "project-adoption-manifest.md");
  await mkdir(path.dirname(manifest), { recursive: true });
  await writeFile(
    manifest,
    `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`INSTALLED\` |\n| Playbook revision | \`${source.latestRevision}\` |\n`,
    "utf8",
  );
  const stale = runInstaller(project, ["--validate"]);
  assert.notEqual(stale.status, 0);
  assert.match(stale.stderr, /STALE_RUNTIME: manifest requires workflow/);

  const guidePath = path.join(project, ".sdd-runtime", "agent-guide.md");
  const guide = await readFile(guidePath, "utf8");
  await writeFile(guidePath, guide.replace("Access mode", "Changed access mode"), "utf8");
  const invalid = runInstaller(project, ["--validate"]);
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /INVALID_RUNTIME: guide content hash mismatch/);

  const unsupportedProject = await createTargetProject(t);
  const unsupportedManifest = path.join(
    unsupportedProject,
    ".github",
    "spec-driven-delivery",
    "project-adoption-manifest.md",
  );
  await mkdir(path.dirname(unsupportedManifest), { recursive: true });
  await writeFile(
    unsupportedManifest,
    `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`UNKNOWN_STATE\` |\n`,
    "utf8",
  );
  const unsupported = runInstaller(unsupportedProject, ["--repository", source.repository]);
  assert.notEqual(unsupported.status, 0);
  assert.match(unsupported.stderr, /unsupported manifest state/);
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

test("validation checks marker ownership and command modes are exclusive", async (t) => {
  const source = await createPlaybookFixture(t);
  const project = await createTargetProject(t);
  const result = runInstaller(project, ["--repository", source.repository]);
  assert.equal(result.status, 0, result.stderr);

  const guide = await readFile(path.join(project, ".sdd-runtime", "agent-guide.md"), "utf8");
  const marker = guideValue(guide, "Ownership marker");
  await writeFile(marker, "sdd-owned-checkout-v1\nproject-root=/wrong/project\n", "utf8");
  const validation = runInstaller(project, ["--validate"]);
  assert.notEqual(validation.status, 0);
  assert.match(validation.stderr, /ownership marker belongs to a different project/);

  const conflictingModes = runInstaller(project, ["--cleanup", "--validate"]);
  assert.notEqual(conflictingModes.status, 0);
  assert.match(conflictingModes.stderr, /mutually exclusive/);
});
