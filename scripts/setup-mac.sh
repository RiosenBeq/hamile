#!/usr/bin/env bash
# One-shot Mac setup for Marigold. Idempotent — safe to re-run.
# Usage: npm run mac:setup
set -euo pipefail

cyan="\033[1;36m"; green="\033[1;32m"; yellow="\033[1;33m"; red="\033[1;31m"; reset="\033[0m"
say() { printf "${cyan}▸${reset} %s\n" "$*"; }
ok()  { printf "${green}✓${reset} %s\n" "$*"; }
warn(){ printf "${yellow}!${reset} %s\n" "$*"; }
die() { printf "${red}✗${reset} %s\n" "$*"; exit 1; }

[ "$(uname -s)" = "Darwin" ] || die "This script only runs on macOS. You're on $(uname -s)."

# ── 1. Xcode ──────────────────────────────────────────────────
say "Checking Xcode…"
if ! xcode-select -p >/dev/null 2>&1; then
  warn "Xcode command-line tools not found. Triggering installer (a GUI prompt will appear)."
  xcode-select --install || true
  warn "After the installer finishes, re-run this script."
  exit 1
fi
ok "Xcode CLT: $(xcode-select -p)"

XCODE_VER="$(xcodebuild -version 2>/dev/null | head -1 | awk '{print $2}' || true)"
if [ -n "$XCODE_VER" ]; then
  ok "Xcode $XCODE_VER detected"
else
  warn "Xcode app itself not found. Install from App Store (≥ 15.0)."
fi

# ── 2. Homebrew ──────────────────────────────────────────────
if ! command -v brew >/dev/null 2>&1; then
  say "Homebrew not found — installing…"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
ok "Homebrew: $(brew --version | head -1)"

# ── 3. Node ──────────────────────────────────────────────────
if ! command -v node >/dev/null 2>&1; then
  say "Installing Node 20…"
  brew install node@20
  brew link --overwrite node@20
fi
ok "Node: $(node -v)"

# ── 4. Watchman ──────────────────────────────────────────────
if ! command -v watchman >/dev/null 2>&1; then
  say "Installing Watchman…"
  brew install watchman
fi
ok "Watchman: $(watchman --version)"

# ── 5. CocoaPods ─────────────────────────────────────────────
if ! command -v pod >/dev/null 2>&1; then
  say "Installing CocoaPods…"
  brew install cocoapods
fi
ok "CocoaPods: $(pod --version)"

# ── 6. EAS CLI (optional but recommended for App Store) ─────
if ! command -v eas >/dev/null 2>&1; then
  say "Installing EAS CLI globally…"
  npm install -g eas-cli >/dev/null
fi
ok "EAS CLI: $(eas --version | head -1)"

# ── 7. .env scaffolding ──────────────────────────────────────
if [ ! -f .env ]; then
  cp .env.example .env
  warn "Created .env from .env.example — fill in keys if you want backend / AI."
else
  ok ".env present"
fi

# ── 8. Install + prebuild ────────────────────────────────────
say "Installing JS dependencies…"
npm install --silent
ok "Dependencies installed"

say "Generating native iOS project (expo prebuild)…"
npx expo prebuild --platform ios --clean

say "Installing CocoaPods…"
( cd ios && pod install --repo-update )

ok "All set. Open the workspace with: npm run xcode"
echo
echo "Next steps:"
echo "  • npm run ios               # build & boot in iOS simulator"
echo "  • npm run xcode             # open ios/marigold.xcworkspace in Xcode"
echo "  • npm run mac:doctor        # verify environment is healthy"
