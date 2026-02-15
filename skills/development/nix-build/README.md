# Nix Build Assistant

A Claude Code skill that assists with building Nix packages using nix-build and related Nix commands.

## Overview

This skill provides expert guidance for:
- Building Nix packages and derivations
- Troubleshooting build failures
- Optimizing build processes
- Understanding common build patterns

## When to Use

The skill activates when you:
- Mention building a Nix package or derivation
- Reference nix-build, nix build, or similar Nix build commands
- Experience Nix build failures or errors
- Ask about Nix package compilation or building
- Work with default.nix or shell.nix files for building

## Features

### Build Execution
- Traditional nix-build commands
- Flake-based nix build commands
- Appropriate flag usage (--verbose, --keep-failed, --show-trace)
- Support for both local and remote Nix expressions

### Troubleshooting
- Build log analysis
- Missing dependency detection
- Syntax verification
- Common issue resolution (hash mismatches, missing build inputs)
- Failed build directory preservation for debugging

### Optimization
- Parallel build configuration (--cores, --max-jobs)
- Binary cache recommendations
- Incremental build strategies
- Substituter configuration

## Examples

```bash
# Basic build
nix-build default.nix

# Build specific attribute
nix-build -A myPackage

# Build with debugging
nix-build --show-trace --keep-failed -A myPackage

# Build from nixpkgs
nix-build '<nixpkgs>' -A hello

# For flakes
nix build .#packageName --verbose
```

## Requirements

- **Required**: Nix package manager
- **Optional**: git, nix-prefetch-url
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
cp -r skills/development/nix-build /path/to/your/project/.claude/skills/
```

## License

MIT
