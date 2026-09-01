#!/usr/bin/env bash

set -euo pipefail

PLAYBOOK_REPOSITORY="https://github.com/Orientation-CD/spec-driven-delivery-playbook.git"
REQUESTED_REVISION="main"
REVISION_EXPLICIT=false
ADOPTION_ROOT=".github/spec-driven-delivery"
MANIFEST_RELATIVE_PATH=""
RUNTIME_ROOT=".sdd-runtime"
CLEANUP_ONLY=false
VALIDATE_ONLY=false
GUIDE_SCHEMA_VERSION="2"
GENERATOR_VERSION="2.0.0"

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
    --help|-h)
      usage
      exit 0
      ;;
    *)
      fail "unknown option: $1"
      ;;
  esac
done

if [[ "$CLEANUP_ONLY" == true && "$VALIDATE_ONLY" == true ]]; then
  fail "--cleanup and --validate are mutually exclusive"
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
MANIFEST_PATH="$PROJECT_ROOT/$MANIFEST_RELATIVE_PATH"
MANIFEST_STATE="ABSENT"
MANIFEST_STATE_BEFORE_BLOCK="NONE"
if [[ -f "$MANIFEST_PATH" ]]; then
  MANIFEST_STATE=$(
    sed -n 's/^| Adoption state | `\([^`]*\)` |$/\1/p' "$MANIFEST_PATH" | head -n 1
  )
  [[ -n "$MANIFEST_STATE" ]] || MANIFEST_STATE="UNKNOWN"
  MANIFEST_STATE_BEFORE_BLOCK=$(
    sed -n 's/^| State before block | `\([^`]*\)` |$/\1/p' "$MANIFEST_PATH" | head -n 1
  )
  [[ -n "$MANIFEST_STATE_BEFORE_BLOCK" ]] || MANIFEST_STATE_BEFORE_BLOCK="NONE"

  if [[ "$REVISION_EXPLICIT" == false ]]; then
    PINNED_REVISION=$(
      sed -n 's/^| Playbook revision | `\([0-9a-fA-F]\{40\}\)` |$/\1/p' \
        "$MANIFEST_PATH" | head -n 1
    )
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

cleanup_checkout() {
  [[ -f "$GUIDE_PATH" ]] || fail "no installation guide found at $GUIDE_PATH"

  local checkout marker recorded_project cleanup_state temp_root updated_guide
  cleanup_state=$(markdown_value "Cleanup state" "$GUIDE_PATH")
  if [[ "$cleanup_state" == "COMPLETE" ]]; then
    printf 'Installer-owned checkout is already cleaned up.\n'
    return
  fi
  [[ "$cleanup_state" == "PENDING" ]] ||
    fail "installation guide has an unknown cleanup state"

  checkout=$(markdown_value "Playbook checkout" "$GUIDE_PATH")
  marker=$(markdown_value "Ownership marker" "$GUIDE_PATH")
  recorded_project=$(markdown_value "Project root" "$GUIDE_PATH")
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
  updated_guide="$GUIDE_PATH.tmp"
  awk '
    /^\| Cleanup state \| `PENDING` \|$/ {
      print "| Cleanup state | `COMPLETE` |"
      next
    }
    { print }
  ' "$GUIDE_PATH" >"$updated_guide"
  mv "$updated_guide" "$GUIDE_PATH"
  refresh_guide_hash "$GUIDE_PATH"
  printf 'Removed installer-owned checkout: %s\n' "$checkout"
}

if [[ "$CLEANUP_ONLY" == true ]]; then
  cleanup_checkout
  exit 0
fi

if [[ "$VALIDATE_ONLY" == true ]]; then
  validate_runtime
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

GIT_EXCLUDE=$(git rev-parse --git-path info/exclude)
case "$GIT_EXCLUDE" in
  /*) ;;
  *) GIT_EXCLUDE="$PROJECT_ROOT/$GIT_EXCLUDE" ;;
esac
mkdir -p "$(dirname "$GIT_EXCLUDE")"
touch "$GIT_EXCLUDE"
for pattern in \
  "/$RUNTIME_ROOT/" \
  "/.agents/skills/sdd-project-adoption/" \
  "/.agents/skills/sdd-project-workflow/"; do
  grep -Fqx "$pattern" "$GIT_EXCLUDE" || printf '%s\n' "$pattern" >>"$GIT_EXCLUDE"
done

INSTALLER_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/$(basename "${BASH_SOURCE[0]}")
case "$INSTALLER_PATH" in
  "$PROJECT_ROOT"/*)
    INSTALLER_PATTERN="/${INSTALLER_PATH#"$PROJECT_ROOT"/}"
    grep -Fqx "$INSTALLER_PATTERN" "$GIT_EXCLUDE" ||
      printf '%s\n' "$INSTALLER_PATTERN" >>"$GIT_EXCLUDE"
    ;;
esac

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
