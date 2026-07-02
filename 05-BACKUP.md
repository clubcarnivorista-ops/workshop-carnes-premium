# 05 — BACKUP

Rotina recomendada para nunca perder trabalho — local e no GitHub.

## Por que isso importa

O projeto já tem duas camadas de redundância por natureza (a pasta local está dentro do OneDrive, e todo commit vai para o GitHub), mas nenhuma das duas te protege de tudo sozinha:

- **OneDrive** protege contra perda do computador, mas sincroniza alterações erradas junto com as certas (se você apagar um arquivo por engano, o OneDrive apaga na nuvem também).
- **GitHub** protege o histórico de código, mas só do que foi commitado — alterações feitas e nunca commitadas não existem lá.

## Backup local

- **OneDrive:** a pasta oficial já está em `C:\Users\jamju\OneDrive\Desktop\Claude code\workshop-carnes-premium` — confirme periodicamente que o ícone de sincronização do OneDrive mostra "atualizado", não "pendente" ou "erro".
- **Não crie cópias manuais da pasta** ("workshop-carnes-premium - Copia", `workshop-carnes-premium-backup`, etc.) para "garantir" — isso é exatamente o tipo de duplicação que já causou problema neste projeto antes (ver [CHANGELOG.md](CHANGELOG.md) v1.0.1 e v1.0.2). Se quiser um backup local extra, use `git bundle` (abaixo), não uma cópia solta de pasta.
- **Backup local via Git**, sem depender da internet:
  ```bash
  git bundle create workshop-backup-$(date +%Y%m%d).bundle --all
  ```
  Isso gera um único arquivo com todo o histórico do repositório. Guarde fora da pasta do projeto (outro HD, pendrive, nuvem separada).

## Backup no GitHub

- **Commits pequenos e frequentes** valem mais como backup do que um commit gigante uma vez por mês — cada `git push` já é, na prática, um backup incremental automático.
- **Nunca acumule alterações não commitadas por dias.** Se está no meio de algo e vai parar, prefira commitar mesmo um estado intermediário (`git commit -m "WIP: em andamento"`) a deixar tudo só na pasta local.
- **Tags de versão**, opcional mas recomendado a cada versão publicada (ver [04-HISTORICO.md](04-HISTORICO.md)):
  ```bash
  git tag -a v1.0.4 -m "QR Code PIX oficial"
  git push origin v1.0.4
  ```
  Isso cria um marcador permanente no GitHub — dá para voltar exatamente para aquele estado a qualquer momento, mesmo que a branch `main` continue avançando.

## Backup de dados que não são código

Alguns dados críticos do projeto (chave PIX, links de pagamento, senhas de acesso ao GitHub/Vercel) não devem ficar só no `CONFIG` do `script.js` — são dados sensíveis do negócio, não só configuração de site:

- Guarde os dados oficiais (PIX, Mercado Pago, WhatsApp, redes sociais) também em um gerenciador de senhas ou documento seguro fora do repositório — o `CONFIG.md` documenta *onde* cada dado fica no código, mas não substitui um backup separado da informação em si.
- Se a conta do GitHub (`clubcarnivorista-ops`) ou da Vercel mudar de responsável, atualize o acesso **antes** de perder o acesso da conta antiga.

## Frequência recomendada

| O quê | Quando |
|---|---|
| `git push` de alterações | A cada sessão de trabalho, mesmo que pequena |
| `git bundle` (backup local do histórico) | Mensal, ou antes de uma mudança grande/arriscada |
| Tag de versão | A cada versão publicada (ver [04-HISTORICO.md](04-HISTORICO.md)) |
| Conferir dados sensíveis fora do repositório | A cada vez que um dado oficial (PIX, links) mudar |
