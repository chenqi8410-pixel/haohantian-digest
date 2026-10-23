---
name: debug-api
description: Debug Express API issues, test endpoints, check auth, or fix response format in haohantian-digest server. Use for 500 errors, missing data, token problems, or route bugs.
---

# Debug API Skill

Steps:
1. Check server logs or ask for the error message / endpoint.
2. Look at server/ routes (likely index.js or routes/).
3. Verify:
   - Response always { ok: true/false, data/error }
   - Date parsing (YYYY-MM-DD, Shanghai timezone for today)
   - PUBLISH_TOKEN check for POST
   - Offline/seed fallback if needed
4. Suggest curl tests:
   curl http://localhost:43187/api/health
   curl http://localhost:43187/api/digests/YYYY-MM-DD
5. Fix with minimal changes, preserve Chinese error messages.
6. Recommend npm test after changes.

Prefer reading existing server code before writing new.
