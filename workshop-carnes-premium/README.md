# Workshop de Carnes Premium — Landing Page

**Versão: RC-1** (Release Candidate) — auditada e pronta para produção. Ver [CHANGELOG.md](CHANGELOG.md) para o histórico completo.

Landing page de vendas para o Workshop de Carnes Premium (Canelinha/SC). Site estático — **HTML, CSS e JavaScript puros, sem framework, sem build, sem dependências**. Roda em qualquer hospedagem estática, e este guia usa a combinação 100% gratuita **GitHub + Vercel + Gmail**.

Antes de publicar (ou de publicar uma atualização), siga o [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md). Para testar antes de liberar, use o [CHECKLIST-TESTES.md](CHECKLIST-TESTES.md). Se algo der errado depois de publicado, veja o [CHECKLIST-ROLLBACK.md](CHECKLIST-ROLLBACK.md).

## Estrutura do projeto

```
workshop-carnes-premium/
├── index.html          → página principal (landing page)
├── obrigado.html        → página de confirmação pós-pagamento
├── style.css             → estilos (versão legível, para editar)
├── style.min.css         → estilos minificados (para produção)
├── script.js              → toda a lógica do site + objetos CONFIG, TESTIMONIALS e PATROCINADORES (para editar)
├── script.min.js          → script minificado (para produção)
├── favicon.svg            → ícone do site (aba do navegador)
├── manifest.json          → metadados para instalação como app (PWA)
├── robots.txt              → instruções para buscadores
├── sitemap.xml              → mapa do site para SEO
├── vercel.json                → configuração de deploy na Vercel
├── assets/                     → imagens reais (QR Code PIX, imagem de compartilhamento, videos/, sponsors/)
├── tools/minify.py              → script para regenerar os arquivos .min
├── README.md                     → este arquivo
├── CONFIG.md                      → lista de todas as configurações editáveis
├── CHANGELOG.md                    → histórico de versões
├── CHECKLIST-PUBLICACAO.md          → checklist para seguir antes de cada publicação
├── CHECKLIST-TESTES.md               → checklist de testes (dispositivos/navegadores/funcional)
└── CHECKLIST-ROLLBACK.md              → o que fazer se uma publicação der problema
```

Toda configuração do site (preços, vagas, data, links, chave PIX) fica em **um único lugar**: o objeto `CONFIG` no topo de `script.js`. Veja a lista completa em [CONFIG.md](CONFIG.md).

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

1. Gere o QR Code estático do seu PIX no app do seu banco (a maioria tem a opção "QR Code para receber" com valor livre) ou em um gerador de PIX Copia e Cola.
2. Salve a imagem como PNG, de preferência quadrada (ex: 400×400px), com fundo branco.
3. Coloque o arquivo na pasta `assets/`, com o nome `pix-qrcode.png` (ou outro nome, desde que você atualize o caminho no passo 4).
4. No `CONFIG` em `script.js`, confirme/ajuste o caminho:
   ```js
   pixQRCode: 'assets/pix-qrcode.png',
   ```
5. Aproveite também para preencher a chave e o nome do favorecido, que aparecem junto do QR Code no modal:
   ```js
   pixKey: '00.000.000/0001-00',
   pixName: 'Workshop Carnes Premium',
   ```

---

## Como alterar links

Todos os links do site (WhatsApp, Instagram, Google Maps, checkout do Mercado Pago) também ficam no `CONFIG`, em `script.js`:

```js
checkoutMercadoPago: '#',        // link de pagamento com cartão (Mercado Pago)
whatsappContact: '5547999999999', // número de WhatsApp (com DDI, só números)
whatsappGroup: '#',                // link de convite do grupo oficial do WhatsApp
instagram: '#',                     // link do perfil do Instagram
maps: '#',                           // link do Google Maps com a localização
```

Veja a tabela completa, com exemplos de formato para cada campo, em [CONFIG.md](CONFIG.md).

---

## Como adicionar depoimentos em vídeo e patrocinadores

A seção **"Quem Já Viveu Essa Experiência"** (carrossel de depoimentos em vídeo) e a seção **"Patrocinadores"** também são geradas automaticamente a partir de objetos `TESTIMONIALS` e `PATROCINADORES` no topo de `script.js` — mesmo padrão do `CONFIG`. Basta inserir um novo objeto no array correspondente para adicionar um vídeo, um patrocinador ou um apoiador; nenhum HTML precisa ser tocado.

Guia completo, com todos os campos e exemplos, em [CONFIG.md](CONFIG.md#depoimentos-em-vídeo--testimonials) e [CONFIG.md](CONFIG.md#patrocinadores--patrocinadores).

---

## Limitação conhecida — valor dinâmico no cartão

O botão "Pagar com Cartão" usa um link fixo do Mercado Pago (`checkoutMercadoPago`). Links fixos não recebem valor dinâmico automaticamente — se o cliente comprar mais de 1 ingresso, ele paga o valor configurado no próprio link do Mercado Pago, que pode divergir do total calculado no site.

Para valor 100% dinâmico no cartão, é necessário integrar a **API de Preferences do Mercado Pago** (exige um pequeno backend, pois usa um Access Token que não pode ficar exposto no navegador). Isso está documentado em detalhe no comentário acima da função `buildCheckoutUrl()` em `script.js`, já preparado para receber essa integração no futuro sem precisar reescrever o restante do código.

---

## SEO e compartilhamento

- `robots.txt` e `sitemap.xml` já estão prontos — depois do primeiro deploy, atualize a URL neles (troque `workshopcarnespremium.vercel.app` pela URL real do seu projeto).
- As meta tags de Open Graph/Twitter Card (em `index.html`) controlam o preview do link quando compartilhado no WhatsApp, Instagram ou Facebook. Elas apontam para `assets/og-image.jpg` — adicione essa imagem (1200×630px) para o preview aparecer com foto. Sem ela, o link ainda funciona, só aparece sem imagem.
- Depois de publicar na Vercel com a URL final, atualize também a tag `<link rel="canonical">` e as tags `og:url`/`og:image`/`twitter:image` no `<head>` do `index.html`.
- Os vídeos de depoimento não usam `<iframe>` do YouTube na carga da página — só quando o usuário clica em "Assistir depoimento". Isso mantém o Lighthouse (Performance e Best Practices) alto mesmo com vários vídeos cadastrados em `TESTIMONIALS`.
- `index.html` inclui dados estruturados **Schema.org Event** (JSON-LD, no `<head>`) para habilitar Rich Results do Google. Sempre que a data, o horário ou os preços mudarem no `CONFIG`, atualize também esse bloco — ele é estático de propósito (não é gerado por JavaScript) para ficar disponível a qualquer rastreador.

## PWA (preparação futura)

O `manifest.json` já existe e aponta para o `favicon.svg` como ícone. Isso deixa o projeto pronto para, no futuro, virar um app instalável (PWA) — mas hoje falta um Service Worker (que cacheia o site offline) para ter instalação completa em Android/Chrome. Não é necessário para o funcionamento atual do site.

## Otimização de imagens

Ícones (Instagram, WhatsApp, Maps, favicon) são SVG inline ou emoji — já leves e nítidos em qualquer tela, sem otimização necessária. As únicas imagens rasterizadas do projeto são as cadastradas em `assets/` (QR Code PIX, imagem de compartilhamento, miniaturas de depoimento, logos de patrocinador — ver [assets/README.md](assets/README.md)), todas carregadas com `loading="lazy"`. Ao adicionar/trocar qualquer uma delas:

- Prefira **JPG** para fotos e **PNG** para imagens com transparência/QR Code.
- Comprima antes de subir usando uma ferramenta gratuita como [squoosh.app](https://squoosh.app) (roda no navegador, sem instalar nada).
- Sempre que possível, gere também uma versão `.webp` — é ~30% mais leve que JPG/PNG com a mesma qualidade.
