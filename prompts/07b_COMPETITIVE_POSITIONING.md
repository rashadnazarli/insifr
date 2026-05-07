# 07b — COMPETITIVE POSITIONING MATRIX

## Purpose
Create a visual 2×2 positioning framework that shows where this product sits relative to competitors — and identifies the "blue ocean" white space.

## Role
You are acting as a **Positioning Strategist** specializing in competitive differentiation and market mapping.

## Tier
Scaling, Series (visual companion to Market Research).

## Upstream Dependencies
- `docs/MARKET_RESEARCH.md` (Artifact 03)
- `docs/PORTERS_FIVE_FORCES.md` (Artifact 03b, if available)

## Required Inputs
- `@docs/MARKET_RESEARCH.md`
- `@docs/PORTERS_FIVE_FORCES.md` (if available)

## Before You Start — Ask These Questions
1. What two dimensions matter most to your target customer when choosing a solution?
2. How many direct competitors can you name? What's their positioning?
3. Is your differentiation based on price, features, experience, or something else?

## Operational Rules
- Choose axes that matter to the CUSTOMER, not just the founder.
- Axes must differentiate competitors — if everyone clusters in one quadrant, pick different axes.
- Plot at least 3 competitors plus the founder's product.
- Identify the white space and explain WHY it's valuable (not just empty).
- Include a defensibility check — can the founder actually hold their position?
- For any positioning claim lacking evidence, output `**DATA NEEDED:** [specific evidence needed]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# COMPETITIVE POSITIONING — [Product Name]

## 1. Axis Selection
## 2. Market Plot
## 3. Blue Ocean Analysis
## 4. Visual Matrix
## 5. Positioning Statement
## 6. Defensibility Check
## 7. GTM Implication
```

### Section Details
1. **Axis Selection** — Two axes with rationale for each. Include 2-3 alternative axis pairs considered and why each was rejected.
2. **Market Plot** — Table:

| Player | X-Axis Position | Y-Axis Position | Market Share Est. | Key Insight |
|---|---|---|---|---|

3. **Blue Ocean Analysis** — Where's the white space? Why is it valuable? Why hasn't anyone filled it?
4. **Visual Matrix** — Text-based 2×2 positioning diagram with competitors plotted
5. **Positioning Statement**:
   - Internal version (strategic — for the team)
   - Customer-facing version (marketing — for the landing page)
6. **Defensibility Check** — Can you hold this position? What would it take for a competitor to move into your quadrant?
7. **GTM Implication** — What your go-to-market should emphasize based on positioning

## Few-Shot Example (Partial)
> **Section 4 — Visual Matrix (Gold Standard):**
>
> ```
>                    HIGH AUTOMATION
>                         │
>         ┌───────────────┼───────────────┐
>         │               │               │
>         │   Competitor A│  ★ OUR        │
>         │   (Enterprise)│    PRODUCT    │
>  LOW    │               │               │  HIGH
>  COST ──┼───────────────┼───────────────┼── COST
>         │               │               │
>         │   DIY/Sheets  │  Competitor B │
>         │   (Manual)    │  (Premium)    │
>         │               │               │
>         └───────────────┼───────────────┘
>                         │
>                    LOW AUTOMATION
> ```
>
> **White space:** High automation + Low cost. Nobody occupies this because existing automation tools are enterprise-priced ($50K+/yr). Our PLG model + targeted integrations make this viable at $1K-3K/yr.

## Anti-Patterns (DO NOT)
- ❌ Choose axes where your product conveniently wins on both — that's bias, not strategy
- ❌ Ignore indirect competitors (spreadsheets, manual processes)
- ❌ Claim white space without explaining why nobody is there (maybe it's unviable?)
- ❌ Create a positioning statement that could apply to any product

## Save As
`docs/COMPETITIVE_POSITIONING.md`

## Prompt
```text
<role>
Act as a Positioning Strategist specializing in competitive differentiation and market mapping.
</role>

<context>
You are generating Artifact 07b of 35 in the Founder Mode system. This is a strategic framework artifact that creates a visual competitive map. It helps the founder articulate "why us" to investors, customers, and the team.
</context>

<upstream_artifacts>
Read:
- @docs/MARKET_RESEARCH.md — Sections 4 (Competitive Landscape table), 6 (Strategic Positioning), 7 (Entry Barriers)
- @docs/PORTERS_FIVE_FORCES.md — Section 5 (Competitive Rivalry), if available
</upstream_artifacts>

<task>
1. Think step by step:
   - What 2 dimensions do target customers actually use when choosing a tool?
   - Would these axes create meaningful separation between competitors?
   - Where is the white space, and WHY is it empty?
   - Can the founder defend their position in that white space?
2. Select 2 axes with rationale. Show 2-3 rejected alternatives.
3. Plot 3-5 competitors plus the founder's product in a text-based 2×2 matrix.
4. Identify blue ocean white space and explain its viability.
5. Write both internal (strategic) and customer-facing (marketing) positioning statements.
6. Assess defensibility and define GTM implications.
</task>

<output_format>
Markdown document with exactly 7 sections as specified in Output Requirements.
Market Plot must be a table. Visual Matrix must be a text-based 2×2 diagram.
Save as docs/COMPETITIVE_POSITIONING.md.
</output_format>

<constraints>
- Axes MUST matter to the customer, not just the founder.
- At least 1 indirect competitor (spreadsheets, manual process) MUST be plotted.
- White space analysis MUST explain why the space is empty AND why it's now viable.
- Positioning statements MUST be product-specific — not generic enough to fit any company.
- Use "DATA NEEDED: [specifics]" for market share estimates lacking sources.
</constraints>
```
