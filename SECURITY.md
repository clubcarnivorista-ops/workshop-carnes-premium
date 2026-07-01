# SECURITY.md — Cabeçalhos de segurança

Este site é estático (HTML/CSS/JS puro, sem backend, sem formulário que grava em banco de dados, sem login). A superfície de ataque é pequena, mas os cabeçalhos abaixo fecham as brechas relevantes para esse tipo de site: clickjacking, MIME sniffing, vazamento de referrer e injeção de conteúdo.

Todos os cabeçalhos são aplicados via [`vercel.json`](vercel.json) (bloco `headers`, `source: "/(.*)"`) — a Vercel os envia automaticamente em toda resposta, sem precisar de nenhum código no servidor (não existe servidor: é um CDN estático).

## Cabeçalhos aplicados

### Content-Security-Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://www.clarity.ms;
style-src 'self' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
frame-src https://www.youtube-nocookie.com;
connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.facebook.com https://www.clarity.ms;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests
```

**O que cada diretiva permite e por quê:**

| Diretiva | Permite | Por quê |
|---|---|---|
| `default-src 'self'` | Só recursos do próprio domínio, por padrão | Base restritiva — tudo que não for explicitamente liberado abaixo é bloqueado |
| `script-src` | Scripts do próprio site + domínios dos pixels de analytics (GA4, Meta Pixel, Clarity) | Os placeholders de pixel em `index.html` (hoje comentados) precisam desses domínios para funcionar quando ativados |
| `script-src 'unsafe-inline'` | Scripts inline (sem `src=`) | Os snippets oficiais de inicialização do Meta Pixel e do Clarity são entregues como `<script>` inline, sem suporte a nonce — ver "Limitação conhecida" abaixo |
| `style-src` | CSS do próprio site + folha de estilo do Google Fonts | `<link rel="stylesheet">` do Google Fonts é a única folha de estilo externa. **Sem `'unsafe-inline'`**: o único CSS aplicado via JavaScript (`elBar.style.width` em `script.js`) é uma mutação direta de propriedade CSSOM, não um atributo `style=""` — CSP não regula esse tipo de mutação, então não precisamos afrouxar essa diretiva |
| `font-src` | Arquivos de fonte do Google Fonts | `fonts.gstatic.com` é o host onde o Google Fonts serve os arquivos `.woff2` |
| `img-src ... https:` | Qualquer imagem em HTTPS, além do próprio domínio | Pixels de rastreamento costumam usar imagens 1×1 de vários domínios (beacon). Listar cada um seria frágil; imagens não executam código, então o risco de afrouxar essa diretiva é baixo |
| `frame-src` | Apenas `youtube-nocookie.com` | Único uso de `<iframe>` no site: o modal de depoimentos em vídeo (`setupVideoModal` em `script.js`) |
| `connect-src` | `fetch`/`XHR`/beacon para os domínios dos pixels | Necessário para GA4, Google Ads e Meta Pixel enviarem eventos quando ativados |
| `object-src 'none'` | Bloqueia `<object>`/`<embed>`/Flash | Não há nenhum uso legítimo no site — fecha um vetor clássico de XSS |
| `base-uri 'self'` | Impede injeção de `<base href="...">` | Sem isso, um XSS poderia reescrever a URL-base de todos os links relativos da página |
| `form-action 'self'` | Formulários só podem submeter para o próprio domínio | O site não tem formulário que envia dados a um servidor, mas essa diretiva é uma proteção de baixo custo caso um seja adicionado no futuro |
| `frame-ancestors 'none'` | Ninguém pode carregar este site dentro de um `<iframe>` | Proteção primária contra clickjacking — mais forte que `X-Frame-Options`, mas só funciona via header (não existe equivalente em `<meta>`) |
| `upgrade-insecure-requests` | Troca automaticamente qualquer link `http://` por `https://` | Camada extra, redundante com o fato de a Vercel já servir tudo em HTTPS |

### Strict-Transport-Security (HSTS)

```
max-age=63072000; includeSubDomains; preload
```

Força o navegador a **nunca** tentar `http://` neste domínio pelos próximos 2 anos (63072000 segundos), incluindo subdomínios. `preload` permite (opcionalmente) submeter o domínio à [lista de pré-carregamento HSTS](https://hstspreload.org/) dos navegadores — só faça isso depois de confirmar que o domínio final vai ficar permanentemente em HTTPS, porque reverter é lento.

### X-Frame-Options: DENY

Impede que o site seja carregado dentro de um `<iframe>` em qualquer outro domínio. Redundante com `frame-ancestors 'none'` do CSP, mas mantido porque navegadores muito antigos (que não suportam CSP `frame-ancestors`) ainda respeitam este header.

### X-XSS-Protection: 0

**Este valor é intencional, não um esquecimento.** O header `X-XSS-Protection` controla um filtro legado de XSS embutido em navegadores antigos (o "XSS Auditor" do Chrome/WebKit). A orientação atual da [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/) e do próprio [Chromium](https://chromestatus.com/feature/5021976655560704) é **desativar** esse filtro (`0`) em vez de ativá-lo (`1; mode=block`): o filtro em si tinha vulnerabilidades conhecidas que podiam ser exploradas para *esconder* conteúdo legítimo da página (um tipo de ataque chamado "XSS Auditor abuse"), e navegadores modernos (Chrome 78+, todos os Edge/Firefox/Safari atuais) já removeram esse filtro por completo — o header não faz mais nada neles. A proteção real contra XSS vem do `Content-Security-Policy` acima.

### X-Content-Type-Options: nosniff

Impede que o navegador tente "adivinhar" o tipo de um arquivo diferente do declarado no `Content-Type` — evita que, por exemplo, um arquivo `.jpg` malicioso seja interpretado como HTML/JS executável.

### Referrer-Policy: strict-origin-when-cross-origin

Ao clicar em um link que sai do site (WhatsApp, Instagram, Mercado Pago), envia só a origem (`https://seusite.vercel.app`), nunca a URL completa com querystring, para domínios de terceiros.

### Permissions-Policy

```
camera=(), microphone=(), geolocation=(), payment=()
```

Desativa explicitamente o acesso a câmera, microfone, geolocalização e Payment Request API — nenhum desses recursos é usado pelo site, então bloqueá-los explicitamente reduz a superfície de ataque caso um script de terceiros comprometido tente acessá-los.

## Limitação conhecida — `'unsafe-inline'` em `script-src`

Os snippets oficiais de Google Analytics, Meta Pixel, Google Ads e Microsoft Clarity (ver placeholders comentados em `index.html`) são entregues pelos próprios provedores como `<script>` inline. Para permitir que esses snippets rodem sem reescrevê-los, `script-src` inclui `'unsafe-inline'`.

Isso enfraquece uma camada de proteção do CSP contra XSS via injeção de `<script>` inline. A alternativa correta (usar um `nonce` único por requisição em cada tag `<script>`) exige um servidor que gere HTML dinamicamente a cada request — incompatível com a natureza 100% estática deste projeto ("sem build, sem dependências", ver [README.md](README.md)).

**Mitigação already in place:** o site não tem nenhum formulário, campo de busca ou parâmetro de URL refletido no HTML, que são os vetores mais comuns de XSS refletido/armazenado. O risco residual de manter `'unsafe-inline'` é baixo neste contexto específico.

Se no futuro o projeto migrar para uma plataforma com renderização server-side (ex: Next.js na própria Vercel), vale revisitar essa diretiva usando nonces.

## Como verificar

Depois de publicar, confirme os headers com qualquer um destes métodos:

1. **[securityheaders.com](https://securityheaders.com)** — cole a URL do site publicado, gera uma nota de A a F com explicação de cada header.
2. **DevTools do navegador** — aba *Network*, clique na requisição do documento HTML principal, veja *Response Headers*.
3. **Terminal:**
   ```bash
   curl -I https://seusite.vercel.app
   ```

Nenhuma dessas verificações requer conta ou custo.
