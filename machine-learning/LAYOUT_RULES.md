# 📐 Regras de Layout - Aprendizados do Projeto SupArt

> **Data**: 2026-01-18  
> **Contexto**: Refatoração da seção AiAgents para layout responsivo mobile/desktop

---

## 🚨 Erros Fatais Cometidos (Não Repetir!)

### 1. Usar `scale` para Layout

```tsx
// ❌ ERRADO - scale quebra o fluxo do documento
<div className="scale-[0.4] origin-top-left">
    <AIFlowDiagram />
</div>
```

**Problema**: `transform: scale()` altera o tamanho visual mas NÃO o espaço no DOM. Cria "margens fantasmas" que empurram outros elementos.

### 2. Passar `w-full h-full` para Componentes com Pixels Fixos

```tsx
// ❌ ERRADO - distorce elementos internos
<PhoneMockup className="w-full h-full" />
```

**Problema**: Se o componente interno tem `rounded-[55px]`, `absolute top-20`, etc., esses valores não escalam proporcionalmente.

### 3. Misturar Controle de Tamanho

```tsx
// ❌ ERRADO - componente E container tentam controlar tamanho
<div className="w-[300px]">
    <PhoneMockup size="sm" className="w-full" />
</div>
```

**Problema**: Responsabilidade duplicada. Ou o componente decide, OU o container decide.

---

## ✅ Padrões Corretos

### Padrão 1: "Container Inteligente, Componente Burro"

**Para componentes FLUIDOS (sem pixels fixos internos):**

```tsx
// Componente é "burro" - aceita qualquer tamanho
export const Card = ({ className }: Props) => (
    <div className={`w-full h-full ${className}`}>
        {/* Conteúdo usa % ou flex/grid */}
    </div>
);

// Container controla o tamanho
<div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
    <Card />
</div>
```

### Padrão 2: "Scale Interno para Componentes Complexos"

**Para componentes com PIXELS FIXOS internos (mockups, ícones complexos):**

```tsx
// Scale é aplicado DENTRO do componente
const scaleValues = {
    sm: 'scale-50',
    md: 'scale-75', 
    lg: 'scale-100',
};

const wrapperSizes = {
    sm: 'w-[140px] h-[290px]',
    md: 'w-[210px] h-[435px]',
    lg: 'w-[280px] h-[580px]',
};

export const PhoneMockup = ({ size = 'lg', className }: Props) => (
    // Wrapper externo define espaço no DOM
    <div className={`${wrapperSizes[size]} ${className}`}>
        {/* Wrapper interno aplica scale */}
        <div className={`w-[280px] h-[580px] origin-top-left ${scaleValues[size]}`}>
            {/* Elementos com pixels fixos */}
        </div>
    </div>
);

// Uso - className para layout, size para dimensão
<PhoneMockup size="sm" className="rotate-3 hover:rotate-0" />
```

---

## 📋 Hierarquia de Responsabilidades

| Camada | Responsabilidade | CSS Típico |
|--------|------------------|------------|
| **Página (Pai)** | Define Grid/Layout geral | `grid grid-cols-1 md:grid-cols-2 gap-8` |
| **Wrapper (Div)** | Controla posição e tamanho | `w-full h-[400px] md:h-[600px] relative` |
| **Componente** | Apenas preenche o wrapper | `w-full h-full` ou tamanho fixo + scale |

---

## 🎯 Quando Usar Cada Abordagem

### Use `w-full h-full` (Fluido)

- Componentes com layout interno flexível
- Cards, containers, seções
- Elementos que usam `%`, `flex`, `grid` internamente

### Use `scale` interno com `size` prop

- Mockups de dispositivos (iPhone, laptop)
- Componentes com `rounded-[Xpx]` fixos
- Elementos com posicionamento absoluto em pixels
- Ícones/ilustrações complexas com SVG fixo

---

## 🔧 Template de Componente Correto

### Componente Fluido

```tsx
interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export const Card = ({ className = '', children }: CardProps) => (
    <div className={`w-full h-full ${className}`}>
        {children}
    </div>
);
```

### Componente com Scale

```tsx
interface MockupProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const scales = { sm: 'scale-50', md: 'scale-75', lg: 'scale-100' };
const wrappers = { 
    sm: 'w-[Xpx] h-[Ypx]', 
    md: 'w-[X*0.75px] h-[Y*0.75px]', 
    lg: 'w-[Xpx] h-[Ypx]' 
};

export const Mockup = ({ className = '', size = 'lg' }: MockupProps) => (
    <div className={`${wrappers[size]} ${className}`}>
        <div className={`w-[Xpx] h-[Ypx] origin-top-left ${scales[size]}`}>
            {/* Conteúdo fixo */}
        </div>
    </div>
);
```

---

## ⚠️ Checklist Antes de Implementar Layout

1. [ ] O componente tem pixels fixos internos (`rounded-[Xpx]`, `absolute top-X`)?
   - **SIM** → Use scale interno
   - **NÃO** → Use w-full h-full

2. [ ] Estou usando `scale` para layout?
   - **SIM** → PARE! Use Grid/Flexbox
   - **NÃO** → ✅

3. [ ] Container E componente tentam controlar tamanho?
   - **SIM** → PARE! Escolha UM responsável
   - **NÃO** → ✅

4. [ ] Testei em mobile E desktop?
   - **SIM** → ✅
   - **NÃO** → TESTE AGORA

---

## 📱 Layout Mobile-First

```tsx
// Sempre defina mobile primeiro, depois override para desktop
<div className="
    // Mobile (padrão)
    flex flex-col gap-4 p-4
    
    // Tablet (md:)
    md:flex-row md:gap-8 md:p-6
    
    // Desktop (lg:)
    lg:grid lg:grid-cols-2 lg:gap-12 lg:p-8
">
```

---

## 🏆 Resumo Final

| Situação | Solução |
|----------|---------|
| Layout da página | Grid/Flexbox, NUNCA scale |
| Componente fluido | `w-full h-full` + container controla |
| Componente com pixels fixos | Scale INTERNO + wrapper com tamanho real |
| Responsividade | Breakpoints `sm:`, `md:`, `lg:` no container |
| Posicionamento | `className` do componente, NUNCA props internas de posição |

---

*Documentação gerada a partir da sessão de refatoração AiAgents - SupArt LP*
