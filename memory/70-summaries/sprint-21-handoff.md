# Handoff: Entrega de Gabinete de Medalhas Progressivas e Destaque Interativo

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 21 contendo a ampliação do gabinete de conquistas com patentes progressivas e seleção de medalha destaque.
- **Context**: 
  - Expansão do catálogo de conquistas `ALL_BADGES` no [ChallengesContext.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/contexts/ChallengesContext.tsx) para incluir progressões do Bronze ao Legend em 5 famílias de medalhas (Nível, Sequência, Hidratação, Postura e Mente) e 3 Medalhas Exclusivas (Coruja da Noite, Pioneiro Forjador e Dia Impecável).
  - Implementação de rastreadores reativos e independentes de quantidades completadas por tipo via localStorage.
  - Implementação do estado reativo `featuredBadgeId` e do callback `selectFeaturedBadge(badgeId)` no contexto para permitir que o usuário escolha sua medalha destaque.
  - Sincronização e persistência da medalha destaque na tabela do Postgres e cookies.
  - Habilitação da seleção interativa no painel de perfil [Profile.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/Profile.tsx), com visualização de brilho dourado e bordas selecionadas em [Profile.module.css](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/styles/components/Profile.module.css).
  - Exibição da medalha destaque selecionada ao lado do nome do colaborador no ranking do [Leaderboard.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/Leaderboard.tsx).
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - Clicar em medalhas desbloqueadas no perfil altera instantaneamente a medalha em destaque nas colunas e sincroniza no banco remoto.
  - Medalhas exclusivas são destravadas corretamente conforme os critérios de horário, empresa e contagem de ciclos diários.
- **Constraints**:
  - Medalhas bloqueadas são exibidas opacas e não-clicáveis.
- **Return**:
  - Branch `main` atualizada e enviada para o repositório remoto no GitHub.
