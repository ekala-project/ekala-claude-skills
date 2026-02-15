#!/usr/bin/env bash

# Validate markdown formatting using markdownlint

set -e

echo "🔍 Validating markdown formatting..."

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "⚠️  WARNING: Docker not found, skipping markdown linting"
    echo "   Install Docker to enable markdown linting locally"
    exit 0
fi

# Check if markdownlint config exists
if [ ! -f ".markdownlint.json" ]; then
    echo "⚠️  WARNING: .markdownlint.json not found, using default rules"
    CONFIG_ARG=""
else
    CONFIG_ARG="--config .markdownlint.json"
fi

# Run markdownlint in Docker container
# Using the official markdownlint-cli image
echo "Running markdownlint..."

# Find all markdown files in skills directory
markdown_files=$(find skills -name "*.md" -type f)

if [ -z "$markdown_files" ]; then
    echo "No markdown files found in skills directory"
    exit 0
fi

# Create a temporary file list
temp_file=$(mktemp)
echo "$markdown_files" > "$temp_file"

# Run markdownlint via Docker
# Mount the current directory as /workspace
# Use markdownlint-cli2 for better performance and flexibility
if docker run --rm \
    -v "$(pwd):/workspace:ro" \
    -v "$(pwd)/.markdownlint.json:/workspace/.markdownlint.json:ro" \
    -w /workspace \
    davidanson/markdownlint-cli2:latest \
    "skills/**/*.md"; then
    echo "✅ All markdown files are properly formatted"
    rm -f "$temp_file"
    exit 0
else
    echo "❌ Markdown formatting issues found"
    echo "   Run 'docker run --rm -v \"\$(pwd):/workspace\" -w /workspace davidanson/markdownlint-cli2:latest \"skills/**/*.md\" --fix' to auto-fix"
    rm -f "$temp_file"
    exit 1
fi
