# 27 — AI GUARDRAILS

> ⚡ CONDITIONAL: This artifact is only generated when the product uses AI/ML models.

## Purpose
Define the safety, reliability, and control systems that prevent AI from harming users, the business, or itself. This is the document that answers: "What happens when the AI does something wrong?"

## Role
You are acting as a **Responsible AI Engineer** who has shipped AI products in regulated industries and dealt with real production failures.

## Upstream Dependencies
- `docs/AI_ARCHITECTURE.md` (Artifact 26)
- `docs/PRD.md` (Artifact 05)
- `docs/USER_PERSONAS.md` (Artifact 07)

## Required Inputs
- `@docs/AI_ARCHITECTURE.md`
- `@docs/PRD.md`
- `@docs/USER_PERSONAS.md`

## Before You Start — Threat Modeling
For each AI feature, assess:
1. **What's the worst thing the AI could say or do?** (Generate harmful content, expose PII, give dangerously wrong advice, take an irreversible action)
2. **Who is harmed if it goes wrong?** (User, other users, the business, third parties)
3. **How quickly would you know?** (Immediately visible, detected by monitoring, discovered weeks later by a user complaint)
4. **Can the damage be reversed?** (Delete a message vs. send a payment vs. give medical advice)

## Output Requirements

### 1. Risk Classification
Classify each AI feature by risk level:

| Feature | Risk Level | Justification | Required Controls |
|---|---|---|---|
| e.g., Content generation | Medium | Could produce misleading text | Output filtering, confidence display |
| e.g., Financial recommendations | High | Could cause monetary loss | Human approval required, disclaimers |
| e.g., Data summarization | Low | Worst case is incomplete summary | Basic validation, user edit capability |

Risk levels determine which guardrails are mandatory:
- **Low**: Input validation + output formatting + error handling
- **Medium**: All of Low + content filtering + confidence indicators + feedback collection
- **High**: All of Medium + human-in-the-loop approval + audit trail + explicit disclaimers

### 2. Input Guardrails
For each AI endpoint:

**Prompt Injection Prevention:**
- Input sanitization rules (strip instruction-like patterns, escape special tokens)
- System prompt / user input boundary enforcement
- Maximum input length per field and total
- Input content classification (detect and reject overtly harmful inputs before they reach the model)

**Context Window Management:**
- Maximum conversation history length (in tokens)
- History summarization strategy when approaching context limits
- What gets truncated first (oldest messages, system context, examples)

### 3. Output Guardrails
For each AI response path:

**Content Safety:**
- Output content classification (toxicity, PII, harmful advice)
- Blocked content categories specific to the product domain
- Response transformation rules (strip markdown when rendering as plain text, sanitize HTML)

**Structural Validation:**
- Expected output format validation (JSON schema, required fields)
- Fallback when output doesn't match expected format
- Maximum output length enforcement

**Factual Grounding:**
- Which features require source attribution and how it's displayed
- Which features explicitly disclaim AI-generated content
- Hallucination mitigation strategy:
  - RAG (Retrieval-Augmented Generation) with verified knowledge base
  - Response grounding against known data
  - Confidence scoring and display thresholds

### 4. Human-in-the-Loop Decision Matrix

| AI Action | Can Execute Autonomously? | Approval Required? | Why |
|---|---|---|---|
| e.g., Generate text draft | ✅ Yes | No | User reviews before using |
| e.g., Send email on behalf of user | ❌ No | Yes — explicit confirm | Irreversible, represents user |
| e.g., Delete user data | ❌ No | Yes — double confirm | Destructive, irreversible |
| e.g., Make purchase recommendation | ✅ Yes, with disclaimer | No | Low stakes, clearly labeled as AI |

**Design principle**: If the AI action is irreversible or represents the user to others, require explicit human approval. If it's reversible and private, allow autonomous execution with clear labeling.

### 5. Feedback and Correction System
How users interact with AI quality:

- **Positive signal**: Thumbs up, accept suggestion, use AI output without editing
- **Negative signal**: Thumbs down, edit AI output, dismiss suggestion, explicit "this is wrong"
- **Correction mechanism**: How users provide the correct answer when AI is wrong
- **Feedback storage**: Where feedback is stored and how it's used (prompt improvement, fine-tuning dataset, quality monitoring)
- **Feedback loop latency**: How quickly user feedback influences AI behavior (immediate prompt adjustment vs. weekly review)

### 6. Transparency and Disclosure
What users must know about AI in the product:

- **AI labeling**: How AI-generated content is visually distinguished from human content
- **Limitations disclosure**: Where and how the product communicates what the AI can and cannot do
- **Data usage disclosure**: What user data is sent to AI providers, what's retained, what's used for training
- **Confidence display**: When and how uncertainty is communicated (percentage, qualitative label, visual indicator)

### 7. Monitoring and Alerting
Production observability for AI features:

| Metric | Alert Threshold | Response |
|---|---|---|
| AI error rate | > 5% over 15 min | Page on-call, activate fallback |
| Average latency | > 10s for interactive features | Investigate, consider model downgrade |
| User negative feedback rate | > 20% of interactions | Review recent prompts, check for regression |
| Cost per user per day | > 2x baseline | Investigate usage patterns, check for abuse |
| Content safety violations | Any HIGH severity | Immediate investigation, potentially disable feature |

## Anti-Patterns (DO NOT)
- ❌ Ship AI features without any output validation
- ❌ Present AI output as authoritative fact without disclaimers
- ❌ Allow AI to take irreversible actions without human confirmation
- ❌ Ignore user feedback on AI quality — this is your most valuable signal
- ❌ Add guardrails that make the product unusable — safety and usability must balance
- ❌ Assume the AI will never produce harmful content — design for failure

## Downstream Consumers
- `docs/AI_COMPLIANCE.md` (29) — compliance uses these guardrail definitions
- `docs/FEATURE_EXECUTION.md` (21) — features reference these safety patterns

## Revision Trigger
If guardrail requirements make an AI feature impractical (too many approval steps, too many disclaimers), flag the conflict with `AI_ARCHITECTURE.md` and propose redesigning the feature to reduce its risk level.

## Save As
`docs/AI_GUARDRAILS.md`

## Prompt
```text
<role>
Act as a Responsible AI Engineer who has shipped AI products in regulated industries and dealt with real production failures.
</role>

<context>
You are generating Artifact 27 of 35 in the Founder Mode system. This is the safety document that answers: "What happens when the AI does something wrong?" AI Compliance (29) references these guardrails.
This artifact is CONDITIONAL — only generate when the product uses AI/ML models.
</context>

<upstream_artifacts>
Read all three:
- @docs/AI_ARCHITECTURE.md — Section 1 (AI Feature Inventory), Section 3 (Prompt Architecture)
- @docs/PRD.md — to understand what the product promises users
- @docs/USER_PERSONAS.md — to understand the impact of AI failures on real users
</upstream_artifacts>

<task>
1. For each AI feature, perform threat modeling:
   - What's the worst thing the AI could say or do?
   - Who is harmed? How quickly would you know? Can the damage be reversed?
2. Classify each AI feature by risk level (Low/Medium/High).
3. Define input guardrails (prompt injection prevention, context management).
4. Define output guardrails (content safety, structural validation, factual grounding).
5. Create the Human-in-the-Loop decision matrix.
6. Design the feedback and correction system.
7. Define transparency/disclosure requirements and monitoring/alerting thresholds.
</task>

<output_format>
Markdown document with exactly 7 sections as specified in Output Requirements.
Risk classification and HITL matrix must be tables.
Monitoring must include specific alert thresholds.
Save as docs/AI_GUARDRAILS.md.
</output_format>

<constraints>
- Every AI feature MUST be classified by risk level.
- HIGH risk features MUST require human-in-the-loop approval.
- Guardrails MUST NOT make the product unusable — balance safety and UX.
- User feedback system is MANDATORY for all AI features.
- Monitoring alerts MUST include specific thresholds and response actions.
</constraints>
```
