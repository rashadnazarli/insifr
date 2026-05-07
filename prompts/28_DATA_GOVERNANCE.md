# 28 — DATA GOVERNANCE

> ⚡ CONDITIONAL: This artifact is only generated when the product uses AI/ML models OR handles sensitive user data at scale.

## Purpose
Define how data flows through the AI system, who can access it, how long it's retained, and how privacy is protected. This is the document that prevents "we accidentally sent customer PII to a third-party AI provider" incidents.

## Role
You are acting as a **Data Governance Architect** experienced in building compliant data pipelines for AI-powered products.

## Upstream Dependencies
- `docs/AI_ARCHITECTURE.md` (Artifact 26)
- `docs/ARCHITECTURE.md` (Artifact 16)
- `docs/DATABASE_SCHEMA.md` (Artifact 17)
- `docs/PRD.md` (Artifact 05)

## Downstream Consumers
- `docs/AI_COMPLIANCE.md` (29) — compliance references governance policies

## Required Inputs
- `@docs/AI_ARCHITECTURE.md`
- `@docs/ARCHITECTURE.md`
- `@docs/DATABASE_SCHEMA.md`
- `@docs/PRD.md`

## Before You Start — Data Audit
Map every place user data exists or moves:
1. Where does user data enter the system? (Forms, uploads, APIs, third-party imports)
2. Where is it stored? (Firestore, Firebase Storage, third-party services)
3. Where does it leave the system? (AI provider APIs, email services, analytics, exports)
4. Who can access it? (The founder, Cloud Functions, AI models, support tools)

## Output Requirements

### 1. Data Classification Matrix
Classify ALL data the product handles:

| Data Category | Examples | Sensitivity | PII? | Sent to AI? | Retention |
|---|---|---|---|---|---|
| Account data | Email, name, password hash | High | Yes | Never | Account lifetime + 30 days |
| User content | Documents, messages, uploads | Medium | Possibly | Yes (with redaction rules) | User-controlled |
| Usage data | Click events, feature usage | Low | No | No | 90 days |
| AI interactions | Prompts, responses, feedback | Medium | Possibly | Inherent | 30 days default |
| Payment data | Card info, invoices | Critical | Yes | Never | Per PCI-DSS requirements |

### 2. Data Flow Map
For each AI feature, document the complete data journey:

```
User Input → [Sanitize] → [Redact PII] → [Assemble Prompt] → [AI Provider API]
                                                                      ↓
User Display ← [Validate Output] ← [Filter Content] ← [AI Response]
                                                                      ↓
                                                            [Log for monitoring]
                                                            (redacted, no PII)
```

For each arrow, specify:
- What data crosses that boundary
- Whether encryption is applied (in transit, at rest)
- Whether PII is present and how it's handled

### 3. PII Handling Rules
Concrete rules for personally identifiable information:

**Before sending to AI providers:**
- Replace real names with placeholder tokens (`[USER_NAME]`) and re-inject after response
- Strip email addresses, phone numbers, and physical addresses from prompt context
- Never include payment information, government IDs, or health data in AI prompts
- Document which fields are redacted and which are passed through, per AI feature

**In storage:**
- PII fields must be identified in the database schema with a `pii: true` flag
- PII must be encrypted at rest (Firestore default encryption is acceptable for MVP)
- PII access must be logged (who accessed what, when)

**In logs and monitoring:**
- Never log full user content — log content hashes or truncated previews
- Never log AI prompts containing user data — log prompt template IDs and metadata only
- Error logs must sanitize user data before writing

### 4. Third-Party Data Sharing
For each external service that receives user data:

| Service | Data Shared | Purpose | Data Processing Agreement? | User Consent? | Opt-Out Possible? |
|---|---|---|---|---|---|
| e.g., Anthropic API | User content (redacted) | AI inference | Yes (ToS) | Via product ToS | Yes — disable AI features |
| e.g., Sentry | Error context (sanitized) | Error tracking | Yes (DPA) | Via privacy policy | No |
| e.g., PostHog | Usage events (no PII) | Analytics | Yes (DPA) | Via cookie consent | Yes |

### 5. Retention and Deletion Policy

| Data Type | Default Retention | User Can Delete? | Auto-Purge? | Legal Hold Exception? |
|---|---|---|---|---|
| AI conversation history | 30 days | Yes — immediate | Yes | Yes |
| User-generated content | Until account deletion | Yes — immediate | No | Yes |
| Usage analytics | 90 days | No (anonymized) | Yes | No |
| Account data | Account lifetime + 30 days | Yes — via account deletion | Yes, 30 days post-deletion | Yes |

**Right to deletion implementation:**
- Define the deletion cascade: when a user deletes their account, list every data store that must be purged
- Specify deletion timeline: immediate from primary database, within 30 days from backups
- AI provider data: document whether the provider retains data and for how long (check provider's data retention policy)

### 6. Data Quality for AI
If the product uses RAG, fine-tuning, or any user-contributed data to improve AI:

- **Provenance**: Where did each piece of knowledge come from? Timestamp, source, author.
- **Validation**: How is incoming knowledge verified before entering the AI's context? (Human review, automated checks, trusted source whitelist)
- **Versioning**: Can you roll back to a previous version of the knowledge base if new data degrades quality?
- **Contamination prevention**: How do you prevent one user's data from leaking into another user's AI responses?

### 7. Compliance Checklist
Based on the product's market and user base:

| Regulation | Applies? | Key Requirements | Status |
|---|---|---|---|
| GDPR (EU users) | Yes/No | Consent, right to deletion, DPA with processors | ✅/⚠️/❌ |
| CCPA (California users) | Yes/No | Opt-out of sale, disclosure of data categories | ✅/⚠️/❌ |
| SOC 2 (enterprise customers) | Yes/No | Access controls, audit logs, incident response | ✅/⚠️/❌ |
| HIPAA (health data) | Yes/No | BAA, encryption, access controls, audit trail | ✅/⚠️/❌ |
| PCI-DSS (payment data) | Yes/No | Use Stripe/payment processor — never handle raw card data | ✅/⚠️/❌ |

For MVP: mark which regulations apply, implement the critical requirements, document what's deferred and when it will be addressed.

## Anti-Patterns (DO NOT)
- ❌ Send raw user data to AI providers without reviewing what's included
- ❌ Log full AI prompts containing user content
- ❌ Assume Firebase encryption is sufficient for all compliance requirements
- ❌ Ignore AI provider data retention policies — read them
- ❌ Defer all compliance to "post-launch" — basic PII handling is a launch requirement
- ❌ Use user data for AI training without explicit consent

## Revision Trigger
If data governance requirements conflict with an AI feature's design (e.g., the feature requires sending PII to an AI provider but the privacy policy prohibits it), flag the conflict with `AI_ARCHITECTURE.md` and `AI_GUARDRAILS.md`.

## Save As
`docs/DATA_GOVERNANCE.md`

## Prompt
```text
<role>
Act as a Data Governance Architect experienced in building compliant data pipelines for AI-powered products.
</role>

<context>
You are generating Artifact 28 of 35 in the Founder Mode system. This document prevents data incidents by mapping every data flow, classifying sensitivity, and defining PII handling rules. AI Compliance (29) references this.
This artifact is CONDITIONAL — only generate when the product uses AI/ML or handles sensitive user data.
</context>

<upstream_artifacts>
Read all:
- @docs/AI_ARCHITECTURE.md — Section 3 (Prompt Architecture), Section 4 (Inference Routing)
- @docs/ARCHITECTURE.md — Section 5 (Database Layer), Section 7 (Auth/AuthZ)
- @docs/DATABASE_SCHEMA.md — all schemas to identify PII fields
- @docs/PRD.md — data handling requirements
</upstream_artifacts>

<task>
1. First, perform a data audit:
   - Where does user data enter the system?
   - Where is it stored? Where does it leave the system?
   - Who can access it?
2. Classify all data by sensitivity (Critical, High, Medium, Low).
3. Map the complete data flow for each AI feature.
4. Define PII handling rules: before AI, in storage, and in logs.
5. Document third-party data sharing with DPA status.
6. Define retention and deletion policies with right-to-deletion cascade.
7. Create the compliance checklist (GDPR, CCPA, etc.).
</task>

<output_format>
Markdown document with exactly 7 sections as specified in Output Requirements.
Data classification and third-party sharing must be tables.
Data flow map must use ASCII diagrams.
Save as docs/DATA_GOVERNANCE.md.
</output_format>

<constraints>
- PII MUST be identified in database schema with `pii: true` flag.
- PII MUST be redacted before sending to AI providers.
- Full user content MUST NEVER be logged — use hashes or truncated previews.
- Right to deletion MUST define the complete cascade across all data stores.
- Compliance checklist MUST assess applicability of GDPR, CCPA, SOC 2, HIPAA, PCI-DSS.
</constraints>
```
