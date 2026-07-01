/* ========================================
   WORKSHOP DE CARNES PREMIUM — SCRIPTS
   ======================================== */

(function () {
  'use strict';

  /* ========== CONFIGURAÇÕES CENTRAIS (preencher depois) ========== */
  const CONFIG = {
    checkoutMercadoPago: '#',                    // Link de checkout do Mercado Pago
    pixKey: '00.000.000/0001-00',                // Chave PIX
    pixName: 'Workshop Carnes Premium',          // Nome do favorecido
    pixQRCode: 'assets/pix-qrcode.png',          // Imagem do QR Code PIX
    pixMaleValue: 250.00,                        // Valor do ingresso masculino
    pixFemaleValue: 220.00,                      // Valor do ingresso feminino
    whatsappContact: '5547999999999',            // Número do WhatsApp (com DDI), usado em contato e comprovante
    whatsappGroup: '#',                          // Link do grupo oficial do WhatsApp
    instagram: '#',                              // Link do Instagram
    youtube: '#',                                // Link do canal do YouTube
    maps: '#',                                   // Link do Google Maps
    telefone: '+55 47 99999-9999',               // Telefone institucional (exibido formatado, usado em tel:)
    email: 'contato@clubecarnivorista.com.br',   // E-mail institucional (usado em mailto:)
    endereco: 'Canelinha/SC',                    // Endereço institucional exibido no rodapé
    vagasAtuais: 32,                             // Número de inscritos atual
    vagasMax: 50,
    dataEvento: '29 de julho de 2026 (quarta-feira)', // Data oficial do evento
    horarioRecepcao: '19:00',                    // Horário de abertura/recepção
    horarioWorkshop: '19:30'                     // Horário de início do workshop
  };

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

  /* ========== MODAL PIX ========== */
  function setupPixModal() {
    var btnOpen = document.getElementById('btnPixOpen');
    var overlay = document.getElementById('pixModalOverlay');
    var btnClose = document.getElementById('pixModalClose');

    if (!btnOpen || !overlay || !btnClose) return;

    var qrImage = document.getElementById('pixQRImage');
    var keyValue = document.getElementById('pixKeyValue');
    var nameValue = document.getElementById('pixNameValue');
    var qtyMale = document.getElementById('pixQtyMale');
    var qtyFemale = document.getElementById('pixQtyFemale');
    var totalValue = document.getElementById('pixTotalValue');
    var sendProof = document.getElementById('pixSendProof');

    keyValue.textContent = CONFIG.pixKey;
    nameValue.textContent = CONFIG.pixName;

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

  /* ========== DEPOIMENTOS EM VÍDEO (CARROSSEL + MODAL) ==========
   * Lista de depoimentos — única fonte de verdade para o carrossel da seção
   * "Quem Já Viveu Essa Experiência". Para adicionar um novo depoimento, basta
   * inserir um novo objeto neste array (título, descrição, ID do YouTube e
   * caminho da miniatura). A seção inteira é gerada automaticamente a partir
   * daqui — nenhum HTML precisa ser tocado.
   */
  var TESTIMONIALS = [
    {
      titulo: 'Fernando',
      descricao: 'Depoimento sobre a experiência.',
      youtubeId: '',
      thumb: 'assets/videos/fernando.jpg'
    },
    {
      titulo: 'Sorocaba',
      descricao: 'Depoimento sobre a experiência.',
      youtubeId: '',
      thumb: 'assets/videos/sorocaba.jpg'
    },
    {
      titulo: 'Thauane',
      descricao: 'Participação especial.',
      youtubeId: '',
      thumb: 'assets/videos/thauane.jpg'
    },
    {
      titulo: 'Sampaio (Teodoro & Sampaio)',
      descricao: 'Experiência no evento.',
      youtubeId: '',
      thumb: 'assets/videos/sampaio.jpg'
    },
    {
      titulo: 'Clientes',
      descricao: 'Veja a opinião de quem participou.',
      youtubeId: '',
      thumb: 'assets/videos/clientes.jpg'
    }
  ];

  // Exposto para reuso/depuração em outras páginas, mesmo padrão do WORKSHOP_CONFIG
  window.WORKSHOP_TESTIMONIALS = TESTIMONIALS;

  // Modal de vídeo — cria o iframe do YouTube somente quando o usuário clica em
  // "Assistir depoimento" (sem autoplay) e o remove ao fechar, interrompendo a reprodução
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
      iframe.title = 'Depoimento de ' + item.titulo;
      iframe.setAttribute('allow', 'accelerometer; encrypted-media; gyroscope; picture-in-picture');
      iframe.allowFullscreen = true;
      frameEl.innerHTML = '';
      frameEl.appendChild(iframe);

      modal.open(triggerEl);
    };
  }

  // Gera os cards do carrossel a partir de TESTIMONIALS e liga a navegação (setas + swipe nativo)
  function setupTestimonials() {
    var section = document.getElementById('depoimentos');
    var track = document.getElementById('testimonialsTrack');
    var prevBtn = document.getElementById('testimonialsPrev');
    var nextBtn = document.getElementById('testimonialsNext');

    if (!section || !track) return;

    if (!TESTIMONIALS.length) {
      section.hidden = true;
      return;
    }

    var openVideo = setupVideoModal();

    TESTIMONIALS.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'testimonial-card';

      var thumbWrap = document.createElement('div');
      thumbWrap.className = 'testimonial-card__thumb-wrap';

      var img = document.createElement('img');
      img.className = 'testimonial-card__thumb';
      img.src = item.thumb;
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
      btn.innerHTML = '<span aria-hidden="true">▶</span> Assistir depoimento';
      btn.setAttribute('aria-label', 'Assistir depoimento de ' + item.titulo);
      btn.disabled = !item.youtubeId; // sem ID de vídeo cadastrado, o botão fica desabilitado
      btn.addEventListener('click', function () { openVideo(item, btn); });

      card.appendChild(thumbWrap);
      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(btn);
      track.appendChild(card);
    });

    if (!prevBtn || !nextBtn) return;

    function scrollByCard(direction) {
      var card = track.querySelector('.testimonial-card');
      if (!card) return;
      var gap = parseFloat(getComputedStyle(track).gap) || 24;
      var amount = card.getBoundingClientRect().width + gap;
      track.scrollBy({ left: amount * direction, behavior: 'smooth' });
    }

    function updateNavState() {
      var maxScroll = track.scrollWidth - track.clientWidth - 1;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = maxScroll <= 0 || track.scrollLeft >= maxScroll;
    }

    prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    nextBtn.addEventListener('click', function () { scrollByCard(1); });
    track.addEventListener('scroll', updateNavState);
    window.addEventListener('resize', updateNavState);

    updateNavState();
  }

  /* ========== PATROCINADORES ==========
   * Objeto central com os logos de realização, patrocinador master, patrocinadores
   * e apoiadores. Para adicionar/remover um patrocinador ou apoiador, basta
   * inserir/remover um objeto no array correspondente — a grade é gerada
   * automaticamente e cada bloco só aparece se tiver conteúdo configurado.
   */
  var PATROCINADORES = {
    realizacao: {
      nome: 'Clube Carnivorista',
      logo: '' // ex: 'assets/patrocinadores/clube-carnivorista.png' — sem logo, exibe o nome em texto
    },
    master: {
      nome: '',
      logo: '',
      url: ''
    },
    patrocinadores: [
      // { nome: '', logo: '', instagram: '', site: '', link: '' }
    ],
    apoiadores: [
      // { nome: '', logo: '', instagram: '', site: '', link: '' }
    ]
  };

  // Exposto para reuso/depuração, mesmo padrão do WORKSHOP_CONFIG
  window.WORKSHOP_PATROCINADORES = PATROCINADORES;

  // Prioridade de link ao clicar na logomarca: link explícito > site > instagram
  function buildSponsorLink(item) {
    return item.link || item.site || item.instagram || '';
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
    if (item.nome) el.title = item.nome;

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
    if (realizacaoEl && PATROCINADORES.realizacao) {
      if (PATROCINADORES.realizacao.logo) {
        realizacaoEl.appendChild(createSponsorLogo(PATROCINADORES.realizacao, 'sponsor-logo--realizacao'));
      } else {
        var wordmark = document.createElement('span');
        wordmark.className = 'sponsors-realizacao__wordmark';
        wordmark.textContent = PATROCINADORES.realizacao.nome || 'Clube Carnivorista';
        realizacaoEl.appendChild(wordmark);
      }
    }

    var masterBlock = document.getElementById('sponsorsMasterBlock');
    var masterEl = document.getElementById('sponsorsMaster');
    if (masterBlock && masterEl && PATROCINADORES.master && PATROCINADORES.master.logo) {
      masterEl.appendChild(createSponsorLogo(PATROCINADORES.master, 'sponsor-logo--master'));
      masterBlock.hidden = false;
    }

    var listBlock = document.getElementById('sponsorsListBlock');
    var gridEl = document.getElementById('sponsorsGrid');
    if (listBlock && gridEl && PATROCINADORES.patrocinadores && PATROCINADORES.patrocinadores.length) {
      PATROCINADORES.patrocinadores.forEach(function (item) {
        gridEl.appendChild(createSponsorLogo(item));
      });
      listBlock.hidden = false;
    }

    var apoiadoresBlock = document.getElementById('sponsorsApoiadoresBlock');
    var apoiadoresGrid = document.getElementById('sponsorsApoiadoresGrid');
    if (apoiadoresBlock && apoiadoresGrid && PATROCINADORES.apoiadores && PATROCINADORES.apoiadores.length) {
      PATROCINADORES.apoiadores.forEach(function (item) {
        apoiadoresGrid.appendChild(createSponsorLogo(item));
      });
      apoiadoresBlock.hidden = false;
    }
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
    setupEventInfo();
    setupQuantitySelector();
    setupPixModal();
    setupVagasCounter();
    setupTestimonials();
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
