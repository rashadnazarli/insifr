---
description: Revert to last known-good deploy
---

# Rollback Workflow

## Steps

### 1. Assess the Situation

Ask the founder:
- **What's broken?** — specific error, blank page, API failures, wrong content
- **When did it break?** — identify the most recent deploy/commit that caused it
- **Severity?** — is the site completely down or partially broken?

### 2. Identify Rollback Target

Find the last known-good state:

```bash
# List recent deploy tags
git tag -l "v*" --sort=-version:refname | head -10

# List recent commits
git log --oneline -10

# Find the last deploy commit
git log --oneline --grep="deploy" -5
```

Confirm the rollback target with the founder before proceeding.

### 3. Choose Rollback Strategy

**Option A: Firebase Hosting Rollback (fastest — hosting only)**
```bash
# List recent hosting releases
firebase hosting:channel:list

# Rollback to a previous release via Firebase Console:
# 1. Go to Firebase Console → Hosting
# 2. Click "Release history"
# 3. Click "Rollback" on the desired version
```

**Option B: Git Revert (code-level rollback)**
```bash
# Revert the breaking commit(s)
git revert <breaking-commit-sha> --no-edit

# Or revert to a specific tag
git checkout v<version> -- .
git commit -m "rollback: revert to v<version>"
```

Then redeploy:
```bash
npm run build
firebase deploy --only hosting
```

**Option C: Full Reset (nuclear option — use only if above fail)**
```bash
# Hard reset to the tagged version
git reset --hard v<version>

# Force push (DANGEROUS — rewrites history)
git push --force-with-lease origin main
```

⚠️ **Option C requires explicit founder approval** — it rewrites git history.

### 4. Deploy the Rollback

```bash
npm run build
firebase deploy --only hosting
```

If Functions or Firestore rules were also affected:
```bash
firebase deploy --only functions
firebase deploy --only firestore:rules
```

### 5. Verify the Rollback

- Visit the production URL and confirm the site works
- Test the specific flow that was broken
- Check browser console for errors
- Verify API endpoints respond correctly

### 6. Post-Mortem

After the site is stable, document what happened:

Append to `claude-progress.txt`:
```
ROLLBACK <ISO timestamp>
Cause: <what broke and why>
Breaking commit: <sha>
Rolled back to: <version or sha>
Strategy: Firebase Console | git revert | git reset
Time to recovery: <minutes>
Lesson: <what to do differently next time>
```

### 7. Prevent Recurrence

Based on the cause, suggest:
- Adding a test that would have caught this
- Adding a check to the `/deploy` pre-flight workflow
- Adjusting the CI/CD pipeline to catch similar issues

## Rules
- **ALWAYS** try Option A (Firebase rollback) first — it's instant and safe
- **NEVER** use Option C without explicit founder approval
- Verify the rollback worked before declaring the incident resolved
- Document every rollback — these are learning opportunities
- If the same issue causes rollback twice, it must become a test case
