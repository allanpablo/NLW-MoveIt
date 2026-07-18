# Context Pack

## memory/00-global/mission.md

# Missao do Projeto

Construir software com clareza arquitetural, seguranca by-default e entrega continua.

## Principios
- Simplicidade primeiro
- Decisoes explicitas em ADR
- Qualidade e seguranca desde o inicio
- Documentacao viva


## memory/00-global/standards.md

# Padroes Globais

## Idioma
- Toda comunicacao e documentacao em **pt-BR**.

## Backend
- API criada em **NestJS** por padrao.
- Arquitetura modular por dominio.

## Qualidade
- Cada mudanca deve registrar impacto, risco e rollback.
- Priorizar padroes reutilizaveis.


## memory/00-global/context-policy.md

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


## memory/20-architecture/backend.md

# Backend

## Diretriz principal
- Backend em **NestJS** por padrao.

## Estrutura sugerida
- Modulos por dominio
- DTO + validacao
- Servicos com regras de negocio
- Repositorios/integradores isolados


## memory/40-delivery/current-sprint.md

# Sprint Atual

## Objetivos
-

## Itens
-

## Riscos
-


## memory/70-summaries/global-summary.md

# Resumo Global

Atualize a cada marco importante com:
- estado atual
- decisoes novas
- riscos ativos


