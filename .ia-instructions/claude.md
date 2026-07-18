# Instruções para Claude — Forja

> Guia para Claude operar a Forja. O conteúdo é o mesmo para GitHub Copilot, Gemini e OpenAI Codex — a Forja é multi-IA por design.

## O que é a Forja

A Forja transforma IA de codificação em uma **equipe de engenharia com processo e memória**: todo projeto nasce com spec, toda decisão vira ADR, e nada se perde entre sessões. Três pilares:

1. **Memória que sobrevive** — hierárquica, indexada em SQLite FTS5, compartilhada entre sessões e IAs (ADR-0003).
2. **Processo que governa** — nada vira código sem spec; nada estrutural sem ADR; handoffs de 7 campos (ADR-0005); comandos auditados pelo core (ADR-0020).
3. **Fábrica, não projeto único** — workspace multi-produto (ADR-0019), times de agentes por projeto.

## Onde você está?

- **No repositório do framework** (tem `bin/forja.mjs` na raiz): você está no **motor**. Ele não contém aplicações — gera e governa projetos que vivem fora dele.
- **Num projeto gerado** (este arquivo está em `.ia-instructions/`): você está num **produto do workspace**. A memória local do projeto vive em `memory/`, o harness em `scripts/agent-harness.mjs`, e o processo (spec → plan → tasks → check) vale igual.

## O core `forja` (ADR-0020)

Todo comando de processo do framework passa por um único ponto de entrada:

```bash
node bin/forja.mjs              # help agrupado por domínio
node bin/forja.mjs <comando>    # workspace, spec, gsd, code, memória, contexto
```

O core aplica **gates** (ex.: comandos de produto falham cedo sem workspace) e grava **auditoria** de cada execução em `<workspace>/.context/forja-runs.jsonl`. Os scripts npm são aliases finos do core. Comando novo = entrada em `lib/core/registry.mjs` (validado por `test/forja-core.test.js`).

## Estrutura: framework × workspace (ADR-0019)

```
Framework (repo)                      Workspace (~/forja-workspace)
├─ bin/       CLIs (forja, init)      ├─ projects/    produtos gerados
├─ lib/       core, workspace,        ├─ memory/      memória universal
│             generators              │  ├─ sqlite/universal.db (FTS5)
├─ scripts/   automação roteada       │  └─ 30-projects/  fichas
├─ specs/     SDD do framework        ├─ specs/       specs de produto
├─ memory/    memória do framework    └─ .context/    runbooks + auditoria
│  └─ 90-decisions/  ADRs
├─ prompts/   papéis portáteis
└─ .claude/   sub-agents Claude Code
```

O workspace é resolvido por: `FORJA_WORKSPACE` → `~/.forjarc.json` → `~/forja-workspace`. A pasta `projects/` do repo é **legado, off-limits**.

## Memória hierárquica — ordem de leitura

```
memory/00-global/        missão, padrões (leia primeiro)
memory/10-product/       visão e personas
memory/20-architecture/  design técnico
memory/30-domains/       detalhes por domínio
memory/40-delivery/      roadmap, sprint, backlog
memory/50-orchestration/ topologia, handoffs
memory/70-summaries/     resumos compactos
memory/90-decisions/     ADRs (rationale de toda decisão estrutural)
```

## Economia de tokens (obrigatório — ADR-0009)

**Nunca leia árvores inteiras.** Contexto entra sob demanda, do mais barato ao mais caro:

1. `npm run query:universal -- "<termo>"` — busca FTS5; traga só os trechos que respondem.
2. `npm run context:smart` — pack mínimo-suficiente no modo certo (`task` para uma feature, `domain` para uma área, `global` só para onboarding). Medido: ~99% menos tokens que carregar `memory/` inteira.
3. `memory/70-summaries/` antes de qualquer arquivo bruto; o bruto só se o resumo não bastar.
4. Código: `npm run code:query "<termo>"` e `code:impact -- <símbolo>` em vez de abrir arquivos a esmo.

Regra prática: se você vai anexar mais de ~2 arquivos de memória ao contexto, pare e use `context:smart`. Orçamento e medição: `npm run context:budget` e `npm run token:benchmark`.

## Processo: SDD + GSD + 6 papéis

Pipeline: `spec → plan → tasks → check`, executado pelos papéis **orchestrator, context-engineer, sdd-architect, product, marketing, governance** (topologia canônica em `AGENTS.md`; seu prompt de papel em `prompts/<papel>-agent.md`). Handoffs têm 7 campos obrigatórios (`from, to, intent, context, acceptance, constraints, return`) e vão para o SQLite via `npm run gsd:handoff`.

```bash
npm run spec:new|plan|tasks|check -- <slug>
npm run gsd:plan -- <slug> "<objetivo>"   # runbook com gates
npm run gsd:check -- <slug>               # valida gates antes do review
npm run code:impact -- <símbolo>          # blast radius antes de editar (ADR-0017)
```

## Convenções (valem para todas as IAs)

- **pt-BR** em comunicação, docs e saída de CLI.
- **Spec antes de código** para features não-triviais; **ADR antes de mudança estrutural** (`memory/90-decisions/`, template em `_template.md`).
- **CLI-first**: o dashboard é read-only opcional, nunca gate.
- Antes de editar código: `npm run code:check` e `npm run code:impact -- <símbolo>`.
- Antes de merge/release: papel governance roda `npm run project:check` e audita handoffs.
