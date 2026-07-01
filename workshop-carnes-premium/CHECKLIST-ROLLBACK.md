# Checklist de Rollback — Workshop de Carnes Premium

O que fazer se uma atualização publicada quebrar alguma coisa em produção. O site é hospedado na Vercel a partir do GitHub — o rollback é rápido e não exige linha de comando se preferir usar o painel.

## Como identificar que algo quebrou

- [ ] Console do navegador mostrando erros na página em produção
- [ ] Alguma seção não carrega, aparece vazia ou com layout quebrado
- [ ] Modal do PIX ou de vídeo não abre/fecha
- [ ] Botões de pagamento não respondem
- [ ] Reclamação de usuário real (print/vídeo do problema, se possível)

## Opção 1 — Rollback instantâneo pela Vercel (recomendado, leva ~10 segundos)

Não precisa mexer em código nem em git. A Vercel guarda todos os deploys anteriores.

1. Acesse o painel do projeto em [vercel.com](https://vercel.com)
2. Vá em **Deployments**
3. Encontre o último deploy que estava funcionando corretamente (geralmente o de antes da atualização com problema)
4. Clique nos três pontinhos (`...`) ao lado dele → **Promote to Production**
5. Confirme. Em segundos, a produção volta a servir aquela versão anterior
6. Confirme no site que o problema sumiu (repita o smoke test do [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md), seção 7)

> Isso **não desfaz nada no GitHub** — só troca qual deploy está ativo em produção. É seguro e reversível a qualquer momento.

## Opção 2 — Reverter no Git (quando o rollback pela Vercel não for suficiente)

Use quando precisar também desfazer o histórico do repositório, não só a produção.

```bash
git log --oneline          # encontre o hash do commit ainda bom
git revert <hash-do-commit-com-problema>   # cria um novo commit desfazendo as mudanças
git push
```

A Vercel detecta o novo push e publica automaticamente a versão corrigida.

> Evite `git reset --hard` + `push --force` em produção — isso reescreve o histórico e pode causar conflitos para quem mais estiver com o repositório clonado. `git revert` é a opção segura.

## Opção 3 — Correção pontual sem rollback completo

Se o problema for pequeno e você já sabe a causa (ex: um valor errado no `CONFIG`), pode ser mais rápido corrigir direto e publicar de novo do que reverter:

1. Corrija o arquivo (`script.js`, `style.css`, etc.)
2. Se mexeu em `style.css`/`script.js`, regenere os `.min` (ver [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md), seção 4)
3. `git add . && git commit -m "fix: ..." && git push`

## Depois do rollback

- [ ] Confirmar em produção que o problema foi resolvido
- [ ] Anotar no [CHANGELOG.md](CHANGELOG.md) o que quebrou e como foi corrigido
- [ ] Investigar a causa raiz com calma antes de tentar publicar a mudança de novo
- [ ] Se possível, testar a correção localmente (`python -m http.server 8080`, ver [README.md](README.md#como-executar-localmente)) antes do novo deploy

## Contatos/acessos necessários para agir rápido

- [ ] Acesso ao painel da Vercel confirmado
- [ ] Acesso de push ao repositório no GitHub confirmado
- [ ] Pelo menos duas pessoas com acesso, para não depender de uma única pessoa em caso de emergência
