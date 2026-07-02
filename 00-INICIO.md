# 00 — INÍCIO

Ponto de partida do projeto. Leia isto antes de qualquer outra coisa.

## O que é este projeto

Landing page de vendas do **Workshop de Carnes Premium**, evento oficial do **Clube Carnivorista** em Canelinha/SC. Site estático — HTML, CSS e JavaScript puros, sem framework, sem build, sem dependências. Publicado gratuitamente via GitHub + Vercel.

## Onde tudo fica

Ver [LOCALIZACAO_DO_PROJETO.md](LOCALIZACAO_DO_PROJETO.md) — pasta local, GitHub, Vercel e URL pública, tudo num só lugar.

## Ordem de leitura recomendada

| Ordem | Documento | Quando ler |
|---|---|---|
| 1 | **00-INICIO.md** (este arquivo) | Sempre, primeiro |
| 2 | [01-ESTRUTURA.md](01-ESTRUTURA.md) | Antes de mexer em qualquer pasta/arquivo pela primeira vez |
| 3 | [02-PUBLICACAO.md](02-PUBLICACAO.md) | Antes da primeira publicação |
| 4 | [03-ROTINA.md](03-ROTINA.md) | Toda vez que for alterar algo (é um checklist, não um texto corrido) |
| 5 | [04-HISTORICO.md](04-HISTORICO.md) | Para saber o que já mudou e em qual versão |
| 6 | [05-BACKUP.md](05-BACKUP.md) | Para configurar a rotina de segurança dos dados |

## Documentação técnica (complementar a esta)

Estes arquivos numerados (`00` a `05`) são a documentação **operacional** — "onde fica" e "como publicar". Para detalhes técnicos de configuração e código, use:

| Arquivo | Conteúdo |
|---|---|
| [README.md](README.md) | Guia técnico completo: instalar, rodar local, publicar, editar cada parte do site |
| [CONFIG.md](CONFIG.md) | Todas as configurações editáveis (preços, links, PIX, contato) — tudo centralizado em `script.js` |
| [DEPLOY.md](DEPLOY.md) | Publicação detalhada (Vercel, Netlify, domínio próprio) |
| [SECURITY.md](SECURITY.md) | Cabeçalhos de segurança e por que cada um existe |
| [CHANGELOG.md](CHANGELOG.md) | Histórico técnico detalhado de cada versão |
| `CHECKLIST-*.md` | Checklists específicos (publicação, testes, rollback, lançamento) |

## Regra mais importante do projeto

Toda configuração do site — preços, datas, vagas, links de contato, chave PIX — fica **centralizada em um único lugar**: o objeto `CONFIG` no topo de `script.js`. Nunca edite um valor direto no HTML se ele já existir no `CONFIG`. Ver [CONFIG.md](CONFIG.md) para a lista completa.

## Regra mais importante do fluxo de trabalho

A pasta local **é** o repositório Git — não existe cópia intermediária. Editou → `git add` → `git commit` → `git push` → a Vercel publica sozinha. Ver [02-PUBLICACAO.md](02-PUBLICACAO.md) para o fluxo completo e [03-ROTINA.md](03-ROTINA.md) para o checklist de cada alteração.
