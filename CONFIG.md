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

## Vídeos em grupo — `VIDEO_GROUPS`

Seção "Quem Já Viveu Essa Experiência". Assim como o `CONFIG`, fica no topo de `script.js`, logo antes de `setupVideoModal()`. É um **array de grupos** — cada grupo vira um carrossel próprio, com seu próprio título, dentro da mesma seção. A seção inteira (título de cada grupo, carrossel, cards e modal) é gerada automaticamente a partir daqui.

```js
var VIDEO_GROUPS = [
  {
    titulo: 'Conheça seu Mentor',
    items: [
      { titulo: 'Vídeo Currículo', descricao: 'A trajetória por trás do Clube Carnivorista.', youtubeId: 'LggWGNBIojk', thumb: '' }
    ]
  },
  {
    titulo: 'Depoimentos',
    items: [
      { titulo: 'Caroline', descricao: 'Depoimento sobre a experiência.', youtubeId: '-Ve5ZvQKFvU', thumb: '' },
      // ... mais 5 itens
    ]
  },
  {
    titulo: 'Reconhecimento',
    items: [
      { titulo: 'Fernando e Sorocaba 01', descricao: 'Reconhecimento ao Clube Carnivorista.', youtubeId: 'F_ejLw9n8Nc', thumb: '' },
      // ... mais 3 itens
    ]
  }
  // Novos grupos podem ser adicionados livremente, sem alterar HTML/CSS
];
```

| Chave | Nível | O que controla | Formato / exemplo |
|---|---|---|---|
| `titulo` | grupo | Nome do grupo, exibido como subtítulo acima do carrossel. | Texto: `'Depoimentos'` |
| `items` | grupo | Lista de vídeos daquele grupo — mesmo formato de item em qualquer grupo. | Array de objetos |
| `titulo` | item | Nome exibido no card e no título do modal. | Texto: `'Caroline'` |
| `descricao` | item | Texto curto abaixo do nome no card. | Texto livre, uma frase |
| `youtubeId` | item | ID do vídeo no YouTube. Para links do tipo Shorts (`youtube.com/shorts/ID`), o ID é o trecho depois de `/shorts/`; para links normais (`youtube.com/watch?v=ID`), é o trecho depois de `v=`. | Texto: `'LggWGNBIojk'` |
| `thumb` | item | Caminho de uma miniatura customizada. **Opcional** — deixe `''` (vazio) para usar automaticamente a miniatura oficial do próprio vídeo no YouTube, sem precisar cadastrar nenhum arquivo. | Caminho relativo ou `''` |

### Como adicionar um novo vídeo

1. Abra `script.js` e encontre o array `VIDEO_GROUPS` (logo após o comentário `VÍDEOS EM GRUPO`).
2. Encontre o grupo certo (ou crie um novo grupo, se for o caso) e copie um dos objetos existentes dentro de `items`, preenchendo `titulo`, `descricao`, `youtubeId` e, se quiser uma miniatura customizada, `thumb`.
3. Salve. O card aparece automaticamente no carrossel do grupo certo — nada no HTML precisa ser tocado.

### Como criar um novo grupo

Insira um novo objeto `{ titulo, items }` em `VIDEO_GROUPS`. Um carrossel novo, com seu próprio título e navegação independente, aparece automaticamente logo abaixo dos grupos existentes.

### Miniaturas (thumbnails)

Por padrão, a miniatura de cada vídeo é buscada **automaticamente do YouTube** (`https://img.youtube.com/vi/ID/hqdefault.jpg`) — não é preciso cadastrar nenhuma imagem. Só preencha `thumb` com um caminho em `assets/videos/` se quiser uma miniatura diferente da oficial do YouTube (ver [assets/README.md](assets/README.md)).

### Enquanto `youtubeId` estiver vazio

O botão "Assistir vídeo" daquele card fica **desabilitado automaticamente** (visual acinzentado, sem clique) até que um ID real seja preenchido — evita abrir um modal com vídeo quebrado.

### Como funciona o modal de vídeo

- O iframe do YouTube só é criado no momento em que o usuário clica em "Assistir vídeo" (sem `autoplay`), usando `youtube-nocookie.com` e o parâmetro `rel=0` (reduz vídeos relacionados de outros canais ao final — o YouTube não permite removê-los por completo).
- Ao fechar o modal (X, ESC ou clique fora), o iframe é removido do DOM — isso interrompe a reprodução automaticamente, sem precisar de nenhuma biblioteca externa.
- O mesmo modal é reaproveitado por qualquer grupo — não existe um modal por grupo, só um modal compartilhado.

---

## Patrocinadores — `PATROCINADORES`

Seção "Patrocinadores", posicionada logo antes da seção de Ingressos. Também fica no topo de `script.js`, logo após o `VIDEO_GROUPS`.

```js
var PATROCINADORES = {
  realizacao: { nome: 'Clube Carnivorista', logo: '' },
  master: { nome: '', logo: '', url: '' },
  patrocinadores: [],
  apoiadores: []
};
```

Cada logomarca (`master`, cada item de `patrocinadores` e de `apoiadores`) aceita os mesmos campos:

| Chave | O que controla | Formato / exemplo |
|---|---|---|
| `nome` | Nome do patrocinador/apoiador. Usado como texto alternativo da imagem e tooltip ao passar o mouse. | Texto: `'Casa de Carnes XYZ'` |
| `logo` | Caminho da logomarca. | Caminho relativo: `'assets/patrocinadores/xyz.png'` |
| `instagram` | Link do Instagram (opcional). | URL completa |
| `site` | Link do site (opcional). | URL completa |
| `link` | Link de destino ao clicar na logomarca (opcional). Tem prioridade sobre `site` e `instagram` se os três forem preenchidos. | URL completa |

### Como alterar o patrocinador master

Preencha os três campos de `master` em `PATROCINADORES`:

```js
master: {
  nome: 'Casa de Carnes XYZ',
  logo: 'assets/patrocinadores/master-xyz.png',
  url: 'https://instagram.com/xyz'
}
```

O bloco "Patrocinador Master" (com o logo em destaque, maior que os demais) só aparece automaticamente quando `logo` está preenchido — deixe `logo: ''` para escondê-lo enquanto não houver master fechado.

### Como adicionar um patrocinador

Insira um novo objeto no array `patrocinadores`:

```js
patrocinadores: [
  { nome: 'Casa de Carnes XYZ', logo: 'assets/patrocinadores/xyz.png', instagram: 'https://instagram.com/xyz' }
]
```

A grade de patrocinadores (4 colunas no desktop, 3 no tablet, 2 no mobile) só aparece automaticamente quando o array tem pelo menos um item.

### Como adicionar um apoiador

Mesma lógica, no array `apoiadores`:

```js
apoiadores: [
  { nome: 'Fornecedor ABC', logo: 'assets/patrocinadores/abc.png', site: 'https://abc.com.br' }
]
```

### Como alterar os links

Edite `link`, `site` ou `instagram` do item correspondente (master, patrocinador ou apoiador). Ao clicar na logomarca, a ordem de prioridade é: `link` → `site` → `instagram`. Se nenhum dos três estiver preenchido, a logomarca não vira um link clicável (fica só a imagem).

### Bloco "Realização"

Sempre visível — é a identidade fixa do Clube Carnivorista. Se `realizacao.logo` estiver vazio, o nome (`realizacao.nome`) aparece como texto estilizado no lugar da imagem, então a seção nunca fica com um espaço vazio ou uma imagem quebrada.

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
