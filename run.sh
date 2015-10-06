#!/bin/bash
set -e

# TODO these will be passed in from CI
api_domain="http://www.codequest.net:8085"

root_dir=$(echo "$PWD")
react_dir="${root_dir}/mobile"
xcode_proj_dir="${root_dir}/mobile/ios"
ios_artifacts_dir="${root_dir}/ios_artifacts"
android_artifacts_dir="${root_dir}/android_artifacts"
archive_file="${ios_artifacts_dir}/GreatPizzas.xcarchive"
ipa_file="${ios_artifacts_dir}/GreatPizzas.ipa"
app_file="${ios_artifacts_dir}/GreatPizzas.app"
dsym_file="${ios_artifacts_dir}/GreatPizzas.app.dSYM"
dsym_zip_file="${ios_artifacts_dir}/GreatPizzas.app.dSYM.zip"

function header() {
echo ""
echo "$1"
echo "==========================================="
}

function step() {
echo ""
echo "$1"
echo ""
}

function run_xcodebuild() {
  xcodebuild "${@}" | egrep '^(/.+:[0-9+:[0-9]+:.(error):|fatal|===)'
  # xcodebuild "${@}" | egrep '^(/.+:[0-9+:[0-9]+:.(error|warning):|fatal|===)'
}

function clean_dir() {
  local directory=$1
  header "Deleting and recreating artifacts directory..."
  if [ -d  $directory ]; then
    echo "Removing directory...${directory}"
    rm -fr $directory
  fi
  echo "Creating directory...${directory}"
  mkdir $directory
}

function clean_ios() {
  clean_dir $ios_artifacts_dir
}

function clean_android() {
  clean_dir $android_artifacts_dir
}

function test_js_action() {
  cd $react_dir
  header "Running Jest unit tests for React Native..."
  gulp test
}

function test_android_action() {
  header "Running Unit Tests for Android..."
  # TODO - run unit tests for any native android code
}

function bundle_js_for_android() {
  header "Bundling JS for Android..."
  # TODO - run react-native bundle for android
}

function build_android_publishables() {
  header "Building Android APK..."
  # TODO - build android release package 
}

function publish_android_action() {
  header "Uploading Android APK..."
  # TODO - upload APK to hockey app
}

function test_ios_action() {
  cd $xcode_proj_dir

  header "Building and running Unit Test for any native iOS code..."
  run_xcodebuild \
    -workspace "GreatPizzas.xcworkspace" \
    -sdk iphonesimulator9.0 \
    -configuration Debug \
    -destination "platform=iOS Simulator,name=iPhone 6,OS=9.0" \
    -scheme "GreatPizzas" clean test \
    CONFIGURATION_BUILD_DIR=$ios_artifacts_dir
}

function bundle_js_for_ios() {
  cd $react_dir

  header "Preparing app settings for iOS..."
  gulp prepare-settings --api-domain $api_domain

  header "Bundling JS for iOS..."
  react-native bundle
}

function build_ios_publishables() {
  cd $xcode_proj_dir

  header "Creating IPA and debug symbols for publishing iOS app..."

  step "Creating Xcode archive..."
  run_xcodebuild \
    -workspace "GreatPizzas.xcworkspace" \
    -sdk iphoneos9.0 \
    -scheme "GreatPizzas" archive \
    -configuration Release \
    -archivePath $archive_file

  step "Creating IPA package from Xcode archive..."
  xcodebuild \
    -exportArchive \
    -exportFormat IPA \
    -exportProvisioningProfile "iOSTeam Provisioning Profile: *" \
    -archivePath $archive_file \
    -exportPath $ipa_file

  step "Zip up Xcode debug symbols for native iOS app..."
  zip --recurse-paths --quiet "${dsym_zip_file}" "${dsym_file}"
}

function publish_ios_action() {
  header "Upload IPA to HockeyApp..."
  curl \
    -F "status=2" \
    -F "notify=1" \
    -F "notes=Some new features and fixed bugs." \
    -F "notes_type=0" \
    -F "ipa=@${ipa_file}" \
    -F "dsym=@${dsym_zip_file}" \
    -H "X-HockeyAppToken: e00aae10df2b4c7f8cc2bbe68861e1f6" \
    https://rink.hockeyapp.net/api/2/apps/66a3f92c923249b50d538579b9536d3d/app_versions/upload
}

function publish_action() {
  clean_ios
  clean_android

  test_js_action

  test_ios_action
  test_android_action

  bundle_js_for_android
  bundle_js_for_ios

  build_ios_publishables
  build_android_publishables

  publish_ios_action
  publish_android_action
}

action_name=$1
eval "${action_name}_action"
