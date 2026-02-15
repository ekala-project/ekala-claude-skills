# Skill Quality Guidelines

This document outlines quality standards and best practices for Claude Code skills in the marketplace.

## Core Principles

Great skills are:

1. **Useful** - Solve real problems
2. **Clear** - Easy to understand and use
3. **Reliable** - Work consistently as documented
4. **Maintainable** - Easy to update and improve
5. **Safe** - No security risks or malicious code

## Skill Content Quality

### SKILL.md Best Practices

#### Structure

A well-structured SKILL.md includes:

```markdown
---
name: skill-name
description: Clear, concise description
---

[Role definition]

## When to activate
[Activation criteria]

## Core responsibilities
[Primary tasks]

## [Domain-specific sections]
[Relevant guidance]

## Best practices
[Key recommendations]

## Examples
[Real-world examples]

## Troubleshooting
[Common issues and solutions]
```

#### Role Definition

✅ **Good:**
```markdown
You are a Python testing specialist. Your role is to help users write, run, and debug Python tests using pytest and unittest.
```

❌ **Bad:**
```markdown
You help with testing.
```

**Why?** Be specific about expertise and scope.

#### Activation Criteria

✅ **Good:**
```markdown
## When to activate

Activate when the user:
- Mentions pytest, unittest, or Python testing
- References test files (test_*.py, *_test.py)
- Asks about writing or debugging tests
- Has test failures or errors
- Requests help with test coverage or mocking
```

❌ **Bad:**
```markdown
## When to activate

When someone needs testing help.
```

**Why?** Clear, specific criteria help users understand when to use the skill.

#### Core Responsibilities

✅ **Good:**
```markdown
## Core responsibilities

1. **Write test cases**
   - Generate pytest test functions
   - Create unittest.TestCase classes
   - Set up fixtures and parametrization
   - Use appropriate assertions

2. **Debug test failures**
   - Analyze test output and error messages
   - Identify root causes of failures
   - Suggest fixes for common testing issues
   - Explain assertion failures
```

❌ **Bad:**
```markdown
## Core responsibilities

1. Help with tests
2. Fix problems
```

**Why?** Detailed responsibilities guide the skill's behavior.

#### Examples

✅ **Good:**
```markdown
## Examples

\```python
# Test with parametrization
import pytest

@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 3),
    (3, 4),
])
def test_increment(input, expected):
    assert increment(input) == expected
\```

\```bash
# Run tests with coverage
pytest --cov=mymodule --cov-report=html
\```
```

❌ **Bad:**
```markdown
## Examples

You can write tests.
```

**Why?** Real, runnable examples are more helpful.

### Documentation Quality

#### README.md Standards

Must include:

- **Title and Introduction**: What is this skill?
- **Overview**: What can it do?
- **When to Use**: Activation scenarios
- **Features**: Key capabilities
- **Examples**: Usage examples
- **Requirements**: Dependencies and platforms
- **Installation**: How to install
- **License**: License information

✅ **Good README:**
- Multiple sections with clear headers
- Code examples with syntax highlighting
- Installation instructions
- Requirements clearly listed
- Links to related resources

❌ **Poor README:**
- Single paragraph
- No examples
- Missing installation steps
- No structure

#### CHANGELOG.md Standards

Follow [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [1.1.0] - 2026-03-15

### Added
- New feature for automatic test generation
- Support for async test functions

### Changed
- Improved error message parsing
- Updated documentation

### Fixed
- Bug in fixture setup
- Incorrect assertion suggestions

### Deprecated
- Old syntax (will be removed in 2.0.0)
```

Version categories:
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes

## Metadata Quality

### Required Fields

All required fields in `metadata.json` must be:
- **Accurate**: Reflect actual capabilities
- **Complete**: All required fields filled
- **Valid**: Pass schema validation

### Description Guidelines

✅ **Good Descriptions:**
- "Assists with building Nix packages using nix-build and related Nix commands"
- "Helps write, run, and debug Python tests using pytest and unittest"
- "Provides guidance for deploying Docker containers to production environments"

❌ **Bad Descriptions:**
- "Helps with stuff" (too vague)
- "The best skill ever for anything programming" (too broad)
- "nix build" (too short, not descriptive)

Length: 50-200 characters

### Tag Selection

Choose 3-10 relevant tags:

✅ **Good Tags:**
```json
"tags": ["python", "testing", "pytest", "unittest", "debugging", "coverage"]
```

❌ **Bad Tags:**
```json
"tags": ["stuff", "things", "code", "programming", "computer", "awesome", "best", "cool", "great", "amazing"]
```

Tags should be:
- Lowercase
- Technology-specific
- Searchable keywords
- Relevant to the skill's functionality

### Category Selection

Choose 1-3 appropriate categories. Primary category should be the best fit.

Examples:
- `nix-build` → `["development", "devops"]`
- `python-testing` → `["development"]`
- `data-visualization` → `["data-science"]`

## Code Quality

### Security

❌ **Never include:**
- Hardcoded passwords or API keys
- Private keys or certificates
- Secrets or tokens
- Malicious code
- Code execution vulnerabilities
- Destructive commands without safeguards

✅ **Always:**
- Use placeholders for sensitive data
- Warn about security implications
- Follow principle of least privilege
- Sanitize user input in examples

### Accuracy

Commands and examples must:
- ✅ Actually work
- ✅ Be tested
- ✅ Be up-to-date
- ✅ Follow best practices
- ✅ Include error handling

### Completeness

Don't leave users hanging:

✅ **Good:**
```markdown
When builds fail:
1. Read the full build log
2. Identify the error type
3. Check common causes
4. Verify dependencies
5. Try these specific solutions
```

❌ **Bad:**
```markdown
When builds fail, debug them.
```

## Testing Requirements

### Manual Testing

Before submission, test that:
- [ ] Skill activates appropriately
- [ ] Guidance is helpful and accurate
- [ ] Examples work as shown
- [ ] Commands execute successfully
- [ ] Documentation is clear
- [ ] No errors or warnings in validation

### Recommended Testing

For higher quality:
- [ ] Test on multiple platforms (if applicable)
- [ ] Test with different versions of tools
- [ ] Get feedback from others
- [ ] Try edge cases
- [ ] Verify troubleshooting steps

## Maintenance Standards

### Version Management

Use [Semantic Versioning](https://semver.org/):

- **MAJOR** (2.0.0): Breaking changes, new activation criteria
- **MINOR** (1.1.0): New features, backward compatible
- **PATCH** (1.0.1): Bug fixes, documentation updates

Update `version` in `metadata.json` and document in `CHANGELOG.md`.

### Keeping Skills Current

Good maintenance includes:
- Responding to issues within 2 weeks
- Updating for new tool versions
- Fixing reported bugs
- Improving documentation based on feedback
- Regular quality improvements

## Quality Scoring

Skills are automatically scored (0-100):

| Score | Badge | Description |
|-------|-------|-------------|
| 90-100 | 🥇 Gold | Excellent |
| 75-89 | 🥈 Silver | Good |
| 60-74 | 🥉 Bronze | Acceptable |
| <60 | ⚪ None | Needs Improvement |

Scoring factors:
- Has README (+10)
- Has CHANGELOG (+5)
- Has examples (+15)
- Has tests (+20)
- Good documentation (+15)
- Recently updated (+10)
- High community rating (+25)

## Review Checklist

Before submitting, verify:

- [ ] SKILL.md has clear role and responsibilities
- [ ] "When to activate" section is specific
- [ ] Includes multiple real examples
- [ ] README is comprehensive
- [ ] CHANGELOG follows format
- [ ] metadata.json is valid and complete
- [ ] Description is 50-200 characters
- [ ] Tags are relevant and specific
- [ ] No security issues
- [ ] Tested and working
- [ ] No duplicate of existing skill
- [ ] License is compatible

## Common Mistakes to Avoid

1. **Too broad**: "Helps with programming" → Be specific!
2. **Too vague**: Unclear activation criteria
3. **No examples**: Users need to see it in action
4. **Outdated**: Commands that don't work anymore
5. **Copy-paste**: Duplicating existing skills
6. **Missing docs**: Incomplete README or CHANGELOG
7. **Security risks**: Hardcoded secrets or unsafe commands
8. **Broken examples**: Code that doesn't run
9. **Wrong category**: Misclassified skills
10. **Unmaintained**: No response to issues

## Examples of High-Quality Skills

See these skills for reference:
- `skills/development/nix-build/` - Comprehensive build assistance
- `skills/development/nix-eval/` - Clear evaluation guidance
- `skills/development/ekala-cmake-nix/` - Detailed attribute documentation

## Getting Help

Questions about quality standards?

- 📖 Read [Contributing Guide](./CONTRIBUTING.md)
- 📘 Check [Submission Guide](./SUBMISSION_GUIDE.md)
- 💬 Ask in [Discussions](https://github.com/ekala/ekala-claude-skills/discussions)

---

Remember: Quality over quantity! One great skill is better than ten mediocre ones.
