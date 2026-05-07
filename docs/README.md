# docs — generated artifacts

During a project, your AI agent generates artifacts (PRD, architecture, etc.) from `prompts/` and saves them here **per project**.

**Suggested layout** (`docs/projects/` exists so Git keeps the folder)

```
docs/
  projects/
    my-app/
      PROJECT_BRIEF.md
      PRD.md
      ...
```

Or keep a flat `docs/` for a single active project. Pick one convention and stay consistent.

`docs/system/` holds **shared** templates (operating contract, intake, learning loop). Keep those; add project outputs under `docs/projects/<name>/` or alongside per your convention.
