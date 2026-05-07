---
description: Initialize a new project by generating artifacts in sequence. Supports modes (--full, --starter, --business, --technical, --consultant)
---

# New Project Initialization

## Project Modes

When the founder says `/new-project`, ask which mode they want. If they specify a flag, use that mode directly.

| Mode | Flag | Scope | Use Case |
|------|------|-------|----------|
| **Full** | `--full` (default) | Phases 1–7 per sequence below (through **30** where tier applies) + conditional frameworks / AI pack | Serious build from idea through launch docs |
| **Starter** | `--starter` | 7 essential artifacts | Quick MVP plan, first-time users |
| **Business** | `--business` | 13 business/strategy artifacts | Investor decks, client proposals, strategic planning |
| **Technical** | `--technical` | 12 engineering/design artifacts | Teams that already have strategy, need technical blueprints |
| **Consultant** | `--consultant` | Business stack + strategic frameworks (see routine steps) | Client-facing consulting deliverables |

Phase **2.5** (customer dev: **08a**, **08c**–**08e**) and Phase **8** (**34**–**39**) are **optional** blocks — run only when requested or when mode is maintenance-oriented; see execution order below.

### Mode: Starter (7 core artifacts)
Generates the minimum viable product plan:

| # | Artifact | Purpose |
|---|----------|---------|
| 01 | `IDEA.md` | What are we building and why |
| 05 | `PRD.md` | What exactly does the MVP include |
| 07 | `USER_PERSONAS.md` | Who are we building for |
| 09 | `BRAND_GUIDELINES.md` | How does it look and feel |
| 16 | `ARCHITECTURE.md` | How is it built technically |
| 24 | `GROWTH_STRATEGY.md` | How do we get users |
| 25 | `PITCH_DECK.md` | How do we sell it |

**Quality gates:** One gate after Idea + PRD + Personas (business locked), one after Architecture (technical locked).

### Mode: Business (13 business artifacts)
All strategy, audience, brand, and launch artifacts — zero engineering:

| # | Artifact | Phase |
|---|----------|-------|
| 01 | `IDEA.md` | Discovery |
| 02 | `PROBLEM_VALIDATION.md` | Discovery |
| 03 | `MARKET_RESEARCH.md` | Discovery |
| 04 | `PRODUCT_STRATEGY.md` | Strategy |
| 05 | `PRD.md` | Strategy |
| 06 | `ROADMAP.md` | Strategy |
| 07 | `USER_PERSONAS.md` | Audience |
| 08 | `CUSTOMER_JOURNEY.md` | Audience |
| 09 | `BRAND_GUIDELINES.md` | Brand |
| 22 | `UX_AUDIT.md` | Launch |
| 23 | `ARCHITECTURE_REVIEW.md` | Launch |
| 24 | `GROWTH_STRATEGY.md` | Launch |
| 25 | `PITCH_DECK.md` | Launch |

**Quality gates:** Gate after Phase 1-3 (strategy locked), gate after Brand.

### Mode: Technical (12 engineering/design artifacts)
Assumes business decisions are already made. Requires a brief or PRD as input:

| # | Artifact | Phase |
|---|----------|-------|
| 10 | `DESIGN_TOKENS.md` | Design |
| 11 | `DESIGN_SYSTEM.md` | Design |
| 12 | `COMPONENT_LIBRARY.md` | Design |
| 13 | `LAYOUT_SYSTEM.md` | Design |
| 14 | `WIREFRAMES.md` | UX |
| 15 | `UI_SPEC.md` | UX |
| 16 | `ARCHITECTURE.md` | Engineering |
| 17 | `DATABASE_SCHEMA.md` | Engineering |
| 18 | `API_SPEC.md` | Engineering |
| 19 | `INFRASTRUCTURE.md` | Engineering |
| 20 | `WORKFLOWS.md` | Build |
| 21 | `FEATURE_EXECUTION.md` | Build |

**Prerequisite:** The founder must provide a PRD or project brief. If `docs/PRD.md` doesn't exist, ask the founder to describe the product in detail before proceeding — use that description as the PRD context.

**Quality gates:** Gate after Design (tokens + system locked), gate after Engineering (blueprint locked).

### Mode: Consultant (13 business + 6 frameworks)
All business artifacts PLUS the 6 investor-grade strategic frameworks. Optimized for client-facing deliverables:

| # | Artifact | Phase |
|---|----------|-------|
| 01 | `IDEA.md` | Discovery |
| 02 | `PROBLEM_VALIDATION.md` | Discovery |
| 03 | `MARKET_RESEARCH.md` | Discovery |
| 03b | `PORTERS_FIVE_FORCES.md` | Discovery (Framework) |
| 04 | `PRODUCT_STRATEGY.md` | Strategy |
| 04b | `MECE_PROBLEM_BREAKDOWN.md` | Strategy (Framework) |
| 05 | `PRD.md` | Strategy |
| 05b | `HYPOTHESIS_VALIDATION_PLAN.md` | Strategy (Framework) |
| 06 | `ROADMAP.md` | Strategy |
| 06b | `STRESS_TEST.md` | Strategy (Framework) |
| 07 | `USER_PERSONAS.md` | Audience |
| 07b | `COMPETITIVE_POSITIONING_MATRIX.md` | Audience (Framework) |
| 08 | `CUSTOMER_JOURNEY.md` | Audience |
| 08b | `SWOT_ANALYSIS.md` | Audience (Framework) |
| 09 | `BRAND_GUIDELINES.md` | Brand |
| 24 | `GROWTH_STRATEGY.md` | Launch |
| 25 | `PITCH_DECK.md` | Launch |

**Quality gates:** Gate after Discovery + Frameworks, gate after Strategy, gate after Audience.

---

## Prerequisites
- Project directory with the scaffold contents copied in (or use CLI)
- AI IDE open (Google Antigravity, Claude Desktop, Cursor, etc.)
- Fill `docs/system/templates/initiative-intake-template.md` before starting elicitation so objective, KPI, constraints, and non-goals are explicit.

## Steps

1. **Determine project mode.** Ask the founder:
   > "What mode do you want for this project?
   > - **Full** (default) — complete 36-artifact lifecycle
   > - **Starter** — 7 essential artifacts for a quick MVP plan
   > - **Business** — strategy & audience docs only (no engineering)
   > - **Technical** — engineering & design docs only (assumes strategy exists)
   > - **Consultant** — business docs + strategic frameworks for client proposals"

2. **Run the Proactive Elicitation Protocol.** Ask the founder these 20 structured diagnostic questions before generating any artifacts:

   **Core Problem & Value Prop**
   1. What is the specific frustration this product eliminates?
   2. How much time or money is currently being wasted by this problem?
   3. What is the "Unique Insight" that makes this solution better than existing ones?
   4. If you had to describe the product in one sentence, what would it be?

   **Target Audience**
   5. Who is the primary "buyer" vs. the primary "user"?
   6. What is the professional title or persona of the person feeling the most pain?
   7. Where do these people find information or look for solutions today?

   **Platform & Ecosystem**
   8. Is this web-first, mobile-first, or an omnichannel experience?
   9. What are the 3 most critical integrations needed (e.g., Stripe, Shopify, Google)?
   10. Are there specific browser or device requirements?

   **Aesthetic & Brand**
   11. What 3 adjectives should describe the user's emotional state when using this?
   12. Is the brand identity "High-trust/Corporate" or "Dynamic/Startup"?
   13. Are there existing brand assets (logo, colors) or should we define them?

   **Technical & Regulatory**
   14. What are the non-negotiable tech stack preferences (if any)?
   15. Does the product need to comply with specific regulations (GDPR, HIPAA, etc.)?

   **Monetization & Strategy**
   16. How will the product make money (subscription, usage, marketplace)?
   17. What is the 6-month definition of success for this project?

   **Project Classification**
   18. Is this a Pre-PMF Idea, a Scaling existing product, or for Fundraising?
   19. Does this product use AI/ML (Interacting with users or in the background)?
   20. If AI is used, what is the single most critical thing it must get right?

   Based on answers, set flags:
   - `AI_PRODUCT = true/false` → controls artifacts 26-29
   - `PROJECT_MODE = full | starter | business | technical | consultant`

3. Wait for the founder to answer all questions. Do not proceed until all domains are covered.

4. **Save the project brief.** Fill in `prompts/00_PROJECT_BRIEF.md` with all 20 answers and save as `docs/PROJECT_BRIEF.md`. This is the source of truth for all downstream artifacts.

5. **Execute the artifact generation sequence** for the selected mode. For each artifact:
   - Read the prompt file from `prompts/`
   - Feed in all required input artifacts
   - Generate the output artifact in `docs/`
   - **Enforce quality gates** — run `/phase-gate` at each gate checkpoint

   ### `--full` Mode — Complete Execution Order

   **Phase 1: Discovery**
   - ⚡ **Run `routines/fact-check.md`** for any products, competitors, or technologies mentioned in the founder's brief
   - Generate `01_IDEA_DISCOVERY.md` → `docs/IDEA.md`
   - Generate `02_PROBLEM_VALIDATION.md` → `docs/PROBLEM_VALIDATION.md`
   - Generate `03_MARKET_RESEARCH.md` → `docs/MARKET_RESEARCH.md`
   - *(if `project_tier = scaling or series`)* → Generate `03b_PORTERS_FIVE_FORCES.md` → `docs/PORTERS_FIVE_FORCES.md`

   **Phase 2: Strategy**
   - Generate `04_PRODUCT_STRATEGY.md` → `docs/PRODUCT_STRATEGY.md`
   - *(always in full mode)* → Generate `04b_MECE_PROBLEM_BREAKDOWN.md` → `docs/MECE_PROBLEM_BREAKDOWN.md`
   - Generate `05_PRD.md` → `docs/PRD.md`
   - *(if `project_tier = pre-pmf or scaling`)* → Generate `05b_HYPOTHESIS_VALIDATION.md` → `docs/HYPOTHESIS_VALIDATION_PLAN.md`
   - Generate `06_ROADMAP.md` → `docs/ROADMAP.md`
   - *(if `project_tier = scaling or series`)* → Generate `06b_STRESS_TEST.md` → `docs/STRESS_TEST.md`

   **Phase 2.5: Customer development (optional)**  
   When `include_customer_dev = true` or the founder asks for discovery before locking Strategy & Audience:
   - Generate `08a_CUSTOMER_DEV_PLAN.md` → `docs/CUSTOMER_DEV_PLAN.md`
   - Generate `08c_INTERVIEW_GUIDE.md` → `docs/INTERVIEW_GUIDE.md`
   - Generate `08d_EXPERIMENT_LOG.md` → `docs/EXPERIMENT_LOG.md`
   - Generate `08e_FEEDBACK_DOSSIER.md` → `docs/FEEDBACK_DOSSIER.md`

   **Phase 3: Audience**
   - Generate `07_USER_PERSONAS.md` → `docs/USER_PERSONAS.md`
   - *(if `project_tier = scaling or series`)* → Generate `07b_COMPETITIVE_POSITIONING.md` → `docs/COMPETITIVE_POSITIONING_MATRIX.md`
   - Generate `08_CUSTOMER_JOURNEY.md` → `docs/CUSTOMER_JOURNEY.md`
   - *(if `project_tier = scaling or series`)* → Generate `08b_SWOT_ANALYSIS.md` → `docs/SWOT_ANALYSIS.md`

   ⛔ **GATE — Phase 1-3 Lock.** Run `/phase-gate`. Wait for founder approval before Phase 4.

   **Phase 4: Brand & Design**
   - Generate `09_BRAND_GUIDELINES.md` → `docs/BRAND_GUIDELINES.md`
   - Generate `10_DESIGN_TOKENS.md` → `docs/DESIGN_TOKENS.md`
   - Generate `11_DESIGN_SYSTEM.md` → `docs/DESIGN_SYSTEM.md`
   - Generate `12_COMPONENT_LIBRARY.md` → `docs/COMPONENT_LIBRARY.md`
   - Generate `13_LAYOUT_SYSTEM.md` → `docs/LAYOUT_SYSTEM.md`

   ⛔ **GATE — Design Lock.** Run `/phase-gate`. Wait for founder approval before Phase 5.

   **Phase 5: UX**
   - Generate `14_WIREFRAMES.md` → `docs/WIREFRAMES.md`
   - Generate `15_UI_SPEC.md` → `docs/UI_SPEC.md`

   ⛔ **GATE — UX Lock.** Run `/phase-gate`. Wait for founder approval before Phase 6.

   **Phase 6: Engineering**
   - Generate `16_ARCHITECTURE.md` → `docs/ARCHITECTURE.md`
   - Generate `17_DATABASE_SCHEMA.md` → `docs/DATABASE_SCHEMA.md`
   - Generate `18_API_SPEC.md` → `docs/API_SPEC.md`
   - Generate `19_INFRASTRUCTURE.md` → `docs/INFRASTRUCTURE.md`
   - *(if `AI_PRODUCT = true`)* → Generate `26_AI_ARCHITECTURE.md`, `27_AI_GUARDRAILS.md`, `28_DATA_GOVERNANCE.md`, `29_AI_COMPLIANCE.md`

   ⛔ **GATE — Engineering Blueprint Lock.** Run `/phase-gate`. Wait for founder approval before Phase 7.

   **Phase 7: Build & Launch**
   - Generate `20_WORKFLOWS.md` → `docs/WORKFLOWS.md`
   - Generate `21_FEATURE_EXECUTION.md` → `docs/FEATURE_EXECUTION.md`
   - Generate `22_UX_AUDIT.md` → `docs/UX_AUDIT.md`
   - Generate `23_ARCHITECTURE_REVIEW.md` → `docs/ARCHITECTURE_REVIEW.md`
   - Generate `24_GROWTH_STRATEGY.md` → `docs/GROWTH_STRATEGY.md`
   - Generate `25_PITCH_DECK.md` → `docs/PITCH_DECK.md`
   - *(if `project_tier = scaling or series`)* → Generate `30_RED_TEAM_PLAYBOOK.md` → `docs/RED_TEAM_PLAYBOOK.md`

   **Phase 8: Revenue & iteration (optional)**  
   When `project_mode = maintenance` or the founder wants live / post-launch operations docs:
   - Generate `34_TELEMETRY_MODEL.md` → `docs/TELEMETRY_MODEL.md`
   - Generate `35_GROWTH_OPS.md` → `docs/GROWTH_OPS.md`
   - Generate `36_ITERATION_LOG.md` → `docs/ITERATION_LOG.md`
   - Generate `37_OPERATIONS_RUNBOOK.md` → `docs/OPERATIONS_RUNBOOK.md`
   - Generate `38_PROJECT_RETROSPECTIVE.md` → `docs/PROJECT_RETROSPECTIVE.md`
   - Generate `39_EXPERIMENTATION_BACKLOG.md` → `docs/EXPERIMENTATION_BACKLOG.md`

6. Present a summary of all generated artifacts to the founder for final review.


## Critical Rules
- Never skip a prompt or reorder the sequence
- Always read the prompt file before generating its artifact
- If a required input artifact is missing, stop and report it
- If any answer from the founder is ambiguous, ask before proceeding
- Save all artifacts inside the `docs/` directory
- AI-conditional artifacts (26-29) are ONLY generated when `AI_PRODUCT = true`
- Strategic framework artifacts (**03b**, **06b**, **07b**, **08b** SWOT, etc.) and Red Team Playbook (**30**) follow tier rules in the steps above; customer-dev prompts (**08a**, **08c**–**08e**) only when Phase 2.5 runs
- In `--technical` mode, if no PRD exists, ask the founder for a product brief first
- If the founder is unsure about mode, recommend `--starter` for fast validation, `--full` for serious builds
