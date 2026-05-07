# 04b — MECE PROBLEM BREAKDOWN

## Purpose
Decompose the core problem into mutually exclusive, collectively exhaustive branches so the founder understands the full problem landscape and can make informed prioritization decisions.

## Role
You are acting as a **Strategy Consultant** specializing in structured problem analysis and issue tree decomposition.

## Tier
Pre-PMF, Scaling, Series (foundational rigor — useful at every stage).

## Upstream Dependencies
- `docs/IDEA.md` (Artifact 01)
- `docs/PROBLEM_VALIDATION.md` (Artifact 02)

## Required Inputs
- `@docs/IDEA.md`
- `@docs/PROBLEM_VALIDATION.md`

## Before You Start — Ask These Questions
1. What is the single core problem this product solves?
2. Are there secondary problems the product also addresses?
3. Which user persona experiences the problem most acutely?

## Operational Rules
- Each branch must be distinct — no overlap between categories.
- All branches together must cover 100% of the problem space.
- Each branch should be independently solvable (gives the founder choices).
- Include severity × frequency scoring for prioritization.
- Map branches to personas so the founder knows who to build for first.
- For any claim lacking evidence, output `**DATA NEEDED:** [specific data point required]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# MECE PROBLEM BREAKDOWN — [Product Name]

## 1. Problem Tree
## 2. Secondary Problems
## 3. MECE Validation Checklist
## 4. Problem Priority Ranking
## 5. Customer Context
## 6. Problem Solving Vectors
## 7. Competitive Implication
## 8. Pitch Version
```

### Section Details
1. **Problem Tree** — Root problem with 3-5 branches. For each branch:

| Branch | Manifestation | Impact | Current Workaround | Severity (1-5) | Frequency (1-5) | Score |
|---|---|---|---|---|---|---|

2. **Secondary Problems** — If applicable, same tree structure
3. **MECE Validation Checklist** — Answer YES/NO to each:
   - Each branch is different? (No overlapping)
   - All branches together = 100% of the problem?
   - Can you solve Branch 1 without solving Branch 2?
   - Could a competitor solve only one branch and be valuable?
4. **Problem Priority Ranking** — Table with frequency, severity, cost if unsolved, and MVP focus yes/no
5. **Customer Context** — Which personas experience which branches most
6. **Problem Solving Vectors** — For each priority branch: speed, cost, accuracy, integration levers
7. **Competitive Implication** — Unique angle and defensibility
8. **Pitch Version** — 2-sentence problem positioning

## Few-Shot Example (Partial)
> **Section 1 — Problem Tree (Gold Standard):**
>
> **Root Problem:** SaaS companies lose revenue due to billing-usage data disconnects.
>
> | Branch | Manifestation | Impact | Workaround | Severity | Frequency | Score |
> |---|---|---|---|---|---|---|
> | B1: Data sync lag | Usage data reaches billing 48-72 hrs late | Revenue leakage 3-7% ARR | Manual CSV exports | 5 | 5 | 25 |
> | B2: Format mismatch | Each system uses different customer IDs | Failed joins, orphan records | VLOOKUP cleanup scripts | 4 | 4 | 16 |
> | B3: Audit trail gaps | No single source of truth for disputes | Customer trust erosion | Ad-hoc spreadsheet audits | 3 | 3 | 9 |
>
> **MVP Focus:** B1 (highest score, highest pain, clearest ROI narrative).

## Anti-Patterns (DO NOT)
- ❌ Create branches that overlap — that defeats the purpose of MECE
- ❌ List features instead of problems — this is about the problem space, not the solution
- ❌ Skip the "Could a competitor solve only one branch?" test — it reveals positioning
- ❌ Put everything in the MVP — MECE should help you cut scope ruthlessly

## Save As
`docs/MECE_PROBLEM_BREAKDOWN.md`

## Prompt
```text
<role>
Act as a Strategy Consultant specializing in structured problem analysis and MECE issue tree decomposition.
</role>

<context>
You are generating Artifact 04b of 35 in the Founder Mode system. This is a strategic framework artifact that helps founders see the full problem landscape and prioritize ruthlessly.
</context>

<upstream_artifacts>
Read both:
- @docs/IDEA.md — Sections 3 (Problem Statement), 5 (Current Alternatives)
- @docs/PROBLEM_VALIDATION.md — Sections 4 (Evidence Inventory), 7 (Riskiest Assumption)
</upstream_artifacts>

<task>
1. Think step by step:
   - What is the single root problem?
   - What are 3-5 distinct branches (mutually exclusive)?
   - Do all branches together cover 100% of the problem space?
   - Which branch has the highest severity × frequency score?
2. Decompose the core problem into 3-5 MECE branches.
3. Score each branch by severity × frequency.
4. Validate the MECE property with the checklist.
5. Identify which branches are MVP-critical and which are post-PMF.
6. Map branches to user personas.
7. End with a 2-sentence pitch version.
</task>

<output_format>
Markdown document with exactly 8 sections as specified in Output Requirements.
Problem Tree must be presented as a table with severity × frequency scores.
Save as docs/MECE_PROBLEM_BREAKDOWN.md.
</output_format>

<constraints>
- Branches MUST be mutually exclusive — if you find overlap, restructure.
- All branches MUST be collectively exhaustive — if you find a gap, add a branch.
- Do NOT list more than 5 branches — forcing constraint reveals the real structure.
- Use "DATA NEEDED: [specifics]" for any scoring that lacks evidence.
</constraints>
```
