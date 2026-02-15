#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function main() {
  console.log('📚 Generating Skill Catalog\n');
  console.log('='.repeat(60));

  const catalogDir = path.join(__dirname, '../catalog');
  const byCategoryDir = path.join(catalogDir, 'by-category');
  const byAuthorDir = path.join(catalogDir, 'by-author');

  // Ensure catalog directories exist
  if (!fs.existsSync(byCategoryDir)) {
    fs.mkdirSync(byCategoryDir, { recursive: true });
  }
  if (!fs.existsSync(byAuthorDir)) {
    fs.mkdirSync(byAuthorDir, { recursive: true });
  }

  // Find all metadata.json files
  const metadataFiles = await glob('skills/**/metadata.json', {
    cwd: path.join(__dirname, '..')
  });

  if (metadataFiles.length === 0) {
    console.log('No skills found');
    return;
  }

  console.log(`Found ${metadataFiles.length} skill(s)\n`);

  const skills = [];
  const categoryCounts = {};
  const authorSkills = {};

  // Process each skill
  for (const metadataFile of metadataFiles) {
    try {
      const fullPath = path.join(__dirname, '..', metadataFile);
      const metadata = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

      const skillDir = path.dirname(metadataFile);
      const skillPath = path.join(skillDir, 'SKILL.md');

      console.log(`Processing: ${metadata.displayName || metadata.name}`);

      // Create catalog entry
      const catalogEntry = {
        id: metadata.id,
        name: metadata.name,
        displayName: metadata.displayName,
        description: metadata.description,
        version: metadata.version,
        author: metadata.author.name,
        authorGithub: metadata.author.github,
        categories: metadata.categories,
        tags: metadata.tags,
        quality: {
          verified: metadata.quality?.verified || false,
          rating: metadata.quality?.communityRating || 0,
          downloads: metadata.quality?.downloads || 0
        },
        lastUpdated: metadata.quality?.lastUpdated || new Date().toISOString(),
        skillPath: skillPath,
        metadataPath: metadataFile
      };

      skills.push(catalogEntry);

      // Track category counts
      metadata.categories.forEach(cat => {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });

      // Track author skills
      const authorName = metadata.author.github || metadata.author.name;
      if (!authorSkills[authorName]) {
        authorSkills[authorName] = [];
      }
      authorSkills[authorName].push(catalogEntry);

    } catch (e) {
      console.error(`Error processing ${metadataFile}:`, e.message);
    }
  }

  // Sort skills by name
  skills.sort((a, b) => a.name.localeCompare(b.name));

  // Generate main catalog index
  const mainCatalog = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalSkills: skills.length,
    categories: categoryCounts,
    skills
  };

  const mainCatalogPath = path.join(catalogDir, 'index.json');
  fs.writeFileSync(mainCatalogPath, JSON.stringify(mainCatalog, null, 2));
  console.log(`\n✓ Generated: catalog/index.json`);

  // Generate category-specific catalogs
  const categories = Object.keys(categoryCounts);
  for (const category of categories) {
    const categorySkills = skills.filter(s => s.categories.includes(category));

    const categoryCatalog = {
      category,
      totalSkills: categorySkills.length,
      generatedAt: new Date().toISOString(),
      skills: categorySkills
    };

    const categoryPath = path.join(byCategoryDir, `${category}.json`);
    fs.writeFileSync(categoryPath, JSON.stringify(categoryCatalog, null, 2));
    console.log(`✓ Generated: catalog/by-category/${category}.json (${categorySkills.length} skills)`);
  }

  // Generate author-specific catalogs
  for (const [author, authorSkillList] of Object.entries(authorSkills)) {
    const authorCatalog = {
      author,
      totalSkills: authorSkillList.length,
      generatedAt: new Date().toISOString(),
      skills: authorSkillList
    };

    const authorPath = path.join(byAuthorDir, `${author.replace(/[^a-z0-9-]/gi, '_')}.json`);
    fs.writeFileSync(authorPath, JSON.stringify(authorCatalog, null, 2));
    console.log(`✓ Generated: catalog/by-author/${author}.json (${authorSkillList.length} skills)`);
  }

  // Generate featured skills (for now, just verified skills)
  const featured = skills.filter(s => s.quality.verified);
  const featuredCatalog = {
    totalSkills: featured.length,
    generatedAt: new Date().toISOString(),
    skills: featured
  };

  const featuredPath = path.join(catalogDir, 'featured.json');
  fs.writeFileSync(featuredPath, JSON.stringify(featuredCatalog, null, 2));
  console.log(`✓ Generated: catalog/featured.json (${featured.length} skills)`);

  console.log('\n' + '='.repeat(60));
  console.log('Catalog Generation Summary\n');
  console.log(`Total skills: ${skills.length}`);
  console.log(`Categories: ${categories.length}`);
  console.log(`Authors: ${Object.keys(authorSkills).length}`);
  console.log(`Featured: ${featured.length}`);
  console.log('\n✅ Catalog generation complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
