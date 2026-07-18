# Skill: Roteamento de LLM Providers

## Objetivo
Selecionar e configurar uma LLM por papel sem amarrar o projeto a um unico fornecedor.

## Quando usar
- O usuario pedir DeepSeek, MiniMax, Mistral, Qwen, Ollama, OpenRouter, Together, Groq, xAI, Cohere, Perplexity ou outro provider.
- Um papel precisar trocar de modelo por custo, cota, latencia, contexto, privacidade ou qualidade.
- Uma CLI/API externa precisar entrar no fluxo de handoffs sem alterar o SDD.

## Regras
- Preferir providers locais para tarefas sensiveis quando o modelo disponivel for suficiente.
- Usar `manual` quando o provider nao tiver CLI local confiavel.
- Registrar `provider`, `model`, `command`, `taskTypes` e `notes` em `.memory/agent-llm-routing.json`.
- Nao assumir que uma CLI existe: validar o binario ou documentar o comando esperado.
- Nao colocar API keys em memoria, specs, handoffs ou logs.

## Checklist
1. Identificar papel e tipo de tarefa.
2. Escolher provider e modelo no dashboard ou via API `/api/llm-routing/:role`.
3. Preencher `command` com a CLI real ou wrapper local.
4. Rodar um teste pequeno antes de delegar sprint inteira.
5. Registrar handoff Hermes quando a troca impactar entrega.
