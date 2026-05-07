---
description: Run a mandatory quality gate checkpoint between development phases. Gates are ENFORCED — the AI must refuse to proceed if checks fail.
---

# Phase Gate Workflow

## Enforcement Rules

**Quality gates are technically enforced, not just suggested.**

Before generating ANY artifact, the AI MUST verify that all prerequisite artifacts exist:

| Attempting to generate... | Prerequisites that MUST exist in `docs/` |
|---------------------------|----------------------------------------|
| Phase 4 artifacts (09-13) | ALL of: IDEA.md, PROBLEM_VALIDATION.md, MARKET_RESEARCH.md, PRODUCT_STRATEGY.md, PRD.md, ROADMAP.md, USER_PERSONAS.md, CUSTOMER_JOURNEY.md |
| Phase 5 artifacts (14-15) | ALL Phase 4 artifacts + BRAND_GUIDELINES.md, DESIGN_TOKENS.md, DESIGN_SYSTEM.md, COMPONENT_LIBRARY.md, LAYOUT_SYSTEM.md |
| Phase 6 artifacts (16-19) | ALL Phase 5 artifacts + WIREFRAMES.md, UI_SPEC.md |
| Phase 7 artifacts (20-25) | ALL Phase 6 artifacts + ARCHITECTURE.md, DATABASE_SCHEMA.md, API_SPEC.md, INFRASTRUCTURE.md |
| AI artifacts (26-29) | Phase 6 artifacts + AI_PRODUCT flag must be true |
| Framework artifacts (3b-8b) | The corresponding core artifact must exist first |

**If prerequisites are missing, the AI MUST:**
1. List the specific missing artifacts
2. Explain which phase they belong to
3. Offer to generate them now
4. **REFUSE to skip ahead** — even if the founder insists

**The only exception:** `--technical` mode, which starts at Phase 4 and accepts a verbal brief in place of formal Phase 1-3 artifacts.

---

## Pre-Build Sanity Check (Universal)

> Adapted from huashu-design's "位置四问" (Four Position Questions). Before executing any phase, the agent must answer these four questions and present them to the founder. Direction errors caught here cost 10 minutes; caught after a phase is complete they cost 10x.

**Before running any phase-specific checklist below, the agent MUST answer:**

### 1. User Context
> Who is the end user? What's their environment, device, platform, and technical sophistication?

The answer must be specific (not "users want a good experience"). Reference `docs/USER_PERSONAS.md` if it exists.

### 2. Emotional Register
> What should the user feel when interacting with this phase's output? Pick one primary emotion.

Examples: urgency, trust, delight, calm, authority, empowerment. This drives tone in copy, density in design, and rigor in engineering.

### 3. Scope Bound
> Can this phase be completed within its expected budget (time, tokens, complexity)? Is there scope creep risk?

If the phase is trying to do more than its artifact list requires, flag it. Especially watch for Phase 6 (Engineering) expanding into Phase 7 (Launch) work.

### 4. Artifact Conflicts
> Does anything planned for this phase contradict an already-approved artifact from a previous phase?

Cross-check against the most recent gate approval. If a conflict exists, trigger the Revision Protocol from `FOUNDER_MODE.md` before proceeding.

**Enforcement**: The agent must present all 4 answers to the founder and receive acknowledgment before starting the phase. If any answer reveals a problem (scope creep, conflict, unclear user context), resolve it first.

---

## Steps

1. Determine which phase was just completed by checking which artifacts exist in `docs/`.

2. Run the appropriate checklist:

### After Phase 1 (Discovery)
**Note: Research context check** — If `.research-context/` exists (imported from NotebookLM):
- [ ] `research-metadata.json` is valid (passes schema check)
- [ ] Quality score is ≥ 70% (or founder approved override)
- [ ] Key insights extracted and documented
- [ ] Assumptions to validate are identified
- [ ] Founder reviewed research summary
- [ ] Discovery answers are pre-filled from research (if applicable)

If no research context exists, skip the above and proceed to standard checks.

**Standard Discovery checks:**
- [ ] `docs/IDEA.md` exists and has all 11 sections
- [ ] `docs/PROBLEM_VALIDATION.md` exists with evidence of real user pain
- [ ] Evidence is grounded in research (or interviews/data collected)
- [ ] Key assumptions are explicitly listed
- [ ] Open questions identified for hypothesis testing

### After Phase 1-3 (Discovery + Strategy + Audience)
- [ ] All Phase 1 discovery checks passed
- [ ] `docs/MARKET_RESEARCH.md` exists with competitive analysis
- [ ] `docs/PRODUCT_STRATEGY.md` exists with clear differentiation
- [ ] `docs/PRD.md` exists with MVP scope clearly defined
- [ ] `docs/ROADMAP.md` exists with realistic milestones
- [ ] `docs/USER_PERSONAS.md` exists with JTBD framework applied
- [ ] `docs/CUSTOMER_JOURNEY.md` exists with 5 lifecycle stages mapped
- [ ] No open questions remain unresolved from any artifact
- [ ] PRD success metrics (KPIs) are specific and measurable
- [ ] **Cross-artifact consistency:** PRD features match Roadmap milestones, Personas match Journey stages
- [ ] **If research context exists:** Discovery artifacts reference research sources (attribution in docs)

### After Phase 4 (Brand & Design)
- [ ] `docs/BRAND_GUIDELINES.md` exists with hex codes and font choices
- [ ] `docs/DESIGN_TOKENS.md` exists with all token categories
- [ ] `docs/DESIGN_SYSTEM.md` exists with interaction rules
- [ ] `docs/COMPONENT_LIBRARY.md` exists with component catalog
- [ ] `docs/LAYOUT_SYSTEM.md` exists with page templates
- [ ] Design tokens are internally consistent (no conflicting values)
- [ ] Brand colors, fonts match between BRAND_GUIDELINES and DESIGN_TOKENS
- [ ] `docs/DESIGN_TOKENS.md` includes a CSS Variables section with all token definitions

### After Phase 5 (UX)
- [ ] `docs/WIREFRAMES.md` exists for all core screens
- [ ] `docs/UI_SPEC.md` exists with screen-by-screen specs
- [ ] Wireframes reference layout templates correctly
- [ ] UI spec references components from the component library
- [ ] All PRD features have corresponding UI screens

### After Phase 6 (Engineering)
- [ ] `docs/ARCHITECTURE.md` exists with stack justification
- [ ] `docs/DATABASE_SCHEMA.md` exists with all entities defined
- [ ] `docs/API_SPEC.md` exists with all endpoints documented
- [ ] `docs/INFRASTRUCTURE.md` exists with deployment plan
- [ ] Stack choice aligns with project complexity (no over-engineering)
- [ ] Schema supports all use cases defined in PRD
- [ ] API covers all features in the roadmap MVP
- [ ] No conflicts between ARCHITECTURE and PRD requirements
- [ ] **If AI_PRODUCT:** AI Architecture, Guardrails, Governance, and Compliance artifacts exist

### After Strategic Frameworks (Consultant / Full mode only)
- [ ] Framework artifacts reference the correct core artifacts
- [ ] Porter's Five Forces references MARKET_RESEARCH.md
- [ ] MECE references IDEA.md and PROBLEM_VALIDATION.md
- [ ] Hypothesis Plan references MECE output
- [ ] SWOT references Porter's and Market Research
- [ ] Competitive Positioning Matrix references Porter's
- [ ] Stress Test references PRD and Growth Strategy
- [ ] All frameworks are internally consistent with each other

3. Report results:
   - ✅ All checks passed — proceed to next phase
   - ⚠️ Minor gaps — list them but allow proceeding with founder acknowledgment
   - ❌ Critical failures — list specific gaps, recommend fixes, **block proceeding**

4. **If any critical check fails, do NOT proceed to the next phase.** Fix the gaps first.

5. **Founder approval required.** After presenting results, explicitly ask:
   > "All checks passed. Do you approve this phase gate and want to proceed to Phase [N]?"

   Wait for explicit "yes" / "approved" / "proceed" before continuing.

## Rules
- Quality gates are mandatory — never skip
- Be honest about gaps — partial artifacts count as failures
- The founder must explicitly approve the gate before proceeding
- If the founder says "skip the gate" — explain the risk, but if they insist twice, allow it with a warning logged to `docs/GATE_OVERRIDES.md` (create it if absent)
- Cross-artifact consistency matters as much as individual completeness

---

## Research Context (Manual Inspection)

If a `.research-context/` folder or equivalent research notes exist in the project:

### Phase 1 Gate with Research
1. **Detect research context:** Check for any folder containing exported research, interview notes, or market data.
2. **Display summary:** Show sources, key insights, and open questions identified.
3. **Validate quality:** If research is thin (fewer than 3 sources), flag it but allow override.
4. **Pre-fill questionnaire:** Use research to suggest answers to the 20-question elicitation — confirm each with the founder.
5. **Enforce attribution:** Require discovery docs to cite sources where possible.
6. **Unlock Phase 2:** Only after founder approves both research AND discovery artifacts.

> **Note:** Research context integration is handled by inspection, not programmatically. Check for research folders manually before running the Phase 1 gate.
