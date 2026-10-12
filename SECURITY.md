# Security

## Reporting a vulnerability

Please report privately rather than in a public issue. Use GitHub's "Report a vulnerability" button on the Security tab of this repository, or contact the owner through their GitHub profile. Include steps to reproduce. You should get a reply within a week.

## What to know

- **Secrets** (`WINDY_KEY`) are Worker secrets. They are never in the repository or sent to the browser.
- **Your data** (spots, notes, settings) stays in the browser on your device. The current app has no sign-in. The Worker no longer has account, sync or crew routes (removed in 0.1.14), so it no longer handles passwords.
- **Third-party calls** (map tiles, Open-Meteo, NOAA) are made from the browser or the Worker with no credentials.
- **Report-a-problem logs** stay on the device unless the person sends them. They exclude notes, names and passwords.
- The Windows launcher and Electron wrapper only open the public site. The Electron app is not code-signed.
