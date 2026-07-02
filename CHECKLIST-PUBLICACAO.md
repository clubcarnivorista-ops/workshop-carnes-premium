# Checklist de Publicação — Workshop de Carnes Premium

Use esta lista, em ordem, toda vez que for publicar a Landing em produção (primeira publicação ou uma atualização futura).

## 1. Conteúdo e configuração (`script.js`)

- [ ] `CONFIG.checkoutMercadoPago` preenchido com o link real do Mercado Pago
- [ ] `CONFIG.pixKey`, `CONFIG.pixKeyType`, `CONFIG.pixName` e `CONFIG.pixCopiaECola` preenchidos com dados reais
- [ ] `CONFIG.whatsappContact` e `CONFIG.whatsappGroup` preenchidos
- [ ] `CONFIG.instagram`, `CONFIG.youtube` e `CONFIG.maps` preenchidos
- [ ] `CONFIG.telefone`, `CONFIG.email` e `CONFIG.endereco` preenchidos
- [ ] `CONFIG.vagasAtuais` / `CONFIG.vagasMax` refletem o número real de inscritos
- [ ] `CONFIG.dataEvento`, `horarioRecepcao`, `horarioWorkshop` conferidos
- [ ] `TESTIMONIALS[].youtubeId` preenchido para cada depoimento que deve ficar ativo
- [ ] `PATROCINADORES` (master, patrocinadores, apoiadores) preenchido conforme fechamentos comerciais
- [ ] **Se qualquer um dos itens acima mudou a data, horário, preço, telefone, e-mail ou redes sociais**, atualizar também os blocos Schema.org (`Event`, `Organization`, `LocalBusiness`) no `<head>` de `index.html` — ver comentário `IMPORTANTE` acima de cada bloco

## 2. Imagens (`assets/`)

- [ ] `assets/pix-qrcode.png` gerado a partir de `CONFIG.pixCopiaECola` (os dois precisam representar o mesmo pagamento — ver [README.md](README.md#como-trocar-o-qr-code-pix))
- [ ] QR Code testado: escaneado com o app de um banco real e/ou decodificado programaticamente, confirmando que bate com `CONFIG.pixCopiaECola`
- [ ] `assets/og-image.jpg` (1200×630px, até 300KB) — preview do link no WhatsApp/Instagram/Facebook
- [ ] `assets/videos/*.jpg` — uma miniatura por depoimento cadastrado em `TESTIMONIALS`
- [ ] `assets/patrocinadores/*.png` — logos de realização/master/patrocinadores/apoiadores cadastrados
- [ ] Todas as imagens comprimidas (ver [assets/README.md](assets/README.md))

## 3. URLs finais

- [ ] `<link rel="canonical">` em `index.html` e `obrigado.html` apontam para a URL real de produção
- [ ] Tags `og:url`, `og:image`, `twitter:image` em `index.html` apontam para a URL real
- [ ] `robots.txt` e `sitemap.xml` apontam para o domínio real (troque `workshop-carnes-premium.vercel.app` se o domínio final for outro)
- [ ] URLs de `offers[].url` no Schema.org Event conferidas

## 4. Build (arquivos minificados)

- [ ] `style.css` e `script.js` editados são a fonte da verdade — **nunca edite `style.min.css`/`script.min.js` diretamente**
- [ ] Depois de qualquer alteração em `style.css` ou `script.js`, regenere os `.min`:
  ```bash
  python tools/minify.py css style.css style.min.css
  python tools/minify.py js script.js script.min.js
  ```
- [ ] `index.html` e `obrigado.html` carregam `style.min.css` e `script.min.js` (não as versões não-minificadas)

## 5. Pixels / Analytics (opcional)

- [ ] Se for usar Google Analytics, Meta Pixel ou Google Ads, descomente o bloco correspondente no `<head>` de `index.html` e preencha o ID
- [ ] Testado que o pixel dispara (aba Network do navegador) antes de publicar

## 6. Deploy

- [ ] `git add . && git commit -m "..." && git push` — a Vercel publica automaticamente
- [ ] Aguardar o deploy finalizar no painel da Vercel (30–60s)
- [ ] Abrir a URL de produção e conferir que carregou (não a preview/staging)

## 7. Verificação pós-deploy (smoke test)

- [ ] Console do navegador sem erros (F12 → Console)
- [ ] Seletor de quantidade de ingressos funciona e atualiza o resumo da compra
- [ ] Modal do PIX abre, mostra QR Code (renderizado e legível), favorecido, tipo da chave, chave e valor corretos
- [ ] Botão "Copiar Chave PIX" copia a chave sem pontuação e mostra "Chave PIX copiada."
- [ ] Botão "Copiar PIX Copia e Cola" copia o código completo e mostra "PIX copiado com sucesso."
- [ ] Botão "Pagar com Cartão" leva ao link correto do Mercado Pago
- [ ] Pelo menos um depoimento em vídeo abre corretamente no modal
- [ ] Links de WhatsApp, Instagram, YouTube e Google Maps no rodapé abrem corretamente
- [ ] Telefone e e-mail do rodapé abrem `tel:`/`mailto:` corretamente
- [ ] Os 6 links institucionais do rodapé (privacidade, LGPD, termos, cancelamento, reembolso, cookies) abrem sem erro 404
- [ ] FAQ expande/recolhe
- [ ] Favicon aparece na aba do navegador
- [ ] Testar o preview de compartilhamento colando o link real no WhatsApp (deve mostrar imagem, título e descrição)
- [ ] Rodar o [Rich Results Test do Google](https://search.google.com/test/rich-results) na URL de produção e confirmar que os Schema.org (Event, Organization, LocalBusiness, BreadcrumbList) são reconhecidos sem erros
- [ ] Rodar [securityheaders.com](https://securityheaders.com) na URL de produção e confirmar nota A ou superior (ver [SECURITY.md](SECURITY.md))

## 8. SEO pós-publicação

- [ ] Enviar `sitemap.xml` no Google Search Console
- [ ] Solicitar indexação da URL principal no Search Console
- [ ] Conferir `robots.txt` acessível em `/robots.txt`

## 9. Comunicação

- [ ] Avisar o cliente/responsável que a Landing está no ar
- [ ] Guardar o link do deployment na Vercel (necessário para rollback — ver [CHECKLIST-ROLLBACK.md](CHECKLIST-ROLLBACK.md))
