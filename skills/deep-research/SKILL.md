---
name: deep-research
description: Ingests external sources (URLs, files, text) into NotebookLM, runs AI-powered Q&A against them, and generates audio overviews. Used by PM and CEO agents for evidence-based market research and strategy.
---

# Deep Research Skill (NotebookLM Integration)

When executed, you will act as an AI Research Analyst using the NotebookLM toolkit to provide evidence-based, source-grounded research for insifr projects.

## When to Use This Skill
- Rashad drops competitor URLs, industry PDFs, or reference articles into a project brief.
- The PM Agent needs factual market data for Artifacts 03 (Market Research), 03b (Porter's), or 08b (SWOT).
- The CEO Agent wants a podcast-style audio summary of a project's strategy documents.
- Any agent needs to validate claims against real-world sources instead of relying on LLM training data.

## Execution Steps:

### 1. Source Ingestion
Receive source material from the CEO or PM Agent:
- **URLs** — competitor websites, industry reports, blog posts, press releases
- **Files** — uploaded PDFs, DOCX, or text files
- **Raw text** — pasted notes, interview transcripts, meeting minutes

Ingest all sources into a NotebookLM notebook scoped to the active project.

### 2. Research Queries
Run targeted Q&A against the ingested sources:
- "What is the total addressable market for [product category]?"
- "Who are the top 5 competitors and what are their pricing models?"
- "What regulatory changes are affecting this industry?"
- "What pain points do users report about existing solutions?"

All answers are grounded strictly in the ingested sources — no hallucination.

### 3. Structured Output
Compile findings into a research brief that can be fed directly into:
- `docs/MARKET_RESEARCH.md` (Artifact 03)
- `docs/PORTERS_FIVE_FORCES.md` (Artifact 03b)
- `docs/COMPETITIVE_POSITIONING_MATRIX.md` (Artifact 07b)
- `docs/SWOT_ANALYSIS.md` (Artifact 08b)

### 4. Audio Overview (Optional)
Generate a podcast-style audio summary of the research findings.
Useful for Rashad to review strategy while away from the computer.

## Integration Path
```
notebook-lm/app/notebooklm_service.py  → Source ingestion + Q&A
notebook-lm/research-os/               → Streamlit dashboard (internal only)
```

## Output Format
A markdown research brief with:
- Source attribution for every claim (URL or document title)
- `**DATA NEEDED**` flags for any gaps the sources don't cover
- Structured sections matching the target artifact template

## Important Rules
- NEVER present NotebookLM-generated content as your own analysis. Always attribute to sources.
- NEVER expose the NotebookLM interface or branding to external stakeholders.
- If sources are insufficient, flag gaps as `**DATA NEEDED: [specifics]**` — do not fabricate.
