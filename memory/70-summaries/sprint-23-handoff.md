# Handoff: Entrega de Medalhas Substituíveis, Intervalos de Ranking e Títulos de Perfil

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 23 contendo o agrupamento inteligente de medalhas, filtros de ranqueamento temporal e exibição de títulos sazonais.
- **Context**: 
  - Agrupamento das 25 medalhas em 5 famílias de progressão no [Profile.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/Profile.tsx), exibindo dinamicamente apenas a medalha de nível mais alto destravada pelo usuário para economizar espaço visual.
  - Implementação de filtros temporais (Geral, Anual, Mensal, Semanal) via dropdown select em [Leaderboard.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/Leaderboard.tsx) aplicando coeficientes de proporcionalidade nos placares.
  - Criação da exibição do título de temporada "T1: [Nome da Medalha Destaque]" na área de perfil do [Header.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/Header.tsx).
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - O painel de conquistas mostra exatamente 9 medalhas organizadas (5 de famílias e 4 exclusivas), que se atualizam no mesmo card conforme o progresso.
  - Mudar o filtro de pontuação recalcula e atualiza instantaneamente as tabelas do Leaderboard de forma limpa.
  - O título da temporada sob o nome do usuário no cabeçalho atualiza imediatamente ao clicar e selecionar uma nova medalha em destaque.
- **Constraints**:
  - Se nenhuma medalha destaque for selecionada, o título padrão exibe "T1: Recruta".
- **Return**:
  - Branch `main` atualizada e enviada para o repositório remoto no GitHub.
