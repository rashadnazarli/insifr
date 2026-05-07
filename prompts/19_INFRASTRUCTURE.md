# 19 — INFRASTRUCTURE

## Purpose
Define the deployment, hosting, and operational infrastructure plan. Where does this run, how does it deploy, and what does it cost?

## Role
You are acting as a **DevOps and Infrastructure Architect**.

## Upstream Dependencies
- `docs/ARCHITECTURE.md` (Artifact 16)
- `docs/API_SPEC.md` (Artifact 18)

## Required Inputs
- `@docs/ARCHITECTURE.md`
- `@docs/API_SPEC.md`

## Operational Rules
- Optimize for solo-founder operations: minimal infra, maximum automation.
- Default to Firebase Hosting + Cloud Functions unless ARCHITECTURE specifies otherwise.
- Include cost estimates at different scale tiers (free, 100 users, 1000 users).
- CI/CD should be simple — ideally a single deploy command.
- For any cost estimate lacking official pricing data, output `**ESTIMATED:** [basis for estimate]`.

## Output Requirements
Generate a markdown document with these exact sections:

```markdown
# INFRASTRUCTURE — [Product Name]

## 1. Hosting Strategy
## 2. Deployment Pipeline
## 3. Domain & DNS
## 4. SSL/TLS
## 5. System Design Primer Assessment (SPOF & Bottlenecks)
## 6. Monitoring & Logging
## 7. Backup Strategy & Data Replication
## 8. Cost Estimation
## 9. Security Checklist
## 10. Scaling Plan
```

### Section Details
1. **Hosting Strategy** — where the frontend and backend are hosted
2. **Deployment Pipeline** — single-command deploy, staging vs. production, env var management
3. **Domain & DNS** — custom domain setup
4. **SSL/TLS** — certificate management (usually automatic)
5. **System Design Primer Assessment (SPOF & Bottlenecks)** — identify Single Points of Failure, evaluate DB read/write bottlenecks, and prescribe proxy/API gateway topologies.
6. **Monitoring & Logging**:
   - Error tracking: Sentry (free tier: 5k events/month)
   - Performance: Firebase Performance Monitoring
   - Alerting: error spike >10/min, uptime failure
7. **Backup Strategy & Data Replication** — database backup frequency, Active-Passive / Active-Active node recommendations, and disaster restoration process.
8. **Cost Estimation**:

| Tier | Users | Hosting | Functions | DB | Auth | Monitoring | Total/mo |
|---|---|---|---|---|---|---|---|

9. **Security Checklist** — HTTPS, CORS, security headers, CSP
10. **Scaling Plan** — what changes at each growth milestone

## Few-Shot Example (Partial)
> **Section 7 — Cost Estimation (Gold Standard):**
>
> | Tier | Users | Hosting | Functions | DB | Auth | Monitoring | Total/mo |
> |---|---|---|---|---|---|---|---|
> | Pre-revenue | 0-50 | $0 (Firebase free) | $0 (2M invocations) | $0 (1GB) | $0 (50K MAU) | $0 (Sentry free) | **$0** |
> | Early traction | 100 | $0 | $0 | $0 | $0 | $0 | **$0** |
> | Growth | 1,000 | $0 | ~$5 (4M invocations) | ~$18 (5GB) | $0 | $0 | **~$23/mo** |
> | Scale trigger | 10,000 | $25 | ~$50 | ~$90 | $0 | $29 (Sentry Team) | **~$194/mo** |
>
> **Key insight:** The entire stack stays free until ~2,000 active users, giving the founder a long runway.

## Anti-Patterns (DO NOT)
- ❌ Recommend Kubernetes or Docker Swarm for a pre-revenue product
- ❌ Require manual deployment steps — automate everything
- ❌ Skip cost estimates — founders need to know what they're committing to
- ❌ Forget environment variables — secrets must never be in code
- ❌ Design infrastructure that requires 24/7 monitoring for a solo founder

## Downstream Consumers
This artifact is a terminal artifact — used during deployment.

## Save As
`docs/INFRASTRUCTURE.md`

## Prompt
```text
<role>
Act as a DevOps and Infrastructure Architect optimizing for solo-founder operations.
</role>

<context>
You are generating Artifact 19 of 35 in the Founder Mode system. This infrastructure plan must be operable by a single founder with no DevOps experience. Single-command deploy, serverless defaults, and transparent cost modeling are essential.
</context>

<upstream_artifacts>
Read both:
- @docs/ARCHITECTURE.md — Section 2 (Technology Stack), Section 9 (Performance Budget)
- @docs/API_SPEC.md — Section 6 (Rate Limiting), endpoint count for scaling estimates
</upstream_artifacts>

<task>
1. Think step by step:
   - What hosting matches the technology stack?
   - What's the simplest possible deployment command?
   - What monitoring is essential vs. nice-to-have at pre-revenue?
   - What does this cost at 0, 100, 1000, and 10000 users?
   - What's the first thing that will break at scale?
2. Define the complete infrastructure plan optimized for solo-founder operations.
3. Deployment must be a single command (e.g., `firebase deploy`).
4. Include cost estimates at 4 tiers (free, 100, 1000, 10000 users).
5. Include a security checklist and scaling plan.
</task>

<output_format>
Markdown document with exactly 9 sections as specified in Output Requirements.
Cost estimation must be a table with per-service breakdown.
Save as docs/INFRASTRUCTURE.md.
</output_format>

<constraints>
- Deployment MUST be a single command — no multi-step manual processes.
- Cost estimation MUST include at least 4 tiers with per-service breakdown.
- Monitoring MUST include error tracking from day one (Sentry recommended).
- Environment variables MUST be documented — secrets never in code.
- Use "ESTIMATED: [basis]" for any cost figure lacking official pricing data.
</constraints>
```
