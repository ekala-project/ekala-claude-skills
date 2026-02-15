#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

let errors = [];
let warnings = [];

function error(msg) {
  errors.push(`❌ ${msg}`);
}

function warn(msg) {
  warnings.push(`⚠️  ${msg}`);
}

// Security patterns to check for
const SECURITY_PATTERNS = [
  {
    pattern: /(password|passwd|pwd)\s*=\s*['"][^'"]+['"]/gi,
    severity: 'error',
    description: 'Hardcoded password detected'
  },
  {
    pattern: /(api[_-]?key|apikey)\s*=\s*['"][^'"]+['"]/gi,
    severity: 'error',
    description: 'Hardcoded API key detected'
  },
  {
    pattern: /(secret|token)\s*=\s*['"][a-zA-Z0-9+/]{20,}['"]/gi,
    severity: 'error',
    description: 'Hardcoded secret or token detected'
  },
  {
    pattern: /aws_access_key_id|aws_secret_access_key/gi,
    severity: 'error',
    description: 'AWS credentials detected'
  },
  {
    pattern: /-----BEGIN (RSA |DSA |EC )?PRIVATE KEY-----/gi,
    severity: 'error',
    description: 'Private key detected'
  },
  {
    pattern: /eval\s*\(/gi,
    severity: 'warning',
    description: 'Use of eval() detected (potential code injection)'
  },
  {
    pattern: /exec\s*\(/gi,
    severity: 'warning',
    description: 'Use of exec() detected (potential command injection)'
  },
  {
    pattern: /\bsudo\s+/gi,
    severity: 'warning',
    description: 'Use of sudo detected (privilege escalation)'
  },
  {
    pattern: /rm\s+-rf\s+\//gi,
    severity: 'error',
    description: 'Destructive rm -rf / command detected'
  },
  {
    pattern: /curl\s+.*\|\s*bash/gi,
    severity: 'warning',
    description: 'Piping curl to bash detected (security risk)'
  },
  {
    pattern: /wget\s+.*\|\s*bash/gi,
    severity: 'warning',
    description: 'Piping wget to bash detected (security risk)'
  },
  {
    pattern: /http:\/\/[^\s'"]+(?!localhost|127\.0\.0\.1)/gi,
    severity: 'warning',
    description: 'Insecure HTTP URL detected (should use HTTPS)'
  }
];

// Suspicious URLs or domains
const SUSPICIOUS_DOMAINS = [
  'pastebin.com',
  'raw.githubusercontent.com/.*[a-f0-9]{40}', // Raw GitHub URLs with commit hashes might be suspicious
];

function checkFileForSecurityIssues(filePath, content) {
  const issues = [];

  for (const { pattern, severity, description } of SECURITY_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        issues.push({
          file: filePath,
          severity,
          description,
          match: match.substring(0, 100) // Truncate long matches
        });
      });
    }
  }

  return issues;
}

function checkSuspiciousDomains(filePath, content) {
  const issues = [];

  for (const domain of SUSPICIOUS_DOMAINS) {
    const regex = new RegExp(domain, 'gi');
    const matches = content.match(regex);
    if (matches) {
      matches.forEach(match => {
        issues.push({
          file: filePath,
          severity: 'warning',
          description: 'Potentially suspicious domain',
          match
        });
      });
    }
  }

  return issues;
}

async function main() {
  console.log('🔒 Security Scan\n');
  console.log('='.repeat(60));

  // Find all files in skills/ directory
  const files = await glob('skills/**/*.{md,json,js,sh,bash,py}', {
    cwd: path.join(__dirname, '..')
  });

  if (files.length === 0) {
    console.log('No files found to scan');
    return;
  }

  console.log(`Scanning ${files.length} file(s)...\n`);

  let totalIssues = 0;

  for (const file of files) {
    const filePath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(filePath, 'utf8');

    const securityIssues = checkFileForSecurityIssues(file, content);
    const domainIssues = checkSuspiciousDomains(file, content);

    const allIssues = [...securityIssues, ...domainIssues];

    if (allIssues.length > 0) {
      console.log(`${file}:`);
      allIssues.forEach(issue => {
        totalIssues++;
        const msg = `  ${issue.description}: ${issue.match}`;

        if (issue.severity === 'error') {
          error(msg);
          console.log(`  ❌ ${issue.description}`);
          console.log(`     Match: ${issue.match}`);
        } else {
          warn(msg);
          console.log(`  ⚠️  ${issue.description}`);
          console.log(`     Match: ${issue.match}`);
        }
      });
      console.log('');
    }
  }

  console.log('='.repeat(60));
  console.log('Security Scan Summary\n');

  if (errors.length > 0) {
    console.log(`❌ Found ${errors.length} critical security issue(s):`);
    errors.forEach(e => console.log(e));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log(`⚠️  Found ${warnings.length} potential security concern(s):`);
    warnings.forEach(w => console.log(w));
    console.log('');
  }

  if (totalIssues === 0) {
    console.log('✅ No security issues detected!');
    process.exit(0);
  } else if (errors.length > 0) {
    console.log(`❌ Security scan failed with ${errors.length} critical issue(s)`);
    process.exit(1);
  } else {
    console.log(`⚠️  Security scan completed with ${warnings.length} warning(s)`);
    console.log('Please review the warnings above.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
