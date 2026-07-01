# Checklist de Lançamento — Abertura Oficial das Vendas

Este checklist é diferente do [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md) (que cobre a parte técnica de cada deploy). Aqui o foco é **marketing e conversão**: confirmar que está tudo pronto para abrir as vendas oficialmente e começar a rodar tráfego pago/orgânico. Rode isso uma vez, no dia do lançamento, depois que o checklist técnico já estiver 100%.

## 1. Rastreamento ativo

- [ ] Meta Pixel descomentado em `index.html` com o ID real preenchido (ver `CONFIG.md` / comentário no `<head>`)
- [ ] Google Analytics 4 descomentado com o Measurement ID real
- [ ] Google Ads Tag descomentado com o Conversion ID real (se for rodar campanhas no Google Ads)
- [ ] Microsoft Clarity descomentado com o Project ID real (se for usar)
- [ ] Testado no **Meta Pixel Helper** (extensão do Chrome) que o Pixel dispara `PageView` ao carregar a página
- [ ] Testado no **Tag Assistant** (Google) que o GA4 dispara `page_view`
- [ ] Verificado no painel do Clarity que a sessão de teste aparece (pode levar alguns minutos)

## 2. Eventos de conversão

Clicar em cada CTA abaixo e confirmar no painel de cada plataforma (ou na aba Network do navegador, filtrando por `facebook`/`google-analytics`/`clarity`) que o evento dispara:

- [ ] Botão "Garantir Minha Vaga" (navbar, hero e flutuante) → evento `cta_comprar`
- [ ] Botão "Entrar no Grupo do Evento" → evento `cta_entrar_grupo`
- [ ] Link de WhatsApp do rodapé → evento `cta_whatsapp`
- [ ] Botão "Pagar via PIX" → evento `cta_pix`
- [ ] Botão "Pagar com Cartão" (Mercado Pago) → evento `cta_mercado_pago`
- [ ] Botão "Enviar comprovante" (dentro do modal PIX) → evento `cta_whatsapp`

> Esses eventos são gerados automaticamente por qualquer elemento com `data-track-event="..."` no HTML — ver comentário no topo de `setupConversionTracking()` em `script.js` se precisar adicionar um novo CTA rastreado no futuro.

## 3. Configuração de conversão nas plataformas de anúncio

- [ ] No Meta Ads Manager, evento customizado `cta_comprar` (ou `cta_pix`/`cta_mercado_pago`, conforme a estratégia) configurado como conversão da campanha
- [ ] No Google Ads, conversão vinculada ao evento `gtag` correspondente
- [ ] Público de remarketing criado (quem visitou mas não converteu) — opcional, mas recomendado

## 4. Conteúdo e preço definitivos

- [ ] Preços dos ingressos (`CONFIG.pixMaleValue` / `pixFemaleValue`) são os valores finais de venda — **não são valores de teste**
- [ ] Data, horário e vagas (`CONFIG.dataEvento`, `horarioRecepcao`, `horarioWorkshop`, `vagasAtuais`, `vagasMax`) conferidos
- [ ] Link de pagamento com cartão (Mercado Pago) é o **link de produção**, não um link de teste/sandbox
- [ ] Chave PIX é a chave real (não uma chave de testes)

## 5. Prova real de pagamento (fazer uma compra de teste com dinheiro real de baixo valor, se possível)

- [ ] Uma compra via PIX foi concluída de ponta a ponta (escaneou o QR real, o comprovante chegou no WhatsApp configurado)
- [ ] Uma compra via Cartão/Mercado Pago foi concluída de ponta a ponta
- [ ] O comprovante/confirmação de compra chega para quem gerencia as inscrições

## 6. Canais e identidade

- [ ] Link do grupo oficial do WhatsApp testado e com vagas disponíveis
- [ ] Instagram e Google Maps configurados com os links reais
- [ ] Favicon completo aparece corretamente: aba do navegador (Chrome/Firefox/Edge/Safari), atalho salvo na tela inicial do Android e do iPhone
- [ ] Página 404 (`404.html`) testada acessando uma URL inexistente do domínio de produção — deve aparecer a página personalizada, não um erro genérico da hospedagem

## 7. SEO e compartilhamento

- [ ] Link colado no WhatsApp mostra imagem, título e descrição corretos
- [ ] Rich Results Test do Google reconhece o Schema.org Event sem erros
- [ ] `sitemap.xml` enviado ao Google Search Console

## 8. Suporte durante o lançamento

- [ ] Definido quem responde as mensagens do grupo/WhatsApp no dia do lançamento
- [ ] Definido quem monitora se o site continua no ar durante o pico de tráfego (compartilhar o link em campanha costuma gerar picos)
- [ ] [CHECKLIST-ROLLBACK.md](CHECKLIST-ROLLBACK.md) revisado — se algo quebrar durante a campanha, todos sabem o que fazer

## 9. Pós-lançamento (primeiras 24h)

- [ ] Conferir no GA4/Meta se o tráfego da campanha está chegando e convertendo
- [ ] Conferir `CONFIG.vagasAtuais` e atualizar conforme as vendas reais entrarem
- [ ] Registrar no [CHANGELOG.md](CHANGELOG.md) a data oficial de lançamento
