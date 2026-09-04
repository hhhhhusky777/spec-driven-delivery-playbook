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
  for (const name of ["sdd-project-adoption", "sdd-project-workflow", "sdd-playbook-upgrade"]) {
    const directory = path.join(repository, "skills", name);
    await mkdir(directory, { recursive: true });
    await writeFile(
      path.join(directory, "SKILL.md"),
      `---\nname: ${name}\ndescription: Fixture skill.\n---\n\n# Fixture\n`,
      "utf8",
    );
  }
  const templateDirectory = path.join(repository, "templates", "adoption");
  await mkdir(templateDirectory, { recursive: true });
  await writeFile(
    path.join(templateDirectory, "playbook-upgrade-assessment.md"),
    "# Fixture upgrade assessment\n",
    "utf8",
  );
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

async function createInstalledProject(t, source, state = "ACTIVE") {
  const project = await createTargetProject(t);
  const adoptionRoot = path.join(project, ".github", "spec-driven-delivery");
  await mkdir(adoptionRoot, { recursive: true });
  await writeFile(path.join(adoptionRoot, "README.md"), "# SDD entry point\n", "utf8");
  await writeFile(path.join(adoptionRoot, "solution-whiteboard.md"), "# Whiteboard\n", "utf8");
  await writeFile(
    path.join(adoptionRoot, "project-adoption-manifest.md"),
    `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`${state}\` |\n| Playbook source repository | \`${source.repository}\` |\n| Playbook revision | \`${source.firstRevision}\` |\n| Current blocker | \`None\` |\n`,
    "utf8",
  );
  run("git", ["add", ".github"], project);
  run("git", ["config", "user.name", "Installer Test"], project);
  run("git", ["config", "user.email", "installer@example.test"], project);
  run("git", ["commit", "-m", "adopt playbook"], project);
  const installed = runInstaller(project, [
    "--repository",
    source.repository,
    "--revision",
    source.firstRevision,
  ]);
  assert.equal(installed.status, 0, installed.stderr);
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
  assert.equal(guideValue(guide, "Generator version"), "2.1.0");
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

  const conflictingModes = runInstaller(project, ["--cleanup", "--validate", "--upgrade"]);
  assert.notEqual(conflictingModes.status, 0);
  assert.match(conflictingModes.stderr, /mutually exclusive/);
});

test("upgrade prepares a newer immutable candidate without changing the active runtime", async (t) => {
  const source = await createPlaybookFixture(t);
  const project = await createInstalledProject(t, source);
  const normalGuidePath = path.join(project, ".sdd-runtime", "agent-guide.md");
  const normalGuideBefore = await readFile(normalGuidePath, "utf8");

  const result = runInstaller(project, ["--repository", source.repository, "--upgrade"]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Follow \.sdd-runtime\/playbook-upgrade-guide\.md exactly\./);

  const upgradeGuidePath = path.join(project, ".sdd-runtime", "playbook-upgrade-guide.md");
  const upgradeGuide = await readFile(upgradeGuidePath, "utf8");
  assert.equal(guideValue(upgradeGuide, "Current revision"), source.firstRevision);
  assert.equal(guideValue(upgradeGuide, "Requested revision"), "main");
  assert.equal(guideValue(upgradeGuide, "Resolved revision"), source.latestRevision);
  assert.equal(guideValue(upgradeGuide, "Required skill"), "sdd-playbook-upgrade");
  assert.equal(guideValue(upgradeGuide, "Cleanup state"), "PENDING");
  assert.match(guideValue(upgradeGuide, "Content hash"), /^[0-9a-f]{40}$/);
  assert.equal(await readFile(normalGuidePath, "utf8"), normalGuideBefore);
  await access(path.join(project, ".agents", "skills", "sdd-playbook-upgrade", "SKILL.md"));
  assert.equal(run("git", ["status", "--short"], project), "");
  const validation = runInstaller(project, ["--validate"]);
  assert.equal(validation.status, 0, validation.stderr);
  assert.match(validation.stdout, /^UPGRADE_CURRENT:/);
  await writeFile(
    upgradeGuidePath,
    upgradeGuide.replace("Access mode", "Changed access mode"),
    "utf8",
  );
  const invalid = runInstaller(project, ["--validate"]);
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /INVALID_UPGRADE_RUNTIME: guide content hash mismatch/);
  await writeFile(upgradeGuidePath, upgradeGuide, "utf8");

  const manifest = await readFile(
    path.join(project, ".github", "spec-driven-delivery", "project-adoption-manifest.md"),
    "utf8",
  );
  assert.match(manifest, new RegExp(source.firstRevision));
  assert.doesNotMatch(manifest, new RegExp(source.latestRevision));

  const repeated = runInstaller(project, ["--repository", source.repository, "--upgrade"]);
  assert.notEqual(repeated.status, 0);
  assert.match(repeated.stderr, /upgrade checkout is still pending/);

  const cleanup = runInstaller(project, ["--cleanup"]);
  assert.equal(cleanup.status, 0, cleanup.stderr);
  const cleanedUpgradeGuide = await readFile(upgradeGuidePath, "utf8");
  const cleanedNormalGuide = await readFile(normalGuidePath, "utf8");
  assert.equal(guideValue(cleanedUpgradeGuide, "Cleanup state"), "COMPLETE");
  assert.equal(guideValue(cleanedNormalGuide, "Cleanup state"), "COMPLETE");
});

test("upgrade preflight fails closed for active work, blocked adoption, and unchanged candidates", async (t) => {
  const source = await createPlaybookFixture(t);
  const activeProject = await createInstalledProject(t, source);
  const activeRoot = path.join(
    activeProject,
    ".github",
    "spec-driven-delivery",
    "active",
    "need",
  );
  await mkdir(activeRoot, { recursive: true });
  await writeFile(
    path.join(activeRoot, "04-implementation-plan.md"),
    "| Field | Value |\n| --- | --- |\n| Current task | `T01` |\n",
    "utf8",
  );
  const active = runInstaller(activeProject, ["--repository", source.repository, "--upgrade"]);
  assert.notEqual(active.status, 0);
  assert.match(active.stderr, /allowed only between tasks/);

  const blockedProject = await createInstalledProject(t, source);
  const blockedManifest = path.join(
    blockedProject,
    ".github",
    "spec-driven-delivery",
    "project-adoption-manifest.md",
  );
  await writeFile(
    blockedManifest,
    `# Manifest\n\n| Field | Value |\n| --- | --- |\n| Adoption state | \`BLOCKED\` |\n| State before block | \`ACTIVE\` |\n| Playbook source repository | \`${source.repository}\` |\n| Playbook revision | \`${source.firstRevision}\` |\n| Current blocker | \`upgrade unsafe\` |\n`,
    "utf8",
  );
  const blocked = runInstaller(blockedProject, ["--repository", source.repository, "--upgrade"]);
  assert.notEqual(blocked.status, 0);
  assert.match(blocked.stderr, /stable installed state/);

  const currentProject = await createInstalledProject(t, source);
  const unchanged = runInstaller(currentProject, [
    "--repository",
    source.repository,
    "--revision",
    source.firstRevision,
    "--upgrade",
  ]);
  assert.notEqual(unchanged.status, 0);
  assert.match(unchanged.stderr, /already uses the resolved/);
});

test("upgrade preflight rejects missing project contracts and divergent candidates", async (t) => {
  const source = await createPlaybookFixture(t);
  const missingProject = await createInstalledProject(t, source);
  await rm(
    path.join(missingProject, ".github", "spec-driven-delivery", "solution-whiteboard.md"),
  );
  const missing = runInstaller(missingProject, ["--repository", source.repository, "--upgrade"]);
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /requires the project solution whiteboard/);

  const divergentRevision = run("git", ["rev-parse", source.firstRevision], source.repository).trim();
  run("git", ["checkout", "--orphan", "divergent"], source.repository);
  await writeFile(path.join(source.repository, "divergent.md"), "# Divergent\n", "utf8");
  run("git", ["add", "divergent.md"], source.repository);
  run("git", ["commit", "-m", "divergent candidate"], source.repository);
  const candidate = run("git", ["rev-parse", "HEAD"], source.repository).trim();
  run("git", ["checkout", "main"], source.repository);
  assert.notEqual(candidate, divergentRevision);

  const divergentProject = await createInstalledProject(t, source);
  const divergent = runInstaller(divergentProject, [
    "--repository",
    source.repository,
    "--revision",
    candidate,
    "--upgrade",
  ]);
  assert.notEqual(divergent.status, 0);
  assert.match(divergent.stderr, /does not descend/);

  const incompleteSource = await createPlaybookFixture(t);
  await rm(path.join(incompleteSource.repository, "skills", "sdd-playbook-upgrade"), {
    recursive: true,
  });
  run("git", ["add", "-A"], incompleteSource.repository);
  run("git", ["commit", "-m", "remove upgrade protocol"], incompleteSource.repository);
  const incompleteProject = await createInstalledProject(t, incompleteSource);
  const incomplete = runInstaller(incompleteProject, [
    "--repository",
    incompleteSource.repository,
    "--upgrade",
  ]);
  assert.notEqual(incomplete.status, 0);
  assert.match(incomplete.stderr, /does not contain sdd-playbook-upgrade/);
});
