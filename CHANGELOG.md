# Changelog — Workshop de Carnes Premium

Todas as mudanças relevantes da Landing Page são registradas aqui. Formato livre inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/).

## [1.0.7] — Primeiros parceiros oficiais na seção Patrocinadores — 2026-07-02

Cadastro dos dois primeiros parceiros do Clube Carnivorista (Faroeste Beer Co. e Super Fogo), vindos de permuta, e reestruturação de `PATROCINADORES` para um modelo por categorias que já aceita as tiers futuras (Patrocinador Master, Ouro, Prata) sem precisar tocar em `index.html` de novo.

### Adicionado
- `PATROCINADORES.categorias` (`script.js`): array de categorias (`id`, `label`, `itens`), substituindo as chaves fixas `master`/`patrocinadores`/`apoiadores`. Uma categoria só gera bloco na página quando `itens.length > 0`
- Categoria **Parceiros Oficiais**, com os dois primeiros parceiros cadastrados
- Três categorias reservadas para o futuro, hoje vazias: **Patrocinador Master**, **Patrocinadores Ouro**, **Patrocinadores Prata**
- Campo `descricao` (opcional) por item — some no tooltip da logomarca junto com o nome
- `<div id="sponsorsCategorias">` em `index.html`, substituindo os três blocos fixos (`sponsorsMasterBlock`, `sponsorsListBlock`, `sponsorsApoiadoresBlock`) que exigiam HTML novo para cada tier

### Alterado
- `setupPatrocinadores()` (`script.js`) reescrita para renderizar dinamicamente uma categoria por vez, a partir de `PATROCINADORES.categorias`
- `buildSponsorLink()`: agora trata `'#'` como "sem link" (não só string vazia) — evita logomarca virar um link morto (`href="#"`) quando Instagram/site ainda não foram informados
- `.sponsors-grid` (`style.css`): trocado de grid fixo (4/3/2 colunas por breakpoint) para flexbox centralizado, com quebra de linha automática — com poucos itens (como hoje, só 2), a grade fica centralizada em vez de "grudada" à esquerda numa grade de 4 colunas vazias. Simplifica também as duas media queries que só existiam para ajustar esse número de colunas
- `.sponsor-logo:hover` ganhou um leve `translateY(-2px)`, além da troca de tom (cinza → cor), para reforçar o destaque no hover sem exagero

### Escolha da logomarca do Chopp (Faroeste Beer Co.)
Existiam 4 versões da mesma logomarca em `assets/patrocinadores/` (`chopp-faroeste1.jpg` a `chopp-faroeste4.jpg`). Escolhida: **`chopp-faroeste3.jpg`** (letras creme sobre fundo verde sólido). Motivo: a grade de patrocinadores aplica `grayscale(1)` + `opacity: 0.7` na logomarca em repouso (mesmo tratamento já usado antes desta versão) — nas versões 1 e 2 (fundo branco) e 4 (fundo creme), esse filtro gera um retângulo claro/branco que destoa do fundo escuro da Landing. A versão 3, por ter fundo verde escuro, vira um retângulo em tom de cinza médio depois do filtro — integra muito melhor ao `section--dark` — e ainda mantém boa leitura (texto creme sobre verde tem contraste interno mais alto que texto escuro sobre fundo claro depois do filtro). No hover (cor real), o verde e o creme também combinam bem com a paleta dourada/escura do site. As outras 3 versões permanecem na pasta como alternativa, não cadastradas.

### Pendências (registradas no `CONFIG`, usando `'#'`)
- **Faroeste Beer Co.**: Instagram e site ainda não informados
- **Super Fogo**: Instagram e site ainda não informados

### Observação sobre a logomarca do Super Fogo
O único arquivo disponível (`carvao-superfogo.webp.png`) está em formato retrato (quase quadrado/vertical), bem diferente do formato paisagem da Faroeste. Dentro da grade (altura fixa de 70px), isso faz a logomarca do Super Fogo renderizar visivelmente menor/mais estreita que a da Faroeste. Não havia versão alternativa para escolher (só existe 1 arquivo), então mantivemos como está — recomendação registrada no relatório final para pedir uma versão horizontal ou com mais respiro nas laterais, se possível.

### Verificado
- Desktop, tablet (768px) e mobile (375px): sem overflow horizontal, os 2 parceiros centralizados lado a lado
- Console sem erros
- Logomarcas sem `instagram`/`site`/`link` reais renderizam como `<div>` (não como `<a href="#">`) — nenhum link morto exposto ao visitante
- Bloco "Realização" (Clube Carnivorista) e o restante da Landing (CTAs, contador de vagas, carrinho, modal PIX) testados novamente após a mudança — nenhuma regressão
- SEO não alterado (nenhuma mudança em `<head>`, `robots.txt` ou `sitemap.xml`)

### Documentação
- `README.md`: seção "Como adicionar vídeos, parceiros e patrocinadores" atualizada para o modelo de categorias
- `CONFIG.md`: seção "Patrocinadores" reescrita para `PATROCINADORES.categorias`
- `04-HISTORICO.md`: versão atual atualizada para v1.0.7

### Ajustado (mesmo dia, refinamento da estrutura — ainda v1.0.7)
Depois do primeiro cadastro, a estrutura foi ajustada para bater exatamente com o padrão pedido de exibição: **Patrocinador Master → Parceiros Oficiais → Apoio** (com Ouro e Prata reservadas entre Master e Parceiros Oficiais).

- `PATROCINADORES` (objeto separado) foi eliminado — `realizacao` e `parceiros` migraram para dentro do próprio `CONFIG`, reforçando a fonte única de verdade
- `CONFIG.parceiros` passou de um array de categorias (`categorias: [{ id, label, itens }]`) para um objeto com uma chave por tier (`master`, `ouro`, `prata`, `oficiais`, `apoio` — cada uma um array de itens), mais próximo do "exemplo lógico" pedido (`CONFIG.parceiros.master`, `.oficiais`, `.apoio`)
- Nova tier **`apoio`** (rótulo "Apoio"), reservada e vazia — junta-se a `master`, `ouro` e `prata` como tiers hoje sem itens
- `CATEGORIAS_PARCEIROS` (`script.js`, logo abaixo do `CONFIG`): define a ordem fixa de exibição (Master → Ouro → Prata → Parceiros Oficiais → Apoio) e o rótulo de cada tier — criar uma tier nova é uma chave em `CONFIG.parceiros` + uma linha aqui, nenhum HTML
- `setupPatrocinadores()` reescrita para iterar `CATEGORIAS_PARCEIROS` e ler `CONFIG.parceiros[chave]`, em vez de `PATROCINADORES.categorias`
- `.sponsor-logo:hover` trocado de `translateY(-2px)` para `scale(1.05)` — "leve aumento de escala", conforme especificado, sem alterar tipografia nem cores da Landing
- `window.WORKSHOP_PATROCINADORES` removido (redundante — tudo já está em `window.WORKSHOP_CONFIG`)

### Verificado (rodada adicional)
- Overflow horizontal checado em 320px, 375px, 390px, 768px, 1024px e 1440px — nenhum
- Console sem erros após a migração
- Só "Realização" e "Parceiros Oficiais" renderizam hoje (Master/Ouro/Prata/Apoio vazios corretamente ocultos, sem título "fantasma")
- Regra de hover confirmada via inspeção do CSS computado: `scale(1.05)` no contêiner + revelação de cor na imagem
- Logomarcas seguem sem `href` quando Instagram/site são `'#'`, com `loading="lazy"` mantido
- Restante da Landing (CTAs, WhatsApp, vagas, bloco Realização) sem regressão

### Documentação (rodada adicional)
- `CONFIG.md`: seção "Patrocinadores" reescrita para `CONFIG.realizacao`/`CONFIG.parceiros`/`CATEGORIAS_PARCEIROS`
- `README.md`: referências a `PATROCINADORES` trocadas por `CONFIG.parceiros`, ordem de exibição documentada
- `assets/README.md`: referências e âncora de link atualizadas

---

## [1.0.6] — Página de Link in Bio (`links.html`) — 2026-07-02

Nova página `links.html`, para uso no link da bio do Instagram, com os 5 links oficiais do Clube Carnivorista. A Landing (`index.html`) não foi alterada — continua funcionando exatamente como estava na v1.0.5.

### Adicionado
- `links.html`: página própria, HTML/CSS/JS puros (sem biblioteca externa), reaproveitando `style.min.css` e `script.min.js` já existentes — nenhuma duplicação de CSS/JS
- Logotipo em texto ("Clube Carnivorista", com o mesmo gradiente dourado do `hero__title`) + descrição "A arte da carne elevada ao próximo nível." — como não existe ainda um arquivo de logo em `assets/logos/` (pasta reservada para uso futuro), optamos por wordmark em texto em vez de inventar um caminho de imagem inexistente
- 5 botões, na ordem pedida: **Garanta sua vaga** (botão principal, maior, dourado) → **Calculadora de Carnes** → **Grupo Oficial WhatsApp** → **Canal do YouTube** → **Instagram Oficial**
- `CONFIG.links` (`script.js`): centraliza os dois destinos exclusivos desta página (`garantirVaga`, `calculadora`). Os outros três botões reaproveitam `CONFIG.whatsappGroup`, `CONFIG.youtube` e `CONFIG.instagram` — já existentes, sem duplicar o mesmo link em dois lugares
- `setupLinksPage()` (`script.js`): preenche os 5 `href` a partir do `CONFIG`, seguindo o mesmo padrão defensivo (`if (el)`) já usado em `setupLinks()` — nenhum link fica hardcoded no HTML
- Classes `.links`, `.links__content`, `.links__logo`, `.links__tagline`, `.links__list`, `.links__btn`, `.links__btn--primary`, `.links__icon`, `.links__footer` em `style.css`, reaproveitando variáveis (`--black`, `--gold`, `--font-display`, `--font-body`, `--radius`, `--transition`) e a classe `.reveal` já existentes — nenhuma cor ou fonte nova
- SEO completo: título "Clube Carnivorista \| Links Oficiais", meta description própria, canonical, Open Graph, Twitter Card, `robots: index, follow`
- Nova entrada em `sitemap.xml` para `links.html`

### Verificado
- Desktop, tablet (768px) e mobile (375px): sem overflow horizontal, botões e conteúdo centralizados, sem quebra de layout
- Todos os 5 `href` resolvidos corretamente a partir do `CONFIG` (nenhum aponta para `#`)
- Console sem erros em `links.html`
- `index.html` (Landing) recarregada após a mudança: CTAs, contador de vagas e links do rodapé continuam funcionando normalmente — nenhuma regressão
- Contraste AA: texto branco/dourado sobre fundo escuro reaproveita as mesmas combinações já usadas (e testadas) no resto do site
- Foco visível (`:focus-visible`) e `aria-label` em todos os 5 botões

### Documentação
- `README.md`: nova seção "Página de Link in Bio (`links.html`)", estrutura do projeto atualizada
- `CONFIG.md`: `links.garantirVaga` e `links.calculadora` documentados
- `04-HISTORICO.md`: versão atual atualizada para v1.0.6

### Ajustado (mesmo dia, após feedback visual)
- Botões de `links.html` receberam acabamento "liquid glass" (vidro fosco, translúcido, com `backdrop-filter: blur()`), no estilo usado pela Apple — fundo semitransparente, brilho sutil no topo do botão, borda clara fina, sombra interna e externa. Botão principal ("Garanta sua vaga") mantém o dourado, agora com o mesmo tratamento de vidro
- Fundo da página ganhou um terceiro gradiente radial (leve toque de vermelho escuro ao centro) para dar mais profundidade por trás do efeito de vidro
- Nenhuma mudança de estrutura HTML ou de `CONFIG` — só CSS

---

## [1.0.5] — Seção "Conheça a Experiência" — 2026-07-02

Nova seção com player de vídeo em destaque, entre "Menu da Experiência" e "Quem Já Viveu Essa Experiência". Nenhuma alteração no carrinho, modal PIX, botão Mercado Pago, SEO ou responsividade das seções existentes.

### Adicionado
- Nova seção `#experiencia` ("Veja como será a experiência"), com o mesmo tratamento visual das demais seções (eyebrow, título, subtítulo, `reveal` no scroll)
- `CONFIG.videoExperienciaId` (`script.js`): ID do vídeo do YouTube. Enquanto vazio, a seção mostra um placeholder com o botão de assistir desabilitado — sem thumbnail quebrada, sem erro no console
- `setupExperienciaVideo()`: mesmo padrão de carregamento sob demanda já usado nos depoimentos — a miniatura (buscada direto do YouTube, sem asset próprio) é a única coisa carregada até o clique; o `<iframe>` só é criado quando o visitante clica em assistir, sem autoplay, sem abrir nova aba, com `rel=0` para reduzir vídeos relacionados de outros canais ao final
- Botão "Quero viver essa experiência" abaixo do player, com scroll suave para `#ingressos` (reaproveita `setupSmoothScroll()` já existente, sem código novo)
- Classe utilitária `.section__eyebrow`, reutilizável em futuras seções que precisarem do mesmo rótulo pequeno acima do título

### Verificado
- Player responsivo (proporção 16:9 mantida) em desktop (1280px), tablet (768px) e mobile (375px), sem overflow horizontal
- Placeholder (sem `videoExperienciaId`) renderiza corretamente, com o botão desabilitado
- Carrinho, modal PIX (favorecido, chave, QR Code) e botão "Pagar com Cartão" testados após a mudança — nenhuma regressão
- Console sem erros em todos os tamanhos de tela

### Documentação
- `README.md`: nova seção "Como ativar o vídeo da seção 'Conheça a Experiência'"
- `CONFIG.md`: `videoExperienciaId` documentado

---

### CODE 003 — Vídeos oficiais em três grupos — 2026-07-02

Substituição de todos os placeholders de vídeo pelos 11 links oficiais do YouTube, reorganizados em três grupos dentro da seção "Quem Já Viveu Essa Experiência". Mesma versão 1.0.5 — segunda entrega do dia.

### Adicionado
- `VIDEO_GROUPS` (`script.js`) substitui o antigo array plano `TESTIMONIALS` — agora é um array de grupos, cada um com título próprio e sua lista de vídeos: **Conheça seu Mentor** (1 vídeo), **Depoimentos** (6 vídeos: Caroline, Edu Barbosa, Fábio, João Pedro, Mônica, Nogueira) e **Reconhecimento** (4 vídeos: Fernando e Sorocaba 01, Fernando e Sorocaba 02, Sampaio, Thauane) — 11 vídeos oficiais no total
- `setupVideoGroups()` substitui `setupTestimonials()`: gera um carrossel independente por grupo (título, trilha e navegação próprios), reaproveitando o mesmo card e o mesmo modal de vídeo já existentes — nenhuma duplicação de componente visual
- Miniaturas passam a vir automaticamente do YouTube (`img.youtube.com/vi/ID/hqdefault.jpg`) quando `thumb` não é preenchido — elimina a dependência de arquivos locais em `assets/videos/` que nunca chegaram a ser cadastrados
- Classe `.video-group__title`, reutilizando o restante do visual do carrossel de depoimentos já existente (sem alteração de layout)

### Corrigido
- Rótulos genéricos ("Assistir depoimento", "Depoimento de X") trocados por termos neutros ("Assistir vídeo", título do item) já que nem todo vídeo é um depoimento (o do Mentor e os de Reconhecimento não são)

### Verificado
- Os 11 vídeos mapeados na ordem exata fornecida (01 a 11) para os três grupos, confirmado item a item via `window.WORKSHOP_VIDEO_GROUPS`
- Cada vídeo testado individualmente: iframe criado só no clique, sem `autoplay`, com `rel=0`, título correto no modal, iframe removido ao fechar (interrompe a reprodução)
- Navegação por seta testada em carrossel com mais de uma tela de cards (grupo Depoimentos)
- Responsivo em desktop (1280px), tablet (768px) e mobile (375px), sem overflow horizontal
- Carrinho, modal PIX e seção "Conheça a Experiência" testados após a mudança — nenhuma regressão
- Console sem erros em todos os testes

### Documentação
- `CONFIG.md`: seção reescrita de `TESTIMONIALS` para `VIDEO_GROUPS`, com a estrutura de grupos documentada
- `README.md`: seção "Como adicionar vídeos e patrocinadores" atualizada para os três grupos
- `assets/README.md`: `videos/*.jpg` marcado como opcional (thumbnail automática do YouTube por padrão)

## [1.0.4] — QR Code PIX oficial — 2026-07-01

Integração definitiva do QR Code PIX oficial e do código Copia e Cola. Nenhuma mudança de layout, identidade visual, UX, SEO ou performance — só a substituição do QR Code (antes ausente/quebrado) e uma nova forma de pagamento manual (Copia e Cola) no modal já existente.

### Adicionado
- `assets/pix-qrcode.png`: QR Code PIX oficial, gerado pelo próprio banco na mesma cobrança do código Copia e Cola — os dois representam exatamente o mesmo pagamento. Validado por decodificação reversa com OpenCV: a imagem decodifica de volta para o texto de `CONFIG.pixCopiaECola`, byte a byte. Otimizado de 88KB para 2KB (conversão para paleta de 2 cores, sem perda — o QR é puro preto e branco) sem alterar nenhum pixel nem afetar a legibilidade
- `CONFIG.pixCopiaECola` (`script.js`): código Pix Copia e Cola completo (padrão EMV/BR Code, com checksum CRC16)
- Modal PIX: rótulo "QR Code Oficial" acima da imagem; novo botão **"Copiar PIX Copia e Cola"**, com feedback "PIX copiado com sucesso." — reaproveita a mesma função de cópia (com fallback) já usada pelo botão "Copiar Chave PIX"

### Corrigido
- **QR Code do modal não carregava.** A imagem tinha `loading="lazy"`, mas como o modal começa com `display: none`, o navegador nunca considerava a imagem "próxima da tela" e ela nunca era buscada — mesmo com o arquivo existindo e sendo servido corretamente (HTTP 200). Removido `loading="lazy"` dessa imagem especificamente (as demais imagens lazy do site, fora de modais, continuam como estavam)
- Função `copyPixKeyToClipboard()` renomeada para `copyTextToClipboard()` em `script.js`, já que agora copia dois valores diferentes (chave e Copia e Cola) — mesmo comportamento, nome mais preciso

### Verificado
- QR Code decodificado programaticamente (OpenCV) confirma match exato com `CONFIG.pixCopiaECola`
- Ambos os botões de cópia testados interceptando `navigator.clipboard.writeText` — confirmado que cada um copia o valor certo (`pixKey` sem pontuação / `pixCopiaECola` completo) e mostra a mensagem de confirmação correta
- Modal testado em desktop (1280px), tablet (768px) e mobile (375px): QR Code visível, sem overflow horizontal, botões cabem dentro do modal
- Console sem erros em todos os tamanhos de tela

### Documentação
- `README.md`: seção "Como trocar o QR Code PIX" reescrita — agora explica que o QR é gerado a partir do Copia e Cola (com comandos Python prontos para gerar e validar a imagem), e documenta os dois botões de cópia
- `CONFIG.md`: `pixCopiaECola` documentado, com aviso para nunca editar manualmente (contém checksum)
- `assets/README.md`: `pix-qrcode.png` marcado como "em uso" (antes constava como possivelmente ausente)
- `CHECKLIST-PUBLICACAO.md`: itens de QR Code e dos dois botões de cópia adicionados ao smoke test

## [1.0.3] — Dados oficiais publicados — 2026-07-01

Substituição definitiva de todos os placeholders pelos dados reais do Clube Carnivorista. Nenhuma informação de contato/pagamento fica duplicada em HTML — tudo centralizado no objeto `CONFIG` (`script.js`).

### Adicionado
- `CONFIG.pixKeyType` — tipo da chave PIX (`'CPF'`), exibido no modal
- Modal PIX: campo "Tipo da chave" e botão **"Copiar Chave PIX"**, com feedback visual ("Chave PIX copiada.") por 2,5s. Usa a Clipboard API moderna com fallback automático (`document.execCommand('copy')`) para navegadores mais antigos ou por segurança contra falha de permissão
- `formatPixKeyDisplay()` (`script.js`): formata a chave PIX do tipo CPF como `000.000.000-00` **apenas na exibição** — o valor copiado permanece sem pontuação (formato mais compatível com apps bancários)
- Nota discreta ao lado do botão "Pagar com Cartão": "Compras parceladas poderão sofrer acréscimos conforme condições do Mercado Pago."
- Schema.org `Organization`: adicionado `sameAs` com os links reais de Instagram e YouTube; `address.streetAddress` preenchido em `Organization` e `LocalBusiness`

### Corrigido
- Todos os placeholders do `CONFIG` substituídos pelos dados oficiais: `checkoutMercadoPago`, `pixKey`, `pixName`, `whatsappContact`, `whatsappGroup`, `instagram`, `youtube`, `maps`, `telefone`, `email`, `endereco` — propagados automaticamente para rodapé, modal PIX, botões de contato, botão Mercado Pago e página de obrigado
- Botão "Entrar no Grupo do Evento" (`index.html` e `obrigado.html`) não abria em nova aba — faltava `target="_blank" rel="noopener"`
- **Domínio incorreto em todo o SEO:** `workshopcarnespremium.vercel.app` (sem hífens) → `workshop-carnes-premium.vercel.app` (domínio real), corrigido em `index.html` (canonical, Open Graph, Twitter Card, 4 blocos Schema.org), `obrigado.html`, as 6 páginas institucionais, `sitemap.xml`, `robots.txt`, `README.md` e `CHECKLIST-PUBLICACAO.md`
- `CHECKLIST-PUBLICACAO.md` referenciava `assets/sponsors/` (nome antigo, renomeado para `assets/patrocinadores/` na v1.0.0)

### Verificado
- Todos os links testados via `.href` renderizado (não o `href="#"` estático do HTML-fonte, que é só o valor inerte antes do JavaScript rodar): WhatsApp de contato, grupo do WhatsApp, Instagram, YouTube, Google Maps, telefone (`tel:`), e-mail (`mailto:`), Mercado Pago e mensagem do comprovante PIX — todos com os dados oficiais corretos
- Console sem erros em `index.html` e `obrigado.html`
- Os 4 blocos Schema.org (JSON-LD) validados como JSON bem-formado

### Documentação
- `CONFIG.md`: tabela atualizada com `pixKeyType`; nota sobre o botão "Copiar Chave PIX" e sobre manter o Schema.org sincronizado com `instagram`/`youtube`
- `README.md`: versão atualizada para 1.0.3; seção "Como trocar o QR Code PIX" documenta `pixKeyType` e o botão de copiar
- `CHECKLIST-PUBLICACAO.md`: itens de `CONFIG` atualizados (telefone, e-mail, endereço, YouTube, tipo de chave PIX) e referência a `assets/patrocinadores/` corrigida

## [1.0.2] — Repositório consolidado — 2026-07-01

Auditoria da integração GitHub + Vercel (motivada pela pergunta "existe só uma fonte de verdade?"). Nenhuma mudança de código ou visual — só estrutura de repositório.

### Corrigido
- Achatada a estrutura do repositório: todos os arquivos estavam aninhados uma pasta a mais (`workshop-carnes-premium/` dentro do próprio repo, herança do primeiro upload manual). Agora a raiz do repositório = raiz do site, sem pasta extra
- Eliminado o clone paralelo (`wcp-deploy-tmp`) usado como intermediário manual entre a pasta de trabalho e o GitHub — a pasta de trabalho **é** agora o repositório Git oficial, sem passo de cópia entre pastas
- Cardápio: item de acompanhamento "Nachos" renomeado para **"Farofa de Nachos"**, em `index.html` (seção "Menu da Experiência → Acompanhamentos"). Única ocorrência no projeto — conferido em todo o repositório (HTML, CSS, JS, `.min`, `README.md`, `CONFIG.md`), sem nenhuma menção a "Nachos" isolado restante

### Documentação
- `DEPLOY.md`: removida a seção de workaround (estrutura duplicada); adicionada nota histórica curta
- Necessário atualizar manualmente o **Root Directory** do projeto na Vercel para vazio/raiz (configuração de painel, fora do repositório — ver instruções que acompanham esta versão)

## [1.0.1] — Publicação corrigida — 2026-07-01

Auditoria completa da versão publicada, motivada pelas fotos das proteínas não aparecendo em produção. Nenhum código foi alterado nesta entrada — o problema era de publicação, não de código.

### Diagnóstico
- Os arquivos locais estavam 100% corretos (nomes, caminhos, maiúsculas/minúsculas conferidos byte a byte)
- O repositório GitHub (`clubcarnivorista-ops/workshop-carnes-premium`) tinha um único commit (`b95b2d1`, "Add files via upload") feito por upload manual, parado numa versão antiga (~RC-1) — nunca atualizado com nada publicado depois disso, inclusive as fotos das proteínas
- Esse upload manual também criou uma pasta `workshop-carnes-premium/` extra dentro do próprio repositório (a Vercel compensa isso com **Root Directory = `workshop-carnes-premium`** nas configurações do projeto) — documentado em [DEPLOY.md](DEPLOY.md#️-estrutura-real-do-repositório-leia-antes-de-publicar)

### Corrigido
- Publicado o commit `b418d8d` no GitHub (com `b95b2d1` como pai — push normal, sem sobrescrever histórico), sincronizando a produção com todo o trabalho local: rodapé institucional, segurança, SEO, páginas institucionais e as 5 fotos das proteínas
- Vercel republicou automaticamente a partir desse push

### Documentação
- `DEPLOY.md`: nova seção explicando a estrutura de pastas duplicada do repositório e o fluxo correto de publicação enquanto ela não for corrigida na raiz

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
