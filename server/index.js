import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA = process.env.DIGEST_DIR || path.join(ROOT, 'data');
const TOKEN = process.env.PUBLISH_TOKEN || 'digest-bot-dev-key';
const PORT = Number(process.env.PORT || 43187);

fs.mkdirSync(DATA, { recursive: true });

function listDates() {
  return fs
    .readdirSync(DATA)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort()
    .reverse();
}

function readDigest(date) {
  const file = path.join(DATA, `${date}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function auth(req) {
  const token =
    req.get('x-publish-token') ||
    req.get('x-api-key') ||
    (String(req.get('authorization') || '').startsWith('Bearer ')
      ? String(req.get('authorization')).slice(7)
      : '');
  return token && token === TOKEN;
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/digests', (_req, res) => {
  const data = listDates().slice(0, 60).map((date) => {
    const raw = readDigest(date) || {};
    return {
      date,
      title: raw.title,
      summary: raw.summary,
      jobCount: Array.isArray(raw.jobs) ? raw.jobs.length : 0,
    };
  });
  res.json({ ok: true, data });
});

app.get('/api/digests/:date', (req, res) => {
  const raw = readDigest(req.params.date);
  if (!raw) return res.status(404).json({ ok: false, error: 'not_found' });
  res.json({ ok: true, data: raw });
});

app.post('/api/digests', (req, res) => {
  if (!auth(req)) return res.status(401).json({ ok: false, error: 'unauthorized' });
  const body = req.body || {};
  if (!body.date || !body.title || !Array.isArray(body.jobs)) {
    return res.status(400).json({ ok: false, error: 'invalid_body' });
  }
  fs.writeFileSync(path.join(DATA, `${body.date}.json`), JSON.stringify(body, null, 2));
  res.json({ ok: true, data: { date: body.date, jobs: body.jobs.length } });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`digest api listening on ${PORT}`);
});
