#!/bin/sh
# Remove Cursor co-author trailers from all commit messages on the current branch.
# Usage: FILTER_BRANCH_SQUELCH_WARNING=1 sh scripts/clean-coauthor-messages.sh [branch]
set -eu

BRANCH="${1:-main}"

FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f \
  --msg-filter 'grep -v -E -i "^Co-authored-by:.*cursor" || true' \
  "$BRANCH"

git update-ref -d "refs/original/refs/heads/$BRANCH" 2>/dev/null || true
