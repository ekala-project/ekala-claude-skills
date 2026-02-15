# Contributing to Claude Code Skills Marketplace

Thank you for your interest in contributing to the Claude Code Skills Marketplace! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Skill Guidelines](#skill-guidelines)
- [Submission Process](#submission-process)
- [Development Workflow](#development-workflow)

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members
- No malicious, harmful, or spam content
- Proper attribution for derived work

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ekala-claude-skills.git
   cd ekala-claude-skills
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your contribution:
   ```bash
   git checkout -b feature/add-my-skill
   ```

## How to Contribute

There are several ways to contribute:

### 1. Submit a New Skill

Create a new skill to help Claude Code users with specific tasks. See [Skill Guidelines](#skill-guidelines) below.

### 2. Improve Existing Skills

Enhance existing skills with:
- Better documentation
- More examples
- Bug fixes
- Performance improvements

### 3. Improve Infrastructure

Help improve the marketplace itself:
- Enhance validation scripts
- Improve GitHub Actions workflows
- Better catalog generation
- Documentation improvements

### 4. Report Issues

Found a problem? [Create an issue](https://github.com/ekala/ekala-claude-skills/issues/new/choose) to let us know.

## Skill Guidelines

### Structure

Each skill must be in its own directory under `skills/{category}/` and contain:

```
skills/{category}/{skill-name}/
├── SKILL.md         # Required: Skill definition
├── metadata.json    # Required: Skill metadata
├── README.md        # Required: User documentation
├── CHANGELOG.md     # Required: Version history
├── examples/        # Optional: Usage examples
└── tests/           # Optional: Validation tests
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Short description of what the skill does
---

You are a [specialist type]. Your role is to help users...

## When to activate

Activate when the user:
- Mentions specific keywords
- Works with certain file types
- Asks about specific topics

## Core responsibilities

1. **Primary task**
   - Details about the task
   - How to approach it

2. **Secondary task**
   - More details

## Best practices

- Guideline 1
- Guideline 2

## Examples

\```bash
# Example command
example-command --flag
\```
```

### metadata.json Requirements

See `schemas/skill-metadata.schema.json` for the complete schema. Key fields:

```json
{
  "$schema": "../../../schemas/skill-metadata.schema.json",
  "id": "category/skill-name",
  "name": "skill-name",
  "displayName": "Skill Display Name",
  "description": "Short description (50-200 chars)",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "github": "your-username"
  },
  "license": "MIT",
  "categories": ["development"],
  "tags": ["tag1", "tag2"]
}
```

### Quality Standards

To be accepted, skills should:

- ✅ **Be useful**: Solve a real problem or need
- ✅ **Be clear**: Easy to understand and use
- ✅ **Be complete**: Include all required files
- ✅ **Be tested**: Actually works as documented
- ✅ **Be safe**: No malicious code or security issues
- ✅ **Be original**: Not duplicate existing skills
- ✅ **Be documented**: Clear README and examples

## Submission Process

### Via Pull Request (Recommended)

1. **Create your skill** in the appropriate category directory
2. **Validate locally**:
   ```bash
   npm run validate
   npm run validate:quality
   npm run validate:security
   ```
3. **Commit your changes**:
   ```bash
   git add skills/{category}/{skill-name}/
   git commit -m "feat: add {skill-name} skill"
   ```
4. **Push to your fork**:
   ```bash
   git push origin feature/add-my-skill
   ```
5. **Create a Pull Request** using the PR template
6. **Wait for automated checks** to complete
7. **Address review feedback** if needed
8. **Merge**: Once approved, your skill will be merged!

### Via Issue (For non-technical users)

1. Go to [Issues](https://github.com/ekala/ekala-claude-skills/issues/new/choose)
2. Select "Submit a Skill"
3. Fill out the form with your skill content
4. A maintainer will create a PR on your behalf

## Development Workflow

### Local Validation

Run these commands before submitting:

```bash
# Validate schema and structure
npm run validate:schema

# Check quality score
npm run validate:quality

# Security scan
npm run validate:security

# Full validation (runs all checks)
npm run validate
```

### Generate Catalog

To see how your skill appears in the catalog:

```bash
npm run generate:catalog
cat catalog/index.json | jq
```

### Testing Your Skill

1. Install the plugin locally:
   ```bash
   claude-code plugins install /path/to/ekala-claude-skills
   ```

2. Activate your skill in Claude Code and test it works

3. Try various scenarios to ensure it's robust

## Versioning

Skills use [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

Update `version` in `metadata.json` and document changes in `CHANGELOG.md`.

## Review Process

1. **Automated Checks**: GitHub Actions will validate your submission
2. **Quality Review**: Maintainers check quality and appropriateness
3. **Security Review**: Ensure no security issues or malicious content
4. **Feedback**: Maintainers may request changes
5. **Approval**: Once approved, your skill is merged and published!

Typical review time: 3-7 days

## Getting Help

- 📖 Read the [Skill Guidelines](./SKILL_GUIDELINES.md)
- 📘 Check the [Submission Guide](./SUBMISSION_GUIDE.md)
- 💬 Ask questions in [Discussions](https://github.com/ekala/ekala-claude-skills/discussions)
- 🐛 Report issues in [Issues](https://github.com/ekala/ekala-claude-skills/issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Claude Code Skills Marketplace! 🎉
