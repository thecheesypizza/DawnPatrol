#!/bin/bash
set -e
cd "$(dirname "$0")"
mkdir -p dist
{ cat src/10-head.html src/20-body.html; echo "<script>"; cat src/05-log.js src/30-data.js src/35-coast.js src/37-services.js src/38-me.js src/39-tides.js src/40-map.js src/50-charts.js src/60-app.js; echo "</script>"; } > dist/dawn-patrol.fragment.html
{ cat src/wrap-head.txt dist/dawn-patrol.fragment.html; echo "</body></html>"; } > dist/dawn-patrol.html
wc -c dist/*.html
