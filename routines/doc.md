---
description: Update documentation to match the current state of the codebase
---

# Documentation Update Workflow

## Steps

1. Scan all recently modified or created files.

2. For each exported function or class:
   - Verify JSDoc/TSDoc comment exists
   - If missing, generate a clear documentation comment
   - If outdated, update to match current behavior

3. Update `README.md`:
   - Verify setup instructions are accurate
   - Update feature list if new features were added
   - Update environment variable documentation if changed

4. Update architecture docs if structural changes were made:
   - `@docs/ARCHITECTURE.md` — if new services, modules, or layers were added
   - `@docs/API_SPEC.md` — if new endpoints or changed request/response schemas
   - `@docs/DATABASE_SCHEMA.md` — if new collections, fields, or relationships

5. Report:
   - Files where documentation was added or updated
   - Docs artifacts that were modified
   - Any documentation gaps that remain

## Rules
- Documentation must be concise and accurate — no filler text
- Keep README focused on "how to run" and "what this does"
- Architecture docs must reflect the actual code, not aspirational design
