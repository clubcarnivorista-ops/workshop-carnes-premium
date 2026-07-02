# 02 — PUBLICAÇÃO

O fluxo completo, do editor até a Landing no ar.

## O fluxo

```
Editar
  ↓
git status
  ↓
git add
  ↓
git commit
  ↓
git push
  ↓
GitHub
  ↓
Deploy automático
  ↓
Vercel
  ↓
Landing publicada
```

## Passo a passo

### 1. Editar
Abra a pasta oficial (ver [LOCALIZACAO_DO_PROJETO.md](LOCALIZACAO_DO_PROJETO.md)) e edite os arquivos-fonte — nunca os `.min`. Se mudou `style.css` ou `script.js`, regenere os minificados antes de continuar:
```bash
python tools/minify.py css style.css style.min.css
python tools/minify.py js script.js script.min.js
```

### 2. git status
Confira o que vai ser publicado antes de mandar qualquer coisa:
```bash
git status
```
Leia a lista — se aparecer algo que você não esperava alterar, investigue antes de prosseguir.

### 3. git add
```bash
git add -A
```
Ou, para adicionar só arquivos específicos: `git add caminho/do/arquivo`.

### 4. Commit
```bash
git commit -m "Descreva a alteração em uma frase"
```
Mensagens curtas e específicas — "Atualiza preço do ingresso feminino" é melhor que "Ajustes".

### 5. Push
```bash
git push origin main
```
Esse é o momento em que a alteração sai da sua máquina.

### 6. GitHub
O `push` envia o código para https://github.com/clubcarnivorista-ops/workshop-carnes-premium — confira no navegador se quiser ver o commit chegando.

### 7. Deploy automático
A Vercel está conectada a esse repositório GitHub. Toda vez que a branch `main` recebe um push, ela dispara um novo deploy sozinha — não é preciso rodar nenhum comando extra nem clicar em nada no painel da Vercel.

### 8. Vercel
O deploy roda no painel da Vercel (https://vercel.com/club-carnivorista) em 15 a 60 segundos, normalmente. Dá para acompanhar em tempo real na aba **Deployments** do projeto.

### 9. Landing publicada
Depois do deploy concluir, a alteração já está no ar em https://workshop-carnes-premium.vercel.app/. Confira sempre a URL de produção (não uma URL de preview) antes de considerar a publicação concluída.

## Como confirmar que publicou de verdade

```bash
# O commit local bate com o que está no GitHub?
git rev-parse HEAD origin/main

# O site está respondendo?
curl -I https://workshop-carnes-premium.vercel.app/
```
Se os dois hashes do primeiro comando forem iguais, o push chegou. Ver [03-ROTINA.md](03-ROTINA.md) para o checklist completo de verificação pós-deploy.

## O que fazer se algo der errado

Ver [CHECKLIST-ROLLBACK.md](CHECKLIST-ROLLBACK.md) — o rollback é feito pelo painel da Vercel (voltar para um deployment anterior), sem precisar mexer em código.
