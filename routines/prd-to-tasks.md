---
description: Convert PRD into structured, dependency-aware development tasks using Task Master
---

# /prd-to-tasks — PRD → Task Breakdown

## Prerequisites
- `docs/PRD.md` must exist (Artifact 05)
- `task-master-ai` MCP server must be connected

## Steps

### 1. Validate PRD Exists
Check that `docs/PRD.md` exists and contains Functional Requirements (FR-xxx).

```
If docs/PRD.md does not exist:
  → STOP. Run /new-project or generate Artifact 05 first.
```

### 2. Initialize Task Master (First Run Only)
If `.taskmaster/` directory does not exist:

```bash
task-master init
```

This creates:
- `.taskmaster/tasks/tasks.json` — the task store
- `.taskmaster/docs/prd.txt` — PRD input file
- `.taskmaster/config.json` — Task Master configuration

### 3. Copy PRD to Task Master
Copy `docs/PRD.md` to `.taskmaster/docs/prd.txt`:

```bash
# Windows
copy docs\PRD.md .taskmaster\docs\prd.txt

# macOS/Linux
cp docs/PRD.md .taskmaster/docs/prd.txt
```

### 4. Parse PRD into Tasks
Use Task Master's MCP tool to parse the PRD:

```
Use the task-master-ai tool: parse_prd
  - Input: the contents of docs/PRD.md
  - Focus on: Functional Requirements (FR-xxx), User Stories, and Core Use Cases
```

Task Master will generate structured tasks with:
- Title, description, priority
- Dependencies between tasks
- Complexity estimation
- Suggested implementation order

### 5. Review Generated Tasks

```
Use the task-master-ai tool: list_tasks
```

Review the output. For each task, verify:
- [ ] Task maps to a PRD requirement (FR-xxx or user story)
- [ ] Dependencies are correct (e.g., auth before dashboard)
- [ ] Priority reflects business value
- [ ] No duplicate or overlapping tasks

### 6. Analyze Complexity
Run complexity analysis to identify high-risk tasks:

```
Use the task-master-ai tool: analyze_complexity
```

This identifies:
- Tasks that need decomposition (too large)
- Dependency bottlenecks
- Critical path for MVP

### 7. Get First Task
Determine what to build first:

```
Use the task-master-ai tool: next_task
```

This returns the highest-priority task with all dependencies satisfied.

## Output
After completion, the following exists:
- `.taskmaster/tasks/tasks.json` — structured task list
- Each task has: title, description, priority, dependencies, status
- Tasks are ordered by dependency resolution + priority

## Integration with Founder Mode
- Tasks reference PRD requirement IDs (FR-xxx)
- Task completion maps to Feature Execution Guide (Artifact 21)
- Use `/new-feature` workflow to build each task

## Granularity Standard (Superpowers Pattern)

Every generated task must meet the following granularity bar:

1. **Duration**: Each task should take 2–5 minutes to execute. If a task would take longer, decompose it further.
2. **Exact File Paths**: Every task must specify the exact file(s) to create or modify (e.g., `src/components/Dashboard.tsx`, not "the dashboard component").
3. **Code Snippets**: For implementation tasks, include the complete code or pseudocode to write. The agent should not need to invent logic.
4. **Verification Step**: Every task must end with a verification command or check (e.g., `npm run test -- --filter=Dashboard`, or "Open `/dashboard` in browser and confirm the chart renders").
5. **Dependency Declaration**: Each task must explicitly list its dependencies by task ID.

### Example (Good)
```
Task: Create Dashboard chart component
File: src/components/DashboardChart.tsx
Code: [full component code]
Verify: Run `npm run test -- DashboardChart` → expect 2 passing tests
Depends on: Task #4 (ChartWrapper component)
```

### Example (Bad)
```
Task: Build the dashboard
```

## Notes
- Re-run this workflow whenever the PRD is updated
- Tasks are additive — existing tasks won't be overwritten
- Use `task-master update-task --id=<id>` to modify individual tasks
