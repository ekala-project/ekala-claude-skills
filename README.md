# Ekala Claude Skills Marketplace

A community-driven marketplace of Claude Code skills for Nix development workflows and beyond.

## 🌟 Overview

This is both a Claude Code plugin AND a community marketplace where developers can discover, share, and contribute skills to enhance Claude Code's capabilities. Currently focused on Nix development, we welcome skills from all domains!

**🔗 [Browse the Marketplace](https://ekala.github.io/ekala-claude-skills/docs/marketplace/)** | **📦 [3 Skills Available](#available-skills)** | **✨ [Contribute](#contributing)**

## 🎯 Quick Start

```bash
# Install the plugin
claude-code plugins install /path/to/ekala-claude-skills

# Or clone and install
git clone https://github.com/ekala/ekala-claude-skills.git
cd ekala-claude-skills
npm install
npm run validate  # Validate all skills
```

## 📦 Available Skills

### Development

#### [nix-build](skills/development/nix-build/) 🥇
Assists with building Nix packages using nix-build and related Nix commands.
- **Tags:** nix, nixpkgs, build, package-management
- **Platforms:** Linux, macOS
- **Version:** 1.0.0

#### [nix-eval](skills/development/nix-eval/) 🥇
Assists with evaluating Nix expressions, inspecting derivations, and understanding Nix language semantics.
- **Tags:** nix, evaluation, nix-instantiate, derivation
- **Platforms:** Linux, macOS
- **Version:** 1.0.0

### DevOps

#### [ekala-cmake-nix](skills/development/ekala-cmake-nix/) 🥇
Assists with building CMake-based Nix packages, understanding cmake-specific Nix attributes, and troubleshooting CMake builds in Nix.
- **Tags:** nix, cmake, build, c, cpp
- **Platforms:** Linux, macOS
- **Version:** 1.0.0

**[View all skills in the marketplace →](https://ekala.github.io/ekala-claude-skills/docs/marketplace/)**

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

## 🏗️ Marketplace Structure

```
ekala-claude-skills/
├── .claude-plugin/
│   └── plugin.json                  # Plugin manifest
├── .github/
│   ├── workflows/                   # CI/CD automation
│   │   ├── validate-submission.yml  # Validate PRs
│   │   ├── update-catalog.yml       # Auto-update catalog
│   │   ├── quality-metrics.yml      # Track quality
│   │   └── security-scan.yml        # Security checks
│   └── ISSUE_TEMPLATE/              # Contribution templates
├── catalog/                         # Auto-generated skill catalog
│   ├── index.json                   # Main catalog
│   ├── by-category/                 # Category-based indices
│   └── by-author/                   # Author-based indices
├── docs/
│   ├── marketplace/                 # GitHub Pages site
│   ├── CONTRIBUTING.md              # Contribution guide
│   ├── SUBMISSION_GUIDE.md          # How to submit skills
│   └── SKILL_GUIDELINES.md          # Quality standards
├── schemas/
│   ├── skill-metadata.schema.json   # Metadata validation
│   └── catalog-entry.schema.json    # Catalog schema
├── scripts/
│   ├── validate-skill.js            # Validation
│   ├── generate-catalog.js          # Catalog generation
│   ├── check-quality.js             # Quality scoring
│   └── check-security.js            # Security scanning
├── skills/
│   └── {category}/
│       └── {skill-name}/
│           ├── SKILL.md             # Skill definition
│           ├── metadata.json        # Metadata
│           ├── README.md            # Documentation
│           └── CHANGELOG.md         # Version history
└── README.md                        # This file
```

## 🤝 Contributing

We welcome contributions from the community! There are several ways to contribute:

### Submit a New Skill

1. **Read the guidelines**: [Submission Guide](docs/SUBMISSION_GUIDE.md) | [Skill Guidelines](docs/SKILL_GUIDELINES.md)
2. **Create your skill** in `skills/{category}/{skill-name}/`
3. **Validate locally**: `npm run validate`
4. **Submit a PR** or [create an issue](https://github.com/ekala/ekala-claude-skills/issues/new/choose)

### Improve Existing Skills

- Add examples and documentation
- Fix bugs or issues
- Enhance functionality
- Update for compatibility

### Quick Contribution Workflow

```bash
# Fork and clone
git clone https://github.com/YOUR-USERNAME/ekala-claude-skills.git
cd ekala-claude-skills

# Install dependencies
npm install

# Create your skill
mkdir -p skills/category/my-skill
# Add SKILL.md, metadata.json, README.md, CHANGELOG.md

# Validate
npm run validate
npm run validate:quality
npm run validate:security

# Submit
git add skills/category/my-skill
git commit -m "feat: add my-skill"
git push origin my-branch
# Create PR on GitHub
```

**[Read the full Contributing Guide →](docs/CONTRIBUTING.md)**

## 🎨 Marketplace Features

### For Users
- **🔍 Searchable Catalog**: Find skills by name, description, tags, or category
- **✅ Quality Verification**: Verified skills with quality badges
- **📊 Detailed Metadata**: See requirements, platforms, versions, and more
- **🌐 Web Interface**: Browse skills at [marketplace website](https://ekala.github.io/ekala-claude-skills/docs/marketplace/)
- **📦 Easy Installation**: One-command installation via Claude Code

### For Contributors
- **🤖 Automated Validation**: Schema validation, quality checks, security scans
- **📈 Quality Scoring**: Automatic quality scoring (Gold 🥇, Silver 🥈, Bronze 🥉)
- **🔄 Auto-Catalog Updates**: Catalog regenerates automatically on merge
- **📝 Templates & Guidelines**: Clear templates and quality standards
- **🛡️ Security Scanning**: Automated security checks for all submissions

## 🧪 Development

### Run Validation

```bash
# Validate schema and structure
npm run validate:schema

# Check quality scores
npm run validate:quality

# Security scan
npm run validate:security

# Full validation (all checks)
npm run validate
```

### Generate Catalog

```bash
# Regenerate catalog from skills
npm run generate:catalog

# View catalog
cat catalog/index.json | jq
```

### Test Locally

```bash
# Install plugin locally
claude-code plugins install .

# Test skills in Claude Code
# Activate with ekala-claude-skills:skill-name
```

## 📖 Documentation

- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute
- **[Submission Guide](docs/SUBMISSION_GUIDE.md)** - Step-by-step skill submission
- **[Skill Guidelines](docs/SKILL_GUIDELINES.md)** - Quality standards and best practices

## 🔗 Links

- **[GitHub Repository](https://github.com/ekala/ekala-claude-skills)**
- **[Marketplace Website](https://ekala.github.io/ekala-claude-skills/docs/marketplace/)**
- **[Submit a Skill](https://github.com/ekala/ekala-claude-skills/issues/new/choose)**
- **[Report an Issue](https://github.com/ekala/ekala-claude-skills/issues/new/choose)**
- **[Discussions](https://github.com/ekala/ekala-claude-skills/discussions)**

## 📊 Stats

- **3** Total Skills
- **2** Categories (Development, DevOps)
- **3** Verified Skills
- **1** Active Contributors

## 📜 License

MIT

## 👥 Authors

Jonathan Ringer and Ekala contributors

---

**⭐ Star this repo** if you find it helpful! **🙋 Contribute** to grow the marketplace!
