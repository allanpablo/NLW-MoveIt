# Topologia Multiagente

## Papeis
- Orquestrador
- Worker Backend (NestJS)
- Worker Frontend
- Worker DBA
- Worker Security
- Reviewer

## Fluxo
1. Orquestrador cria plano e fatia trabalho.
2. Workers executam em paralelo com escopo isolado.
3. Handoffs sao registrados.
4. Reviewer valida e aprova.
