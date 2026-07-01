# Pasta assets/

Esta pasta guarda as imagens reais do projeto, que ainda não foram adicionadas (o repositório usa apenas emoji e ícones SVG inline até aqui).

## Arquivos esperados

| Arquivo | Usado em | Tamanho recomendado | Formato |
|---|---|---|---|
| `pix-qrcode.png` | Modal de pagamento PIX (`CONFIG.pixQRCode`) | 400×400px | PNG, fundo branco |
| `og-image.jpg` | Preview ao compartilhar o link (WhatsApp, Instagram, Facebook, Twitter) | 1200×630px | JPG, até 300KB |
| `videos/*.jpg` (ex: `videos/fernando.jpg`) | Miniatura de cada card de depoimento (`TESTIMONIALS[].thumb` em `script.js`) | 640×360px (16:9) | JPG, até 150KB |
| `sponsors/*.png` | Logomarcas de realização, patrocinador master, patrocinadores e apoiadores (`PATROCINADORES` em `script.js`) | Altura mínima 200px, fundo transparente | PNG transparente |

Sem esses arquivos, o QR Code e as miniaturas de depoimento aparecem quebrados, e a página continua funcionando normalmente — só falta o visual. Já os blocos de Patrocinador Master, Patrocinadores e Apoiadores ficam **escondidos automaticamente** enquanto não houver logo cadastrado (ver [CONFIG.md](../CONFIG.md#patrocinadores--patrocinadores)), então não aparece nada quebrado nessa seção.

Veja o passo a passo para gerar e otimizar essas imagens no [README.md](../README.md#como-trocar-o-qr-code-pix) principal.
