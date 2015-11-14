#! /bin/sh
rm -rf build
mkdir build
mkdir build/js
uglifyjs --compress --mangle -o build/js/tt.js -- js/lib/*.js js/timetrack/*.js js/timetrack.js

cp -r css build/css
cp -r bg build/bg
cp datenschutz.html build/
cp impressum.html build/
cp favicon.ico build/

sed 's/<!-- JS -->/<script src="js\/tt.js"><\/script> <!--/g' index.html > build/index.html
