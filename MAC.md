# Marigold — Mac & Xcode quickstart

This is the path from **fresh git clone on a Mac** to **app running in Xcode** to **shipped on the App Store**.

---

## TL;DR (fresh Mac, zero setup)

```bash
git clone https://github.com/RiosenBeq/hamile.git marigold
cd marigold
npm run mac:setup        # installs Xcode CLT, Homebrew, Node, Watchman, Pods, EAS
npm run xcode            # opens ios/marigold.xcworkspace
```

Then in Xcode hit ▶. That's it.

---

## What `mac:setup` does

`scripts/setup-mac.sh` is idempotent — safe to re-run. It:

1. Verifies Xcode + command-line tools (offers to install if missing)
2. Installs Homebrew if absent
3. Installs `node@20`, `watchman`, `cocoapods`, `eas-cli`
4. Copies `.env.example` → `.env` if you don't have one yet
5. Runs `npm install`
6. Runs `expo prebuild --platform ios --clean` to generate `ios/`
7. Runs `pod install --repo-update` inside `ios/`

After it finishes you have a complete `ios/marigold.xcworkspace` ready for Xcode.

---

## Daily commands

| Goal | Command |
| --- | --- |
| Open the workspace in Xcode | `npm run xcode` |
| Run in iOS Simulator (Metro auto-starts) | `npm run ios` |
| Run on a physical iPhone | `npm run ios:device` |
| Just start Metro (already-built dev client) | `npm run start` |
| Re-generate `ios/` from scratch (after a plugin change) | `npm run prebuild:clean` |
| Re-install pods (after dependency change) | `npm run pods` |
| Wipe everything (`ios`, `android`, `node_modules`, caches) | `npm run clean` |
| Health check | `npm run mac:doctor` |

---

## Why we use `expo-dev-client` instead of Expo Go

The app uses **expo-camera, expo-local-authentication, expo-notifications, expo-secure-store**. These are native modules that ship with the dev client but **not** with the Expo Go app. So:

- ❌ `expo start --go` won't work (no native modules)
- ✅ `expo start --dev-client` (default in `npm run start`) is what you want
- ✅ `npm run ios` does both: build the dev client and start Metro

The dev client is a custom build of Marigold itself with debug machinery on top — it loads the JS bundle from your laptop's Metro, but native code (camera, biometrics, …) is the real native code.

---

## Opening in Xcode (the GUI way)

1. `npm run xcode` (or manually: `open ios/marigold.xcworkspace` — **always the workspace, never the .xcodeproj**)
2. Top toolbar → pick `iPhone 15 Pro` (or any other simulator)
3. ▶ Run

Xcode will:
- Build via xcodebuild
- Boot the simulator
- Install the app
- Launch it
- Metro starts in a separate terminal automatically

If Metro doesn't auto-start, run `npm run start` in a second terminal.

---

## Running on a physical iPhone

1. Connect iPhone via USB the first time. Trust the computer when prompted on the phone.
2. In Xcode → Marigold target → **Signing & Capabilities** → set **Team** to your Apple ID. (Free Personal Team works for self-install.)
3. Bundle identifier must be unique. Default is `app.marigold.companion` — if Apple says it's taken, change to `com.yourname.marigold`.
4. iPhone → Settings → General → VPN & Device Management → trust your developer certificate.
5. ▶ Run (target dropdown shows your phone).

A free Apple ID install expires after **7 days**. To get a 1-year cert, enroll in Apple Developer Program ($99/year) — see "Shipping to App Store" below.

---

## Shipping to App Store (5-step path)

### Step 1 · Enrol in Apple Developer Program
https://developer.apple.com/programs/ — $99/year. Approval is 1-3 days.

### Step 2 · Create the app on App Store Connect
https://appstoreconnect.apple.com → My Apps → +
- Name: **Marigold**
- Bundle ID: `app.marigold.companion` (or yours)
- SKU: `marigold-001`

You'll get **Apple ID** (your email), **App Store Connect App ID** (10-digit number), **Apple Team ID** (10-character alphanumeric, from developer.apple.com → Membership Details).

### Step 3 · Update `eas.json` once
Open `eas.json` and replace the placeholders under `submit.production.ios`:

```json
{
  "appleId":      "you@example.com",
  "ascAppId":     "1234567890",
  "appleTeamId":  "ABCDE12345"
}
```

Commit + push.

### Step 4 · Build a production binary
```bash
eas login                    # one-time
eas init                     # one-time, writes projectId into app.json
npm run build:ios            # ~15-25 min in EAS cloud
```

EAS handles signing certificates and provisioning profiles. First time, say **Yes** to "Generate a new Apple Distribution Certificate?". EAS stores the p8/p12 in their vault — you never touch a `.p12` file.

### Step 5 · Submit
```bash
npm run submit:ios           # uploads .ipa to TestFlight
```

The build appears in App Store Connect → TestFlight in ~15-30 min. Test it on your phone first via the TestFlight app. When you're happy, in App Store Connect → Distribution → "Submit for App Store Review".

You'll need:
- Screenshots for **6.7"** (1290×2796) and **6.5"** (1242×2688) iPhones — 3 to 10 each
- Privacy Policy URL (a Notion page or GitHub Pages is fine)
- Support URL
- App Privacy answers — **Health & Fitness > Pregnancy** is the relevant data class
- Age rating — pick 12+

Apple's review usually comes back in 1-3 days.

---

## Common Xcode pitfalls and fixes

| Symptom | Fix |
| --- | --- |
| `pod install` errors on Apple Silicon | `cd ios && arch -x86_64 pod install` |
| "No bundle URL present" red screen | `npm run start -c` (clear Metro cache) |
| Build fails: "Cycle inside FBReactNativeSpec" | Xcode → Product → Clean Build Folder → re-build |
| Build fails: "Multiple commands produce" | `npm run clean && npm run mac:setup` |
| Sim boots but app crashes immediately | Check Xcode → Window → Devices & Simulators → Open Recent Logs |
| "Untrusted Developer" on physical device | Phone → Settings → General → VPN & Device Management → trust your cert |
| Camera not asking permission on first run | Already wired in `app.json`. If still missing: re-run `npm run prebuild:clean` |
| Reanimated worklet errors | `react-native-reanimated/plugin` must be **last** in `babel.config.js` plugins list — already configured |

---

## Why `ios/` and `android/` are git-ignored

This is an Expo **managed workflow**. The native projects are generated from `app.json` and the installed plugins. Committing them creates merge conflicts every time anyone updates a dependency, and they desync from the JS-side config.

When you switch Macs / re-clone, just run `npm run mac:setup` and you're back where you were. No state lives in `ios/` that isn't reproducible.

If you ever need to commit native files (e.g., adding a custom Swift file to the iOS target), you can switch to bare workflow — but at that point you're managing Xcode projects manually. For 99% of work, managed is the right choice.

---

## Quick reference

- Workspace path: `ios/marigold.xcworkspace`
- Bundle identifier: `app.marigold.companion` (in `app.json` → `ios.bundleIdentifier`)
- Min iOS: 13.4 (Expo SDK 51 default)
- Build server: EAS (cloud) — no Xcode archive needed for App Store
- Metro port: 8081
- Useful URLs:
  - https://docs.expo.dev/build/setup/
  - https://docs.expo.dev/submit/ios/
