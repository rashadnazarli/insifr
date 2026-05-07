# Deploy insifr-founder-mode to GitHub

## New repository

1. GitHub → **New repository** → name e.g. `insifr-founder-mode` (no README if you push from local).

2. Locally:

```bash
cd /path/to/founder-mode/insifr-founder-mode
git init
git add .
git commit -m "Initial commit: insifr-founder-mode starter"
git branch -M main
git remote add origin git@github.com:YOUR_USER/insifr-founder-mode.git
git push -u origin main
```

3. Share the URL with your collaborator.

## Before first push

- [ ] Search for secrets:  
  `grep -rE 'API_KEY|SECRET|password|BEGIN PRIVATE' .`  
  (adjust patterns; fix anything real).
- [ ] Confirm `.gitignore` excludes `.env`.

## After clone

Reader order: `README.md` → `TEACH_VIBECODING.md` → `CURSOR_AGENT_PLAYBOOK.md`, then open in Cursor.
