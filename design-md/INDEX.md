# Biblioteca de Design (design-md)

Camada operacional de design do fluxo GSD: garante que toda feature com impacto
visual passe por **referência escolhida → brief preenchido → gate validado**,
em vez de "faz uma UI aí".

## Como funciona

1. **Escolha a referência** por superfície: [MATRIX.md](./MATRIX.md) mapeia
   superfícies (agent console, dashboard, docs, landing…) para nomes de
   referência (`linear.app`, `stripe`, `vercel`…). Os nomes são **vocabulário
   compartilhado** entre agentes — apontam para produtos publicamente
   conhecidos, não para cópias locais.
2. **Preencha o brief**: [BRIEF-TEMPLATE.md](./BRIEF-TEMPLATE.md) é obrigatório
   para features com impacto visual (9 campos, incluindo estados e critérios
   de aceite visual).
3. **Valide antes do handoff**: `forja design:check <brief.md>` reprova brief
   incompleto; `gsd:check` puxa esse gate quando há brief.

```bash
npm run design:select -- agent-console tecnico   # sugere referências pela MATRIX
npm run design:check -- <caminho-do-brief.md>    # gate de completude
```

Regras de uso por agentes e checklist de handoff visual: [PLAYBOOK.md](./PLAYBOOK.md).
Exemplo de brief preenchido: [examples/agent-console-brief.md](./examples/agent-console-brief.md).

## Cache local de referências (opcional)

Detalhes de cada sistema de design (tokens, componentes, padrões) podem ser
mantidos como cache local em `design-md/<nome>/README.md` + `design.manifest.json`.
O harness degrada graciosamente sem eles: `design:select` indica "sem cache
local" e o agente usa o conhecimento público da referência.

> Nunca copie identidade visual proprietária — referência é direção, não clone.
