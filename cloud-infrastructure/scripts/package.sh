#!/bin/bash
set -xe

echo "Executing package.sh..."

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)

WORK_DIR=$(cd $(dirname "$SCRIPT_DIR") && pwd)

[[ -d dist ]] && rm -r dist

mkdir -p dist/$LAMBDA_TO_PACKAGE && cd dist/$LAMBDA_TO_PACKAGE

cp -r $WORK_DIR/lambdas/$LAMBDA_TO_PACKAGE/* .

REQUIREMENTS_FILE=requirements.txt

if [[ -z "$RUNTIME" ]]; then
  echo "RUNTIME variable not set, defaulting to $(python --version)"
  pip=pip
else
  echo "RUNTIME set to '$RUNTIME'"
  pip="$RUNTIME -m pip"
fi

if [[ -f "$REQUIREMENTS_FILE" ]]; then
  echo "Installing dependencies..."
  echo "From: requirement.txt file exists..."
  $pip install -r "$REQUIREMENTS_FILE" -t . --no-compile

  echo "Removing libraries already on AWS lambda by default..."
  rm -rf ./boto3*
  rm -rf ./botocore*
else
  echo "Error: requirement.txt does not exist!"
fi

echo "Removing unnecessary files for deterministic builds..."
find . -type d -name '__pycache__' -exec rm -rf {} +

echo "Done!"
