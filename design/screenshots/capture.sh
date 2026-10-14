#!/bin/bash
# Capture raw App Store screenshots on the booted simulator (iPhone 17 Pro Max)
# for the given languages, using the dev build's demo seed and deep links.
#   design/screenshots/capture.sh en tr es de fr pt
set -e
cd "$(dirname "$0")"
xcrun simctl status_bar booted override --time "9:41" --batteryState discharging --batteryLevel 100 --cellularBars 4 --wifiBars 3 --dataNetwork wifi
detail_for() {
  case "$1" in
    en) echo sushi ;; tr) echo turkish-coffee ;; es) echo jamon-curado ;;
    de) echo matjes ;; fr) echo rillettes ;; pt) echo acai ;;
  esac
}
shot() { sleep "${2:-1.6}"; xcrun simctl io booted screenshot "raw/$LANG_CODE/$1.png" >/dev/null 2>&1; echo "  $LANG_CODE/$1"; }
open_url() { xcrun simctl openurl booted "$1"; }
for LANG_CODE in "$@"; do
  mkdir -p "raw/$LANG_CODE"
  open_url "marigold://demo?lang=$LANG_CODE&week=24"; shot 01-today 3
  open_url "marigold://weeks"; shot 02-weeks
  open_url "marigold://check"; shot 03-check
  open_url "marigold://safety/$(detail_for "$LANG_CODE")"; shot 04-detail 2
  open_url "marigold://tools"; shot 05-tools 2
  open_url "marigold://journal"; shot 06-journal
done
