# Dawn Patrol for Windows (desktop app)

A small Windows app that shows https://dawnpatrol.casadelfuego.org in its own window. The forecast app is the website, so the desktop app is always up to date and nothing needs re-installing when the site improves.

Adds: its own window and taskbar icon, remembers window size and position, one copy at a time, tray icon (closing the window keeps alerts alive; right-click the tray icon > Quit), links to other sites open in your normal browser, and a friendly "can't reach Dawn Patrol" page when offline.

## Build it (on Windows)

1. Install Node.js (https://nodejs.org).
2. Open PowerShell in this folder and run:  `.\build.ps1`
   (if scripts are blocked: `powershell -ExecutionPolicy Bypass -File .\build.ps1`)
3. Pick up `dist\Dawn Patrol Setup 1.0.0.exe` (installer) or `dist\DawnPatrol-Portable-1.0.0.exe` (runs without installing).

Try it without building an installer: `.\build.ps1 -Run`

Windows SmartScreen will say "unknown publisher" because the app is not code-signed. Choose More info > Run anyway.
To point the app at another address while testing: `$env:DAWNPATROL_URL = 'https://example.com'; npm start`
