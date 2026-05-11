# Founder Mode methodology (insifr)

> Think once at the system level. Let AI execute many times at the feature level.

This repository packages a **structured product lifecycle**: phased artifacts, quality gates, and prompts/routines you can drive from an AI IDE (for example **Cursor Agent**). Roles below are **conceptual** — one human plus one agent can wear different hats across the lifecycle.

---

## The 8-Phase Lifecycle

```
Phase 0: INITIALIZATION (CEO Agent)
     ↓  Receive brief → ask questions → set project mode → delegate
     
Phase 1: DISCOVERY ──→ Phase 2: STRATEGY ──→ Phase 2.5: CUSTOMER DEV ──→ Phase 3: AUDIENCE
     │                      │                      │                           │
     ▼                      ▼                      ▼                           ▼
  IDEA.md              STRATEGY.md           CUSTOMER_DEV_PLAN.md         PERSONAS.md
  VALIDATION.md        PRD.md                INTERVIEW_GUIDE.md           JOURNEY.md
  MARKET.md            ROADMAP.md            EXPERIMENT_LOG.md
                                             FEEDBACK_DOSSIER.md
                                                                              │
     ┌────────────────────────────────────────────────────────────────────────┘
     ▼
             ⛩ GATE: Strategy & Audience Locked (CEO approval)

Phase 4: BRAND & DESIGN ──→ Phase 5: UX IMPLEMENTATION
     │                           │
     ▼                           ▼
  BRAND.md                  WIREFRAMES.md
  TOKENS.md                 UI_SPEC.md
  DESIGN_SYSTEM.md
  COMPONENTS.md
  LAYOUTS.md
                                      │
             ⛩ GATE: UX Locked (CEO approval)
                                      │
                                      ▼
Phase 6: ENGINEERING ─────────────────────────────────→ Phase 7: LAUNCH
     │                                                       │
     ▼                                                       ▼
  ARCHITECTURE.md                                       WORKFLOWS.md
  DATABASE.md                                           FEATURE_EXECUTION.md
  API_SPEC.md                                           UX_AUDIT.md
  INFRASTRUCTURE.md                                     ARCH_REVIEW.md
  (+ AI: GUARDRAILS, GOVERNANCE, COMPLIANCE)            GROWTH.md
                                                        PITCH_DECK.md
             ⛩ GATE: Engineering Blueprint Locked (CEO approval)
                                                       │
                                                       ▼
                                            Phase 8: REVENUE & ITERATION
                                                       │
                                                       ▼
                                                TELEMETRY_MODEL.md
                                                GROWTH_OPS.md
                                                EXPERIMENTATION_BACKLOG.md
                                                ITERATION_LOG.md
                                                OPERATIONS_RUNBOOK.md
                                                PROJECT_RETROSPECTIVE.md
```

---

## Project Modes

| Mode | What's Generated | When to Use |
|------|-----------------|-------------|
| `--full` | All artifacts | New product, investor pitch |
| `--starter` | 7 core artifacts (Phases 1-3) | Quick idea validation |
| `--business` | 14 artifacts + strategic frameworks | Client engagement, consulting |
| `--technical` | 15 artifacts (Phases 4-6) | Existing strategy, need tech blueprint |
| `--consultant` | Core artifacts + investor framing | Client deliverable |
| `--maintenance` | Phase 8 artifacts (34-38) | Post-launch operations, iterations, and bug fixes |
| `--stealth` | Zero artifacts. Only loads `/skills` | Small scripts, fast prototypes, raw coding |

---

## How to run it (this repo)

### 1. Cursor / IDE agent (default)

Use `prompts/`, `routines/`, `docs/system/` (contract + templates), and optionally `@skills/...` from Agent chat. See `CURSOR_AGENT_PLAYBOOK.md`.

### 2. Optional: multi-agent orchestration tools

If you use an external **multi-agent dashboard** (for example Paperclip), import its company bundle separately — this starter does not ship that bundle.

```
You (product owner) ↔ AI agent(s)
                  ↔ phased artifacts + gates in docs/
```

---

## The 43 Artifacts

### Core (43 artifacts)

| # | Artifact | Phase | Agent |
|---|----------|-------|-------|
| 01 | Idea Discovery | Discovery | PM |
| 02 | Problem Validation | Discovery | PM |
| 03 | Market Research | Discovery | PM |
| 04 | Product Strategy | Strategy | PM |
| 05 | PRD | Strategy | PM |
| 06 | Roadmap | Strategy | PM |
| 07 | User Personas | Audience | PM |
| 08 | Customer Journey | Audience | PM |
| 08a | Customer Dev Plan | Customer Development | PM |
| 08c | Interview Guide | Customer Development | PM |
| 08d | Experiment Log | Customer Development | PM |
| 08e | Feedback Dossier | Customer Development | PM |
| 09 | Brand Guidelines | Brand & Design | Designer |
| 10 | Design Tokens | Brand & Design | Designer |
| 11 | Design System | Brand & Design | Designer |
| 12 | Component Library | Brand & Design | Designer |
| 13 | Layout System | Brand & Design | Designer |
| 14 | Wireframes | UX Implementation | Designer |
| 15 | UI Spec | UX Implementation | Designer |
| 16 | Architecture | Engineering | Architect |
| 17 | Database Schema | Engineering | Architect |
| 18 | API Spec | Engineering | Architect |
| 19 | Infrastructure | Engineering | Architect |
| 20 | Workflows | Build & Launch | Engineer |
| 21 | Feature Execution | Build & Launch | Engineer |
| 22 | UX Audit | Launch | Engineer |
| 23 | Architecture Review | Launch | Auditor |
| 24 | Growth Strategy | Launch | PM |
| 25 | Pitch Deck | Launch | PM |
| 26 | AI Architecture | AI Engineering (conditional) | Architect |
| 27 | AI Guardrails | AI Engineering (conditional) | Architect |
| 28 | Data Governance | AI Engineering (conditional) | Architect |
| 29 | AI Compliance | AI Engineering (conditional) | Architect |
| 30 | Red Team Playbook | Launch | Auditor |
| 31 | Shariah Board Report | Islamic Fintech vertical | PM |
| 32 | AAOIFI Checklist | Islamic Fintech vertical | PM |
| 33 | Islamic Risk Framework | Islamic Fintech vertical | Architect |
| 34 | Telemetry Model | Revenue & Iteration | CEO / PM |
| 35 | Growth Ops | Revenue & Iteration | PM |
| 36 | Iteration Log | Revenue & Iteration | CEO / Engineer |
| 37 | Operations Runbook | Revenue & Iteration | Architect / SRE |
| 38 | Project Retrospective | Revenue & Iteration | CEO / Auditor |
| 39 | Experimentation Backlog | Revenue & Iteration | PM |

**Prompt files (`prompts/`):** Customer development templates use `08a_*`, `08c_*`, `08d_*`, `08e_*`. **`08b_*.md` is SWOT only** (`08b_SWOT_ANALYSIS.md`), aligned with framework **8b** below. See `prompts/README.md`.

### Strategic Frameworks (6 extensions — Scaling/Series tier)

| # | Framework | Purpose |
|---|-----------|---------|
| 3b | Porter's Five Forces | Competitive threat analysis |
| 4b | MECE Problem Breakdown | Consultant-grade problem structure |
| 5b | Hypothesis Validation Plan | Test assumptions before building |
| 6b | "So What?" Stress Test | Pressure-test every recommendation |
| 7b | Competitive Positioning Matrix | Find defensible white space |
| 8b | SWOT Analysis | Full strategic landscape |

---

## Quality Gates

Between phases, pause and present artifacts for human approval.

A gate checks:
1. All phase artifacts exist and are complete
2. No artifact contradicts an earlier one
3. The **product owner** has reviewed and approved critical decisions
4. Open questions are resolved

**Gates cannot be skipped.** The cost of going back doubles per phase.

---

## Revision Protocol

When a later artifact conflicts with an earlier one:

1. **Flag the conflict explicitly** — name both artifacts and the contradiction
2. **Propose changes to both** — not just the new one
3. **Cascade check** — identify all artifacts that depend on the changed one
4. **Get CEO approval** — never silently modify an approved artifact

---

## Your projects

Keep generated artifacts under `docs/projects/<project-name>/` (or another convention you choose — stay consistent).

Replace this section in your own notes with a simple table of active initiatives if helpful.

---

## Key Principles

1. **No code before context** — Phases 1–3 produce zero code. Strategy first.
2. **Think once, execute many** — Define the system once. AI builds within it.
3. **Quality gates are mandatory** — No skipping. No exceptions.
4. **Revision protocol** — Flag conflicts, cascade changes, get approval.
5. **Human decides** — Agents propose and execute within agreed scope; the product owner approves trade-offs.
