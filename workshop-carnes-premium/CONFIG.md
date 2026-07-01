# CONFIG.md — Configurações editáveis

Todas as configurações do site ficam centralizadas em **um único lugar**: o objeto `CONFIG` no topo do arquivo [`script.js`](script.js) (linhas ~9-25).

Não é preciso mexer em nenhum outro arquivo `.html` para alterar preço, vagas, data, links ou chave PIX — tudo passa por ali.

```js
const CONFIG = {
  checkoutMercadoPago: '#',
  pixKey: '00.000.000/0001-00',
  pixName: 'Workshop Carnes Premium',
  pixQRCode: 'assets/pix-qrcode.png',
  pixMaleValue: 250.00,
  pixFemaleValue: 220.00,
  whatsappContact: '5547999999999',
  whatsappGroup: '#',
  instagram: '#',
  maps: '#',
  vagasAtuais: 32,
  vagasMax: 50,
  dataEvento: '29 de julho de 2026 (quarta-feira)',
  horarioRecepcao: '19:00',
  horarioWorkshop: '19:30'
};
```

## Tabela de referência

| Chave | O que controla | Formato / exemplo |
|---|---|---|
| `checkoutMercadoPago` | Link de checkout do Mercado Pago. Usado no botão "Pagar com Cartão". | URL completa: `'https://mpago.la/xxxxxxx'` |
| `pixKey` | Chave PIX exibida no modal de pagamento. | Texto livre: CPF/CNPJ, e-mail, telefone ou chave aleatória |
| `pixName` | Nome do favorecido, exibido no modal PIX. | Texto: `'Nome Completo ou Razão Social'` |
| `pixQRCode` | Caminho da imagem do QR Code PIX. | Caminho relativo: `'assets/pix-qrcode.png'` |
| `pixMaleValue` | Preço do ingresso masculino. Aparece no card de ingressos, no resumo da compra e no total do PIX. | Número: `250.00` (sem `R$`, use ponto para centavos) |
| `pixFemaleValue` | Preço do ingresso feminino. Mesma lógica do item acima. | Número: `220.00` |
| `whatsappContact` | Número de WhatsApp usado para receber comprovante e contato direto no rodapé. | Somente dígitos, com DDI: `'55DDNNNNNNNNN'` |
| `whatsappGroup` | Link de convite do grupo oficial do WhatsApp. | URL completa: `'https://chat.whatsapp.com/xxxxxxx'` |
| `instagram` | Link do perfil do Instagram (rodapé). | URL completa: `'https://instagram.com/seuusuario'` |
| `maps` | Link do Google Maps com a localização do evento (rodapé). | URL completa do Google Maps |
| `vagasAtuais` | Número de inscritos já confirmados — alimenta a barra de progresso da seção "Vagas". | Número inteiro: `32` |
| `vagasMax` | Capacidade máxima de vagas do evento. | Número inteiro: `50` |
| `dataEvento` | Data do evento, exibida no topo da página e no FAQ. | Texto livre: `'29 de julho de 2026 (quarta-feira)'` |
| `horarioRecepcao` | Horário de abertura/recepção. | Texto: `'19:00'` |
| `horarioWorkshop` | Horário de início do workshop. | Texto: `'19:30'` |

## Observações importantes

- **`vagasMin` (mínimo de 20 participantes)** não está no `CONFIG` porque raramente muda — está na variável `VAGAS_MIN`, logo abaixo do `CONFIG` em `script.js`. Se precisar alterar, edite ali.
- **Não existem `precoMasculino`/`precoFeminino` separados do preço do PIX.** `pixMaleValue` e `pixFemaleValue` são usados tanto para calcular o total do PIX quanto para exibir o preço nos cards de ingresso — um único valor, uma única fonte de verdade.
- Depois de editar `CONFIG`, se você publicou as versões minificadas (`style.min.css` / `script.min.js`), rode o passo de "Atualizar a Landing" do [README.md](README.md#como-atualizar-a-landing-page) para regenerá-las.

---

## Depoimentos em vídeo — `TESTIMONIALS`

Seção "Quem Já Viveu Essa Experiência". Assim como o `CONFIG`, fica no topo de `script.js`, logo antes de `setupVideoModal()`. É um **array** — a seção inteira (carrossel, cards e modal) é gerada automaticamente a partir dele.

```js
var TESTIMONIALS = [
  {
    titulo: 'Fernando & Sorocaba',
    descricao: 'Depoimento sobre a experiência.',
    youtubeId: '',
    thumb: 'assets/videos/fernando.jpg'
  },
  // ...
];
```

| Chave | O que controla | Formato / exemplo |
|---|---|---|
| `titulo` | Nome do depoente, exibido no card e no título do modal. | Texto: `'Fernando & Sorocaba'` |
| `descricao` | Texto curto abaixo do nome no card. | Texto livre, uma frase |
| `youtubeId` | ID do vídeo no YouTube (o trecho depois de `v=` na URL, ex: `youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`). | Texto: `'dQw4w9WgXcQ'` |
| `thumb` | Caminho da miniatura personalizada do card. | Caminho relativo: `'assets/videos/fernando.jpg'` |

### Como adicionar um novo vídeo/depoimento

1. Abra `script.js` e encontre o array `TESTIMONIALS` (logo após o comentário `DEPOIMENTOS EM VÍDEO`).
2. Copie um dos objetos existentes e cole como um novo item do array, preenchendo `titulo`, `descricao`, `youtubeId` e `thumb`.
3. Salve. O carrossel, o card e o modal desse novo depoimento aparecem automaticamente — nada no HTML precisa ser tocado.

### Como trocar uma miniatura

Troque apenas o caminho em `thumb` para o arquivo novo (veja o formato recomendado em [assets/README.md](assets/README.md)).

### Enquanto `youtubeId` estiver vazio

O botão "Assistir depoimento" daquele card fica **desabilitado automaticamente** (visual acinzentado, sem clique) até que um ID de vídeo real seja preenchido — evita abrir um modal com vídeo quebrado.

### Como funciona o modal de vídeo

- O iframe do YouTube só é criado no momento em que o usuário clica em "Assistir depoimento" (sem `autoplay`).
- Ao fechar o modal (X, ESC ou clique fora), o iframe é removido do DOM — isso interrompe a reprodução automaticamente, sem precisar de nenhuma biblioteca externa.

---

## Patrocinadores — `PATROCINADORES`

Seção "Patrocinadores", posicionada logo antes da seção de Ingressos. Também fica no topo de `script.js`, logo após o `TESTIMONIALS`.

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
| `logo` | Caminho da logomarca. | Caminho relativo: `'assets/sponsors/xyz.png'` |
| `instagram` | Link do Instagram (opcional). | URL completa |
| `site` | Link do site (opcional). | URL completa |
| `link` | Link de destino ao clicar na logomarca (opcional). Tem prioridade sobre `site` e `instagram` se os três forem preenchidos. | URL completa |

### Como alterar o patrocinador master

Preencha os três campos de `master` em `PATROCINADORES`:

```js
master: {
  nome: 'Casa de Carnes XYZ',
  logo: 'assets/sponsors/master-xyz.png',
  url: 'https://instagram.com/xyz'
}
```

O bloco "Patrocinador Master" (com o logo em destaque, maior que os demais) só aparece automaticamente quando `logo` está preenchido — deixe `logo: ''` para escondê-lo enquanto não houver master fechado.

### Como adicionar um patrocinador

Insira um novo objeto no array `patrocinadores`:

```js
patrocinadores: [
  { nome: 'Casa de Carnes XYZ', logo: 'assets/sponsors/xyz.png', instagram: 'https://instagram.com/xyz' }
]
```

A grade de patrocinadores (4 colunas no desktop, 3 no tablet, 2 no mobile) só aparece automaticamente quando o array tem pelo menos um item.

### Como adicionar um apoiador

Mesma lógica, no array `apoiadores`:

```js
apoiadores: [
  { nome: 'Fornecedor ABC', logo: 'assets/sponsors/abc.png', site: 'https://abc.com.br' }
]
```

### Como alterar os links

Edite `link`, `site` ou `instagram` do item correspondente (master, patrocinador ou apoiador). Ao clicar na logomarca, a ordem de prioridade é: `link` → `site` → `instagram`. Se nenhum dos três estiver preenchido, a logomarca não vira um link clicável (fica só a imagem).

### Bloco "Realização"

Sempre visível — é a identidade fixa do Clube Carnivorista. Se `realizacao.logo` estiver vazio, o nome (`realizacao.nome`) aparece como texto estilizado no lugar da imagem, então a seção nunca fica com um espaço vazio ou uma imagem quebrada.
