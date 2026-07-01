# Changelog — Workshop de Carnes Premium

Todas as mudanças relevantes da Landing Page são registradas aqui. Formato livre inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/).

## [1.0.1] — 2026-07-01

Integração dos ativos visuais reais das proteínas. Identidade visual, layout e UX **não foram alterados** — o CSS já vinha preparado desde a v1.0.0 para receber essas imagens (`.menu-protein-item__media img { object-fit: cover }`), então nenhuma regra nova de estilo foi necessária, só a correção do comentário que descrevia o elemento como placeholder.

### Adicionado
- 5 fotos reais em `assets/proteins/` conectadas à seção "Menu da Experiência → Proteínas Premium": `picanha-reserva.webp`, `entrecot-defumado.webp`, `chuck-eye-steak.webp`, `entranha-gorgonzola.webp`, `fraldinha-crosta-alho.webp`
- `<img>` dentro de cada `.menu-protein-item__media` em `index.html`, com `width="56" height="56"` (evita CLS), `loading="lazy"`, `decoding="async"` e `alt=""` (decorativa — o nome do corte já está no texto ao lado)
- Nova seção "Como trocar as fotos das proteínas" no `README.md`

### Corrigido
- Os 5 arquivos originais entregues estavam com extensão dupla incorreta (`nome.webp.jpeg`) e eram JPEG de verdade, não WEBP (150–280KB cada). Convertidos para WEBP genuíno, recortados ao centro em proporção quadrada e redimensionados para 160×160px — resultado final entre 7KB e 10KB por imagem (~95% menor que o arquivo original), sem perda perceptível de qualidade no tamanho de exibição (56×56px)

### Documentação
- `assets/README.md`: linha de `proteins/*.webp` atualizada (formato, tamanho e os 5 arquivos em uso; deixou de constar como pasta vazia)
- `README.md`: seção "Otimização de imagens" atualizada para refletir o uso real de WEBP e `object-fit: cover` como estratégia de enquadramento

### Verificado
- Console sem erros e as 5 imagens carregando (HTTP 200, `naturalWidth/Height` corretos) em desktop (1280px), tablet (768px) e mobile (375px)
- Nenhum deslocamento de layout: `width`/`height` no HTML reservam o espaço antes da imagem carregar
- Cards mantêm o mesmo tamanho (56×56px, círculo) em todos os breakpoints — comportamento herdado do CSS já existente, não alterado nesta versão

## [1.0.0] — FINAL — 2026-07-01

Versão definitiva para operação do Clube Carnivorista. Como em todas as versões anteriores, identidade visual, layout e UX **não foram alterados** — as mudanças desta versão são estrutura de projeto, conteúdo institucional, segurança e SEO.

### Adicionado — Estrutura de projeto
- Subpastas em `assets/`: `proteins/`, `videos/`, `feedbacks/`, `patrocinadores/`, `logos/`, `social/`, `certificados/` (ver `assets/README.md` para o propósito de cada uma). `sponsors/` foi renomeada para `patrocinadores/` em todas as referências (`script.js`, `CONFIG.md`)

### Adicionado — Depoimentos em vídeo
- `TESTIMONIALS` (`script.js`) agora tem 5 itens: **Fernando** e **Sorocaba** separados (antes um único card combinado), e "Participantes" renomeado para **Clientes**. A estrutura já era um array renderizado dinamicamente — nenhuma mudança de HTML/CSS foi necessária para suportar a quantidade adicional

### Adicionado — Rodapé institucional
- Novas chaves em `CONFIG` (`script.js`): `youtube`, `telefone`, `email`, `endereco`
- Nova coluna "Institucional" no rodapé, com Telefone (`tel:`), E-mail (`mailto:`) e Endereço, todos vindos do `CONFIG`
- Link do YouTube adicionado à coluna "Contato" do rodapé (junto de Instagram, WhatsApp e Localização)
- `.footer__grid` passou de 2 colunas fixas para `repeat(auto-fit, minmax(200px, 1fr))`, para acomodar a nova coluna sem alterar o estilo visual das demais

### Corrigido
- Copyright do rodapé: `© 2025 Workshop de Carnes Premium` → `© 2026 Clube Carnivorista. Todos os direitos reservados.`

### Adicionado — Páginas institucionais
- 6 páginas novas, com conteúdo placeholder e link de volta para a home, reaproveitando 100% os componentes visuais existentes (`.obrigado`, `.btn--primary` — nenhum CSS novo): `privacidade.html`, `lgpd.html`, `termos.html`, `cancelamento.html`, `reembolso.html`, `cookies.html`
- Linha de links institucionais no rodapé (`.footer__legal`) apontando para as 6 páginas acima
- Todas marcadas `noindex, nofollow` e fora do `sitemap.xml` (mesmo critério já aplicado a `obrigado.html` desde a RC-1) até terem conteúdo jurídico definitivo

### Adicionado — Segurança
- **`SECURITY.md`**: documento novo explicando cada cabeçalho de segurança, com a justificativa técnica de cada diretiva
- `vercel.json`: adicionados `Content-Security-Policy`, `Strict-Transport-Security` (HSTS), `X-Frame-Options: DENY` e `X-XSS-Protection: 0` (valor alinhado à orientação atual da OWASP — o filtro legado é considerado inseguro pelos navegadores modernos, que já o removeram)
- `Permissions-Policy` estendida com `payment=()`

### Adicionado — SEO
- Schema.org **Organization**, **LocalBusiness** e **BreadcrumbList** (JSON-LD) no `<head>` de `index.html`, complementando o `Event` já existente desde a RC-1

### Documentação
- `README.md`: versão atualizada para 1.0.0 FINAL, árvore de arquivos com as novas páginas/pastas/documentos, novas seções sobre links institucionais e páginas legais
- `CONFIG.md`: tabela atualizada com `youtube`, `telefone`, `email`, `endereco`; nota sobre manter os blocos JSON-LD sincronizados manualmente com o `CONFIG`
- `assets/README.md`: reescrito com a árvore completa de subpastas e o propósito de cada uma

## [RC-2] — 2026-07-01

Preparação para marketing e conversão. Landing continua "congelada": nenhum layout, identidade visual ou UX principal foi alterado — tudo que segue é infraestrutura invisível ao visitante (rastreamento, favicons, página de erro, documentação).

### Adicionado
- Placeholder do **Microsoft Clarity** no `<head>` de `index.html`, seguindo o mesmo padrão dos placeholders já existentes (GA4, Meta Pixel, Google Ads)
- **Rastreamento de conversão** (`trackEvent`/`setupConversionTracking` em `script.js`): qualquer elemento com `data-track-event="..."` dispara automaticamente um evento no Meta Pixel, GA4/Google Ads e Clarity, se estiverem ativos. Aplicado nos CTAs: `cta_comprar` (botões "Garantir Minha Vaga"), `cta_entrar_grupo`, `cta_whatsapp`, `cta_pix`, `cta_mercado_pago`
- **Favicon completo**: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png` (gerados a partir de `favicon.svg`), referenciados em `index.html`, `obrigado.html`, `404.html` e `manifest.json`
- **`404.html`**: página de erro personalizada com a identidade visual do Clube Carnivorista (reaproveita os componentes visuais já existentes de `.obrigado`, sem CSS novo), servida automaticamente pela Vercel/Netlify
- **`DEPLOY.md`**: guia único de publicação (Vercel, Netlify, domínio próprio, fluxo de atualização)
- **`CHECKLIST-LANCAMENTO.md`**: checklist de marketing/conversão para o dia de abertura oficial das vendas

### Documentação
- `CONFIG.md`: nova seção documentando os pixels de analytics e a convenção `data-track-event`
- `README.md`: novas seções sobre favicon, página 404 e pixels/conversão; árvore de arquivos atualizada

## [RC-1] — 2026-07-01

Release Candidate 1 — primeira versão considerada pronta para publicação em produção. Landing "congelada": nenhuma funcionalidade, layout, UX ou design foi alterado nesta versão em relação à anterior — apenas auditoria, limpeza e otimização.

### Removido (código morto)
- Duas variações de peso de fonte nunca usadas pelo CSS: Playfair Display 400 e Inter 500 (removidas da URL do Google Fonts em `index.html` e `obrigado.html`)
- `id="navbar"` e `id="floatingCta"` — atributos sem nenhuma referência em CSS ou JS
- Classe `vagas-counter__block--current` — não tinha nenhuma regra CSS associada (inerte)
- `obrigado.html` removido do `sitemap.xml` — página é `noindex`, não deveria estar listada para indexação

### Alterado (otimização, sem mudança visual)
- Consolidadas 7 regras `:focus-visible` idênticas (`.modal-pix__close`, `.modal-video__close`, `.quantity-btn`, `.testimonials-nav`, `.sponsor-logo`, `.faq-item__question`, `.footer__link`) em uma única declaração — eliminação de CSS duplicado
- `index.html` e `obrigado.html` agora carregam `style.min.css` e `script.min.js` em vez das versões legíveis (arquivos `.min` regenerados a partir da fonte atual)
- `vercel.json`: cache estendido para imagens (`jpg/jpeg/png/webp/gif/ico`) e `manifest.json`; adicionados headers de segurança (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)

### Adicionado (SEO, sem mudança visual)
- Schema.org `Event` (JSON-LD) no `<head>` de `index.html`, com data, local, organizador e ofertas de ingresso — habilita Rich Results do Google
- `<link rel="canonical">` em `obrigado.html`

### Documentação
- [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md), [CHECKLIST-TESTES.md](CHECKLIST-TESTES.md) e [CHECKLIST-ROLLBACK.md](CHECKLIST-ROLLBACK.md) criados
- Este CHANGELOG criado
- README.md atualizado com o status de versão

---

## [Anterior ao RC-1] — desenvolvimento

Histórico funcional das etapas anteriores à auditoria de produção (sem tags de versão formais):

- Criação da Landing Page (estrutura completa: hero, o que você vai aprender, ingressos, vagas, formas de pagamento, FAQ, grupo do WhatsApp, rodapé), com objeto `CONFIG` central em `script.js`
- Revisão completa de produção (performance, SEO, acessibilidade, responsividade, meta tags, Open Graph, favicon, robots.txt, sitemap.xml, manifest.json) — correções de acessibilidade no modal PIX (foco, ESC, clique fora, `focus trap`) e lazy loading do QR Code
- Adição da seção "Menu da Experiência" (cardápio por categoria, com placeholder de imagem por proteína)
- Remoção de referências a "Material de Apoio"/apostila/download em toda a landing
- Adição da seção "Quem Já Viveu Essa Experiência" (carrossel de depoimentos em vídeo, modal com YouTube Embed sem autoplay, objeto `TESTIMONIALS`) e da seção "Patrocinadores" (objeto `PATROCINADORES`, com blocos de Realização/Master/Patrocinadores/Apoiadores gerados dinamicamente)
