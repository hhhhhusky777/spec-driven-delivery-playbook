#!/usr/bin/env python3
"""Cross-platform Spec-Driven Delivery installer (Python port of install-sdd.sh).

Prepare a project-local agent guide and matching skill for the Spec-Driven
Delivery playbook.

Requirements: Python 3.8+ and git. No third-party packages.

Platform notes
--------------
* The playbook model is operating-system independent: it ships Markdown
  contracts, a Git workflow, and pull-request evidence. The only OS coupling in
  ``install-sdd.sh`` is its runtime toolchain (a POSIX shell plus sed, awk,
  grep, find, mktemp), which Windows does not provide without Git Bash, MSYS2,
  Cygwin, or WSL. This port keeps the same behavior without needing a shell.
* This port records the physical project root as a native path. On POSIX,
  ``install-sdd.sh`` records the identical path, so the two installers are
  interchangeable. On Windows, Git Bash records MSYS-style paths (``/c/...``)
  while this port records native paths (``C:\\...``). Use one installer per
  worktree on Windows: the runtime carries the project root and worktree
  identity in its guide and ownership marker, and mixing toolchains in the same
  worktree is rejected as a boundary violation. Switching toolchains requires
  ``--cleanup`` (or removing ``.sdd-runtime``) and a fresh install.
* Both installers read and write the same artifacts, so a project installed by
  one can be upgraded or cleaned up by the other on POSIX.

Behavioral compatibility
------------------------
Every validation, boundary, error message, exit status, and generated artifact
mirrors ``install-sdd.sh``. The only intentional differences are the program
name recorded in the generated guide's Cleanup record (``install-sdd.py`` /
``./install-sdd.py --cleanup``) so a Python-installed project records a command
its users can actually run, and clearer diagnostics when a Git command that
``set -e`` would abort on fails.
"""

import os
import re
import shutil
import stat
import subprocess
import sys
import tempfile

PLAYBOOK_REPOSITORY = "https://github.com/hhhhhusky777/spec-driven-delivery-playbook.git"
DEFAULT_REVISION = "main"
DEFAULT_ADOPTION_ROOT = ".github/spec-driven-delivery"
RUNTIME_ROOT = ".sdd-runtime"
GUIDE_SCHEMA_VERSION = "3"
UPGRADE_GUIDE_SCHEMA_VERSION = "2"
GENERATOR_VERSION = "2.3.0"
FEATURE_REVIEW_SKILL = "sdd-feature-review"
OWNERSHIP_MARKER_NAME = ".sdd-owned-checkout"
MANAGED_MARKER_NAME = ".sdd-playbook-managed"
OWNERSHIP_SIGNATURE_V2 = "sdd-owned-checkout-v2"
OWNERSHIP_SIGNATURE_V1 = "sdd-owned-checkout-v1"
INSTALLER_NAME = "install-sdd.py"
INSTALLER_COMMAND = "./install-sdd.py"
CLEANUP_COMMAND = "./install-sdd.py --cleanup"

CONTENT_HASH_PLACEHOLDER = "<CONTENT_HASH>"
CONTENT_HASH_LINE = "| Content hash | `%s` |" % CONTENT_HASH_PLACEHOLDER
CONTENT_HASH_LINE_RE = re.compile(r"^\| Content hash \| `[^`]*` \|$", re.MULTILINE)
FULL_SHA_RE = re.compile(r"^[0-9a-fA-F]{40}$")

ADOPTION_STATE_RE = re.compile(r"^\| Adoption state \| `([^`]*)` \|$", re.MULTILINE)
STATE_BEFORE_BLOCK_RE = re.compile(r"^\| State before block \| `([^`]*)` \|$", re.MULTILINE)
PINNED_REVISION_RE = re.compile(
    r"^\| Playbook revision \| `([0-9a-fA-F]{40})` \|$", re.MULTILINE
)

USAGE = """Usage: ./%(installer)s [options]

Prepare a project-local Spec-Driven Delivery agent guide and matching skill.

Options:
  --repository URL       Playbook Git repository.
  --revision REF         Branch, tag, or commit to resolve (default: main).
  --adoption-root PATH   Project adoption root.
  --manifest PATH        Existing or future adoption manifest path.
  --cleanup              Remove only the verified project-local checkout.
  --validate             Validate the generated runtime without changing it.
  --upgrade              Prepare a reviewed upgrade to a newer playbook revision.
  --help                 Show this help.
""" % {"installer": INSTALLER_NAME}


class InstallerError(Exception):
    """A fail-closed installer outcome that maps to exit status 1."""


def fail(message):
    raise InstallerError(message)


def emit(text):
    sys.stdout.write(text)
    sys.stdout.flush()


def read_text(path):
    with open(path, "r", encoding="utf-8", newline="") as handle:
        return handle.read()


def write_text(path, text):
    directory = os.path.dirname(path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    temporary = path + ".tmp"
    with open(temporary, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(text)
    os.replace(temporary, path)


def physical(path):
    return os.path.realpath(path)


def remove_tree(path):
    """Recursively delete ``path`` (the shell version's ``rm -rf``).

    ``shutil.rmtree`` is not enough on Windows: Git marks pack files under
    ``.git/objects/pack`` read-only and a plain delete of a read-only file fails
    with a permission error. GNU ``rm -f`` forces such files, so this port
    clears the read-only attribute before removing each entry.
    """
    if os.path.islink(path):
        os.unlink(path)
        return
    if not os.path.exists(path):
        return
    for root, directories, files in os.walk(path, topdown=False):
        for name in files:
            _remove_entry(os.path.join(root, name), os.unlink)
        for name in directories:
            target = os.path.join(root, name)
            _remove_entry(target, os.unlink if os.path.islink(target) else os.rmdir)
    _remove_entry(path, os.rmdir)


def _remove_entry(target, operation):
    try:
        operation(target)
    except PermissionError:
        os.chmod(target, stat.S_IWRITE)
        operation(target)


def remove_tree_quietly(path):
    try:
        remove_tree(path)
    except OSError:
        pass


def same_path(left, right):
    return os.path.normcase(os.path.abspath(left)) == os.path.normcase(os.path.abspath(right))


def file_has_line(path, line):
    try:
        return line in read_text(path).split("\n")
    except OSError:
        return False


def first_line(path):
    try:
        with open(path, "r", encoding="utf-8", newline="") as handle:
            return handle.readline().rstrip("\r\n")
    except OSError:
        return ""


def markdown_value(label, path):
    """Port of the installer's awk ``markdown_value`` table-row reader."""
    prefix = "| %s | `" % label
    try:
        content = read_text(path)
    except OSError:
        return ""
    for line in content.split("\n"):
        if line.startswith(prefix):
            value = line[len(prefix):]
            if value.endswith("` |"):
                value = value[:-3]
            return value
    return ""


def sed_first(path, pattern):
    try:
        content = read_text(path)
    except OSError:
        return ""
    match = pattern.search(content)
    return match.group(1) if match else ""


def git_capture(args, cwd=None):
    """Run git quietly; return stripped stdout, or None when it fails."""
    try:
        completed = subprocess.run(
            ["git"] + args,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            encoding="utf-8",
            errors="replace",
        )
    except OSError:
        return None
    if completed.returncode != 0:
        return None
    return completed.stdout.strip()


def git_run(args, cwd=None):
    """Run git with its own stderr visible, as the shell version leaves it."""
    completed = subprocess.run(["git"] + args, cwd=cwd)
    return completed.returncode


def git_hash_object_stdin(text, cwd=None):
    completed = subprocess.run(
        ["git", "hash-object", "--stdin"],
        cwd=cwd,
        input=text.encode("utf-8"),
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
    )
    if completed.returncode != 0:
        fail("cannot compute the guide content hash")
    return completed.stdout.decode("ascii", "replace").strip()


def guide_content_hash(path, cwd=None):
    """Hash the guide with its Content hash value masked, matching the shell sed pipeline."""
    text = read_text(path)
    text = CONTENT_HASH_LINE_RE.sub(CONTENT_HASH_LINE, text)
    if not text.endswith("\n"):
        text += "\n"
    return git_hash_object_stdin(text, cwd=cwd)


def refresh_guide_hash(path, cwd=None):
    text = CONTENT_HASH_LINE_RE.sub(CONTENT_HASH_LINE, read_text(path))
    write_text(path, text)
    digest = guide_content_hash(path, cwd=cwd)
    text = read_text(path).replace(
        CONTENT_HASH_LINE, "| Content hash | `%s` |" % digest
    )
    write_text(path, text)


def canonical_repository(value):
    return re.sub(r"\.git$", "", re.sub(r"/$", "", value))


def profile_for_state(state, state_before_block):
    if state in ("ABSENT", "DRAFT"):
        return "adoption"
    if state == "INSTALLED":
        return "workflow"
    if state == "BLOCKED":
        if state_before_block == "DRAFT":
            return "adoption"
        if state_before_block == "INSTALLED":
            return "workflow"
    return None


def skill_for_profile(profile):
    if profile == "adoption":
        return "sdd-project-adoption"
    if profile == "workflow":
        return "sdd-project-workflow"
    return None


def legacy_entry_readme_blob(cwd=None):
    lines = [
        "# Spec-Driven Delivery entry point",
        "",
        "Start with [Contributing](../../CONTRIBUTING.md), then read the",
        "[adoption manifest](project-adoption-manifest.md),",
        "[project contracts](project-contracts.md), and verified machine-local runtime.",
        "",
        "This compatibility entry point supplies no independent policy or live state.",
    ]
    return git_hash_object_stdin("\n".join(lines) + "\n", cwd=cwd)


class Installer(object):
    def __init__(self, options):
        self.playbook_repository = options["repository"]
        self.requested_revision = options["revision"]
        self.revision_explicit = options["revision_explicit"]
        self.adoption_root = options["adoption_root"]
        self.manifest_relative_path = options["manifest"]
        self.cleanup_only = options["cleanup"]
        self.validate_only = options["validate"]
        self.upgrade_mode = options["upgrade"]

        self.project_root = ""
        self.current_root = ""
        self.git_common_directory = ""
        self.git_directory = ""
        self.git_worktree_state = ""
        self.runtime_directory = ""
        self.guide_path = ""
        self.upgrade_guide_path = ""
        self.manifest_path = ""
        self.manifest_state = "ABSENT"
        self.manifest_state_before_block = "NONE"
        self.pinned_revision = ""
        self.legacy_entry_readme_pending = False
        self.legacy_entry_readme_path = ""

        # Populated by the install flow before the guide is rendered.
        self.resolved_revision = ""
        self.resolved_repository = ""
        self.playbook_checkout = ""
        self.marker_path = ""

    # ---------------------------------------------------------------- context

    def resolve_context(self):
        if shutil.which("git") is None:
            fail("git is required")

        toplevel = git_capture(["rev-parse", "--show-toplevel"])
        if not toplevel:
            fail("run this installer from a Git project root")
        self.project_root = physical(toplevel)
        self.current_root = physical(os.getcwd())
        if not same_path(self.current_root, self.project_root):
            fail("run this installer from the project root: %s" % self.project_root)

        common = git_capture(["rev-parse", "--path-format=absolute", "--git-common-dir"])
        if not common:
            fail("cannot resolve the repository identity")
        self.git_common_directory = common

        git_directory = git_capture(["rev-parse", "--absolute-git-dir"])
        if not git_directory:
            fail("cannot resolve the worktree identity")
        self.git_directory = git_directory

        branch = git_capture(["symbolic-ref", "--quiet", "HEAD"])
        if branch:
            self.git_worktree_state = branch
        else:
            head = git_capture(["rev-parse", "HEAD"])
            if not head:
                fail("cannot resolve the worktree branch or detached state")
            self.git_worktree_state = "detached:%s" % head

        if not self.manifest_relative_path:
            self.manifest_relative_path = "%s/project-adoption-manifest.md" % self.adoption_root

        if self.manifest_relative_path.startswith("/") or self.manifest_relative_path == "..":
            fail("manifest path must stay inside the project root")
        if self.manifest_relative_path.startswith("../"):
            fail("manifest path must stay inside the project root")
        if "/../" in self.manifest_relative_path:
            fail("manifest path must stay inside the project root")
        if self.manifest_relative_path.endswith("/.."):
            fail("manifest path must stay inside the project root")

        if not self.adoption_root or self.adoption_root.startswith("/"):
            fail("adoption root must be a non-empty path inside the project root")
        if self.adoption_root.startswith("../") or "/../" in self.adoption_root:
            fail("adoption root must be a non-empty path inside the project root")
        if self.adoption_root.endswith("/.."):
            fail("adoption root must be a non-empty path inside the project root")

        self.runtime_directory = os.path.join(self.project_root, RUNTIME_ROOT)
        self.guide_path = os.path.join(self.runtime_directory, "agent-guide.md")
        self.upgrade_guide_path = os.path.join(
            self.runtime_directory, "playbook-upgrade-guide.md"
        )
        self.manifest_path = os.path.join(self.project_root, self.manifest_relative_path)

        self.detect_manifest_state()

    def detect_manifest_state(self):
        if not os.path.isfile(self.manifest_path):
            return
        state = sed_first(self.manifest_path, ADOPTION_STATE_RE) or "UNKNOWN"
        self.manifest_state = state
        self.manifest_state_before_block = (
            sed_first(self.manifest_path, STATE_BEFORE_BLOCK_RE) or "NONE"
        )
        pinned = sed_first(self.manifest_path, PINNED_REVISION_RE)
        if pinned:
            self.pinned_revision = pinned
            if not self.revision_explicit and not self.upgrade_mode:
                self.requested_revision = pinned

    # --------------------------------------------------------------- runtime

    def validate_runtime_boundary(self):
        checkout_root = os.path.join(self.runtime_directory, "checkouts")
        if os.path.islink(self.runtime_directory) or os.path.islink(checkout_root):
            fail("INVALID_RUNTIME: project runtime boundary must not be a symbolic link")
        if os.path.isdir(self.runtime_directory):
            if not same_path(physical(self.runtime_directory), self.runtime_directory):
                fail("INVALID_RUNTIME: project runtime resolves outside the physical worktree")
        if os.path.isdir(checkout_root):
            if not same_path(physical(checkout_root), checkout_root):
                fail("INVALID_RUNTIME: checkout root resolves outside the physical worktree")

    def prepare_runtime_storage(self):
        self.validate_runtime_boundary()
        os.makedirs(os.path.join(self.runtime_directory, "checkouts"), exist_ok=True)
        self.validate_runtime_boundary()

    def validate_checkout_boundary(self, checkout, revision, failure_prefix):
        if not revision or not FULL_SHA_RE.match(revision):
            fail("%s: checkout is outside the exact project-local runtime path" % failure_prefix)
        revision_directory = os.path.join(self.runtime_directory, "checkouts", revision)
        expected = os.path.join(revision_directory, "repository")
        if not same_path(checkout, expected):
            fail("%s: checkout is outside the exact project-local runtime path" % failure_prefix)
        if (
            not os.path.isdir(checkout)
            or os.path.islink(revision_directory)
            or os.path.islink(checkout)
        ):
            fail("%s: checkout boundary is missing or symbolic" % failure_prefix)
        if not same_path(physical(checkout), checkout):
            fail("%s: checkout resolves outside the physical worktree runtime" % failure_prefix)

    def ensure_runtime_excludes(self):
        exclude = git_capture(["rev-parse", "--git-path", "info/exclude"], cwd=self.project_root)
        if not exclude:
            fail("cannot resolve the repository exclude file")
        if not os.path.isabs(exclude):
            exclude = os.path.join(self.project_root, exclude)
        os.makedirs(os.path.dirname(exclude), exist_ok=True)

        existing = []
        if os.path.isfile(exclude):
            existing = read_text(exclude).split("\n")

        patterns = [
            "/%s/" % RUNTIME_ROOT,
            "/.agents/skills/sdd-project-adoption/",
            "/.agents/skills/sdd-project-workflow/",
            "/.agents/skills/%s/" % FEATURE_REVIEW_SKILL,
            "/.agents/skills/sdd-playbook-upgrade/",
        ]

        installer_path = physical(os.path.abspath(__file__))
        if installer_path.startswith(self.project_root.rstrip("/\\") + os.sep):
            relative = os.path.relpath(installer_path, self.project_root).replace(os.sep, "/")
            patterns.append("/%s" % relative)

        with open(exclude, "a", encoding="utf-8", newline="\n") as handle:
            for pattern in patterns:
                if pattern not in existing:
                    handle.write(pattern + "\n")
                    existing.append(pattern)

    # -------------------------------------------------------------- validate

    def validate_runtime(self):
        self.validate_runtime_boundary()
        if not os.path.isfile(self.guide_path):
            fail("STALE_RUNTIME: no generated guide found")

        guide = self.guide_path
        recorded_project = markdown_value("Project root", guide)
        recorded_generator = markdown_value("Generator version", guide)
        recorded_schema = markdown_value("Generator schema version", guide)
        recorded_profile = markdown_value("Guide profile", guide)
        recorded_state = markdown_value("Manifest state detected", guide)
        recorded_prior_state = markdown_value("Manifest state before block", guide)
        recorded_skill = markdown_value("Required skill", guide)
        recorded_review_skill = markdown_value("Feature review skill", guide)
        recorded_requested = markdown_value("Requested revision", guide)
        recorded_revision = markdown_value("Resolved revision", guide)
        recorded_hash = markdown_value("Content hash", guide)
        checkout = markdown_value("Playbook checkout", guide)
        marker = markdown_value("Ownership marker", guide)
        cleanup_state = markdown_value("Cleanup state", guide)
        recorded_common_directory = markdown_value("Git common directory", guide)
        recorded_git_directory = markdown_value("Git worktree directory", guide)
        recorded_worktree_state = markdown_value("Git worktree state", guide)

        if not recorded_project or not same_path(recorded_project, self.project_root):
            fail("INVALID_RUNTIME: guide belongs to a different project")
        if (
            not recorded_common_directory
            or not recorded_git_directory
            or not same_path(recorded_common_directory, self.git_common_directory)
            or not same_path(recorded_git_directory, self.git_directory)
            or recorded_worktree_state != self.git_worktree_state
        ):
            fail("INVALID_RUNTIME: guide belongs to a different repository worktree")
        if recorded_generator != GENERATOR_VERSION:
            fail("STALE_RUNTIME: unsupported generator version %s" % recorded_generator)
        if recorded_schema != GUIDE_SCHEMA_VERSION:
            fail("STALE_RUNTIME: unsupported guide schema %s" % recorded_schema)

        actual_hash = guide_content_hash(guide, cwd=self.project_root)
        if recorded_hash != actual_hash:
            fail("INVALID_RUNTIME: guide content hash mismatch")

        expected_profile = profile_for_state(
            self.manifest_state, self.manifest_state_before_block
        )
        if expected_profile is None:
            fail(
                "STALE_RUNTIME: unsupported manifest state %s or missing State before block"
                % self.manifest_state
            )
        expected_skill = skill_for_profile(expected_profile)
        if recorded_profile != expected_profile or recorded_skill != expected_skill:
            fail(
                "STALE_RUNTIME: manifest requires %s/%s, guide records %s/%s"
                % (expected_profile, expected_skill, recorded_profile, recorded_skill)
            )
        if recorded_state == "BLOCKED" and self.manifest_state == "BLOCKED":
            if recorded_prior_state != self.manifest_state_before_block:
                fail("STALE_RUNTIME: State before block changed while the manifest remained BLOCKED")

        if self.pinned_revision:
            if recorded_revision != self.pinned_revision:
                fail("STALE_RUNTIME: resolved guide revision differs from the manifest pin")
        else:
            if recorded_requested != self.requested_revision:
                fail("STALE_RUNTIME: requested guide revision differs from the installer request")

        installed_marker = os.path.join(
            self.project_root, ".agents", "skills", recorded_skill, MANAGED_MARKER_NAME
        )
        if not os.path.isfile(installed_marker) or first_line(installed_marker) != recorded_revision:
            fail("INVALID_RUNTIME: installed skill differs from the guide revision")

        if recorded_review_skill == "available":
            if expected_profile != "workflow":
                fail("INVALID_RUNTIME: feature review skill is incompatible with the guide profile")
        elif recorded_review_skill != "unavailable":
            fail("INVALID_RUNTIME: unsupported feature review skill state")

        if recorded_review_skill == "available":
            review_marker = os.path.join(
                self.project_root, ".agents", "skills", FEATURE_REVIEW_SKILL, MANAGED_MARKER_NAME
            )
            if not os.path.isfile(review_marker) or first_line(review_marker) != recorded_revision:
                fail("INVALID_RUNTIME: installed feature review skill differs from the guide revision")

        if cleanup_state == "PENDING":
            self.validate_checkout_boundary(checkout, recorded_revision, "INVALID_RUNTIME")
            if not os.path.isdir(os.path.join(checkout, ".git")) or not os.path.isfile(marker):
                fail("INVALID_RUNTIME: checkout or ownership marker is missing")
            if not same_path(marker, os.path.join(checkout, OWNERSHIP_MARKER_NAME)):
                fail("INVALID_RUNTIME: ownership marker path does not match checkout")
            if not file_has_line(marker, OWNERSHIP_SIGNATURE_V2):
                fail("INVALID_RUNTIME: ownership marker signature is invalid")
            if not file_has_line(marker, "project-root=%s" % self.project_root):
                fail("INVALID_RUNTIME: ownership marker belongs to a different project")
            if not file_has_line(marker, "git-common-directory=%s" % self.git_common_directory):
                fail("INVALID_RUNTIME: ownership marker belongs to a different repository")
            if not file_has_line(marker, "git-directory=%s" % self.git_directory):
                fail("INVALID_RUNTIME: ownership marker belongs to a different worktree")
            if not file_has_line(marker, "git-worktree-state=%s" % self.git_worktree_state):
                fail("INVALID_RUNTIME: ownership marker belongs to a different worktree state")
            checkout_revision = git_capture(["rev-parse", "HEAD"], cwd=checkout)
            if not checkout_revision:
                fail("INVALID_RUNTIME: cannot read checkout revision")
            checkout_origin = git_capture(["remote", "get-url", "origin"], cwd=checkout)
            if not checkout_origin:
                fail("INVALID_RUNTIME: cannot read checkout origin")
            if checkout_revision != recorded_revision:
                fail("INVALID_RUNTIME: checkout revision does not match guide provenance")
            if checkout_origin != markdown_value("Source repository", guide):
                fail("INVALID_RUNTIME: checkout origin does not match guide provenance")
        elif cleanup_state == "COMPLETE":
            if os.path.exists(checkout) or os.path.exists(marker):
                fail("INVALID_RUNTIME: cleaned checkout still exists")
        else:
            fail("STALE_RUNTIME: installer cleanup state is unsupported")

        if recorded_state == self.manifest_state:
            emit("CURRENT: runtime profile, provenance, skill, and manifest state match.\n")
        else:
            emit(
                "STATE_ADVANCED: manifest moved from %s to %s within compatible profile %s.\n"
                % (recorded_state, self.manifest_state, expected_profile)
            )

    def validate_upgrade_runtime(self):
        self.validate_runtime_boundary()
        if not os.path.isfile(self.upgrade_guide_path):
            fail("STALE_UPGRADE_RUNTIME: no generated upgrade guide found")

        guide = self.upgrade_guide_path
        recorded_project = markdown_value("Project root", guide)
        recorded_generator = markdown_value("Generator version", guide)
        recorded_schema = markdown_value("Generator schema version", guide)
        recorded_current = markdown_value("Current revision", guide)
        recorded_revision = markdown_value("Resolved revision", guide)
        recorded_repository = markdown_value("Source repository", guide)
        recorded_hash = markdown_value("Content hash", guide)
        checkout = markdown_value("Playbook checkout", guide)
        marker = markdown_value("Ownership marker", guide)
        cleanup_state = markdown_value("Cleanup state", guide)
        recorded_common_directory = markdown_value("Git common directory", guide)
        recorded_git_directory = markdown_value("Git worktree directory", guide)
        recorded_worktree_state = markdown_value("Git worktree state", guide)

        if not recorded_project or not same_path(recorded_project, self.project_root):
            fail("INVALID_UPGRADE_RUNTIME: guide belongs to a different project")
        if (
            not recorded_common_directory
            or not recorded_git_directory
            or not same_path(recorded_common_directory, self.git_common_directory)
            or not same_path(recorded_git_directory, self.git_directory)
            or recorded_worktree_state != self.git_worktree_state
        ):
            fail("INVALID_UPGRADE_RUNTIME: guide belongs to a different repository worktree")
        if (
            recorded_generator != GENERATOR_VERSION
            or recorded_schema != UPGRADE_GUIDE_SCHEMA_VERSION
        ):
            fail("STALE_UPGRADE_RUNTIME: unsupported generator or guide schema")

        actual_hash = guide_content_hash(guide, cwd=self.project_root)
        if recorded_hash != actual_hash:
            fail("INVALID_UPGRADE_RUNTIME: guide content hash mismatch")
        if recorded_current != self.pinned_revision:
            fail("STALE_UPGRADE_RUNTIME: manifest pin changed after preparation")
        if canonical_repository(recorded_repository) != canonical_repository(
            markdown_value("Playbook source repository", self.manifest_path)
        ):
            fail("INVALID_UPGRADE_RUNTIME: candidate repository differs from the manifest")
        if cleanup_state != "PENDING":
            fail("STALE_UPGRADE_RUNTIME: candidate checkout is not available")

        self.validate_checkout_boundary(checkout, recorded_revision, "INVALID_UPGRADE_RUNTIME")
        if not os.path.isdir(os.path.join(checkout, ".git")) or not os.path.isfile(marker):
            fail("INVALID_UPGRADE_RUNTIME: checkout or ownership marker is missing")
        if not same_path(marker, os.path.join(checkout, OWNERSHIP_MARKER_NAME)):
            fail("INVALID_UPGRADE_RUNTIME: ownership marker path does not match checkout")
        if not file_has_line(marker, OWNERSHIP_SIGNATURE_V2):
            fail("INVALID_UPGRADE_RUNTIME: ownership marker signature is invalid")
        if not file_has_line(marker, "project-root=%s" % self.project_root):
            fail("INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different project")
        if not file_has_line(marker, "git-common-directory=%s" % self.git_common_directory):
            fail("INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different repository")
        if not file_has_line(marker, "git-directory=%s" % self.git_directory):
            fail("INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different worktree")
        if not file_has_line(marker, "git-worktree-state=%s" % self.git_worktree_state):
            fail("INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different worktree state")

        checkout_revision = git_capture(["rev-parse", "HEAD"], cwd=checkout)
        if not checkout_revision:
            fail("INVALID_UPGRADE_RUNTIME: cannot read candidate checkout revision")
        checkout_origin = git_capture(["remote", "get-url", "origin"], cwd=checkout)
        if not checkout_origin:
            fail("INVALID_UPGRADE_RUNTIME: cannot read candidate checkout origin")
        if checkout_revision != recorded_revision:
            fail("INVALID_UPGRADE_RUNTIME: checkout revision differs from the guide")
        if canonical_repository(checkout_origin) != canonical_repository(recorded_repository):
            fail("INVALID_UPGRADE_RUNTIME: checkout origin differs from the guide")

        if git_run(
            ["merge-base", "--is-ancestor", recorded_current, recorded_revision], cwd=checkout
        ) != 0:
            fail("INVALID_UPGRADE_RUNTIME: candidate no longer descends from the current revision")

        installed_marker = os.path.join(
            self.project_root, ".agents", "skills", "sdd-playbook-upgrade", MANAGED_MARKER_NAME
        )
        if not os.path.isfile(installed_marker) or first_line(installed_marker) != recorded_revision:
            fail("INVALID_UPGRADE_RUNTIME: installed upgrade skill differs from the candidate")

        emit("UPGRADE_CURRENT: candidate provenance, ancestry, guide, and skill match.\n")

    # --------------------------------------------------------------- cleanup

    def cleanup_checkout(self):
        self.validate_runtime_boundary()
        guides = []
        if os.path.isfile(self.upgrade_guide_path):
            guides.append(self.upgrade_guide_path)
        if os.path.isfile(self.guide_path):
            guides.append(self.guide_path)
        if not guides:
            fail("no installer guide found in %s" % self.runtime_directory)
        for guide in guides:
            self.cleanup_guide_checkout(guide)

    def cleanup_guide_checkout(self, guide):
        cleanup_state = markdown_value("Cleanup state", guide)
        if cleanup_state == "COMPLETE":
            emit("Installer-owned checkout is already cleaned up for %s.\n" % guide)
            return
        if cleanup_state != "PENDING":
            fail("installation guide has an unknown cleanup state")

        checkout = markdown_value("Playbook checkout", guide)
        marker = markdown_value("Ownership marker", guide)
        recorded_project = markdown_value("Project root", guide)
        recorded_revision = markdown_value("Resolved revision", guide)
        recorded_common_directory = markdown_value("Git common directory", guide)
        recorded_git_directory = markdown_value("Git worktree directory", guide)
        recorded_worktree_state = markdown_value("Git worktree state", guide)

        if (
            not checkout
            or not marker
            or not recorded_project
            or not FULL_SHA_RE.match(recorded_revision)
        ):
            fail("installation guide is missing cleanup metadata")
        if not same_path(recorded_project, self.project_root):
            fail("installation guide belongs to a different project")
        if not os.path.isfile(marker):
            fail("ownership marker is missing")
        marker_signature = first_line(marker)
        if not file_has_line(marker, "project-root=%s" % self.project_root):
            fail("ownership marker belongs to a different project")

        if marker_signature == OWNERSHIP_SIGNATURE_V2:
            if (
                not same_path(recorded_common_directory, self.git_common_directory)
                or not same_path(recorded_git_directory, self.git_directory)
            ):
                fail("installation guide belongs to a different repository worktree")
            expected = os.path.join(
                self.runtime_directory, "checkouts", recorded_revision, "repository"
            )
            if not same_path(checkout, expected):
                fail("refusing cleanup outside the exact project-local runtime checkout")
            self.validate_checkout_boundary(checkout, recorded_revision, "INVALID_RUNTIME")
            if not same_path(marker, os.path.join(checkout, OWNERSHIP_MARKER_NAME)):
                fail("ownership marker path does not match the checkout")
            if not file_has_line(marker, "git-common-directory=%s" % self.git_common_directory):
                fail("ownership marker belongs to a different repository")
            if not file_has_line(marker, "git-directory=%s" % self.git_directory):
                fail("ownership marker belongs to a different worktree")
            if not recorded_worktree_state or not file_has_line(
                marker, "git-worktree-state=%s" % recorded_worktree_state
            ):
                fail("ownership marker and guide disagree on worktree state")
            removal_target = os.path.join(
                self.runtime_directory, "checkouts", recorded_revision
            )
        elif marker_signature == OWNERSHIP_SIGNATURE_V1:
            temp_root = physical(tempfile.gettempdir())
            legacy_parent = os.path.dirname(checkout.rstrip("/\\"))
            if (
                os.path.basename(checkout) != "repository"
                or not os.path.isdir(legacy_parent)
                or os.path.islink(legacy_parent)
                or os.path.islink(checkout)
            ):
                fail("refusing legacy cleanup outside an installer-owned temporary path")
            resolved_parent = physical(legacy_parent)
            if not same_path(legacy_parent, resolved_parent):
                fail("refusing legacy cleanup outside an immediate temporary child")
            if not same_path(os.path.dirname(resolved_parent), temp_root):
                fail("refusing legacy cleanup outside an immediate temporary child")
            if not os.path.basename(resolved_parent).startswith("sdd-playbook."):
                fail("refusing legacy cleanup without the installer directory prefix")
            if not same_path(marker, os.path.join(checkout, OWNERSHIP_MARKER_NAME)):
                fail("ownership marker path does not match the checkout")
            removal_target = resolved_parent
        else:
            fail("ownership marker signature is invalid")

        remove_tree(removal_target)
        updated = read_text(guide).replace(
            "| Cleanup state | `PENDING` |", "| Cleanup state | `COMPLETE` |"
        )
        write_text(guide, updated)
        refresh_guide_hash(guide, cwd=self.project_root)
        emit("Removed installer-owned checkout: %s\n" % checkout)

    # ----------------------------------------------------------- legacy entry

    def inspect_legacy_entry_readme(self):
        self.legacy_entry_readme_pending = False
        self.legacy_entry_readme_path = os.path.join(
            self.project_root, self.adoption_root, "README.md"
        )
        if not os.path.exists(self.legacy_entry_readme_path) and not os.path.islink(
            self.legacy_entry_readme_path
        ):
            return
        adoption_directory = os.path.dirname(self.legacy_entry_readme_path)
        adoption_expected = os.path.join(self.project_root, self.adoption_root)
        if not same_path(physical(adoption_directory), adoption_expected):
            fail(
                "legacy SDD entry point has uncertain linked ownership: %s"
                % os.path.relpath(self.legacy_entry_readme_path, self.project_root)
            )
        if os.path.islink(self.legacy_entry_readme_path) or not os.path.isfile(
            self.legacy_entry_readme_path
        ):
            fail(
                "legacy SDD entry point has unsupported ownership or file type: %s"
                % os.path.relpath(self.legacy_entry_readme_path, self.project_root)
            )
        relative_path = os.path.relpath(self.legacy_entry_readme_path, self.project_root).replace(
            os.sep, "/"
        )
        if git_capture(["cat-file", "-e", "HEAD:%s" % relative_path], cwd=self.project_root) is None:
            fail(
                "legacy SDD entry point is not tracked by HEAD; preserve it and resolve "
                "ownership before upgrade: %s" % relative_path
            )
        actual_blob = git_capture(
            ["hash-object", self.legacy_entry_readme_path], cwd=self.project_root
        )
        expected_blob = legacy_entry_readme_blob(cwd=self.project_root)
        head_blob = git_capture(["rev-parse", "HEAD:%s" % relative_path], cwd=self.project_root)
        if head_blob != expected_blob or actual_blob != expected_blob:
            fail(
                "legacy SDD entry point is customized; preserve it and resolve ownership "
                "before upgrade: %s" % relative_path
            )
        self.legacy_entry_readme_pending = True

    # ----------------------------------------------------------------- guides

    def build_agent_guide(self, guide_profile, skill_name, review_skill_available):
        resolved_revision = self.resolved_revision
        review_state = "available" if review_skill_available else "unavailable"
        parts = []
        parts.append(
            "# SDD Agent Guide\n"
            "\n"
            "This machine-local guide supplies verified provenance and safety boundaries; it\n"
            "is not a project system contract or a prescribed implementation path.\n"
            "\n"
            "## Installation state\n"
            "\n"
            "| Field | Value |\n"
            "| --- | --- |\n"
            "| Project root | `%s` |\n"
            "| Git common directory | `%s` |\n"
            "| Git worktree directory | `%s` |\n"
            "| Git worktree state | `%s` |\n"
            "| Adoption manifest | `%s` |\n"
            "| Manifest state detected | `%s` |\n"
            "| Manifest state before block | `%s` |\n"
            "| Generator version | `%s` |\n"
            "| Generator schema version | `%s` |\n"
            "| Guide profile | `%s` |\n"
            "| Required skill | `%s` |\n"
            "| Installed skill | `.agents/skills/%s/SKILL.md` |\n"
            "| Feature review skill | `%s` |\n"
            "| Content hash | `%s` |\n"
            "\n"
            "## Playbook runtime\n"
            "\n"
            "| Field | Value |\n"
            "| --- | --- |\n"
            "| Source repository | `%s` |\n"
            "| Requested revision | `%s` |\n"
            "| Resolved revision | `%s` |\n"
            "| Playbook checkout | `%s` |\n"
            "| Access mode | `read-only` |\n"
            "\n"
            "## Cleanup record\n"
            "\n"
            "| Field | Value |\n"
            "| --- | --- |\n"
            "| Checkout owner | `%s` |\n"
            "| Ownership marker | `%s` |\n"
            "| Cleanup command | `%s` |\n"
            "| Cleanup state | `PENDING` |\n"
            "\n"
            % (
                self.project_root,
                self.git_common_directory,
                self.git_directory,
                self.git_worktree_state,
                self.manifest_relative_path,
                self.manifest_state,
                self.manifest_state_before_block,
                GENERATOR_VERSION,
                GUIDE_SCHEMA_VERSION,
                guide_profile,
                skill_name,
                skill_name,
                review_state,
                CONTENT_HASH_PLACEHOLDER,
                self.resolved_repository,
                self.requested_revision,
                resolved_revision,
                self.playbook_checkout,
                INSTALLER_NAME,
                self.marker_path,
                CLEANUP_COMMAND,
            )
        )

        if guide_profile == "adoption":
            parts.append(
                "## Adoption outcome and boundaries\n"
                "\n"
                "- Verify the recorded project root, checkout repository, resolved revision,\n"
                "  ownership marker, and guide hash before using the checkout.\n"
                "- Read and follow the installed required skill. Preserve project authority,\n"
                "  unrelated changes, allowed write scope, and required review.\n"
                "- Create only the manifest and neutral whiteboard. Record durable repository\n"
                "  and revision values in the manifest; never copy machine-local paths or infer\n"
                "  a feature need.\n"
                "- Stop for required reviewer or owner acceptance, missing authority, or a\n"
                "  critical safety mismatch. Never self-approve.\n"
                "\n"
                "## Expected completion boundary\n"
                "\n"
                "- The adoption manifest is `INSTALLED` through recorded reviewer authority.\n"
                "- The project solution whiteboard exists in its empty initial state.\n"
                "- No feature plan, product code, or delivery claim has been inferred.\n"
            )
        else:
            workflow = (
                "## Delivery outcome and boundaries\n"
                "\n"
                "- Verify the recorded project root, checkout repository, resolved revision,\n"
                "  ownership marker, and guide hash; run `%s --validate` when the\n"
                "  runtime may have drifted.\n"
                "- Read and follow `sdd-project-workflow`. The manifest owns installation\n"
                "  authority, the whiteboard owns design, and the implementation plan owns all\n"
                "  task and delivery state.\n" % INSTALLER_COMMAND
            )
            if review_skill_available:
                workflow += (
                    "- At the concluded-whiteboard review gate, require both retained reviewers to\n"
                    "  read the installed `%s` skill once; later gates send the\n"
                    "  focused packet defined by that skill.\n" % FEATURE_REVIEW_SKILL
                )
            workflow += (
                "- Work inside authorized scope, preserve unrelated work, and keep required\n"
                "  checks, review, merge authority, and destructive-action safeguards.\n"
                "- Pull requests own review and delivery evidence. Stop for missing authority,\n"
                "  required acceptance, or a critical safety or policy mismatch. Never\n"
                "  self-approve.\n"
                "\n"
                "## Expected completion boundary\n"
                "\n"
                "- The authorized work unit has reached its actual completion or review boundary.\n"
                "- Required checks and lifecycle invariants are reported separately.\n"
                "- The implementation plan, when present, accurately records task state and\n"
                "  remaining work.\n"
            )
            parts.append(workflow)

        parts.append(
            "\n"
            "## Runtime replacement\n"
            "\n"
            "Reuse this guide only while its required skill and immutable revision match the\n"
            "manifest. Finish and review the current boundary before replacing a pending\n"
            "runtime. After an accepted state change, clean up the owned checkout,\n"
            "regenerate the guide, and verify its manifest state, skill, repository, and\n"
            "revision.\n"
        )
        return "".join(parts)

    def build_upgrade_guide(self, checkout, marker, resolved_revision, resolved_repository):
        return (
            "# SDD Playbook Upgrade Guide\n"
            "\n"
            "This machine-local guide prepares a candidate upgrade. It does not change the\n"
            "active project pin, approve compatibility, or authorize work in an active task.\n"
            "\n"
            "## Upgrade state\n"
            "\n"
            "| Field | Value |\n"
            "| --- | --- |\n"
            "| Project root | `%s` |\n"
            "| Git common directory | `%s` |\n"
            "| Git worktree directory | `%s` |\n"
            "| Git worktree state | `%s` |\n"
            "| Adoption manifest | `%s` |\n"
            "| Manifest state detected | `%s` |\n"
            "| Generator version | `%s` |\n"
            "| Generator schema version | `%s` |\n"
            "| Required skill | `sdd-playbook-upgrade` |\n"
            "| Installed skill | `.agents/skills/sdd-playbook-upgrade/SKILL.md` |\n"
            "| Review evidence destination | Pull request |\n"
            "| Content hash | `%s` |\n"
            "\n"
            "## Revision boundary\n"
            "\n"
            "| Field | Value |\n"
            "| --- | --- |\n"
            "| Source repository | `%s` |\n"
            "| Current revision | `%s` |\n"
            "| Requested revision | `%s` |\n"
            "| Resolved revision | `%s` |\n"
            "| Playbook checkout | `%s` |\n"
            "| Access mode | `read-only` |\n"
            "\n"
            "## Cleanup record\n"
            "\n"
            "| Field | Value |\n"
            "| --- | --- |\n"
            "| Checkout owner | `%s` |\n"
            "| Ownership marker | `%s` |\n"
            "| Cleanup command | `%s` |\n"
            "| Cleanup state | `PENDING` |\n"
            "\n"
            "## Outcome and boundaries\n"
            "\n"
            "| Concern | Required result |\n"
            "| --- | --- |\n"
            "| Authority | The current pin remains authoritative until the exact synchronized candidate receives independent and human acceptance. |\n"
            "| Scope | Reusable SDD documents match the resolved immutable revision; unrelated project content and active work remain unchanged. |\n"
            "| Legacy entry migration | If the verified legacy SDD README is removed, inspect tracked live agent and contributor entry points, including applicable AGENTS.md files, and update references to its path in the same candidate. A dangling reference blocks completion. |\n"
            "| Project responsibility | No playbook lifecycle validators, evidence helpers, publication tooling, CI workflows, or playbook tests are added to the project. |\n"
            "| Pre-work runtime | Before candidate content is consumed or project files change, this runtime validates as `UPGRADE_CURRENT`; provenance, hash, marker, pin, or installed-skill mismatch blocks work. |\n"
            "| Consistency | Canonical terminology, links, states, authority, and continuation rules agree; unresolved canonical conflict or failed applicable validation blocks acceptance. |\n"
            "| Recovery | A failed candidate leaves or restores the last accepted pin and runtime without discarding valid project work or failure evidence. |\n"
            "| Completion | The accepted pin is recorded, normal runtime is regenerated and validates, and any superseded installer-owned checkout is cleaned up. |\n"
            "\n"
            "The agent chooses comparison, synchronization, batching, validation, and safe\n"
            "recovery methods within these boundaries and the installed skill.\n"
            "\n"
            "## Prompt\n"
            "\n"
            "Use `.sdd-runtime/playbook-upgrade-guide.md` to synchronize the project with\n"
            "the latest playbook revision.\n"
            % (
                self.project_root,
                self.git_common_directory,
                self.git_directory,
                self.git_worktree_state,
                self.manifest_relative_path,
                self.manifest_state,
                GENERATOR_VERSION,
                UPGRADE_GUIDE_SCHEMA_VERSION,
                CONTENT_HASH_PLACEHOLDER,
                resolved_repository,
                self.pinned_revision,
                self.requested_revision,
                resolved_revision,
                checkout,
                INSTALLER_NAME,
                marker,
                CLEANUP_COMMAND,
            )
        )

    # ------------------------------------------------------------------ skill

    def drop_managed_skill(self, destination):
        if os.path.isfile(os.path.join(destination, MANAGED_MARKER_NAME)):
            remove_tree(destination)

    def write_ownership_marker(self, marker):
        write_text(
            marker,
            "%s\nproject-root=%s\ngit-common-directory=%s\ngit-directory=%s\n"
            "git-worktree-state=%s\n"
            % (
                OWNERSHIP_SIGNATURE_V2,
                self.project_root,
                self.git_common_directory,
                self.git_directory,
                self.git_worktree_state,
            ),
        )

    # ------------------------------------------------------------------- flow

    def run(self):
        self.resolve_context()

        if self.cleanup_only:
            self.cleanup_checkout()
            return 0

        if self.validate_only:
            if os.path.isfile(self.upgrade_guide_path):
                upgrade_cleanup_state = markdown_value("Cleanup state", self.upgrade_guide_path)
                if upgrade_cleanup_state == "PENDING":
                    self.validate_upgrade_runtime()
                elif upgrade_cleanup_state == "COMPLETE":
                    self.validate_runtime()
                else:
                    fail("INVALID_UPGRADE_RUNTIME: unknown cleanup state")
            else:
                self.validate_runtime()
            return 0

        if self.upgrade_mode:
            self.prepare_upgrade()
            return 0

        self.install()
        return 0

    def install(self):
        if os.path.isfile(self.guide_path):
            existing_cleanup_state = markdown_value("Cleanup state", self.guide_path)
            if existing_cleanup_state == "PENDING":
                fail(
                    "an installer-owned checkout is still pending; run %s --cleanup first"
                    % INSTALLER_COMMAND
                )
            if existing_cleanup_state != "COMPLETE":
                fail("existing installation guide has an unknown cleanup state")

        self.ensure_runtime_excludes()
        self.prepare_runtime_storage()

        staging = tempfile.mkdtemp(
            prefix=".staging.", dir=os.path.join(self.runtime_directory, "checkouts")
        )
        try:
            checkout = os.path.join(staging, "repository")
            if git_run(["clone", "--quiet", "--filter=blob:none", self.playbook_repository, checkout]):
                fail("cannot clone playbook repository: %s" % self.playbook_repository)
            if git_run(["checkout", "--quiet", "--detach", self.requested_revision], cwd=checkout):
                fail("cannot resolve playbook revision: %s" % self.requested_revision)

            resolved_revision = git_capture(["rev-parse", "HEAD"], cwd=checkout)
            if not resolved_revision:
                fail("cannot resolve the playbook revision")
            resolved_repository = git_capture(["remote", "get-url", "origin"], cwd=checkout)
            if not resolved_repository:
                fail("cannot resolve the playbook repository origin")

            final_directory = os.path.join(
                self.runtime_directory, "checkouts", resolved_revision
            )
            if os.path.exists(final_directory):
                fail("project-local checkout already exists: %s" % final_directory)
            shutil.move(staging, final_directory)
            staging = final_directory

            checkout = os.path.join(final_directory, "repository")
            marker_path = os.path.join(checkout, OWNERSHIP_MARKER_NAME)
            self.write_ownership_marker(marker_path)

            guide_profile = profile_for_state(
                self.manifest_state, self.manifest_state_before_block
            )
            if guide_profile is None:
                fail(
                    "unsupported manifest state or missing State before block: %s"
                    % self.manifest_state
                )
            skill_name = skill_for_profile(guide_profile)
            review_skill_available = False

            skill_source = os.path.join(checkout, "skills", skill_name)
            skill_destination = os.path.join(
                self.project_root, ".agents", "skills", skill_name
            )
            if not os.path.isfile(os.path.join(skill_source, "SKILL.md")):
                fail("resolved playbook does not contain skill: %s" % skill_name)

            if os.path.exists(skill_destination):
                if not os.path.isfile(
                    os.path.join(skill_destination, MANAGED_MARKER_NAME)
                ):
                    fail("refusing to overwrite unmanaged skill: %s" % skill_destination)
                remove_tree(skill_destination)
            os.makedirs(os.path.dirname(skill_destination), exist_ok=True)
            shutil.copytree(skill_source, skill_destination, symlinks=True)
            write_text(
                os.path.join(skill_destination, MANAGED_MARKER_NAME), resolved_revision + "\n"
            )

            review_skill_destination = os.path.join(
                self.project_root, ".agents", "skills", FEATURE_REVIEW_SKILL
            )
            if guide_profile == "workflow":
                review_skill_source = os.path.join(checkout, "skills", FEATURE_REVIEW_SKILL)
                if os.path.isfile(os.path.join(review_skill_source, "SKILL.md")):
                    review_skill_available = True
                    if os.path.exists(review_skill_destination):
                        if not os.path.isfile(
                            os.path.join(review_skill_destination, MANAGED_MARKER_NAME)
                        ):
                            fail(
                                "refusing to overwrite unmanaged skill: %s"
                                % review_skill_destination
                            )
                        remove_tree(review_skill_destination)
                    shutil.copytree(review_skill_source, review_skill_destination, symlinks=True)
                    write_text(
                        os.path.join(review_skill_destination, MANAGED_MARKER_NAME),
                        resolved_revision + "\n",
                    )
                elif os.path.isfile(
                    os.path.join(review_skill_destination, MANAGED_MARKER_NAME)
                ):
                    remove_tree(review_skill_destination)
            elif os.path.isfile(
                os.path.join(review_skill_destination, MANAGED_MARKER_NAME)
            ):
                remove_tree(review_skill_destination)

            other_skill = (
                "sdd-project-workflow"
                if skill_name == "sdd-project-adoption"
                else "sdd-project-adoption"
            )
            self.drop_managed_skill(
                os.path.join(self.project_root, ".agents", "skills", other_skill)
            )
            self.drop_managed_skill(
                os.path.join(self.project_root, ".agents", "skills", "sdd-playbook-upgrade")
            )

            # Consumed by build_agent_guide, which mirrors the shell template.
            self.resolved_revision = resolved_revision
            self.resolved_repository = resolved_repository
            self.playbook_checkout = checkout
            self.marker_path = marker_path

            os.makedirs(self.runtime_directory, exist_ok=True)
            write_text(
                self.guide_path,
                self.build_agent_guide(guide_profile, skill_name, review_skill_available),
            )
            refresh_guide_hash(self.guide_path, cwd=self.project_root)

            emit("Installed skill: %s\n" % skill_name)
            emit("Generated guide: %s\n\n" % self.guide_path)
            emit("Prompt the agent with:\n\n")
            emit(
                "Use %s/agent-guide.md for verified provenance and follow its installed skill.\n"
                % RUNTIME_ROOT
            )
        except BaseException:
            remove_tree_quietly(staging)
            raise

    def prepare_upgrade(self):
        if not os.path.isfile(self.manifest_path):
            fail("upgrade requires an installed project adoption manifest")
        if self.manifest_state != "INSTALLED":
            fail("upgrade requires a stable installed state; found %s" % self.manifest_state)
        if not self.pinned_revision:
            fail("upgrade requires an exact 40-character Playbook revision in the manifest")

        manifest_repository = markdown_value("Playbook source repository", self.manifest_path)
        if not manifest_repository:
            fail("upgrade requires Playbook source repository in the manifest")
        if canonical_repository(manifest_repository) != canonical_repository(
            self.playbook_repository
        ):
            fail("requested repository differs from the manifest playbook source")
        if not os.path.isfile(
            os.path.join(self.project_root, self.adoption_root, "solution-whiteboard.md")
        ):
            fail("upgrade requires the project solution whiteboard")
        self.inspect_legacy_entry_readme()

        if not os.path.isfile(self.guide_path):
            emit("Bootstrapping the manifest-pinned runtime in this worktree.\n")
            bootstrap = Installer(
                {
                    "repository": manifest_repository,
                    "revision": self.pinned_revision,
                    "revision_explicit": True,
                    "adoption_root": self.adoption_root,
                    "manifest": self.manifest_relative_path,
                    "cleanup": False,
                    "validate": False,
                    "upgrade": False,
                }
            )
            bootstrap.run()

        recorded_hash = markdown_value("Content hash", self.guide_path)
        actual_hash = guide_content_hash(self.guide_path, cwd=self.project_root)
        if recorded_hash != actual_hash:
            fail("INVALID_RUNTIME: current guide content hash mismatch")

        recorded_revision = markdown_value("Resolved revision", self.guide_path)
        recorded_repository = markdown_value("Source repository", self.guide_path)
        recorded_project = markdown_value("Project root", self.guide_path)
        recorded_common_directory = markdown_value("Git common directory", self.guide_path)
        recorded_git_directory = markdown_value("Git worktree directory", self.guide_path)
        recorded_worktree_state = markdown_value("Git worktree state", self.guide_path)
        cleanup_state = markdown_value("Cleanup state", self.guide_path)

        if (
            not recorded_project
            or not recorded_common_directory
            or not recorded_git_directory
            or not same_path(recorded_project, self.project_root)
            or not same_path(recorded_common_directory, self.git_common_directory)
            or not same_path(recorded_git_directory, self.git_directory)
            or recorded_worktree_state != self.git_worktree_state
        ):
            fail("INVALID_RUNTIME: current guide belongs to a different repository worktree")
        if recorded_revision != self.pinned_revision:
            fail("STALE_RUNTIME: current guide differs from the manifest-pinned revision")
        if canonical_repository(recorded_repository) != canonical_repository(manifest_repository):
            fail("INVALID_RUNTIME: current guide repository differs from the manifest")
        if cleanup_state not in ("PENDING", "COMPLETE"):
            fail("INVALID_RUNTIME: current guide has an unknown cleanup state")

        installed_marker = os.path.join(
            self.project_root, ".agents", "skills", "sdd-project-workflow", MANAGED_MARKER_NAME
        )
        if not os.path.isfile(installed_marker):
            fail("upgrade requires the managed sdd-project-workflow skill")
        if first_line(installed_marker) != self.pinned_revision:
            fail("STALE_RUNTIME: installed workflow skill differs from the manifest pin")

        plan_path = os.path.join(
            self.project_root, self.adoption_root, "implementation-plan.md"
        )
        if os.path.isfile(plan_path):
            active_tasks = ""
            active_rows = ""
            for line in read_text(plan_path).split("\n"):
                cells = line.split("|")
                if len(cells) < 3:
                    continue
                second = cells[1].strip().strip("`").strip() if len(cells) > 1 else ""
                third = cells[2].strip().strip("`").strip() if len(cells) > 2 else ""
                if not active_tasks and second == "Active tasks":
                    active_tasks = third
                if not active_rows and third in ("IN_PROGRESS", "VERIFYING"):
                    active_rows = line
            if active_rows or (active_tasks and active_tasks != "None"):
                fail(
                    "upgrade is allowed only between tasks; active work found in %s"
                    % os.path.relpath(plan_path, self.project_root)
                )

        if os.path.isfile(self.upgrade_guide_path):
            if markdown_value("Cleanup state", self.upgrade_guide_path) != "COMPLETE":
                fail(
                    "an upgrade checkout is still pending; finish it or run %s"
                    % CLEANUP_COMMAND
                )

        self.ensure_runtime_excludes()
        self.prepare_runtime_storage()

        staging = tempfile.mkdtemp(
            prefix=".staging.", dir=os.path.join(self.runtime_directory, "checkouts")
        )
        skill_destination = os.path.join(
            self.project_root, ".agents", "skills", "sdd-playbook-upgrade"
        )
        failed_revision = ""
        try:
            checkout = os.path.join(staging, "repository")
            if git_run(["clone", "--quiet", "--filter=blob:none", self.playbook_repository, checkout]):
                fail("cannot clone playbook repository: %s" % self.playbook_repository)
            if git_run(["checkout", "--quiet", "--detach", self.requested_revision], cwd=checkout):
                fail("cannot resolve candidate playbook revision: %s" % self.requested_revision)

            resolved_revision = git_capture(["rev-parse", "HEAD"], cwd=checkout)
            if not resolved_revision:
                fail("cannot resolve the candidate playbook revision")
            failed_revision = resolved_revision
            resolved_repository = git_capture(["remote", "get-url", "origin"], cwd=checkout)
            if not resolved_repository:
                fail("cannot resolve the candidate playbook repository origin")

            if resolved_revision == self.pinned_revision:
                fail("project already uses the resolved playbook revision")
            if git_capture(["cat-file", "-e", "%s^{commit}" % self.pinned_revision], cwd=checkout) is None:
                fail("manifest-pinned revision is not available from the candidate repository")
            if (
                git_run(
                    ["merge-base", "--is-ancestor", self.pinned_revision, resolved_revision],
                    cwd=checkout,
                )
                != 0
            ):
                fail("candidate revision does not descend from the manifest-pinned revision")

            final_directory = os.path.join(
                self.runtime_directory, "checkouts", resolved_revision
            )
            if os.path.exists(final_directory):
                fail("project-local candidate checkout already exists: %s" % final_directory)
            shutil.move(staging, final_directory)
            staging = final_directory
            checkout = os.path.join(final_directory, "repository")

            skill_source = os.path.join(checkout, "skills", "sdd-playbook-upgrade")
            if not os.path.isfile(os.path.join(skill_source, "SKILL.md")):
                fail("candidate playbook does not contain sdd-playbook-upgrade")
            for root, directories, files in os.walk(skill_source):
                for name in list(directories) + list(files):
                    if os.path.islink(os.path.join(root, name)):
                        fail("candidate upgrade skill contains a symbolic link")

            if os.path.exists(skill_destination):
                if not os.path.isfile(os.path.join(skill_destination, MANAGED_MARKER_NAME)):
                    fail("refusing to overwrite unmanaged skill: %s" % skill_destination)
                remove_tree(skill_destination)
            os.makedirs(os.path.dirname(skill_destination), exist_ok=True)
            os.makedirs(self.runtime_directory, exist_ok=True)
            shutil.copytree(skill_source, skill_destination, symlinks=True)
            write_text(
                os.path.join(skill_destination, MANAGED_MARKER_NAME), resolved_revision + "\n"
            )

            marker = os.path.join(checkout, OWNERSHIP_MARKER_NAME)
            self.write_ownership_marker(marker)
            write_text(
                self.upgrade_guide_path,
                self.build_upgrade_guide(
                    checkout, marker, resolved_revision, resolved_repository
                ),
            )
            refresh_guide_hash(self.upgrade_guide_path, cwd=self.project_root)

            emit("Prepared candidate revision: %s\n" % resolved_revision)
            emit("Installed skill: sdd-playbook-upgrade\n")
            emit("Generated guide: %s\n\n" % self.upgrade_guide_path)
            emit("Prompt the agent with:\n\n")
            emit(
                "Use %s/playbook-upgrade-guide.md to synchronize the project with the "
                "latest playbook revision.\n" % RUNTIME_ROOT
            )

            if self.legacy_entry_readme_pending:
                self.inspect_legacy_entry_readme()
                if not self.legacy_entry_readme_pending:
                    fail("verified legacy SDD entry point changed before removal")
                emit(
                    "Removing verified legacy SDD entry point: %s\n"
                    % os.path.relpath(self.legacy_entry_readme_path, self.project_root)
                )
                os.remove(self.legacy_entry_readme_path)
        except BaseException:
            remove_tree_quietly(staging)
            managed = os.path.join(skill_destination, MANAGED_MARKER_NAME)
            if failed_revision and os.path.isfile(managed):
                if first_line(managed) == failed_revision:
                    remove_tree_quietly(skill_destination)
            raise


def parse_arguments(argv):
    options = {
        "repository": PLAYBOOK_REPOSITORY,
        "revision": DEFAULT_REVISION,
        "revision_explicit": False,
        "adoption_root": DEFAULT_ADOPTION_ROOT,
        "manifest": "",
        "cleanup": False,
        "validate": False,
        "upgrade": False,
    }
    index = 0
    while index < len(argv):
        argument = argv[index]
        if argument == "--repository":
            if index + 1 >= len(argv):
                fail("--repository requires a value")
            options["repository"] = argv[index + 1]
            index += 2
        elif argument == "--revision":
            if index + 1 >= len(argv):
                fail("--revision requires a value")
            options["revision"] = argv[index + 1]
            options["revision_explicit"] = True
            index += 2
        elif argument == "--adoption-root":
            if index + 1 >= len(argv):
                fail("--adoption-root requires a value")
            value = argv[index + 1].replace("\\", "/")
            if value.endswith("/"):
                value = value[:-1]
            options["adoption_root"] = value
            index += 2
        elif argument == "--manifest":
            if index + 1 >= len(argv):
                fail("--manifest requires a value")
            options["manifest"] = argv[index + 1].replace("\\", "/")
            index += 2
        elif argument == "--cleanup":
            options["cleanup"] = True
            index += 1
        elif argument == "--validate":
            options["validate"] = True
            index += 1
        elif argument == "--upgrade":
            options["upgrade"] = True
            index += 1
        elif argument in ("--help", "-h"):
            emit(USAGE)
            raise SystemExit(0)
        else:
            fail("unknown option: %s" % argument)

    mode_count = sum(
        1 for key in ("cleanup", "validate", "upgrade") if options[key]
    )
    if mode_count > 1:
        fail("--cleanup, --validate, and --upgrade are mutually exclusive")
    if options["upgrade"] and options["revision_explicit"]:
        fail("--revision cannot be used with --upgrade; upgrade always resolves latest main")
    return options


def main(argv):
    try:
        options = parse_arguments(argv)
    except InstallerError as error:
        sys.stderr.write("ERROR: %s\n" % error)
        return 1
    try:
        return Installer(options).run()
    except InstallerError as error:
        sys.stderr.write("ERROR: %s\n" % error)
        return 1
    except OSError as error:
        sys.stderr.write("ERROR: %s\n" % error)
        return 1
    except SystemExit:
        raise
    except KeyboardInterrupt:
        sys.stderr.write("ERROR: interrupted\n")
        return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
