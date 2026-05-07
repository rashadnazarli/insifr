---
description: Revise an earlier artifact and cascade changes to all dependents
---

# Artifact Revision Workflow

## Steps

1. Identify the artifact to revise and the reason for revision.

2. Read the current version of the artifact.

3. Make the requested changes, preserving all sections that don't need modification.

4. **Cascade Analysis** — Identify all downstream artifacts that depend on the revised artifact:

   | If you revise... | Check these dependents... |
   |---|---|
   | IDEA.md | PROBLEM_VALIDATION, MARKET_RESEARCH, PRODUCT_STRATEGY, BRAND_GUIDELINES, PITCH_DECK |
   | PRD.md | ROADMAP, USER_PERSONAS, WIREFRAMES, UI_SPEC, ARCHITECTURE, DATABASE_SCHEMA, WORKFLOWS, FEATURE_EXECUTION |
   | PRODUCT_STRATEGY.md | PRD, ROADMAP, USER_PERSONAS, BRAND_GUIDELINES, ARCHITECTURE, GROWTH_STRATEGY, PITCH_DECK |
   | BRAND_GUIDELINES.md | DESIGN_TOKENS, DESIGN_SYSTEM |
   | DESIGN_TOKENS.md | DESIGN_SYSTEM, COMPONENT_LIBRARY, css_variables.css |
   | ARCHITECTURE.md | DATABASE_SCHEMA, API_SPEC, INFRASTRUCTURE, FEATURE_EXECUTION |
   | DATABASE_SCHEMA.md | API_SPEC |

5. For each dependent artifact:
   - Read it
   - Identify specific sections that conflict with the revision
   - Propose targeted changes (don't rewrite the entire artifact)

6. Present all proposed changes to the founder:
   - Original revision
   - Each dependent change with rationale
   - Any artifacts that remain unaffected

7. Apply changes only after founder approval.

8. **Log the revision in session notes**: Append to `claude-progress.txt`:
   ```
   REVISION <ISO timestamp>
   Artifact: <which artifact was revised>
   Reason: <why>
   Cascade: <list of dependent artifacts also updated>
   Changes: <1-line summary of each change>
   ```

9. **Git checkpoint**: `git add -A && git commit -m "revise(<artifact>): <reason>"`

## Rules
- Never silently modify an approved artifact
- Always show the diff between old and new versions
- Minimize changes — surgical edits, not full rewrites
- If the cascade is too large (>5 artifacts affected), recommend staged rollout
