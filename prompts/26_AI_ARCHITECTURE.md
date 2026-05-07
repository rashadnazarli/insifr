# 26 — AI ARCHITECTURE

> ⚡ CONDITIONAL: This artifact is only generated when the product uses AI/ML models (LLMs, classifiers, recommendation engines, embeddings, or any model-based inference).

## Purpose
Define the AI-specific technical architecture: which models, how they're called, how prompts are structured, how costs are controlled, and how the system behaves when AI fails. This document complements `docs/ARCHITECTURE.md` (prompt **16**) — it does not replace it.

## Role
You are acting as a **Senior AI Systems Architect** who has shipped production AI products with real cost constraints and reliability requirements.

## Upstream Dependencies
- `docs/ARCHITECTURE.md` (Artifact 16)
- `docs/PRD.md` (Artifact 05)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)
- `docs/API_SPEC.md` (Artifact 18)

## Downstream Consumers
- `docs/AI_GUARDRAILS.md` (27) — safety controls depend on this architecture
- `docs/DATA_GOVERNANCE.md` (28) — data flow maps reference this
- `docs/AI_COMPLIANCE.md` (29) — compliance assessment uses this

## Required Inputs
- `@docs/ARCHITECTURE.md`
- `@docs/PRD.md`
- `@docs/PRODUCT_STRATEGY.md`
- `@docs/API_SPEC.md`

## Before You Start — Reality Check
Answer these questions before designing the AI architecture:
1. Which user-facing features REQUIRE AI inference? (Not "would benefit from" — require.)
2. What is the acceptable latency for each AI feature? (< 2s interactive, < 30s background, < 5min_batch)
3. What is the monthly budget for AI inference at 100 users? At 1,000? At 10,000?
4. What happens when the AI is wrong? What's the blast radius?

## Operational Rules
- Favor API-based models over self-hosted until unit economics demand otherwise
- Design for model-swappability from day one — never hardcode a specific model into business logic
- Separate prompt engineering from application code — prompts are configuration, not code
- Every AI call must have a timeout, a fallback, and a cost cap

## Output Requirements

### 1. AI Feature Inventory
Table mapping each AI-powered feature to its requirements:

| Feature | Model Type | Latency Req | Accuracy Req | Cost Sensitivity | Fallback |
|---|---|---|---|---|---|
| e.g., Chat assistant | LLM (conversational) | < 3s TTFB | High | Medium | Canned responses |
| e.g., Document summary | LLM (completion) | < 10s | Medium | High | "Summary unavailable" |

### 2. Model Selection Matrix
For each AI feature, justify the model choice:

| Feature | Primary Model | Why | Fallback Model | Why Fallback |
|---|---|---|---|---|
| e.g., Chat | Claude Sonnet | Best cost/quality for conversation | Claude Haiku | 3x cheaper, acceptable for simple queries |

Include model version, provider, pricing per token, and context window size.

### 3. Prompt Architecture
For each prompt in the system:
- **Prompt ID**: Unique identifier (e.g., `PROMPT_CHAT_SYSTEM`, `PROMPT_SUMMARIZE`)
- **Type**: System prompt, user prompt template, few-shot examples
- **Template**: The actual prompt with `{{variable}}` placeholders
- **Variables**: What gets injected and from where
- **Output format**: Expected response structure (JSON, markdown, plain text)
- **Token budget**: Maximum input + output tokens for this prompt
- **Versioning**: Prompts must be versioned (e.g., `v1.0`, `v1.1`) with a changelog

Prompts MUST be stored as configuration files (`src/prompts/*.md` or `src/prompts/*.json`), not inline strings in code.

### 4. Inference Routing
How AI requests flow through the system:
- **Request path**: User action → API endpoint → prompt assembly → model call → response processing → user display
- **Synchronous vs. async**: Which features return AI responses in the HTTP response vs. via polling/webhooks/SSE
- **Queue strategy**: For batch or background AI tasks, define the job queue (Cloud Tasks, Pub/Sub, or simple Firestore queue)
- **Caching**: Which AI responses can be cached, for how long, and keyed by what
- **Rate limiting**: Per-user and global limits on AI calls

### 5. Cost Modeling
Concrete cost projections:

| Scenario | Users | AI Calls/Day | Avg Tokens/Call | Model | Daily Cost | Monthly Cost |
|---|---|---|---|---|---|---|
| Soft launch | 50 | 200 | 2,000 | Sonnet | $X | $Y |
| Growth | 1,000 | 4,000 | 2,000 | Sonnet | $X | $Y |
| Scale | 10,000 | 40,000 | 2,000 | Sonnet | $X | $Y |

Include optimization strategies:
- Prompt compression techniques (removing redundant context, summarizing history)
- Model tiering (use cheaper model for simple queries, expensive model for complex ones)
- Response caching hit rate targets
- Token budget enforcement (hard limits per request and per user/day)

### 6. Error Handling and Degradation
For each AI feature, define:
- **Timeout**: Maximum wait time before fallback activates
- **Retry policy**: How many retries, with what backoff
- **Fallback behavior**: What the user sees when AI fails (cached response, static content, human handoff, graceful error message)
- **Circuit breaker**: At what failure rate does the system stop calling the AI and switch entirely to fallback
- **Monitoring**: What metrics trigger alerts (error rate > 5%, latency > 10s, cost spike > 2x daily average)

### 7. Evaluation Framework
How you measure whether the AI is performing well enough:
- **Accuracy metrics**: For each feature, define what "correct" means and how it's measured
- **A/B testing infrastructure**: How to test prompt changes safely
- **Feedback collection**: How users report bad AI outputs (thumbs up/down, explicit correction, implicit signal)
- **Regression testing**: A set of golden input/output pairs that must pass before deploying prompt changes

## Anti-Patterns (DO NOT)
- ❌ Hardcode model names or API keys in application code
- ❌ Concatenate user input directly into prompts without sanitization
- ❌ Send entire conversation history on every request without summarization or truncation
- ❌ Assume AI responses are always valid JSON/structured — always parse defensively
- ❌ Build fine-tuning into v1 — use prompt engineering first, fine-tune only when you have 1,000+ labeled examples
- ❌ Ignore cost modeling — "we'll optimize later" means "we'll run out of money first"
- ❌ Use a single monolithic system prompt that tries to handle every feature — separate concerns into distinct prompts

## Revision Trigger
If cost modeling reveals that the product is economically unviable at the target price point, flag the conflict with `PRODUCT_STRATEGY.md` and propose changes (simpler AI features, cheaper models, usage limits, higher pricing).

## Save As
`docs/AI_ARCHITECTURE.md`

## Prompt
```text
<role>
Act as a Senior AI Systems Architect who has shipped production AI products with real cost constraints and reliability requirements.
</role>

<context>
You are generating Artifact 26 of 35 in the Founder Mode system. This AI architecture complements the main Architecture (Artifact 16) with AI-specific decisions. AI Guardrails (27), Data Governance (28), and AI Compliance (29) all depend on this document.
This artifact is CONDITIONAL — only generate when the product uses AI/ML models.
</context>

<upstream_artifacts>
Read all:
- @docs/ARCHITECTURE.md — Section 2 (Technology Stack), Section 15 (AI/ML Extension)
- @docs/PRD.md — identify which features REQUIRE AI inference
- @docs/PRODUCT_STRATEGY.md — pricing model to validate unit economics
- @docs/API_SPEC.md — endpoints that will call AI models
</upstream_artifacts>

<task>
1. First, answer these Reality Check questions:
   - Which features REQUIRE AI inference? (not "would benefit from")
   - What is the acceptable latency for each? (<2s interactive, <30s background)
   - What is the monthly budget at 100, 1000, 10000 users?
   - What happens when the AI is wrong? What's the blast radius?
2. Create the AI Feature Inventory and Model Selection Matrix.
3. Design the prompt architecture with versioning and storage strategy.
4. Define inference routing: sync vs. async, caching, rate limiting.
5. Build the cost model with optimization strategies.
6. Define error handling, degradation, and circuit breaker thresholds.
7. Create the evaluation framework for measuring AI quality.
</task>

<output_format>
Markdown document with exactly 7 sections as specified in Output Requirements.
AI Feature Inventory and Model Selection must be tables.
Cost modeling must include 3 scale tiers with per-model pricing.
Save as docs/AI_ARCHITECTURE.md.
</output_format>

<constraints>
- Model names MUST NOT be hardcoded in application code — use config.
- Prompts MUST be stored as configuration files, not inline strings.
- Every AI call MUST have a timeout, fallback, and cost cap.
- Cost model MUST be validated against the product's pricing/business model.
- If cost modeling reveals the product is unviable, FLAG the conflict.
</constraints>
```
