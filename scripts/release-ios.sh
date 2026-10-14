#!/bin/bash
# Build, sign and upload Marigold to App Store Connect without an Apple ID in
# Xcode. Uses an App Store Connect API key plus a manually managed
# "Apple Distribution" identity and App Store profiles (see README notes).
#
#   ASC_KEY_ID=47Y7KWJ9DU ASC_ISSUER_ID=87c996e7-... scripts/release-ios.sh
#
# Expects:
#   ~/.appstoreconnect/private_keys/AuthKey_$ASC_KEY_ID.p8
#   ~/Library/Keychains/marigold-signing.keychain-db (+ ~/.appstoreconnect/signing/kc.pass)
#   installed profiles "Marigold AppStore" and "Marigold Widgets AppStore"
# Bump CFBundleVersion (CURRENT_PROJECT_VERSION) before each upload.
set -euo pipefail
cd "$(dirname "$0")/../ios"

: "${ASC_KEY_ID:?set ASC_KEY_ID}"
: "${ASC_ISSUER_ID:?set ASC_ISSUER_ID}"
export DEVELOPER_DIR="${DEVELOPER_DIR:-/Applications/Xcode.app/Contents/Developer}"
KEYCHAIN="$HOME/Library/Keychains/marigold-signing.keychain-db"
GEM_PATH="/opt/homebrew/Cellar/cocoapods/1.17.0/libexec:$(/opt/homebrew/opt/ruby/bin/ruby -e 'print Gem.default_dir')"
export GEM_PATH

security unlock-keychain -p "$(cat "$HOME/.appstoreconnect/signing/kc.pass")" "$KEYCHAIN"

# Switch Release signing to manual for the app and widget, and always restore it.
restore() { git checkout -- Marigold.xcodeproj/project.pbxproj; }
trap restore EXIT
/opt/homebrew/opt/ruby/bin/ruby -e '
require "xcodeproj"
p = Xcodeproj::Project.open("Marigold.xcodeproj")
{ "Marigold" => "Marigold AppStore", "MarigoldWidgets" => "Marigold Widgets AppStore" }.each do |name, profile|
  c = p.targets.find { |t| t.name == name }.build_configurations.find { |x| x.name == "Release" }
  c.build_settings.merge!("CODE_SIGN_STYLE" => "Manual", "DEVELOPMENT_TEAM" => "CBTKNY3LFC",
    "PROVISIONING_PROFILE_SPECIFIER" => profile, "CODE_SIGN_IDENTITY" => "Apple Distribution",
    "CODE_SIGN_IDENTITY[sdk=iphoneos*]" => "Apple Distribution")
end
p.save'

rm -rf build/Marigold.xcarchive build/export
xcodebuild -workspace Marigold.xcworkspace -scheme Marigold -configuration Release \
  -destination 'generic/platform=iOS' -archivePath build/Marigold.xcarchive \
  -derivedDataPath build/release-dd archive | tail -3

cat > build/ExportOptions-manual.plist <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key><string>app-store-connect</string>
  <key>destination</key><string>export</string>
  <key>teamID</key><string>CBTKNY3LFC</string>
  <key>signingStyle</key><string>manual</string>
  <key>signingCertificate</key><string>Apple Distribution</string>
  <key>provisioningProfiles</key>
  <dict>
    <key>com.okanberk.marigold</key><string>Marigold AppStore</string>
    <key>com.okanberk.marigold.widgets</key><string>Marigold Widgets AppStore</string>
  </dict>
  <key>uploadSymbols</key><true/>
</dict>
</plist>
EOF
xcodebuild -exportArchive -archivePath build/Marigold.xcarchive -exportPath build/export \
  -exportOptionsPlist build/ExportOptions-manual.plist | tail -2

xcrun altool --validate-app -f build/export/Marigold.ipa -t ios --apiKey "$ASC_KEY_ID" --apiIssuer "$ASC_ISSUER_ID"
xcrun altool --upload-app -f build/export/Marigold.ipa -t ios --apiKey "$ASC_KEY_ID" --apiIssuer "$ASC_ISSUER_ID"
