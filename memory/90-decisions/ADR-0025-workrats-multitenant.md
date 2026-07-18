# ADR-0025: Transição para Plataforma SaaS Multi-Tenant (Estilo Gymrats)

## Contexto
O projeto Move.it precisa escalar de um único usuário corporativo local para uma plataforma SaaS aberta onde qualquer pessoa/empresa possa se cadastrar, criar seu perfil e competir de forma setorial ou corporativa. O estilo visual e de engajamento será inspirado no conceito "Gymrats" (foco em ranking contínuo, estética neon/escura competitiva, sequências de atividade e engajamento comunitário saudável).

## Decisão
1. **Pivô do Nome de Produto**: O ecossistema será apelidado ou focado no conceito "WorkRats" ou "MoveRats".
2. **Nova Arquitetura de Dados de Login**: O fluxo de autenticação passará a exigir:
   - `empresa` (Nome da empresa)
   - `setor` (Setor/Departamento)
   - `email` (Identificação única)
   - `usuario` (Nome de exibição)
   - `senha` (Credenciais seguras de login)
3. **Persistência Multi-Tenant Local**: Para o frontend/MVP, simularemos o banco de dados multi-tenant utilizando arrays de estados e armazenamento criptografado/estruturado local (cookies e localStorage), permitindo registrar mais de uma empresa e comparar seus desempenhos dinamicamente no Leaderboard.
4. **Renovação Visual Estilo Gymrats**: Introduziremos uma paleta de tema escuro de alto contraste com gradientes neon (roxo/verde/ciano) e painéis de estatísticas expandidos.

## Consequências
- **Positivas**: Maior engajamento do usuário devido à competição corporativa/setorial real e apelo estético moderno.
- **Negativas**: Aumento na complexidade da gerência de estado de autenticação no Next.js (necessário controlar rotas privadas/protegidas e fluxos de cadastro e login de forma mais robusta).

## Alternativas consideradas
- Manter o login simples e sem senha (descartado pois impede o uso por múltiplas pessoas na mesma empresa ou de forma pública e segura).
