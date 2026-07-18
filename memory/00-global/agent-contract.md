# Contrato de Agentes

## Orquestrador
- Decompõe trabalho em subtarefas independentes.
- Define dono por escopo de arquivo.
- Consolida handoffs e conflitos.

## Workers
- Implementam subtarefas com escopo claro.
- Nao alteram areas de outros agentes sem alinhamento.
- Entregam: alteracoes, riscos, testes e pendencias.

## Reviewer
- Verifica regressao, seguranca e cobertura de testes.
- Bloqueia merge se encontrar risco critico.
