# Handoff: Entrega do Card de Instruções e Dicas de Descanso Ativo

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 4 com a implementação do painel de dicas e orientações de descanso ativo guiadas na tela de pausa.
- **Context**: 
  - Criação do card de descanso dinâmico em [Countdown.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/Countdown.tsx) contendo 5 orientações determinísticas rotacionadas de hidratação, respiração consciente, ergonomia, descanso visual e circulação.
  - Estilização do card em [Countdown.module.css](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/styles/components/Countdown.module.css) com animações de entrada e cores neon ciano.
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - O painel exibe e muda as dicas de forma adequada quando o modo de pausa é ativado.
- **Constraints**:
  - Nenhuma nova biblioteca externa de animação foi introduzida, mantendo o bundle leve com animações nativas CSS.
- **Return**:
  - Branch `feature/workrats-saas` atualizada e enviada para o repositório remoto no GitHub.
