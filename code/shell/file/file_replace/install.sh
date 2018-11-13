#!/bin/bash

# # Path
resourcePath="resource"
infinityPath="/opt/infinity/www/"

# # Get Files
# host/js/common/common.js
# host/js/pages/auditlogs.js
# website/app/controller/auditlogs.controller.php
# website/app/model/optlogs.model.php
# webtemplate/auditlogs.htm

function getSourceFile() {
  local basePath=$1
  local path=$2
  if [ -d $basePath/$path ]; then
    for onePath in `ls $basePath/$path -A`; do
      getSourceFile "$basePath/$path" $onePath
    done
  elif [ -f $basePath/$path ]; then
    replacePath=$(ls $basePath/$path | awk -F $resourcePath/ '{print $2}')
    replaceFile  $resourcePath/$replacePath "$infinityPath$replacePath" $path  # targetPath infinityPath fileName
  fi
}

# # Replace  Files
function replaceFile() {
  local fileName=$3
  local targetPath=`ls $2 | awk -F $fileName '{ print $1 }'`
  local newPath=`ls $1 | awk -F $fileName '{ print $1 }'`
  echo "Update File: $targetPath$fileName"
  # echo $newPath $targetPath $fileName

  mv "$targetPath"$fileName $targetPath"$fileName-bak" -f
  mv "$newPath"$fileName $targetPath -f
}

# # checkPath
getSourceFile `pwd $resourcePath` $resourcePath
