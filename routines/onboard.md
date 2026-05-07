---
description: Generate a developer onboarding doc from the project artifacts
---

# Onboard Workflow

## Purpose

Generate a single comprehensive onboarding document that lets a new developer understand the entire project in 15 minutes. No more "ask Bob, he knows how it works."

## Steps

### 1. Read All Available Artifacts

Load every artifact in `docs/`:
- IDEA.md → PITCH_DECK.md (all 25 if available)
- Also read: `ARCHITECTURE.md`, `API_SPEC.md`, `DESIGN_TOKENS.md`, `COMPONENT_LIBRARY.md`

### 2. Generate Onboarding Doc

Create `docs/ONBOARDING.md` with these sections:

#### Project Overview (2 paragraphs max)
- What the product does, who it's for, and why it exists
- Source: `IDEA.md` + `PRD.md` + `PRODUCT_STRATEGY.md`

#### Architecture at a Glance
- Tech stack in a simple table (frontend, backend, database, hosting)
- Architecture diagram (Mermaid or ASCII)
- Source: `ARCHITECTURE.md`

#### Getting Started
- Prerequisites (Node.js version, Firebase CLI, etc.)
- Clone, install, and run commands
- Environment variables needed (list keys, not values)
- How to access staging/preview environments

#### Project Structure
- Directory tree with one-line descriptions for key folders
- "Where to find things" guide: where are components, where are API routes, where are styles
- Source: `ARCHITECTURE.md`

#### Design System Quick Reference
- Brand colors (show swatches or hex values)
- Typography scale
- Spacing scale
- Icon library (Material Symbols)
- "Don't reinvent — use the design tokens"
- Source: `DESIGN_TOKENS.md` + `DESIGN_SYSTEM.md`

#### Key Workflows
- How to create a new feature: `/new-feature`
- How to run tests: `/test`
- How to deploy: `/deploy`
- How to review code: `/review`
- How to run security audit: `/security-review`

#### API Overview
- List of endpoints with method, path, and one-line description
- Auth requirements
- Source: `API_SPEC.md`

#### Database Schema
- Collections/tables overview
- Key relationships
- Source: `DATABASE_SCHEMA.md`

#### Code Conventions
- Style guide reference (Google Style Guides)
- Naming conventions
- Git commit format (conventional commits)
- PR process

#### Important Decisions
- List 5-10 key architectural/product decisions and their rationale
- Source: Extracted from artifacts where decisions are documented

#### Who to Ask
- Founder/tech lead contact for unresolved questions
- Links to documentation

### 3. Present to Founder

Show the generated doc for review. The founder may want to:
- Add team-specific context
- Remove sensitive information
- Adjust the tone

### 4. Commit

```bash
git add docs/ONBOARDING.md
git commit -m "docs: generate developer onboarding guide"
```

## Rules
- Keep it under 500 lines — this is a quick-start, not a textbook
- Use tables and bullet points aggressively — no prose walls
- Include actual runnable commands, not descriptions of commands
- Link to detailed docs rather than duplicating content
- Update this doc when running `/new-feature` or `/revise` if architecture changes
