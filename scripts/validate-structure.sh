#!/usr/bin/env bash

# Validate skill directory structure

set -e

echo "🔍 Validating skill directory structure..."

ERRORS=0

# Check if skills directory exists
if [ ! -d "skills" ]; then
    echo "❌ ERROR: 'skills' directory not found"
    exit 1
fi

# Check each subdirectory in skills/
for skill_dir in skills/*/; do
    # Remove trailing slash
    skill_dir=${skill_dir%/}
    skill_name=$(basename "$skill_dir")

    echo "Checking: $skill_dir"

    # Count SKILL.md files in this directory
    skill_md_count=$(find "$skill_dir" -maxdepth 1 -name "SKILL.md" -type f | wc -l)

    if [ "$skill_md_count" -eq 0 ]; then
        echo "  ❌ ERROR: No SKILL.md file found in $skill_dir"
        ERRORS=$((ERRORS + 1))
    elif [ "$skill_md_count" -gt 1 ]; then
        echo "  ❌ ERROR: Multiple SKILL.md files found in $skill_dir"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✓ Contains exactly one SKILL.md file"
    fi

    # Check for any unexpected files (allow only SKILL.md and common files like README)
    unexpected_files=$(find "$skill_dir" -maxdepth 1 -type f ! -name "SKILL.md" ! -name "README.md" ! -name ".gitkeep")
    if [ -n "$unexpected_files" ]; then
        echo "  ⚠️  WARNING: Unexpected files found in $skill_dir:"
        echo "$unexpected_files" | sed 's/^/      /'
    fi

    # Check for subdirectories (skills should be flat)
    subdirs=$(find "$skill_dir" -mindepth 1 -maxdepth 1 -type d)
    if [ -n "$subdirs" ]; then
        echo "  ⚠️  WARNING: Subdirectories found in $skill_dir (expected flat structure):"
        echo "$subdirs" | sed 's/^/      /'
    fi
done

# Check for any SKILL.md files outside of skills/ directory
orphaned_skills=$(find . -name "SKILL.md" -type f ! -path "./skills/*/*" ! -path "./node_modules/*")
if [ -n "$orphaned_skills" ]; then
    echo "❌ ERROR: SKILL.md files found outside of skills/ directory:"
    echo "$orphaned_skills" | sed 's/^/    /'
    ERRORS=$((ERRORS + 1))
fi

# Verify at least one skill exists
skill_count=$(find skills -mindepth 1 -maxdepth 1 -type d | wc -l)
if [ "$skill_count" -eq 0 ]; then
    echo "❌ ERROR: No skills found in skills/ directory"
    ERRORS=$((ERRORS + 1))
else
    echo "✓ Found $skill_count skill(s)"
fi

if [ $ERRORS -eq 0 ]; then
    echo "✅ All structure validation checks passed"
    exit 0
else
    echo "❌ Found $ERRORS structure validation error(s)"
    exit 1
fi
