# Import Research Context

**Slash command:** `/import-research`

Import NotebookLM research exports into the current Founder Mode project. This bridges the two tools: research comes from NotebookLM, strategy comes from Founder Mode.

---

## What This Does

When executed, `/import-research` will:

1. **Detect** if `.research-context/` folder exists
2. **Validate** the research metadata against the schema
3. **Display** research summaries (market, competitive, customer insights)
4. **Pre-fill** Phase 1 (Discovery) questionnaire with research findings
5. **Lock** research context (can't proceed past Phase 1 without review)
6. **Show** quality metrics and source attribution

---

## Usage

```bash
/import-research
```

Or with a specific path:

```bash
/import-research /path/to/research-context
```

---

## Output Example

```
╔══════════════════════════════════════════════════════════════╗
║           📚 RESEARCH CONTEXT IMPORTED                       ║
╚══════════════════════════════════════════════════════════════╝

Project: FinTech Payments Platform
Notebook ID: abc123def456
Generated: 2026-04-13 14:22:00 UTC

📊 QUALITY METRICS
  Overall Score: 87%  ✓ STRONG
  Sources Ingested: 8
  Coverage: 100%
  Recency: 92%
  Citation Density: 78%

📚 RESEARCH ARTIFACTS

🔍 MARKET RESEARCH
  └─ TAM: $450B  |  SAM: $120B  |  SOM: $1.2B
  └─ Growth Rate: 18% CAGR (2024-2028)
  └─ Key Trends: Real-time payments, embedded fintech, BNPL

🏆 COMPETITIVE ANALYSIS
  └─ Key Players: Stripe, Square, Wise
  └─ Market Position: Crowded but growing, niche opportunities
  └─ Competitive Advantage Required: White-label + compliance

👥 CUSTOMER RESEARCH
  └─ Primary Segments: SMBs, E-commerce, Gig economy
  └─ Top Pain Points:
     • High payment processing fees (average 2.9%)
     • 2-3 day settlement delays
     • Compliance burden in 15+ jurisdictions

✅ VALIDATION FINDINGS
  └─ 12 customer interviews conducted
  └─ 87% have experienced payment friction
  └─ Willingness to pay: +12% premium for instant settlement

─────────────────────────────────────────────────────────────

KEY INSIGHTS (5)
  1. SMBs lose $8K-25K monthly due to settlement delays
  2. Emerging markets have highest demand (90% interest rate)
  3. Regulatory fragmentation is main barrier to entry
  4. AI-powered compliance is emerging competitive advantage
  5. B2B2C model is fastest path to scale

ASSUMPTIONS TO VALIDATE
  ☐ Settlement speed is top priority (confidence: 82%)
  ☐ Customers willing to integrate new platform (confidence: 71%)
  ☐ Regulatory approvals take <6 months (confidence: 45%)

─────────────────────────────────────────────────────────────

📎 SOURCES (8 total)
  ✓ https://mckinsey.com/fintech-2026-report
  ✓ https://cbinsights.com/payments-landscape
  ✓ Local file: customer-interviews.pdf
  ✓ Local file: market-sizing.xlsx
  ... and 4 more

─────────────────────────────────────────────────────────────

⚠️  NEXT STEPS

1️⃣  Review research summaries above
2️⃣  Approve quality (currently 87% — good to proceed)
3️⃣  Confirm assumptions for Phase 1 validation
4️⃣  Run: /phase-gate (to lock research and move to Phase 2)

```

---

## Phase Integration

### Phase 1: Discovery (Current)
- ✓ Research context is attached
- ✓ Founder reviewed summaries  
- ✓ Quality score ≥ 70% (option to override)
- → Run `/phase-gate discovery` to lock and proceed

### Phase 2+: Strategy & Beyond
- Research context remains accessible via:
  - Inline references in prompts
  - `.research-context/research-metadata.json` for programmatic access
  - Individual markdown files for reading

---

## Implementation Details

### File Structure Created
```
my-founder-mode-project/
├── .research-context/
│   ├── research-metadata.json      # Machine-readable metadata
│   ├── market-research.md          # Market sizing, TAM/SAM/SOM
│   ├── competitive-analysis.md     # Competitive landscape
│   ├── customer-research.md        # Customer interviews, pain points
│   ├── validation-findings.md      # Hypothesis testing results
│   └── sources_manifest.json       # Source attribution (optional)
└── docs/
    └── IDEA.md                     # Often pre-filled from discovery; align with prompts/01 workflow
```

### JSON Schema
Research metadata must validate against `schemas/research-context-schema.json` in the Founder Mode repo (copy `schemas/` with `routines/apply-founder-mode.md` if needed):
- ✓ Valid `notebook_id`
- ✓ `sources` array with URLs
- ✓ `quality_score` (0-1)
- ✓ `artifacts` with summaries
- ✓ `generated_at` timestamp

---

## Options

### Approve & Continue
```
/import-research
  → Review summaries
  → Confirm assumptions
  → /phase-gate discovery
```

### Reject & Reimport
```
/import-research --reimport
```
This clears the research context and allows re-importing.

### View Details Only
```
/import-research --summary-only
```
Display metrics without pre-filling questionnaire.

### Export for Stakeholders
```
/import-research --export-report html
```
Generates a stakeholder-friendly HTML report from research.

---

## Scaling to Option C

In the future (Option C), this skill will:
- ✅ Pass raw sources to prompts (not just summaries)
- ✅ Enable ghostwriting enhancement (NotebookLM refines artifact drafts)
- ✅ Trigger automatic competitive positioning matrix generation
- ✅ Feed source data into guardrails for hallucination detection

For now (Option A), it's a **sequential import with review gates**.

No breaking changes — the data model is already structured for Option C.

---

## Troubleshooting

**Q: ".research-context/ not found"**
- A: Run `export_for_founder_mode()` in NotebookLM first, or ensure the folder exists.

**Q: "Quality score is 45%, too low to proceed"**
- A: Add more sources to NotebookLM (need 5+), or run deeper research.
- Override with: `/import-research --force` (not recommended — quality gates exist for a reason)

**Q: "Some artifacts are empty"**
- A: NotebookLM hasn't generated those research packs yet. Try running research prompts first.

---

**Built with Option A → Option C architecture. Zero disruption as you upgrade.**
