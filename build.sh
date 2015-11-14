#! /bin/sh
uglifyjs --compress --mangle -o js/tt.js -- js/lib/*.js js/timetrack/*.js js/timetrack.js
