#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

let warnings = [];
let infos = [];

function warn(msg) {
  warnings.push(`⚠️  ${msg}`);
}

function info(msg) {
  infos.push(`ℹ️  ${msg}`);
}

function calculateQualityScore(skillDir, skillName) {
  let score = 0;
  const checks = [];

  // Has README (10 points)
  if (fs.existsSync(path.join(skillDir, 'README.md'))) {
    score += 10;
    checks.push('✓ Has README.md (+10)');
  } else {
    checks.push('✗ Missing README.md (0)');
  }

  // Has CHANGELOG (5 points)
  if (fs.existsSync(path.join(skillDir, 'CHANGELOG.md'))) {
    score += 5;
    checks.push('✓ Has CHANGELOG.md (+5)');
  } else {
    checks.push('✗ Missing CHANGELOG.md (0)');
  }

  // Has examples directory (15 points)
  if (fs.existsSync(path.join(skillDir, 'examples'))) {
    score += 15;
    checks.push('✓ Has examples/ (+15)');
  } else {
    checks.push('✗ No examples/ directory (0)');
  }

  // Has tests (20 points)
  if (fs.existsSync(path.join(skillDir, 'tests'))) {
    score += 20;
    checks.push('✓ Has tests/ (+20)');
  } else {
    checks.push('✗ No tests/ directory (0)');
  }

  // Good documentation (15 points)
  const readmePath = path.join(skillDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf8');
    const hasMultipleSections = (readme.match(/##\s/g) || []).length >= 4;
    const hasExamples = readme.toLowerCase().includes('example');
    const hasInstallation = readme.toLowerCase().includes('installation');

    if (hasMultipleSections && hasExamples && hasInstallation) {
      score += 15;
      checks.push('✓ Good documentation (+15)');
    } else {
      checks.push('✗ Documentation could be improved (0)');
      if (!hasMultipleSections) info(`${skillName}: README should have at least 4 sections`);
      if (!hasExamples) info(`${skillName}: README should include examples`);
      if (!hasInstallation) info(`${skillName}: README should include installation instructions`);
    }
  }

  // SKILL.md quality (10 points)
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  if (fs.existsSync(skillMdPath)) {
    const skillMd = fs.readFileSync(skillMdPath, 'utf8');
    const hasWhenToActivate = skillMd.includes('## When to activate');
    const hasExamples = skillMd.includes('```');
    const isLongEnough = skillMd.length >= 1000;

    if (hasWhenToActivate && hasExamples && isLongEnough) {
      score += 10;
      checks.push('✓ High quality SKILL.md (+10)');
    } else {
      let points = 0;
      if (hasWhenToActivate) points += 4;
      if (hasExamples) points += 3;
      if (isLongEnough) points += 3;
      score += points;
      checks.push(`◐ SKILL.md quality (+${points}/10)`);

      if (!hasWhenToActivate) info(`${skillName}: SKILL.md should include "When to activate" section`);
      if (!hasExamples) info(`${skillName}: SKILL.md should include code examples`);
      if (!isLongEnough) info(`${skillName}: SKILL.md could be more detailed (${skillMd.length} chars)`);
    }
  }

  // Active maintenance (10 points) - check if recently updated
  const metadataPath = path.join(skillDir, 'metadata.json');
  if (fs.existsSync(metadataPath)) {
    try {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      if (metadata.quality && metadata.quality.lastUpdated) {
        const lastUpdate = new Date(metadata.quality.lastUpdated);
        const now = new Date();
        const monthsOld = (now - lastUpdate) / (1000 * 60 * 60 * 24 * 30);

        if (monthsOld < 6) {
          score += 10;
          checks.push('✓ Recently updated (+10)');
        } else if (monthsOld < 12) {
          score += 5;
          checks.push('◐ Updated within a year (+5)');
        } else {
          checks.push(`✗ Not updated in ${Math.floor(monthsOld)} months (0)`);
          warn(`${skillName}: Skill hasn't been updated in ${Math.floor(monthsOld)} months`);
        }
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  }

  return { score, checks };
}

function determineQualityBadge(score) {
  if (score >= 90) return { level: 'Gold', emoji: '🥇', description: 'Excellent' };
  if (score >= 75) return { level: 'Silver', emoji: '🥈', description: 'Good' };
  if (score >= 60) return { level: 'Bronze', emoji: '🥉', description: 'Acceptable' };
  return { level: 'None', emoji: '⚪', description: 'Needs Improvement' };
}

async function main() {
  console.log('📊 Checking Skill Quality\n');
  console.log('='.repeat(60));

  const metadataFiles = await glob('skills/**/metadata.json', {
    cwd: path.join(__dirname, '..')
  });

  if (metadataFiles.length === 0) {
    console.log('No skills found to check');
    return;
  }

  const results = [];

  for (const metadataFile of metadataFiles) {
    const skillDir = path.dirname(metadataFile);
    const skillName = path.basename(skillDir);

    console.log(`\n${skillName}:`);

    const { score, checks } = calculateQualityScore(skillDir, skillName);
    const badge = determineQualityBadge(score);

    checks.forEach(check => console.log(`  ${check}`));
    console.log(`  Score: ${score}/100 - ${badge.emoji} ${badge.level} (${badge.description})`);

    results.push({ skillName, score, badge });
  }

  console.log('\n' + '='.repeat(60));
  console.log('Quality Summary\n');

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  console.log('Rankings:');
  results.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.badge.emoji} ${r.skillName.padEnd(30)} ${r.score}/100`);
  });

  if (infos.length > 0) {
    console.log('\nSuggestions for improvement:');
    infos.forEach(i => console.log(i));
  }

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    warnings.forEach(w => console.log(w));
  }

  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  console.log(`\nAverage quality score: ${avgScore.toFixed(1)}/100`);

  // Don't fail, this is informational only
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
