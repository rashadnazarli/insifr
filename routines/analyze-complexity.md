---
description: Run complexity analysis on current task list to identify risks and decomposition needs
---

# /analyze-complexity — Task Complexity Analysis

## Prerequisites
- `.taskmaster/tasks/tasks.json` must exist (run `/prd-to-tasks` first)
- `task-master-ai` MCP server must be connected

## Steps

### 1. Run Complexity Analysis
```
Use the task-master-ai tool: analyze_complexity
```

This analyzes each task for:
- **Size**: Is it too large to complete in one session?
- **Dependencies**: Is it a bottleneck that blocks other tasks?
- **Ambiguity**: Is the description clear enough to implement?
- **Risk**: What could go wrong?

### 2. Review High-Complexity Tasks
For each task flagged as HIGH complexity:

1. **Decompose**: Break it into 2-4 subtasks
   ```
   Use the task-master-ai tool: expand_task
     - task_id: <the high-complexity task ID>
   ```

2. **Verify**: Each subtask should be completable in a single coding session

3. **Re-analyze**: Run complexity analysis again to confirm no remaining HIGH items

### 3. Identify Critical Path
Look at the dependency chain to find:
- **Bottleneck tasks**: Tasks that block 3+ other tasks → build these first
- **Parallel opportunities**: Tasks with no shared dependencies → can be built simultaneously
- **Quick wins**: Low-complexity, high-priority tasks with no dependencies

### 4. Generate Sprint Plan
Based on the analysis, organize tasks into sprints:

**Sprint 1 (MVP Core)**:
- All bottleneck tasks
- Auth + core data model

**Sprint 2 (Feature Build)**:
- Parallel feature branches
- Quick wins

**Sprint 3 (Polish + Launch)**:
- UX refinements
- Performance optimization
- Launch prep

## Output
- Complexity scores for all tasks
- Decomposed subtasks for high-complexity items
- Critical path identification
- Suggested sprint groupings

## When to Re-Run
- After adding new tasks from PRD updates
- After completing a sprint (to re-prioritize)
- When blocked on a task (to find alternative paths)
