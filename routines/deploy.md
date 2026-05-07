---
description: Deploy to Firebase with pre-flight checks
---

# Deploy Workflow

## Steps

### 1. Pre-Flight Checks

Before deploying, verify:
- All tests pass: run `/test` and confirm zero failures
- No security issues: run `/security-review` and confirm no 🔴 Critical findings
- All changes committed: `git status` should show a clean working directory
- Feature progress complete: check `feature-progress.json` — no `in_progress` steps

If any check fails, **STOP** and report the blocker.

### 2. Select Deploy Target

Ask the founder which target:
- **Preview** — deploy to a preview channel for review (safe, temporary)
- **Staging** — deploy to staging environment (if configured)
- **Production** — deploy to live site (requires all checks to pass)

### 3. Build

Run the project build:
```bash
npm run build
```

If the build fails:
- Analyze the error output
- Fix the issue
- Re-run the build
- Maximum 3 self-heal attempts

### 4. Deploy

Based on the selected target:

**Preview:**
```bash
firebase hosting:channel:deploy preview-<branch-name> --expires 7d
```

**Staging (if configured):**
```bash
firebase deploy --only hosting:staging
```

**Production:**
```bash
firebase deploy --only hosting
```

If deploying Functions, Firestore rules, or other services:
```bash
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 5. Post-Deploy Verification

After deployment completes:
- Visit the deployed URL and verify the site loads
- Check critical user flows (signup, login, core feature)
- Verify no console errors in browser dev tools
- Confirm API endpoints respond correctly

### 6. Log the Deployment

Append to `claude-progress.txt`:
```
DEPLOY <ISO timestamp>
Target: preview | staging | production
URL: <deployed URL>
Services: hosting, functions, firestore rules (list what was deployed)
Status: success | failed
Notes: <any issues encountered>
```

Git tag (production only):
```bash
git tag -a v<version> -m "Deploy: <summary>"
git push --tags
```

## Rules
- Never deploy directly to production without running `/test` and `/security-review` first
- Never deploy with uncommitted changes
- Always verify the deployed site loads after deployment
- Production deploys must be git-tagged for rollback capability
- If deployment fails, do NOT retry more than twice — report to founder
