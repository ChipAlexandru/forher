#!/bin/bash
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
cd "$(dirname "$0")/.."
exec /usr/local/bin/node node_modules/vite/bin/vite.js
