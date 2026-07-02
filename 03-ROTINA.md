# 03 — ROTINA

Checklist para usar toda vez que for alterar qualquer coisa no projeto — do texto de um botão até uma seção inteira.

## Antes de alterar

- [ ] Abrir a pasta oficial (ver [LOCALIZACAO_DO_PROJETO.md](LOCALIZACAO_DO_PROJETO.md)) — nunca uma cópia, nunca uma pasta com nome parecido
- [ ] `git status` — confirmar que a pasta está limpa (sem alterações pendentes de uma sessão anterior esquecida)
- [ ] `git pull` — se mais de uma pessoa/máquina mexe no projeto, garantir que está com a versão mais recente antes de começar

## Durante a edição

- [ ] Editar sempre os arquivos-fonte (`script.js`, `style.css`, `index.html`) — nunca `style.min.css`/`script.min.js` diretamente
- [ ] Se o dado que você quer mudar existe no `CONFIG` (`script.js`), edite lá — não duplique o valor direto no HTML (ver [CONFIG.md](CONFIG.md))
- [ ] Se mudou `style.css` ou `script.js`, regenerar os minificados:
  ```bash
  python tools/minify.py css style.css style.min.css
  python tools/minify.py js script.js script.min.js
  ```

## Testar (antes de publicar)

- [ ] Rodar o site localmente (`python -m http.server 8080` na pasta do projeto) e abrir `http://localhost:8080`
- [ ] Testar a alteração especificamente — não só olhar, interagir (clicar, preencher, testar no mobile)
- [ ] Conferir o Console do navegador (F12) sem erros
- [ ] Se a alteração envolveu preço, data, PIX, links de contato ou qualquer parte do fluxo de pagamento, rodar o [CHECKLIST-TESTES.md](CHECKLIST-TESTES.md) completo

## Publicar

- [ ] `git add` (ver o que está sendo adicionado com `git status` antes)
- [ ] `git commit -m "mensagem clara"`
- [ ] `git push origin main`
- [ ] Ver [02-PUBLICACAO.md](02-PUBLICACAO.md) para o fluxo detalhado

## Conferir o deploy

- [ ] Aguardar 15–60 segundos
- [ ] Abrir https://workshop-carnes-premium.vercel.app/ (a URL de produção, não uma preview) e confirmar que a alteração está lá
- [ ] Testar de novo em produção o que foi alterado — não assumir que "funcionou local = funciona publicado"
- [ ] Se a alteração foi grande (nova seção, mudança de preço/PIX, nova página), rodar o smoke test completo do [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md)

## Depois

- [ ] Se a alteração muda algo relevante (nova versão, nova funcionalidade, correção de bug), registrar em [04-HISTORICO.md](04-HISTORICO.md) e no [CHANGELOG.md](CHANGELOG.md) técnico
- [ ] Se mexeu na estrutura de pastas/arquivos, atualizar [01-ESTRUTURA.md](01-ESTRUTURA.md)
