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
GUIDE_SCHEMA_VERSION="2"
UPGRADE_GUIDE_SCHEMA_VERSION="1"
GENERATOR_VERSION="2.1.0"

usage() {
  cat <<'EOF'
Usage: ./install-sdd.sh [options]

Prepare a project-local Spec-Driven Delivery agent guide and matching skill.

Options:
  --repository URL       Playbook Git repository.
  --revision REF         Branch, tag, or commit to resolve (default: main).
  --adoption-root PATH   Project adoption root.
  --manifest PATH        Existing or future adoption manifest path.
  --cleanup              Remove only the installer-owned temporary checkout.
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

command -v git >/dev/null 2>&1 || fail "git is required"

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) ||
  fail "run this installer from a Git project root"
PROJECT_ROOT=$(cd "$PROJECT_ROOT" && pwd -P)
CURRENT_ROOT=$(pwd -P)
[[ "$CURRENT_ROOT" == "$PROJECT_ROOT" ]] ||
  fail "run this installer from the project root: $PROJECT_ROOT"

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

profile_for_state() {
  case "$1" in
    ABSENT|DISCOVERY|MAPPED)
      printf '%s\n' "adoption"
      ;;
    INSTALLED|PILOT|REVIEW|ACTIVE|UPDATING|EXAMPLE_REVIEWED)
      printf '%s\n' "workflow"
      ;;
    BLOCKED)
      case "${2:-NONE}" in
        DISCOVERY|MAPPED) printf '%s\n' "adoption" ;;
        INSTALLED|PILOT|REVIEW|ACTIVE|UPDATING|EXAMPLE_REVIEWED)
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

validate_runtime() {
  [[ -f "$GUIDE_PATH" ]] || fail "STALE_RUNTIME: no generated guide found"

  local recorded_project recorded_generator recorded_schema recorded_profile recorded_state recorded_prior_state
  local recorded_skill recorded_requested recorded_revision recorded_hash actual_hash expected_profile
  local expected_skill checkout marker cleanup_state checkout_revision checkout_origin
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

  [[ "$recorded_project" == "$PROJECT_ROOT" ]] ||
    fail "INVALID_RUNTIME: guide belongs to a different project"
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
  [[ "$recorded_requested" == "$REQUESTED_REVISION" ]] ||
    fail "STALE_RUNTIME: guide revision differs from the manifest-pinned revision"
  [[ "$cleanup_state" == "PENDING" ]] ||
    fail "STALE_RUNTIME: installer-owned checkout is not available"
  [[ -d "$checkout/.git" && -f "$marker" ]] ||
    fail "INVALID_RUNTIME: checkout or ownership marker is missing"
  [[ "$marker" == "$checkout/.sdd-owned-checkout" ]] ||
    fail "INVALID_RUNTIME: ownership marker path does not match checkout"
  grep -Fqx "sdd-owned-checkout-v1" "$marker" ||
    fail "INVALID_RUNTIME: ownership marker signature is invalid"
  grep -Fqx "project-root=$PROJECT_ROOT" "$marker" ||
    fail "INVALID_RUNTIME: ownership marker belongs to a different project"
  checkout_revision=$(git -C "$checkout" rev-parse HEAD 2>/dev/null) ||
    fail "INVALID_RUNTIME: cannot read checkout revision"
  checkout_origin=$(git -C "$checkout" remote get-url origin 2>/dev/null) ||
    fail "INVALID_RUNTIME: cannot read checkout origin"
  [[ "$checkout_revision" == "$recorded_revision" ]] ||
    fail "INVALID_RUNTIME: checkout revision does not match guide provenance"
  [[ "$checkout_origin" == "$(markdown_value "Source repository" "$GUIDE_PATH")" ]] ||
    fail "INVALID_RUNTIME: checkout origin does not match guide provenance"

  if [[ "$recorded_state" == "$MANIFEST_STATE" ]]; then
    printf 'CURRENT: runtime profile, provenance, skill, and manifest state match.\n'
  else
    printf 'STATE_ADVANCED: manifest moved from %s to %s within compatible profile %s.\n' \
      "$recorded_state" "$MANIFEST_STATE" "$expected_profile"
  fi
}

validate_upgrade_runtime() {
  [[ -f "$UPGRADE_GUIDE_PATH" ]] ||
    fail "STALE_UPGRADE_RUNTIME: no generated upgrade guide found"

  local recorded_project recorded_generator recorded_schema recorded_current
  local recorded_revision recorded_repository recorded_hash actual_hash checkout
  local marker cleanup_state checkout_revision checkout_origin installed_marker
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

  [[ "$recorded_project" == "$PROJECT_ROOT" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: guide belongs to a different project"
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
  [[ -d "$checkout/.git" && -f "$marker" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: checkout or ownership marker is missing"
  [[ "$marker" == "$checkout/.sdd-owned-checkout" ]] ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker path does not match checkout"
  grep -Fqx "sdd-owned-checkout-v1" "$marker" ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker signature is invalid"
  grep -Fqx "project-root=$PROJECT_ROOT" "$marker" ||
    fail "INVALID_UPGRADE_RUNTIME: ownership marker belongs to a different project"
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

  local checkout marker recorded_project cleanup_state temp_root updated_guide
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
  [[ -n "$checkout" && -n "$marker" && -n "$recorded_project" ]] ||
    fail "installation guide is missing cleanup metadata"
  [[ "$recorded_project" == "$PROJECT_ROOT" ]] ||
    fail "installation guide belongs to a different project"

  temp_root=$(cd "${TMPDIR:-/tmp}" && pwd -P)
  case "$checkout" in
    "$temp_root"/sdd-playbook.*/repository) ;;
    *) fail "refusing cleanup outside an installer-owned temporary path" ;;
  esac
  [[ "$marker" == "$checkout/.sdd-owned-checkout" ]] ||
    fail "ownership marker path does not match the checkout"
  [[ -f "$marker" ]] || fail "ownership marker is missing"
  grep -Fqx "sdd-owned-checkout-v1" "$marker" ||
    fail "ownership marker signature is invalid"
  grep -Fqx "project-root=$PROJECT_ROOT" "$marker" ||
    fail "ownership marker belongs to a different project"

  rm -rf "${checkout%/repository}"
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
    INSTALLED|PILOT|REVIEW|ACTIVE|EXAMPLE_REVIEWED) ;;
    *) fail "upgrade requires a stable installed state; found $MANIFEST_STATE" ;;
  esac
  [[ -n "$PINNED_REVISION" ]] ||
    fail "upgrade requires an exact 40-character Playbook revision in the manifest"

  local manifest_repository current_blocker installed_marker recorded_hash actual_hash
  local recorded_revision recorded_repository cleanup_state plan active_line
  manifest_repository=$(markdown_value "Playbook source repository" "$MANIFEST_PATH")
  [[ -n "$manifest_repository" ]] ||
    fail "upgrade requires Playbook source repository in the manifest"
  [[ "$(canonical_repository "$manifest_repository")" == \
    "$(canonical_repository "$PLAYBOOK_REPOSITORY")" ]] ||
    fail "requested repository differs from the manifest playbook source"
  current_blocker=$(markdown_value "Current blocker" "$MANIFEST_PATH")
  [[ "$current_blocker" == "None" ]] ||
    fail "upgrade requires Current blocker to be None"

  [[ -f "$PROJECT_ROOT/$ADOPTION_ROOT/README.md" ]] ||
    fail "upgrade requires the project SDD entry point: $ADOPTION_ROOT/README.md"
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

  while IFS= read -r plan; do
    active_line=$(sed -n \
      -e 's/^| Current task | `\([^`]*\)` |$/\1/p' \
      -e '/| `[^`]*` | `\(IN_PROGRESS\|VERIFYING\)` |/p' "$plan" | head -n 1)
    [[ -z "$active_line" || "$active_line" == "None" ]] ||
      fail "upgrade is allowed only between tasks; active work found in ${plan#"$PROJECT_ROOT/"}"
  done < <(find "$PROJECT_ROOT/$ADOPTION_ROOT/active" -type f -name '*implementation-plan.md' 2>/dev/null | sort)

  if [[ -f "$UPGRADE_GUIDE_PATH" ]]; then
    [[ "$(markdown_value "Cleanup state" "$UPGRADE_GUIDE_PATH")" == "COMPLETE" ]] ||
      fail "an upgrade checkout is still pending; finish it or run ./install-sdd.sh --cleanup"
  fi

  ensure_runtime_excludes

  local temp_root temp_directory checkout marker resolved_revision resolved_repository
  local skill_source skill_destination template_source
  temp_root=$(cd "${TMPDIR:-/tmp}" && pwd -P)
  temp_directory=$(mktemp -d "$temp_root/sdd-playbook.XXXXXX")
  checkout="$temp_directory/repository"
  FAILED_UPGRADE_TEMP_DIRECTORY=$temp_directory
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

  skill_source="$checkout/skills/sdd-playbook-upgrade"
  template_source="$checkout/templates/adoption/playbook-upgrade-assessment.md"
  [[ -f "$skill_source/SKILL.md" ]] ||
    fail "candidate playbook does not contain sdd-playbook-upgrade"
  [[ -z "$(find "$skill_source" -type l -print -quit)" ]] ||
    fail "candidate upgrade skill contains a symbolic link"
  [[ -f "$template_source" ]] ||
    fail "candidate playbook does not contain the upgrade assessment template"
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
  printf '%s\nproject-root=%s\n' "sdd-owned-checkout-v1" "$PROJECT_ROOT" >"$marker"
  cat >"$UPGRADE_GUIDE_PATH" <<EOF
# SDD Playbook Upgrade Guide

This machine-local guide prepares a candidate upgrade. It does not change the
active project pin, approve compatibility, or authorize work in an active task.

## Upgrade state

| Field | Value |
| --- | --- |
| Project root | \`$PROJECT_ROOT\` |
| Adoption manifest | \`$MANIFEST_RELATIVE_PATH\` |
| Manifest state detected | \`$MANIFEST_STATE\` |
| Generator version | \`$GENERATOR_VERSION\` |
| Generator schema version | \`$UPGRADE_GUIDE_SCHEMA_VERSION\` |
| Required skill | \`sdd-playbook-upgrade\` |
| Installed skill | \`.agents/skills/sdd-playbook-upgrade/SKILL.md\` |
| Assessment destination | \`$ADOPTION_ROOT/playbook-upgrade-assessment.md\` |
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

## Execution contract

1. Run \`./install-sdd.sh --validate\`, confirm every recorded path and
   revision, then read the installed required skill completely.
2. Keep the current revision authoritative while assessing the candidate.
3. Use the candidate's upgrade-assessment template and migration evidence.
4. Stop for independent review before changing the manifest pin or applying a
   migration. Self-review is evidence, never approval.
5. After supplied approval, migrate one reviewed boundary at a time. Recompute
   freshness and stop on conflicts, ambiguity, failed gates, or active work.
6. Cut over the manifest pin only after candidate validation passes. If it
   fails, preserve or restore the current revision and record rollback evidence.
7. If continuation or merge rules changed, reset them to explicit review until
   project authority reconfirms the mode.
8. At successful cutover or rollback, run \`./install-sdd.sh --cleanup\`, then
   run \`./install-sdd.sh\` to regenerate the normal runtime from the reviewed
   manifest pin and validate it.

## Prompt

Follow \`.sdd-runtime/playbook-upgrade-guide.md\` exactly.
EOF
  refresh_guide_hash "$UPGRADE_GUIDE_PATH"
  trap - EXIT

  printf 'Prepared candidate revision: %s\n' "$resolved_revision"
  printf 'Installed skill: sdd-playbook-upgrade\n'
  printf 'Generated guide: %s\n\n' "$UPGRADE_GUIDE_PATH"
  printf 'Prompt the agent with:\n\n'
  printf 'Follow %s exactly.\n' "$RUNTIME_ROOT/playbook-upgrade-guide.md"
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

TEMP_ROOT=$(cd "${TMPDIR:-/tmp}" && pwd -P)
TEMP_DIRECTORY=$(mktemp -d "$TEMP_ROOT/sdd-playbook.XXXXXX")
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
MARKER_PATH="$PLAYBOOK_CHECKOUT/.sdd-owned-checkout"
printf '%s\nproject-root=%s\n' "sdd-owned-checkout-v1" "$PROJECT_ROOT" >"$MARKER_PATH"

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

This machine-local guide connects the installer to the agent. Follow the
bounded workflow below; do not treat this file as a project system contract.

## Installation state

| Field | Value |
| --- | --- |
| Project root | \`$PROJECT_ROOT\` |
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
## Adoption execution contract

1. Confirm the working directory is the recorded project root.
2. Verify the checkout repository and resolved revision before reading it.
3. Read and follow the installed required skill completely.
4. Preserve project authority, unrelated changes, allowed write scopes, and
   every independent review stop.
5. When the manifest does not yet exist, use the runtime source information in
   this guide to populate its durable repository, immutable revision, and
   materialization mode. Do not copy machine-local paths into the manifest.
6. Do not request, infer, or record a product need during playbook installation.
7. After adoption reaches \`INSTALLED\`, instantiate an empty solution
   whiteboard at \`$ADOPTION_ROOT/solution-whiteboard.md\`.
8. Stop whenever reviewer approval, project authority, or user input is
   required. Never approve an artifact or state transition you generated.

## Expected completion boundary

- The adoption manifest is \`INSTALLED\` through recorded reviewer authority.
- The project solution whiteboard exists in its empty initial state.
- No need, solution, handoff, plan, product code, or delivery claim has been
  inferred or generated.
EOF
else
  cat >>"$GUIDE_PATH" <<EOF
## Delivery execution contract

1. Confirm the working directory is the recorded project root.
2. Verify the checkout repository, resolved revision, ownership marker, and
   content hash before reading it. Run \`./install-sdd.sh --validate\` when the
   runtime may have drifted.
3. Read and follow \`sdd-project-workflow\` completely, then re-read the manifest
   and active delivery workflow for live state and authorization.
4. Treat \`Manifest state detected\` as generation-time provenance. A compatible
   state advance within this workflow profile does not authorize a new action;
   the reviewed manifest and workflow remain authoritative.
5. Perform exactly one dependency-ready action inside its allowed write scope.
   Verify structured blockers and transitive freshness before editing.
6. After the action, compute freshness impact, keep the current change as the
   immediate review target, and do not correct a second stale artifact in the
   same invocation.
7. Preserve unrelated work and stop whenever approval, authority, or user input
   is required. Never self-approve.

## Expected completion boundary

- Exactly one manifest/workflow-authorized discovery, artifact, task, validation,
  or archive action is complete.
- Required checks and lifecycle invariants are reported separately.
- Newly stale dependants are recorded but not modified in the same action.
- The next independent review or dependency-ready action is explicit.
EOF
fi

cat >>"$GUIDE_PATH" <<EOF

## Runtime replacement

Reuse this guide only while its Required skill matches the reviewed manifest
state. After an approved state change requires a different skill, finish and
review the current boundary first. If cleanup is \`PENDING\`, run
\`./install-sdd.sh --cleanup\` from the project root, then run
\`./install-sdd.sh\` and verify the new guide's manifest state, required skill,
repository, and immutable revision. Never overwrite a pending checkout or use
an adoption guide to admit the first need.
EOF

refresh_guide_hash "$GUIDE_PATH"

trap - EXIT

printf 'Installed skill: %s\n' "$SKILL_NAME"
printf 'Generated guide: %s\n\n' "$GUIDE_PATH"
printf 'Prompt the agent with:\n\n'
printf 'Follow %s exactly.\n' "$RUNTIME_ROOT/agent-guide.md"
