#!/usr/bin/env bash
# Run Next.js from ~/Projects (local disk) — iCloud projects hang on first page load.
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${MLR_DEV_DIR:-$HOME/Projects/MLR-SCHOOL}"

echo "→ Syncing to $DEST"
mkdir -p "$DEST"
rsync -a --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  "$SRC/" "$DEST/"

cd "$DEST"

if [[ ! -d node_modules ]]; then
  echo "→ Installing dependencies (first run only)…"
  npm install
fi

echo "→ Starting dev server at http://127.0.0.1:3000"
exec npx next dev --hostname 127.0.0.1 --port 3000 --webpack
