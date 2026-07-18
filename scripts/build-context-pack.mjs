import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, '.context');
const outFile = path.join(outputDir, 'context-pack.md');

const priorityFiles = [
  'memory/00-global/mission.md',
  'memory/00-global/standards.md',
  'memory/00-global/context-policy.md',
  'memory/20-architecture/backend.md',
  'memory/40-delivery/current-sprint.md',
  'memory/70-summaries/global-summary.md'
];

fs.mkdirSync(outputDir, { recursive: true });
let content = '# Context Pack\n\n';

for (const rel of priorityFiles) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) continue;
  const raw = fs.readFileSync(abs, 'utf8').slice(0, 6000);
  content += '## ' + rel + '\n\n' + raw + '\n\n';
}

fs.writeFileSync(outFile, content, 'utf8');
console.log('Context pack gerado em: ' + outFile);
