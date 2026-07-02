# Workshop de Carnes Premium — Landing Page

**Versão: 1.0.7** — primeiros parceiros oficiais cadastrados na seção "Patrocinadores" (Faroeste Beer Co. e Super Fogo), com estrutura por categorias. Ver [CHANGELOG.md](CHANGELOG.md) para o histórico completo.

Landing page de vendas para o Workshop de Carnes Premium (Canelinha/SC), realização do Clube Carnivorista. Site estático — **HTML, CSS e JavaScript puros, sem framework, sem build, sem dependências**. Roda em qualquer hospedagem estática, e este guia usa a combinação 100% gratuita **GitHub + Vercel + Gmail**.

Antes de publicar (ou de publicar uma atualização), siga o [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md). Para testar antes de liberar, use o [CHECKLIST-TESTES.md](CHECKLIST-TESTES.md). Se algo der errado depois de publicado, veja o [CHECKLIST-ROLLBACK.md](CHECKLIST-ROLLBACK.md). No dia de abrir as vendas oficialmente, siga o [CHECKLIST-LANCAMENTO.md](CHECKLIST-LANCAMENTO.md). Para publicar na Vercel, na Netlify ou conectar um domínio próprio, veja [DEPLOY.md](DEPLOY.md). Para entender os cabeçalhos de segurança do site, veja [SECURITY.md](SECURITY.md).

## Estrutura do projeto

```
workshop-carnes-premium/
├── index.html          → página principal (landing page)
├── obrigado.html        → página de confirmação pós-pagamento
├── links.html            → página de Link in Bio (Instagram) com os links oficiais
├── 404.html               → página de erro personalizada (link quebrado/URL inexistente)
├── privacidade.html        → Política de Privacidade (página institucional, em preparação)
├── lgpd.html                → LGPD (página institucional, em preparação)
├── termos.html                → Termos de Uso (página institucional, em preparação)
├── cancelamento.html            → Política de Cancelamento (página institucional, em preparação)
├── reembolso.html                 → Política de Reembolso (página institucional, em preparação)
├── cookies.html                     → Uso de Cookies (página institucional, em preparação)
├── style.css                          → estilos (versão legível, para editar)
├── style.min.css                        → estilos minificados (para produção)
├── script.js                              → toda a lógica do site + objetos CONFIG, VIDEO_GROUPS e PATROCINADORES (para editar)
├── script.min.js                            → script minificado (para produção)
├── favicon.svg                                → ícone do site em SVG (navegadores modernos)
├── favicon.ico                                  → ícone em formato .ico (compatibilidade ampla)
├── favicon-16x16.png                              → ícone PNG 16×16
├── favicon-32x32.png                                → ícone PNG 32×32
├── apple-touch-icon.png                               → ícone para adicionar à tela inicial no iPhone
├── android-chrome-192x192.png                           → ícone PWA/Android 192×192
├── android-chrome-512x512.png                             → ícone PWA/Android 512×512
├── manifest.json                                            → metadados para instalação como app (PWA)
├── robots.txt                                                 → instruções para buscadores
├── sitemap.xml                                                   → mapa do site para SEO
├── vercel.json                                                     → configuração de deploy + cabeçalhos de segurança na Vercel
├── assets/                                                           → imagens reais — ver assets/README.md para a lista de subpastas
│   ├── proteins/                                                       → fotos dos cortes do menu da experiência
│   ├── videos/                                                           → miniaturas dos depoimentos em vídeo
│   ├── feedbacks/                                                          → prints de depoimentos em texto (uso futuro)
│   ├── patrocinadores/                                                       → logomarcas de patrocinadores/apoiadores
│   ├── logos/                                                                  → identidade visual institucional (uso futuro)
│   ├── social/                                                                   → artes para redes sociais (uso futuro)
│   └── certificados/                                                               → modelo do certificado digital (uso futuro)
├── tools/minify.py                                                                   → script para regenerar os arquivos .min
├── README.md                                                                           → este arquivo
├── CONFIG.md                                                                             → lista de todas as configurações editáveis
├── DEPLOY.md                                                                               → como publicar (Vercel/Netlify/domínio próprio)
├── SECURITY.md                                                                               → cabeçalhos de segurança (CSP, HSTS, etc.) e o porquê de cada um
├── CHANGELOG.md                                                                                → histórico de versões
├── CHECKLIST-PUBLICACAO.md                                                                       → checklist técnico antes de cada publicação
├── CHECKLIST-TESTES.md                                                                             → checklist de testes (dispositivos/navegadores/funcional)
├── CHECKLIST-ROLLBACK.md                                                                             → o que fazer se uma publicação der problema
└── CHECKLIST-LANCAMENTO.md                                                                             → checklist de marketing/conversão para o dia de abrir as vendas
```

Toda configuração do site (preços, vagas, data, links, chave PIX, contato institucional) fica em **um único lugar**: o objeto `CONFIG` no topo de `script.js`. Veja a lista completa em [CONFIG.md](CONFIG.md).

---

## Como instalar

Não há instalação de dependências — é só HTML/CSS/JS puro. Você só precisa:

1. Uma conta **Gmail** (para criar conta no GitHub e na Vercel, gratuitas).
2. Uma conta no **[GitHub](https://github.com)** (gratuita, cadastro com o Gmail).
3. Uma conta na **[Vercel](https://vercel.com)** (gratuita, entrando com login do GitHub).
4. (Opcional, só para testar no seu computador) **[Python](https://www.python.org/downloads/)** já vem instalado no Windows 10/11 mais recentes e no Mac — é usado só para abrir um servidor local, não é uma dependência do projeto.

Baixe/clone a pasta `workshop-carnes-premium/` inteira — ela já está pronta para uso.

---

## Como executar localmente

Como o site é só HTML/CSS/JS, dá para abrir o `index.html` direto no navegador. **Mas** o modal de PIX e alguns recursos usam `fetch`/caminhos relativos que funcionam melhor com um servidor local. Recomendado:

**Windows (PowerShell):**
```powershell
cd caminho\para\workshop-carnes-premium
python -m http.server 8080
```

**Mac/Linux (bash):**
```bash
cd caminho/para/workshop-carnes-premium
python3 -m http.server 8080
```

Depois abra **http://localhost:8080** no navegador.

Para parar o servidor, volte ao terminal e pressione `Ctrl + C`.

---

## Como publicar no GitHub

1. Acesse [github.com](https://github.com) e crie uma conta gratuita usando seu Gmail (se ainda não tiver).
2. Clique em **New repository** (botão verde, no canto superior direito).
3. Dê um nome ao repositório, por exemplo `workshop-carnes-premium`. Deixe como **Public**. Não marque "Add a README" (já temos um).
4. Clique em **Create repository**.
5. Na página que abrir, siga as instruções em **"…or push an existing repository from the command line"**. No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Primeira versão da landing page"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/workshop-carnes-premium.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu nome de usuário do GitHub. Pronto — o código está no GitHub.

> Não tem Git instalado? No GitHub, você também pode clicar em **"uploading an existing file"** e arrastar todos os arquivos da pasta manualmente, sem usar terminal.

---

## Como publicar na Vercel

1. Acesse [vercel.com](https://vercel.com) e clique em **Sign Up**.
2. Escolha **Continue with GitHub** e autorize o acesso (login único, sem precisar de senha nova).
3. No painel da Vercel, clique em **Add New... → Project**.
4. Selecione o repositório `workshop-carnes-premium` que você acabou de criar.
5. Na tela de configuração:
   - **Framework Preset:** deixe em `Other` (o site não usa framework nenhum).
   - **Build Command:** deixe **vazio**.
   - **Output Directory:** deixe **vazio** (ou `.`).
6. Clique em **Deploy**.

Em cerca de 30 segundos, a Vercel te dá uma URL pública, por exemplo `https://workshop-carnes-premium.vercel.app`. O site já está no ar, gratuitamente.

### Domínio próprio (opcional)

Se você tiver um domínio (ex: `workshopdecarnespremium.com.br`), na aba **Settings → Domains** do projeto na Vercel, adicione o domínio e siga as instruções de DNS. A Vercel emite certificado HTTPS automaticamente, sem custo.

### Atualizações automáticas

A partir de agora, **todo `git push` para o GitHub atualiza o site automaticamente** na Vercel em segundos. Não é preciso reconfigurar nada.

---

## Como atualizar a Landing Page

Fluxo padrão para qualquer alteração (preço, texto, link, imagem):

1. Edite os arquivos localmente (`index.html`, `style.css`, `script.js` — sempre os arquivos **não-minificados**, que são os "originais").
2. Teste localmente (veja [Como executar localmente](#como-executar-localmente)).
3. **Produção usa os arquivos minificados** (`index.html`/`obrigado.html` carregam `style.min.css` e `script.min.js`) — depois de editar `style.css` ou `script.js`, sempre regenere os `.min` antes de publicar (veja [tools/minify.py](tools/minify.py)):
   ```bash
   python tools/minify.py css style.css style.min.css
   python tools/minify.py js script.js script.min.js
   ```
   Se esquecer esse passo, o site continua funcionando (os `.html` só carregam o `.min` que já existir), mas sua alteração **não vai aparecer em produção** até você regenerar e publicar os arquivos `.min` atualizados.
4. Suba a alteração para o GitHub:
   ```bash
   git add .
   git commit -m "Descreva a alteração aqui"
   git push
   ```
5. Pronto — a Vercel publica a nova versão automaticamente.

---

## Como alterar preços

Abra `script.js`, encontre o objeto `CONFIG` no topo do arquivo, e altere:

```js
pixMaleValue: 250.00,   // preço do ingresso masculino
pixFemaleValue: 220.00, // preço do ingresso feminino
```

Esses dois valores alimentam automaticamente: o preço exibido nos cards de ingresso, o cálculo do resumo da compra, e o valor total mostrado no modal de PIX e na mensagem do WhatsApp. Não precisa editar nada no HTML.

---

## Como alterar data

No mesmo objeto `CONFIG` em `script.js`:

```js
dataEvento: '29 de julho de 2026 (quarta-feira)',
horarioRecepcao: '19:00',
horarioWorkshop: '19:30',
```

Esses três campos atualizam automaticamente o topo da página (hero) e a resposta da pergunta "Quando e qual o horário do evento?" no FAQ.

---

## Como alterar vagas

No `CONFIG`:

```js
vagasAtuais: 32, // quantas pessoas já garantiram vaga
vagasMax: 50,    // capacidade máxima do evento
```

A barra de progresso da seção "Vagas" recalcula automaticamente a porcentagem preenchida.

O número **mínimo** de participantes (hoje 20) fica em uma variável separada, logo abaixo do `CONFIG`, porque muda bem raramente:

```js
var VAGAS_MIN = 20;
```

---

## Como trocar o QR Code PIX

A imagem (`assets/pix-qrcode.png`) e o código "Pix Copia e Cola" (`CONFIG.pixCopiaECola`) precisam **sempre representar o mesmo pagamento** — se um mudar (chave, valor, nome do favorecido), o outro também precisa ser atualizado.

**Caminho mais simples (recomendado):** gere a cobrança no próprio app do banco (opção "Cobrar"/"Gerar QR Code para receber"). O banco entrega os dois juntos: a imagem do QR Code (salve como `assets/pix-qrcode.png`) e o texto Copia e Cola correspondente (cole em `CONFIG.pixCopiaECola`, abaixo). Como vêm da mesma cobrança, já ficam garantidamente sincronizados.

```js
pixCopiaECola: '00020101021226850014br.gov.bcb.pix...6304XXXX', // não edite manualmente — vem do banco, com checksum no final
```

**Se você só tiver o texto Copia e Cola** (sem a imagem do banco à mão), dá pra gerar a imagem do QR Code a partir dele — é a mesma imagem que qualquer leitor de QR Code PIX vai decodificar de volta para esse texto. Com Python instalado:
```bash
pip install "qrcode[pil]"
python -c "
import qrcode
payload = 'COLE_AQUI_O_TEXTO_COPIA_E_COLA'
img = qrcode.make(payload, error_correction=qrcode.constants.ERROR_CORRECT_M)
img.save('assets/pix-qrcode.png')
"
```

**Sempre confirme que a imagem final é legível** antes de publicar — escaneando com o app de um banco real, ou decodificando programaticamente:
```bash
pip install opencv-python-headless
python -c "
import cv2
img = cv2.imread('assets/pix-qrcode.png')
data, _, _ = cv2.QRCodeDetector().detectAndDecode(img)
print('OK' if data == 'COLE_AQUI_O_MESMO_TEXTO' else 'ERRO: não bate com o Copia e Cola')
"
```

Aproveite também para conferir a chave, o tipo da chave e o nome do favorecido, que aparecem junto do QR Code no modal:
   ```js
   pixKey: '03362258905',   // sem pontuação — é o valor copiado pelo botão "Copiar Chave PIX"
   pixKeyType: 'CPF',       // 'CPF', 'CNPJ', 'E-mail', 'Telefone' ou 'Aleatória'
   pixName: 'Nome Completo ou Razão Social',
   ```
   Quando `pixKeyType` é `'CPF'` e a chave tem 11 dígitos, o modal formata a **exibição** automaticamente como `000.000.000-00` — não precisa digitar a pontuação em `pixKey`.

O modal tem dois botões de cópia:
- **"Copiar Chave PIX"** — copia `pixKey` (sem pontuação), para quem prefere colar a chave manualmente no app do banco.
- **"Copiar PIX Copia e Cola"** — copia `pixCopiaECola` (o código completo), para colar direto na tela de pagamento do banco.

Os dois mostram uma mensagem de confirmação por alguns segundos ("Chave PIX copiada." / "PIX copiado com sucesso.") e funcionam mesmo em navegadores sem suporte à Clipboard API moderna (fallback automático).

> **Nota técnica:** a imagem do QR Code no modal **não usa `loading="lazy"`** de propósito — ela fica dentro de um modal que começa escondido (`display: none`), e o carregamento preguiçoso do navegador nunca detecta esse tipo de imagem como "próxima da tela", então ela nunca carregaria. Se outras imagens forem adicionadas dentro de modais no futuro, aplique a mesma regra.

---

## Como trocar as fotos das proteínas

A seção **"Menu da Experiência" → Proteínas Premium** exibe uma miniatura circular (56×56px) ao lado do nome de cada corte, com as fotos reais em `assets/proteins/`:

```
assets/proteins/
├── picanha-reserva.webp        → Picanha Reserva
├── entrecot-defumado.webp      → Entrecot Defumado
├── chuck-eye-steak.webp        → Chuck Eye Steak no Black Rub
├── entranha-gorgonzola.webp    → Entranha ao Molho de Gorgonzola
└── fraldinha-crosta-alho.webp  → Fraldinha na Crosta de Alho
```

Para trocar uma foto:

1. Prepare a imagem nova em formato **WEBP**, o mais próxima possível de um quadrado (a exibição já corta para círculo via `object-fit: cover`, então não precisa ser perfeita — o CSS ajusta o enquadramento automaticamente). Recomendado: 160×160px, até ~10KB.
2. Salve com o **mesmo nome** do arquivo atual dentro de `assets/proteins/`, sobrescrevendo o antigo — assim não precisa mexer no `index.html`.
3. Para adicionar um corte novo (não substituir um existente), copie o bloco de um `<li class="menu-protein-item">` em `index.html` (dentro de `<ul class="menu-protein-list">`), ajuste o `src`, o `alt=""` (mantenha vazio — a foto é decorativa, o nome já está no texto ao lado) e o texto do corte.
4. Teste localmente (ver [Como executar localmente](#como-executar-localmente)) e confirme que a imagem aparece sem distorcer o círculo.

As tags já vêm com `loading="lazy"`, `decoding="async"` e `width`/`height` fixos (56×56) — isso evita que a página "pule" (CLS) enquanto a imagem carrega. Não é preciso adicionar nada disso manualmente ao trocar apenas o arquivo de uma foto existente.

---

## Como alterar links

Todos os links e contatos institucionais do site (WhatsApp, Instagram, YouTube, Google Maps, telefone, e-mail, endereço, checkout do Mercado Pago) também ficam no `CONFIG`, em `script.js`:

```js
checkoutMercadoPago: '#',        // link de pagamento com cartão (Mercado Pago)
whatsappContact: '5547999999999', // número de WhatsApp (com DDI, só números)
whatsappGroup: '#',                // link de convite do grupo oficial do WhatsApp
instagram: '#',                     // link do perfil do Instagram
youtube: '#',                        // link do canal do YouTube
maps: '#',                            // link do Google Maps com a localização
telefone: '+55 47 99999-9999',         // telefone institucional (rodapé + tel:)
email: 'contato@clubecarnivorista.com.br', // e-mail institucional (rodapé + mailto:)
endereco: 'Canelinha/SC',                    // endereço institucional (texto no rodapé)
```

Veja a tabela completa, com exemplos de formato para cada campo, em [CONFIG.md](CONFIG.md).

### Links institucionais no rodapé

O rodapé também tem uma linha de links institucionais (Política de Privacidade, LGPD, Termos de Uso, Política de Cancelamento, Política de Reembolso, Uso de Cookies), apontando para páginas próprias (`privacidade.html`, `lgpd.html`, `termos.html`, `cancelamento.html`, `reembolso.html`, `cookies.html`). Essas páginas hoje têm conteúdo placeholder ("página em preparação") com os canais de contato — substitua o conteúdo de cada arquivo pelo texto jurídico definitivo quando ele estiver pronto (recomendamos revisão de um advogado antes de publicar a versão final, principalmente para Termos de Uso e Política de Reembolso).

---

## Como adicionar vídeos, parceiros e patrocinadores

A seção **"Quem Já Viveu Essa Experiência"** exibe três grupos de vídeo lado a lado — **Conheça seu Mentor**, **Depoimentos** e **Reconhecimento** — cada um com seu próprio carrossel. Isso e a seção **"Patrocinadores"** são geradas automaticamente a partir dos objetos `VIDEO_GROUPS` e `PATROCINADORES` no topo de `script.js` — mesmo padrão do `CONFIG`. Basta inserir um novo objeto no array/grupo correspondente para adicionar um vídeo, um grupo novo, um parceiro ou um patrocinador; nenhum HTML precisa ser tocado.

As miniaturas dos vídeos vêm automaticamente do próprio YouTube — não é preciso cadastrar nenhuma imagem em `assets/`.

A partir da v1.0.7, `PATROCINADORES` é organizado **por categoria** (`categorias`): hoje existe **Parceiros Oficiais** (com os primeiros dois parceiros, vindos de permuta) e três categorias já reservadas para o futuro — **Patrocinador Master**, **Patrocinadores Ouro** e **Patrocinadores Prata** — todas vazias até o primeiro fechamento em cada tier. Uma categoria só aparece na página quando tem pelo menos 1 item; criar uma tier nova (ou renomear uma existente) não exige tocar em `index.html`, só em `CONFIG.md`/`script.js`.

Guia completo, com todos os campos e exemplos, em [CONFIG.md](CONFIG.md#vídeos-em-grupo--video_groups) e [CONFIG.md](CONFIG.md#patrocinadores--patrocinadores).

---

## Como ativar o vídeo da seção "Conheça a Experiência"

Entre "Menu da Experiência" e "Quem Já Viveu Essa Experiência" existe uma seção com um player de vídeo em destaque ("Veja como será a experiência"). Até o vídeo oficial ser gravado e publicado no YouTube, essa seção mostra um placeholder — o botão de assistir fica desabilitado, sem imagem quebrada.

Para ativar, preencha o ID do vídeo em `CONFIG` (`script.js`):
```js
videoExperienciaId: 'SEU_ID_DO_YOUTUBE', // o trecho depois de v= na URL do vídeo
```

A miniatura (thumbnail) é buscada automaticamente do próprio YouTube (`img.youtube.com/vi/SEU_ID/maxresdefault.jpg`) — não precisa cadastrar nenhuma imagem em `assets/`. O player só carrega (cria o `<iframe>`) quando o visitante clica em assistir — sem autoplay, sem sair da página. O parâmetro `rel=0` é enviado ao YouTube para reduzir vídeos relacionados de outros canais ao final (o YouTube não permite removê-los por completo desde 2018).

---

## Página de Link in Bio (`links.html`)

Página própria para colocar no link da bio do Instagram — usa a mesma identidade visual da Landing (fundo escuro, detalhes dourados, mesmas fontes), mas em uma estrutura simples de 5 botões, sem nenhuma outra seção da Landing.

Todos os destinos vêm do `CONFIG` (`script.js`), sem link hardcoded no HTML:

```js
links: {
  garantirVaga: 'https://workshop-carnes-premium.vercel.app/', // Landing principal
  calculadora: 'https://creative-licorice-04e925.netlify.app/'  // EventCalc Pro v7
}
```

Os outros três botões (Grupo do WhatsApp, YouTube, Instagram) reaproveitam os mesmos campos já usados no resto do site — `CONFIG.whatsappGroup`, `CONFIG.youtube`, `CONFIG.instagram` — para não duplicar o mesmo link em dois lugares do `CONFIG`.

Para trocar qualquer destino, edite o `CONFIG` e rode `python tools/minify.py js script.js script.min.js` de novo — `links.html` não precisa ser tocado.

A Landing (`index.html`) não foi alterada por essa página — ela continua funcionando exatamente como antes.

---

## Limitação conhecida — valor dinâmico no cartão

O botão "Pagar com Cartão" usa um link fixo do Mercado Pago (`checkoutMercadoPago`). Links fixos não recebem valor dinâmico automaticamente — se o cliente comprar mais de 1 ingresso, ele paga o valor configurado no próprio link do Mercado Pago, que pode divergir do total calculado no site.

Para valor 100% dinâmico no cartão, é necessário integrar a **API de Preferences do Mercado Pago** (exige um pequeno backend, pois usa um Access Token que não pode ficar exposto no navegador). Isso está documentado em detalhe no comentário acima da função `buildCheckoutUrl()` em `script.js`, já preparado para receber essa integração no futuro sem precisar reescrever o restante do código.

---

## SEO e compartilhamento

- `robots.txt` e `sitemap.xml` já estão prontos — depois do primeiro deploy, atualize a URL neles (troque `workshop-carnes-premium.vercel.app` pela URL real do seu projeto).
- As meta tags de Open Graph/Twitter Card (em `index.html`) controlam o preview do link quando compartilhado no WhatsApp, Instagram ou Facebook. Elas apontam para `assets/og-image.jpg` — adicione essa imagem (1200×630px) para o preview aparecer com foto. Sem ela, o link ainda funciona, só aparece sem imagem.
- Depois de publicar na Vercel com a URL final, atualize também a tag `<link rel="canonical">` e as tags `og:url`/`og:image`/`twitter:image` no `<head>` do `index.html`.
- Nenhum vídeo (dos três grupos, nem o da seção "Conheça a Experiência") usa `<iframe>` do YouTube na carga da página — só quando o usuário clica em "Assistir vídeo". Isso mantém o Lighthouse (Performance e Best Practices) alto mesmo com vários vídeos cadastrados em `VIDEO_GROUPS`.
- `index.html` inclui dados estruturados **Schema.org Event** (JSON-LD, no `<head>`) para habilitar Rich Results do Google. Sempre que a data, o horário ou os preços mudarem no `CONFIG`, atualize também esse bloco — ele é estático de propósito (não é gerado por JavaScript) para ficar disponível a qualquer rastreador.

## Favicon completo

O projeto tem o conjunto completo de ícones, gerado a partir de `favicon.svg`: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (tela inicial do iPhone) e `android-chrome-192x192.png`/`android-chrome-512x512.png` (Android/PWA). Todos já referenciados no `<head>` de `index.html`, `obrigado.html` e `404.html`, e listados no `manifest.json`.

Se um dia trocar a marca/logo, regenere todo o conjunto a partir do novo `favicon.svg` (qualquer ferramenta de favicon generator online resolve, ex: [realfavicongenerator.net](https://realfavicongenerator.net)) e substitua os arquivos — os nomes e caminhos já usados no HTML continuam os mesmos.

## Página 404 personalizada

`404.html`, na raiz do projeto, é servida automaticamente pela Vercel e pela Netlify para qualquer URL que não exista no site (ex: um link antigo ou digitado errado) — não precisa de nenhuma configuração de rota adicional. Usa os mesmos componentes visuais da página de "Obrigado" (`.obrigado`, `.obrigado__content`, etc. de `style.css`), então a identidade visual já é 100% consistente com o resto do site sem precisar de CSS próprio.

## Pixels de Analytics e eventos de conversão

Google Analytics 4, Meta Pixel, Google Ads Tag e Microsoft Clarity já estão preparados como placeholders comentados no `<head>` de `index.html`, e os principais CTAs do site (Comprar, Entrar no Grupo, WhatsApp, PIX, Mercado Pago) já disparam eventos de conversão automaticamente para qualquer um desses pixels que estiver ativo. Ver [CONFIG.md → Pixels de Analytics/Anúncios](CONFIG.md#pixels-de-analyticsanúncios) para como ativar cada um, e [CHECKLIST-LANCAMENTO.md](CHECKLIST-LANCAMENTO.md) para testar tudo antes de abrir as vendas.

## PWA (preparação futura)

O `manifest.json` já existe e aponta para os ícones do site. Isso deixa o projeto pronto para, no futuro, virar um app instalável (PWA) — mas hoje falta um Service Worker (que cacheia o site offline) para ter instalação completa em Android/Chrome. Não é necessário para o funcionamento atual do site.

## Otimização de imagens

Ícones (Instagram, WhatsApp, Maps, favicon) são SVG inline ou emoji — já leves e nítidos em qualquer tela, sem otimização necessária. As imagens rasterizadas do projeto ficam em `assets/` (QR Code PIX, imagem de compartilhamento, fotos das proteínas, miniaturas de depoimento, logos de patrocinador — ver [assets/README.md](assets/README.md)), todas carregadas com `loading="lazy"` + `decoding="async"` + `width`/`height` fixos (evita CLS). Ao adicionar/trocar qualquer uma delas:

- Prefira **WEBP** sempre que possível — é o formato usado nas fotos de `assets/proteins/` (~8KB cada, contra 150-250KB dos JPGs originais). Use **PNG** só quando precisar de transparência (logos, QR Code).
- Comprima antes de subir usando uma ferramenta gratuita como [squoosh.app](https://squoosh.app) (roda no navegador, sem instalar nada, exporta direto em WEBP).
- Se a imagem original tiver proporção diferente do espaço de exibição (ex: foto retangular em um card quadrado/circular), não precisa recortar manualmente pixel a pixel — o CSS já usa `object-fit: cover` nesses elementos, então qualquer proporção é enquadrada automaticamente sem distorcer.
