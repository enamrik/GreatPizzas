#!/bin/bash

echo "Change to iOS project directory..."
cd mobile/ios

output_dir=$(echo "$PWD")
artifacts_dir="${output_dir}/artifacts"
archive_file="${artifacts_dir}/GreatPizzas.xcarchive"
ipa_file="${artifacts_dir}/GreatPizzas.ipa"
dsym_file="${artifacts_dir}/GreatPizzas.app.dSYM"
dsym_zip_file="${artifacts_dir}/GreatPizzas.app.dSYM.zip"

echo "Deleting and recreating artifacts directory..."
if [ -d  $artifacts_dir ]; then
  echo "Removing directory...${artifacts_dir}"
  rm -fr $artifacts_dir
fi
mkdir $artifacts_dir

echo "Building and Unit Testing..."
set -o pipefail && xcodebuild \
  -workspace "GreatPizzas.xcworkspace" \
  -sdk iphonesimulator9.0 \
  -configuration Release \
  -destination "platform=iOS Simulator,name=iPhone 6,OS=9.0" \
  -scheme "GreatPizzas" clean test \
  CONFIGURATION_BUILD_DIR=$artifacts_dir \
  | xcpretty -c 

echo "Creating Xcode archive..."
set -o pipefail && xcodebuild \
  -workspace "GreatPizzas.xcworkspace" \
  -sdk iphoneos9.0 \
  -scheme "GreatPizzas" archive \
  -configuration Release \
  -archivePath $archive_file \
  | xcpretty -c 


echo "Creating IPA package..."
set -o pipefail && xcodebuild -exportArchive \
  -exportFormat IPA \
  -exportProvisioningProfile "iOSTeam Provisioning Profile: *" \
  -archivePath $archive_file \
  -exportPath $ipa_file \
  | xcpretty -c 

echo "Zip up Xcode debug symbols..."
zip --recurse-paths --quiet "${dsym_zip_file}" "${dsym_file}"

echo "Upload Xcode archive to HockeyApp..."
curl \
  -F "status=2" \
  -F "notify=1" \
  -F "notes=Some new features and fixed bugs." \
  -F "notes_type=0" \
  -F "ipa=@${ipa_file}" \
  -F "dsym=@${dsym_zip_file}" \
  -H "X-HockeyAppToken: e00aae10df2b4c7f8cc2bbe68861e1f6" \
  https://rink.hockeyapp.net/api/2/apps/66a3f92c923249b50d538579b9536d3d/app_versions/upload

