---
description: Weekly triage routine. Pull top Sentry issues, summarize by project, propose fixes or backlog items, and update ITERATION_LOG.md.
---

# Weekly Triage Routine

Run this weekly (Monday morning, or after a deploy) to close the production feedback loop.

## Workflow

### 1. Pull Sentry Digest

Use `/sentry-triage` weekly digest mode. For each active project, pull the top 5 unresolved issues sorted by frequency:

```
Projects: avena-hsk, avena-teacher, celentano, celentano-admin
Query: is:unresolved, sort by frequency, limit 5
```

### 2. Classify Each Issue

For each issue in the digest, classify:

| Classification | Action | Timeline |
|---------------|--------|----------|
| **Critical** (crashes, data loss, auth failures) | Fix this sprint | Now |
| **High** (broken features, performance degradation) | Fix this sprint | This week |
| **Medium** (UX bugs, edge cases) | Add to backlog | This month |
| **Low** (cosmetic, minor UX) | Add to backlog | When convenient |
| **Noise** (expected errors, third-party) | Ignore or suppress | Mark as ignored in Sentry |

### 3. Create Action Items

For each Critical/High issue:

1. **Open the issue** using `/sentry-triage` single-issue workflow
2. **Diagnose root cause** using `/debug` routine (Step 0 → Phase 1-4)
3. **Fix** using `/tdd` if behavior-affecting, or direct fix if cosmetic
4. **Mark resolved** in Sentry after deploy

For Medium/Low issues:
- Add to `Backlog.md` with Sentry short ID, count, user count, and root cause summary

### 4. Update ITERATION_LOG.md

Append a weekly digest entry:

```markdown
## Triage — {YYYY-MM-DD}

### Sentry Summary
| Project | Total Unresolved | Critical | High | Medium | Low |
|---------|-----------------|----------|------|--------|-----|
| avena-hsk | 12 | 0 | 2 | 5 | 5 |
| celentano | 8 | 1 | 1 | 3 | 3 |

### Actions Taken
- Fixed PROJ-1F4: Auth token expiry not handled in refresh flow
- Backlogged PROJ-2A7: Rare layout shift on slow connections (medium)
- Ignored PROJ-3B1: Expected 404s from crawler bots

### Health Trend
- Error rate: ↓ 15% from last week
- New issues: 3 (down from 7)
- Resolved: 5
```

### 5. Escalate if Needed

**Escalation triggers:**
- Any Critical issue that can't be fixed within 24 hours
- Error count spike > 3x baseline in any project
- New issue affecting > 100 users
- Same issue recurring after being resolved (regression)

Escalation action: Flag in `Backlog.md` with 🚨 prefix and notify via the most direct channel available.

## Cadence

- **Weekly triage:** Monday morning, first 30 minutes
- **Post-deploy triage:** 10 minutes after any production deploy (check for error spikes)
- **Incident triage:** Immediately upon Sentry alert for Critical issues
