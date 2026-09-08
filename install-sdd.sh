#!/usr/bin/env bash

set -euo pipefail

PLAYBOOK_REPOSITORY="https://github.com/hhhhhusky777/spec-driven-delivery-playbook.git"
REQUESTED_REVISION="main"
REVISION_EXPLICIT=false
ADOPTION_ROOT=".github/spec-driven-delivery"
MANIFEST_RELATIVE_PATH=""
RUNTIME_ROOT=".sdd-runtime"
CLEANUP_ONLY=false
VALIDATE_ONLY=false
UPGRADE_MODE=false
GUIDE_SCHEMA_VERSION="3"
UPGRADE_GUIDE_SCHEMA_VERSION="2"
GENERATOR_VERSION="2.2.0"

usage() {
  cat <<'EOF'
Usage: ./install-sdd.sh [options]

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
EOF
}

fail() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

while (($# > 0)); do
  case "$1" in
    --repository)
      (($# >= 2)) || fail "--repository requires a value"
      PLAYBOOK_REPOSITORY=$2
      shift 2
      ;;
    --revision)
      (($# >= 2)) || fail "--revision requires a value"
      REQUESTED_REVISION=$2
      REVISION_EXPLICIT=true
      shift 2
      ;;
    --adoption-root)
      (($# >= 2)) || fail "--adoption-root requires a value"
      ADOPTION_ROOT=${2%/}
      shift 2
      ;;
    --manifest)
      (($# >= 2)) || fail "--manifest requires a value"
      MANIFEST_RELATIVE_PATH=$2
      shift 2
      ;;
    --cleanup)
      CLEANUP_ONLY=true
      shift
      ;;
    --validate)
      VALIDATE_ONLY=true
      shift
      ;;
    --upgrade)
      UPGRADE_MODE=true
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      fail "unknown option: $1"
      ;;
  esac
done

MODE_COUNT=0
[[ "$CLEANUP_ONLY" == true ]] && MODE_COUNT=$((MODE_COUNT + 1))
[[ "$VALIDATE_ONLY" == true ]] && MODE_COUNT=$((MODE_COUNT + 1))
[[ "$UPGRADE_MODE" == true ]] && MODE_COUNT=$((MODE_COUNT + 1))
if ((MODE_COUNT > 1)); then
  fail "--cleanup, --validate, and --upgrade are mutually exclusive"
fi
if [[ "$UPGRADE_MODE" == true && "$REVISION_EXPLICIT" == true ]]; then
  fail "--revision cannot be used with --upgrade; upgrade always resolves latest main"
fi

command -v git >/dev/null 2>&1 || fail "git is required"

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) ||
  fail "run this installer from a Git project root"
PROJECT_ROOT=$(cd "$PROJECT_ROOT" && pwd -P)
CURRENT_ROOT=$(pwd -P)
[[ "$CURRENT_ROOT" == "$PROJECT_ROOT" ]] ||
  fail "run this installer from the project root: $PROJECT_ROOT"
GIT_COMMON_DIRECTORY=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null) ||
  fail "cannot resolve the repository identity"
GIT_DIRECTORY=$(git rev-parse --absolute-git-dir 2>/dev/null) ||
  fail "cannot resolve the worktree identity"
GIT_WORKTREE_STATE=$(git symbolic-ref --quiet HEAD 2>/dev/null ||
  printf 'detached:%s\n' "$(git rev-parse HEAD 2>/dev/null)") ||
  fail "cannot resolve the worktree branch or detached state"

[[ -n "$MANIFEST_RELATIVE_PATH" ]] ||
  MANIFEST_RELATIVE_PATH="$ADOPTION_ROOT/project-adoption-manifest.md"

case "$MANIFEST_RELATIVE_PATH" in
  /*|../*|*/../*|*/..)
    fail "manifest path must stay inside the project root"
    ;;
esac

case "$ADOPTION_ROOT" in
  ""|/*|../*|*/../*|*/..)
    fail "adoption root must be a non-empty path inside the project root"
    ;;
esac

RUNTIME_DIRECTORY="$PROJECT_ROOT/$RUNTIME_ROOT"
GUIDE_PATH="$RUNTIME_DIRECTORY/agent-guide.md"
UPGRADE_GUIDE_PATH="$RUNTIME_DIRECTORY/playbook-upgrade-guide.md"
MANIFEST_PATH="$PROJECT_ROOT/$MANIFEST_RELATIVE_PATH"
MANIFEST_STATE="ABSENT"
MANIFEST_STATE_BEFORE_BLOCK="NONE"
PINNED_REVISION=""
if [[ -f "$MANIFEST_PATH" ]]; then
  MANIFEST_STATE=$(
    sed -n 's/^| Adoption state | `\([^`]*\)` |$/\1/p' "$MANIFEST_PATH" | head -n 1
  )
  [[ -n "$MANIFEST_STATE" ]] || MANIFEST_STATE="UNKNOWN"
  MANIFEST_STATE_BEFORE_BLOCK=$(
    sed -n 's/^| State before block | `\([^`]*\)` |$/\1/p' "$MANIFEST_PATH" | head -n 1
  )
  [[ -n "$MANIFEST_STATE_BEFORE_BLOCK" ]] || MANIFEST_STATE_BEFORE_BLOCK="NONE"

  PINNED_REVISION=$(
    sed -n 's/^| Playbook revision | `\([0-9a-fA-F]\{40\}\)` |$/\1/p' \
      "$MANIFEST_PATH" | head -n 1
  )
  if [[ "$REVISION_EXPLICIT" == false && "$UPGRADE_MODE" == false ]]; then
    if [[ -n "$PINNED_REVISION" ]]; then
      REQUESTED_REVISION=$PINNED_REVISION
    fi
  fi
fi

markdown_value() {
  local label=$1
  local file=$2
  awk -v prefix="| ${label} | \`" '
    index($0, prefix) == 1 {
      value = substr($0, length(prefix) + 1)
      sub(/` \|$/, "", value)
      print value
      exit
    }
  ' "$file"
}

manifest_entry_point() {
  awk -F'|' '
    function trim(value) {
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", value)
      return value
    }
    trim($2) == "Stable entry point" {
      print trim($3)
      exit
    }
  ' "$MANIFEST_PATH"
}

manifest_has_entry_point() {
  awk -F'|' '
    function trim(value) {
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", value)
      return value
    }
    trim($2) == "Stable entry point" {
      found = 1
      exit
    }
    END {
      exit !found
    }
  ' "$MANIFEST_PATH"
}

entry_point_target() {
  awk '
    match($0, /\]\([^)]*\)/) {
      print substr($0, RSTART + 2, RLENGTH - 3)
      exit
    }
    match($0, /`[^`]+`/) {
      print substr($0, RSTART + 1, RLENGTH - 2)
      exit
    }
    length($0) {
      print $0
      exit
    }
  '
}

validate_project_entry_point() {
  local entry target entry_base candidate_directory candidate
  if manifest_has_entry_point; then
    entry=$(manifest_entry_point)
    target=$(printf '%s\n' "$entry" | entry_point_target)
    [[ -n "$target" ]] ||
      fail "upgrade requires Stable entry point to record a local project entry point"
    target=${target#<}
    target=${target%>}
    target=${target%%\#*}
    target=${target%%\?*}
    if [[ "$target" =~ ^[[:alpha:]][[:alnum:].+-]*: ]]; then
      fail "upgrade requires Stable entry point to record a local project entry point"
    fi
    case "$target" in
      ""|/*)
        fail "upgrade requires Stable entry point to record a local project entry point"
        ;;
    esac

    if [[ "$entry" == \[*\]\(*\) ]]; then
      entry_base=$(cd "$(dirname "$MANIFEST_PATH")" && pwd -P)
    else
      entry_base=$PROJECT_ROOT
    fi
    candidate_directory=$(cd "$(dirname "$entry_base/$target")" 2>/dev/null && pwd -P) ||
      fail "recorded project entry point is unavailable: $target"
    candidate="$candidate_directory/$(basename "$target")"
    case "$candidate" in
      "$PROJECT_ROOT"/*) ;;
      *) fail "recorded project entry point must stay inside the project root: $target" ;;
    esac
    [[ ! -L "$entry_base/$target" ]] ||
      fail "recorded project entry point must not be a symbolic link: $target"
    [[ -f "$candidate" ]] || fail "recorded project entry point is unavailable: $target"
    return
  fi

  fail "upgrade requires Stable entry point in the manifest"
}

profile_for_state() {
  case "$1" in
    ABSENT|DRAFT)
      printf '%s\n' "adoption"
      ;;
    INSTALLED)
      printf '%s\n' "workflow"
      ;;
    BLOCKED)
      case "${2:-NONE}" in
        DRAFT) printf '%s\n' "adoption" ;;
        INSTALLED)
          printf '%s\n' "workflow"
          ;;
        *) return 1 ;;
      esac
      ;;
    *)
      return 1
      ;;
  esac
}

skill_for_profile() {
  case "$1" in
    adoption) printf '%s\n' "sdd-project-adoption" ;;
    workflow) printf '%s\n' "sdd-project-workflow" ;;
    *) return 1 ;;
  esac
}

guide_content_hash() {
  sed 's/^| Content hash | `[^`]*` |$/| Content hash | `<CONTENT_HASH>` |/' "$1" |
    git hash-object --stdin
}

refresh_guide_hash() {
  local file=$1 hash temporary
  temporary="$file.hash.tmp"
  sed 's/^| Content hash | `[^`]*` |$/| Content hash | `<CONTENT_HASH>` |/' \
    "$file" >"$temporary"
  mv "$temporary" "$file"
  hash=$(guide_content_hash "$file")
  temporary="$file.hash.tmp"
  sed "s/^| Content hash | \`<CONTENT_HASH>\` |$/| Content hash | \`$hash\` |/" \
    "$file" >"$temporary"
  mv "$temporary" "$file"
}

validate_runtime_boundary() {
  local checkout_root="$RUNTIME_DIRECTORY/checkouts" resolved
  [[ ! -L "$RUNTIME_DIRECTORY" && ! -L "$checkout_root" ]] ||
    fail "INVALID_RUNTIME: project runtime boundary must not be a symbolic link"
  if [[ -d "$RUNTIME_DIRECTORY" ]]; then
    resolved=$(cd "$RUNTIME_DIRECTORY" && pwd -P)
    [[ "$resolved" == "$RUNTIME_DIRECTORY" ]] ||
      fail "INVALID_RUNTIME: project runtime resolves outside the physical worktree"
  fi
  if [[ -d "$checkout_root" ]]; then
    resolved=$(cd "$checkout_root" && pwd -P)
    [[ "$resolved" == "$checkout_root" ]] ||
      fail "INVALID_RUNTIME: checkout root resolves outside the physical worktree"
  fi
}

prepare_runtime_storage() {
  validate_runtime_boundary
  mkdir -p "$RUNTIME_DIRECTORY/checkouts"
  validate_runtime_boundary
}

validate_runtime() {
  validate_runtime_boundary
  [[ -f "$GUIDE_PATH" ]] || fail "STALE_RUNTIME: no generated guide found"

  local recorded_project recorded_generator recorded_schema recorded_profile recorded_state recorded_prior_state
  local recorded_skill recorded_requested recorded_revision recorded_hash actual_hash expected_profile
  local expected_skill checkout marker cleanup_state checkout_revision checkout_origin installed_marker
  local recorded_common_directory recorded_git_directory recorded_worktree_state
  recorded_project=$(markdown_value "Project root" "$GUIDE_PATH")
  recorded_generator=$(markdown_value "Generator version" "$GUIDE_PATH")
  recorded_schema=$(markdown_value "Generator schema version" "$GUIDE_PATH")
  recorded_profile=$(markdown_value "Guide profile" "$GUIDE_PATH")
  recorded_state=$(markdown_value "Manifest state detected" "$GUIDE_PATH")
  recorded_prior_state=$(markdown_value "Manifest state before block" "$GUIDE_PATH")
  recorded_skill=$(markdown_value "Required skill" "$GUIDE_PATH")
  recorded_requested=$(markdown_value "Requested revision" "$GUIDE_PATH")
  recorded_revision=$(markdown_value "Resolved revision" "$GUIDE_PATH")
  recorded_hash=$(markdown_value "Content hash" "$GUIDE_PATH")
  checkout=$(markdown_value "Playbook checkout" "$GUIDE_PATH")
  marker=$(markdown_value "Ownership marker" "$GUIDE_PATH")
  cleanup_state=$(markdown_value "Cleanup state" "$GUIDE_PATH")
  recorded_common_directory=$(markdown_value "Git common directory" "$GUIDE_PATH")
  recorded_git_directory=$(markdown_value "Git worktree directory" "$GUIDE_PATH")
  recorded_worktree_state=$(markdown_value "Git worktree state" "$GUIDE_PATH")

  [[ "$recorded_project" == "$PROJECT_ROOT" ]] ||
    fail "INVALID_RUNTIME: guide belongs to a different project"
  [[ "$recorded_common_directory" == "$GIT_COMMON_DIRECTORY" &&
    "$recorded_git_directory" == "$GIT_DIRECTORY" &&
    "$recorded_worktree_state" == "$GIT_WORKTREE_STATE" ]] ||
    fail "INVALID_RUNTIME: guide belongs to a different repository worktree"
  [[ "$recorded_generator" == "$GENERATOR_VERSION" ]] ||
    fail "STALE_RUNTIME: unsupported generator version $recorded_generator"
  [[ "$recorded_schema" == "$GUIDE_SCHEMA_VERSION" ]] ||
    fail "STALE_RUNTIME: unsupported guide schema $recorded_schema"
  actual_hash=$(guide_content_hash "$GUIDE_PATH")
  [[ "$recorded_hash" == "$actual_hash" ]] ||
    fail "INVALID_RUNTIME: guide content hash mismatch"

  expected_profile=$(profile_for_state "$MANIFEST_STATE" "$MANIFEST_STATE_BEFORE_BLOCK") ||
    fail "STALE_RUNTIME: unsupported manifest state $MANIFEST_STATE or missing State before block"
  expected_skill=$(skill_for_profile "$expected_profile")
  [[ "$recorded_profile" == "$expected_profile" && "$recorded_skill" == "$expected_skill" ]] ||
    fail "STALE_RUNTIME: manifest requires $expected_profile/$expected_skill, guide records $recorded_profile/$recorded_skill"
  if [[ "$recorded_state" == "BLOCKED" && "$MANIFEST_STATE" == "BLOCKED" ]]; then
    [[ "$recorded_prior_state" == "$MANIFEST_STATE_BEFORE_BLOCK" ]] ||
      fail "STALE_RUNTIME: State before block changed while the manifest remained BLOCKED"
  fi
  if [[ -n "$PINNED_REVISION" ]]; then
    [[ "$recorded_revision" == "$PINNED_REVISION" ]] ||
      fail "STALE_RUNTIME: resolved guide revision differs from the manifest pin"
  else
    [[ "$recorded_requested" == "$REQUESTED_REVISION" ]] ||
      fail "STALE_RUNTIME: requested guide revision differs from the installer request"
  fi
  installed_marker="$PROJECT_ROOT/.agents/skills/$recorded_skill/.sdd-playbook-managed"
  [[ -f "$installed_marker" && "$(head -n 1 "$installed_marker")" == "$recorded_revision" ]] ||
    fail "INVALID_RUNTIME: installed skill differs from the guide revision"
  [[ "$recorded_revision" =~ ^[0-9a-fA-F]{40}$ &&
    "$checkout" == "$RUNTIME_DIRECTORY/checkouts/$recorded_revision/repository" ]] ||
    fail "INVALID_RUNTIME: checkout is outside the exact project-local runtime path"
  case "$cleanup_state" in
    PENDING)
      [[ -d "$checkout/.git" && -f "$marker" ]] ||
        fail "INVALID_RUNTIME: checkout or ownership marker is missing"
      [[ "$marker" == "$checkout/.sdd-owned-checkout" ]] ||
        fail "INVALID_RUNTIME: ownership marker path does not match checkout"
      grep -Fqx "sdd-owned-checkout-v2" "$marker" ||
        fail "INVALID_RUNTIME: ownership marker signature is invalid"
      grep -Fqx "project-root=$PROJECT_ROOT" "$marker" ||
        fail "INVALID_RUNTIME: ownership marker belongs to a different project"
      grep -Fqx "git-common-directory=$GIT_COMMON_DIRECTORY" "$marker" ||
        fail "INVALID_RUNTIME: ownership marker belongs to a different repository"
      grep -Fqx "git-directory=$GIT_DIRECTORY" "$marker" ||
        fail "INVALID_RUNTIME: ownership marker belongs to a different worktree"
      grep -Fqx "git-worktree-state=$GIT_WORKTREE_STATE" "$marker" ||
        fail "INVALID_RUNTIME: ownership marker belongs to a different worktree state"
      checkout_revision=$(git -C "$checkout" rev-parse HEAD 2>/dev/null) ||
        fail "INVALID_RUNTIME: cannot read checkout revision"
      checkout_origin=$(git -C "$checkout" remote get-url origin 2>/dev/null) ||
        fail "INVALID_RUNTIME: cannot read checkout origin"
      [[ "$checkout_revision" == "$recorded_revision" ]] ||
        fail "INVALID_RUNTIME: checkout revision does not match guide provenance"
      [[ "$checkout_origin" == "$(markdown_value "Source repository" "$GUIDE_PATH")" ]] ||
        fail "INVALID_RUNTIME: checkout origin does not match guide provenance"
      ;;
    COMPLETE)
      [[ ! -e "$checkout" && ! -e "$marker" ]] ||
        fail "INVALID_RUNTIME: cleaned checkout still exists"
      ;;
    *) fail "STALE_RUNTIME: installer cleanup state is unsupported" ;;
  esac

  if [[ "$recorded_state" == "$MANIFEST_STATE" ]]; then
    printf 'CURRENT: runtime profile, provenance, skill, and manifest state match.\n'
  else
    printf 'STATE_ADVANCED: manifest moved from %s to %s within compatible profile %s.\n' \
      "$recorded_state" "$MANIFEST_STATE" "$expected_profile"
  fi
}

validate_upgrade_runtime() {
  validate_runtime_boundary
  [[ -f "$UPGRADE_GUIDE_PATH" ]] ||
    fail "STALE_UPGRADE_RUNTIME: no generated upgrade guide found"

  local recorded_project recorded_generator recorded_schema recorded_current
  local recorded_revision recorded_repository recorded_hash actual_hash checkout
  local marker cleanup_state checkout_revision checkout_origin installed_marker
  local recorded_common_directory recorded_git_directory recorded_worktree_state
  recorded_project=$(markdown_value "Project root" "$UPGRADE_GUIDE_PATH")
  recorded_generator=$(markdown_value "Generator version" "$UPGRADE_GUIDE_PATH")
  recorded_schema=$(markdown_value "Generator schema version" "$UPGRADE_GUIDE_PATH")
  recorded_current=$(markdown_value "Current revision" "$UPGRADE_GUIDE_PATH")
  recorded_revision=$(markdown_value "Resolved revision" "$UPGRADE_GUIDE_PATH")
  recorded_repository=$(markdown_value "Source repository" "$UPGRADE_GUIDE_PATH")
  recorded_hash=$(markdown_value "Content hash" "$UPGRADE_GUIDE_PATH")
  checkout=$(markdown_value "Playbook checkout" "$UPGRADE_GUIDE_PATH")
  marker=$(markdown_value "Ownership marker" "$UPGRADE_GUIDE_PATH")
  cleanup_state=$(markdown_value "Cleanup state" "$UPGRADE_GUIDE_PATH")
  recorded_common_directory=$(markdown_value "Git common directory" "$UPGRADE_GUIDE_PATH")
  recorded_git_directory=$(markdown_value "Git worktree directory" "$UPGRADE_GUIDE_PATH")
  recorded_worktree_state=$(markdown_value "Git worktree state" "$UPGRADE_GUIDE_PATH")

  [[ "$recorded_project" == "$PROJECT_ROOT" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: guide belongs to a different project"
  [[ "$recorded_common_directory" == "$GIT_COMMON_DIRECTORY" &&
    "$recorded_git_directory" == "$GIT_DIRECTORY" &&
    "$recorded_worktree_state" == "$GIT_WORKTREE_STATE" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: guide belongs to a different repository worktree"
  [[ "$recorded_generator" == "$GENERATOR_VERSION" && \
    "$recorded_schema" == "$UPGRADE_GUIDE_SCHEMA_VERSION" ]] ||
    fail "STALE_UPGRADE_RUNTIME: unsupported generator or guide schema"
  actual_hash=$(guide_content_hash "$UPGRADE_GUIDE_PATH")
  [[ "$recorded_hash" == "$actual_hash" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: guide content hash mismatch"
  [[ "$recorded_current" == "$PINNED_REVISION" ]] ||
    fail "STALE_UPGRADE_RUNTIME: manifest pin changed after preparation"
  [[ "$(canonical_repository "$recorded_repository")" == \
    "$(canonical_repository "$(markdown_value "Playbook source repository" "$MANIFEST_PATH")")" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: candidate repository differs from the manifest"
  [[ "$cleanup_state" == "PENDING" ]] ||
    fail "STALE_UPGRADE_RUNTIME: candidate checkout is not available"
  [[ "$recorded_revision" =~ ^[0-9a-fA-F]{40}$ &&
    "$checkout" == "$RUNTIME_DIRECTORY/checkouts/$recorded_revision/repository" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: checkout is outside the exact project-local runtime path"
  [[ -d "$checkout/.git" && -f "$marker" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: checkout or ownership marker is missing"
  [[ "$marker" == "$checkout/.sdd-owned-checkout" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker path does not match checkout"
  grep -Fqx "sdd-owned-checkout-v2" "$marker" ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker signature is invalid"
  grep -Fqx "project-root=$PROJECT_ROOT" "$marker" ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different project"
  grep -Fqx "git-common-directory=$GIT_COMMON_DIRECTORY" "$marker" ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different repository"
  grep -Fqx "git-directory=$GIT_DIRECTORY" "$marker" ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different worktree"
  grep -Fqx "git-worktree-state=$GIT_WORKTREE_STATE" "$marker" ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different worktree state"
  checkout_revision=$(git -C "$checkout" rev-parse HEAD 2>/dev/null) ||
    fail "INVALID_UPGRADE_RUNTIME: cannot read candidate checkout revision"
  checkout_origin=$(git -C "$checkout" remote get-url origin 2>/dev/null) ||
    fail "INVALID_UPGRADE_RUNTIME: cannot read candidate checkout origin"
  [[ "$checkout_revision" == "$recorded_revision" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: checkout revision differs from the guide"
  [[ "$(canonical_repository "$checkout_origin")" == \
    "$(canonical_repository "$recorded_repository")" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: checkout origin differs from the guide"
  git -C "$checkout" merge-base --is-ancestor "$recorded_current" "$recorded_revision" ||
    fail "INVALID_UPGRADE_RUNTIME: candidate no longer descends from the current revision"
  installed_marker="$PROJECT_ROOT/.agents/skills/sdd-playbook-upgrade/.sdd-playbook-managed"
  [[ -f "$installed_marker" && "$(head -n 1 "$installed_marker")" == "$recorded_revision" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: installed upgrade skill differs from the candidate"

  printf 'UPGRADE_CURRENT: candidate provenance, ancestry, guide, and skill match.\n'
}

cleanup_checkout() {
  validate_runtime_boundary
  local guides=() guide
  [[ -f "$UPGRADE_GUIDE_PATH" ]] && guides+=("$UPGRADE_GUIDE_PATH")
  [[ -f "$GUIDE_PATH" ]] && guides+=("$GUIDE_PATH")
  ((${#guides[@]} > 0)) || fail "no installer guide found in $RUNTIME_DIRECTORY"

  for guide in "${guides[@]}"; do
    cleanup_guide_checkout "$guide"
  done
}

cleanup_guide_checkout() {
  local guide=$1

  local checkout marker recorded_project recorded_revision recorded_common_directory
  local recorded_git_directory recorded_worktree_state cleanup_state marker_signature
  local removal_target temp_root updated_guide
  cleanup_state=$(markdown_value "Cleanup state" "$guide")
  if [[ "$cleanup_state" == "COMPLETE" ]]; then
    printf 'Installer-owned checkout is already cleaned up for %s.\n' "$guide"
    return
  fi
  [[ "$cleanup_state" == "PENDING" ]] ||
    fail "installation guide has an unknown cleanup state"

  checkout=$(markdown_value "Playbook checkout" "$guide")
  marker=$(markdown_value "Ownership marker" "$guide")
  recorded_project=$(markdown_value "Project root" "$guide")
  recorded_revision=$(markdown_value "Resolved revision" "$guide")
  recorded_common_directory=$(markdown_value "Git common directory" "$guide")
  recorded_git_directory=$(markdown_value "Git worktree directory" "$guide")
  recorded_worktree_state=$(markdown_value "Git worktree state" "$guide")
  [[ -n "$checkout" && -n "$marker" && -n "$recorded_project" &&
    "$recorded_revision" =~ ^[0-9a-fA-F]{40}$ ]] ||
    fail "installation guide is missing cleanup metadata"
  [[ "$recorded_project" == "$PROJECT_ROOT" ]] ||
    fail "installation guide belongs to a different project"
  [[ -f "$marker" ]] || fail "ownership marker is missing"
  marker_signature=$(head -n 1 "$marker")
  grep -Fqx "project-root=$PROJECT_ROOT" "$marker" ||
    fail "ownership marker belongs to a different project"
  case "$marker_signature" in
    sdd-owned-checkout-v2)
      [[ "$recorded_common_directory" == "$GIT_COMMON_DIRECTORY" &&
        "$recorded_git_directory" == "$GIT_DIRECTORY" &&
        "$recorded_worktree_state" == "$GIT_WORKTREE_STATE" ]] ||
        fail "installation guide belongs to a different repository worktree"
      [[ "$checkout" == "$RUNTIME_DIRECTORY/checkouts/$recorded_revision/repository" ]] ||
        fail "refusing cleanup outside the exact project-local runtime checkout"
      [[ "$marker" == "$checkout/.sdd-owned-checkout" ]] ||
        fail "ownership marker path does not match the checkout"
      grep -Fqx "git-common-directory=$GIT_COMMON_DIRECTORY" "$marker" ||
        fail "ownership marker belongs to a different repository"
      grep -Fqx "git-directory=$GIT_DIRECTORY" "$marker" ||
        fail "ownership marker belongs to a different worktree"
      grep -Fqx "git-worktree-state=$GIT_WORKTREE_STATE" "$marker" ||
        fail "ownership marker belongs to a different worktree state"
      removal_target="$RUNTIME_DIRECTORY/checkouts/$recorded_revision"
      ;;
    sdd-owned-checkout-v1)
      temp_root=$(cd "${TMPDIR:-/tmp}" && pwd -P)
      case "$checkout" in
        "$temp_root"/sdd-playbook.*/repository)
          [[ "$marker" == "$checkout/.sdd-owned-checkout" ]] ||
            fail "ownership marker path does not match the checkout"
          removal_target=${checkout%/repository}
          ;;
        *) fail "refusing legacy cleanup outside an installer-owned temporary path" ;;
      esac
      ;;
    *) fail "ownership marker signature is invalid" ;;
  esac

  rm -rf "$removal_target"
  updated_guide="$guide.tmp"
  awk '
    /^\| Cleanup state \| `PENDING` \|$/ {
      print "| Cleanup state | `COMPLETE` |"
      next
    }
    { print }
  ' "$guide" >"$updated_guide"
  mv "$updated_guide" "$guide"
  refresh_guide_hash "$guide"
  printf 'Removed installer-owned checkout: %s\n' "$checkout"
}

canonical_repository() {
  printf '%s' "$1" | sed -e 's#/$##' -e 's#\.git$##'
}

cleanup_failed_upgrade() {
  local status=$?
  if ((status != 0)); then
    if [[ -n "${FAILED_UPGRADE_TEMP_DIRECTORY:-}" ]]; then
      rm -rf "$FAILED_UPGRADE_TEMP_DIRECTORY"
    fi
    if [[ -n "${FAILED_UPGRADE_SKILL_DESTINATION:-}" &&
      -f "$FAILED_UPGRADE_SKILL_DESTINATION/.sdd-playbook-managed" ]] &&
      grep -Fqx "${FAILED_UPGRADE_REVISION:-missing}" \
        "$FAILED_UPGRADE_SKILL_DESTINATION/.sdd-playbook-managed"; then
      rm -rf "$FAILED_UPGRADE_SKILL_DESTINATION"
    fi
  fi
  exit "$status"
}

ensure_runtime_excludes() {
  local git_exclude installer_path installer_pattern pattern
  git_exclude=$(git rev-parse --git-path info/exclude)
  case "$git_exclude" in
    /*) ;;
    *) git_exclude="$PROJECT_ROOT/$git_exclude" ;;
  esac
  mkdir -p "$(dirname "$git_exclude")"
  touch "$git_exclude"
  for pattern in \
    "/$RUNTIME_ROOT/" \
    "/.agents/skills/sdd-project-adoption/" \
    "/.agents/skills/sdd-project-workflow/" \
    "/.agents/skills/sdd-playbook-upgrade/"; do
    grep -Fqx "$pattern" "$git_exclude" || printf '%s\n' "$pattern" >>"$git_exclude"
  done

  installer_path=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/$(basename "${BASH_SOURCE[0]}")
  case "$installer_path" in
    "$PROJECT_ROOT"/*)
      installer_pattern="/${installer_path#"$PROJECT_ROOT"/}"
      grep -Fqx "$installer_pattern" "$git_exclude" ||
        printf '%s\n' "$installer_pattern" >>"$git_exclude"
      ;;
  esac
}

prepare_upgrade() {
  [[ -f "$MANIFEST_PATH" ]] ||
    fail "upgrade requires an installed project adoption manifest"
  case "$MANIFEST_STATE" in
    INSTALLED) ;;
    *) fail "upgrade requires a stable installed state; found $MANIFEST_STATE" ;;
  esac
  [[ -n "$PINNED_REVISION" ]] ||
    fail "upgrade requires an exact 40-character Playbook revision in the manifest"

  local manifest_repository installed_marker recorded_hash actual_hash
  local recorded_revision recorded_repository cleanup_state plan active_tasks active_rows
  manifest_repository=$(markdown_value "Playbook source repository" "$MANIFEST_PATH")
  [[ -n "$manifest_repository" ]] ||
    fail "upgrade requires Playbook source repository in the manifest"
  [[ "$(canonical_repository "$manifest_repository")" == \
    "$(canonical_repository "$PLAYBOOK_REPOSITORY")" ]] ||
    fail "requested repository differs from the manifest playbook source"
  validate_project_entry_point
  [[ -f "$PROJECT_ROOT/$ADOPTION_ROOT/solution-whiteboard.md" ]] ||
    fail "upgrade requires the project solution whiteboard"
  [[ -f "$GUIDE_PATH" ]] ||
    fail "upgrade requires the current generated agent guide"
  recorded_hash=$(markdown_value "Content hash" "$GUIDE_PATH")
  actual_hash=$(guide_content_hash "$GUIDE_PATH")
  [[ "$recorded_hash" == "$actual_hash" ]] ||
    fail "INVALID_RUNTIME: current guide content hash mismatch"
  recorded_revision=$(markdown_value "Resolved revision" "$GUIDE_PATH")
  recorded_repository=$(markdown_value "Source repository" "$GUIDE_PATH")
  cleanup_state=$(markdown_value "Cleanup state" "$GUIDE_PATH")
  [[ "$recorded_revision" == "$PINNED_REVISION" ]] ||
    fail "STALE_RUNTIME: current guide differs from the manifest-pinned revision"
  [[ "$(canonical_repository "$recorded_repository")" == \
    "$(canonical_repository "$manifest_repository")" ]] ||
    fail "INVALID_RUNTIME: current guide repository differs from the manifest"
  [[ "$cleanup_state" == "PENDING" || "$cleanup_state" == "COMPLETE" ]] ||
    fail "INVALID_RUNTIME: current guide has an unknown cleanup state"
  installed_marker="$PROJECT_ROOT/.agents/skills/sdd-project-workflow/.sdd-playbook-managed"
  [[ -f "$installed_marker" ]] ||
    fail "upgrade requires the managed sdd-project-workflow skill"
  [[ "$(head -n 1 "$installed_marker")" == "$PINNED_REVISION" ]] ||
    fail "STALE_RUNTIME: installed workflow skill differs from the manifest pin"

  plan="$PROJECT_ROOT/$ADOPTION_ROOT/implementation-plan.md"
  if [[ -f "$plan" ]]; then
    active_tasks=$(awk -F'|' '
      function trim(value) {
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", value)
        gsub(/^`|`$/, "", value)
        return value
      }
      trim($2) == "Active tasks" { print trim($3); exit }
    ' "$plan")
    active_rows=$(awk -F'|' '
      function trim(value) {
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", value)
        gsub(/^`|`$/, "", value)
        return value
      }
      trim($3) == "IN_PROGRESS" || trim($3) == "VERIFYING" { print; exit }
    ' "$plan")
    [[ -z "$active_rows" && ( -z "$active_tasks" || "$active_tasks" == "None" ) ]] ||
      fail "upgrade is allowed only between tasks; active work found in ${plan#"$PROJECT_ROOT/"}"
  fi

  if [[ -f "$UPGRADE_GUIDE_PATH" ]]; then
    [[ "$(markdown_value "Cleanup state" "$UPGRADE_GUIDE_PATH")" == "COMPLETE" ]] ||
      fail "an upgrade checkout is still pending; finish it or run ./install-sdd.sh --cleanup"
  fi

  ensure_runtime_excludes

  local staging_directory checkout final_directory marker resolved_revision resolved_repository
  local skill_source skill_destination
  prepare_runtime_storage
  staging_directory=$(mktemp -d "$RUNTIME_DIRECTORY/checkouts/.staging.XXXXXX")
  checkout="$staging_directory/repository"
  FAILED_UPGRADE_TEMP_DIRECTORY=$staging_directory
  FAILED_UPGRADE_SKILL_DESTINATION=""
  FAILED_UPGRADE_REVISION=""
  trap cleanup_failed_upgrade EXIT
  git clone --quiet --filter=blob:none "$PLAYBOOK_REPOSITORY" "$checkout"
  git -C "$checkout" checkout --quiet --detach "$REQUESTED_REVISION" ||
    fail "cannot resolve candidate playbook revision: $REQUESTED_REVISION"
  resolved_revision=$(git -C "$checkout" rev-parse HEAD)
  FAILED_UPGRADE_REVISION=$resolved_revision
  resolved_repository=$(git -C "$checkout" remote get-url origin)
  [[ "$resolved_revision" != "$PINNED_REVISION" ]] ||
    fail "project already uses the resolved playbook revision"
  git -C "$checkout" cat-file -e "$PINNED_REVISION^{commit}" 2>/dev/null ||
    fail "manifest-pinned revision is not available from the candidate repository"
  git -C "$checkout" merge-base --is-ancestor "$PINNED_REVISION" "$resolved_revision" ||
    fail "candidate revision does not descend from the manifest-pinned revision"
  final_directory="$RUNTIME_DIRECTORY/checkouts/$resolved_revision"
  [[ ! -e "$final_directory" ]] ||
    fail "project-local candidate checkout already exists: $final_directory"
  mv "$staging_directory" "$final_directory"
  checkout="$final_directory/repository"
  FAILED_UPGRADE_TEMP_DIRECTORY=$final_directory

  skill_source="$checkout/skills/sdd-playbook-upgrade"
  [[ -f "$skill_source/SKILL.md" ]] ||
    fail "candidate playbook does not contain sdd-playbook-upgrade"
  [[ -z "$(find "$skill_source" -type l -print -quit)" ]] ||
    fail "candidate upgrade skill contains a symbolic link"
  skill_destination="$PROJECT_ROOT/.agents/skills/sdd-playbook-upgrade"
  FAILED_UPGRADE_SKILL_DESTINATION=$skill_destination
  if [[ -e "$skill_destination" ]]; then
    [[ -f "$skill_destination/.sdd-playbook-managed" ]] ||
      fail "refusing to overwrite unmanaged skill: $skill_destination"
    rm -rf "$skill_destination"
  fi
  mkdir -p "$(dirname "$skill_destination")" "$RUNTIME_DIRECTORY"
  cp -R "$skill_source" "$skill_destination"
  printf '%s\n' "$resolved_revision" >"$skill_destination/.sdd-playbook-managed"

  marker="$checkout/.sdd-owned-checkout"
  printf '%s\nproject-root=%s\ngit-common-directory=%s\ngit-directory=%s\ngit-worktree-state=%s\n' \
    "sdd-owned-checkout-v2" "$PROJECT_ROOT" "$GIT_COMMON_DIRECTORY" "$GIT_DIRECTORY" \
    "$GIT_WORKTREE_STATE" >"$marker"
  cat >"$UPGRADE_GUIDE_PATH" <<EOF
# SDD Playbook Upgrade Guide

This machine-local guide prepares a candidate upgrade. It does not change the
active project pin, approve compatibility, or authorize work in an active task.

## Upgrade state

| Field | Value |
| --- | --- |
| Project root | \`$PROJECT_ROOT\` |
| Git common directory | \`$GIT_COMMON_DIRECTORY\` |
| Git worktree directory | \`$GIT_DIRECTORY\` |
| Git worktree state | \`$GIT_WORKTREE_STATE\` |
| Adoption manifest | \`$MANIFEST_RELATIVE_PATH\` |
| Manifest state detected | \`$MANIFEST_STATE\` |
| Generator version | \`$GENERATOR_VERSION\` |
| Generator schema version | \`$UPGRADE_GUIDE_SCHEMA_VERSION\` |
| Required skill | \`sdd-playbook-upgrade\` |
| Installed skill | \`.agents/skills/sdd-playbook-upgrade/SKILL.md\` |
| Review evidence destination | Pull request |
| Content hash | \`<CONTENT_HASH>\` |

## Revision boundary

| Field | Value |
| --- | --- |
| Source repository | \`$resolved_repository\` |
| Current revision | \`$PINNED_REVISION\` |
| Requested revision | \`$REQUESTED_REVISION\` |
| Resolved revision | \`$resolved_revision\` |
| Playbook checkout | \`$checkout\` |
| Access mode | \`read-only\` |

## Cleanup record

| Field | Value |
| --- | --- |
| Checkout owner | \`install-sdd.sh\` |
| Ownership marker | \`$marker\` |
| Cleanup command | \`./install-sdd.sh --cleanup\` |
| Cleanup state | \`PENDING\` |

## Outcome and boundaries

| Concern | Required result |
| --- | --- |
| Authority | The current pin remains authoritative until the exact synchronized candidate receives independent and human acceptance. |
| Scope | Reusable SDD documents match the resolved immutable revision; unrelated project content and active work remain unchanged. |
| Project responsibility | No playbook lifecycle validators, evidence helpers, publication tooling, CI workflows, or playbook tests are added to the project. |
| Pre-work runtime | Before candidate content is consumed or project files change, this runtime validates as \`UPGRADE_CURRENT\`; provenance, hash, marker, pin, or installed-skill mismatch blocks work. |
| Consistency | Canonical terminology, links, states, authority, and continuation rules agree; unresolved canonical conflict or failed applicable validation blocks acceptance. |
| Recovery | A failed candidate leaves or restores the last accepted pin and runtime without discarding valid project work or failure evidence. |
| Completion | The accepted pin is recorded, normal runtime is regenerated and validates, and any superseded installer-owned checkout is cleaned up. |

The agent chooses comparison, synchronization, batching, validation, and safe
recovery methods within these boundaries and the installed skill.

## Prompt

Use \`.sdd-runtime/playbook-upgrade-guide.md\` to synchronize the project with
the latest playbook revision.
EOF
  refresh_guide_hash "$UPGRADE_GUIDE_PATH"
  trap - EXIT

  printf 'Prepared candidate revision: %s\n' "$resolved_revision"
  printf 'Installed skill: sdd-playbook-upgrade\n'
  printf 'Generated guide: %s\n\n' "$UPGRADE_GUIDE_PATH"
  printf 'Prompt the agent with:\n\n'
  printf 'Use %s to synchronize the project with the latest playbook revision.\n' "$RUNTIME_ROOT/playbook-upgrade-guide.md"
}

if [[ "$CLEANUP_ONLY" == true ]]; then
  cleanup_checkout
  exit 0
fi

if [[ "$VALIDATE_ONLY" == true ]]; then
  if [[ -f "$UPGRADE_GUIDE_PATH" ]]; then
    UPGRADE_CLEANUP_STATE=$(markdown_value "Cleanup state" "$UPGRADE_GUIDE_PATH")
    case "$UPGRADE_CLEANUP_STATE" in
      PENDING) validate_upgrade_runtime ;;
      COMPLETE) validate_runtime ;;
      *) fail "INVALID_UPGRADE_RUNTIME: unknown cleanup state" ;;
    esac
  else
    validate_runtime
  fi
  exit 0
fi

if [[ "$UPGRADE_MODE" == true ]]; then
  prepare_upgrade
  exit 0
fi

if [[ -f "$GUIDE_PATH" ]]; then
  EXISTING_CLEANUP_STATE=$(markdown_value "Cleanup state" "$GUIDE_PATH")
  if [[ "$EXISTING_CLEANUP_STATE" == "PENDING" ]]; then
    fail "an installer-owned checkout is still pending; run ./install-sdd.sh --cleanup first"
  fi
  [[ "$EXISTING_CLEANUP_STATE" == "COMPLETE" ]] ||
    fail "existing installation guide has an unknown cleanup state"
fi

ensure_runtime_excludes

prepare_runtime_storage
TEMP_DIRECTORY=$(mktemp -d "$RUNTIME_DIRECTORY/checkouts/.staging.XXXXXX")
PLAYBOOK_CHECKOUT="$TEMP_DIRECTORY/repository"

cleanup_failed_install() {
  local status=$?
  if ((status != 0)) && [[ -d "$TEMP_DIRECTORY" ]]; then
    rm -rf "$TEMP_DIRECTORY"
  fi
  exit "$status"
}
trap cleanup_failed_install EXIT

git clone --quiet --filter=blob:none "$PLAYBOOK_REPOSITORY" "$PLAYBOOK_CHECKOUT"
git -C "$PLAYBOOK_CHECKOUT" checkout --quiet --detach "$REQUESTED_REVISION" ||
  fail "cannot resolve playbook revision: $REQUESTED_REVISION"

RESOLVED_REVISION=$(git -C "$PLAYBOOK_CHECKOUT" rev-parse HEAD)
RESOLVED_REPOSITORY=$(git -C "$PLAYBOOK_CHECKOUT" remote get-url origin)
FINAL_CHECKOUT_DIRECTORY="$RUNTIME_DIRECTORY/checkouts/$RESOLVED_REVISION"
[[ ! -e "$FINAL_CHECKOUT_DIRECTORY" ]] ||
  fail "project-local checkout already exists: $FINAL_CHECKOUT_DIRECTORY"
mv "$TEMP_DIRECTORY" "$FINAL_CHECKOUT_DIRECTORY"
TEMP_DIRECTORY="$FINAL_CHECKOUT_DIRECTORY"
PLAYBOOK_CHECKOUT="$FINAL_CHECKOUT_DIRECTORY/repository"
MARKER_PATH="$PLAYBOOK_CHECKOUT/.sdd-owned-checkout"
printf '%s\nproject-root=%s\ngit-common-directory=%s\ngit-directory=%s\ngit-worktree-state=%s\n' \
  "sdd-owned-checkout-v2" "$PROJECT_ROOT" "$GIT_COMMON_DIRECTORY" "$GIT_DIRECTORY" \
  "$GIT_WORKTREE_STATE" >"$MARKER_PATH"

GUIDE_PROFILE=$(profile_for_state "$MANIFEST_STATE" "$MANIFEST_STATE_BEFORE_BLOCK") ||
  fail "unsupported manifest state or missing State before block: $MANIFEST_STATE"
SKILL_NAME=$(skill_for_profile "$GUIDE_PROFILE")

SKILL_SOURCE="$PLAYBOOK_CHECKOUT/skills/$SKILL_NAME"
SKILL_DESTINATION="$PROJECT_ROOT/.agents/skills/$SKILL_NAME"
[[ -f "$SKILL_SOURCE/SKILL.md" ]] ||
  fail "resolved playbook does not contain skill: $SKILL_NAME"

if [[ -e "$SKILL_DESTINATION" ]]; then
  [[ -f "$SKILL_DESTINATION/.sdd-playbook-managed" ]] ||
    fail "refusing to overwrite unmanaged skill: $SKILL_DESTINATION"
  rm -rf "$SKILL_DESTINATION"
fi
mkdir -p "$(dirname "$SKILL_DESTINATION")"
cp -R "$SKILL_SOURCE" "$SKILL_DESTINATION"
printf '%s\n' "$RESOLVED_REVISION" >"$SKILL_DESTINATION/.sdd-playbook-managed"

if [[ "$SKILL_NAME" == "sdd-project-adoption" ]]; then
  OTHER_SKILL="sdd-project-workflow"
else
  OTHER_SKILL="sdd-project-adoption"
fi
OTHER_SKILL_DESTINATION="$PROJECT_ROOT/.agents/skills/$OTHER_SKILL"
if [[ -f "$OTHER_SKILL_DESTINATION/.sdd-playbook-managed" ]]; then
  rm -rf "$OTHER_SKILL_DESTINATION"
fi
UPGRADE_SKILL_DESTINATION="$PROJECT_ROOT/.agents/skills/sdd-playbook-upgrade"
if [[ -f "$UPGRADE_SKILL_DESTINATION/.sdd-playbook-managed" ]]; then
  rm -rf "$UPGRADE_SKILL_DESTINATION"
fi

mkdir -p "$RUNTIME_DIRECTORY"
cat >"$GUIDE_PATH" <<EOF
# SDD Agent Guide

This machine-local guide supplies verified provenance and safety boundaries; it
is not a project system contract or a prescribed implementation path.

## Installation state

| Field | Value |
| --- | --- |
| Project root | \`$PROJECT_ROOT\` |
| Git common directory | \`$GIT_COMMON_DIRECTORY\` |
| Git worktree directory | \`$GIT_DIRECTORY\` |
| Git worktree state | \`$GIT_WORKTREE_STATE\` |
| Adoption manifest | \`$MANIFEST_RELATIVE_PATH\` |
| Manifest state detected | \`$MANIFEST_STATE\` |
| Manifest state before block | \`$MANIFEST_STATE_BEFORE_BLOCK\` |
| Generator version | \`$GENERATOR_VERSION\` |
| Generator schema version | \`$GUIDE_SCHEMA_VERSION\` |
| Guide profile | \`$GUIDE_PROFILE\` |
| Required skill | \`$SKILL_NAME\` |
| Installed skill | \`.agents/skills/$SKILL_NAME/SKILL.md\` |
| Content hash | \`<CONTENT_HASH>\` |

## Playbook runtime

| Field | Value |
| --- | --- |
| Source repository | \`$RESOLVED_REPOSITORY\` |
| Requested revision | \`$REQUESTED_REVISION\` |
| Resolved revision | \`$RESOLVED_REVISION\` |
| Playbook checkout | \`$PLAYBOOK_CHECKOUT\` |
| Access mode | \`read-only\` |

## Cleanup record

| Field | Value |
| --- | --- |
| Checkout owner | \`install-sdd.sh\` |
| Ownership marker | \`$MARKER_PATH\` |
| Cleanup command | \`./install-sdd.sh --cleanup\` |
| Cleanup state | \`PENDING\` |

EOF

if [[ "$GUIDE_PROFILE" == "adoption" ]]; then
  cat >>"$GUIDE_PATH" <<EOF
## Adoption outcome and boundaries

- Verify the recorded project root, checkout repository, resolved revision,
  ownership marker, and guide hash before using the checkout.
- Read and follow the installed required skill. Preserve project authority,
  unrelated changes, allowed write scope, and required review.
- Create only the manifest and neutral whiteboard. Record durable repository
  and revision values in the manifest; never copy machine-local paths or infer
  a feature need.
- Stop for required reviewer or owner acceptance, missing authority, or a
  critical safety mismatch. Never self-approve.

## Expected completion boundary

- The adoption manifest is \`INSTALLED\` through recorded reviewer authority.
- The project solution whiteboard exists in its empty initial state.
- No feature plan, product code, or delivery claim has been inferred.
EOF
else
  cat >>"$GUIDE_PATH" <<EOF
## Delivery outcome and boundaries

- Verify the recorded project root, checkout repository, resolved revision,
  ownership marker, and guide hash; run \`./install-sdd.sh --validate\` when the
  runtime may have drifted.
- Read and follow \`sdd-project-workflow\`. The manifest owns installation
  authority, the whiteboard owns design, and the implementation plan owns all
  task and delivery state.
- Work inside authorized scope, preserve unrelated work, and keep required
  checks, review, merge authority, and destructive-action safeguards.
- Pull requests own review and delivery evidence. Stop for missing authority,
  required acceptance, or a critical safety or policy mismatch. Never
  self-approve.

## Expected completion boundary

- The authorized work unit has reached its actual completion or review boundary.
- Required checks and lifecycle invariants are reported separately.
- The implementation plan, when present, accurately records task state and
  remaining work.
EOF
fi

cat >>"$GUIDE_PATH" <<EOF

## Runtime replacement

Reuse this guide only while its required skill and immutable revision match the
manifest. Finish and review the current boundary before replacing a pending
runtime. After an accepted state change, clean up the owned checkout,
regenerate the guide, and verify its manifest state, skill, repository, and
revision.
EOF

refresh_guide_hash "$GUIDE_PATH"

trap - EXIT

printf 'Installed skill: %s\n' "$SKILL_NAME"
printf 'Generated guide: %s\n\n' "$GUIDE_PATH"
printf 'Prompt the agent with:\n\n'
printf 'Use %s for verified provenance and follow its installed skill.\n' "$RUNTIME_ROOT/agent-guide.md"
