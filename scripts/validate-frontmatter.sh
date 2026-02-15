#!/usr/bin/env bash

# Validate YAML frontmatter in SKILL.md files

set -e

echo "🔍 Validating YAML frontmatter..."

ERRORS=0

# Find all SKILL.md files
while IFS= read -r -d '' skill_file; do
    echo "Checking: $skill_file"

    # Extract frontmatter (between first two --- lines)
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$skill_file" | sed '1d;$d')

    if [ -z "$frontmatter" ]; then
        echo "  ❌ ERROR: No YAML frontmatter found"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check for required 'name' field
    if ! echo "$frontmatter" | grep -q '^name:'; then
        echo "  ❌ ERROR: Missing required field 'name' in frontmatter"
        ERRORS=$((ERRORS + 1))
    fi

    # Check for required 'description' field
    if ! echo "$frontmatter" | grep -q '^description:'; then
        echo "  ❌ ERROR: Missing required field 'description' in frontmatter"
        ERRORS=$((ERRORS + 1))
    fi

    # Extract name value
    name=$(echo "$frontmatter" | grep '^name:' | sed 's/^name:[[:space:]]*//' | tr -d '"' | tr -d "'")
    if [ -z "$name" ]; then
        echo "  ❌ ERROR: Field 'name' is empty"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✓ Name: $name"
    fi

    # Extract description value
    description=$(echo "$frontmatter" | grep '^description:' | sed 's/^description:[[:space:]]*//' | tr -d '"' | tr -d "'")
    if [ -z "$description" ]; then
        echo "  ❌ ERROR: Field 'description' is empty"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✓ Description found"
    fi

    # Basic YAML syntax check - ensure no tabs (YAML doesn't allow tabs)
    if echo "$frontmatter" | grep -q $'\t'; then
        echo "  ❌ ERROR: YAML frontmatter contains tabs (use spaces instead)"
        ERRORS=$((ERRORS + 1))
    fi

done < <(find skills -name "SKILL.md" -type f -print0)

if [ $ERRORS -eq 0 ]; then
    echo "✅ All frontmatter validation checks passed"
    exit 0
else
    echo "❌ Found $ERRORS frontmatter validation error(s)"
    exit 1
fi
