---
description: Execute multiple independent tasks simultaneously using Git worktrees and parallel agent instances.
---

# Parallel Sprints Workflow (Conductor)

This routine enables simultaneous multi-agent task execution by isolating work into separate Git worktrees. It uses a "Conductor" pattern to distribute tasks and merge them upon completion.

## Prerequisite
Ensure that the `Backlog.md` or sprint backlog has discrete, non-overlapping tasks.

## Workflow Steps

### Phase 1: Sprint Planning & Task Isolation
1. **Identify parallelizable tasks:** Select 2-5 tasks from the backlog that touch different areas of the codebase.
2. **Initialize worktrees:** For each task, create a separate git worktree.
   ```bash
   # Create a branch for the task
   git branch feature/task-1
   
   # Add a worktree linked to that branch
   git worktree add ../worktrees/task-1 feature/task-1
   ```
3. **Conductor Manifest:** Create a `conductor.json` or update a tracking markdown file to map each task to its respective worktree and branch.

### Phase 2: Parallel Execution
1. **Dispatch Agents:** Start an independent AI agent instance in each worktree directory.
2. **Context Isolation:** Provide each agent ONLY the context required for its specific task. Do not overload them with the entire monorepo context unless necessary.
3. **Continuous Execution:** Allow the agents to execute their tasks concurrently. Each agent operates in its own isolated filesystem and branch.

### Phase 3: Continuous Evaluation (Quality Gates)
1. **Self-Review:** Once an agent completes its task, it must run the `/qa` and `/review` skills against its worktree.
2. **Fix Loop:** The agent resolves any issues found by the quality gates directly in its branch.
3. **Sign-off:** The agent creates a summary report (e.g., `completion_report.md`) detailing the changes, test results, and QA sign-off.

### Phase 4: Integration & Merge
1. **Conductor Review:** The orchestrating user (or Conductor agent) reviews the completion reports.
2. **Sequential Merging:** Merge the branches back into the main development branch one by one.
   - If conflicts arise, pause and resolve them, or dispatch an agent to resolve the merge conflict.
3. **Cleanup:** Remove the worktrees and delete the branches.
   ```bash
   git worktree remove ../worktrees/task-1
   git branch -d feature/task-1
   ```

## Rules for Parallel Execution
- **Strict Isolation:** Agents must never cross-pollinate changes. They only operate within their assigned worktree.
- **No Overlapping Scope:** Ensure tasks do not touch the same files. If they must, sequence them sequentially instead.
- **Verification First:** No branch is merged until it passes the `/review` and `/qa` skills.

## Example Conductor Config
```json
{
  "sprint_id": "sprint-24",
  "base_branch": "main",
  "tasks": [
    {
      "id": "ui-refactor",
      "branch": "feature/ui-refactor",
      "worktree": "../worktrees/ui-refactor",
      "status": "in-progress"
    },
    {
      "id": "api-optimization",
      "branch": "feature/api-optimization",
      "worktree": "../worktrees/api-optimization",
      "status": "pending"
    }
  ]
}
```
