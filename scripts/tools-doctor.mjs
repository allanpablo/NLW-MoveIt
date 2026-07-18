#!/usr/bin/env node
/**
 * tools-doctor — raio-x do núcleo (SPEC-009) e das ferramentas de processo (ADR-0018).
 *
 * Duas seções, dois contratos distintos:
 *
 *   Núcleo       O que impede o framework de trabalhar. Falha crítica → exit 1.
 *   Ferramentas  Binários opcionais que potencializam o harness. Ausência nunca trava.
 *
 * A separação é o ponto. Este comando auditava só as ferramentas — sobre as quais ele mesmo
 * dizia "o fluxo nunca trava por elas" — e era cego para tudo que trava. Quando o better-sqlite3
 * ficou com ABI de outra major do Node e a memória universal morreu inteira, o doctor reportou
 * "2/5 ferramentas disponíveis" e saiu com 0.
 *
 * Diagnostica e prescreve; não conserta. Rodar `npm rebuild` sem consentimento é a classe de
 * risco oposta à que este comando existe para fechar.
 *
 * Uso: node scripts/tools-doctor.mjs
 */

import { spawnSync } from 'node:child_process';

import { runChecks, worstStatus } from '../lib/core/health.mjs';

const TOOLS = [
  {
    name: 'codegraph',
    probe: ['codegraph', ['--version']],
    role: 'Code intelligence: chamadores, blast radius, mapa de impacto (ADR-0017).',
    install: 'npm i -g @codegraph/cli',
    gate: 'npm run code:check / code:impact',
  },
  {
    name: 'gitleaks',
    probe: ['gitleaks', ['version']],
    role: 'Varredura de segredos antes de merge/release.',
    install: 'https://github.com/gitleaks/gitleaks (binario) ou: brew install gitleaks',
    gate: 'gitleaks detect --no-banner (gate de Governance)',
  },
  {
    name: 'ast-grep',
    probe: ['ast-grep', ['--version']],
    role: 'Busca e codemod estrutural por AST — refactor seguro do Worker.',
    install: 'npm i -g @ast-grep/cli  (binarios: ast-grep / sg)',
    gate: 'ast-grep run -p "<pattern>" -r "<rewrite>"',
  },
  {
    name: 'lefthook',
    probe: ['lefthook', ['version']],
    role: 'Pre-commit rodando project:check / spec:check automaticamente.',
    install: 'npm i -g lefthook  (depois: lefthook install)',
    gate: '.lefthook.yml (pre-commit)',
  },
  {
    name: 'markdownlint',
    probe: ['markdownlint-cli2', ['--version']],
    role: 'Lint da documentacao (docs e memory sao centrais aqui).',
    install: 'npm i -g markdownlint-cli2',
    gate: 'markdownlint-cli2 "docs/**/*.md"',
  },
];

function detect(cmd, args) {
  const res = spawnSync(cmd, args, { encoding: 'utf8' });
  if (res.error && res.error.code === 'ENOENT') return { ok: false };
  const version = (res.stdout || res.stderr || '').trim().split('\n')[0] || 'instalado';
  return { ok: true, version };
}

const TAG = {
  ok: 'OK   ',
  warn: 'AVISO',
  fail: 'FALHA',
  skipped: '—    ',
};

function printCore(results) {
  console.log('Núcleo — o que impede o framework de trabalhar (SPEC-009)\n');

  for (const r of results) {
    console.log(`${TAG[r.status]} ${r.id.padEnd(13)} ${r.detail}`);
    if (r.fix) console.log(`      corrigir: ${r.fix}`);
    console.log('');
  }
}

function printTools() {
  console.log('Ferramentas de processo — opcionais (ADR-0018)\n');

  let installed = 0;
  for (const tool of TOOLS) {
    const [cmd, args] = tool.probe;
    const { ok, version } = detect(cmd, args);
    if (ok) installed += 1;
    console.log(`${ok ? TAG.ok : 'FALTA'} ${tool.name.padEnd(13)} ${ok ? version : '(ausente)'}`);
    console.log(`      papel: ${tool.role}`);
    console.log(`      gate:  ${tool.gate}`);
    if (!ok) console.log(`      instalar: ${tool.install}`);
    console.log('');
  }

  console.log(`${installed}/${TOOLS.length} ferramentas disponíveis.`);
  console.log('Ferramentas ausentes apenas desativam seus gates — o fluxo nunca trava por elas.\n');
}

async function main() {
  console.log('\nForja doctor\n');

  const core = await runChecks();
  printCore(core);
  printTools();

  // Só o núcleo decide o exit code. Ferramenta ausente nunca reprova — o contrato do ADR-0018
  // é preservado à risca.
  const verdict = worstStatus(core);

  if (verdict === 'fail') {
    const raiz = core.filter((r) => r.status === 'fail' && r.severity === 'critical');
    console.log(`Núcleo quebrado — ${raiz.length} ${raiz.length === 1 ? 'falha' : 'falhas'} crítica(s).`);
    for (const r of raiz) console.log(`  ${r.id}: ${r.fix || 'sem correção automática'}`);
    process.exit(1);
  }

  if (verdict === 'warn') {
    console.log('Núcleo operante, com ressalvas. Nada trava o fluxo.');
    return;
  }

  console.log('Núcleo saudável.');
}

main();
