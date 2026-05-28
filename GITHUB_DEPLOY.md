# Deploy insifr to GitHub

Paths below are **examples** — replace them with your local clone directory and GitHub username or org.

## New repository

1. GitHub → **New repository** → name e.g. `insifr` (no README if you push from local).

2. Locally (adjust `cd` to wherever you cloned or initialized the project):

```bash
cd /path/to/your/insifr-clone
git init
git add .
git commit -m "Initial commit: insifr Founder Mode starter"
git branch -M main
git remote add origin git@github.com:YOUR_USER/insifr.git
git push -u origin main
```

3. Share the URL with your collaborator.

**Faster first clone for others:** shallow clone reduces download size:

```bash
git clone --depth 1 https://github.com/YOUR_USER/insifr.git
```

## Before first push

- [ ] Search for secrets:  
  `grep -rE 'API_KEY|SECRET|password|BEGIN PRIVATE' .`  
  (adjust patterns; fix anything real).
- [ ] Confirm `.gitignore` excludes `.env`.

## After clone

Reader order: `README.md` → [START_HERE.md](START_HERE.md) → [GETTING_STARTED_PROMPTS.md](GETTING_STARTED_PROMPTS.md) → `TEACH_VIBECODING.md` → `AGENT_PLAYBOOK.md`, then open in your AI IDE.
