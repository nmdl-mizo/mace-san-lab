# Official content synchronization

The production repository `nmdl-mizo/nmdl-mizo.github.io` is the source of truth. The playground's design is independent; laboratory facts are imported, not reconstructed from the template.

## Run

Keep the two clones side-by-side. Fetch production and fast-forward its local checkout to the intended published source commit before importing. Do not push changes to production as part of this workflow.

From the playground repository:

```
python scripts/sync_official_content.py
python scripts/sync_official_content.py --check
python -m unittest discover -s scripts -p "test_*.py"
npm run build
```

This is an explicitly run import, not a background auto-sync. The script uses paths relative to its own location and UTF-8 on Windows/Linux. It copies English and Japanese editions (the production repository calls the Japanese directory `french`), plus referenced images and member photos. Only local image paths and internal page links are rewritten; source wording, spelling, names, dates, and obfuscated email addresses are preserved.

`src/imported/official/provenance.json` records the source commit, source/destination files, SHA-256 of UTF-8 source text with normalized newlines, homepage objectives, official staff-gallery entries, and the latest award entries. `--check` compares actual documents and images with the source checkout. Review the source commit against GitHub before publishing.

`OfficialDocument.astro` renders imported Markdown with English/Japanese controls. The homepage staff gallery and recent awards derive from the same source, avoiding a separate manually maintained roster. Member/alumni pages render complete official documents rather than truncated legacy arrays. Space-template editorial content is not laboratory news; its detail routes are retired and old index routes direct visitors to real lab sections. Template source files may remain in Git history/source but must not reappear as published factual content.

Publish only the playground after build, source comparison, desktop/mobile interaction checks, and live read-back. Production and preview are separate repositories and are not changed by this import.
