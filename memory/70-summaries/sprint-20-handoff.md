# Handoff: Entrega de Rendimento Semanal Real e Balanceamento do Cockpit

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 20 contendo o rastreamento real do rendimento semanal e o balanceamento estético do card central.
- **Context**: 
  - Criação da coluna `weekly_history` no banco de dados Postgres e sua migração em [setup.ts](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/pages/api/setup.ts).
  - Remoção de todos os dados estáticos fictícios em [ActivityChart.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/ActivityChart.tsx) para plugar o estado reativo `weeklyHistory` alimentado pelo banco de dados do usuário logado.
  - Implementação do incremento dinâmico de ciclos no índice do dia da semana correspondente ao completar desafios em `completeChallenge` no [ChallengesContext.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/contexts/ChallengesContext.tsx).
  - Resolução do alongamento vertical desproporcional do card central de desafio em [ChallengeBox.module.css](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/styles/components/ChallengeBox.module.css), trocando `height: 100%` por `min-height: 480px; height: auto` para manter o cockpit simétrico e harmonioso.
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - O gráfico semanal exibe os dados reais do banco para cada dia (Segunda a Domingo) e incrementa na hora conforme ciclos são finalizados.
  - A coluna central não estica mais até o chão, combinando com o peso visual das colunas adjacentes.
- **Constraints**:
  - Dias da semana sem registros permanecem zerados no gráfico reativo.
- **Return**:
  - Branch `main` atualizada e enviada para o repositório remoto no GitHub.
