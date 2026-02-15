#!/usr/bin/env bash

# Validate documentation completeness in SKILL.md files

set -e

echo "🔍 Validating documentation completeness..."

ERRORS=0

# Minimum requirements
MIN_CONTENT_LINES=20
MIN_HEADINGS=2

# Find all SKILL.md files
while IFS= read -r -d '' skill_file; do
    skill_name=$(basename "$(dirname "$skill_file")")
    echo "Checking: $skill_file"

    # Extract content (everything after frontmatter)
    content=$(awk '/^---$/{c++; next} c>=2' "$skill_file")

    if [ -z "$content" ]; then
        echo "  ❌ ERROR: No content found after frontmatter"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Count non-empty content lines
    content_lines=$(echo "$content" | grep -v '^[[:space:]]*$' | wc -l)
    if [ "$content_lines" -lt "$MIN_CONTENT_LINES" ]; then
        echo "  ❌ ERROR: Insufficient content ($content_lines lines, minimum $MIN_CONTENT_LINES)"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✓ Sufficient content: $content_lines lines"
    fi

    # Count markdown headings (##)
    heading_count=$(echo "$content" | grep -c '^##' || true)
    if [ "$heading_count" -lt "$MIN_HEADINGS" ]; then
        echo "  ❌ ERROR: Insufficient section headings ($heading_count found, minimum $MIN_HEADINGS)"
        ERRORS=$((ERRORS + 1))
    else
        echo "  ✓ Has $heading_count section headings"
    fi

    # Check for code examples (code blocks with ```)
    has_code_blocks=$(echo "$content" | grep -c '^```' || true)
    if [ "$has_code_blocks" -eq 0 ]; then
        echo "  ⚠️  WARNING: No code examples found (recommended to include usage examples)"
    else
        echo "  ✓ Contains code examples"
    fi

    # Check description in frontmatter is not a placeholder
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$skill_file" | sed '1d;$d')
    description=$(echo "$frontmatter" | grep '^description:' | sed 's/^description:[[:space:]]*//' | tr -d '"' | tr -d "'")

    if [ -n "$description" ]; then
        desc_length=${#description}
        if [ "$desc_length" -lt 20 ]; then
            echo "  ⚠️  WARNING: Description is very short ($desc_length characters)"
        fi

        # Check for placeholder text
        if echo "$description" | grep -iq "TODO\|FIXME\|placeholder\|TBD"; then
            echo "  ❌ ERROR: Description appears to be a placeholder: $description"
            ERRORS=$((ERRORS + 1))
        fi
    fi

    # Check for recommended sections (not required, but good to have)
    recommended_sections=(
        "responsibilities"
        "example\|usage\|pattern"
        "best practice\|guideline"
    )

    for section_pattern in "${recommended_sections[@]}"; do
        if ! echo "$content" | grep -iq "$section_pattern"; then
            echo "  ℹ️  INFO: Consider adding a section about: $section_pattern"
        fi
    done

done < <(find skills -name "SKILL.md" -type f -print0)

if [ $ERRORS -eq 0 ]; then
    echo "✅ All documentation completeness checks passed"
    exit 0
else
    echo "❌ Found $ERRORS documentation completeness error(s)"
    exit 1
fi
