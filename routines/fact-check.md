---
description: Verify factual claims before asserting them. Covers products, competitors, technologies, market data, and version numbers. Priority is higher than all other research — wrong facts corrupt everything downstream.
---

# Fact Verification Workflow

> Adapted from huashu-design's Core Principle #0 — "事实验证先于假设" (Fact verification before assumption).
> The cost of a WebSearch is 10 seconds. The cost of building on a wrong assumption is 1–2 hours of rework.

## When to Trigger

Run this routine **before** asserting any of the following:

| Claim Type | Example |
|---|---|
| Product existence or status | "Competitor X launched feature Y" |
| Version numbers | "React 19 supports..." |
| Market statistics | "The TAM is $4.2B" |
| Competitor features | "Stripe doesn't support..." |
| Technology capabilities | "Firebase can handle..." |
| Regulatory status | "GDPR requires..." |
| Pricing or business model | "They charge $49/mo" |

**Self-check**: If you catch yourself thinking any of these, stop and search:
- "I believe X launched in..."
- "X probably has..."
- "As far as I know..."
- "I remember reading that..."
- "X doesn't exist yet"
- "The latest version is..."

## Steps

### 1. Search

Use web search with the claim + recency qualifiers:

```
<product/technology name> + "2026" OR "latest" OR "release" OR "specs" OR "pricing"
```

Search at least 2 different phrasings to avoid confirmation bias.

### 2. Read Authoritative Sources

Read 2–3 results, prioritizing:
1. Official product pages / documentation
2. Official press releases or blog posts
3. Reputable tech publications (TechCrunch, The Verge, official docs)

**Do not** rely on:
- Reddit comments or forum speculation
- AI-generated summary sites
- Undated content with no author

### 3. Record

Append verified facts to `docs/VERIFIED_FACTS.md` (create if absent):

```markdown
## <Product/Topic>
- **Verified**: <date>
- **Source**: <URL>
- **Status**: <what was confirmed>
- **Used in**: <which artifact references this fact>
```

### 4. Handle Ambiguity

If search results are:
- **Contradictory** → cite both sources, ask the founder to decide
- **Missing** → state "I could not verify X" and ask the founder — do not assume
- **Outdated** (all sources >6 months old) → flag as potentially stale

**Never** fill the gap with a plausible guess. An honest "unverified" label is infinitely better than a confident wrong assertion.

## Integration Points

This routine is referenced by:
- `routines/new-project.md` — Phase 1 Discovery (before writing MARKET_RESEARCH.md, IDEA.md)
- `routines/review.md` — Quality Smell Check (reviewer verifies factual claims)
- `skills/deep-research/` — Before synthesizing findings into artifacts
- Any skill that references competitor products, market data, or technology capabilities

## Rules

- **Priority**: This routine has higher priority than clarifying questions. Verify facts first, then ask strategy questions — because wrong facts make all questions meaningless.
- **No silent assumptions**: If you skip verification, you must explicitly state "UNVERIFIED ASSUMPTION: ..." in the artifact.
- **Cascade check**: If a fact changes after verification (you were wrong), identify all artifacts that depend on it and flag them for revision per the Revision Protocol in `FOUNDER_MODE.md`.
