---
name: session-memory
description: Persist and restore project context across sessions. Use this to read what was decided last session, track project phase, and avoid losing context between conversations.
---

# Session Memory Skill

## Purpose

AI agents have no memory between sessions by default. This skill uses a structured `PROJECT_STATE.md` file inside each project's folder to maintain continuity — what phase the project is in, what was last worked on, and what decisions were made.

## When to Use

- At the start of any session: **read** state to resume from where you left off
- After any significant decision or artifact generation: **write** the updated state
- When the founder asks "where were we?" or "what did we decide last time?"

---

## How to Read State

1. Look for `PROJECT_STATE.md` in the active project's root (e.g., `Insifr/projects/pocket-cfo/PROJECT_STATE.md`)
2. If it exists, read and summarize the content to the founder
3. If it doesn't exist, announce: "No saved state found. Starting fresh — this will be created after today's session."

---

## How to Write State

At the end of any significant work block, create or update `PROJECT_STATE.md`:

```markdown
# Project State — [Project Name]

**Last updated:** [ISO timestamp]
**Active mode:** [full | starter | business | technical | consultant]
**Active tier:** [pre-pmf | scaling | series]
**AI Product:** [yes | no]

## Current Phase
Phase [N]: [Phase Name]

## Completed Artifacts
- [x] IDEA.md
- [x] PROBLEM_VALIDATION.md
- [ ] MARKET_RESEARCH.md ← In progress

## Last Session Summary
[Two to three sentences summarizing the most recent work and any key decisions made]

## Key Decisions Made
| Decision | Chosen Option | Rationale |
|----------|---------------|-----------|
| Database | Supabase | Founder preferred managed Postgres |
| Auth | Supabase Auth | Already bundled with Supabase |

## Open Questions
- [ ] [Question 1 that needs founder input next session]
- [ ] [Question 2]

## Next Steps (Planned)
1. [Next artifact or task to work on]
2. [Second priority]
```

---

## File Location

Always write `PROJECT_STATE.md` to the **project root**, not to `docs/`:

```
Insifr/projects/pocket-cfo/PROJECT_STATE.md   ✅
Insifr/projects/pocket-cfo/docs/PROJECT_STATE.md  ❌
```

---

## Rules
- Update `PROJECT_STATE.md` after generating any artifact
- Never read from a stale `PROJECT_STATE.md` if `docs/` artifacts clearly contradict it — trust the artifacts
- If state and artifacts conflict, flag the inconsistency to the founder
- `PROJECT_STATE.md` is a working note, not an artifact — it can be overwritten freely
