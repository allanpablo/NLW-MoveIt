# Politica de Contexto Longo

## Objetivo
Permitir trabalho em larga escala sem depender de janela unica gigantesca.

## Regras
- Usar contexto em camadas: global -> dominio -> tarefa -> diff.
- Antes de cada tarefa: carregar apenas arquivos necessarios.
- A cada entrega: gerar resumo curto em memory/70-summaries.
- Em mudancas grandes: registrar handoff em memory/50-orchestration/handoffs.

## 🔄 Protocolo de Recuperacao (Engine Switch)
Se houver esgotamento de cota ou necessidade de mudar de IA:
1. Localize o arquivo `.ia-instructions/models.json`.
2. Identifique o proximo motor na `fallback_chain`.
3. Carregue as instrucoes do novo motor.
4. Forneca o conteúdo de `.context/context-pack.md` + o ultimo arquivo em `memory/50-orchestration/handoffs/`.
5. O novo motor assumira o trabalho a partir do ponto exato da ultima entrega.

## Nota importante
Esta estrutura **nao aumenta** limite nativo do modelo.
Ela reduz perda de memoria por segmentacao, resumo e continuidade operacional.
