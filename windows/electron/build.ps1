<#
  Builds the Dawn Patrol desktop app on Windows.
  Needs Node.js 18+ (https://nodejs.org). Run from this folder:   .\build.ps1
  Output: dist\Dawn Patrol Setup 1.0.0.exe (installer) and dist\DawnPatrol-Portable-1.0.0.exe (no install needed).
  Use  .\build.ps1 -Run  to just try it without building an installer.
#>
param([switch]$Run)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Error 'Node.js is not installed. Get it from https://nodejs.org and run this again.'; return }
npm install
if ($LASTEXITCODE -ne 0) { Write-Error 'npm install failed.'; return }
if ($Run) { npm start; return }
npm run dist
if ($LASTEXITCODE -ne 0) { Write-Error 'Build failed. See the messages above.'; return }
Write-Host ''
Write-Host 'Done. Your files are in the dist folder:'
Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot 'dist') -Filter *.exe | ForEach-Object { Write-Host ('  ' + $_.Name) }
