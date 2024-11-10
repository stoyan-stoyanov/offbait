# Clean previous builds
rm -rf build
mkdir -p build/chrome build/firefox

# Copy shared files to Chrome build
mkdir -p build/chrome/src
cp -r src/* build/chrome/src/
rm build/chrome/src/background.js
cp options.html build/chrome/options.html

# cp -r src/* build/firefox/
cp -r icons build/chrome/
# cp -r icons build/firefox/

# Copy respective manifest files
cp manifest.chrome.json build/chrome/manifest.json
# cp manifest.firefox.json build/firefox/manifest.json

# Create zip files
# The '../' makes it save to build/ instead of build/chrome/
cd build/chrome && zip -r ../chrome-extension.zip ./* && cd ../..
# cd build/firefox && zip -r ../firefox-extension.zip ./* && cd ../..

# Clean up everything except zip files
# rm -rf build/chrome/* build/firefox/*