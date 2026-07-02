/* ========================================
   WORKSHOP DE CARNES PREMIUM — SCRIPTS
   ======================================== */

(function () {
  'use strict';

  /* ========== CONFIGURAÇÕES CENTRAIS (preencher depois) ========== */
  const CONFIG = {
    checkoutMercadoPago: 'https://link.mercadopago.com.br/workshopcanelinha001', // Link de checkout do Mercado Pago
    pixKey: '03362258905',                       // Chave PIX (CPF, somente dígitos — formato usado para copiar)
    pixKeyType: 'CPF',                           // Tipo da chave PIX, exibido no modal
    pixName: 'Juliomar Andrucho Meskiu',         // Nome do favorecido
    pixQRCode: 'assets/pix-qrcode.png',          // Imagem do QR Code PIX oficial (gerado a partir de pixCopiaECola)
    pixCopiaECola: '00020101021226850014br.gov.bcb.pix2563qrcodepix.bb.com.br/pix/v2/fac1e30b-d093-4ee2-9a78-8c4bb8e6bc095204000053039865406250.005802BR5924JULIOMAR_ANDRUCHO_MESKIU6007ITAPEMA62070503***6304C8B5', // Código Pix Copia e Cola — não alterar (contém checksum CRC16 no final)
    pixMaleValue: 250.00,                        // Valor do ingresso masculino
    pixFemaleValue: 220.00,                      // Valor do ingresso feminino
    whatsappContact: '5547996681010',            // Número do WhatsApp (com DDI), usado em contato e comprovante
    whatsappGroup: 'https://chat.whatsapp.com/I5w3cW0bZzB5L8NfFd4rdq?s=cl&p=a&mlu=3', // Link do grupo oficial do WhatsApp
    instagram: 'https://www.instagram.com/clubcarnivorista?igsh=MWc5cHd0eHBnanFnaw==', // Link do Instagram
    youtube: 'https://www.youtube.com/@ClubCarnivorista', // Link do canal do YouTube
    maps: 'https://maps.app.goo.gl/7mkaVDxP5CGRetEs6', // Link do Google Maps
    telefone: '+55 47 99668-1010',                // Telefone institucional (exibido formatado, usado em tel:)
    email: 'clubcarnivorista@gmail.com',          // E-mail institucional (usado em mailto:)
    endereco: 'Estrada Geral do Moura, Bairro Moura — Canelinha/SC', // Endereço institucional exibido no rodapé
    vagasAtuais: 32,                             // Número de inscritos atual
    vagasMax: 50,
    dataEvento: '29 de julho de 2026 (quarta-feira)', // Data oficial do evento
    horarioRecepcao: '19:00',                    // Horário de abertura/recepção
    horarioWorkshop: '19:30',                    // Horário de início do workshop
    videoExperienciaId: '',                      // ID do vídeo do YouTube da seção "Conheça a Experiência" (vazio = seção mostra placeholder "em breve")
    links: {                                     // Destinos usados na página links.html (Link in Bio)
      garantirVaga: 'https://workshop-carnes-premium.vercel.app/',      // Landing principal
      calculadora: 'https://creative-licorice-04e925.netlify.app/'      // EventCalc Pro v7
    },
    realizacao: {                                // Crédito de realização, na seção "Patrocinadores" (não é uma tier de parceiro)
      nome: 'Clube Carnivorista',
      logo: '' // ex: 'assets/patrocinadores/clube-carnivorista.png' — sem logo, exibe o nome em texto
    },
    parceiros: {                                 // Seção "Patrocinadores" — cada chave é uma tier. Tier vazia (`[]`) não aparece na página.
      master: [
        // { nome: '', logo: '', categoria: 'master', instagram: '#', whatsapp: '', site: '#', link: '', descricao: '' }
      ],
      ouro: [
        // { nome: '', logo: '', categoria: 'ouro', instagram: '#', whatsapp: '', site: '#', link: '', descricao: '' }
      ],
      prata: [
        // { nome: '', logo: '', categoria: 'prata', instagram: '#', whatsapp: '', site: '#', link: '', descricao: '' }
      ],
      oficiais: [ // Parceiros por permuta — hoje todos os cadastrados ficam aqui
        {
          nome: 'Carvão Super-Fogo',
          logo: 'assets/patrocinadores/carvao-superfogo.webp.png',
          categoria: 'oficiais',
          instagram: 'https://www.instagram.com/carvao_superfogo/',
          whatsapp: '+55 42 98871-5565', // ainda não usado como link clicável (ver CONFIG.md)
          site: '#', // pendente — site ainda não informado
          link: '',
          descricao: 'Carvão premium para um fogo intenso, estável e de alta performance.'
        },
        {
          nome: 'Faroeste Beer Co.',
          logo: 'assets/patrocinadores/chopp-faroeste3.jpg',
          categoria: 'oficiais',
          instagram: 'https://www.instagram.com/faroestebeer/',
          whatsapp: '+55 47 99192-2875', // ainda não usado como link clicável (ver CONFIG.md)
          site: '#', // pendente — site ainda não informado
          link: '',
          descricao: 'Chopp artesanal que acompanha grandes momentos ao redor da brasa.'
        }
      ],
      apoio: [
        // { nome: '', logo: '', categoria: 'apoio', instagram: '#', whatsapp: '', site: '#', link: '', descricao: '' }
      ]
    }
  };

  // Ordem de exibição das tiers de CONFIG.parceiros na seção "Patrocinadores" e o rótulo de
  // cada uma. Uma tier nova (ex: uma faixa "Bronze") só exige adicionar uma linha aqui + a
  // chave correspondente em CONFIG.parceiros — nenhum HTML precisa ser tocado.
  var CATEGORIAS_PARCEIROS = [
    { chave: 'master', label: 'Patrocinador Master' },
    { chave: 'ouro', label: 'Patrocinadores Ouro' },
    { chave: 'prata', label: 'Patrocinadores Prata' },
    { chave: 'oficiais', label: 'Parceiros Oficiais' },
    { chave: 'apoio', label: 'Apoio' }
  ];

  var VAGAS_MIN = 20;         // mínimo de participantes para o evento acontecer
  var QTY_MAX_POR_TIPO = 10;  // limite de ingressos por tipo no seletor de quantidade

  // Exposto para reuso em outras páginas do site (ex: obrigado.html)
  window.WORKSHOP_CONFIG = CONFIG;

  // Estado do carrinho — única fonte de verdade para quantidades selecionadas
  var cart = {
    masculino: 0,
    feminino: 0
  };

  function getTotal() {
    return (cart.masculino * CONFIG.pixMaleValue) + (cart.feminino * CONFIG.pixFemaleValue);
  }

  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function formatUnidades(qtd) {
    return qtd + (qtd === 1 ? ' unidade' : ' unidades');
  }

  /* ========== LINKS DINÂMICOS ========== */
  function setupLinks() {
    var btnWhatsApp = document.getElementById('btnWhatsApp');
    if (btnWhatsApp) btnWhatsApp.href = CONFIG.whatsappGroup;

    var footerIG = document.getElementById('footerInstagram');
    if (footerIG) footerIG.href = CONFIG.instagram;

    var footerYT = document.getElementById('footerYoutube');
    if (footerYT) footerYT.href = CONFIG.youtube;

    var footerWA = document.getElementById('footerWhatsApp');
    if (footerWA) footerWA.href = 'https://wa.me/' + CONFIG.whatsappContact;

    var footerMaps = document.getElementById('footerMaps');
    if (footerMaps) footerMaps.href = CONFIG.maps;

    var footerTelefone = document.getElementById('footerTelefone');
    var footerTelefoneText = document.getElementById('footerTelefoneText');
    if (footerTelefone) footerTelefone.href = 'tel:' + CONFIG.telefone.replace(/[^\d+]/g, '');
    if (footerTelefoneText) footerTelefoneText.textContent = CONFIG.telefone;

    var footerEmail = document.getElementById('footerEmail');
    var footerEmailText = document.getElementById('footerEmailText');
    if (footerEmail) footerEmail.href = 'mailto:' + CONFIG.email;
    if (footerEmailText) footerEmailText.textContent = CONFIG.email;

    var footerEndereco = document.getElementById('footerEndereco');
    if (footerEndereco) footerEndereco.textContent = CONFIG.endereco;
  }

  /* ========== PÁGINA LINKS (LINK IN BIO) ==========
   * Preenche os destinos dos botões de links.html a partir do CONFIG — nenhum
   * link fica hardcoded no HTML. Reaproveita CONFIG.whatsappGroup/youtube/instagram
   * (já centralizados para o resto do site) e usa CONFIG.links para os dois
   * destinos exclusivos desta página.
   */
  function setupLinksPage() {
    var map = {
      linkGarantirVaga: CONFIG.links.garantirVaga,
      linkCalculadora: CONFIG.links.calculadora,
      linkWhatsapp: CONFIG.whatsappGroup,
      linkYoutube: CONFIG.youtube,
      linkInstagram: CONFIG.instagram
    };

    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = map[id];
    });
  }

  /* ========== INFORMAÇÕES DO EVENTO (DATA E HORÁRIOS) ========== */
  // Preenche todo texto de data/horário a partir do CONFIG, evitando duplicar
  // esses valores em vários pontos do HTML (hero + FAQ)
  function setupEventInfo() {
    var campos = {
      infoData: CONFIG.dataEvento,
      infoRecepcao: CONFIG.horarioRecepcao,
      infoWorkshop: CONFIG.horarioWorkshop,
      faqData: CONFIG.dataEvento,
      faqRecepcao: CONFIG.horarioRecepcao,
      faqWorkshop: CONFIG.horarioWorkshop
    };

    Object.keys(campos).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = campos[id];
    });
  }

  /* ========== SELETOR DE QUANTIDADE DE INGRESSOS ========== */
  function setupQuantitySelector() {
    var precoMasculino = document.getElementById('precoMasculino');
    var precoFeminino = document.getElementById('precoFeminino');
    var qtyMaleValue = document.getElementById('qtyMaleValue');
    var qtyFemaleValue = document.getElementById('qtyFemaleValue');
    var qtyMaleMinus = document.getElementById('qtyMaleMinus');
    var qtyMalePlus = document.getElementById('qtyMalePlus');
    var qtyFemaleMinus = document.getElementById('qtyFemaleMinus');
    var qtyFemalePlus = document.getElementById('qtyFemalePlus');
    var summaryMale = document.getElementById('summaryMale');
    var summaryFemale = document.getElementById('summaryFemale');
    var summaryTotal = document.getElementById('summaryTotal');

    if (!qtyMaleValue || !qtyFemaleValue) return;

    // Preços exibidos nos cards refletem o CONFIG, evitando duplicação de valores no HTML
    if (precoMasculino) precoMasculino.textContent = CONFIG.pixMaleValue.toFixed(0);
    if (precoFeminino) precoFeminino.textContent = CONFIG.pixFemaleValue.toFixed(0);

    function render() {
      qtyMaleValue.textContent = cart.masculino;
      qtyFemaleValue.textContent = cart.feminino;

      if (summaryMale) summaryMale.textContent = formatUnidades(cart.masculino);
      if (summaryFemale) summaryFemale.textContent = formatUnidades(cart.feminino);
      if (summaryTotal) summaryTotal.textContent = formatCurrency(getTotal());

      updatePaymentButtonsState();
    }

    function updateQty(tipo, delta) {
      cart[tipo] = Math.max(0, Math.min(QTY_MAX_POR_TIPO, cart[tipo] + delta));
      render();
    }

    if (qtyMaleMinus) qtyMaleMinus.addEventListener('click', function () { updateQty('masculino', -1); });
    if (qtyMalePlus) qtyMalePlus.addEventListener('click', function () { updateQty('masculino', 1); });
    if (qtyFemaleMinus) qtyFemaleMinus.addEventListener('click', function () { updateQty('feminino', -1); });
    if (qtyFemalePlus) qtyFemalePlus.addEventListener('click', function () { updateQty('feminino', 1); });

    render();
  }

  /* ========== BOTÕES DE PAGAMENTO (PIX / CARTÃO) ========== */
  // Habilitados apenas quando há pelo menos 1 ingresso selecionado no carrinho
  function updatePaymentButtonsState() {
    var temItens = (cart.masculino + cart.feminino) > 0;

    var btnPixOpen = document.getElementById('btnPixOpen');
    if (btnPixOpen) btnPixOpen.disabled = !temItens;

    var btnCartao = document.getElementById('btnCartao');
    if (btnCartao) {
      btnCartao.setAttribute('aria-disabled', temItens ? 'false' : 'true');
      btnCartao.href = buildCheckoutUrl();
    }
  }

  /*
   * LIMITAÇÃO CONHECIDA — Cartão de Crédito / Mercado Pago
   * CONFIG.checkoutMercadoPago é um link estático (ex: um link de pagamento fixo
   * ou checkout Pro pré-configurado). Esse tipo de link não aceita valor dinâmico
   * via querystring, então hoje o cliente paga o valor configurado no próprio
   * Mercado Pago, podendo divergir do total calculado aqui se a quantidade for >1.
   *
   * Para suportar valor total dinâmico, é necessário criar uma "Preference" via
   * API do Mercado Pago (server-side, pois exige Access Token secreto) enviando
   * os itens do carrinho (cart.masculino, cart.feminino) e redirecionar o usuário
   * para o "init_point" retornado pela API. Quando essa integração existir, basta
   * substituir o corpo desta função por uma chamada ao backend que devolve a URL
   * de checkout já com o total correto.
   */
  function buildCheckoutUrl() {
    return CONFIG.checkoutMercadoPago;
  }

  /* ========== MODAL GENÉRICO (reaproveitado pelo PIX e pelos depoimentos em vídeo) ==========
   * Concentra a lógica de acessibilidade comum a qualquer modal do site:
   * abrir/fechar, bloquear scroll do body, ESC fecha, clique fora fecha,
   * prender o Tab dentro do modal (WCAG 2.1.2) e devolver o foco a quem abriu.
   */
  function createModalController(overlay, closeBtn, onClose) {
    var lastFocusedEl = null;

    function getFocusableEls() {
      return Array.prototype.filter.call(
        overlay.querySelectorAll('button, a[href], iframe'),
        function (el) { return el.offsetParent !== null; }
      );
    }

    function trapFocus(e) {
      if (e.key !== 'Tab' || !overlay.classList.contains('active')) return;

      var focusable = getFocusableEls();
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function open(triggerEl) {
      lastFocusedEl = triggerEl || document.activeElement;
      overlay.classList.add('active');
      document.body.classList.add('modal-open');

      // setTimeout: garante que o navegador já processou a troca de display
      // antes de mover o foco para dentro do modal
      setTimeout(function () { closeBtn.focus(); }, 0);
    }

    function close() {
      overlay.classList.remove('active');
      document.body.classList.remove('modal-open');
      if (lastFocusedEl) lastFocusedEl.focus();
      if (onClose) onClose();
    }

    closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });

    overlay.addEventListener('keydown', trapFocus);

    return { open: open, close: close };
  }

  // Copia um texto (chave PIX ou código Copia e Cola) para a área de transferência.
  // Usa a Clipboard API moderna e cai para document.execCommand('copy') (via
  // textarea temporário) em navegadores mais antigos ou quando a API moderna
  // não está disponível.
  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      var copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (e) {
        copied = false;
      }

      document.body.removeChild(textarea);
      if (copied) resolve(); else reject(new Error('copy command failed'));
    });
  }

  function showCopyFeedback(el, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.add('active');
    setTimeout(function () { el.classList.remove('active'); }, 2500);
  }

  // Formata uma chave PIX do tipo CPF (11 dígitos) como 000.000.000-00 para exibição.
  // Chaves de outro tipo (e-mail, telefone, aleatória) são exibidas como estão em CONFIG.pixKey.
  function formatPixKeyDisplay(key, type) {
    if (type === 'CPF' && /^\d{11}$/.test(key)) {
      return key.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return key;
  }

  /* ========== MODAL PIX ========== */
  function setupPixModal() {
    var btnOpen = document.getElementById('btnPixOpen');
    var overlay = document.getElementById('pixModalOverlay');
    var btnClose = document.getElementById('pixModalClose');

    if (!btnOpen || !overlay || !btnClose) return;

    var qrImage = document.getElementById('pixQRImage');
    var keyValue = document.getElementById('pixKeyValue');
    var keyTypeValue = document.getElementById('pixKeyTypeValue');
    var nameValue = document.getElementById('pixNameValue');
    var qtyMale = document.getElementById('pixQtyMale');
    var qtyFemale = document.getElementById('pixQtyFemale');
    var totalValue = document.getElementById('pixTotalValue');
    var sendProof = document.getElementById('pixSendProof');
    var copyBtn = document.getElementById('pixCopyKey');
    var copyFeedback = document.getElementById('pixCopyFeedback');
    var copyPasteBtn = document.getElementById('pixCopyPasteAndCopy');
    var copyPasteFeedback = document.getElementById('pixCopyPasteFeedback');

    keyValue.textContent = formatPixKeyDisplay(CONFIG.pixKey, CONFIG.pixKeyType);
    if (keyTypeValue) keyTypeValue.textContent = CONFIG.pixKeyType;
    nameValue.textContent = CONFIG.pixName;

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copyTextToClipboard(CONFIG.pixKey).then(function () {
          showCopyFeedback(copyFeedback, 'Chave PIX copiada.');
        }).catch(function () {
          showCopyFeedback(copyFeedback, 'Não foi possível copiar. Selecione a chave manualmente.');
        });
      });
    }

    if (copyPasteBtn) {
      copyPasteBtn.addEventListener('click', function () {
        copyTextToClipboard(CONFIG.pixCopiaECola).then(function () {
          showCopyFeedback(copyPasteFeedback, 'PIX copiado com sucesso.');
        }).catch(function () {
          showCopyFeedback(copyPasteFeedback, 'Não foi possível copiar. Tente novamente.');
        });
      });
    }

    var modal = createModalController(overlay, btnClose);

    function buildMessage(total) {
      return 'Olá!\n\n' +
        'Realizei o pagamento via PIX do Workshop de Carnes Premium.\n\n' +
        'Pedido:\n' +
        'Masculino: ' + cart.masculino + '\n' +
        'Feminino: ' + cart.feminino + '\n' +
        'Valor Total: ' + formatCurrency(total) + '\n\n' +
        'Estou enviando o comprovante para confirmação da inscrição.';
    }

    function openModal() {
      if (cart.masculino + cart.feminino === 0) return;

      var total = getTotal();

      qrImage.src = CONFIG.pixQRCode;
      qtyMale.textContent = cart.masculino;
      qtyFemale.textContent = cart.feminino;
      totalValue.textContent = formatCurrency(total);
      sendProof.href = 'https://wa.me/' + CONFIG.whatsappContact + '?text=' + encodeURIComponent(buildMessage(total));

      modal.open(btnOpen);
    }

    btnOpen.addEventListener('click', openModal);
  }

  /* ========== VÍDEOS (MENTOR, RECONHECIMENTO, DEPOIMENTOS) ==========
   * Fonte de verdade das seções "Quem será o seu mentor neste Workshop?",
   * "Reconhecimento" e "O que nossos alunos dizem". Cada vídeo tem título,
   * subtítulo (opcional), descrição curta, thumbnail, categoria, ordem e
   * data — pronto para aceitar filtros/ordenação futuros sem tocar em HTML.
   * Nenhum nome técnico (ex: "Vídeo 01", "Fernando e Sorocaba 01") é exibido
   * na tela — só título/subtítulo/descrição de marketing, definidos aqui.
   *
   * `thumb` é opcional: se vazio, a miniatura é buscada automaticamente no
   * próprio YouTube (https://img.youtube.com/vi/ID/hqdefault.jpg), sem
   * precisar cadastrar nenhuma imagem em assets/.
   */
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

  var VIDEOS_RECONHECIMENTO = [
    { titulo: 'Nos bastidores com Fernando & Sorocaba.', subtitulo: '', descricao: 'Um momento especial preparando cortes premium durante o evento.', youtubeId: 'F_ejLw9n8Nc', thumb: '', categoria: 'reconhecimento', ordem: 1, data: '' },
    { titulo: 'Quando a música encontra o churrasco.', subtitulo: '', descricao: 'Uma experiência exclusiva compartilhada com Fernando & Sorocaba.', youtubeId: 'uCscu0JA8to', thumb: '', categoria: 'reconhecimento', ordem: 2, data: '' },
    { titulo: 'O reconhecimento de quem entende de tradição.', subtitulo: '', descricao: 'Sampaio compartilha sua opinião sobre a experiência gastronômica.', youtubeId: 'nRy3q789WHU', thumb: '', categoria: 'reconhecimento', ordem: 3, data: '' },
    { titulo: 'Sabores que conquistam logo na primeira experiência.', subtitulo: '', descricao: 'Uma reação espontânea de quem experimentou nossos pratos.', youtubeId: 'tO70chPZI8w', thumb: '', categoria: 'reconhecimento', ordem: 4, data: '' }
  ];

  var VIDEOS_DEPOIMENTOS = [
    { titulo: 'Uma experiência que surpreende do início ao fim.', subtitulo: '', descricao: 'Veja a opinião de quem viveu essa experiência.', youtubeId: '-Ve5ZvQKFvU', thumb: '', categoria: 'depoimento', ordem: 1, data: '' },
    { titulo: 'Muito além de um simples churrasco.', subtitulo: '', descricao: 'Conhecimento, técnica e experiência reunidos em um único evento.', youtubeId: 'uP0dvhQBS_M', thumb: '', categoria: 'depoimento', ordem: 2, data: '' },
    { titulo: 'Cada detalhe faz a diferença.', subtitulo: '', descricao: 'Da escolha da carne ao ponto perfeito.', youtubeId: 'OwFPRmUVftI', thumb: '', categoria: 'depoimento', ordem: 3, data: '' },
    { titulo: 'Uma experiência que vale cada minuto.', subtitulo: '', descricao: 'Veja como foi participar do Workshop Carnes Premium.', youtubeId: 'bj7Bpea12sM', thumb: '', categoria: 'depoimento', ordem: 4, data: '' },
    { titulo: 'Muito mais que aprender a assar carne.', subtitulo: '', descricao: 'Um dia inteiro de conhecimento, sabores e networking.', youtubeId: 'Bbc7Zh_HuEQ', thumb: '', categoria: 'depoimento', ordem: 5, data: '' },
    { titulo: 'Um Workshop para quem busca excelência.', subtitulo: '', descricao: 'Conhecimento prático com técnicas realmente aplicáveis.', youtubeId: 'qzpw9ykXYwU', thumb: '', categoria: 'depoimento', ordem: 6, data: '' }
  ];

  // Exposto para reuso/depuração em outras páginas, mesmo padrão do WORKSHOP_CONFIG
  window.WORKSHOP_VIDEO_MENTOR = VIDEO_MENTOR;
  window.WORKSHOP_VIDEOS_RECONHECIMENTO = VIDEOS_RECONHECIMENTO;
  window.WORKSHOP_VIDEOS_DEPOIMENTOS = VIDEOS_DEPOIMENTOS;

  // Modal de vídeo — cria o iframe do YouTube somente quando o usuário clica em
  // "Assistir vídeo" (sem autoplay) e o remove ao fechar, interrompendo a reprodução.
  // Compartilhado por todos os carrosséis (Reconhecimento e Depoimentos usam a mesma instância).
  function setupVideoModal() {
    var overlay = document.getElementById('videoModalOverlay');
    var btnClose = document.getElementById('videoModalClose');
    var titleEl = document.getElementById('videoModalTitle');
    var frameEl = document.getElementById('videoModalFrame');

    if (!overlay || !btnClose || !titleEl || !frameEl) return function () {};

    var modal = createModalController(overlay, btnClose, function () {
      frameEl.innerHTML = ''; // remove o iframe ao fechar → interrompe a reprodução
    });

    return function openVideo(item, triggerEl) {
      if (!item || !item.youtubeId) return;

      titleEl.textContent = item.titulo;

      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + item.youtubeId + '?rel=0';
      iframe.title = item.titulo;
      iframe.setAttribute('allow', 'accelerometer; encrypted-media; gyroscope; picture-in-picture');
      iframe.allowFullscreen = true;
      frameEl.innerHTML = '';
      frameEl.appendChild(iframe);

      modal.open(triggerEl);
    };
  }

  // Miniatura oficial do YouTube para quem não tem thumb próprio cadastrado
  function youtubeThumbUrl(youtubeId) {
    return 'https://img.youtube.com/vi/' + youtubeId + '/hqdefault.jpg';
  }

  // Cria um <article> de card de vídeo (thumb + título + descrição + botão assistir)
  function createVideoCard(item, openVideo) {
    var card = document.createElement('article');
    card.className = 'testimonial-card';

    var thumbWrap = document.createElement('div');
    thumbWrap.className = 'testimonial-card__thumb-wrap';

    var img = document.createElement('img');
    img.className = 'testimonial-card__thumb';
    img.src = item.thumb || (item.youtubeId ? youtubeThumbUrl(item.youtubeId) : '');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';

    var play = document.createElement('span');
    play.className = 'testimonial-card__play';
    play.setAttribute('aria-hidden', 'true');
    play.textContent = '▶';

    thumbWrap.appendChild(img);
    thumbWrap.appendChild(play);

    var name = document.createElement('h3');
    name.className = 'testimonial-card__name';
    name.textContent = item.titulo;

    var desc = document.createElement('p');
    desc.className = 'testimonial-card__desc';
    desc.textContent = item.descricao;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn--primary testimonial-card__btn';
    btn.innerHTML = '<span aria-hidden="true">▶</span> Assistir vídeo';
    btn.setAttribute('aria-label', 'Assistir vídeo: ' + item.titulo);
    btn.disabled = !item.youtubeId; // sem ID de vídeo cadastrado, o botão fica desabilitado
    btn.addEventListener('click', function () { openVideo(item, btn); });

    card.appendChild(thumbWrap);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(btn);
    return card;
  }

  /* ========== CARROSSEL PREMIUM (autoplay, loop, pausa, indicadores) ==========
   * Usado por "Reconhecimento" e "O que nossos alunos dizem" — mesmo comportamento,
   * mesmo visual, mesmo desempenho. Sem biblioteca externa: o swipe no touch já
   * vem de graça do scroll nativo com scroll-snap (`.testimonials-track`); autoplay,
   * pausa em hover/toque e indicadores são somados por cima da navegação por setas.
   */
  var CAROUSEL_AUTOPLAY_MS = 8000;
  var CAROUSEL_RESUME_DELAY_MS = 3000;

  function getVisibleCardCount(track) {
    var card = track.querySelector('.testimonial-card');
    if (!card) return 1;
    var gap = parseFloat(getComputedStyle(track).gap) || 0;
    var cardWidth = card.getBoundingClientRect().width + gap;
    if (!cardWidth) return 1;
    return Math.max(1, Math.round(track.clientWidth / cardWidth));
  }

  function scrollTrackByCard(track, direction) {
    var card = track.querySelector('.testimonial-card');
    if (!card) return;
    var gap = parseFloat(getComputedStyle(track).gap) || 24;
    var amount = card.getBoundingClientRect().width + gap;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  }

  // Liga navegação por setas + estado habilitado/desabilitado de um carrossel
  function setupCarouselNav(track, prevBtn, nextBtn) {
    if (!prevBtn || !nextBtn) return;

    function updateNavState() {
      var maxScroll = track.scrollWidth - track.clientWidth - 1;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = maxScroll <= 0 || track.scrollLeft >= maxScroll;
    }

    prevBtn.addEventListener('click', function () { scrollTrackByCard(track, -1); });
    nextBtn.addEventListener('click', function () { scrollTrackByCard(track, 1); });
    track.addEventListener('scroll', updateNavState);
    window.addEventListener('resize', updateNavState);

    updateNavState();
  }

  // Autoplay + indicadores — troca de slide a cada 8s, loop infinito (volta ao
  // início ao chegar no fim), pausa ao passar o mouse (hover) ou tocar (touch)
  function setupCarouselAutoplay(track, prevBtn, nextBtn, dotsWrap, totalItems) {
    var timer = null;
    var paused = false;

    function isAtEnd() {
      return track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    }

    function tick() {
      if (paused) return;
      if (isAtEnd()) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollTrackByCard(track, 1);
      }
    }

    function start() {
      stop();
      timer = setInterval(tick, CAROUSEL_AUTOPLAY_MS);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function pause() { paused = true; }
    function resumeSoon() { setTimeout(function () { paused = false; }, CAROUSEL_RESUME_DELAY_MS); }

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', function () { paused = false; });
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resumeSoon, { passive: true });

    if (prevBtn) prevBtn.addEventListener('click', function () { pause(); resumeSoon(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { pause(); resumeSoon(); });

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      var visible = getVisibleCardCount(track);
      var pages = Math.max(1, Math.ceil(totalItems / visible));

      for (var i = 0; i < pages; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', 'Ir para o grupo ' + (i + 1) + ' de vídeos');
        dot.addEventListener('click', (function (pageIndex) {
          return function () {
            var card = track.querySelector('.testimonial-card');
            if (card) {
              var gap = parseFloat(getComputedStyle(track).gap) || 24;
              var amount = (card.getBoundingClientRect().width + gap) * getVisibleCardCount(track);
              track.scrollTo({ left: amount * pageIndex, behavior: 'smooth' });
            }
            pause();
            resumeSoon();
          };
        })(i));
        dotsWrap.appendChild(dot);
      }
      updateActiveDot();
    }

    function updateActiveDot() {
      if (!dotsWrap || !dotsWrap.children.length) return;
      var card = track.querySelector('.testimonial-card');
      if (!card) return;
      var visible = getVisibleCardCount(track);
      var gap = parseFloat(getComputedStyle(track).gap) || 24;
      var cardWidth = card.getBoundingClientRect().width + gap;
      var page = Math.round(track.scrollLeft / (cardWidth * visible));
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle('carousel-dot--active', i === page);
      });
    }

    track.addEventListener('scroll', updateActiveDot);
    window.addEventListener('resize', renderDots);

    renderDots();
    start();
  }

  // Gera o carrossel Premium completo (setas + trilha + indicadores) dentro do
  // container indicado, a partir de uma lista de vídeos — reaproveitado por
  // "Reconhecimento" e "O que nossos alunos dizem" (mesmo padrão, Etapa 04)
  function setupTestimonialsCarousel(containerId, items, openVideo) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var section = container.closest('section');

    if (!items.length) {
      if (section) section.hidden = true;
      return;
    }

    var ordenados = items.slice().sort(function (a, b) { return (a.ordem || 0) - (b.ordem || 0); });

    var carousel = document.createElement('div');
    carousel.className = 'testimonials-carousel';

    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'testimonials-nav testimonials-nav--prev';
    prevBtn.setAttribute('aria-label', 'Vídeo anterior');
    prevBtn.textContent = '‹';

    var track = document.createElement('div');
    track.className = 'testimonials-track';

    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'testimonials-nav testimonials-nav--next';
    nextBtn.setAttribute('aria-label', 'Próximo vídeo');
    nextBtn.textContent = '›';

    ordenados.forEach(function (item) {
      track.appendChild(createVideoCard(item, openVideo));
    });

    carousel.appendChild(prevBtn);
    carousel.appendChild(track);
    carousel.appendChild(nextBtn);
    container.appendChild(carousel);

    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'carousel-dots';
    container.appendChild(dotsWrap);

    setupCarouselNav(track, prevBtn, nextBtn);
    setupCarouselAutoplay(track, prevBtn, nextBtn, dotsWrap, ordenados.length);
  }

  function setupVideoSections() {
    var openVideo = setupVideoModal();
    setupTestimonialsCarousel('reconhecimentoCarousel', VIDEOS_RECONHECIMENTO, openVideo);
    setupTestimonialsCarousel('depoimentosCarousel', VIDEOS_DEPOIMENTOS, openVideo);
  }

  /* ========== VÍDEO EM DESTAQUE (SEÇÕES "MENTOR" E "CONHEÇA A EXPERIÊNCIA") ==========
   * Componente genérico reaproveitado pelas duas seções que têm 1 único vídeo em
   * destaque: mostra uma miniatura clicável (a imagem já é lazy) e cria o <iframe>
   * apenas quando o usuário clica em assistir. Sem autoplay, sem abrir nova aba,
   * com rel=0 para reduzir vídeos relacionados de outros canais ao final (parâmetro
   * oficial do YouTube — não é possível removê-los por completo).
   */
  function setupFeaturedVideo(config) {
    var wrapper = document.getElementById(config.wrapperId);
    var trigger = document.getElementById(config.triggerId);
    var thumb = document.getElementById(config.thumbId);
    var frame = document.getElementById(config.frameId);

    if (!wrapper || !trigger || !thumb || !frame) return;

    if (!config.youtubeId) {
      wrapper.classList.add('featured-video--empty');
      trigger.disabled = true;
      trigger.setAttribute('aria-label', 'Vídeo em breve');
      return;
    }

    thumb.src = 'https://img.youtube.com/vi/' + config.youtubeId + '/maxresdefault.jpg';
    thumb.hidden = false;

    trigger.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + config.youtubeId + '?rel=0';
      iframe.title = config.title;
      iframe.setAttribute('allow', 'accelerometer; encrypted-media; gyroscope; picture-in-picture');
      iframe.allowFullscreen = true;
      frame.innerHTML = '';
      frame.appendChild(iframe);
      frame.hidden = false;
      trigger.hidden = true;
    });
  }

  function setupExperienciaVideo() {
    setupFeaturedVideo({
      wrapperId: 'videoExperiencia',
      triggerId: 'videoExperienciaTrigger',
      thumbId: 'videoExperienciaThumb',
      frameId: 'videoExperienciaFrame',
      youtubeId: CONFIG.videoExperienciaId,
      title: 'Veja como será a experiência'
    });
  }

  // Seção "Quem será o seu mentor neste Workshop?" — mesmo componente de vídeo em
  // destaque, mais o texto de apoio (subtítulo/descrição do vídeo) logo abaixo
  function setupMentorVideo() {
    setupFeaturedVideo({
      wrapperId: 'videoMentor',
      triggerId: 'videoMentorTrigger',
      thumbId: 'videoMentorThumb',
      frameId: 'videoMentorFrame',
      youtubeId: VIDEO_MENTOR.youtubeId,
      title: VIDEO_MENTOR.titulo
    });

    var subtituloEl = document.getElementById('videoMentorSubtitulo');
    var descricaoEl = document.getElementById('videoMentorDescricao');
    if (subtituloEl) subtituloEl.textContent = VIDEO_MENTOR.subtitulo;
    if (descricaoEl) descricaoEl.textContent = VIDEO_MENTOR.descricao;
  }

  /* ========== PATROCINADORES ==========
   * Dados em CONFIG.realizacao e CONFIG.parceiros (ver topo do arquivo). Cada tier de
   * CONFIG.parceiros só aparece na página se tiver ao menos 1 item — para criar uma tier
   * nova, basta adicionar a chave em CONFIG.parceiros e uma linha em CATEGORIAS_PARCEIROS;
   * nenhum HTML precisa ser tocado. Para adicionar/remover um parceiro, basta
   * inserir/remover um objeto no array da tier correspondente.
   */

  // Prioridade de link ao clicar na logomarca: link explícito > site > instagram ("#" não conta como link)
  function buildSponsorLink(item) {
    return item.link || (item.site && item.site !== '#' ? item.site : '') || (item.instagram && item.instagram !== '#' ? item.instagram : '');
  }

  function createSponsorLogo(item, extraClass) {
    var href = buildSponsorLink(item);
    var el = document.createElement(href ? 'a' : 'div');
    el.className = 'sponsor-logo' + (extraClass ? ' ' + extraClass : '');

    if (href) {
      el.href = href;
      el.target = '_blank';
      el.rel = 'noopener';
    }
    if (item.nome) el.title = item.descricao ? item.nome + ' — ' + item.descricao : item.nome;

    var img = document.createElement('img');
    img.src = item.logo;
    img.alt = item.nome || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    el.appendChild(img);

    return el;
  }

  function setupPatrocinadores() {
    var realizacaoEl = document.getElementById('sponsorsRealizacao');
    if (realizacaoEl && CONFIG.realizacao) {
      if (CONFIG.realizacao.logo) {
        realizacaoEl.appendChild(createSponsorLogo(CONFIG.realizacao, 'sponsor-logo--realizacao'));
      } else {
        var wordmark = document.createElement('span');
        wordmark.className = 'sponsors-realizacao__wordmark';
        wordmark.textContent = CONFIG.realizacao.nome || 'Clube Carnivorista';
        realizacaoEl.appendChild(wordmark);
      }
    }

    var categoriasEl = document.getElementById('sponsorsCategorias');
    if (!categoriasEl || !CONFIG.parceiros) return;

    CATEGORIAS_PARCEIROS.forEach(function (categoria) {
      var itens = CONFIG.parceiros[categoria.chave];
      if (!itens || !itens.length) return;

      var block = document.createElement('div');
      block.className = 'sponsors-block reveal';

      var label = document.createElement('span');
      label.className = 'sponsors-block__label';
      label.textContent = categoria.label;
      block.appendChild(label);

      var grid = document.createElement('div');
      grid.className = 'sponsors-grid';
      var extraClass = categoria.chave === 'master' ? 'sponsor-logo--master' : '';
      itens.forEach(function (item) {
        grid.appendChild(createSponsorLogo(item, extraClass));
      });
      block.appendChild(grid);

      categoriasEl.appendChild(block);
    });
  }

  /* ========== CONTADOR DE VAGAS ========== */
  function setupVagasCounter() {
    var elMin = document.getElementById('vagasMin');
    var elMax = document.getElementById('vagasMax');
    var elAtual = document.getElementById('vagasAtual');
    var elBar = document.getElementById('vagasBar');

    if (!elMin || !elMax || !elAtual || !elBar) return;

    elMin.textContent = VAGAS_MIN;
    elMax.textContent = CONFIG.vagasMax;

    var target = CONFIG.vagasAtuais;
    var pct = Math.min((target / CONFIG.vagasMax) * 100, 100);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        elBar.style.width = pct + '%';
        animateNumber(elAtual, 0, target, 1200);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    observer.observe(elBar.closest('.vagas-counter'));
  }

  function animateNumber(el, start, end, duration) {
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ========== SCROLL REVEAL ========== */
  function setupScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ========== SMOOTH SCROLL (fallback) ========== */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ========== RASTREAMENTO DE CONVERSÃO (Meta Pixel / GA4 / Google Ads / Clarity) ==========
   * Dispara um evento em cada plataforma configurada, se ela estiver carregada (ver
   * placeholders de pixels no <head> de index.html). Enquanto nenhum pixel estiver
   * ativo, as checagens abaixo simplesmente não fazem nada — sem erro no console.
   *
   * Os CTAs que disparam eventos têm um atributo data-track-event no HTML:
   *   cta_comprar        → botões "Garantir Minha Vaga" (navbar, hero, flutuante)
   *   cta_entrar_grupo    → botão "Entrar no Grupo" do WhatsApp
   *   cta_whatsapp        → links de contato via WhatsApp (rodapé, comprovante do PIX)
   *   cta_pix              → botão "Pagar via PIX"
   *   cta_mercado_pago      → botão "Pagar com Cartão" (Mercado Pago)
   *
   * Para adicionar um novo CTA rastreado, basta adicionar data-track-event="nome_do_evento"
   * no elemento em qualquer página que carregue este script.js — nada mais precisa mudar aqui.
   */
  function trackEvent(eventName) {
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName);
    if (typeof window.gtag === 'function') window.gtag('event', eventName);
    if (typeof window.clarity === 'function') window.clarity('event', eventName);
  }

  function setupConversionTracking() {
    document.querySelectorAll('[data-track-event]').forEach(function (el) {
      el.addEventListener('click', function () {
        trackEvent(el.getAttribute('data-track-event'));
      });
    });
  }

  /* ========== INIT ========== */
  function init() {
    setupLinks();
    setupLinksPage();
    setupEventInfo();
    setupQuantitySelector();
    setupPixModal();
    setupVagasCounter();
    setupMentorVideo();
    setupExperienciaVideo();
    setupVideoSections();
    setupPatrocinadores();
    setupConversionTracking();
    setupScrollReveal();
    setupSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
