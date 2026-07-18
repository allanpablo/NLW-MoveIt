# Matriz de Referencias design-md

Use esta matriz para escolher referencias por tipo de superficie. Ela nao substitui o julgamento do designer/agente; ela reduz escolhas aleatorias.

| Superficie | Primarias recomendadas | Secundarias uteis | Evitar |
|---|---|---|---|
| Agent console / ops | linear.app, cursor, raycast | sentry, posthog, claude | visual de landing ou excesso decorativo |
| Dashboard executivo | stripe, linear.app, posthog | airbnb, sentry, supabase | cards gigantes sem densidade informacional |
| Docs / developer portal | mintlify, stripe, vercel | resend, supabase, hashicorp | layouts promocionais que escondem exemplos |
| SaaS operacional / CRM | linear.app, intercom, airtable | clay, notion, zapier | paleta de uma cor so e baixa densidade |
| Landing de produto tecnico | vercel, stripe, resend | cursor, x.ai, cohere | hero abstrato sem produto real |
| Ferramenta colaborativa | figma, miro, notion | cal, airtable, intercom | navegacao escondida ou comandos ambiguos |
| IA / agent workflow | claude, cursor, x.ai | mistral.ai, together.ai, cohere | magia visual sem rastreabilidade de execucao |
| Fintech / trust | wise, revolut, coinbase | stripe, kraken | linguagem visual agressiva sem confianca |
| Premium / marca forte | apple, bmw, ferrari | tesla, lamborghini, spacex | copiar identidade visual proprietaria |
| Observabilidade / incidentes | sentry, posthog, datadog-style local se existir | linear.app, stripe | esconder erros em UI decorativa |

## Heuristica rapida

- Se a tela sera usada muitas vezes por dia, escolha referencias de produtividade: `linear.app`, `raycast`, `cursor`.
- Se a tela precisa ensinar ou vender uma API, escolha docs/devtools: `mintlify`, `stripe`, `vercel`.
- Se a tela precisa passar confianca, escolha sistemas com clareza financeira/operacional: `wise`, `stripe`, `sentry`.
- Se a tela e para agentes, sempre inclua rastreabilidade: fila, status, logs, handoffs e criterio de aceite visivel.

