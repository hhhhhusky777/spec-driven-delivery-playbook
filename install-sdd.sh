#!/usr/bin/env bash

set -euo pipefail

PLAYBOOK_REPOSITORY="https://github.com/Orientation-CD/spec-driven-delivery-playbook.git"
REQUESTED_REVISION="main"
REVISION_EXPLICIT=false
ADOPTION_ROOT=".github/spec-driven-delivery"
MANIFEST_RELATIVE_PATH=""
RUNTIME_ROOT=".sdd-runtime"
CLEANUP_ONLY=false

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
    --help|-h)
      usage
      exit 0
      ;;
    *)
      fail "unknown option: $1"
      ;;
  esac
done

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
if [[ -f "$MANIFEST_PATH" ]]; then
  MANIFEST_STATE=$(
    sed -n 's/^| Adoption state | `\([^`]*\)` |$/\1/p' "$MANIFEST_PATH" | head -n 1
  )
  [[ -n "$MANIFEST_STATE" ]] || MANIFEST_STATE="UNKNOWN"

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
  printf 'Removed installer-owned checkout: %s\n' "$checkout"
}

if [[ "$CLEANUP_ONLY" == true ]]; then
  cleanup_checkout
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

case "$MANIFEST_STATE" in
  INSTALLED|PILOT|REVIEW|ACTIVE|UPDATING|EXAMPLE_REVIEWED)
    SKILL_NAME="sdd-project-workflow"
    ;;
  *)
    SKILL_NAME="sdd-project-adoption"
    ;;
esac

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
| Required skill | \`$SKILL_NAME\` |
| Installed skill | \`.agents/skills/$SKILL_NAME/SKILL.md\` |

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

## Agent execution contract

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

trap - EXIT

printf 'Installed skill: %s\n' "$SKILL_NAME"
printf 'Generated guide: %s\n\n' "$GUIDE_PATH"
printf 'Prompt the agent with:\n\n'
printf 'Follow %s exactly.\n' "$RUNTIME_ROOT/agent-guide.md"
