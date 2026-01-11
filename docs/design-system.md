# SupArt Design System & Visual Identity

Este documento define as regras visuais para garantir que o site da SupArt mantenha sua estética premium, cinematográfica e "Apple-dark".

---

## 1. Filosofia Visual
- **Cinematográfico**: O site deve parecer um filme. Use iluminação dramática, sombras profundas e contrastes fortes.
- **Profundidade**: Evite designs chapados. Use camadas, glassmorphism e sombras para criar profundidade 3D.
- **Minimalismo Rico**: Poucos elementos, mas cada um com acabamento perfeito (bordas sutis, texturas, micro-interações).

---

## 2. Paleta de Cores

### Fundo (Backgrounds)
- **Deep Space Black**: `#000000` (Preto absoluto para contraste máximo em telas OLED).
- **Glass Layers**: `rgba(255, 255, 255, 0.05)` com `backdrop-blur-xl`.

### Texto
- **Primary**: `var(--color-apple-off-white)` / `#F5F5F7` (Nunca branco puro `#FFFFFF` em grandes blocos de texto).
- **Secondary**: `#86868b` (Cinza médio para subtítulos).
- **Accent**: Gradientes sutis (Roxo/Azul/Rosa) apenas em momentos chave (botões, links, destaques).

### Badges & Elementos Especiais
- **AI Highlight**: Branco puro ou gradientes metálicos para elementos de IA.

---

## 3. Regras de Componentes

### Bordas e Cantos (Radius)
- **Cards e Containers**: `rounded-2xl` (24px) ou `rounded-3xl` (32px) para containers maiores.
- **Botões**: `rounded-full` (Pílula) para ações primárias.
- **Imagens**: Sempre com `rounded-xl` ou maior. Nunca cantos vivos.

### Glassmorphism (Vidro)
O efeito de vidro é a assinatura da marca.
- **Classe Base**: `bg-white/5 backdrop-blur-lg border border-white/10`.
- **Uso**: Cards de features, barras de navegação, badges flutuantes.

---

## 4. Elementos de Marca (Assets)

### Badge "Criado com IA"
Este selo deve ser usado em todas as imagens geradas por IA para manter transparência e autoridade tecnológica.

**Especificação:**
- **Layout**: Texto "CRIADO COM" (Small Caps, Opacidade 70%) + Box "IA" (Bold, Fundo Sólido/Glass).
- **Posicionamento**: Canto inferior esquerdo ou direito da imagem.
- **Margem**: `p-4` ou `p-6` da borda da imagem.

**Exemplo Visual:**
> [CRIADO COM] **[ IA ]**

---

## 5. Fotografia e Imagens
- **Estilo**: "Editorial Dark Mode".
- **Iluminação**: Luzes de recorte (rim light) coloridas ou quentes.
- **Assunto**: Pessoas reais ou avatares ultra-realistas em ambientes tecnológicos mas acolhedores.
- **Tratamento**: Vinheta sutil nas bordas para focar o olhar no centro.

---

## 6. Tipografia
- **Família**: Inter ou SF Pro Display.
- **Pesos**:
    - Títulos: `font-bold` ou `font-medium` (tracking-tight).
    - Corpo: `font-normal` (tracking-normal).
    - Labels/Badges: `font-semibold` (tracking-wide, uppercase).
