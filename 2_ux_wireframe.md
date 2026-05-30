# 🗺️ Handoff 2 — Wireframe de Usabilidade & Especificações de Grids

*   **Cliente:** DMR Info Tecnologia
*   **Especialista Responsável:** UX Designer & Arquiteto de Usabilidade
*   **Data de Criação:** 30 de Maio de 2026
*   **Insumo de Entrada:** `1_direcao_criativa.md`

---

## 📐 1. BLUEPRINT DO WIREFRAME (Estrutura de Bento Grid por Seção)

### 📌 Seção 1: Hero / Dobra Principal
*   **Arquitetura do Grid:** Bento Grid assimétrico composto por um layout de `2 colunas principais x 1 linha`.
*   **Coluna Esquerda (Larga - 60%):** Título principal (H1 Monumental), subtexto denso focado na proposta de valor de alto contraste e contêiner flexível abrigando botões de CTAs com física magnética ativa (`Solicitar Orçamento` e `Falar com Especialista`).
*   **Coluna Direita (Estreita - 40%):** Área exclusiva do canvas WebGL embutido (`<canvas id="canvas-3d">`), onde renderizaremos o cosmos tridimensional de partículas conectivas flutuantes.
*   **Seção de Rodapé do Topo (Full Width):** Faixa contendo carrossel infinito e horizontal de logos de marcas de autoridade/certificações que confiam nos projetos.

### 📌 Seção 2: Bento Grid de Diferenciais (Benefícios)
*   **Arquitetura do Grid:** Bento Grid assimétrico de `4 colunas` em uma única linha responsiva (que quebra para grid simples de 1 coluna em smartphones).
*   **Card 2.1 (Atendimento Especializado):** Contêiner de vidro com ícone cibernético iluminado em ciano, título e linha de descrição precisa do suporte técnico.
*   **Card 2.2 (Soluções Sob Medida):** Efeito hover de leve zoom com feixe brilhante azul cobalto, focando no diferencial consultivo sem desperdício financeiro.
*   **Card 2.3 (Segurança e Confiabilidade):** Destaque visual ciano, representando a robustez da proteção patrimonial e de dados de ponta.
*   **Card 2.4 (Suporte Ágil):** Ícone em cyberpunk orange com pulso tátil discreto e micro-copy indicando SLA garantido.

### 📌 Seção 3: Grid de Serviços em Destaque
*   **Arquitetura do Grid:** Grid simétrico de `2 colunas x 2 linhas` de Bento Cards expandidos.
*   **Cards (Consultoria / Infraestrutura / Segurança / Cloud):** Cada card possui fundo glassmorphic translúcido, borda com gradiente sutil, título destacado, frase explicativa centrada na eliminação das dores de gargalo técnico, e um pequeno botão minimalista "Saiba mais" que abre modal dinâmico rico com detalhes adicionais da solução técnica.

### 📌 Seção 4: Bento Soluções por Perfil
*   **Arquitetura do Grid:** Bento Grid assimétrico de `3 colunas` (Pequenas Empresas - 30%, Médias Empresas - 30%, Corporações Grandes - 40%).
*   **Cards de Soluções:** Cada perfil de contêiner possui layout interativo próprio, apresentando a infraestrutura recomendada e link magnético de conversão.

### 📌 Seção 5: Bloco Institucional e Prova Social
*   **Arquitetura do Grid:** Layout híbrido horizontal. À esquerda, depoimentos com tipografia densa e autoridade; à direita, história curta da empresa e anos de experiência, finalizando com o botão de manifesto de elite "Conheça a DMRInfo".

### 📌 Seção 6: CTA Final e Conversão Instantânea
*   **Arquitetura do Grid:** Contêiner de tela cheia (full-width) com cor de destaque de alto contraste de fundo (`hsl(222, 40%, 8%)`).
*   **Elementos do Contêiner:** Headline gigante de urgência, micro-copy focado em simplificação de faturamento técnico, e o formulário de captação enxuto e qualificado (Nome, Empresa, Telefone, Serviço, Mensagem) com validação dinâmica JavaScript instantânea.

---

## 🔄 2. SISTEMA DE INTERAÇÕES E ROLAGEM

*   **Comportamento do Scroll:** Rolagem amortecida com física de inércia suave implementada via **Lenis Scroll**, eliminando qualquer engasgo visual. Efeito de leve rotação física (tilt/skew) nos Bento Cards ao mover a página.
*   **Cursor Customizado:** Um cursor circular estético cinza-claro de lag dinâmico (com física de mola), que se expande, inverte cores e exibe pequenos textos informativos (ex: "Clique" ou "Ver") ao planar sobre cards e links ativos.
*   **Transição de Entrada:** Revelação tátil e revelada via gatilhos de **GSAP ScrollTrigger**, animando suavemente Bento Cards de opacidade `0` para `1` com leve deslocamento vertical ao entrar no campo de visão (viewport).

---

> [!IMPORTANT]
> Todos os cartões Bento e contêineres interativos devem possuir classes CSS de alta fidelidade visual, IDs únicos estruturados para fins de validação técnica e estrita responsividade móvel (mobile-first), garantindo legibilidade perfeita e toques táteis confortáveis em telas de celulares.
