import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const runsDir = path.join(root, 'memory/60-runs');
const archiveDir = path.join(runsDir, 'archive');

const TTL_DAYS = 30;
const now = Date.now();

if (!fs.existsSync(runsDir)) process.exit(0);
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });

const entries = fs.readdirSync(runsDir, { withFileTypes: true });

let archived = 0;
for (const entry of entries) {
  if (entry.name === 'README.md' || entry.name === 'archive' || entry.name === '.gitkeep') continue;
  
  const abs = path.join(runsDir, entry.name);
  const stats = fs.statSync(abs);
  const ageDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

  if (ageDays > TTL_DAYS) {
    const dest = path.join(archiveDir, entry.name);
    fs.renameSync(abs, dest);
    archived++;
  }
}

if (archived > 0) {
  console.log('Vacuum: ' + archived + ' runs movidas para archive/');
}
