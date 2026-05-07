# 17 — DATABASE SCHEMA

## Purpose
Define the data model that supports all product features. For Firestore (default), this means collections/documents/subcollections. For SQL, this means tables/columns/relationships.

## Role
You are acting as a **Lead Database Architect**.

## Upstream Dependencies
- `docs/PRD.md` (Artifact 05)
- `docs/ARCHITECTURE.md` (Artifact 16)
- `docs/UI_SPEC.md` (Artifact 15)

## Required Inputs
- `@docs/PRD.md`
- `@docs/ARCHITECTURE.md`
- `@docs/UI_SPEC.md`

## Operational Rules
- Adapt to the database chosen in ARCHITECTURE.md:
  - **Firestore**: design for denormalized, document-oriented access patterns
  - **SQL**: design for normalized tables with proper foreign keys
- Every collection/table must map to a PRD feature or user story.
- Include indexing strategy for common queries.
- Plan for data migration from day one — even if v1 doesn't need it.
- For any data assumption, output `**DATA NEEDED:** [specific data volume or pattern validation needed]`.

## Output Requirements

### For Firestore (default):
```markdown
# DATABASE SCHEMA — [Product Name] (Firestore)

## 1. Data Modeling Principles
## 2. Collections Inventory
## 3. Document Schemas
## 4. Composite Indexes
## 5. Security Rules
## 6. Denormalization Map
```

### For SQL:
```markdown
# DATABASE SCHEMA — [Product Name] (SQL)

## 1. Data Modeling Principles
## 2. Entity-Relationship Diagram
## 3. Table-by-Table Schema
## 4. Primary Keys / Foreign Keys
## 5. Indexes
## 6. Migrations Plan
```

### Always include:
```markdown
## 7. Audit / Logging
## 8. Data Integrity Risks
## 9. Soft Delete Strategy
## 10. Open Questions
```

## Few-Shot Example (Partial)
> **Firestore Document Schema (Gold Standard):**
>
> ### Collection: `users`
> ```json
> {
>   "uid": "string (auto — Firebase Auth UID)",
>   "email": "string (indexed)",
>   "displayName": "string",
>   "role": "string (enum: 'admin' | 'user' | 'viewer')",
>   "companyId": "string (ref → companies)",
>   "onboardingComplete": "boolean (default: false)",
>   "settings": {
>     "theme": "string (enum: 'light' | 'dark' | 'system')",
>     "notifications": "boolean (default: true)"
>   },
>   "createdAt": "timestamp (server)",
>   "updatedAt": "timestamp (server)",
>   "deletedAt": "timestamp | null (soft delete)"
> }
> ```
>
> **PRD Mapping:** FR-007 (User Auth), FR-012 (User Settings)
> **Indexes:** `email` (unique), `companyId + role` (composite)
> **Security:** Read: own doc only. Write: own doc, admin can edit role.

## Anti-Patterns (DO NOT)
- ❌ Design a SQL schema when ARCHITECTURE specifies Firestore
- ❌ Create collections/tables not justified by a PRD feature
- ❌ Skip audit fields (createdAt, updatedAt) — these are always needed
- ❌ Ignore Firestore's query limitations (no joins, no inequality on multiple fields)
- ❌ Design without considering soft delete — you will need it eventually

## Downstream Consumers
This artifact feeds into:
- `docs/API_SPEC.md` (18) — API endpoints operate on this data model
- `docs/FEATURE_EXECUTION.md` (21) — implementation references this schema

## Save As
`docs/DATABASE_SCHEMA.md`

## Prompt
```text
<role>
Act as a Lead Database Architect designing the data model for a startup product.
</role>

<context>
You are generating Artifact 17 of 35 in the Founder Mode system. This data model supports every product feature. The API Spec (18) will define how this data is accessed and modified.
</context>

<upstream_artifacts>
Read all three:
- @docs/PRD.md — Sections 6 (Functional Requirements), to map collections to features
- @docs/ARCHITECTURE.md — Section 2 (Technology Stack — which database?), Section 5 (Database Layer)
- @docs/UI_SPEC.md — Section 5 (Data Requirements per screen)
</upstream_artifacts>

<task>
1. Think step by step:
   - What database technology was chosen in Architecture?
   - What entities are needed based on PRD functional requirements?
   - What are the most common query patterns from the UI Spec?
   - Where is denormalization needed for read performance?
   - What data integrity risks exist?
2. Match the database technology chosen in ARCHITECTURE.md.
3. Design document schemas (Firestore) or table schemas (SQL) for every entity.
4. Include indexing strategy for common queries.
5. Define security rules, audit logging, and soft delete strategy.
</task>

<output_format>
Use the Firestore or SQL section template based on ARCHITECTURE.md.
Always include sections 7-10 (Audit, Integrity, Soft Delete, Open Questions).
Document schemas must include field types, constraints, and PRD mapping.
Save as docs/DATABASE_SCHEMA.md.
</output_format>

<constraints>
- Database technology MUST match ARCHITECTURE.md — do NOT switch databases.
- Every collection/table MUST map to a specific PRD requirement (cite FR-xxx).
- Audit fields (createdAt, updatedAt) are MANDATORY on every entity.
- Soft delete strategy MUST be defined.
- Firestore schemas MUST not assume SQL-like joins.
- Use "DATA NEEDED: [specifics]" for any assumption about data volume or patterns.
</constraints>
```
