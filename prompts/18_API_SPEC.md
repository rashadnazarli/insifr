# 18 — API SPECIFICATION

## Purpose
Define every API endpoint the product needs, with enough detail that the backend can be built without ambiguity.

## Role
You are acting as a **Senior API Architect**.

## Upstream Dependencies
- `docs/ARCHITECTURE.md` (Artifact 16)
- `docs/DATABASE_SCHEMA.md` (Artifact 17)
- `docs/PRD.md` (Artifact 05)

## Required Inputs
- `@docs/ARCHITECTURE.md`
- `@docs/DATABASE_SCHEMA.md`
- `@docs/PRD.md`

## Operational Rules
- For Firebase: define Cloud Functions (HTTP triggers + Firestore triggers).
- For REST APIs: define endpoints with HTTP methods, paths, request/response schemas.
- Every endpoint must trace to a PRD feature.
- Include authentication requirements per endpoint.

## Output Requirements
Generate a markdown document with these exact sections:

```markdown
# API SPECIFICATION — [Product Name]

## 1. API Design Principles
## 2. Authentication Endpoints
## 3. Core Resource Endpoints
## 4. Webhook Endpoints
## 5. Background Functions
## 6. Rate Limiting Strategy
## 7. Error Response Standard
## 8. Pagination Standard
## 9. Endpoint Inventory Table
```

### Section Details
1. **API Design Principles** — naming conventions, versioning strategy, error format
2. **Authentication Endpoints** — signup, login, logout, password reset, token refresh
3. **Core Resource Endpoints** — CRUD for each major entity. Per endpoint:

| Field | Value |
|---|---|
| Method + Path | `POST /api/v1/reconciliations` |
| PRD Ref | FR-002 |
| Auth | `authenticated` |
| Request | `{ stripeAccountId: string, dateRange: DateRange }` |
| Response 200 | `{ reconciliation: Reconciliation, discrepancies: Discrepancy[] }` |
| Error 400 | `{ error: { code: "INVALID_DATE_RANGE", message: "..." } }` |
| Error 401 | `{ error: { code: "UNAUTHORIZED", message: "..." } }` |

4. **Webhook Endpoints** — for external integrations (if applicable)
5. **Background Functions** — Firestore triggers, scheduled tasks
6. **Rate Limiting** — per-user and per-endpoint limits
7. **Error Response Standard** — consistent format: `{ error: { code, message, details } }`
8. **Pagination Standard** — cursor-based or offset-based, with examples
9. **Endpoint Inventory Table** — summary of all endpoints

## Few-Shot Example (Partial)
> **Endpoint Inventory Table (Gold Standard):**
>
> | Method | Path | Auth | PRD Ref | Description |
> |---|---|---|---|---|
> | POST | `/api/v1/auth/signup` | public | FR-007 | Create account via magic link |
> | POST | `/api/v1/auth/verify` | public | FR-007 | Verify magic link token |
> | GET | `/api/v1/reconciliations` | auth | FR-001 | List reconciliation reports |
> | POST | `/api/v1/reconciliations` | auth | FR-002 | Trigger new reconciliation |
> | GET | `/api/v1/discrepancies` | auth | FR-003 | List discrepancies with filters |
> | PATCH | `/api/v1/discrepancies/:id` | auth | FR-004 | Mark discrepancy as resolved |
> | `onWrite` | `users/{uid}` | trigger | — | Sync user profile to analytics |
> | `schedule` | `daily-reconciliation` | cron | FR-010 | Auto-reconcile at midnight UTC |

## Anti-Patterns (DO NOT)
- ❌ Create endpoints not justified by a PRD feature
- ❌ Use inconsistent naming (mix of camelCase and kebab-case in paths)
- ❌ Skip error response schemas — the frontend needs to know what to expect
- ❌ Forget Firestore trigger functions — often the most critical backend logic
- ❌ Design endpoints without specifying auth level

## Downstream Consumers
This artifact feeds into:
- `docs/INFRASTRUCTURE.md` (19) — deployment and rate limiting config
- `docs/FEATURE_EXECUTION.md` (21) — implementation guide

## Save As
`docs/API_SPEC.md`

## Prompt
```text
<role>
Act as a Senior API Architect designing the complete API surface for a startup product.
</role>

<context>
You are generating Artifact 18 of 35 in the Founder Mode system. This API spec must be unambiguous enough that the backend can be built without follow-up questions. Infrastructure (19) and Feature Execution (21) depend on this document.
</context>

<upstream_artifacts>
Read all three:
- @docs/ARCHITECTURE.md — Section 2 (Technology Stack), Section 4 (Backend Architecture)
- @docs/DATABASE_SCHEMA.md — all document/table schemas
- @docs/PRD.md — Section 6 (Functional Requirements) for FR-xxx mapping
</upstream_artifacts>

<task>
1. Think step by step:
   - What CRUD operations does each database entity need?
   - What PRD feature does each endpoint support?
   - What auth level does each endpoint require?
   - What error codes should each endpoint return?
   - What background functions are needed for async operations?
2. Define every endpoint with full request/response schemas.
3. Every endpoint must trace to a PRD functional requirement.
4. Include Firestore triggers and scheduled functions.
5. Create an endpoint inventory table for quick reference.
</task>

<output_format>
Markdown document with exactly 9 sections as specified in Output Requirements.
Each endpoint must include method, path, auth, request/response, and error schemas.
Endpoint inventory must be a summary table.
Save as docs/API_SPEC.md.
</output_format>

<constraints>
- Every endpoint MUST reference a PRD functional requirement (FR-xxx).
- Every endpoint MUST specify auth level (public, authenticated, admin).
- Error responses MUST follow the standard format across all endpoints.
- Naming MUST be consistent (kebab-case paths, camelCase payload fields).
- Firestore triggers and scheduled functions MUST be included.
</constraints>
```
