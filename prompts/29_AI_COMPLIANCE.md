# 29 — AI COMPLIANCE & RESPONSIBLE AI

> ⚡ CONDITIONAL: This artifact is only generated when the product uses AI/ML models.

## Purpose
Document the AI system's compliance posture, responsible AI practices, and auditability. This is the document a regulator, enterprise customer, or journalist would ask for. Build it before they ask.

## Role
You are acting as an **AI Ethics and Compliance Officer** with experience in EU AI Act classification, model documentation, and responsible AI frameworks.

## Upstream Dependencies
- `docs/AI_ARCHITECTURE.md` (Artifact 26)
- `docs/AI_GUARDRAILS.md` (Artifact 27)
- `docs/DATA_GOVERNANCE.md` (Artifact 28)
- `docs/PRD.md` (Artifact 05)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)

## Downstream Note
This is a terminal artifact — used for regulatory compliance and enterprise sales.

## Required Inputs
- `@docs/AI_ARCHITECTURE.md`
- `@docs/AI_GUARDRAILS.md`
- `@docs/DATA_GOVERNANCE.md`
- `@docs/PRD.md`
- `@docs/PRODUCT_STRATEGY.md`

## Operational Rules
- Be honest about what the AI can and cannot do — overstatement creates legal liability
- Document current state AND planned improvements — auditors respect a roadmap
- This artifact is a living document — update it every time the AI system changes materially

## Output Requirements

### 1. AI System Overview (Model Card Format)
Following the standard model card framework, document for each AI component:

**Model Identity:**
- Model name, version, and provider (e.g., Claude Sonnet 4, Anthropic)
- Is this a hosted API, fine-tuned model, or self-hosted?
- Date of last model update / version change

**Intended Use:**
- Primary use cases this model serves in the product
- Users the model is designed to serve
- Out-of-scope uses that the model should NOT be used for

**Capabilities and Limitations:**
- What the model does well in the product's context
- Known limitations and failure modes
- Situations where the model's output should not be trusted

**Performance Metrics:**
- Accuracy / quality metrics for the product's specific use cases (not generic benchmarks)
- Latency statistics (p50, p95, p99)
- Error rate and types of errors observed

**Ethical Considerations:**
- Known biases relevant to the product's domain
- Fairness testing results (if applicable)
- Steps taken to mitigate identified biases

### 2. EU AI Act Risk Classification
Classify the product's AI features using the EU AI Act risk tiers:

| AI Feature | Risk Tier | Justification | Compliance Requirements |
|---|---|---|---|
| e.g., Content generation for users | Limited Risk | No high-risk domain, user maintains control | Transparency obligation — label as AI-generated |
| e.g., Hiring recommendation | High Risk | Affects employment decisions | Full conformity assessment, human oversight, bias audit |
| e.g., Spam filter | Minimal Risk | No impact on fundamental rights | No specific obligations |

**Risk tier definitions:**
- **Unacceptable**: Banned (social scoring, real-time biometric identification). If any feature falls here, remove it.
- **High Risk**: Affects fundamental rights (employment, education, creditworthiness, law enforcement, critical infrastructure). Requires conformity assessment, risk management system, human oversight, transparency, accuracy/robustness testing.
- **Limited Risk**: Interacts with people but doesn't affect fundamental rights. Requires transparency (disclose AI involvement).
- **Minimal Risk**: No obligations under EU AI Act.

For most Founder Mode products, features will fall under Limited or Minimal risk. If ANY feature is High Risk, flag it immediately — the compliance requirements are substantial.

### 3. Responsible AI Principles
Document how the product embodies each principle:

**Fairness:**
- How is the product tested for discriminatory outcomes across user groups?
- What groups are tested? (At minimum: gender, age, language, geographic location)
- How are biased outputs detected and corrected in production?
- For MVP: At minimum, document WHICH bias tests will be conducted pre-launch and provide a testing timeline.

**Transparency:**
- Where does the product disclose that AI is being used?
- How can users understand WHY the AI produced a specific output?
- Is the system's decision-making process explainable to a non-technical user?

**Accountability:**
- Who is responsible when the AI produces a harmful output? (Role, not person)
- What is the incident response process for AI-related harm?
- How are AI-related complaints handled and escalated?

**Privacy:**
- Summarize key commitments from `DATA_GOVERNANCE.md`
- How is user consent obtained for AI data processing?
- How can users opt out of AI features?

**Safety:**
- Summarize key controls from `AI_GUARDRAILS.md`
- What is the process for disabling AI features in an emergency?
- How are new AI capabilities tested before deployment?

### 4. Audit Trail Requirements
What must be logged for accountability:

| Event | What to Log | Retention | Who Can Access |
|---|---|---|---|
| AI inference request | Timestamp, user ID, prompt template ID (not content), model, tokens used | 90 days | Founder, monitoring system |
| AI response served | Timestamp, response hash (not content), latency, token count | 90 days | Founder, monitoring system |
| User feedback on AI | Timestamp, user ID, feedback type, feature | 1 year | Founder |
| Prompt version change | Timestamp, old version, new version, reason for change | Indefinite | Founder |
| AI safety incident | Full incident report, resolution, root cause | Indefinite | Founder |
| Model version change | Timestamp, old model, new model, evaluation results | Indefinite | Founder |

**Implementation note**: For MVP, structured logging to a Firestore `audit_log` collection is sufficient. Do not over-engineer the audit system — a simple append-only collection with TTL indexes is enough.

### 5. OWASP LLM Top 10 Compliance Status
Self-assessment against each risk:

| # | Risk | Status | Controls in Place | Gaps |
|---|---|---|---|---|
| LLM01 | Prompt Injection | ✅/⚠️/❌ | Input sanitization, system/user boundary | Describe gaps |
| LLM02 | Insecure Output Handling | ✅/⚠️/❌ | Output sanitization, format validation | ... |
| LLM03 | Training Data Poisoning | ✅/⚠️/❌ | N/A (using API, not fine-tuning) | ... |
| LLM04 | Model DoS | ✅/⚠️/❌ | Rate limiting, input length caps | ... |
| LLM05 | Supply Chain | ✅/⚠️/❌ | Using established provider (Anthropic) | ... |
| LLM06 | Sensitive Info Disclosure | ✅/⚠️/❌ | PII redaction, system prompt protection | ... |
| LLM07 | Insecure Plugin Design | ✅/⚠️/❌ | Tool input validation, limited permissions | ... |
| LLM08 | Excessive Agency | ✅/⚠️/❌ | HITL for irreversible actions | ... |
| LLM09 | Overreliance | ✅/⚠️/❌ | Confidence indicators, disclaimers | ... |
| LLM10 | Model Theft | ✅/⚠️/❌ | No custom model weights exposed | ... |

### 6. User-Facing Disclosures
Draft the actual text that appears in the product:

**AI Disclosure Notice** (shown on first use of any AI feature):
> [Draft the notice — it should explain that AI is used, what data is processed, limitations, and how to provide feedback]

**AI Content Label** (shown on every AI-generated output):
> [Draft the label — e.g., "Generated by AI • May contain errors • [Edit] [Report]"]

**Privacy Policy AI Section** (to be added to the product's privacy policy):
> [Draft the section covering AI data processing, third-party AI providers, data retention for AI, and user rights]

**Terms of Service AI Section** (to be added to ToS):
> [Draft the section covering AI limitations, liability, user responsibilities, and prohibited uses]

## Anti-Patterns (DO NOT)
- ❌ Claim the AI is "unbiased" — all models have biases. Document them honestly.
- ❌ Skip the model card because "we're just using an API" — you're still deploying AI to users
- ❌ Write compliance docs that nobody reads — make them actionable with clear status indicators
- ❌ Treat compliance as a one-time exercise — this document must be updated with every AI system change
- ❌ Copy generic responsible AI principles without mapping them to specific product behaviors
- ❌ Defer all compliance to "when we get enterprise customers" — build the foundation now when it's cheap

## Revision Trigger
If compliance review reveals that an AI feature cannot meet its risk tier requirements, flag the conflict with `AI_ARCHITECTURE.md` and `AI_GUARDRAILS.md`. Options: redesign the feature to lower its risk tier, add required controls, or remove the feature.

## Save As
`docs/AI_COMPLIANCE.md`

## Prompt
```text
<role>
Act as an AI Ethics and Compliance Officer experienced in EU AI Act classification, model documentation, and responsible AI frameworks.
</role>

<context>
You are generating Artifact 29 of 35 in the Founder Mode system. This is the compliance document a regulator, enterprise customer, or journalist would ask for. Build it before they ask.
This artifact is CONDITIONAL — only generate when the product uses AI/ML models.
</context>

<upstream_artifacts>
Read all five:
- @docs/AI_ARCHITECTURE.md — Section 2 (Model Selection), Section 5 (Cost Modeling)
- @docs/AI_GUARDRAILS.md — all 7 sections (guardrails to reference)
- @docs/DATA_GOVERNANCE.md — Section 3 (PII Handling), Section 5 (Retention)
- @docs/PRD.md — what the product promises users
- @docs/PRODUCT_STRATEGY.md — target market (determines which regulations apply)
</upstream_artifacts>

<task>
1. Think step by step:
   - What AI models are used and how? (Model Card for each)
   - What EU AI Act risk tier does each feature fall under?
   - How do we demonstrate fairness, transparency, accountability, privacy, and safety?
   - What audit trail is needed?
   - What are the OWASP LLM Top 10 risks and our status?
2. Create Model Cards for each AI component.
3. Classify features under EU AI Act risk tiers.
4. Document Responsible AI principles with product-specific implementations.
5. Define audit trail requirements.
6. Self-assess against OWASP LLM Top 10.
7. Draft user-facing disclosures (AI notice, content labels, privacy policy section, ToS section).
</task>

<output_format>
Markdown document with exactly 6 sections as specified in Output Requirements.
EU AI Act classification and OWASP LLM Top 10 must be tables.
User-facing disclosures must include draft copy ready for legal review.
Save as docs/AI_COMPLIANCE.md.
</output_format>

<constraints>
- Model Cards are MANDATORY for every AI component, even API-based models.
- If ANY feature is HIGH risk under EU AI Act, FLAG immediately.
- OWASP LLM Top 10 self-assessment is MANDATORY with status per risk.
- User-facing disclosures MUST include actual draft copy, not just guidelines.
- This is a LIVING document — must be updated with every AI system change.
</constraints>
```
