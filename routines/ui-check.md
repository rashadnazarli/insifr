---
description: Visual verification of UI across breakpoints using browser sub-agent
---

# UI Check Workflow

## Steps

1. Launch the application in the built-in browser.

2. Verify at each breakpoint:
   - **Mobile** (375px width)
   - **Tablet** (768px width)
   - **Desktop** (1024px width)
   - **Wide** (1440px width)

3. For each breakpoint, check:
   - Layout matches the template from `@docs/LAYOUT_SYSTEM.md`
   - Components render correctly from `@docs/COMPONENT_LIBRARY.md`
   - Colors match `@docs/DESIGN_TOKENS.md`
   - Typography scales correctly
   - Spacing follows the grid system
   - Interactive elements have proper hover/focus/active states
   - Touch targets are ≥44px on mobile
   - Navigation adapts (bottom nav on mobile, sidebar on desktop)

4. Capture screenshots at each breakpoint as visual evidence.

5. If dark mode is implemented, repeat checks with `[data-theme="dark"]`.

6. Report findings:
   - ✅ Passed checks
   - ❌ Failed checks with specific description and screenshot
   - Suggested fixes for each failure

## Rules
- Do not approve UI that deviates from design tokens
- Screenshots are mandatory — no text-only approvals
- Check both empty states and data-populated states
