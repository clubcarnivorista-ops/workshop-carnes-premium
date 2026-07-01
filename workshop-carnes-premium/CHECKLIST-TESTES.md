# Checklist de Testes — Workshop de Carnes Premium

## Matriz de dispositivos/navegadores

Testar o fluxo completo (seção "Casos de teste funcionais" abaixo) em cada combinação marcada como obrigatória. As demais são recomendadas quando houver tempo disponível.

| | Chrome | Safari | Edge | Firefox |
|---|---|---|---|---|
| **Desktop (Windows/Mac)** | Obrigatório | Recomendado (Mac) | Obrigatório | Recomendado |
| **Android** | Obrigatório | — | Recomendado | Recomendado |
| **iPhone (iOS)** | Recomendado | Obrigatório | — | — |

Resoluções de referência para o teste responsivo (rodar em pelo menos 3 delas, incluindo a menor e a maior):

- [ ] 320px (Android antigo / iPhone SE)
- [ ] 375px (iPhone padrão)
- [ ] 390px (iPhone 12+)
- [ ] 768px (tablet / breakpoint mobile do site)
- [ ] 1024px (tablet grande / breakpoint tablet do site)
- [ ] 1440px (desktop)

## Casos de teste funcionais

### Navegação e layout
- [ ] Nenhuma seção quebra ou gera overflow horizontal em nenhuma resolução da lista acima
- [ ] Barra fixa superior (navbar) permanece visível ao rolar
- [ ] Botão flutuante "Garantir Minha Vaga" aparece apenas em telas ≤768px
- [ ] Scroll suave ao clicar em links internos (`#ingressos`, `#pagamento`)
- [ ] Animações de "reveal" (fade-in ao rolar) disparam corretamente

### Ingressos e carrinho
- [ ] Botões `+`/`−` de cada tipo de ingresso incrementam/decrementam corretamente
- [ ] Quantidade não fica negativa nem passa do limite máximo por tipo
- [ ] Resumo da compra (unidades e total em R$) atualiza em tempo real
- [ ] Botões "Pagar via PIX" e "Pagar com Cartão" ficam desabilitados com carrinho vazio

### Modal PIX
- [ ] Abre ao clicar em "Pagar via PIX" com pelo menos 1 ingresso selecionado
- [ ] QR Code, chave PIX, favorecido e valor total corretos
- [ ] Botão "Enviar comprovante" abre o WhatsApp com a mensagem pré-preenchida correta
- [ ] Fecha ao clicar no X, pressionar ESC ou clicar fora do modal
- [ ] Foco do teclado vai para o botão de fechar ao abrir e volta para o botão que abriu ao fechar
- [ ] `Tab` não escapa do modal enquanto ele está aberto

### Depoimentos em vídeo
- [ ] Carrossel mostra 3 vídeos por vez no desktop, 2 no tablet (768–1024px) e 1 no mobile (<768px)
- [ ] Setas de navegação avançam/retrocedem um card por clique e desabilitam nas extremidades
- [ ] Arrastar/deslizar (touch) no carrossel funciona em dispositivos móveis
- [ ] Vídeo abre em modal ao clicar em "Assistir depoimento" (com pelo menos um `youtubeId` cadastrado)
- [ ] Vídeo não inicia automaticamente (sem autoplay)
- [ ] Vídeo para de tocar ao fechar o modal (X, ESC ou clique fora)

### Patrocinadores
- [ ] Bloco "Realização" sempre visível
- [ ] Blocos "Patrocinador Master", "Patrocinadores" e "Apoiadores" só aparecem quando há dados cadastrados
- [ ] Logomarcas com link abrem em nova aba

### FAQ
- [ ] Cada pergunta expande/recolhe individualmente
- [ ] Ícone `+`/`−` alterna corretamente

### Rodapé e links externos
- [ ] Links de Instagram, WhatsApp e Google Maps abrem corretamente em nova aba

### Acessibilidade
- [ ] Navegação completa da página só com teclado (Tab/Shift+Tab/Enter/Espaço/ESC)
- [ ] Indicador de foco (contorno dourado) visível em todos os elementos interativos
- [ ] Leitor de tela anuncia corretamente títulos de seção e botões (teste rápido com VoiceOver no iPhone ou TalkBack no Android)

### Performance/console
- [ ] Sem erros no console do navegador em nenhuma página (`index.html` e `obrigado.html`)
- [ ] Sem requisições falhas além das imagens ainda não cadastradas (ver [CHECKLIST-PUBLICACAO.md](CHECKLIST-PUBLICACAO.md))
- [ ] Rodar o Lighthouse (aba DevTools → Lighthouse, modo Mobile) e conferir Performance/Acessibilidade/Best Practices/SEO — anotar as notas no relatório de publicação

### Compartilhamento
- [ ] Link colado no WhatsApp mostra imagem, título e descrição (preview OG)
- [ ] Link colado no Twitter/X mostra o Twitter Card corretamente
