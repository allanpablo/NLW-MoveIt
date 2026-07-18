# Design Playbook para Agentes

Este playbook transforma `design-md/` em entrada operacional para Product, Frontend, SDD Architect e Governance. A pasta de marcas continua sendo biblioteca de referencia; este arquivo define como escolher, aplicar e auditar uma direcao visual sem depender de memoria solta.

## Quando usar

- Antes de criar uma tela nova, componente critico, dashboard ou landing.
- Durante `spec.md`, quando a experiencia visual influencia conversao, confianca ou produtividade.
- Antes de merge/release, quando Governance precisa auditar fidelidade visual.

## Fluxo minimo

1. Defina a superficie: `dashboard`, `docs`, `landing`, `tool`, `mobile`, `checkout`, `agent-console`.
2. Escolha 1 referencia primaria e ate 2 secundarias em `MATRIX.md`.
3. Preencha `BRIEF-TEMPLATE.md` para o contexto da feature.
4. Anexe o brief ao handoff de implementacao.
5. Governance valida com `npm run design:check -- <brief.md>`.

## Regras para agentes

- Nunca copie marca, logo, texto proprietario ou identidade visual completa.
- Use referencias como principios: densidade, ritmo, hierarquia, tom, navegacao, estados e padroes de interacao.
- Para SaaS, CRM, ops e dashboards: priorize legibilidade, densidade organizada e estados claros.
- Para landing: a primeira dobra deve comunicar objeto/oferta real, nao apenas estilo abstrato.
- Para ferramentas de agente: prefira affordances explicitas, logs verificaveis, controles previsiveis e feedback de estado.

## Checklist de handoff visual

- Superficie e persona estao definidos.
- Referencia primaria tem justificativa clara.
- Tokens visuais foram definidos: cor, tipografia, raio, espacamento, densidade.
- Componentes esperados foram listados.
- Estados obrigatorios foram listados: vazio, carregando, erro, sucesso, permissao negada quando aplicavel.
- Criterios de aceite visual sao verificaveis por screenshot ou revisao objetiva.

