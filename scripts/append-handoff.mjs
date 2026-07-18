import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const [from = 'agente-a', to = 'agente-b', title = 'handoff'] = process.argv.slice(2);
const dir = path.join(root, 'memory/50-orchestration/handoffs');
fs.mkdirSync(dir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:]/g, '-');
const file = path.join(dir, stamp + '_' + from + '_para_' + to + '.md');

const template = '# Handoff: ' + from + ' -> ' + to + '\n\n'
  + '## Titulo\n' + title + '\n\n'
  + '## Contexto\n-\n\n'
  + '## Alteracoes\n-\n\n'
  + '## Riscos\n-\n\n'
  + '## Pendencias\n-\n\n'
  + '## Proximo passo\n-\n';

fs.writeFileSync(file, template, 'utf8');
console.log('Handoff criado: ' + file);
