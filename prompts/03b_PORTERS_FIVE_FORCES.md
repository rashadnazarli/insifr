# 03b — PORTER'S FIVE FORCES ANALYSIS

## Purpose
Map the structural forces that shape industry profitability and competitive dynamics, giving the founder a clear picture of market attractiveness and defensibility.

## Role
You are acting as a **Strategic Analyst** specializing in competitive strategy and industry structure analysis.

## Tier
Scaling + Series (optional for Pre-PMF founders raising funding early).

## Upstream Dependencies
- `docs/MARKET_RESEARCH.md` (Artifact 03)

## Required Inputs
- `@docs/MARKET_RESEARCH.md`

## Before You Start — Ask These Questions
1. What industry category does this product compete in?
2. Who are the key suppliers your product depends on (infrastructure, APIs, data)?
3. Do your customers have many alternatives? What would make them switch?

## Operational Rules
- Rate each force as HIGH / MEDIUM / LOW with specific evidence, not opinion.
- Be brutally honest — investors will fact-check vague claims.
- Include a concrete "Your advantage" and "Risk" for each force.
- End with actionable steps to strengthen the founder's position.
- For any claim lacking evidence, output `**DATA NEEDED:** [specific data point required]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# PORTER'S FIVE FORCES — [Product Name]

## 1. Threat of New Entrants — [HIGH/MEDIUM/LOW]
## 2. Bargaining Power of Suppliers — [HIGH/MEDIUM/LOW]
## 3. Bargaining Power of Buyers — [HIGH/MEDIUM/LOW]
## 4. Threat of Substitutes — [HIGH/MEDIUM/LOW]
## 5. Competitive Rivalry — [HIGH/MEDIUM/LOW]
## 6. Overall Threat Level
## 7. Pitch Version
```

### Section Details
1. **Threat of New Entrants** — [HIGH/MEDIUM/LOW]
   - Barriers to entry: capital, expertise, brand, switching costs, distribution
   - Your advantage and biggest risk

2. **Bargaining Power of Suppliers** — [HIGH/MEDIUM/LOW]
   - Key suppliers (infra, talent, data)
   - Concentration risk and mitigation checklist

3. **Bargaining Power of Buyers** — [HIGH/MEDIUM/LOW]
   - Customer concentration, switching costs, price sensitivity
   - Lock-in factors

4. **Threat of Substitutes** — [HIGH/MEDIUM/LOW]
   - Direct substitutes, DIY/manual solutions
   - Switching triggers and defensibility

5. **Competitive Rivalry** — [HIGH/MEDIUM/LOW]
   - Market growth, competitor count, price vs. value competition
   - Competitive advantages checklist

6. **Overall Threat Level** — `ATTRACTIVE` / `MODERATE` / `UNATTRACTIVE`
   - Strongest position, weakest position
   - 3 immediate actions to strengthen

7. **Pitch Version** — 3-sentence investor summary

## Few-Shot Example (Partial)
> **Section 1 — Threat of New Entrants (Gold Standard):**
>
> **Rating: MEDIUM**
>
> **Barriers to entry:**
> - Capital: LOW — cloud infrastructure costs ~$500/mo to start; no hardware moat
> - Expertise: MEDIUM — requires domain knowledge in SaaS billing reconciliation; but not patentable
> - Brand: LOW — no established brands in this niche; trust built through integrations
> - Switching costs: MEDIUM — once integrated with customer's billing stack, migration costs ~2 weeks of engineering
> - Distribution: LOW — PLG motion accessible to any startup
>
> **Your advantage:** Deep integration with 5+ billing systems creates a "data gravity" moat that increases with usage.
> **Risk:** A well-funded competitor (e.g., Stripe) could build this as a feature, not a product.

## Anti-Patterns (DO NOT)
- ❌ Rate all forces as LOW — that's either dishonest or a sign of a non-existent market
- ❌ Skip the mitigation steps — identifying risk without a plan is useless
- ❌ Ignore the "DIY / do nothing" substitute — it's always a competitor
- ❌ Confuse "no competitors" with "low rivalry" — lack of competition may signal lack of market
- ❌ Provide ratings without specific evidence backing each one

## Downstream Consumers
This artifact feeds into:
- `docs/COMPETITIVE_POSITIONING.md` (07b)
- `docs/PRODUCT_STRATEGY.md` (04)
- `docs/PITCH_DECK.md` (25)

## Save As
`docs/PORTERS_FIVE_FORCES.md`

## Prompt
```text
<role>
Act as a Strategic Analyst specializing in competitive strategy and industry structure analysis (Porter's framework).
</role>

<context>
You are generating Artifact 03b of 35 in the Founder Mode system. This is a strategic framework artifact for Scaling/Series tier founders. It provides investors and founders with a structural analysis of market attractiveness.
</context>

<upstream_artifacts>
Read @docs/MARKET_RESEARCH.md — specifically:
- Section 1 (Market Category)
- Section 4 (Competitive Landscape table)
- Section 7 (Entry Barriers)
- Section 9 (Key Risks)
</upstream_artifacts>

<task>
1. Think step by step for each force:
   - What specific evidence from the market research supports the rating?
   - What is the founder's advantage in this force?
   - What is the biggest risk, and how can it be mitigated?
2. Rate each of the five forces as HIGH / MEDIUM / LOW with specific evidence.
3. Identify the founder's strongest and weakest position.
4. Provide 3 concrete actions to strengthen competitive position.
5. Write a 3-sentence investor pitch version of the analysis.
</task>

<output_format>
Markdown document with exactly 7 sections as specified in Output Requirements.
Each force section must include: Rating, Evidence, Your Advantage, Risk.
Save as docs/PORTERS_FIVE_FORCES.md.
</output_format>

<constraints>
- Every rating MUST have specific evidence — no opinion-only ratings.
- Do NOT rate all forces as LOW — provide honest, differentiated ratings.
- The "DIY / do nothing" option MUST be included as a substitute.
- Use "DATA NEEDED: [specifics]" for any rating that lacks supporting evidence.
</constraints>
```
