#!/usr/bin/env bash

set -euo pipefail

# WARN: This script is not intended for public use!

original_branch="$(git branch --show-current)"
blog_build_dir="$(mktemp -d)"

cleanup() {
  rm -rf "$blog_build_dir"

  if [ -n "$original_branch" ] && [ "$(git branch --show-current)" != "$original_branch" ]; then
    git checkout "$original_branch" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT

if [ "$original_branch" != "main" ]; then
  echo "ERROR: Run this script from main." >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "ERROR: Commit or stash local changes before deploying." >&2
  exit 1
fi

echo "Building and publishing app..."
npm run deploy

echo "Building blog..."
hugo --source external/Braavos_Blog --destination "$blog_build_dir"

if ! find "$blog_build_dir" -name "*.html" -print -quit | grep -q .; then
  echo "ERROR: Hugo produced no HTML files." >&2
  exit 1
fi

echo "Publishing blog..."
git checkout gh-pages
git pull --ff-only origin gh-pages

rm -rf blog
mkdir blog
cp -R "$blog_build_dir"/. blog/

git add blog

if git diff --cached --quiet -- blog; then
  echo "Blog output is unchanged."
else
  git commit -s -m "blog: Static files."
  git push origin gh-pages
fi

git checkout main
