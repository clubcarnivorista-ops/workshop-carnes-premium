# Pasta assets/

Esta pasta guarda as imagens reais do projeto. Está organizada em subpastas por finalidade — quando for adicionar uma imagem nova, procure a subpasta correspondente antes de criar uma nova.

## Estrutura

```
assets/
├── pix-qrcode.png      → QR Code PIX oficial, em uso (raiz de assets/, não tem subpasta própria)
├── og-image.jpg          → imagem de compartilhamento (raiz de assets/)
├── proteins/                → fotos dos cortes/proteínas do menu da experiência (em uso)
├── videos/                     → miniaturas dos depoimentos em vídeo (TESTIMONIALS)
├── feedbacks/                    → prints/capturas de depoimentos de texto (WhatsApp, redes sociais)
├── patrocinadores/                  → logomarcas de patrocinadores e apoiadores (PATROCINADORES)
├── logos/                              → identidade visual institucional (logo do Clube Carnivorista, variações de marca)
├── social/                                → artes para redes sociais (posts, stories) — diferente do og-image.jpg único
└── certificados/                            → modelo/arte do certificado digital enviado após o evento
```

## Arquivos esperados

| Arquivo | Usado em | Tamanho recomendado | Formato |
|---|---|---|---|
| `pix-qrcode.png` | Modal de pagamento PIX (`CONFIG.pixQRCode`) — **em uso**, gerado a partir do código em `CONFIG.pixCopiaECola` (ver [README.md](../README.md#como-trocar-o-qr-code-pix)) | 610×610px | PNG, fundo branco |
| `og-image.jpg` | Preview ao compartilhar o link (WhatsApp, Instagram, Facebook, Twitter) | 1200×630px | JPG, até 300KB |
| `proteins/*.webp` | Foto de cada corte na seção "Menu da Experiência" (`.menu-protein-item__media img`) — em uso: `picanha-reserva.webp`, `entrecot-defumado.webp`, `chuck-eye-steak.webp`, `entranha-gorgonzola.webp`, `fraldinha-crosta-alho.webp` | 160×160px (quadrado) | WEBP, até 10KB |
| `videos/*.jpg` (ex: `videos/fernando.jpg`) | Miniatura de cada card de depoimento (`TESTIMONIALS[].thumb` em `script.js`) | 640×360px (16:9) | JPG, até 150KB |
| `feedbacks/*.jpg` | Prints de depoimentos em texto (WhatsApp, Instagram) — seção futura, ainda não implementada na landing | 800px de largura | JPG, até 150KB |
| `patrocinadores/*.png` | Logomarcas de realização, patrocinador master, patrocinadores e apoiadores (`PATROCINADORES` em `script.js`) | Altura mínima 200px, fundo transparente | PNG transparente |
| `logos/*.png` | Logo oficial do Clube Carnivorista e variações (ex: versão horizontal, versão ícone) — ainda não usada na landing atual, reservada para evolução da marca | Altura mínima 400px, fundo transparente | PNG transparente |
| `social/*.jpg` | Artes de divulgação para Instagram/WhatsApp Status — não usadas pela landing, é um repositório de apoio para o time de marketing | 1080×1080px ou 1080×1920px | JPG |
| `certificados/*` | Modelo do certificado digital enviado por e-mail após o workshop (fora do fluxo automático da landing) | A4 ou 1200×900px | PNG/PDF |

Sem `videos/*.jpg` ou `og-image.jpg`, a página continua funcionando normalmente — só falta o visual (miniaturas aparecem quebradas até a imagem existir). Os blocos de Patrocinador Master, Patrocinadores e Apoiadores ficam **escondidos automaticamente** enquanto não houver logo cadastrado (ver [CONFIG.md](../CONFIG.md#patrocinadores--patrocinadores)), então não aparece nada quebrado nessa seção.

`feedbacks/`, `logos/`, `social/` e `certificados/` são pastas **preparadas para uso futuro** — nenhum código da landing lê arquivos delas hoje. Elas existem para que o material já tenha um lugar certo para ir assim que for produzido, em vez de ficar solto fora do projeto.

Veja o passo a passo para gerar e otimizar essas imagens no [README.md](../README.md#como-trocar-o-qr-code-pix) principal.
