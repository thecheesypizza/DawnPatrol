'use strict';
// Dawn Patrol desktop shell. The app itself is the website (so it is always the latest version);
// this wrapper adds a native window, remembers its size and position, keeps one copy running,
// sends outside links to your default browser, and shows a friendly page when you are offline.
const { app, BrowserWindow, Menu, Tray, shell, nativeImage, session, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const SITE = process.env.DAWNPATROL_URL || 'https://dawnpatrol.casadelfuego.org';
const SITE_ORIGIN = new URL(SITE).origin;
// Hosts the app itself loads (map tiles, images, data). Navigating the main window elsewhere opens the real browser.
const OK_HOSTS = new Set([new URL(SITE).host]);

let win = null, tray = null, quitting = false;

// ---- one window only -------------------------------------------------------
if (!app.requestSingleInstanceLock()) { app.quit(); }
app.on('second-instance', () => { showWin(); });

// ---- remember window size / position --------------------------------------
const stateFile = () => path.join(app.getPath('userData'), 'window-state.json');
function loadState() {
  try { const s = JSON.parse(fs.readFileSync(stateFile(), 'utf8')); if (s && s.width > 300 && s.height > 300) return s; } catch (e) { /* first run */ }
  return { width: 1280, height: 860 };
}
function saveState() {
  if (!win || win.isDestroyed()) return;
  try {
    const b = win.getNormalBounds();
    fs.writeFileSync(stateFile(), JSON.stringify({ ...b, max: win.isMaximized(), full: win.isFullScreen() }));
  } catch (e) { /* ignore */ }
}

function showWin() {
  if (!win) return createWin();
  if (win.isMinimized()) win.restore();
  win.show(); win.focus();
}

function createWin() {
  const st = loadState();
  win = new BrowserWindow({
    width: st.width, height: st.height, x: st.x, y: st.y,
    minWidth: 380, minHeight: 560,
    backgroundColor: '#0A171C',
    title: 'Dawn Patrol',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  if (st.max) win.maximize();
  if (st.full) win.setFullScreen(true);
  win.once('ready-to-show', () => win.show());

  win.loadURL(SITE);

  // Offline or server unreachable: show the built-in page, retry when asked.
  win.webContents.on('did-fail-load', (_e, code, _desc, _url, isMainFrame) => {
    if (isMainFrame && code !== -3 /* ERR_ABORTED */) win.loadFile(path.join(__dirname, 'offline.html'));
  });

  // Links to other sites open in the default browser, not inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isHttp(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (url.startsWith('file:')) return; // our offline page
    let host = ''; try { host = new URL(url).host; } catch (x) { /* bad url */ }
    if (!OK_HOSTS.has(host)) { e.preventDefault(); if (isHttp(url)) shell.openExternal(url); }
  });

  win.on('resize', saveState); win.on('move', saveState);
  win.on('close', (e) => {
    saveState();
    // Closing the window keeps Dawn Patrol in the tray so alerts keep working; use File > Quit to exit.
    if (!quitting && tray) { e.preventDefault(); win.hide(); }
  });
  win.on('closed', () => { win = null; });
}

const isHttp = (u) => { try { const p = new URL(u).protocol; return p === 'https:' || p === 'http:'; } catch (e) { return false; } };

// ---- menu ------------------------------------------------------------------
function buildMenu() {
  const tpl = [
    { label: 'File', submenu: [
      { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => win && win.webContents.reload() },
      { label: 'Go to home', accelerator: 'CmdOrCtrl+H', click: () => win && win.loadURL(SITE) },
      { label: 'Open in browser', click: () => shell.openExternal(SITE) },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => { quitting = true; app.quit(); } }
    ] },
    { label: 'View', submenu: [
      { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
      { type: 'separator' }, { role: 'togglefullscreen' }
    ] },
    { label: 'Help', submenu: [
      { label: 'Dawn Patrol website', click: () => shell.openExternal(SITE) },
      { label: 'About', click: () => dialog.showMessageBox({ type: 'info', title: 'Dawn Patrol', message: 'Dawn Patrol ' + app.getVersion(), detail: 'Desktop shell for ' + SITE + '\nThe app updates itself: it is always the latest site.' }) }
    ] }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(tpl));
}

// ---- tray ------------------------------------------------------------------
function buildTray() {
  const img = nativeImage.createFromPath(path.join(__dirname, '..', 'build', 'icon.png'));
  if (img.isEmpty()) return; // no icon file: skip tray, closing the window quits the app
  tray = new Tray(img.resize({ width: 16, height: 16 }));
  tray.setToolTip('Dawn Patrol');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open Dawn Patrol', click: showWin },
    { type: 'separator' },
    { label: 'Quit', click: () => { quitting = true; app.quit(); } }
  ]));
  tray.on('click', showWin);
}

app.whenReady().then(() => {
  // Allow the app's own features: notifications, location (for "nearest spot"), clipboard.
  session.defaultSession.setPermissionRequestHandler((wc, permission, cb) => {
    let origin = ''; try { origin = new URL(wc.getURL()).origin; } catch (e) { /* none */ }
    cb(origin === SITE_ORIGIN && ['notifications', 'geolocation', 'clipboard-sanitized-write', 'fullscreen'].includes(permission));
  });
  buildMenu(); buildTray(); createWin();
  app.on('activate', showWin);
});

app.on('before-quit', () => { quitting = true; });
app.on('window-all-closed', () => { if (!tray) app.quit(); });
