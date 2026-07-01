# DEPLOY.md — Guia de Publicação

Guia único para publicar, mover de hospedagem ou atualizar o Workshop de Carnes Premium. O projeto é **HTML/CSS/JS puro, sem build** — qualquer hospedagem de arquivos estáticos serve.

---

## ⚠️ Estrutura real do repositório (leia antes de publicar)

O repositório [`clubcarnivorista-ops/workshop-carnes-premium`](https://github.com/clubcarnivorista-ops/workshop-carnes-premium) tem uma particularidade histórica: o primeiro upload (feito arrastando arquivos direto pela interface do GitHub) criou **uma pasta `workshop-carnes-premium/` a mais dentro do próprio repositório**:

```
workshop-carnes-premium (repo no GitHub)
└── workshop-carnes-premium/     ← pasta extra, criada no primeiro upload manual
    ├── index.html
    ├── style.css
    └── ...
```

A Vercel está configurada com **Root Directory = `workshop-carnes-premium`**, então o site funciona normalmente apesar dessa pasta duplicada. Mas isso significa que **esta pasta local (onde você edita os arquivos) não é a raiz do repositório Git** — ela corresponde à subpasta `workshop-carnes-premium/` de dentro do repo.

### Fluxo correto para publicar (enquanto essa estrutura não for corrigida)

Não dê `git init` direto nesta pasta. Em vez disso:

```bash
# 1. Clone o repositório numa pasta separada (só precisa fazer isso 1x)
git clone https://github.com/clubcarnivorista-ops/workshop-carnes-premium.git wcp-deploy

# 2. Sempre que for publicar uma atualização, copie o conteúdo desta pasta
#    de trabalho para dentro da subpasta do clone (sobrescrevendo):
#    (ajuste os caminhos conforme o seu sistema)
cp -r /caminho/para/workshop-carnes-premium/. wcp-deploy/workshop-carnes-premium/

# 3. Commit e push a partir do clone
cd wcp-deploy
git add -A
git commit -m "Descreva a atualização aqui"
git push origin main
```

### Correção definitiva (recomendada, mas opcional)

Pra eliminar esse passo extra permanentemente:
1. No GitHub, mova todo o conteúdo de dentro de `workshop-carnes-premium/` para a raiz do repositório (ou recrie o repositório já na estrutura certa).
2. Na Vercel, vá em **Settings → General → Root Directory** e deixe em branco (raiz).
3. A partir daí, esta pasta local passa a corresponder exatamente à raiz do repositório, e o fluxo simples de "Como atualizar" (mais abaixo) volta a valer sem o passo de cópia extra.

---

## Como publicar na Vercel (recomendado)

1. Suba o projeto para um repositório no GitHub (veja [README.md → Como publicar no GitHub](README.md#como-publicar-no-github)).
2. Acesse [vercel.com](https://vercel.com) → **Sign Up** → **Continue with GitHub**.
3. **Add New... → Project** → selecione o repositório.
4. Na configuração:
   - **Framework Preset:** `Other`
   - **Build Command:** vazio
   - **Output Directory:** vazio (ou `.`)
5. **Deploy**. Em ~30 segundos a Vercel entrega uma URL pública (`https://SEU-PROJETO.vercel.app`).
6. `git push` depois disso publica automaticamente — não precisa repetir nada.

A configuração de cache e headers de segurança já está em [vercel.json](vercel.json) e é aplicada automaticamente nesse fluxo.

---

## Como publicar na Netlify (alternativa)

1. Suba o projeto para o GitHub (mesmo passo 1 acima).
2. Acesse [netlify.com](https://netlify.com) → **Sign up** → **Continue with GitHub**.
3. **Add new site → Import an existing project** → selecione o repositório.
4. Na configuração de build:
   - **Build command:** vazio
   - **Publish directory:** vazio (ou `.`)
5. **Deploy site**. A Netlify entrega uma URL pública (`https://SEU-PROJETO.netlify.app`).

### Diferenças em relação à Vercel

- O `vercel.json` **não é lido pela Netlify** — ele não faz nada nesse cenário (não precisa remover, só é ignorado). Se quiser os mesmos headers de cache/segurança na Netlify, crie um arquivo `netlify.toml` na raiz:
  ```toml
  [[headers]]
    for = "/*.css"
    [headers.values]
      Cache-Control = "public, max-age=86400, must-revalidate"

  [[headers]]
    for = "/*.js"
    [headers.values]
      Cache-Control = "public, max-age=86400, must-revalidate"

  [[headers]]
    for = "/*"
    [headers.values]
      X-Content-Type-Options = "nosniff"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Permissions-Policy = "camera=(), microphone=(), geolocation=()"
  ```
- A página `404.html` na raiz do projeto é detectada automaticamente pela Netlify, igual à Vercel — nenhuma configuração extra necessária.
- `git push` também publica automaticamente, do mesmo jeito.

---

## Como conectar um domínio próprio

Funciona de forma parecida nas duas plataformas — a diferença é só onde você clica.

### Na Vercel
1. No projeto, vá em **Settings → Domains**.
2. Digite seu domínio (ex: `workshopdecarnespremium.com.br`) → **Add**.
3. A Vercel mostra os registros DNS que faltam (geralmente um `A` ou `CNAME`). Cadastre-os no painel do seu provedor de domínio (Registro.br, GoDaddy, etc.).
4. Aguarde a propagação (minutos a poucas horas). A Vercel emite o certificado HTTPS automaticamente, sem custo.

### Na Netlify
1. No site, vá em **Domain settings → Add a domain**.
2. Digite seu domínio → siga as instruções de DNS mostradas (`A`/`CNAME` ou usar os nameservers da Netlify).
3. Aguarde a propagação. O certificado HTTPS (Let's Encrypt) é emitido automaticamente.

### Depois de trocar o domínio, atualize no código
- [ ] `<link rel="canonical">` em `index.html`, `obrigado.html` e `404.html`
- [ ] `og:url`, `og:image`, `twitter:image` em `index.html`
- [ ] URLs dentro do bloco Schema.org Event (JSON-LD) em `index.html`
- [ ] `robots.txt` (linha `Sitemap:`)
- [ ] Todas as `<loc>` em `sitemap.xml`

---

## Como atualizar a landing em futuras edições do Clube Carnivorista

Fluxo resumido (detalhado em [README.md → Como atualizar a Landing Page](README.md#como-atualizar-a-landing-page)):

1. Edite `script.js` (preços, data, vagas, links, depoimentos, patrocinadores — tudo centralizado, ver [CONFIG.md](CONFIG.md)) e/ou `style.css` se necessário.
2. Teste localmente (`python -m http.server 8080`).
3. Regenere os arquivos minificados usados em produção:
   ```bash
   python tools/minify.py css style.css style.min.css
   python tools/minify.py js script.js script.min.js
   ```
4. Rode o [CHECKLIST-TESTES.md](CHECKLIST-TESTES.md).
5. `git add . && git commit -m "..." && git push` — publica automaticamente.
6. Rode o smoke test do [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md).

Para uma **nova edição do evento** (data/local diferente, ou até um novo evento do Clube Carnivorista reaproveitando esta base), o único arquivo que concentra praticamente tudo que muda é `script.js` — preços, data, vagas, depoimentos e patrocinadores ficam nos objetos `CONFIG`, `TESTIMONIALS` e `PATROCINADORES` no topo do arquivo. Não é necessário reescrever HTML ou CSS.

Se for reaproveitar este projeto como ponto de partida para um evento totalmente novo, lembre-se também de:
- [ ] Atualizar textos fixos no HTML que não vêm do `CONFIG` (título da página, meta description, Schema.org Event, nome do evento no rodapé)
- [ ] Trocar as imagens em `assets/` (QR Code, imagem de compartilhamento, miniaturas de vídeo, logos de patrocinador)
- [ ] Revisar `manifest.json` (nome do app)

---

## Rollback

Se uma publicação der problema, veja [CHECKLIST-ROLLBACK.md](CHECKLIST-ROLLBACK.md) — o rollback pela Vercel/Netlify é feito pelo painel, sem precisar mexer em código.
