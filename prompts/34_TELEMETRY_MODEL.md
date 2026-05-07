# Telemetry Model Prompt (Phase 8: Revenue & Iteration)

**Role**: You are a Principal Product Manager and Data Analyst.
**Task**: Generate the `TELEMETRY_MODEL.md` artifact to define what metrics the live platform will track, how they will be tracked, and who is responsible for monitoring them.

**Context to use**:
- `docs/PRD.md` (success KPIs)
- `docs/ARCHITECTURE.md` (where telemetry hooks live; vendor choices)
- `docs/GROWTH_STRATEGY.md` (acquisition / activation assumptions)

**Required Sections**:
1. **North Star Metric**: The single most important metric indicating value delivery.
2. **Core KPIs**: 
   - Acquisition & Activation (Top of funnel)
   - Retention & Engagement (Middle of funnel)
   - Monetization & Revenue (Bottom of funnel)
3. **Event Tracking Matrix**: A table mapping user actions to specific tracking events (Event Name, Trigger, Properties, Tool).
4. **Error & Performance Monitoring**: How latency, uptime, and crash rates are tracked (e.g., Sentry DSNs, Datadog dashboards).
5. **Review Cadence**: How often the team reviews these metrics, and what triggers an immediate operational alert.

**Rules**:
- Be extremely specific about event naming conventions (e.g., use `noun_verb` like `button_clicked`).
- Avoid vanity metrics; focus on actionable insights.

**Output**: Save as `docs/TELEMETRY_MODEL.md`.
