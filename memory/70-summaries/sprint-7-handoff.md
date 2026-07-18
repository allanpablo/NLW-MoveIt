# Handoff: Entrega de Correção de Persistência de Sessão no SSR

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 7 contendo a correção da persistência dos cookies de empresa e e-mail no Server-Side Rendering (SSR).
- **Context**: 
  - Correção em [index.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/pages/index.tsx) para capturar `userCompany` e `userEmail` dos cookies no `getServerSideProps` e repassá-los para o `ChallengesProvider` na renderização inicial do servidor.
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - Ao recarregar (refresh) a página logada, o usuário mantém seu e-mail e empresa vinculados, não perdendo a sincronia das conquistas e rankings setoriais.
- **Constraints**:
  - Dados persistem inteiramente através de cookies de cabeçalho HTTP padrão, sem latência adicional.
- **Return**:
  - Branch `feature/workrats-saas` atualizada e enviada para o repositório remoto no GitHub.
