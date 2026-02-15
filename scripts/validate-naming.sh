#!/usr/bin/env bash

# Validate skill naming conventions

set -e

echo "🔍 Validating skill naming conventions..."

ERRORS=0

# Function to check if a string is in kebab-case
is_kebab_case() {
    local str="$1"
    # Kebab-case: lowercase letters, numbers, and hyphens only
    # Must not start or end with hyphen
    if [[ "$str" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
        return 0
    else
        return 1
    fi
}

# Find all skill directories
while IFS= read -r -d '' skill_file; do
    skill_dir=$(dirname "$skill_file")
    dir_name=$(basename "$skill_dir")

    echo "Checking: $skill_dir"

    # Check if directory name is kebab-case
    if ! is_kebab_case "$dir_name"; then
        echo "  ❌ ERROR: Directory name '$dir_name' is not in kebab-case"
        echo "     Expected: lowercase letters, numbers, and hyphens only (e.g., 'my-skill-name')"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✓ Directory name is kebab-case"
    fi

    # Extract frontmatter name field
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$skill_file" | sed '1d;$d')
    frontmatter_name=$(echo "$frontmatter" | grep '^name:' | sed 's/^name:[[:space:]]*//' | tr -d '"' | tr -d "'")

    if [ -z "$frontmatter_name" ]; then
        echo "  ❌ ERROR: Could not extract 'name' from frontmatter"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check if frontmatter name is kebab-case
    if ! is_kebab_case "$frontmatter_name"; then
        echo "  ❌ ERROR: Frontmatter name '$frontmatter_name' is not in kebab-case"
        ERRORS=$((ERRORS + 1))
    fi

    # Check if directory name matches frontmatter name
    if [ "$dir_name" != "$frontmatter_name" ]; then
        echo "  ❌ ERROR: Directory name '$dir_name' does not match frontmatter name '$frontmatter_name'"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✓ Directory name matches frontmatter name: $frontmatter_name"
    fi

done < <(find skills -name "SKILL.md" -type f -print0)

if [ $ERRORS -eq 0 ]; then
    echo "✅ All naming convention checks passed"
    exit 0
else
    echo "❌ Found $ERRORS naming convention error(s)"
    exit 1
fi
