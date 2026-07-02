# LOCALIZAÇÃO DO PROJETO

Referência rápida — onde tudo fica. Se você (ou uma IA assistente) chegar aqui sem contexto nenhum, esta é a página que resolve "onde é que eu edito, onde é que publica, onde é que fica no ar".

| | |
|---|---|
| **Projeto** | Clube Carnivorista — Landing Page (Workshop de Carnes Premium) |
| **Pasta oficial local** | `C:\Users\jamju\OneDrive\Desktop\Claude code\workshop-carnes-premium` |
| **GitHub** | https://github.com/clubcarnivorista-ops/workshop-carnes-premium |
| **Deploy** | Vercel (deploy automático a cada `git push` na branch `main`) |
| **Landing pública** | https://workshop-carnes-premium.vercel.app/ |

## Regra de ouro

**A pasta local listada acima é o repositório Git oficial.** Não existe clone paralelo, não existe pasta duplicada, não existe upload manual — desde a v1.0.2, editar aqui e rodar `git push` é o único fluxo de publicação. Se em algum momento você encontrar uma pasta com nome parecido (`wcp-deploy`, `wcp-deploy-tmp` ou qualquer outra) fazendo esse papel, ela é temporária/obsoleta e não deve ser usada — apague-a.

## Se você é uma IA assistente lendo isto pela primeira vez

1. Confirme que está na pasta certa: `git remote get-url origin` deve retornar exatamente a URL do GitHub acima.
2. Leia [00-INICIO.md](00-INICIO.md) antes de fazer qualquer alteração.
3. Nunca publique (`git push`) sem antes rodar o checklist de [03-ROTINA.md](03-ROTINA.md).

## Documentos relacionados

- [00-INICIO.md](00-INICIO.md) — ponto de partida, o que ler primeiro
- [01-ESTRUTURA.md](01-ESTRUTURA.md) — mapa de todas as pastas e arquivos
- [02-PUBLICACAO.md](02-PUBLICACAO.md) — fluxo completo de publicação
- [03-ROTINA.md](03-ROTINA.md) — checklist para toda alteração futura
- [04-HISTORICO.md](04-HISTORICO.md) — versões publicadas
- [05-BACKUP.md](05-BACKUP.md) — rotina de backup
