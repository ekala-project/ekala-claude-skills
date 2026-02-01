# Ekala Claude Skills

A collection of Claude Code skills for Nix development workflows.

## Overview

This plugin provides specialized skills to enhance Claude Code's capabilities when working with Nix package management and builds.

## Skills

### nix-build

The `nix-build` skill assists with building Nix packages using nix-build and related Nix commands.

**Capabilities:**
- Execute nix-build and nix build commands with appropriate flags
- Analyze and troubleshoot build failures
- Optimize build processes with parallel builds and caching
- Handle common Nix build patterns and outputs
- Provide detailed error diagnostics with --show-trace and --verbose

**When it activates:**
- When you mention building a Nix package or derivation
- When working with default.nix or shell.nix files for builds
- When debugging Nix build failures
- When asking about Nix package compilation

**Example usage:**
```
Build the package in default.nix
```

```
The nix-build failed with a hash mismatch error, can you help?
```

```
Build myPackage with verbose output and keep the failed build directory
```

## Installation

### As a Plugin

1. Clone this repository or download it to your local machine

2. Install the plugin using Claude Code:
   ```bash
   claude-code plugins install /path/to/ekala-claude-skills
   ```

3. The skills will be available with the namespace `ekala-claude-skills:skill-name`

### For a Single Project

Copy the `skills/` directory into your project's `.claude/` directory:

```bash
cp -r skills /path/to/your/project/.claude/
```

## Plugin Structure

```
ekala-claude-skills/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── skills/
│   └── nix-build/
│       └── SKILL.md         # Nix build skill definition
└── README.md                # This file
```

## Contributing

To add new skills to this plugin:

1. Create a new directory under `skills/` with your skill name
2. Add a `SKILL.md` file with the skill definition (see existing skills for examples)
3. Update this README with information about the new skill
4. Bump the version in `.claude-plugin/plugin.json`

## License

MIT

## Author

Ekala
