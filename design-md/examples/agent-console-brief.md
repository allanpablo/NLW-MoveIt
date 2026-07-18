# Design Brief

- **Feature/superficie**: agent console operacional
- **Persona principal**: desenvolvedor ou coordenador que acompanha handoffs, contexto e status de agentes durante uma sprint.
- **Objetivo da UI**: reduzir ambiguidade operacional mostrando fila, dono, aceite, status e proximo comando verificavel.
- **Referencia primaria**: linear.app, pela densidade organizada, hierarquia clara e foco em produtividade diaria.
- **Referencias secundarias**: cursor para contexto de IA; sentry para tratamento de estados e incidentes.
- **Densidade**: alta
- **Tom visual**: tecnico

## Principios aplicados

- Navegacao lateral previsivel com conteudo principal orientado a tarefas.
- Estados de trabalho sempre visiveis: aberto, em andamento, bloqueado, concluido.
- Cada item acionavel mostra dono, criterio de aceite e proximo passo.

## Tokens visuais

- **Cores**: neutros claros para fundo, texto de alto contraste, acentos funcionais para status.
- **Tipografia**: escala compacta, labels menores, headings restritos ao contexto da tela.
- **Espacamento**: grid de 8px, alta densidade sem sobreposicao.
- **Raios/bordas/sombras**: raio ate 8px, bordas sutis, sombras apenas para overlays.
- **Iconografia**: lucide ou equivalente, sempre com tooltip para acoes ambiguas.

## Componentes esperados

- Lista de handoffs com status e filtros.
- Painel de detalhe com os 7 campos do ADR-0005.
- Log de eventos e comandos sugeridos.
- Indicadores de saude de contexto, design e spec.

## Estados obrigatorios

- [x] Carregando
- [x] Vazio
- [x] Erro
- [x] Sucesso
- [x] Permissao/sem acesso, se aplicavel
- [x] Responsivo mobile, se aplicavel

## Criterios de aceite visual

- [x] A referencia primaria e reconhecivel pelos principios, sem copia literal de marca.
- [x] Texto nao quebra nem sobrepoe em mobile e desktop.
- [x] A hierarquia deixa clara a proxima acao do usuario.
- [x] Estados obrigatorios existem e sao coerentes.
- [x] A UI pode ser validada por screenshot ou checklist objetivo.

