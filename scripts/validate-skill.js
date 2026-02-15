#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const yaml = require('js-yaml');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schemas
const metadataSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../schemas/skill-metadata.schema.json'), 'utf8')
);

const validateMetadata = ajv.compile(metadataSchema);

let errors = [];
let warnings = [];

function error(msg) {
  errors.push(`❌ ${msg}`);
}

function warn(msg) {
  warnings.push(`⚠️  ${msg}`);
}

function validateSkillDirectory(skillPath) {
  const skillName = path.basename(path.dirname(skillPath));
  const skillDir = path.dirname(skillPath);

  console.log(`\nValidating skill: ${skillName}`);
  console.log(`  Location: ${skillDir}`);

  // Check required files
  const requiredFiles = ['SKILL.md', 'metadata.json', 'README.md', 'CHANGELOG.md'];
  for (const file of requiredFiles) {
    const filePath = path.join(skillDir, file);
    if (!fs.existsSync(filePath)) {
      error(`Missing required file: ${file} in ${skillDir}`);
    }
  }

  // Validate SKILL.md has YAML frontmatter
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  if (fs.existsSync(skillMdPath)) {
    const content = fs.readFileSync(skillMdPath, 'utf8');
    if (!content.startsWith('---\n')) {
      error(`SKILL.md must start with YAML frontmatter (---) in ${skillDir}`);
    } else {
      try {
        const frontmatterEnd = content.indexOf('\n---\n', 4);
        if (frontmatterEnd === -1) {
          error(`SKILL.md frontmatter is not properly closed (---) in ${skillDir}`);
        } else {
          const frontmatter = content.substring(4, frontmatterEnd);
          const fm = yaml.load(frontmatter);

          if (!fm.name) {
            error(`SKILL.md frontmatter missing 'name' field in ${skillDir}`);
          }
          if (!fm.description) {
            error(`SKILL.md frontmatter missing 'description' field in ${skillDir}`);
          }

          // Check if name matches directory
          if (fm.name && fm.name !== skillName) {
            warn(`SKILL.md frontmatter name '${fm.name}' doesn't match directory name '${skillName}'`);
          }
        }
      } catch (e) {
        error(`SKILL.md frontmatter is not valid YAML in ${skillDir}: ${e.message}`);
      }
    }

    // Check minimum content length
    if (content.length < 500) {
      warn(`SKILL.md seems too short (${content.length} chars) in ${skillDir}`);
    }
  }

  // Validate metadata.json
  const metadataPath = path.join(skillDir, 'metadata.json');
  if (fs.existsSync(metadataPath)) {
    try {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

      const valid = validateMetadata(metadata);
      if (!valid) {
        error(`metadata.json schema validation failed in ${skillDir}:`);
        validateMetadata.errors.forEach(err => {
          error(`  ${err.instancePath} ${err.message}`);
        });
      } else {
        console.log('  ✓ metadata.json is valid');
      }

      // Check if ID matches directory structure
      const expectedId = skillPath.replace(/^skills\//, '').replace('/metadata.json', '');
      if (metadata.id !== expectedId) {
        error(`metadata.json id '${metadata.id}' doesn't match expected '${expectedId}'`);
      }

      // Check if name matches directory
      if (metadata.name !== skillName) {
        warn(`metadata.json name '${metadata.name}' doesn't match directory name '${skillName}'`);
      }

    } catch (e) {
      error(`metadata.json is not valid JSON in ${skillDir}: ${e.message}`);
    }
  }

  // Check README.md
  const readmePath = path.join(skillDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf8');
    if (readme.length < 200) {
      warn(`README.md seems too short (${readme.length} chars) in ${skillDir}`);
    }
    if (!readme.includes('## ')) {
      warn(`README.md should include section headers (##) in ${skillDir}`);
    }
  }

  // Check CHANGELOG.md
  const changelogPath = path.join(skillDir, 'CHANGELOG.md');
  if (fs.existsSync(changelogPath)) {
    const changelog = fs.readFileSync(changelogPath, 'utf8');
    if (!changelog.includes('## [')) {
      warn(`CHANGELOG.md should follow Keep a Changelog format in ${skillDir}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const schemaOnly = args.includes('--schema-only');

  console.log('🔍 Validating Claude Code Skills\n');
  console.log('='.repeat(60));

  // Find all metadata.json files in skills/
  const metadataFiles = await glob('skills/**/metadata.json', {
    cwd: path.join(__dirname, '..')
  });

  if (metadataFiles.length === 0) {
    error('No skills found in skills/ directory');
  } else {
    console.log(`Found ${metadataFiles.length} skill(s) to validate\n`);

    for (const metadataFile of metadataFiles) {
      validateSkillDirectory(metadataFile);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Validation Summary\n');

  if (warnings.length > 0) {
    console.log('Warnings:');
    warnings.forEach(w => console.log(w));
    console.log('');
  }

  if (errors.length > 0) {
    console.log('Errors:');
    errors.forEach(e => console.log(e));
    console.log('');
    console.log(`❌ Validation failed with ${errors.length} error(s) and ${warnings.length} warning(s)`);
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log(`✅ Validation passed with ${warnings.length} warning(s)`);
    process.exit(0);
  } else {
    console.log('✅ All validations passed!');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
