# Dawn Patrol on Windows

Both options open the live site, so you never need to update them when the site improves.

## 1. PowerShell launcher (no install)

Open PowerShell and run:

```powershell
& ([scriptblock]::Create((irm https://dawnpatrol.casadelfuego.org/windows/DawnPatrol.ps1))) -Install
```

`windows/DawnPatrol.ps1` finds Microsoft Edge or Google Chrome, builds an icon from the site’s artwork, adds Start Menu and Desktop shortcuts, and opens the site in a window with no browser controls (`--app=URL`).

| Parameter | What it does |
|---|---|
| `-Install` | Create the shortcuts, then open the app |
| `-Uninstall` | Remove the shortcuts and the icon |
| `-NoLaunch` | Don’t open the window |
| `-Fullscreen` | Start full screen |
| `-Browser Auto\|Edge\|Chrome` | Pick the browser (default Auto) |
| `-Url`, `-Width`, `-Height` | Change the address or window size |

To host your own copy, serve the script from your Worker (`windows/DawnPatrol.ps1`) and change the default for `-Url`.

## 2. Electron desktop app

`windows/electron/` (see its own README) is a small Electron wrapper. It runs one copy at a time, has a tray icon (closing the window keeps push alerts running), remembers the window size and position, opens outside links in your browser, and shows a simple offline page.

On Windows, with Node.js installed:

```powershell
cd windows\electron
.\build.ps1          # builds an installer and a portable .exe in dist\
.\build.ps1 -Run     # runs it without building an installer
```

The app isn’t code-signed, so SmartScreen will say “unknown publisher”. Choose More info, then Run anyway. To point it at another address while you test, set `$env:DAWNPATROL_URL`.

Status: the launcher is written for PowerShell 5.1 and later, and the Electron project follows standard electron-builder usage. Neither has been run on a real Windows machine yet. If `build.ps1` fails, please open an issue with the output.
