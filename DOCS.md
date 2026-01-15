# 📚 DOCUMENTAÇÃO COMPLETA - SUPART-LP

> **Este arquivo contém TUDO que usamos no projeto. Consulte sempre que precisar.**

---

## 🛠️ STACK PRINCIPAL

| Tecnologia | Versão | O que faz |
|------------|--------|-----------|
| **Next.js** | 16 | Framework React com SSR e routing |
| **React** | 19 | Biblioteca de UI |
| **TypeScript** | 5.8 | Tipagem estática |
| **Tailwind CSS** | 4 | CSS utility-first |
| **Supabase** | 2.89 | Backend (banco de dados, auth) |

---

## 🎨 ANIMAÇÃO & EFEITOS

| Biblioteca | Import | O que faz |
|------------|--------|-----------|
| **Framer Motion** | `import { motion } from "framer-motion"` | Animações declarativas |
| **GSAP** | `import gsap from "gsap"` | Animações de alta performance |
| **Lenis** | `components/providers/SmoothScroll.tsx` | Scroll suave (butter-smooth) |
| **Canvas Confetti** | `import confetti from "canvas-confetti"` | Efeitos de celebração |

---

## 📦 COMPONENTES DE UI

### Localização: `components/ui/`

| Componente | Arquivo | O que faz |
|------------|---------|-----------|
| **ShinyButton** | `ShinyButton/` | Botão com efeito brilhante animado |
| **GlassButton** | `GlassButton/` | Botão estilo glassmorphism |
| **CopyButton** | `CopyButton/` | Botão para copiar texto |
| **Modal** | `Modal.tsx` | Popup/dialog centralizado |
| **Preloader** | `Preloader.tsx` | Tela de loading inicial |
| **LogoLoader** | `LogoLoader.tsx` | Loading animado com logo |
| **HamsterLoader** | `HamsterLoader.tsx` | Loading divertido com hamster |
| **SupArtLogo** | `SupArtLogo.tsx` | Logo SVG da empresa |
| **PremiumCard** | `PremiumCard.tsx` | Card com borda premium |
| **PremiumBorder** | `PremiumBorder.tsx` | Borda animada gradiente |
| **PremiumDivider** | `PremiumDivider.tsx` | Divisor estilizado |
| **AIBadge** | `AIBadge.tsx` | Badge "Powered by AI" |

---

## 🏠 SEÇÕES DA HOME

### Localização: `components/sections/`

| Seção | Arquivo | Onde aparece |
|-------|---------|--------------|
| **Hero3D** | `hero/Hero3D.tsx` | Primeira seção (topo) |
| **HeroChat** | `hero/HeroChat.tsx` | Hero alternativo com chat IA |
| **RotatingHeadline** | `hero/RotatingHeadline.tsx` | Títulos que rotacionam |
| **Solutions** | `features/Solutions.tsx` | Cards de soluções |
| **TechStackMarquee** | `features/TechStackMarquee.tsx` | Marquee de tecnologias |
| **BlogPreview** | `features/BlogPreview.tsx` | Preview dos posts do blog |
| **Method** | `Method.tsx` | Metodologia/processo |
| **DiagnosticSection** | `DiagnosticSection.tsx` | CTA + formulário diagnóstico |
| **AIAgentsSection** | `showcase/AIAgentsSection.tsx` | Agentes de IA |
| **ProjectShowcase** | `showcase/ProjectShowcase.tsx` | Cases/projetos |
| **PortfolioFull** | `showcase/PortfolioFull.tsx` | Portfolio completo |
| **BentoGrid** | `showcase/BentoGrid.tsx` | Grid estilo Bento |

---

## 🪝 HOOKS CUSTOMIZADOS

### Localização: `hooks/`

| Hook | Arquivo | O que faz |
|------|---------|-----------|
| **useCursorTracker** | `useCursorTracker.ts` | Rastreia posição do cursor |
| **useMagneticEffect** | `useMagneticEffect.ts` | Efeito magnético em elementos |
| **useScrollAnimation** | `useScrollAnimation.ts` | Animações baseadas no scroll |

---

## 🔧 UTILITÁRIOS (lib/)

### Localização: `lib/`

| Arquivo | O que faz |
|---------|-----------|
| `supabase.ts` | Cliente Supabase configurado |
| `i18n.tsx` | Sistema de tradução (PT/EN) |
| `gsap-config.ts` | Configurações globais do GSAP |
| `lenis-config.ts` | Configurações do smooth scroll |
| `ai-writer.ts` | Integração com Google AI |
| `utils.ts` | Funções utilitárias (cn, etc) |

---

## 📊 DADOS ESTÁTICOS

### Localização: `data/`

| Arquivo | Conteúdo |
|---------|----------|
| `services.ts` | Lista de serviços oferecidos |
| `projects.ts` | Projetos do portfolio |
| `testimonials.ts` | Depoimentos de clientes |
| `tech-stack.ts` | Tecnologias que dominamos |
| `blog.ts` | Posts do blog (mock) |
| `navigation.ts` | Links de navegação |
| `seo-keywords.ts` | Keywords para SEO |
| `site-config.ts` | Configurações do site |

---

## 🎨 ESTILOS GLOBAIS

### Localização: `app/`

| Arquivo | O que contém |
|---------|--------------|
| `globals.css` | Estilos base, scrollbar, utilitários |
| `typography.css` | Tipografia customizada |
| `animations.css` | Keyframes de animações |

---

## ⚙️ VARIÁVEIS DE AMBIENTE

```env
# Supabase (obrigatório)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Google AI (opcional)
GOOGLE_GENERATIVE_AI_API_KEY=xxx

# Discord Webhooks (opcional)
DISCORD_WEBHOOK_URL=xxx
```

---

## 🚀 COMANDOS

```bash
npm run dev      # Inicia desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia produção
npm run lint     # Verifica erros
npm run clean    # Limpa cache
```

---

## 📁 ESTRUTURA DE PASTAS

```
SupArt-LP/
├── app/            # Páginas (Next.js App Router)
├── components/     # Componentes React
│   ├── ui/         # Componentes reutilizáveis
│   ├── sections/   # Seções da landing page
│   ├── layout/     # Header, Footer
│   └── providers/  # Context providers
├── lib/            # Utilitários e configs
├── hooks/          # Hooks customizados
├── data/           # Dados estáticos
├── public/         # Assets (imagens, vídeos)
└── supabase/       # Migrations do banco
```

---

## 🎯 DESIGN SYSTEM

- **Cores**: Preto/Branco/Cinza (removemos roxos)
- **Glass Effect**: `backdrop-blur-2xl bg-white/60`
- **Border Radius**: `rounded-xl` (12px)
- **Font**: Inter (Google Fonts)
- **Dark Mode**: Suportado via `next-themes`

---

## 📍 IDs DAS SEÇÕES (para navegação)

| Seção | ID | Link |
|-------|-----|------|
| Home | `#home` | Topo da página |
| Soluções | `#solutions` | Cards de serviços |
| Método | `#method` | Processo/metodologia |
| Contato | `#contact` | Formulário diagnóstico |

---

**Última atualização**: 2026-01-14
