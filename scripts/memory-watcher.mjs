import { watch } from 'node:fs';
import { exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const watchDirs = ['memory', 'agents', 'skills', 'prompts', 'docs'];
let timeout = null;

console.log('👀 Memory Watcher iniciado...');

watchDirs.forEach(dir => {
  const absDir = path.join(root, dir);
  watch(absDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log('🔄 Mudança detectada em: ' + filename + '. Sincronizando SQLite...');
        exec('npm run memory:db:sync', { cwd: path.join(root, 'backend') }, (err, stdout) => {
          if (err) console.error('❌ Erro no sync: ' + err.message);
          else console.log('✅ SQLite sincronizado.');
        });
      }, 1000);
    }
  });
});
