# 🎨 Handoff 4 — Design CSS Tokens & Superfícies Gráficas

*   **Cliente:** DMR Info Tecnologia
*   **Especialista Responsável:** UI Designer & Mestre Visual
*   **Data de Criação:** 30 de Maio de 2026
*   **Insumo de Entrada:** `3_copywriting_web.md`

---

## 🎨 1. PALETA DE CORES TÉCNICA (Variáveis HSL)

```css
:root {
  /* DNA Cromático Corporativo */
  --color-bg: hsl(222, 47%, 4%);             /* Preto Espacial Profundo */
  --color-surface: hsl(222, 40%, 8%);        /* Superfície Cinza/Azulada */
  --color-accent-cobalt: hsl(217, 91%, 60%); /* Azul Cobalto Ativo de Alta Tensão */
  --color-accent-cyan: hsl(180, 100%, 50%);  /* Ciano Digital de Segurança */
  --color-accent-orange: hsl(22, 100%, 50%); /* Cyber Laranja (Destaque e Alertas) */
  --color-text-primary: hsl(0, 0%, 96%);     /* Branco Gelo */
  --color-text-secondary: hsl(220, 14%, 70%);/* Cinza Suave de Altíssima Legibilidade */
  --color-border: rgba(255, 255, 255, 0.08); /* Borda Glass Fina e Sutil */
  --color-card-bg: rgba(255, 255, 255, 0.02);/* Card Translúcido Glassmorphic */
}
```

---

## 💎 2. REGRAS DE GLASSMORPHISM & GLOW BEAMS

```css
/* Card Premium Bento Glassmorphic */
.glass-card-premium {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 16px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.glass-card-premium:hover {
  border-color: rgba(255, 255, 255, 0.20);
  transform: translateY(-4px);
  box-shadow: 0 40px 80px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Feixe Glow Neon (Glow Beam) para Destaques Ativos */
.glow-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent-cyan), transparent);
  animation: glow-move 8s infinite linear;
}

@keyframes glow-move {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## 📐 3. ESPECIFICAÇÃO DE COMBINAÇÃO TIPOGRÁFICA

*   **Tipografia H1 / Títulos (Outfit):** Fonte Sans-Serif geométrica, moderna, com peso marcante de tecnologia corporativa.
    *   *Headline XL:* `font-size: 3.5rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;`
    *   *Sub-head:* `font-size: 1.25rem; font-weight: 400; color: var(--color-text-secondary); line-height: 1.6;`
*   **Tipografia Body (Plus Jakarta Sans):** Fonte Sans-Serif geométrica com excelente espaçamento, projetada especificamente para escaneabilidade e leitura em parágrafos curtos de até 2 linhas.
    *   *Body Copy:* `font-size: 1.0rem; font-weight: 300; letter-spacing: 0em; line-height: 1.6;`
