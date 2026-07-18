# Handoff: Entrega de Integração com Banco Postgres na Vercel

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 18 contendo a transição da persistência client-side para endpoints Postgres serverless hospedados na Vercel.
- **Context**: 
  - Criação de endpoints de API em Next.js para banco de dados real:
    - [setup.ts](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/pages/api/setup.ts): Criação da tabela Postgres de usuários.
    - [auth.ts](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/pages/api/auth.ts): Cadastro e login seguros em nuvem.
    - [user.ts](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/pages/api/user.ts): Gravação e sincronização de XP, nível, medalhas desbloqueadas e senhas.
    - [leaderboard.ts](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/pages/api/leaderboard.ts): Consulta de todos os registros para classificação em tempo real.
  - Sincronização paralela em [ChallengesContext.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/contexts/ChallengesContext.tsx): O frontend tenta ler e salvar no Postgres remoto na Vercel. Caso esteja em desenvolvimento local offline sem configurações do banco de dados, o sistema recorre automaticamente ao `localStorage` como fallback, nunca quebrando a experiência de teste do desenvolvedor.
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - Todas as rotas de API foram empacotadas no build com sucesso.
- **Constraints**:
  - A conexão serverless exige que o banco esteja ativo no dashboard da Vercel para persistência permanente.
- **Return**:
  - Branch `main` atualizada e enviada para o repositório remoto no GitHub.
