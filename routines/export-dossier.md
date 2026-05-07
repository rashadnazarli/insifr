---
description: Export all generated artifacts into a single investor-ready Founder Dossier PDF.
---

# Export Founder Dossier (PDF)

When the founder runs `/export-dossier`, generate a fully formatted Founder Dossier PDF containing all artifacts from the `docs/` directory.

## Steps

1. **Locate the export script**
   The export script is part of the `pdf` skill located at `.agent/skills/pdf/export.js`.

2. **Execute the export command**
   Run the export script using the `--dossier` flag to generate the investor-ready PDF with a cover page and TOC.
   
   ```bash
   node .agent/skills/pdf/export.js ./ --dossier --title "{{PROJECT_NAME}}"
   ```
   
   *Note: If the project name is unknown, omit the `--title` flag and it will default to the directory name.*

3. **Verify the output**
   Confirm that the `docs/pdf/` directory contains the `_Founder_Dossier.pdf` file.

4. **Present to the Founder**
   Inform the founder that the dossier has been generated successfully and provide the path to the PDF file.
