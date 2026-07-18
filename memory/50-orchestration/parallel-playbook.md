# Playbook de Paralelizacao

## Quando paralelizar
- Subtarefas independentes por dominio.
- Escopo de escrita sem sobreposicao.

## Quando nao paralelizar
- Mudanca bloqueante para a proxima etapa.
- Refactor altamente acoplado no mesmo modulo.
