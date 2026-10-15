MY PERSONAL ASSISTANT — VERSION 1
=================================

Included features
- Bilingual Malayalam + English interface
- Daily Top 3 tasks and progress
- Five-prayer checklist and Qur'an minutes
- Habit tracker
- Food log with rough nutrition estimates for a limited list of common foods
- Weight, water and walking tracker
- Study session tracker
- Daily report and reflection
- Rule-based on-device coach
- Export/import JSON backup
- Installable PWA with offline caching (when hosted over HTTPS)

IMPORTANT LIMITATIONS
- This is a starter prototype, not a medically validated calorie tracker.
- Food estimates only recognize a small list of common names in English/Malayalam. Unknown items show 0 until a better nutrition database is added.
- The AI Coach in this free version is rule-based, not a generative cloud AI model. The “Copy report + AI prompt” button lets you paste your log into ChatGPT for deeper analysis.
- Prayer times are not auto-calculated. Confirm them with your local mosque or a trusted prayer-time source.
- Data is stored in this browser on this device. Browser clearing/device loss may delete it; export backups regularly.
- Do not store passwords, OTPs, bank details, or other secrets.

HOW TO USE ON ANDROID
1. Unzip this folder.
2. Upload all files to a free HTTPS static host such as GitHub Pages. A short setup guide is below.
3. Open the HTTPS site in Chrome on your Android phone.
4. Tap Chrome menu (⋮) > Add to Home screen / Install app.
5. Open the new icon. Use Export backup every few days.

QUICK GITHUB PAGES SETUP (FREE)
1. Sign in to GitHub and create a new repository. For easiest setup, name it personal-assistant-app.
2. Choose Public if using GitHub Pages on the free plan. IMPORTANT: a public repository means the source code is publicly viewable. Do not put private personal records in the repository. The app's logged data stays in browser localStorage, not in the repository.
3. Upload index.html, app.js, manifest.webmanifest, sw.js and icon.svg to the repository root.
4. Go to repository Settings > Pages.
5. Under Build and deployment, choose Deploy from a branch; select main and /(root), then Save.
6. Wait for the published URL shown on the Pages settings page.
7. Open that URL on Android Chrome and Add to Home screen.

PRIVACY
- Do not put personal logs into source files or commit them to GitHub.
- For more privacy, a private repository or a local-only deployment needs a different hosting arrangement; free GitHub Pages commonly requires a public repository.
- App data is not encrypted in this prototype. Anyone who can unlock your phone and access the same browser profile may be able to view it.
- Exported backup JSON files are readable; keep them somewhere private.
- No analytics or third-party tracking are included.

NEXT VERSION IDEAS
- Better food database and serving sizes
- Weekly charts
- Prayer-time calculator/location settings
- PIN/app lock and encrypted backup
- Real AI API integration (requires a securely managed backend; never put an API key in frontend code)
