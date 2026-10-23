# Copilot Instructions for haohantian-digest

This is a WeChat mini-program + Express API for daily US/global job digests (brand: 浩瀚长天 / 美聘日报).

## Project Structure
- `miniprogram/` — native WeChat mini-program (pages: today, digest, job, history, about)
- `server/` — Express API (Node.js 20+)
- Data format: digests with jobs (title, company, visa, salary, applyUrl, etc.)
- Auth for publish: PUBLISH_TOKEN via X-Publish-Token / Bearer

## Coding Style
- Prefer clear Chinese comments for business logic when helpful.
- Keep API responses consistent: `{ ok: true, data }` or `{ ok: false, error: "中文原因" }`.
- Dates in YYYY-MM-DD, timezone-aware (Shanghai for "today").
- Mini-program: follow WeChat conventions, use offline seed for demo.

## When generating code
- Match existing patterns in server/ and miniprogram/.
- For new digest features, include sample JSON in examples/.
- Prioritize robustness for offline/demo mode and production deploy (Render/Fly).

Use skills and agents in .github/ when available.
