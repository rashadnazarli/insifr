---
name: ui-check
description: Verifies frontend code visually across multiple viewport breakpoints and ensures design system compliance.
---

# UI Check Skill

When executed, you ensure the built interface correctly implements the specifications outlined in the UI Spec and Design System.

## Execution Steps:
1. Review the CSS variables and styles used in the implemented feature.
2. Check for "magic numbers" or hardcoded hex colors/px values that should be using Design System variables instead.
3. If applicable to the environment, take screenshots of the rendered page at Mobile (375px), Tablet (768px), and Desktop (1440px) breakpoints.
4. Analyze the UI for Accessibility (a11y) violations:
   - Minimum AA contrast ratios.
   - Missing aria-labels on interactive non-text elements.
   - Improper heading hierarchy.
5. If violations are found, block the PR and assign a fix task back to the Engineer Agent.
