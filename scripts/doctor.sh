#!/usr/bin/env bash
# Quick health check for the local Mac dev environment. Read-only; never
# installs anything. Use after `mac:setup` to confirm everything is wired.

set -uo pipefail

green="\033[1;32m"; yellow="\033[1;33m"; red="\033[1;31m"; reset="\033[0m"
ok()   { printf "${green}✓${reset} %-32s %s\n" "$1" "${2:-}"; }
warn() { printf "${yellow}!${reset} %-32s %s\n" "$1" "${2:-}"; }
fail() { printf "${red}✗${reset} %-32s %s\n" "$1" "${2:-}"; }

echo "── Marigold dev doctor ─────────────────────────"

# OS
if [ "$(uname -s)" = "Darwin" ]; then ok "macOS" "$(sw_vers -productVersion)"; else fail "macOS only"; fi

# Node
if command -v node >/dev/null 2>&1; then
  V="$(node -v)"
  case "$V" in
    v20.*|v21.*|v22.*) ok "Node" "$V" ;;
    *) warn "Node" "$V — recommend 20+" ;;
  esac
else fail "Node" "not installed"; fi

# Watchman
command -v watchman >/dev/null 2>&1 && ok "Watchman" "$(watchman --version)" || warn "Watchman" "missing — Metro will be slow"

# Xcode CLT
xcode-select -p >/dev/null 2>&1 && ok "Xcode CLT" "$(xcode-select -p)" || fail "Xcode CLT" "run: xcode-select --install"

# Xcode
if XV="$(xcodebuild -version 2>/dev/null | head -1 | awk '{print $2}')"; [ -n "$XV" ]; then
  case "$XV" in
    15.*|16.*|17.*) ok "Xcode" "$XV" ;;
    *) warn "Xcode" "$XV — Expo SDK 51 wants ≥ 15" ;;
  esac
else
  warn "Xcode" "app not found — App Store → install Xcode"
fi

# Pods
command -v pod >/dev/null 2>&1 && ok "CocoaPods" "$(pod --version)" || fail "CocoaPods" "brew install cocoapods"

# Simulator
if xcrun simctl list devices available 2>/dev/null | grep -q "iPhone"; then
  IP="$(xcrun simctl list devices available | grep -m1 "iPhone" | sed 's/^[[:space:]]*//' | cut -d'(' -f1 | xargs)"
  ok "iOS Simulator" "$IP available"
else
  warn "iOS Simulator" "no iPhone runtime — Xcode → Settings → Components"
fi

# EAS
command -v eas >/dev/null 2>&1 && ok "EAS CLI" "$(eas --version | head -1)" || warn "EAS CLI" "needed for App Store: npm i -g eas-cli"

# Project deps
[ -d node_modules ] && ok "node_modules" "present" || fail "node_modules" "run: npm install"
[ -d ios ]          && ok "ios/ folder" "prebuilt"  || warn "ios/ folder" "run: npm run prebuild"
[ -d ios/Pods ]     && ok "ios/Pods" "installed"   || warn "ios/Pods" "run: npm run pods"
[ -f .env ]         && ok ".env" "present"          || warn ".env" "cp .env.example .env"

# Apple ID signed-in to Xcode
if defaults read ~/Library/Preferences/com.apple.dt.Xcode IDESuppressFirstLaunchHelloScreen 2>/dev/null >/dev/null; then
  ok "Xcode opened before" ""
else
  warn "Xcode" "open it once, sign in (Xcode → Settings → Accounts)"
fi

echo "─────────────────────────────────────────────────"
echo "Open in Xcode:   npm run xcode"
echo "Run on sim:      npm run ios"
echo "Build & ship:    npm run build:ios  (then  npm run submit:ios)"
