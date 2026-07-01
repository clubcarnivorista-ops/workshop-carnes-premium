# Changelog — Workshop de Carnes Premium

Todas as mudanças relevantes da Landing Page são registradas aqui. Formato livre inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/).

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
