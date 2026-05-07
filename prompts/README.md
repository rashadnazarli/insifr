# Prompts directory

Canonical **artifact prompt templates** for Founder Mode. Agents read the matching file from `prompts/`, then write outputs under `docs/` (or `docs/projects/<name>/`).

> Edit a prompt only when you intentionally change the artifact contract — and update this README in the same PR.

---

## Naming convention (required)

All templates use this pattern:

`<id>_<SNAKE_CASE_TOPIC>.md`

| Pattern | Meaning | Examples |
|---------|---------|----------|
| `00–30` | Core pipeline IDs | `05_PRD.md`, `16_ARCHITECTURE.md` |
| `NN` + letter | Variant / framework tied to step `NN` | `03b_PORTERS_FIVE_FORCES.md`, `08b_SWOT_ANALYSIS.md` |
| `08a`, `08c`–`08e` | Customer development (Phase 2.5) | See below |
| `34`–`39` | Revenue & iteration (Phase 8) | `34_TELEMETRY_MODEL.md` |

**Customer development IDs:** In this repo **`08b_` is reserved for SWOT** (`08b_SWOT_ANALYSIS.md`, scaling/consultant tiers). The **Interview Guide** template is therefore **`08c_INTERVIEW_GUIDE.md`** (not `08b`). Methodology docs use the same numbering.

There are **no** `prompt-*.md` filenames — everything follows the table below.

---

## Artifact index

| ID | Filename | Artifact |
|----|----------|----------|
| 00 | `00_PROJECT_BRIEF.md` | Project brief (elicitation) |
| 01 | `01_IDEA_DISCOVERY.md` | Idea discovery |
| 02 | `02_PROBLEM_VALIDATION.md` | Problem validation |
| 03 | `03_MARKET_RESEARCH.md` | Market research |
| 03b | `03b_PORTERS_FIVE_FORCES.md` | Porter's Five Forces |
| 04 | `04_PRODUCT_STRATEGY.md` | Product strategy |
| 04b | `04b_MECE_PROBLEM_BREAKDOWN.md` | MECE problem breakdown |
| 05 | `05_PRD.md` | PRD |
| 05b | `05b_HYPOTHESIS_VALIDATION.md` | Hypothesis validation plan |
| 06 | `06_ROADMAP.md` | Roadmap |
| 06b | `06b_STRESS_TEST.md` | "So what?" stress test |
| 07 | `07_USER_PERSONAS.md` | User personas |
| 07b | `07b_COMPETITIVE_POSITIONING.md` | Competitive positioning matrix |
| 08 | `08_CUSTOMER_JOURNEY.md` | Customer journey |
| 08a | `08a_CUSTOMER_DEV_PLAN.md` | Customer development plan |
| 08b | `08b_SWOT_ANALYSIS.md` | SWOT analysis |
| 08c | `08c_INTERVIEW_GUIDE.md` | Interview guide |
| 08d | `08d_EXPERIMENT_LOG.md` | Experiment log |
| 08e | `08e_FEEDBACK_DOSSIER.md` | Feedback dossier |
| 09 | `09_BRAND_GUIDELINES.md` | Brand guidelines |
| 10 | `10_DESIGN_TOKENS.md` | Design tokens |
| 11 | `11_DESIGN_SYSTEM.md` | Design system |
| 12 | `12_COMPONENT_LIBRARY.md` | Component library |
| 13 | `13_LAYOUT_SYSTEM.md` | Layout system |
| 14 | `14_WIREFRAMES.md` | Wireframes |
| 15 | `15_UI_SPEC.md` | UI spec |
| 16 | `16_ARCHITECTURE.md` | Architecture |
| 17 | `17_DATABASE_SCHEMA.md` | Database schema |
| 18 | `18_API_SPEC.md` | API spec |
| 19 | `19_INFRASTRUCTURE.md` | Infrastructure |
| 20 | `20_WORKFLOWS.md` | Workflows |
| 21 | `21_FEATURE_EXECUTION.md` | Feature execution |
| 22 | `22_UX_AUDIT.md` | UX audit |
| 23 | `23_ARCHITECTURE_REVIEW.md` | Architecture review |
| 24 | `24_GROWTH_STRATEGY.md` | Growth strategy |
| 25 | `25_PITCH_DECK.md` | Pitch deck |
| 26 | `26_AI_ARCHITECTURE.md` | AI architecture (if AI product) |
| 27 | `27_AI_GUARDRAILS.md` | AI guardrails |
| 28 | `28_DATA_GOVERNANCE.md` | Data governance |
| 29 | `29_AI_COMPLIANCE.md` | AI compliance |
| 30 | `30_RED_TEAM_PLAYBOOK.md` | Red team playbook |
| 34 | `34_TELEMETRY_MODEL.md` | Telemetry model |
| 35 | `35_GROWTH_OPS.md` | Growth ops |
| 36 | `36_ITERATION_LOG.md` | Iteration log |
| 37 | `37_OPERATIONS_RUNBOOK.md` | Operations runbook |
| 38 | `38_PROJECT_RETROSPECTIVE.md` | Project retrospective |
| 39 | `39_EXPERIMENTATION_BACKLOG.md` | Experimentation backlog |

---

## Workflow reference

Execution order and gates live in `routines/new-project.md` (and related routines). This README is the **single source of truth for filenames**.

---

## Mode quick reference (high level)

| Mode | Typical artifact breadth |
|------|---------------------------|
| `--starter` | Narrow subset (see routine) |
| `--business` | Strategy / audience–heavy |
| `--technical` | Design + engineering prompts |
| `--consultant` | Broad + frameworks |
| `--full` | Full pipeline + conditionals |
| `--maintenance` | Phase 8 emphasis (`34`–`39`) |

Exact lists are defined in `routines/new-project.md`.
