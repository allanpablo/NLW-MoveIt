# Handoff: Entrega do Layout Cockpit 100vh Responsivo

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 15 com a limitação e distribuição de todo o dashboard em uma única tela de 100vh (sem barras de rolagem globais).
- **Context**: 
  - Restruturação do layout em [index.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/pages/index.tsx) e [Home.module.css](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/styles/pages/Home.module.css) para dividir a visualização em uma grade de 3 colunas laterais contidas em `height: calc(100vh - 160px)`.
  - Habilitação de rolagem interna individual em cada coluna, mantendo o body do navegador com `overflow: hidden` para assegurar a visualização cockpit de tela cheia.
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - O painel cabe inteiramente na tela sem forçar barra de rolagem global no navegador em resoluções de desktop.
- **Constraints**:
  - Em dispositivos menores que 900px, o layout desfaz a grade de 3 colunas e passa a empilhar os componentes de forma fluida e legível com rolagem normal.
- **Return**:
  - Branch `feature/workrats-saas` atualizada e enviada para o repositório remoto no GitHub.
