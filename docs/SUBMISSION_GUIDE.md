# Skill Submission Guide

This guide walks you through submitting a new skill to the Claude Code Skills Marketplace.

## Before You Start

Ask yourself:
- ✅ Does this skill solve a real problem?
- ✅ Is there a similar skill already in the marketplace?
- ✅ Will others find this useful?
- ✅ Can I maintain this skill over time?

If you answered yes, let's proceed!

## Step 1: Plan Your Skill

### Choose a Category

Select the most appropriate category:
- `development` - Software development tools
- `data-science` - Data analysis, ML, statistics
- `devops` - Operations, deployment, infrastructure
- `writing` - Content creation, documentation
- `research` - Academic, scientific research
- `design` - UI/UX, graphics, multimedia
- `productivity` - General productivity tools
- `education` - Learning, teaching resources
- `other` - Miscellaneous

### Choose a Name

- Use lowercase with hyphens: `my-skill-name`
- Be descriptive but concise: `nix-build`, not `nb`
- Avoid special characters
- Check it doesn't already exist

### Define the Scope

- What specific task does it help with?
- When should it activate?
- What are its core responsibilities?

## Step 2: Create the Skill Files

### Directory Structure

Create your skill directory:

```bash
mkdir -p skills/{category}/{skill-name}
cd skills/{category}/{skill-name}
```

### SKILL.md (Required)

This is the actual skill definition that Claude Code will use.

**Template:**

```markdown
---
name: skill-name
description: A concise description of what the skill does (50-200 chars)
---

You are a [type] specialist. Your role is to help users [primary purpose].

## When to activate

Activate when the user:
- Mentions [specific keywords or patterns]
- Works with [specific file types or tools]
- Asks about [specific topics]
- References [specific commands or technologies]

## Core responsibilities

1. **Primary responsibility**
   - Specific task or action
   - How to approach it
   - Tools or commands to use

2. **Secondary responsibility**
   - Additional tasks
   - Related guidance

3. **Additional responsibilities**
   - More details as needed

## Guidelines

When helping users:
- Explain [key concepts]
- Demonstrate [best practices]
- Warn about [common pitfalls]
- Suggest [optimizations]

## Common patterns

\```bash
# Example command 1
command --flag value

# Example command 2
another-command input
\```

## Best practices

- Practice 1: Details
- Practice 2: More details
- Practice 3: Even more details

## Troubleshooting

When [problem] occurs:
1. Check [potential cause 1]
2. Verify [potential cause 2]
3. Try [solution]

## Examples

\```bash
# Real-world example 1
example-command --option value
# Output: expected result

# Real-world example 2
complex | piped | command
# Output: expected result
\```

Remember to [key advice for users].
```

### metadata.json (Required)

Create metadata file:

**Template:**

```json
{
  "$schema": "../../../schemas/skill-metadata.schema.json",
  "id": "category/skill-name",
  "name": "skill-name",
  "displayName": "Skill Display Name",
  "description": "Short description matching SKILL.md (50-200 chars)",
  "longDescription": "More detailed description of capabilities",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "github": "your-github-username",
    "email": "your@email.com",
    "url": "https://your-website.com"
  },
  "contributors": [],
  "maintainers": ["your-github-username"],
  "license": "MIT",
  "categories": ["primary-category", "secondary-category"],
  "tags": ["tag1", "tag2", "tag3"],
  "keywords": ["search", "keywords"],
  "compatibility": {
    "claudeCode": ">=1.0.0",
    "platforms": ["linux", "macos"],
    "requiredTools": ["tool1", "tool2"],
    "optionalTools": ["optional-tool"]
  },
  "quality": {
    "verified": false,
    "communityRating": 0,
    "totalRatings": 0,
    "downloads": 0,
    "lastUpdated": "2026-02-12T20:00:00Z",
    "createdAt": "2026-02-12T20:00:00Z"
  },
  "documentation": {
    "readme": "README.md",
    "changelog": "CHANGELOG.md",
    "examples": [],
    "externalLinks": {
      "repository": "https://github.com/ekala/ekala-claude-skills",
      "issues": "https://github.com/ekala/ekala-claude-skills/issues"
    }
  },
  "testing": {
    "hasTests": false,
    "testStatus": "unknown"
  },
  "security": {
    "hasSecurityPolicy": false,
    "knownVulnerabilities": []
  },
  "dependencies": {
    "skills": [],
    "plugins": []
  },
  "relatedSkills": [],
  "status": "stable",
  "deprecated": false
}
```

### README.md (Required)

User-facing documentation.

**Template:**

```markdown
# Skill Display Name

Brief introduction to what the skill does.

## Overview

Detailed explanation of the skill's purpose and capabilities.

## When to Use

The skill activates when you:
- Scenario 1
- Scenario 2
- Scenario 3

## Features

### Feature 1
Description

### Feature 2
Description

## Examples

\```bash
# Example 1
command example

# Example 2
another example
\```

## Requirements

- **Required**: tool1, tool2
- **Optional**: optional-tool
- **Platforms**: Linux, macOS

## Installation

### As part of ekala-claude-skills plugin

\```bash
claude-code plugins install /path/to/ekala-claude-skills
\```

### Standalone

\```bash
cp -r skills/category/skill-name /path/to/your/project/.claude/skills/
\```

## License

MIT
```

### CHANGELOG.md (Required)

Version history following [Keep a Changelog](https://keepachangelog.com/).

**Template:**

```markdown
# Changelog

All notable changes to the skill-name skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-12

### Added
- Initial release
- Core functionality
- Documentation
- Examples

### Features
- Feature 1
- Feature 2
```

## Step 3: Validate Locally

Before submitting, validate your skill:

```bash
# Validate schema and structure
npm run validate:schema

# Check quality score
npm run validate:quality

# Security scan
npm run validate:security

# Full validation
npm run validate
```

Fix any errors or warnings before proceeding.

## Step 4: Test Your Skill

1. Install the plugin locally:
   ```bash
   claude-code plugins install /path/to/ekala-claude-skills
   ```

2. Test the skill in various scenarios:
   - Does it activate when expected?
   - Does it provide helpful guidance?
   - Are the examples accurate?
   - Does it work on all listed platforms?

3. Get feedback from others if possible

## Step 5: Submit

### Option A: Pull Request (Recommended)

1. Fork the repository
2. Create a branch: `git checkout -b feature/add-{skill-name}`
3. Commit your skill: `git commit -m "feat: add {skill-name} skill"`
4. Push: `git push origin feature/add-{skill-name}`
5. Create a Pull Request using the template
6. Wait for automated checks
7. Address feedback from reviewers
8. Celebrate when merged! 🎉

### Option B: Issue Submission

1. Go to [Submit a Skill](https://github.com/ekala/ekala-claude-skills/issues/new/choose)
2. Fill out the form
3. A maintainer will create the PR for you

## Step 6: After Submission

### Review Process

1. **Automated checks** run (schema, quality, security)
2. **Maintainer review** (typically 3-7 days)
3. **Feedback** if changes are needed
4. **Approval** and merge
5. **Catalog update** (automatic)

### After Approval

Your skill will:
- Appear in the catalog
- Be available in the marketplace
- Show up in searches
- Be installable by users

## Maintaining Your Skill

After your skill is published:

- Monitor issues and questions
- Respond to user feedback
- Update documentation as needed
- Add new features or improvements
- Keep it compatible with new Claude Code versions

Update version number and CHANGELOG.md for each change.

## Getting Help

Need assistance?

- 📖 Read [Skill Guidelines](./SKILL_GUIDELINES.md)
- 💬 Ask in [Discussions](https://github.com/ekala/ekala-claude-skills/discussions)
- 🐛 Report problems in [Issues](https://github.com/ekala/ekala-claude-skills/issues)
- 📧 Contact maintainers

---

Good luck with your submission! We're excited to see what you create! 🚀
