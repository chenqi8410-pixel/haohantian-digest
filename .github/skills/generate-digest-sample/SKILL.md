---
name: generate-digest-sample
description: Generate a realistic sample daily job digest JSON matching the haohantian-digest schema. Use when user asks for sample data, new digest, or test POST payload.
---

# Generate Digest Sample

1. Ask or infer the date (YYYY-MM-DD) and theme if not given.
2. Create a complete JSON with:
   - date, title, summary, weekdayZh, highlights (2-3), marketNote, coverLabel, publishedAt
   - jobs array (3-5 entries) with id, title, company, location, locationZh, workMode, category, visa, salary, tags, headline, description, requirements, applyUrl, source, isHighlight
3. Use real-sounding US tech companies (Google, OpenAI, Meta, Jane Street, Stripe, etc.) and current roles (SWE, ML, quant, etc.).
4. Output pure valid JSON that can be POSTed to /api/digests.
5. Optionally save as examples/digest-YYYY-MM-DD.json if requested.

Match the exact field style from README and existing examples/digest.sample.json.
