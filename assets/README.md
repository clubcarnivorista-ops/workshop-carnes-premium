# Pasta assets/

Esta pasta guarda as imagens reais do projeto. Está organizada em subpastas por finalidade — quando for adicionar uma imagem nova, procure a subpasta correspondente antes de criar uma nova.

## Estrutura

```
assets/
├── pix-qrcode.png      → QR Code PIX oficial, em uso (raiz de assets/, não tem subpasta própria)
├── og-image.jpg          → imagem de compartilhamento (raiz de assets/)
├── proteins/                → fotos dos cortes/proteínas do menu da experiência (em uso)
├── videos/                     → miniaturas customizadas dos vídeos (opcional — sem uso hoje, thumb vem do YouTube)
├── feedbacks/                    → prints/capturas de depoimentos de texto (WhatsApp, redes sociais)
├── patrocinadores/                  → logomarcas de parceiros e patrocinadores (CONFIG.parceiros)
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
| `videos/*.jpg` (opcional) | Miniatura customizada de um vídeo (`item.thumb` em `VIDEO_MENTOR`/`VIDEOS_RECONHECIMENTO`/`VIDEOS_DEPOIMENTOS`, `script.js`). **Não é obrigatório**: se `thumb` ficar vazio, a miniatura é buscada automaticamente do próprio YouTube (`img.youtube.com/vi/ID/hqdefault.jpg`) — hoje nenhum vídeo cadastrado usa arquivo local | 640×360px (16:9) | JPG, até 150KB |
| `feedbacks/*.jpg` | Prints de depoimentos em texto (WhatsApp, Instagram) — seção futura, ainda não implementada na landing | 800px de largura | JPG, até 150KB |
| `patrocinadores/*` | Logomarcas de `CONFIG.realizacao` e das tiers de `CONFIG.parceiros` (`script.js`). Em uso hoje: `chopp-faroeste3.jpg` (Faroeste Beer Co.) e `carvao-superfogo.webp.png` (Carvão Super-Fogo), ambos em "Parceiros Oficiais". `chopp-faroeste1.jpg`, `2.jpg` e `4.jpg` são versões alternativas da mesma marca, mantidas na pasta mas **não cadastradas** (ver [CHANGELOG.md](../CHANGELOG.md) v1.0.7 para o motivo da escolha) | Altura mínima 200px, fundo transparente (ideal) | PNG transparente (ideal) — JPG com fundo sólido também funciona, mas o ideal é fundo escuro ou transparente para combinar com o `section--dark` |
| `logos/*.png` | Logo oficial do Clube Carnivorista e variações (ex: versão horizontal, versão ícone) — ainda não usada na landing atual, reservada para evolução da marca | Altura mínima 400px, fundo transparente | PNG transparente |
| `social/*.jpg` | Artes de divulgação para Instagram/WhatsApp Status — não usadas pela landing, é um repositório de apoio para o time de marketing | 1080×1080px ou 1080×1920px | JPG |
| `certificados/*` | Modelo do certificado digital enviado por e-mail após o workshop (fora do fluxo automático da landing) | A4 ou 1200×900px | PNG/PDF |

Sem `og-image.jpg`, a página continua funcionando normalmente — só falta o visual do preview de compartilhamento. As miniaturas dos vídeos **não dependem de nenhum arquivo em `videos/`** — vêm do próprio YouTube automaticamente, então nunca aparecem quebradas. Cada tier de `CONFIG.parceiros` (Patrocinador Master, Patrocinadores Ouro, Patrocinadores Prata, Parceiros Oficiais, Apoio) fica **escondida automaticamente** enquanto não tiver nenhum item cadastrado (ver [CONFIG.md](../CONFIG.md#patrocinadores--configrealizacao-e-configparceiros)), então não aparece nada quebrado nessa seção também.

`feedbacks/`, `logos/`, `social/` e `certificados/` são pastas **preparadas para uso futuro** — nenhum código da landing lê arquivos delas hoje. Elas existem para que o material já tenha um lugar certo para ir assim que for produzido, em vez de ficar solto fora do projeto.

Veja o passo a passo para gerar e otimizar essas imagens no [README.md](../README.md#como-trocar-o-qr-code-pix) principal.
