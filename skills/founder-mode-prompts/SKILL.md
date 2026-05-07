---
name: founder-mode-prompts
description: Provides access to all Founder Mode artifact prompt templates under prompts/ for AI-assisted document generation.
---

# Founder Mode prompt templates

When generating a Founder Mode artifact, read the matching file from **`prompts/`** (see **`prompts/README.md`** for the canonical index and naming rules).

Filenames always follow `<id>_<TOPIC>.md` — there is no `prompt-` prefix.

## How to use

From each template, take:

- **Purpose** — what the artifact achieves  
- **Role** — persona for the model  
- **Inputs** — prior docs to read  
- **Output shape** — sections and constraints  

## Templates by phase

### Phase 0
- `00_PROJECT_BRIEF.md`

### Phase 1: Discovery
- `01_IDEA_DISCOVERY.md`
- `02_PROBLEM_VALIDATION.md`
- `03_MARKET_RESEARCH.md`

### Phase 1b: Strategic frameworks
- `03b_PORTERS_FIVE_FORCES.md`
- `07b_COMPETITIVE_POSITIONING.md`
- `08b_SWOT_ANALYSIS.md`

### Phase 2: Strategy
- `04_PRODUCT_STRATEGY.md`
- `04b_MECE_PROBLEM_BREAKDOWN.md`
- `05_PRD.md`
- `05b_HYPOTHESIS_VALIDATION.md`
- `06_ROADMAP.md`
- `06b_STRESS_TEST.md`

### Phase 2.5: Customer development
- `08a_CUSTOMER_DEV_PLAN.md`
- `08c_INTERVIEW_GUIDE.md` — **`08c`** (not `08b`; `08b` is SWOT)
- `08d_EXPERIMENT_LOG.md`
- `08e_FEEDBACK_DOSSIER.md`

### Phase 3: Audience
- `07_USER_PERSONAS.md`
- `08_CUSTOMER_JOURNEY.md`

### Phase 4–5: Design & UX
- `09_BRAND_GUIDELINES.md` → `10_DESIGN_TOKENS.md` → `11_DESIGN_SYSTEM.md`
- `12_COMPONENT_LIBRARY.md` → `13_LAYOUT_SYSTEM.md`
- `14_WIREFRAMES.md` → `15_UI_SPEC.md`

### Phase 6: Engineering
- `16_ARCHITECTURE.md` → `17_DATABASE_SCHEMA.md` → `18_API_SPEC.md` → `19_INFRASTRUCTURE.md`

### Phase 6b: AI (conditional)
- `26_AI_ARCHITECTURE.md` → `27_AI_GUARDRAILS.md` → `28_DATA_GOVERNANCE.md` → `29_AI_COMPLIANCE.md`

### Phase 7: Build & launch
- `20_WORKFLOWS.md` → `21_FEATURE_EXECUTION.md` → `22_UX_AUDIT.md`
- `23_ARCHITECTURE_REVIEW.md` → `24_GROWTH_STRATEGY.md` → `25_PITCH_DECK.md`
- `30_RED_TEAM_PLAYBOOK.md` (conditional tier)

### Phase 8: Revenue & iteration
- `34_TELEMETRY_MODEL.md`
- `35_GROWTH_OPS.md`
- `36_ITERATION_LOG.md`
- `37_OPERATIONS_RUNBOOK.md`
- `38_PROJECT_RETROSPECTIVE.md`
- `39_EXPERIMENTATION_BACKLOG.md`

## Location

All templates: **`prompts/`** at the repo root (this repo).
