# Nix Eval Assistant

A Claude Code skill that assists with evaluating Nix expressions, inspecting derivations, and understanding Nix language semantics.

## Overview

This skill provides expert guidance for:
- Evaluating Nix expressions and derivations
- Inspecting derivation contents
- Querying and exploring Nix attributes
- Debugging evaluation issues
- Understanding Nix language semantics

## When to Use

The skill activates when you:
- Mention evaluating Nix expressions or derivations
- Reference nix-instantiate, nix eval, or similar evaluation commands
- Want to inspect or debug Nix expression evaluation
- Ask about Nix language semantics or expression results
- Need to query Nix attributes or examine derivation details
- Work with Nix expressions in .nix files

## Features

### Evaluation Commands
- Traditional nix-instantiate for any .nix file
- Modern nix eval for flake-based projects
- Appropriate flag usage (--eval, --strict, --json, --show-trace)
- Support for attribute paths and direct expressions

### Derivation Inspection
- Get derivation paths with nix-instantiate
- Inspect derivation contents with nix derivation show
- Parse and explain derivation JSON output
- Examine build inputs, outputs, and environment variables

### Attribute Querying
- Evaluate specific attribute paths
- List available attributes
- Navigate nested attribute sets
- Pretty-print complex data structures

### Evaluation Debugging
- Stack traces with --show-trace
- Identify infinite recursion and evaluation errors
- Explain type errors and attribute access issues
- Debug lazy evaluation behavior

## Examples

```bash
# Evaluate an expression to a value
nix-instantiate --eval -E '1 + 1'

# Evaluate an attribute from a file
nix-instantiate --eval -A pkgs.hello default.nix

# Get strict evaluation (no thunks)
nix-instantiate --eval --strict -A myAttr

# Output as JSON
nix-instantiate --eval --strict --json -A myAttr

# Get derivation path
nix-instantiate -A myPackage

# Inspect a derivation
nix-instantiate -A myPackage | xargs nix show-derivation

# For flakes - evaluate an attribute
nix eval .#packages.x86_64-linux.hello

# For flakes - evaluate with JSON output
nix eval --json .#packages.x86_64-linux.hello

# Evaluate and parse with jq
nix-instantiate --eval --strict --json -A config | jq
```

## Key Differences: nix-instantiate vs nix eval

**nix-instantiate:**
- Traditional Nix command, works with any .nix file
- Can instantiate derivations (creates .drv files)
- Evaluates to Nix values or derivation paths
- Works with -A for attribute paths or -E for expressions

**nix eval:**
- Modern command, primarily for flakes
- Evaluates to Nix values only (not derivations)
- Better JSON output formatting
- Cleaner syntax for flakes: `nix eval .#attr`

## Requirements

- **Required**: Nix package manager
- **Optional**: jq, git
- **Platforms**: Linux, macOS

## Installation

### As part of ekala-claude-skills plugin

This skill is included in the ekala-claude-skills plugin. Install the plugin:

```bash
claude-code plugins install /path/to/ekala-claude-skills
```

### Standalone

Copy this directory to your project's `.claude/skills/` directory:

```bash
cp -r skills/development/nix-eval /path/to/your/project/.claude/skills/
```

## License

MIT
