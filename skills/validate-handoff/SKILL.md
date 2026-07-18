# Skill: Validação e Review de Segurança (Gatekeeper)

## Objetivo
Atuar como Gatekeeper final para garantir que nenhum código inseguro ou incompleto entre no pipeline.

## Protocolo de Review (Obrigatório)
Antes de aceitar um handoff, o Reviewer deve validar:

1. **Compliance de Raciocínio**: O Worker preencheu o bloco `## Raciocínio Estruturado`? (Se não, rejeite imediatamente).
2. **Scan de Segurança**:
   - Há logs sensíveis (PII, tokens) sendo impressos?
   - As validações de input estão no DTO?
3. **Verificação de Handoff**: 
   - Os arquivos listados no handoff condizem com o diff real?
   - Existem pendências (riscos) não documentadas?

## Saída do Reviewer
- [ ] Aprovado (Status: `done` no DB)
- [ ] Rejeitado (Status: `blocked` + pendências listadas)
