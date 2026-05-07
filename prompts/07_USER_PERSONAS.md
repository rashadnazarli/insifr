# 07 — USER PERSONAS

## Purpose
Define exactly WHO the product is for with enough behavioral depth that the AI can make autonomous UI and UX decisions later.

## Role
You are acting as a **Behavioral UX Researcher** specializing in the Jobs-To-Be-Done (JTBD) framework.

## Upstream Dependencies
- `docs/PRD.md` (Artifact 05)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)

## Required Inputs
- `@docs/PRD.md`
- `@docs/PRODUCT_STRATEGY.md`

## Operational Rules
- Create 2 personas maximum (primary + secondary). More than 2 dilutes focus.
- Use JTBD framework — focus on what the user is trying to ACCOMPLISH, not demographics.
- Include specific frustrations, not generic pain points.
- Personas must be actionable — a designer should be able to make layout decisions from this.
- For any behavioral claim lacking user research, output `**DATA NEEDED:** [specific research needed]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# USER PERSONAS — [Product Name]

## Primary Persona: [Name]
### 1. Name & Role
### 2. Demographic Context
### 3. Jobs-To-Be-Done
### 4. Pain Points & Frustrations
### 5. Current Tools & Workarounds
### 6. Information Diet
### 7. Success Criteria
### 8. Decision-Making Process
### 9. Quotes

## Secondary Persona: [Name]
### 1-9. (Same structure)
```

### Section Details (Per Persona)
1. **Name & Role** — realistic name, specific job title, years of experience, context
2. **Demographic Context** — industry, company size (if B2B), relevant constraints
3. **Jobs-To-Be-Done** — functional, emotional, and social jobs they're hiring this product to do
4. **Pain Points & Frustrations** — specific daily roadblocks in current workflow (minimum 3, each with frequency)
5. **Current Tools & Workarounds** — what they use today and why it doesn't fully work
6. **Information Diet** — where they learn about new tools (specific channels, not just "social media")
7. **Success Criteria** — what specific, measurable outcome makes them feel successful
8. **Decision-Making Process** — how they evaluate and adopt new tools (free trial, peer rec, boss mandates)
9. **Quotes** — 2-3 realistic verbatim quotes that capture their mindset

## Few-Shot Example (Partial)
> **Primary Persona — Pain Points & Frustrations (Gold Standard):**
>
> 1. **Wednesday 3pm ritual** — Every week, Sarah spends 3 hours in Google Sheets pulling Stripe exports and cross-referencing with HubSpot deal records. She calls it "Spreadsheet Wednesday." (Frequency: Weekly)
> 2. **The orphan invoice problem** — ~15% of invoices can't be matched to a CRM deal because the customer used a different email. She manually searches by company name, which takes 8-12 minutes per orphan. (Frequency: 20-30 orphans/month)
> 3. **Month-end fire drill** — CFO wants a reconciled billing report by the 3rd business day. Sarah usually doesn't finish until the 5th, causing friction. (Frequency: Monthly)
>
> *Notice: Each pain point is named, specific, and includes frequency. A designer reading this knows exactly what "primary task" the UI must solve.*

## Anti-Patterns (DO NOT)
- ❌ Create "Marketing Manager Mary" with generic demographics and no behavioral depth
- ❌ Create more than 2 personas — focus beats coverage
- ❌ List demographics without JTBD — age/gender/location is useless without behavioral context
- ❌ Use vague pain points like "wants to save time" — be specific about WHAT takes too long and WHY
- ❌ Write quotes that sound corporate — real users swear, complain, and speak informally

## Downstream Consumers
This artifact feeds into:
- `docs/CUSTOMER_JOURNEY.md` (08)
- `docs/WIREFRAMES.md` (14)
- `docs/UI_SPEC.md` (15)
- `docs/UX_AUDIT.md` (22)

## Save As
`docs/USER_PERSONAS.md`

## Prompt
```text
<role>
Act as a Behavioral UX Researcher specializing in the Jobs-To-Be-Done (JTBD) framework.
</role>

<context>
You are generating Artifact 07 of 35 in the Founder Mode system. These personas drive every design and UX decision downstream. They must be specific enough that a designer can make autonomous layout decisions without asking the founder.
</context>

<upstream_artifacts>
Read both:
- @docs/PRD.md — Sections 3 (Target Users), 4 (Core Use Cases), 5 (User Stories)
- @docs/PRODUCT_STRATEGY.md — Sections 3 (Target Segment), 4 (Wedge Strategy)
</upstream_artifacts>

<task>
1. Think step by step:
   - What functional job is the user hiring this product to do?
   - What emotional job? (feel competent, reduce anxiety, impress the boss)
   - What social job? (look good to peers, demonstrate expertise)
   - What are the specific, named frustrations in their daily workflow?
2. Create 2 deeply specific user personas (primary + secondary).
3. Focus on behavior, frustrations, and decision-making — not demographics.
4. Each persona must include 2-3 realistic verbatim quotes.
5. Pain points must be specific, named, and include frequency.
</task>

<output_format>
Markdown document with 2 persona profiles, each containing exactly 9 sections as specified.
Pain points must include specific frequency (daily/weekly/monthly).
Quotes must sound like real people, not corporate language.
Save as docs/USER_PERSONAS.md.
</output_format>

<constraints>
- Maximum 2 personas — do NOT create more.
- Every pain point MUST include frequency and specific context.
- Quotes MUST sound like real humans, not marketing copy.
- JTBD must cover functional, emotional, AND social dimensions.
- Use "DATA NEEDED: [specifics]" for any behavioral assumption lacking user research.
</constraints>
```
