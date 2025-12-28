---
description: Best practices for implementing animations in the SupArt project
---

# Animation Best Practices Workflow

## 🎯 Regra de Ouro: Use Framer Motion para Animações Críticas

**Por quê?**
CSS Modules + seletores complexos (`:checked + .sibling`) podem falhar silenciosamente.
Framer Motion garante 100% de funcionamento com animações declarativas.

## 📋 Quando usar cada abordagem

### ✅ Use Framer Motion quando:
- Animações dependem de **estado React** (toggle, accordion, modal)
- Precisa de **transições entre valores** (cores, posições, escalas)
- **Garantia absoluta** é necessária (elementos críticos como toggles)
- Animações com **gestos** (drag, tap, hover)

### ✅ Use CSS puro quando:
- Animações **puramente visuais** (hover effects simples, :focus)
- **Keyframes** que rodam indefinidamente (loading spinners)
- Não dependem de **estado React**

## 🛠️ Implementação com Framer Motion

```tsx
import { motion } from "framer-motion";

// Componente com animação baseada em estado
function AnimatedComponent({ isActive }) {
  return (
    <motion.div
      animate={{ 
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeInOut" 
      }}
    >
      {/* content */}
    </motion.div>
  );
}
```

## ⚠️ Erros a Evitar

1. **NÃO** use seletores `~` (irmão geral) em CSS Modules
2. **NÃO** confie em `transition: all` para propriedades complexas
3. **NÃO** anime propriedades de layout (`width`, `height`, `top`)
4. **SEMPRE** defina estados iniciais explícitos

## 🔧 Debug de Animações

Se animações não funcionarem:
1. Verifique se o elemento está sendo **recriado** (React key change)
2. Use `AnimatePresence` para elementos que entram/saem do DOM
3. Confira se não há CSS conflitante (DevTools > Computed)
4. **Última resort:** Reescreva com Framer Motion
