<#
.SYNOPSIS
  Dawn Patrol for Windows: opens the surf forecast in its own app window and can add Start Menu / Desktop shortcuts.

.DESCRIPTION
  Uses Microsoft Edge or Google Chrome in "app mode" (no tabs, no address bar), so it looks and behaves like a desktop app.
  It uses your normal browser profile, so your saved spots, units and settings are the same as in the browser.

.PARAMETER Install     Create Start Menu and Desktop shortcuts, then open the app.
.PARAMETER Uninstall   Remove the shortcuts and the downloaded icon.
.PARAMETER Browser     Auto (default, prefers Edge), Edge or Chrome.
.PARAMETER Url         Site to open. Default is https://dawnpatrol.casadelfuego.org
.PARAMETER Width       Window width in pixels (default 1280).
.PARAMETER Height      Window height in pixels (default 860).
.PARAMETER NoLaunch    With -Install, create the shortcuts but do not open the app.
.PARAMETER Fullscreen  Open full screen (press F11 to leave).

.EXAMPLE
  .\DawnPatrol.ps1                  # open the app window
  .\DawnPatrol.ps1 -Install         # add shortcuts, then open
  .\DawnPatrol.ps1 -Uninstall

.EXAMPLE
  # One-line install from the site (nothing to download by hand):
  & ([scriptblock]::Create((irm https://dawnpatrol.casadelfuego.org/windows/DawnPatrol.ps1))) -Install
#>
[CmdletBinding()]
param(
  [switch]$Install,
  [switch]$Uninstall,
  [switch]$NoLaunch,
  [switch]$Fullscreen,
  [ValidateSet('Auto', 'Edge', 'Chrome')][string]$Browser = 'Auto',
  [string]$Url = 'https://dawnpatrol.casadelfuego.org',
  [int]$Width = 1280,
  [int]$Height = 860
)

$ErrorActionPreference = 'Stop'
$AppName = 'Dawn Patrol'
$DataDir = Join-Path $env:LOCALAPPDATA 'DawnPatrol'
$IcoPath = Join-Path $DataDir 'dawnpatrol.ico'
$StartMenuLnk = Join-Path ([Environment]::GetFolderPath('Programs')) "$AppName.lnk"
$DesktopLnk = Join-Path ([Environment]::GetFolderPath('Desktop')) "$AppName.lnk"

function Find-Browser([string]$Want) {
  $roots = @($env:ProgramFiles, [Environment]::GetEnvironmentVariable('ProgramFiles(x86)'), $env:LOCALAPPDATA) | Where-Object { $_ }
  $edge = @(foreach ($r in $roots) { Join-Path $r 'Microsoft\Edge\Application\msedge.exe' })
  $chrome = @(foreach ($r in $roots) { Join-Path $r 'Google\Chrome\Application\chrome.exe' })
  # App Paths registry entries cover non-standard install locations.
  foreach ($k in 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe', 'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe') {
    $v = (Get-ItemProperty -Path $k -ErrorAction SilentlyContinue).'(default)'; if ($v) { $edge += $v }
  }
  foreach ($k in 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe', 'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe') {
    $v = (Get-ItemProperty -Path $k -ErrorAction SilentlyContinue).'(default)'; if ($v) { $chrome += $v }
  }
  $order = @(); if ($Want -eq 'Edge') { $order = $edge } elseif ($Want -eq 'Chrome') { $order = $chrome } else { $order = $edge + $chrome }
  foreach ($p in $order) { if ($p -and (Test-Path -LiteralPath $p)) { return $p } }
  return $null
}

function Get-AppArgs {
  $a = @("--app=$Url", "--window-size=$Width,$Height")
  if ($Fullscreen) { $a += '--start-fullscreen' }
  return $a
}

function New-IcoFromPng([byte[]]$png, [string]$path) {
  # A Windows .ico can hold a PNG directly (Vista and later): 6-byte header + one 16-byte entry + the PNG bytes.
  $ms = New-Object System.IO.MemoryStream
  $bw = New-Object System.IO.BinaryWriter($ms)
  $bw.Write([uint16]0); $bw.Write([uint16]1); $bw.Write([uint16]1)
  $bw.Write([byte]0); $bw.Write([byte]0)          # 0 = 256 px (scaled)
  $bw.Write([byte]0); $bw.Write([byte]0)
  $bw.Write([uint16]1); $bw.Write([uint16]32)
  $bw.Write([uint32]$png.Length); $bw.Write([uint32]22)
  $bw.Write($png)
  $bw.Flush()
  [IO.File]::WriteAllBytes($path, $ms.ToArray())
}

function Get-Icon {
  if (Test-Path -LiteralPath $IcoPath) { return $IcoPath }
  try {
    New-Item -ItemType Directory -Force -Path $DataDir | Out-Null
    $base = $Url.TrimEnd('/')
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $tmp = Join-Path $DataDir 'icon-512.png'
    Invoke-WebRequest -UseBasicParsing -Uri "$base/icon-512.png" -OutFile $tmp
    New-IcoFromPng ([IO.File]::ReadAllBytes($tmp)) $IcoPath
    Remove-Item -LiteralPath $tmp -ErrorAction SilentlyContinue
    return $IcoPath
  } catch { Write-Warning "Could not download the icon ($($_.Exception.Message)). Using the browser icon instead."; return $null }
}

function New-Shortcut([string]$lnk, [string]$exe, [string[]]$arguments, [string]$icon) {
  $sh = New-Object -ComObject WScript.Shell
  $s = $sh.CreateShortcut($lnk)
  $s.TargetPath = $exe
  $s.Arguments = ($arguments | ForEach-Object { if ($_ -match '\s') { '"' + $_ + '"' } else { $_ } }) -join ' '
  $s.WorkingDirectory = Split-Path -Parent $exe
  $s.Description = 'Surf conditions, forecasts and spot scouting'
  $s.IconLocation = if ($icon) { $icon } else { "$exe,0" }
  $s.Save()
}

if ($Uninstall) {
  foreach ($f in $StartMenuLnk, $DesktopLnk) { if (Test-Path -LiteralPath $f) { Remove-Item -LiteralPath $f -Force; Write-Host "Removed $f" } }
  if (Test-Path -LiteralPath $DataDir) { Remove-Item -LiteralPath $DataDir -Recurse -Force; Write-Host "Removed $DataDir" }
  Write-Host "$AppName shortcuts removed. Your saved settings stay in your browser profile."
  return
}

$exe = Find-Browser $Browser
if (-not $exe) {
  Write-Error "Could not find Microsoft Edge or Google Chrome. Install one of them, or open $Url in any browser."
  return
}

if ($Install) {
  $icon = Get-Icon
  New-Shortcut $StartMenuLnk $exe (Get-AppArgs) $icon
  New-Shortcut $DesktopLnk $exe (Get-AppArgs) $icon
  Write-Host "Added '$AppName' to the Start Menu and Desktop."
  if ($NoLaunch) { return }
}

Start-Process -FilePath $exe -ArgumentList (Get-AppArgs)
