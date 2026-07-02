# CONFIG.md — Configurações editáveis

Todas as configurações do site ficam centralizadas em **um único lugar**: o objeto `CONFIG` no topo do arquivo [`script.js`](script.js) (linhas ~9-25).

Não é preciso mexer em nenhum outro arquivo `.html` para alterar preço, vagas, data, links ou chave PIX — tudo passa por ali.

```js
const CONFIG = {
  checkoutMercadoPago: 'https://link.mercadopago.com.br/workshopcanelinha001',
  pixKey: '03362258905',
  pixKeyType: 'CPF',
  pixName: 'Juliomar Andrucho Meskiu',
  pixQRCode: 'assets/pix-qrcode.png',
  pixCopiaECola: '00020101021226850014br.gov.bcb.pix2563qrcodepix.bb.com.br/pix/v2/fac1e30b-d093-4ee2-9a78-8c4bb8e6bc095204000053039865406250.005802BR5924JULIOMAR_ANDRUCHO_MESKIU6007ITAPEMA62070503***6304C8B5',
  pixMaleValue: 250.00,
  pixFemaleValue: 220.00,
  whatsappContact: '5547996681010',
  whatsappGroup: 'https://chat.whatsapp.com/I5w3cW0bZzB5L8NfFd4rdq?s=cl&p=a&mlu=3',
  instagram: 'https://www.instagram.com/clubcarnivorista?igsh=MWc5cHd0eHBnanFnaw==',
  youtube: 'https://www.youtube.com/@ClubCarnivorista',
  maps: 'https://maps.app.goo.gl/7mkaVDxP5CGRetEs6',
  telefone: '+55 47 99668-1010',
  email: 'clubcarnivorista@gmail.com',
  endereco: 'Estrada Geral do Moura, Bairro Moura — Canelinha/SC',
  vagasAtuais: 32,
  vagasMax: 50,
  dataEvento: '29 de julho de 2026 (quarta-feira)',
  horarioRecepcao: '19:00',
  horarioWorkshop: '19:30',
  videoExperienciaId: '',
  links: {
    garantirVaga: 'https://workshop-carnes-premium.vercel.app/',
    calculadora: 'https://creative-licorice-04e925.netlify.app/'
  }
};
```

> **Dados oficiais do Clube Carnivorista, publicados na v1.0.3.** Não restam placeholders (`#`, números/e-mails genéricos) em nenhum campo do `CONFIG`.

## Tabela de referência

| Chave | O que controla | Formato / exemplo |
|---|---|---|
| `checkoutMercadoPago` | Link de checkout do Mercado Pago. Usado no botão "Pagar com Cartão". | URL completa: `'https://mpago.la/xxxxxxx'` |
| `pixKey` | Chave PIX usada para copiar (botão "Copiar Chave PIX") — **somente dígitos**, sem pontuação. | Texto: CPF/CNPJ, e-mail, telefone ou chave aleatória |
| `pixKeyType` | Tipo da chave PIX, exibido no modal ("Tipo da chave"). Quando é `'CPF'` e a chave tem 11 dígitos, `formatPixKeyDisplay()` em `script.js` formata a **exibição** como `000.000.000-00` (o valor copiado continua sem pontuação). | Texto: `'CPF'`, `'CNPJ'`, `'E-mail'`, `'Telefone'` ou `'Aleatória'` |
| `pixName` | Nome do favorecido, exibido no modal PIX. | Texto: `'Nome Completo ou Razão Social'` |
| `pixQRCode` | Caminho da imagem do QR Code PIX. **Deve ser a imagem que codifica o mesmo valor de `pixCopiaECola`** — se um mudar, o outro também precisa mudar (ver "Como trocar o QR Code PIX" no README). | Caminho relativo: `'assets/pix-qrcode.png'` |
| `pixCopiaECola` | Código completo "Pix Copia e Cola" (padrão EMV/BR Code), copiado pelo botão "Copiar PIX Copia e Cola". Inclui um checksum (CRC16) nos últimos 4 caracteres — **nunca edite manualmente**, sempre gere um código novo se algum dado do PIX mudar. | Texto: string longa terminando em `6304XXXX` |
| `pixMaleValue` | Preço do ingresso masculino. Aparece no card de ingressos, no resumo da compra e no total do PIX. | Número: `250.00` (sem `R$`, use ponto para centavos) |
| `pixFemaleValue` | Preço do ingresso feminino. Mesma lógica do item acima. | Número: `220.00` |
| `whatsappContact` | Número de WhatsApp usado para receber comprovante e contato direto no rodapé. | Somente dígitos, com DDI: `'55DDNNNNNNNNN'` |
| `whatsappGroup` | Link de convite do grupo oficial do WhatsApp. | URL completa: `'https://chat.whatsapp.com/xxxxxxx'` |
| `instagram` | Link do perfil do Instagram (rodapé). | URL completa: `'https://instagram.com/seuusuario'` |
| `youtube` | Link do canal do YouTube (rodapé). | URL completa: `'https://youtube.com/@seucanal'` |
| `maps` | Link do Google Maps com a localização do evento (rodapé). | URL completa do Google Maps |
| `telefone` | Telefone institucional, exibido formatado no rodapé e usado no link `tel:` (os caracteres não-numéricos são removidos automaticamente para o `tel:`). | Texto: `'+55 47 99999-9999'` |
| `email` | E-mail institucional, exibido e usado no link `mailto:` (rodapé e páginas institucionais). | Texto: `'contato@seudominio.com.br'` |
| `endereco` | Endereço institucional exibido como texto no rodapé. | Texto livre: `'Rua Exemplo, 123 — Bairro, Cidade/UF'` |
| `vagasAtuais` | Número de inscritos já confirmados — alimenta a barra de progresso da seção "Vagas". | Número inteiro: `32` |
| `vagasMax` | Capacidade máxima de vagas do evento. | Número inteiro: `50` |
| `dataEvento` | Data do evento, exibida no topo da página e no FAQ. | Texto livre: `'29 de julho de 2026 (quarta-feira)'` |
| `horarioRecepcao` | Horário de abertura/recepção. | Texto: `'19:00'` |
| `horarioWorkshop` | Horário de início do workshop. | Texto: `'19:30'` |
| `videoExperienciaId` | ID do vídeo do YouTube exibido na seção "Conheça a Experiência". Vazio = seção mostra placeholder com botão desabilitado, sem imagem quebrada. | Texto: `'dQw4w9WgXcQ'` (trecho depois de `v=` na URL do YouTube) |
| `links.garantirVaga` | Destino do botão principal em `links.html` (página de Link in Bio). | URL completa da Landing |
| `links.calculadora` | Destino do botão "Calculadora de Carnes" em `links.html`. | URL completa do EventCalc Pro v7 |

Os outros três botões de `links.html` (Grupo do WhatsApp, YouTube, Instagram) **não duplicam link nenhum** — reaproveitam `whatsappGroup`, `youtube` e `instagram` já listados acima.

## Observações importantes

- **`vagasMin` (mínimo de 20 participantes)** não está no `CONFIG` porque raramente muda — está na variável `VAGAS_MIN`, logo abaixo do `CONFIG` em `script.js`. Se precisar alterar, edite ali.
- **Não existem `precoMasculino`/`precoFeminino` separados do preço do PIX.** `pixMaleValue` e `pixFemaleValue` são usados tanto para calcular o total do PIX quanto para exibir o preço nos cards de ingresso — um único valor, uma única fonte de verdade.
- Depois de editar `CONFIG`, se você publicou as versões minificadas (`style.min.css` / `script.min.js`), rode o passo de "Atualizar a Landing" do [README.md](README.md#como-atualizar-a-landing-page) para regenerá-las.
- `telefone` só precisa ser digitado no formato "bonito" (`'+55 47 99999-9999'`) — o link `tel:` do rodapé remove automaticamente os espaços/traços/parênteses, não precisa deixar dois campos (um formatado, um só com dígitos).
- **Schema.org (SEO):** os telefones/e-mail/endereço/redes sociais também aparecem nos blocos `Organization` e `LocalBusiness` (JSON-LD) no `<head>` de `index.html`. Esses blocos são estáticos (não lêem o `CONFIG` via JavaScript, de propósito — ficam disponíveis a qualquer rastreador mesmo sem executar JS). Se alterar `telefone`, `email`, `endereco`, `instagram` ou `youtube` no `CONFIG`, atualize também os mesmos valores nesses blocos JSON-LD — ver comentário acima de cada bloco em `index.html`.
- **Botão "Copiar Chave PIX":** usa a Clipboard API moderna e cai automaticamente para `document.execCommand('copy')` em navegadores mais antigos (função `copyPixKeyToClipboard()` em `script.js`). Sempre copia `CONFIG.pixKey` sem pontuação — é o formato mais compatível com apps bancários, mesmo que a exibição no modal mostre a chave formatada.

---

## Vídeos — `VIDEO_MENTOR`, `VIDEOS_RECONHECIMENTO`, `VIDEOS_DEPOIMENTOS`

Desde a v1.1.0, os vídeos do site vivem em três estruturas separadas em `script.js` (logo antes de `setupVideoModal()`), uma para cada seção. Nenhum nome técnico (ex: "Vídeo 01", "Fernando e Sorocaba 01") é exibido na tela — cada vídeo tem seu próprio título e descrição de marketing, definidos aqui.

```js
// Seção "Quem será o seu mentor neste Workshop?" — vídeo único, sem carrossel
var VIDEO_MENTOR = {
  titulo: 'Quem será o seu mentor neste Workshop?',
  subtitulo: 'Conheça a trajetória de Juliomar Meskiu.',
  descricao: 'Uma história construída através da paixão pelo churrasco, da busca pela excelência e do reconhecimento de grandes nomes da música brasileira.',
  youtubeId: 'LggWGNBIojk',
  thumb: '',
  categoria: 'mentor',
  ordem: 1,
  data: ''
};

// Seção "Reconhecimento" — carrossel Premium
var VIDEOS_RECONHECIMENTO = [
  { titulo: 'Nos bastidores com Fernando & Sorocaba.', subtitulo: '', descricao: 'Um momento especial preparando cortes premium durante o evento.', youtubeId: 'F_ejLw9n8Nc', thumb: '', categoria: 'reconhecimento', ordem: 1, data: '' },
  // ... mais 3 itens
];

// Seção "O que nossos alunos dizem" — carrossel Premium
var VIDEOS_DEPOIMENTOS = [
  { titulo: 'Uma experiência que surpreende do início ao fim.', subtitulo: '', descricao: 'Veja a opinião de quem viveu essa experiência.', youtubeId: '-Ve5ZvQKFvU', thumb: '', categoria: 'depoimento', ordem: 1, data: '' },
  // ... mais 5 itens
];
```

Cada item (do mentor ou de qualquer vídeo dos carrosséis) aceita os mesmos campos:

| Chave | O que controla | Formato / exemplo |
|---|---|---|
| `titulo` | Texto principal exibido no card (ou, no vídeo do mentor, como eyebrow/título da seção) e usado como título do modal. Nunca um nome técnico — sempre a frase de marketing. | Texto: `'Cada detalhe faz a diferença.'` |
| `subtitulo` | Texto de apoio opcional, mais curto que a descrição. **Hoje só o vídeo do mentor usa** (exibido como legenda abaixo do player, na seção). Deixe `''` se não precisar. | Texto curto, ou `''` |
| `descricao` | Texto curto abaixo do título — some no card (carrosséis) ou na legenda (mentor). | Texto livre, uma frase |
| `youtubeId` | ID do vídeo no YouTube. Para links do tipo Shorts (`youtube.com/shorts/ID`), o ID é o trecho depois de `/shorts/`; para links normais (`youtube.com/watch?v=ID`), é o trecho depois de `v=`. | Texto: `'LggWGNBIojk'` |
| `thumb` | Caminho de uma miniatura customizada. **Opcional** — deixe `''` para usar automaticamente a miniatura oficial do próprio vídeo no YouTube. | Caminho relativo ou `''` |
| `categoria` | Identifica a que seção/grupo o vídeo pertence (informativo — hoje não filtra nada sozinho, mas já preparado para uso futuro). | Texto: `'mentor'`, `'reconhecimento'` ou `'depoimento'` |
| `ordem` | Posição do vídeo dentro do carrossel — **já funcional hoje**: os itens são ordenados por este número antes de renderizar. | Número inteiro, começando em `1` |
| `data` | Reservado para uso futuro (ex: data de gravação/publicação do vídeo). Não exibido em lugar nenhum ainda. | Texto livre, ou `''` |

### Como adicionar um novo vídeo num carrossel existente

1. Abra `script.js` e encontre `VIDEOS_RECONHECIMENTO` ou `VIDEOS_DEPOIMENTOS`.
2. Copie um dos objetos existentes, preencha `titulo`, `descricao`, `youtubeId` e `ordem` (e `subtitulo`/`thumb`/`categoria`/`data` se fizer sentido).
3. Salve. O card aparece automaticamente no carrossel, na posição definida por `ordem` — nada no HTML precisa ser tocado.

### Como trocar o vídeo do mentor

Edite os campos de `VIDEO_MENTOR` diretamente — `youtubeId` é o vídeo em si; `titulo`/`subtitulo`/`descricao` são o texto de apoio exibido na seção.

### Miniaturas (thumbnails)

Por padrão, a miniatura de cada vídeo é buscada **automaticamente do YouTube** (`https://img.youtube.com/vi/ID/hqdefault.jpg`, ou `maxresdefault.jpg` no vídeo do mentor) — não é preciso cadastrar nenhuma imagem. Só preencha `thumb` com um caminho em `assets/videos/` se quiser uma miniatura diferente da oficial do YouTube (ver [assets/README.md](assets/README.md)).

### Enquanto `youtubeId` estiver vazio

No mentor, a seção mostra um player desabilitado ("vídeo em breve" — mesmo tratamento da seção "Conheça a Experiência"). Nos carrosséis, o botão "Assistir vídeo" daquele card fica **desabilitado automaticamente** até que um ID real seja preenchido — evita abrir um modal com vídeo quebrado.

### Como funciona o modal de vídeo

- O iframe do YouTube só é criado no momento em que o usuário clica em "Assistir vídeo" (sem `autoplay`), usando `youtube-nocookie.com` e o parâmetro `rel=0` (reduz vídeos relacionados de outros canais ao final — o YouTube não permite removê-los por completo).
- Ao fechar o modal (X, ESC ou clique fora), o iframe é removido do DOM — isso interrompe a reprodução automaticamente, sem precisar de nenhuma biblioteca externa.
- O mesmo modal é reaproveitado pelos dois carrosséis — não existe um modal por seção, só um modal compartilhado.

### Carrossel Premium (Reconhecimento e O que nossos alunos dizem)

As duas seções usam exatamente o mesmo comportamento (`setupTestimonialsCarousel()` em `script.js`), sem nenhuma biblioteca externa:

- **Autoplay**: avança um grupo de cards a cada 8 segundos
- **Loop infinito**: ao chegar no fim, volta suavemente para o início
- **Pausa em hover** (desktop) e **em toque** (mobile) — retoma ~3s depois de soltar
- **Swipe**: nativo do navegador (o carrossel já é uma trilha com scroll horizontal + `scroll-snap`), nenhum código extra necessário
- **Setas** (`‹`/`›`) e **indicadores** (bolinhas abaixo do carrossel, uma por "página" de cards visíveis) — clicar em qualquer um pausa o autoplay temporariamente

Para criar um carrossel Premium novo (ex: uma seção futura), basta chamar `setupTestimonialsCarousel('idDoContainer', arrayDeVideos, openVideo)` — todo o comportamento acima vem de graça.

---

## Patrocinadores — `CONFIG.realizacao` e `CONFIG.parceiros`

Seção "Patrocinadores", posicionada logo antes da seção de Ingressos. Os dados vivem dentro do próprio `CONFIG` (topo de `script.js`) — não existe mais um objeto separado (`PATROCINADORES`) fora do `CONFIG`.

Desde a v1.0.7, a estrutura de parceiros é **por tier** (`CONFIG.parceiros`, um objeto com uma chave por tier), com a ordem de exibição e o rótulo de cada tier centralizados em `CATEGORIAS_PARCEIROS` (logo abaixo do `CONFIG`, em `script.js`). Isso permite criar uma tier nova (ex: uma faixa "Bronze") só editando esses dois pontos — nenhuma tier nova exige tocar no HTML.

```js
// dentro de CONFIG:
realizacao: { nome: 'Clube Carnivorista', logo: '' },
parceiros: {
  master: [],
  ouro: [],
  prata: [],
  oficiais: [
    { nome: 'Carvão Super-Fogo', logo: 'assets/patrocinadores/carvao-superfogo.webp.png', categoria: 'oficiais', instagram: 'https://www.instagram.com/carvao_superfogo/', whatsapp: '+55 42 98871-5565', site: '#', link: '', descricao: 'Carvão premium para um fogo intenso, estável e de alta performance.' },
    { nome: 'Faroeste Beer Co.', logo: 'assets/patrocinadores/chopp-faroeste3.jpg', categoria: 'oficiais', instagram: 'https://www.instagram.com/faroestebeer/', whatsapp: '+55 47 99192-2875', site: '#', link: '', descricao: 'Chopp artesanal que acompanha grandes momentos ao redor da brasa.' }
  ],
  apoio: []
}

// logo abaixo do CONFIG — ordem de exibição + rótulo de cada tier:
var CATEGORIAS_PARCEIROS = [
  { chave: 'master', label: 'Patrocinador Master' },
  { chave: 'ouro', label: 'Patrocinadores Ouro' },
  { chave: 'prata', label: 'Patrocinadores Prata' },
  { chave: 'oficiais', label: 'Parceiros Oficiais' },
  { chave: 'apoio', label: 'Apoio' }
];
```

A página renderiza os blocos **na ordem de `CATEGORIAS_PARCEIROS`**: Patrocinador Master → Patrocinadores Ouro → Patrocinadores Prata → Parceiros Oficiais → Apoio. Hoje só "Parceiros Oficiais" tem itens, então é o único bloco (além de "Realização") que aparece na página — as demais tiers ficam com `[]` e não geram bloco nenhum.

Cada item de uma tier aceita os mesmos campos:

| Chave | O que controla | Formato / exemplo |
|---|---|---|
| `nome` | Nome do parceiro/patrocinador. Usado como texto alternativo da imagem e tooltip ao passar o mouse (junto com `descricao`, se preenchida). | Texto: `'Casa de Carnes XYZ'` |
| `logo` | Caminho da logomarca. | Caminho relativo: `'assets/patrocinadores/xyz.png'` |
| `categoria` | Apenas identifica a que tier o item pertence (informativo — quem decide onde ele aparece é a chave de `CONFIG.parceiros` em que o objeto está). | Texto: mesma chave da tier, ex: `'oficiais'` |
| `instagram` | Link do Instagram. Use `'#'` enquanto não tiver sido informado — a logomarca não vira um link clicável até que `instagram`, `site` ou `link` tenham uma URL real. | URL completa, ou `'#'` |
| `whatsapp` | Número de WhatsApp do parceiro, só para referência/registro — **hoje não é usado como link clicável** (a prioridade de clique continua sendo `link` → `site` → `instagram`, sem `whatsapp` nessa lista). Se um dia fizer sentido oferecer contato direto por WhatsApp na logomarca, é só incluir `whatsapp` na prioridade de `buildSponsorLink()`. | Texto: `'+55 DD 9NNNN-NNNN'`, ou `''` se não houver |
| `site` | Link do site. Mesma regra do `instagram` acima. | URL completa, ou `'#'` |
| `link` | Link de destino ao clicar na logomarca (opcional). Tem prioridade sobre `site` e `instagram` se os três forem preenchidos. | URL completa |
| `descricao` | Descrição curta, opcional — some ao tooltip da logomarca (`"Nome — descrição"`). Deixe `''` se não houver. | Texto livre e curto |

### Como cadastrar o primeiro Patrocinador Master (ou Ouro/Prata/Apoio)

A tier já existe vazia em `CONFIG.parceiros` — só insira o item no array certo:

```js
parceiros: {
  master: [
    { nome: 'Casa de Carnes XYZ', logo: 'assets/patrocinadores/master-xyz.png', categoria: 'master', instagram: 'https://instagram.com/xyz', whatsapp: '+55 DD 9NNNN-NNNN', site: '#', link: '', descricao: '' }
  ],
  // ...
}
```

O bloco "Patrocinador Master" (com o logo em destaque, maior que os demais — classe `sponsor-logo--master`, aplicada automaticamente pela chave `master`) só aparece na página quando o array tiver pelo menos 1 objeto. Enquanto `master: []`, o bloco inteiro fica invisível — sem espaço vazio, sem título "fantasma".

### Como adicionar um novo parceiro/patrocinador numa tier existente

Insira um novo objeto no array da tier certa, dentro de `CONFIG.parceiros`:

```js
oficiais: [
  { nome: 'Casa de Carnes XYZ', logo: 'assets/patrocinadores/xyz.png', categoria: 'oficiais', instagram: 'https://instagram.com/xyz', whatsapp: '+55 DD 9NNNN-NNNN', site: '#', link: '', descricao: '' }
]
```

A grade (flexível, centralizada, quebra linha sozinha) se ajusta automaticamente à quantidade de itens — não existe número fixo de colunas por tela.

### Como criar uma tier totalmente nova (além das 4 já reservadas)

Adicione uma chave nova em `CONFIG.parceiros` e uma linha correspondente em `CATEGORIAS_PARCEIROS`, na posição em que ela deve aparecer:

```js
// CONFIG.parceiros
parceiros: {
  // ... tiers existentes ...
  bronze: []
}

// CATEGORIAS_PARCEIROS
var CATEGORIAS_PARCEIROS = [
  { chave: 'master', label: 'Patrocinador Master' },
  { chave: 'ouro', label: 'Patrocinadores Ouro' },
  { chave: 'prata', label: 'Patrocinadores Prata' },
  { chave: 'bronze', label: 'Patrocinadores Bronze' }, // nova
  { chave: 'oficiais', label: 'Parceiros Oficiais' },
  { chave: 'apoio', label: 'Apoio' }
];
```

### Como alterar os links de um item

Edite `link`, `site` ou `instagram` do item correspondente. Ao clicar na logomarca, a ordem de prioridade é: `link` → `site` (se não for `'#'`) → `instagram` (se não for `'#'`). Se nenhum dos três tiver uma URL real, a logomarca não vira um link clicável (fica só a imagem, sem `href` quebrado apontando para `#`).

### Bloco "Realização"

Sempre visível — é a identidade fixa do Clube Carnivorista, em `CONFIG.realizacao`, separado das tiers de parceiros acima. Se `realizacao.logo` estiver vazio, o nome (`realizacao.nome`) aparece como texto estilizado no lugar da imagem, então a seção nunca fica com um espaço vazio ou uma imagem quebrada.

---

## Pixels de Analytics/Anúncios

Os quatro placeholders ficam no `<head>` de `index.html`, comentados, logo abaixo do `<link rel="stylesheet">`:

| Pixel | O que faz | ID a substituir |
|---|---|---|
| Google Analytics 4 | Métricas de audiência e comportamento | `SEU_GA_ID` (Measurement ID, formato `G-XXXXXXX`) |
| Meta Pixel (Facebook/Instagram) | Rastreamento para campanhas no Meta Ads | `SEU_PIXEL_META_ID` |
| Google Ads Tag | Conversões de campanhas no Google Ads | `SEU_GOOGLE_ADS_ID` |
| Microsoft Clarity | Gravação de sessão e heatmap (gratuito) | `SEU_CLARITY_ID` |

### Como ativar um pixel

1. Abra `index.html`, encontre o bloco do pixel desejado (comentário `<!-- ... Pixel ... -->`).
2. Remova as tags `<!--` e `-->` que envolvem o `<script>`.
3. Substitua o ID de exemplo (`SEU_GA_ID`, `SEU_PIXEL_META_ID`, `SEU_GOOGLE_ADS_ID` ou `SEU_CLARITY_ID`) pelo ID real da sua conta.
4. Salve, teste localmente e publique. Nenhuma outra alteração é necessária — os eventos de conversão (ver abaixo) já detectam automaticamente qualquer pixel ativo.

## Eventos de conversão

Qualquer elemento HTML com o atributo `data-track-event="nome_do_evento"` dispara esse evento (via `fbq`, `gtag` e `clarity`, para qualquer um que estiver ativo) quando clicado. A lógica está em `setupConversionTracking()`, em `script.js`.

Eventos já configurados nos CTAs principais:

| Evento | Onde está |
|---|---|
| `cta_comprar` | Botões "Garantir Minha Vaga" (navbar, hero, flutuante) |
| `cta_entrar_grupo` | Botão "Entrar no Grupo do Evento" (WhatsApp) |
| `cta_whatsapp` | Link de WhatsApp do rodapé e botão "Enviar comprovante" do modal PIX |
| `cta_pix` | Botão "Pagar via PIX" |
| `cta_mercado_pago` | Botão "Pagar com Cartão" |

### Como adicionar um novo CTA rastreado

Adicione `data-track-event="nome_do_evento"` no elemento (botão ou link) em qualquer página que carregue `script.js`. Não precisa editar `script.js` — a busca por `[data-track-event]` já cobre qualquer elemento novo automaticamente.

Ver checklist de testes desses eventos em [CHECKLIST-LANCAMENTO.md](CHECKLIST-LANCAMENTO.md).
