# Handoff: Entrega do Ciclo Pomodoro com Pausa Longa e Indicadores

- **From**: apk (AI Agent)
- **To**: allanpablo (User)
- **Intent**: Registrar a entrega da Sprint 8 contendo a lógica de Pausa Longa (Long Break) a cada 4 ciclos completos de Pomodoro e indicadores de dots visuais de progresso.
- **Context**: 
  - Criação dos estados `isLongBreak` e `completedCyclesCount` em [CountdownContext.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/contexts/CountdownContext.tsx) para transicionar o descanso ativo de 5 minutos (regular) para 15 minutos (Pausa Longa) a cada 4 ciclos.
  - Implementação de fileira de dots de status sob o timer e texto informativo do progresso dos ciclos em [Countdown.tsx](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/Components/Countdown.tsx).
  - Estilização em [Countdown.module.css](file:///home/apk/forja-workspace/projects/NLW-MoveIt/src/styles/components/Countdown.module.css).
- **Acceptance**:
  - Compilação limpa do projeto utilizando Next.js 16 (Turbopack).
  - Dots de progresso mudam de cor conforme os focos são finalizados.
  - No quarto foco finalizado, o tempo de descanso altera automaticamente de 5 para 15 minutos de forma intuitiva com rótulos dedicados de "Pausa Longa".
- **Constraints**:
  - A contagem de ciclos reinicia automaticamente a cada 4, voltando a dotar em 0/4 após completar a pausa longa.
- **Return**:
  - Branch `feature/workrats-saas` atualizada e enviada para o repositório remoto no GitHub.
