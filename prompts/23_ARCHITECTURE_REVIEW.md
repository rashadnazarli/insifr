# 23 — ARCHITECTURE REVIEW

## Purpose
Audit the built codebase against the planned architecture. Catch drift, security gaps, and technical debt before they compound.

## Role
You are acting as a **Principal Systems Architect conducting a formal architecture review**.

## Upstream Dependencies
- `docs/ARCHITECTURE.md` (Artifact 16)
- `docs/API_SPEC.md` (Artifact 18)
- `docs/DATABASE_SCHEMA.md` (Artifact 17)

## Required Inputs
- `@docs/ARCHITECTURE.md`
- `@docs/API_SPEC.md`
- `@docs/DATABASE_SCHEMA.md`

## Operational Rules
- Review the actual codebase, not just the documentation.
- Compare built code against the architectural blueprint.
- Identify drift — where the code has diverged from the plan.
- Be constructive — every finding should include a remediation suggestion.

## Output Requirements
Generate a markdown document with these exact sections:

```markdown
# ARCHITECTURE REVIEW — [Product Name]

## 1. Architecture Compliance
## 2. Security Review
## 3. Database Review
## 4. API Review
## 5. Performance Review
## 6. Technical Debt Inventory
## 7. Recommendations
```

### Section Details (each as a table with findings):

| Finding | Blueprint Says | Code Does | Severity | Remediation |
|---|---|---|---|---|

1. **Architecture Compliance** — directory structure, separation of concerns, stack consistency
2. **Security Review** — OWASP Top 10, auth enforcement, input validation, secrets management, Firestore rules
3. **Database Review** — missing/extra collections, missing indexes, data integrity
4. **API Review** — missing/extra endpoints, schema compliance, error handling
5. **Performance Review** — N+1 queries, missing caching, bundle size, unnecessary re-renders
6. **Technical Debt** — ranked: what can wait vs. what needs immediate attention
7. **Recommendations** — prioritized list of improvements

## Few-Shot Example (Partial)
> **Architecture Compliance Findings (Gold Standard):**
>
> | # | Finding | Blueprint Says | Code Does | Severity | Remediation |
> |---|---|---|---|---|---|
> | 1 | API route naming | kebab-case (`/api/v1/user-profiles`) | camelCase (`/api/v1/userProfiles`) | 🟡 Medium | Rename routes to match API_SPEC convention |
> | 2 | Env var management | `.env` for secrets, never committed | 2 API keys hard-coded in `config.js` | 🔴 Critical | Move to `.env`, add to `.gitignore`, rotate keys |
> | 3 | Directory structure | `src/components/` for reusable | 15 components in `src/pages/` | 🟡 Medium | Refactor: move shared components to `src/components/` |

## Anti-Patterns (DO NOT)
- ❌ Review documentation instead of actual code
- ❌ Report issues without severity and remediation
- ❌ Ignore security findings — these are potential launch blockers
- ❌ Accept "technical debt" without a timeline to address it

## Save As
`docs/ARCHITECTURE_REVIEW.md`

## Prompt
```text
<role>
Act as a Principal Systems Architect conducting a formal codebase review.
</role>

<context>
You are generating Artifact 23 of 35 in the Founder Mode system. This review compares what was planned (Architecture, API Spec, DB Schema) against what was actually built. The goal is to catch drift and technical debt before they compound.
</context>

<upstream_artifacts>
Compare the BUILT CODE against:
- @docs/ARCHITECTURE.md — directory structure, technology stack, design decisions
- @docs/API_SPEC.md — endpoint inventory, naming conventions, error handling
- @docs/DATABASE_SCHEMA.md — collections/tables, indexes, security rules
</upstream_artifacts>

<task>
1. Think step by step:
   - Does the directory structure match the architecture blueprint?
   - Are there any hard-coded secrets or API keys?
   - Do all API endpoints match the spec?
   - Are database indexes configured for common queries?
   - What shortcuts were taken that should be tracked as technical debt?
2. Review the actual codebase against all three blueprint documents.
3. Identify drift, security gaps, performance issues, and technical debt.
4. Every finding must include severity and specific remediation.
5. Rank technical debt: immediate vs. can wait.
</task>

<output_format>
Markdown document with exactly 7 sections.
Each section must use the findings table format (Finding, Blueprint, Code, Severity, Fix).
Save as docs/ARCHITECTURE_REVIEW.md.
</output_format>

<constraints>
- Review ACTUAL CODE, not documentation.
- Every finding MUST include severity level AND remediation.
- Security findings (OWASP Top 10) are MANDATORY.
- Hard-coded secrets are always 🔴 Critical.
- Technical debt must be ranked by urgency.
</constraints>
```
