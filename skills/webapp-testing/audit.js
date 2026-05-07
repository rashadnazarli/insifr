#!/usr/bin/env node

/**
 * Founder Mode Skill: Security Audit
 *
 * Scans a project's codebase for common security vulnerabilities
 * based on OWASP Top 10 and the Founder Mode security rules.
 *
 * Usage:
 *   node audit.js <project-dir> [--strict] [--json]
 *
 * Options:
 *   --strict   Treat all warnings as errors (exit code 1)
 *   --json     Output results as JSON instead of formatted text
 */

const fs = require('fs');
const path = require('path');

// ─── Parse Args ─────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║  🔒 Founder Mode — Security Audit Skill      ║
  ╚══════════════════════════════════════════════╝

  Usage:
    node audit.js <project-dir> [options]

  Options:
    --strict   Treat warnings as errors
    --json     Output as JSON
    --help     Show this help
  `);
  process.exit(0);
}

const projectDir = path.resolve(args[0]);
const strictMode = args.includes('--strict');
const jsonMode = args.includes('--json');

// ─── Vulnerability Patterns ─────────────────────────────────────────
const RULES = [
  // OWASP A01: Broken Access Control
  {
    id: 'SEC-001',
    severity: 'HIGH',
    category: 'Access Control',
    pattern: /\beval\s*\(/gi,
    message: 'Usage of eval() — potential code injection vector',
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  {
    id: 'SEC-002',
    severity: 'HIGH',
    category: 'Access Control',
    pattern: /innerHTML\s*=/gi,
    message: 'Direct innerHTML assignment — XSS vulnerability',
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.html'],
  },
  // OWASP A02: Cryptographic Failures
  {
    id: 'SEC-003',
    severity: 'CRITICAL',
    category: 'Secrets',
    pattern: /(api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"]{8,}['"]/gi,
    message: 'Hardcoded secret or API key detected',
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.py', '.env', '.json', '.yaml', '.yml'],
  },
  {
    id: 'SEC-004',
    severity: 'MEDIUM',
    category: 'Cryptography',
    pattern: /\b(md5|sha1)\b/gi,
    message: 'Weak cryptographic hash function (use SHA-256+)',
    extensions: ['.js', '.ts', '.py', '.go'],
  },
  // OWASP A03: Injection
  {
    id: 'SEC-005',
    severity: 'HIGH',
    category: 'Injection',
    pattern: /\$\{.*\}.*(?:SELECT|INSERT|UPDATE|DELETE|DROP)\b/gi,
    message: 'Potential SQL injection via template literal',
    extensions: ['.js', '.ts'],
  },
  {
    id: 'SEC-006',
    severity: 'HIGH',
    category: 'Injection',
    pattern: /exec(?:Sync)?\s*\(\s*[`'"].*\$\{/gi,
    message: 'Command injection via string interpolation in exec()',
    extensions: ['.js', '.ts'],
  },
  // OWASP A05: Security Misconfiguration
  {
    id: 'SEC-007',
    severity: 'MEDIUM',
    category: 'Configuration',
    pattern: /cors\(\s*\)/gi,
    message: 'cors() called without options — allows all origins',
    extensions: ['.js', '.ts'],
  },
  {
    id: 'SEC-008',
    severity: 'LOW',
    category: 'Configuration',
    pattern: /console\.(log|debug|info)\s*\(/gi,
    message: 'Console log in production code (potential data leak)',
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  // OWASP A07: Auth Failures
  {
    id: 'SEC-009',
    severity: 'HIGH',
    category: 'Authentication',
    pattern: /jwt\.sign\([^)]*expiresIn:\s*['"](\d{3,}d|999)/gi,
    message: 'JWT with excessively long expiration',
    extensions: ['.js', '.ts'],
  },
  // OWASP A09: Logging Failures
  {
    id: 'SEC-010',
    severity: 'MEDIUM',
    category: 'Logging',
    pattern: /catch\s*\(\s*\w*\s*\)\s*\{\s*\}/g,
    message: 'Empty catch block — errors silently swallowed',
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  // OWASP LLM Top 10 (AI-specific)
  {
    id: 'AI-001',
    severity: 'HIGH',
    category: 'AI Security',
    pattern: /(?:system|user)\s*:\s*[`'"].*\$\{(?:user|input|req)/gi,
    message: 'User input directly interpolated into LLM prompt — prompt injection risk',
    extensions: ['.js', '.ts', '.py'],
  },
  {
    id: 'AI-002',
    severity: 'MEDIUM',
    category: 'AI Security',
    pattern: /temperature\s*[:=]\s*(1\.?\d*|2)/gi,
    message: 'High LLM temperature (>1.0) may produce unreliable outputs',
    extensions: ['.js', '.ts', '.py', '.json'],
  },
];

// ─── Scanner ────────────────────────────────────────────────────────

const IGNORE_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '__pycache__',
  'vendor', '.founder-mode', 'archive',
]);

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        results.push(...walkDir(fullPath));
      }
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function scanFile(filePath, rule) {
  const ext = path.extname(filePath).toLowerCase();
  if (!rule.extensions.includes(ext)) return [];

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const findings = [];

  for (let i = 0; i < lines.length; i++) {
    // Reset regex lastIndex for global patterns
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(lines[i])) {
      findings.push({
        rule_id: rule.id,
        severity: rule.severity,
        category: rule.category,
        message: rule.message,
        file: path.relative(projectDir, filePath),
        line: i + 1,
        snippet: lines[i].trim().substring(0, 120),
      });
    }
  }

  return findings;
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  console.log('\n  ╔══════════════════════════════════════════════╗');
  console.log('  ║  🔒 Founder Mode — Security Audit            ║');
  console.log('  ╚══════════════════════════════════════════════╝\n');

  if (!fs.existsSync(projectDir)) {
    console.error(`  ❌ Directory not found: ${projectDir}`);
    process.exit(1);
  }

  console.log(`  📂 Scanning: ${projectDir}`);
  console.log(`  🔧 Mode: ${strictMode ? 'Strict' : 'Standard'}\n`);

  const allFiles = walkDir(projectDir);
  const codeFiles = allFiles.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.html', '.json', '.yaml', '.yml', '.env'].includes(ext);
  });

  console.log(`  📝 Files scanned: ${codeFiles.length}`);

  const allFindings = [];

  for (const file of codeFiles) {
    for (const rule of RULES) {
      const findings = scanFile(file, rule);
      allFindings.push(...findings);
    }
  }

  // ─── Output ─────────────────────────────────────────────────────
  if (jsonMode) {
    console.log(JSON.stringify(allFindings, null, 2));
    process.exit(allFindings.some(f => f.severity === 'CRITICAL' || f.severity === 'HIGH') ? 1 : 0);
  }

  const critical = allFindings.filter(f => f.severity === 'CRITICAL');
  const high = allFindings.filter(f => f.severity === 'HIGH');
  const medium = allFindings.filter(f => f.severity === 'MEDIUM');
  const low = allFindings.filter(f => f.severity === 'LOW');

  console.log(`  🔍 Findings: ${allFindings.length} total\n`);

  const severityIcon = { CRITICAL: '🔴', HIGH: '🟠', MEDIUM: '🟡', LOW: '⚪' };

  if (allFindings.length === 0) {
    console.log('  ✅ No security issues found!\n');
  } else {
    // Group by category
    const byCategory = {};
    for (const f of allFindings) {
      if (!byCategory[f.category]) byCategory[f.category] = [];
      byCategory[f.category].push(f);
    }

    for (const [category, findings] of Object.entries(byCategory)) {
      console.log(`  ── ${category} (${findings.length}) ──`);
      for (const f of findings) {
        console.log(`    ${severityIcon[f.severity]} [${f.rule_id}] ${f.message}`);
        console.log(`       📄 ${f.file}:${f.line}`);
        console.log(`       └─ ${f.snippet}`);
        console.log('');
      }
    }
  }

  // ─── Summary ──────────────────────────────────────────────────
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log(`  ║  Summary: ${critical.length} Critical, ${high.length} High, ${medium.length} Medium, ${low.length} Low  `);
  console.log('  ╚══════════════════════════════════════════════╝\n');

  if (critical.length > 0 || high.length > 0) {
    console.log('  ⚠️  ACTION REQUIRED: Fix Critical/High findings before deployment.\n');
  }

  const exitCode = (strictMode && allFindings.length > 0) || critical.length > 0 ? 1 : 0;
  process.exit(exitCode);
}

main();
