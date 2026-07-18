#!/usr/bin/env node
/**
 * code-intel — camada de code intelligence sobre o codegraph (ADR-0017).
 *
 * Auto-contido: depende apenas do binario `codegraph` no PATH. Se ausente,
 * degrada graciosamente (avisa e segue) — nunca trava o fluxo.
 *
 * Comandos:
 *   check                 Valida indice (worktree + freshness)
 *   impact <simbolo> [d]  Chamadores e blast radius de um simbolo
 *
 * Emitido por forja/init-project.js. Veja docs do framework para o GSD completo.
 */

import { spawnSync } from 'node:child_process';

function runCodegraph(args) {
  const result = spawnSync('codegraph', args, { encoding: 'utf8' });
  if (result.error && result.error.code === 'ENOENT') return { missing: true };
  return {
    missing: false,
    status: result.status ?? 1,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  };
}

function codegraphStatus() {
  const res = runCodegraph(['status', '--json']);
  if (res.missing) return { missing: true };
  let data = null;
  try {
    data = JSON.parse(res.stdout);
  } catch {
    return { missing: false, parseError: true, raw: res.stdout || res.stderr };
  }
  const pending = data.pendingChanges || {};
  const pendingTotal = (pending.added || 0) + (pending.modified || 0) + (pending.removed || 0);
  return {
    missing: false,
    initialized: Boolean(data.initialized),
    worktreeMismatch: data.worktreeMismatch || null,
    fileCount: data.fileCount || 0,
    pendingTotal,
    reindexRecommended: Boolean(data.index && data.index.reindexRecommended),
  };
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function cmdCheck() {
  const s = codegraphStatus();
  if (s.missing) {
    console.log('Codegraph nao instalado no PATH. Code intelligence ignorado.');
    console.log('Instale com: npm i -g @codegraph/cli');
    process.exit(0);
  }
  if (s.parseError) {
    console.log('Codegraph respondeu, mas status --json nao pode ser lido.');
    fail(s.raw || 'sem saida');
  }
  const lines = [];
  let blocking = false;
  if (!s.initialized) {
    blocking = true;
    lines.push('FAIL indice ausente: rode `npm run code:index`.');
  } else {
    lines.push(`OK   indice inicializado (${s.fileCount} arquivos).`);
  }
  if (s.worktreeMismatch) {
    blocking = true;
    lines.push(`FAIL indice de outro worktree: ${s.worktreeMismatch}. Rode \`codegraph init -i\`.`);
  } else if (s.initialized) {
    lines.push('OK   indice pertence a este worktree.');
  }
  if (s.pendingTotal > 0 || s.reindexRecommended) {
    lines.push(`WARN indice defasado (${s.pendingTotal} pend.). Rode \`npm run code:sync\`.`);
  } else if (s.initialized) {
    lines.push('OK   indice em dia.');
  }
  console.log('Codegraph check:\n');
  for (const line of lines) console.log(line);
  if (blocking) fail('\nResultado: gate de code intelligence reprovado.');
  console.log('\nResultado: code intelligence confiavel.');
}

function cmdImpact(symbol, depthArg) {
  if (!symbol) fail('Uso: code-intel impact <simbolo> [profundidade]');
  const probe = runCodegraph(['status', '--json']);
  if (probe.missing) {
    console.log('Codegraph nao instalado. Sem mapa de impacto automatico.');
    console.log(`Fallback manual: grep -rn "${symbol}" . e leia os chamadores.`);
    process.exit(0);
  }
  const depth = String(parseInt(depthArg, 10) || 2);
  console.log(`Mapa de impacto: ${symbol} (profundidade ${depth})\n`);
  const impact = runCodegraph(['impact', symbol, '-d', depth]);
  if (impact.stdout) console.log(impact.stdout);
  const callers = runCodegraph(['callers', symbol]);
  if (callers.stdout) {
    console.log('\n--- Chamadores diretos ---');
    console.log(callers.stdout);
  }
  if (!impact.stdout && !callers.stdout) {
    console.log('Nenhum no encontrado. Confirme o nome ou rode `npm run code:sync`.');
  }
}

const [cmd, ...rest] = process.argv.slice(2);
switch (cmd) {
  case 'check': cmdCheck(); break;
  case 'impact': cmdImpact(rest[0], rest[1]); break;
  default:
    console.log('Uso: node scripts/code-intel.mjs <check|impact> [args]');
    process.exit(cmd ? 1 : 0);
}
