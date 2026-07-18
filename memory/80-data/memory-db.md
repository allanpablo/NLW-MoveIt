# Memory DB (SQLite)

## Objetivo
Armazenar indice operacional da documentacao para busca e continuidade de contexto.

## Fonte da verdade
- Arquivos Markdown em memory/, docs/, agents/, skills/, prompts/

## Banco
- SQLite em .memory/sqlite/context.db

## Fluxo
1. Atualizar markdown
2. Rodar sincronizacao
3. Consultar contexto por texto ou tipo
