---
name: sentry-triage
version: 1.0.0
description: |
  Diagnose Sentry issues by mapping stack frames to local source, pull top 
  unresolved issues via the Sentry REST API, and propose fixes. Use when 
  triaging production errors, investigating a Sentry alert, building a 
  weekly error digest, or starting a debug session from a Sentry issue ID.
category: engineering
domain: observability
attribution: Inspired by ComposioHQ/awesome-codex-skills sentry-triage pattern
---

# /sentry-triage: Diagnose → Locate → Fix

You are a production error investigator. Pull Sentry issues directly, map stack frames to local source, and propose fixes — no copy-pasting stack traces.

## When to Use

- New Sentry alert and you need to investigate, not just read the subject line
- Diagnosing a regression: find the release, suspect commit, and affected files
- Building a weekly "top unresolved issues" digest with reproduction hints
- Starting any debug session — always check Sentry first before touching code

## Prerequisites

You need a Sentry auth token with `event:read`, `project:read`, and `issue:write` scopes.

```bash
# Store in your environment
export SENTRY_AUTH_TOKEN="sntrys_..."
export SENTRY_ORG="your-org-slug"
```

### Active Projects

| Project | Stack | Sentry Slug | Repo Path |
|---------|-------|-------------|-----------|
| Avena HSK | Vite + React | `avena-hsk` | `apps/hsk` |
| Avena Teacher | Vite + React | `avena-teacher` | `apps/teacher` |
| Celentano | Next.js 14 | `celentano` | `celentano` app |
| Celentano Admin | Next.js 14 | `celentano-admin` | `admin` app |

> Update this table as new projects are onboarded to Sentry.

## Workflow

### 1. Fetch Issue Context

**Single issue** (by short ID like `PROJ-1F4` or numeric ID):

```bash
curl -s -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  "https://sentry.io/api/0/issues/{issue_id}/" | jq '{
    title: .title,
    culprit: .culprit,
    count: .count,
    userCount: .userCount,
    firstSeen: .firstSeen,
    lastSeen: .lastSeen,
    status: .status,
    level: .level,
    platform: .platform
  }'
```

**Batch triage** (top 10 unresolved, sorted by frequency):

```bash
curl -s -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  "https://sentry.io/api/0/projects/$SENTRY_ORG/{project_slug}/issues/?query=is:unresolved&sort=freq&limit=10" \
  | jq -r '.[] | "\(.count)\t\(.shortId)\t\(.title)"' | sort -rn
```

### 2. Get Full Stack Trace

Pull the latest event with full stack trace and breadcrumbs:

```bash
curl -s -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  "https://sentry.io/api/0/issues/{issue_id}/events/latest/" | jq '{
    tags: [.tags[] | {key: .key, value: .value}],
    breadcrumbs: [.entries[] | select(.type == "breadcrumbs") | .data.values[-5:]],
    exceptions: [.entries[] | select(.type == "exception") | .data.values[] | {
      type: .type,
      value: .value,
      frames: [.stacktrace.frames[] | select(.inApp) | {
        file: .filename,
        line: .lineno,
        col: .colNo,
        function: .function,
        context: .context
      }]
    }]
  }'
```

### 3. Map Frames to Local Source

For each `inApp` frame in the stack trace:

1. **Resolve the file path** — Sentry `filename` often uses the deployed path (e.g., `app:///src/components/Auth.tsx`). Strip the prefix and map to local repo path.
2. **Open the file** at `lineno ± 20 lines` to see the context.
3. **Check breadcrumbs** — The last 5 breadcrumbs before the error often reveal the user action that triggered it.
4. **Check suspect commits** — If release tracking is configured:

```bash
curl -s -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  "https://sentry.io/api/0/issues/{issue_id}/current-release/" | jq '.currentRelease.version'
```

Then locally: `git log --oneline {release_version}..HEAD -- {affected_files}`

### 4. Diagnose

Before proposing a fix, answer these questions:

- [ ] **What user action triggers this?** (from breadcrumbs)
- [ ] **How many users are affected?** (from `userCount`)
- [ ] **When did it start?** (from `firstSeen` — correlate with deploys)
- [ ] **Is it a regression?** (was it resolved before and came back?)
- [ ] **What's the root cause?** (not just the symptom)

### 5. Fix or Escalate

**If you can fix it:**

1. Write the fix using `/tdd` — test first, then implement
2. Commit atomically: `git commit -m "fix: SENTRY-{shortId} — {description}"`
3. Mark resolved in Sentry (resolves in next release):

```bash
curl -s -X PUT -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved", "statusDetails": {"inNextRelease": true}}' \
  "https://sentry.io/api/0/issues/{issue_id}/"
```

**If you can't fix it:**

Add to `Backlog.md` with full context:
```markdown
- [ ] **SENTRY-{shortId}: {title}** — {count} events, {userCount} users affected.
  Root cause: {diagnosis}. Blocked by: {reason}.
```

### 6. Weekly Digest (for `routines/triage.md`)

Run this weekly to produce a summary for `ITERATION_LOG.md`:

```bash
# Top 10 unresolved across all projects
for project in avena-hsk avena-teacher celentano celentano-admin; do
  echo "=== $project ==="
  curl -s -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
    "https://sentry.io/api/0/projects/$SENTRY_ORG/$project/issues/?query=is:unresolved&sort=freq&limit=5" \
    | jq -r '.[] | "  \(.count)\t\(.shortId)\t\(.level)\t\(.title)"'
done
```

Output format for the iteration log:

```markdown
## Sentry Digest — {YYYY-MM-DD}

| Project | Issue | Count | Users | Level | Action |
|---------|-------|-------|-------|-------|--------|
| avena-hsk | PROJ-1F4 | 142 | 23 | error | Fix in sprint |
| celentano | PROJ-2A7 | 89 | 12 | warning | Backlog |
```

## Integration with Founder Mode OS

- **`/tdd`** → Use for implementing fixes (test-first)
- **`routines/deploy.md`** → Post-deploy: check Sentry for error spikes
- **`routines/debug.md`** → Debug sessions start here, not in code
- **`routines/triage.md`** → Weekly digest feeds into iteration planning

## Troubleshooting

- **`404 on issue_id`** → Use the numeric issue ID from the URL, not the short ID (try both)
- **Empty events** → Issue was resolved/archived; query with `query:"is:resolved"` or check retention settings
- **No `inApp` frames** → Source maps not uploaded; stack shows only vendor code. Fix: upload source maps in deploy step
- **Missing suspect commit** → Release tracking not configured; set up `sentry-cli releases` in CI
- **`401 Unauthorized`** → Token expired or missing scopes. Regenerate at Settings → Developer Settings → Auth Tokens
