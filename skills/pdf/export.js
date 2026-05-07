#!/usr/bin/env node

/**
 * Founder Mode Skill: Markdown → PDF Export
 *
 * Converts all .md files in a project's docs/ directory into
 * professionally formatted PDF documents using Puppeteer.
 *
 * Usage:
 *   node export.js <project-dir> [--output <dir>] [--single] [--dossier]
 *
 * Options:
 *   --output <dir>   Output directory for PDFs (default: docs/pdf/)
 *   --single         Combine all docs into a single PDF
 *   --dossier        Generate investor-ready "Founder Dossier" with cover page + TOC
 *   --title <name>   Project title for cover page (default: directory name)
 *
 * Dependencies (auto-installed on first run):
 *   - puppeteer
 *   - markdown-it
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Parse Arguments ────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  console.log(`
  +================================================+
  |  Founder Mode -- PDF Export Skill               |
  +================================================+

  Usage:
    node export.js <project-dir> [options]

  Options:
    --output <dir>   Output directory (default: docs/pdf/)
    --single         Merge all docs into one PDF
    --dossier        Investor-ready PDF with cover page + TOC
    --title <name>   Project title for dossier cover page
    --help           Show this help

  Examples:
    node export.js ./my-project
    node export.js ./my-project --output ./deliverables
    node export.js ./my-project --single
    node export.js ./my-project --dossier --title "Acme Fintech"
  `);
  process.exit(0);
}

const projectDir = path.resolve(args[0]);
const outputIdx = args.indexOf('--output');
const outputDir = outputIdx !== -1 && args[outputIdx + 1]
  ? path.resolve(args[outputIdx + 1])
  : path.join(projectDir, 'docs', 'pdf');
const singleMode = args.includes('--single');
const dossierMode = args.includes('--dossier');

const titleIdx = args.indexOf('--title');
const projectTitle = titleIdx !== -1 && args[titleIdx + 1]
  ? args[titleIdx + 1]
  : path.basename(projectDir).replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// ─── Ensure Dependencies ────────────────────────────────────────────
function ensureDependency(pkg) {
  try {
    require.resolve(pkg);
  } catch {
    console.log(`  Installing ${pkg}...`);
    execSync(`npm install --no-save ${pkg}`, { cwd: __dirname, stdio: 'pipe' });
  }
}

// ─── Artifact Metadata ─────────────────────────────────────────────
const ARTIFACT_META = {
  'IDEA': { phase: 1, title: 'Idea Discovery & Refinement' },
  'VALIDATION': { phase: 1, title: 'Problem Validation' },
  'MARKET_RESEARCH': { phase: 1, title: 'Market Research' },
  'PORTERS_FIVE_FORCES': { phase: 1, title: "Porter's Five Forces" },
  'PRODUCT_STRATEGY': { phase: 2, title: 'Product Strategy' },
  'MECE_PROBLEM_BREAKDOWN': { phase: 2, title: 'MECE Problem Breakdown' },
  'PRD': { phase: 2, title: 'Product Requirements Document' },
  'HYPOTHESIS_VALIDATION': { phase: 2, title: 'Hypothesis Validation Matrix' },
  'ROADMAP': { phase: 2, title: 'Roadmap' },
  'STRESS_TEST': { phase: 2, title: 'Stress Test & Devil\'s Advocate' },
  'USER_PERSONAS': { phase: 3, title: 'User Personas' },
  'COMPETITIVE_POSITIONING': { phase: 3, title: 'Competitive Positioning' },
  'CUSTOMER_JOURNEY': { phase: 3, title: 'Customer Journey' },
  'SWOT_ANALYSIS': { phase: 3, title: 'SWOT Analysis' },
  'BRAND_GUIDELINES': { phase: 4, title: 'Brand Guidelines' },
  'DESIGN_TOKENS': { phase: 4, title: 'Design Tokens' },
  'DESIGN_SYSTEM': { phase: 4, title: 'Design System' },
  'COMPONENT_LIBRARY': { phase: 4, title: 'Component Library' },
  'LAYOUT_SYSTEM': { phase: 5, title: 'Layout System' },
  'WIREFRAMES': { phase: 5, title: 'Wireframes' },
  'UI_SPEC': { phase: 5, title: 'UI Specification' },
  'ARCHITECTURE': { phase: 6, title: 'Architecture' },
  'DATABASE_SCHEMA': { phase: 6, title: 'Database Schema' },
  'API_SPEC': { phase: 6, title: 'API Specification' },
  'INFRASTRUCTURE': { phase: 6, title: 'Infrastructure' },
  'AI_ARCHITECTURE': { phase: 6, title: 'AI Architecture' },
  'AI_GUARDRAILS': { phase: 6, title: 'AI Guardrails' },
  'DATA_GOVERNANCE': { phase: 6, title: 'Data Governance' },
  'AI_COMPLIANCE': { phase: 6, title: 'AI Compliance' },
  'WORKFLOWS': { phase: 7, title: 'Workflows & Automation' },
  'FEATURE_EXECUTION': { phase: 7, title: 'Feature Execution Guide' },
  'UX_AUDIT': { phase: 7, title: 'UX Audit' },
  'ARCHITECTURE_REVIEW': { phase: 7, title: 'Architecture Review' },
  'GROWTH_STRATEGY': { phase: 7, title: 'Growth Strategy' },
  'PITCH_DECK': { phase: 7, title: 'Pitch Deck' },
};

const PHASE_NAMES = {
  1: 'Discovery',
  2: 'Strategy',
  3: 'Audience',
  4: 'Brand & Design',
  5: 'UX & Wireframes',
  6: 'Engineering',
  7: 'Quality & Growth',
};

function getArtifactInfo(filename) {
  const base = filename.replace('.md', '').toUpperCase();
  return ARTIFACT_META[base] || { phase: 0, title: base };
}

// ─── CSS Styles ─────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    max-width: 720px;
    margin: 0 auto;
    padding: 40px;
    color: #1a1a2e;
    line-height: 1.7;
    font-size: 14px;
  }
  h1 { font-size: 28px; margin-top: 0; border-bottom: 2px solid #6366f1; padding-bottom: 8px; color: #1e1b4b; }
  h2 { font-size: 20px; color: #312e81; margin-top: 32px; }
  h3 { font-size: 16px; color: #4338ca; }
  code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  pre { background: #1e1b4b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; }
  pre code { background: none; color: inherit; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  th { background: #6366f1; color: white; padding: 8px 12px; text-align: left; }
  td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) { background: #f8fafc; }
  blockquote { border-left: 4px solid #6366f1; margin: 16px 0; padding: 8px 16px; background: #eef2ff; color: #3730a3; }
  ul, ol { padding-left: 24px; }
  li { margin: 4px 0; }
  a { color: #6366f1; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
`;

const COVER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #6366f1 100%);
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 60px;
  }
  .badge {
    display: inline-block;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 24px;
    padding: 6px 20px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }
  .title {
    font-size: 52px;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -1px;
  }
  .subtitle {
    font-size: 20px;
    font-weight: 300;
    opacity: 0.85;
    margin-bottom: 48px;
  }
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;
    width: 100%;
    max-width: 600px;
  }
  .meta-card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 20px 16px;
  }
  .meta-value {
    font-size: 32px;
    font-weight: 700;
  }
  .meta-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
    margin-top: 4px;
  }
  .divider {
    width: 80px;
    height: 2px;
    background: rgba(255,255,255,0.3);
    margin: 0 auto 24px;
  }
  .confidential {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 3px;
    opacity: 0.5;
    margin-top: 40px;
  }
  .date {
    font-size: 14px;
    opacity: 0.6;
  }
`;

const TOC_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    max-width: 720px;
    margin: 0 auto;
    padding: 60px 40px;
    color: #1a1a2e;
  }
  h1 {
    font-size: 28px;
    color: #1e1b4b;
    margin-bottom: 8px;
  }
  .toc-subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 40px;
  }
  .toc-phase {
    font-size: 13px;
    font-weight: 700;
    color: #6366f1;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 24px;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #e2e8f0;
  }
  .toc-entry {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 6px 0;
    font-size: 14px;
    color: #334155;
  }
  .toc-dots {
    flex: 1;
    border-bottom: 1px dotted #cbd5e1;
    margin: 0 8px;
    min-width: 40px;
  }
  .toc-page {
    color: #94a3b8;
    font-size: 13px;
    font-weight: 500;
  }
`;

// ─── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log('\n  +================================================+');
  console.log('  |  Founder Mode -- PDF Export                     |');
  console.log('  +================================================+\n');

  const docsDir = path.join(projectDir, 'docs');

  if (!fs.existsSync(docsDir)) {
    console.error(`  Error: No docs/ directory found in ${projectDir}`);
    console.error('  Tip: Run /new-project first to generate artifacts.\n');
    process.exit(1);
  }

  // Find all markdown files
  const mdFiles = fs.readdirSync(docsDir)
    .filter(f => f.endsWith('.md'))
    .sort();

  if (mdFiles.length === 0) {
    console.error('  Error: No markdown files found in docs/');
    process.exit(1);
  }

  console.log(`  Source: ${docsDir}`);
  console.log(`  Output: ${outputDir}`);
  console.log(`  Found ${mdFiles.length} documents\n`);

  // Ensure output dir
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Ensure dependencies
  ensureDependency('puppeteer');
  ensureDependency('markdown-it');

  const puppeteer = require('puppeteer');
  const MarkdownIt = require('markdown-it');
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

  // Launch browser
  const browser = await puppeteer.launch({ headless: 'new' });

  if (dossierMode) {
    // ─── Dossier Mode ──────────────────────────────────────────
    console.log(`  Generating Founder Dossier: "${projectTitle}"...\n`);

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    // Count phases represented
    const phases = new Set();
    mdFiles.forEach(f => {
      const info = getArtifactInfo(f);
      if (info.phase > 0) phases.add(info.phase);
    });

    // ── 1. Cover page ──
    const coverHtml = `<!DOCTYPE html><html><head><style>${COVER_CSS}</style></head><body>
      <div class="badge">Founder Dossier</div>
      <div class="title">${projectTitle}</div>
      <div class="subtitle">AI-Generated Product Strategy & Engineering Blueprint</div>
      <div class="meta-grid">
        <div class="meta-card"><div class="meta-value">${mdFiles.length}</div><div class="meta-label">Artifacts</div></div>
        <div class="meta-card"><div class="meta-value">${phases.size}</div><div class="meta-label">Phases</div></div>
        <div class="meta-card"><div class="meta-value">35</div><div class="meta-label">Max Possible</div></div>
      </div>
      <div class="divider"></div>
      <div class="date">${dateStr}</div>
      <div class="confidential">Confidential</div>
    </body></html>`;

    const coverPage = await browser.newPage();
    await coverPage.setContent(coverHtml, { waitUntil: 'networkidle0' });

    // ── 2. Table of Contents ──
    let tocEntries = '';
    let currentPhase = null;
    let pageNum = 3; // Cover=1, TOC=2, content starts at 3

    for (const file of mdFiles) {
      const info = getArtifactInfo(file);
      if (info.phase !== currentPhase && info.phase > 0) {
        currentPhase = info.phase;
        tocEntries += `<div class="toc-phase">Phase ${info.phase}: ${PHASE_NAMES[info.phase] || ''}</div>`;
      }
      const title = info.phase > 0 ? info.title : file.replace('.md', '');
      tocEntries += `<div class="toc-entry"><span>${title}</span><span class="toc-dots"></span><span class="toc-page">${pageNum}</span></div>`;
      pageNum++;
    }

    const tocHtml = `<!DOCTYPE html><html><head><style>${TOC_CSS}</style></head><body>
      <h1>Table of Contents</h1>
      <div class="toc-subtitle">${mdFiles.length} artifacts across ${phases.size} phases</div>
      ${tocEntries}
    </body></html>`;

    const tocPage = await browser.newPage();
    await tocPage.setContent(tocHtml, { waitUntil: 'networkidle0' });

    // ── 3. Content pages ──
    let contentHtml = '';
    for (const file of mdFiles) {
      const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
      const html = md.render(content);
      const info = getArtifactInfo(file);
      const phaseTag = info.phase > 0
        ? `<div style="font-size:11px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Phase ${info.phase}: ${PHASE_NAMES[info.phase] || ''}</div>`
        : '';
      contentHtml += `<div class="doc-section">${phaseTag}${html}</div><div style="page-break-after: always;"></div>`;
    }

    const contentFullHtml = `<!DOCTYPE html><html><head><style>${CSS}
      @page { @bottom-center { content: "${projectTitle} -- Founder Dossier"; font-size: 9px; color: #94a3b8; } }
    </style></head><body>${contentHtml}
      <div class="footer">Generated by Founder Mode | ${dateStr} | ${mdFiles.length} artifacts</div>
    </body></html>`;

    const contentPage = await browser.newPage();
    await contentPage.setContent(contentFullHtml, { waitUntil: 'networkidle0' });

    // ── Generate PDFs ──
    const pdfMargins = { top: '20mm', right: '15mm', bottom: '25mm', left: '15mm' };

    const coverPdf = await coverPage.pdf({ format: 'A4', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
    console.log('  [1/3] Cover page generated');

    const tocPdf = await tocPage.pdf({ format: 'A4', printBackground: true, margin: pdfMargins });
    console.log('  [2/3] Table of contents generated');

    const contentPdf = await contentPage.pdf({
      format: 'A4',
      printBackground: true,
      margin: pdfMargins,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;text-align:center;font-size:9px;color:#94a3b8;font-family:Inter,sans-serif;">
        ${projectTitle} &mdash; Founder Dossier &nbsp;|&nbsp; Page <span class="pageNumber"></span>
      </div>`,
    });
    console.log('  [3/3] Content pages generated');

    // ── Merge PDFs using pypdf-style buffer concat ──
    // Since we're in Node.js, we'll use a simple PDF merge
    // by reading the raw PDF buffers and using a basic merger
    const { PDFDocument } = await loadPdfLib();

    const mergedPdf = await PDFDocument.create();

    const coverDoc = await PDFDocument.load(coverPdf);
    const tocDoc = await PDFDocument.load(tocPdf);
    const contentDoc = await PDFDocument.load(contentPdf);

    const coverPages = await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices());
    coverPages.forEach(p => mergedPdf.addPage(p));

    const tocPages = await mergedPdf.copyPages(tocDoc, tocDoc.getPageIndices());
    tocPages.forEach(p => mergedPdf.addPage(p));

    const contentPages = await mergedPdf.copyPages(contentDoc, contentDoc.getPageIndices());
    contentPages.forEach(p => mergedPdf.addPage(p));

    // Set metadata
    mergedPdf.setTitle(`${projectTitle} - Founder Dossier`);
    mergedPdf.setSubject('AI-Generated Product Strategy & Engineering Blueprint');
    mergedPdf.setCreator('Founder Mode');
    mergedPdf.setProducer('Founder Mode PDF Export Skill');

    const mergedBytes = await mergedPdf.save();
    const safeName = projectTitle.replace(/[^a-zA-Z0-9]/g, '_');
    const outputPath = path.join(outputDir, `${safeName}_Founder_Dossier.pdf`);
    fs.writeFileSync(outputPath, mergedBytes);

    await coverPage.close();
    await tocPage.close();
    await contentPage.close();

    console.log(`\n  Dossier saved: ${outputPath}`);
    console.log(`  Total pages: ${mergedPdf.getPageCount()}`);
    console.log(`  Artifacts: ${mdFiles.length}`);
    console.log(`  Phases: ${phases.size}\n`);

  } else if (singleMode) {
    // ─── Single PDF Mode ──────────────────────────────────────────
    console.log('  Generating combined PDF...');

    let combinedHtml = '';
    for (const file of mdFiles) {
      const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
      const html = md.render(content);
      combinedHtml += `<div class="doc-section">${html}</div><div style="page-break-after: always;"></div>`;
    }

    const fullHtml = `<!DOCTYPE html><html><head><style>${CSS}</style></head><body>${combinedHtml}<div class="footer">Generated by Founder Mode · ${new Date().toLocaleDateString()}</div></body></html>`;

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    const outputPath = path.join(outputDir, 'FounderMode_Complete.pdf');
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    });

    console.log(`  Combined PDF: ${outputPath}\n`);
  } else {
    // ─── Individual PDFs ──────────────────────────────────────────
    for (let i = 0; i < mdFiles.length; i++) {
      const file = mdFiles[i];
      const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
      const html = md.render(content);
      const fullHtml = `<!DOCTYPE html><html><head><style>${CSS}</style></head><body>${html}<div class="footer">Generated by Founder Mode · ${new Date().toLocaleDateString()}</div></body></html>`;

      const page = await browser.newPage();
      await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

      const pdfName = file.replace('.md', '.pdf');
      const outputPath = path.join(outputDir, pdfName);
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
      });

      await page.close();
      console.log(`  [${i + 1}/${mdFiles.length}] ${pdfName}`);
    }
  }

  await browser.close();

  console.log(`\n  Export complete! PDFs saved to ${outputDir}\n`);
}

// ─── PDF-lib loader (for dossier merge) ─────────────────────────────
async function loadPdfLib() {
  try {
    return require('pdf-lib');
  } catch {
    console.log('  Installing pdf-lib...');
    execSync(`npm install --no-save pdf-lib`, { cwd: __dirname, stdio: 'pipe' });
    return require('pdf-lib');
  }
}

main().catch(err => {
  console.error('  Export failed:', err.message);
  process.exit(1);
});

