# 21 — FEATURE EXECUTION GUIDE

## Purpose
Establish the standard operating procedure for building features from this point forward. This document is the "how we build" manual that ensures consistency across every feature.

## Role
You are acting as a **Technical Lead** establishing engineering standards.

## Upstream Dependencies
- All prior artifacts (this document synthesizes everything into a build process)

## Required Inputs
- All prior artifacts (this document synthesizes everything into a build process)

## Operational Rules
- This is a process document, not a feature spec.
- It defines HOW features get built, not WHAT features to build.
- Reference the `/new-feature` workflow from `.agent/workflows/new-feature.md`.

## Output Requirements
Generate a markdown document with these exact sections:

```markdown
# FEATURE EXECUTION GUIDE — [Product Name]

## 1. Feature Lifecycle
## 2. Pre-Build Checklist
## 3. Build Standards
## 4. Zero-Bloat Strategy (Build-Your-Own-X Rules)
## 5. Verification Bundle Requirements
## 6. Common Feature Patterns
## 7. Troubleshooting Guide
```

### Section Details
1. **Feature Lifecycle** — Request → Plan → Approve → Build → Verify → Ship
2. **Pre-Build Checklist** — what must exist before writing code
3. **Build Standards** — code organization, token usage, API patterns, documentation
4. **Zero-Bloat Strategy (Build-Your-Own-X Rules)** — explicitly state when to use raw native implementations (e.g. raw fetch instead of axios, vanilla state instead of Redux) versus when a third-party dependency is truly justified.
5. **Verification Bundle** — structural, visual, and logical evidence of "done"
6. **Common Feature Patterns** — templates for CRUD, dashboard widgets, forms, file uploads
7. **Troubleshooting Guide** — common issues and fixes

## Few-Shot Example (Partial)
> **Section 5 — Common Feature Pattern: CRUD Feature (Gold Standard):**
>
> ```
> Pattern: CRUD Feature (e.g., Projects, Invoices, Users)
>
> Files created:
>   src/pages/[entity]-list.html         → List view with table + filters
>   src/pages/[entity]-detail.html       → Single item view
>   src/pages/[entity]-form.html         → Create/edit form (shared)
>   src/components/[entity]-card.js      → Card component for list items
>   src/api/[entity].js                  → API client functions
>   functions/src/[entity]/index.ts      → Cloud Functions (CRUD)
>
> Checklist:
>   [ ] List view: sorting, filtering, pagination, empty state
>   [ ] Detail view: all fields displayed, edit/delete actions
>   [ ] Form: validation (client + server), loading state, error handling
>   [ ] API: all CRUD endpoints match API_SPEC.md
>   [ ] Tests: happy path + error cases
>   [ ] Responsive: works at all 4 breakpoints
> ```

## Anti-Patterns (DO NOT)
- ❌ Build features without checking the Pre-Build Checklist
- ❌ Skip verification — "it works on my machine" is not done
- ❌ Create custom components when library components exist
- ❌ Hard-code values instead of using design tokens

## Save As
`docs/FEATURE_EXECUTION.md`

## Prompt
```text
<role>
Act as a Technical Lead establishing engineering standards for consistent feature development.
</role>

<context>
You are generating Artifact 21 of 35 in the Founder Mode system. This is the "how we build" manual. Every new feature built from this point forward follows this process.
</context>

<upstream_artifacts>
Reference all docs/ artifacts — this document synthesizes them into a build process:
- @docs/ARCHITECTURE.md — directory structure, technology stack
- @docs/COMPONENT_LIBRARY.md — available components
- @docs/DESIGN_TOKENS.md — token naming convention
- @docs/API_SPEC.md — API patterns and conventions
</upstream_artifacts>

<task>
1. Think step by step:
   - What is the minimum process to ensure consistency?
   - What pre-conditions must be met before coding starts?
   - What constitutes "done" for a feature?
   - What are the most common feature patterns?
2. Define the feature lifecycle, pre-build checklist, and build standards.
3. Create templates for common feature patterns (CRUD, dashboard, forms).
4. Include a troubleshooting guide for common issues.
</task>

<output_format>
Markdown document with exactly 6 sections.
Include file structure examples for common patterns.
Checklists must use checkbox format.
Save as docs/FEATURE_EXECUTION.md.
</output_format>

<constraints>
- This is a PROCESS document — do NOT specify what features to build.
- Pre-Build Checklist is MANDATORY before any coding.
- Build Standards must reference design tokens and component library.
- Verification must include structural, visual, AND logical evidence.
</constraints>
```
