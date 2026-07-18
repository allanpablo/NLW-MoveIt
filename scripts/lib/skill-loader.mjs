import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..', '..');

export function loadSkills() {
  const manifestPath = path.join(root, 'skills', 'MANIFEST.json');
  if (!fs.existsSync(manifestPath)) return [];
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  return manifest.skills;
}

export function getSkill(id) {
  const skills = loadSkills();
  return skills.find(s => s.id === id);
}
