# 22 — UX AUDIT

## Purpose
Systematically evaluate the built product against design system rules, accessibility standards, and user experience best practices. Catch issues before users do.

## Role
You are acting as a **Principal UX Auditor** with a critical eye.

## Upstream Dependencies
- `docs/UI_SPEC.md` (Artifact 15)
- `docs/DESIGN_SYSTEM.md` (Artifact 11)
- `docs/CUSTOMER_JOURNEY.md` (Artifact 08)

## Required Inputs
- `@docs/UI_SPEC.md`
- `@docs/DESIGN_SYSTEM.md`
- `@docs/CUSTOMER_JOURNEY.md`

## Operational Rules
- Audit the actual built product, not the documentation.
- Use the browser sub-agent to visually inspect screens.
- Be ruthlessly honest — the purpose is to find problems, not confirm quality.

## Output Requirements
Generate a markdown document with these exact sections:

```markdown
# UX AUDIT — [Product Name]

## 1. Design System Compliance Audit
## 2. Responsive Audit
## 3. Interaction Audit
## 4. Accessibility Audit
## 5. Performance Audit
## 6. Findings Summary
```

### Section Details
1. **Design System Compliance** — per-screen: token usage, component library compliance, layout template adherence
2. **Responsive Audit** — test at 375, 768, 1024, 1440: content reflow, navigation, touch targets ≥ 44px
3. **Interaction Audit** — hover states, focus indicators, loading states, error states
4. **Accessibility Audit** — WCAG AA contrast, alt text, form labels, focus order, screen reader
5. **Performance Audit** — FMP <2s, no render-blocking JS, optimized images
6. **Findings Summary** — ranked by severity: 🔴 Critical, 🟡 Major, 🟢 Minor

## Few-Shot Example (Partial)
> **Findings Summary (Gold Standard):**
>
> | # | Severity | Screen | Issue | Impact | Fix |
> |---|---|---|---|---|---|
> | 1 | 🔴 | Dashboard | Stat cards use hard-coded `#333` instead of `var(--color-text-primary)` | Theme switching breaks | Replace with token reference |
> | 2 | 🔴 | Login | No focus indicator on email input | Keyboard users can't navigate | Add `:focus-visible` outline |
> | 3 | 🟡 | Settings | Form layout breaks below 400px | Small phones show overlapping elements | Add `flex-wrap` to form group |
> | 4 | 🟡 | Dashboard | Loading state shows blank screen for 3s | Users think app is broken | Add skeleton loader |
> | 5 | 🟢 | All | Hover animation on cards slightly jittery | Polish issue, not functional | Use `will-change: transform` |

## Anti-Patterns (DO NOT)
- ❌ Audit documentation instead of the actual built product
- ❌ Only test on desktop — mobile is the majority of web traffic
- ❌ Skip accessibility — legal liability and user exclusion
- ❌ Report findings without severity ranking and fix suggestions

## Save As
`docs/UX_AUDIT.md`

## Prompt
```text
<role>
Act as a Principal UX Auditor conducting a ruthlessly honest quality assessment.
</role>

<context>
You are generating Artifact 22 of 35 in the Founder Mode system. This audit catches design and UX issues before real users encounter them. The audit must compare the BUILT product against the design specifications.
</context>

<upstream_artifacts>
Reference for comparison:
- @docs/UI_SPEC.md — what screens SHOULD look like
- @docs/DESIGN_SYSTEM.md — interaction rules that SHOULD be followed
- @docs/CUSTOMER_JOURNEY.md — Section 7 (Churn Risks) — high-value screens to audit first
</upstream_artifacts>

<task>
1. Think step by step:
   - Which screens are highest-risk for churn? Audit those first.
   - What design tokens should be in use? Check for hard-coded values.
   - What interaction states are defined? Check they all work.
   - Does the product work at all 4 breakpoints?
2. Audit the built product (use browser to inspect) against all specifications.
3. Check design system compliance, responsive behavior, interactions, accessibility, and performance.
4. Rank all findings by severity: 🔴 Critical → 🟡 Major → 🟢 Minor.
5. Every finding must include the specific fix.
</task>

<output_format>
Markdown document with exactly 6 sections.
Findings Summary must be a table ranked by severity.
Every finding must include: screen, issue, impact, and fix.
Save as docs/UX_AUDIT.md.
</output_format>

<constraints>
- Audit the BUILT product, not documentation.
- Test at ALL 4 breakpoints (375, 768, 1024, 1440).
- Every finding MUST include a specific fix — not just a description.
- 🔴 Critical findings must be fixed before launch.
- Touch targets on mobile MUST be ≥ 44px.
</constraints>
```
