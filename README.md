# Mena Nutrition OS — Android

**Personal, bilingual (English / Egyptian Arabic), offline-first food planner** for Mena. Android only; no backend, subscription, login or hosting is needed.

## What's included

- 23 familiar, quick, mostly one-pot or one-air-fryer meal ideas; use a flexible library rather than a rigid daily plan.
- Gentle food prompts without calorie restrictions or guilt.
- Lidl weekly shopping list based on the meals selected and food already on hand.
- My Kitchen: fridge, freezer and pantry stock, quick add, expiry dates, leftovers, and batch cooking.
- Lidl Kassenbon import with human review before inventory changes.
- **Persistent SQLite database directly on the Android device**; changes survive app restarts.
- Explicit JSON **backup** through the Android share sheet (Google Drive is one option) and **restore** using a file picker.
- Optional, gentle Android local notifications.

The normal food planner and inventory work **without internet**. Lidl photo OCR currently loads its recognition engine from an internet CDN, so **photo scanning requires internet**. Manual receipt-text entry, quick add, the meal library, and SQLite work offline. Google Drive needs internet when actually sending a backup.

No health or nutrition targets are derived from medical records; this is a personal food-management tool, not medical treatment.

## Development

Requires Node 22, Java 21, and Android SDK with API 36 (or Android Studio).

```bash
npm ci
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk` (test/debug signed; install by enabling Android's install-unknown-apps permission).

Alternatively, the **Android APK** GitHub Actions workflow builds a downloadable artifact without a local Android SDK. A push to the `android-app` branch starts the workflow. Open GitHub → Actions → Android APK → latest successful run → download the **Mena-Nutrition-Android-APK** artifact. The downloaded ZIP contains `app-debug.apk`. The manual **Run workflow** control is available only when the workflow also exists on the repository's default branch.

## Data & recovery

Everything is stored on this phone in an unencrypted SQLite database (`mena_nutrition`). Stock, meal selections, recipe history and reminder settings are backed up to one JSON file. In My Kitchen, tap **Save backup** and send it to Google Drive (or your chosen destination). On a replacement device, install the app, download the JSON and choose **Restore from file**.

Because app data is local, uninstalling the app or clearing its storage can delete it. **Make a backup before uninstalling or switching phones.** JSON backups include personal pantry data; keep them private.

## Planned improvements

- Bundle offline German OCR instead of downloading it on demand.
- NFC shortcuts for opening quick add and logging food.
- User-tested Android navigation, keyboard and notifications.

## Notes for future releases

This APK uses the standard debug signing key; it is suitable for personal testing, not production distribution. Do not commit private signing keys or backups. Release APK/Play Store publishing requires separate signing and testing.
