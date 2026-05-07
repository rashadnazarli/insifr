---
description: Apply the Founder Mode system to an existing, ongoing project
---

# Retrofit Founder Mode to an Ongoing Project

This workflow adapts the Founder Mode system for a project that already has code, design, and architecture in place. Instead of generating artifacts from scratch, you **reverse-engineer** existing decisions into structured documentation.

## Prerequisites
- You are inside the project directory you want to retrofit
- The Founder Mode OS engine is active (routines/, prompts/, skills/ are available)

## Steps

### Phase A: Immediate Setup (No codebase scanning needed)

1. Verify the following Founder Mode OS paths are accessible:
   ```
   routines/          ← all workflow files (23+)
   prompts/           ← all 36 prompt templates
   skills/            ← all 43+ skills
   docs/              ← will be created here if it doesn't exist
   ```

2. Create the project's `docs/` folder if it doesn't exist. Report that the retrofit has started.

3. Read `routines/antigravity.md`. Note the operational rules.
   - Ask the founder: "What stack does this project use?" (framework, database, auth, deploy target)
   - Record the stack. This will inform which `stack_tier` to use: `lightweight | standard | full-stack | mobile`

### Phase B: Extract Design Tokens (Priority 1)

4. Scan ALL CSS files in the project for:
   - Color values (hex, rgb, hsl)
   - Font families
   - Font sizes and weights
   - Spacing values (margins, paddings, gaps)
   - Border radii
   - Box shadows
   - Transition/animation durations

5. Organize the extracted values into a design token reference. You don't need a separate `design-system/` folder — document them as part of `docs/DESIGN_TOKENS.md`.

6. Inside `docs/DESIGN_TOKENS.md`, include a **CSS Variables** section:
   - Map all extracted hard-coded values to CSS custom property names
   - Include dark mode variants if the project supports dark mode
   - If dark mode doesn't exist yet, generate sensible dark variants and note this for the founder

7. Generate `docs/DESIGN_TOKENS.md` following the format in `prompts/10_DESIGN_TOKENS.md`:
   - Document every token with its value and usage context
   - Flag any inconsistencies found (e.g., 5 different "primary blue" values across files)

8. Present the token extraction to the founder for review before proceeding.

### Phase C: Extract Architecture (Priority 2)

9. Scan the project directory structure and analyze:
   - `package.json` (dependencies, scripts, framework detection)
   - Folder structure (component organization, service layer, etc.)
   - Configuration files (firebase.json, vite.config, tsconfig, etc.)
   - Entry points (index.html, main.js, app.js, etc.)

10. Generate `docs/ARCHITECTURE.md` following `prompts/16_ARCHITECTURE.md`:
    - Document the ACTUAL stack, not what you'd recommend
    - Map the ACTUAL directory structure
    - Document ACTUAL authentication/authorization patterns
    - Document ACTUAL database structure (Firestore collections, SQL tables, etc.)
    - Note any architectural issues or inconsistencies found

### Phase D: Extract PRD (Priority 3)

11. Scan the codebase to understand what the product currently does:
    - Read all page/route files to identify features
    - Read API endpoints or Cloud Functions to identify backend capabilities
    - Read database schema/models to understand data entities

12. Ask the founder:
    > "Based on my scan, here are the features I've identified: [list]. Is this complete? What's missing? What's the core value proposition?"

13. Generate `docs/PRD.md` following `prompts/05_PRD.md`:
    - Document EXISTING features as functional requirements
    - Ask the founder to identify which features are MVP vs. future
    - Define success metrics based on what the product currently tracks

### Phase E: Extract Component Library (Priority 4)

14. Scan all UI component files and catalog:
    - Component names and file locations
    - Props/attributes they accept
    - Variants (sizes, colors, states)
    - Which design tokens they reference (or should reference)

15. Generate `docs/COMPONENT_LIBRARY.md` following `prompts/12_COMPONENT_LIBRARY.md`:
    - Document existing components as-is
    - Flag components that use hard-coded values instead of tokens
    - Identify missing states (hover, disabled, error, loading, empty)
    - Note component duplication (similar components in different places)

### Phase F: Remaining Artifacts (Generate on Demand)

16. The remaining artifacts can be generated as needed. Present this priority list to the founder:

    **Recommended next (high value):**
    - `docs/LAYOUT_SYSTEM.md` — extract from existing page layouts
    - `docs/DATABASE_SCHEMA.md` — extract from actual database structure
    - `docs/API_SPEC.md` — extract from existing endpoints/functions

    **Generate when planning features:**
    - `docs/UI_SPEC.md` — for upcoming screens
    - `docs/WIREFRAMES.md` — for new feature planning

    **Generate when ready:**
    - `docs/BRAND_GUIDELINES.md` — formalize existing brand decisions
    - `docs/USER_PERSONAS.md` — document known users
    - `docs/CUSTOMER_JOURNEY.md` — map existing user flows

    **Generate before launch/pitch:**
    - `docs/GROWTH_STRATEGY.md`
    - `docs/PITCH_DECK.md`

17. For each artifact the founder chooses to generate, use the corresponding prompt file from `prompts/` and adapt it:
    - Replace "generate from scratch" with "extract from existing codebase"
    - Cross-reference with already-extracted artifacts
    - Flag conflicts between code and documentation

### Phase G: Migration Checklist

18. After core artifacts are extracted, generate a **Migration Report** with:

    **Immediate wins (do now):**
    - [ ] Replace hard-coded colors with `var(--color-*)` tokens
    - [ ] Replace hard-coded spacing with `var(--space-*)` tokens
    - [ ] Replace hard-coded fonts with `var(--font-*)` tokens

    **Short-term improvements (this week):**
    - [ ] Add missing component states (hover, disabled, error)
    - [ ] Consolidate duplicate components
    - [ ] Add JSDoc comments to undocumented functions

    **Ongoing discipline (every feature going forward):**
    - [ ] Use `/new-feature` for every new feature
    - [ ] Use `/review` before merging significant changes
    - [ ] Use `/ui-check` before deploying UI changes
    - [ ] Use `/doc` after any architecture changes

19. Ask the founder:
    > "Do you want me to start applying the immediate wins now, or just document them for later?"

## Rules
- NEVER rewrite existing code without explicit founder approval
- Extract and document WHAT EXISTS, don't impose what SHOULD exist
- Flag inconsistencies but don't fix them silently
- Present the migration report as a checklist, not a mandate
- Prioritize documentation that enables future consistency over retroactive cleanup
