---
name: miniprogram-page
description: Create or update WeChat mini-program pages (WXML/JS/WXSS/JSON) for haohantian-digest. Use for new UI, list views, detail pages, or bug fixes in miniprogram/.
---

# Mini-program Page Skill

1. Check existing pages in miniprogram/pages/ for style (today, digest, job, history, about).
2. Use native WeChat mini-program syntax (no frameworks).
3. Support offline seed fallback (see miniprogram/data/offline.js and config.js apiBase).
4. Pages should handle:
   - Loading states
   - Chinese UI text
   - Navigation between today/detail/job/history
5. When adding a page, also update app.json pages array if needed.
6. Keep it simple and matching current design.

Always read the related existing files before editing.
