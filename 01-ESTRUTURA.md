# 01 — ESTRUTURA

Mapa completo de todas as pastas e arquivos do projeto, e para que serve cada um.

## Pastas

```
workshop-carnes-premium/
├── assets/
│   ├── proteins/          → fotos dos cortes exibidas na seção "Menu da Experiência" (em uso: 5 arquivos .webp)
│   ├── videos/             → miniaturas dos depoimentos em vídeo, usadas pelo array TESTIMONIALS em script.js
│   ├── feedbacks/           → prints de depoimentos em texto (WhatsApp, Instagram) — pasta preparada, sem uso ainda
│   ├── patrocinadores/       → logomarcas de patrocinadores/apoiadores, usadas pelo objeto PATROCINADORES em script.js
│   ├── logos/                 → identidade visual institucional do Clube Carnivorista — pasta preparada, sem uso ainda
│   ├── social/                  → artes para redes sociais (posts, stories) — pasta preparada, sem uso ainda
│   └── certificados/              → modelo do certificado digital enviado após o evento — pasta preparada, sem uso ainda
├── tools/
│   └── minify.py                    → script Python que gera style.min.css e script.min.js a partir dos arquivos-fonte
└── .claude/                           → configuração do preview local (não faz parte do site publicado, está no .gitignore)
```

`assets/` também guarda dois arquivos soltos (sem subpasta própria): `pix-qrcode.png` (QR Code PIX oficial) e, quando existir, `og-image.jpg` (imagem de compartilhamento). Ver [assets/README.md](assets/README.md) para o detalhe de cada arquivo esperado em cada subpasta.

## Páginas (HTML)

| Arquivo | O que é |
|---|---|
| `index.html` | Página principal — a landing page em si |
| `obrigado.html` | Página de confirmação, para onde o cliente pode ser redirecionado após o pagamento |
| `404.html` | Página de erro personalizada (link quebrado/URL inexistente) |
| `privacidade.html` | Política de Privacidade |
| `lgpd.html` | Página sobre LGPD |
| `termos.html` | Termos de Uso |
| `cancelamento.html` | Política de Cancelamento |
| `reembolso.html` | Política de Reembolso |
| `cookies.html` | Uso de Cookies |

As 6 últimas são páginas institucionais com conteúdo ainda em preparação (placeholder honesto, não texto jurídico definitivo) — ver [CHANGELOG.md](CHANGELOG.md) versão 1.0.0.

## Código (editar sempre a versão legível, nunca o `.min`)

| Arquivo | O que é |
|---|---|
| `script.js` | Toda a lógica do site + os objetos `CONFIG`, `TESTIMONIALS` e `PATROCINADORES` — **fonte de verdade**, editar aqui |
| `script.min.js` | Versão minificada, gerada a partir de `script.js` — carregada pelo site em produção, nunca editar direto |
| `style.css` | Estilos — **fonte de verdade**, editar aqui |
| `style.min.css` | Versão minificada, gerada a partir de `style.css` — carregada pelo site em produção, nunca editar direto |

## Ícones e identidade visual

`favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png` — conjunto completo de ícones para navegadores, iOS, Android e PWA.

## Configuração de infraestrutura

| Arquivo | O que é |
|---|---|
| `vercel.json` | Configuração de deploy, cache e cabeçalhos de segurança na Vercel |
| `manifest.json` | Metadados para instalação do site como app (PWA) |
| `robots.txt` | Instruções para buscadores (Google, etc.) |
| `sitemap.xml` | Mapa do site para indexação |
| `.gitignore` | Arquivos que não fazem parte do repositório (`.claude/`, arquivos de sistema operacional) |

## Documentação

Todos os `.md` da raiz do projeto. Ver [00-INICIO.md](00-INICIO.md) para a lista completa com a ordem de leitura recomendada.
