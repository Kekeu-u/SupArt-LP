import { z } from 'zod';

// ═══════════════════════════════════════════
// 📝 CONSTANTES - Opções dos Selects
// ═══════════════════════════════════════════

export const ROLE_OPTIONS = [
    { value: 'ceo', label: 'CEO/Fundador' },
    { value: 'marketing_director', label: 'Diretor de Marketing' },
    { value: 'manager', label: 'Gerente' },
    { value: 'freelancer', label: 'Freelancer/Autônomo' },
    { value: 'other', label: 'Outro' },
] as const;

export const REFERRAL_OPTIONS = [
    { value: 'google', label: 'Google' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'referral', label: 'Indicação' },
    { value: 'other', label: 'Outro' },
] as const;

export const DECISION_MAKER_OPTIONS = [
    { value: 'final', label: 'Sim, sou o decisor final', icon: '👑' },
    { value: 'joint', label: 'Decido em conjunto (Sócios/Diretoria)', icon: '🤝' },
    { value: 'influencer', label: 'Pesquiso para o decisor aprovar', icon: '🕵️' },
    { value: 'no', label: 'Não tenho poder de decisão', icon: '❌' },
] as const;

export const WEBSITE_STATUS_OPTIONS = [
    { value: 'none', label: 'Não tenho site', icon: '🚫' },
    { value: 'outdated', label: 'Tenho, mas está desatualizado', icon: '⚠️' },
    { value: 'active', label: 'Tenho e funciona bem', icon: '✅' },
] as const;

export const SOCIAL_CHANNELS_OPTIONS = [
    { value: 'instagram', label: 'Instagram', icon: '📸' },
    { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { value: 'tiktok', label: 'TikTok', icon: '🎵' },
    { value: 'facebook', label: 'Facebook', icon: '👥' },
    { value: 'youtube', label: 'YouTube', icon: '▶️' },
    { value: 'none', label: 'Nenhuma', icon: '❌' },
] as const;

// ═══════════════════════════════════════════
// 🤖 OPÇÕES FOCADAS EM AUTOMAÇÃO
// ═══════════════════════════════════════════

export const ATTENDANCES_OPTIONS = [
    { value: '0_50', label: '0 - 50 atendimentos/mês', icon: '📊' },
    { value: '51_200', label: '51 - 200 atendimentos/mês', icon: '📈' },
    { value: '201_500', label: '201 - 500 atendimentos/mês', icon: '🚀' },
    { value: '500_plus', label: 'Mais de 500/mês', icon: '🔥' },
] as const;

export const COMMUNICATION_CHANNEL_OPTIONS = [
    { value: 'whatsapp', label: 'WhatsApp', icon: '📱' },
    { value: 'instagram_dm', label: 'Instagram Direct', icon: '📸' },
    { value: 'phone', label: 'Telefone', icon: '📞' },
    { value: 'email', label: 'Email', icon: '📧' },
    { value: 'mixed', label: 'Vários canais', icon: '🔄' },
] as const;

export const AUTOMATION_LEVEL_OPTIONS = [
    { value: 'none', label: 'Nenhuma automação', icon: '❌' },
    { value: 'basic', label: 'Respostas automáticas básicas', icon: '🤖' },
    { value: 'intermediate', label: 'Bot simples (menu, FAQ)', icon: '⚡' },
    { value: 'advanced', label: 'Fluxos automatizados completos', icon: '🚀' },
] as const;

export const BOTTLENECK_OPTIONS = [
    { value: 'slow_response', label: 'Atendimento demorado', icon: '⏳' },
    { value: 'lost_leads', label: 'Perda de leads/oportunidades', icon: '💸' },
    { value: 'manual_followup', label: 'Follow-up 100% manual', icon: '✏️' },
    { value: 'manual_scheduling', label: 'Agendamentos manuais', icon: '📅' },
    { value: 'no_reports', label: 'Falta de relatórios/métricas', icon: '📊' },
] as const;

export const GOAL_OPTIONS = [
    { value: 'leads', label: '🎯 Gerar mais leads/vendas' },
    { value: 'branding', label: '🏆 Fortalecer minha marca' },
    { value: 'launch', label: '🚀 Lançar produto/serviço' },
    { value: 'modernize', label: '🔄 Modernizar presença digital' },
    { value: 'automate', label: '🤖 Automatizar processos' },
] as const;

export const PAIN_POINTS_OPTIONS = [
    { value: 'no_conversion', label: 'Site/LP não converte' },
    { value: 'no_knowledge', label: 'Não sei fazer marketing digital' },
    { value: 'bad_agency', label: 'Gastei com agência e não deu resultado' },
    { value: 'unprofessional', label: 'Minha marca não transmite profissionalismo' },
    { value: 'no_time', label: 'Não tenho tempo para gerenciar' },
    { value: 'other', label: 'Outro' },
] as const;

export const BUDGET_OPTIONS = [
    { value: 'up_to_3k', label: 'Até R$ 3.000/mês', icon: '💵' },
    { value: '3k_to_8k', label: 'R$ 3.000 - R$ 8.000/mês', icon: '💰' },
    { value: '8k_to_15k', label: 'R$ 8.000 - R$ 15.000/mês', icon: '💎' },
    { value: 'above_15k', label: 'Acima de R$ 15.000/mês', icon: '🚀' },
    { value: 'prefer_not', label: 'Prefiro não dizer', icon: '🤐' },
] as const;

export const TIMELINE_OPTIONS = [
    { value: 'urgent', label: 'Urgente (esta semana)', icon: '🔥' },
    { value: '30_days', label: 'Próximos 30 dias', icon: '⏱️' },
    { value: '3_months', label: 'Próximos 3 meses', icon: '📅' },
    { value: 'researching', label: 'Estou só pesquisando', icon: '🔍' },
] as const;

// BRIEFING_OPTIONS removido - não é relevante para qualifying de automação

export const PRIORITY_OPTIONS = [
    { value: 'design', label: '🎨 Design cinematográfico e marcante' },
    { value: 'performance', label: '⚡ Performance e velocidade' },
    { value: 'mobile', label: '📱 Experiência mobile perfeita' },
    { value: 'seo', label: '🔍 Aparecer no Google (SEO)' },
    { value: 'chatbot', label: '💬 Atendimento automatizado (IA/Chatbot)' },
    { value: 'analytics', label: '📊 Dashboard e análise de dados' },
    { value: 'integrations', label: '🔄 Integrações (CRM, email, WhatsApp)' },
    { value: 'ecommerce', label: '🛒 Vendas online (e-commerce)' },
    { value: 'content', label: '✍️ Produção de conteúdo (blog, social)' },
] as const;

// ═══════════════════════════════════════════
// 🔍 ZOD SCHEMAS - Validação por Etapa
// ═══════════════════════════════════════════

// Etapa 1: Identificação
export const step1Schema = z.object({
    full_name: z.string().min(2, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'WhatsApp inválido'),
    company_name: z.string().optional(),
    role: z.string().optional(),
    referral_source: z.string().optional(),
    decision_maker: z.string().min(1, 'Selecione seu nível de decisão'),
});

// Etapa 2: Situação Atual + Automação
export const step2Schema = z.object({
    has_website: z.string().min(1, 'Selecione uma opção'),
    website_url: z.string().url().optional().or(z.literal('')),
    social_channels: z.array(z.string()).default([]),
    instagram_handle: z.string().optional(),
    // Novos campos focados em automação
    attendances_per_month: z.string().min(1, 'Selecione o volume de atendimentos'),
    main_communication_channel: z.string().min(1, 'Selecione o canal principal'),
    automation_level: z.string().min(1, 'Selecione o nível de automação'),
});

// Etapa 3: Objetivos & Dores
export const step3Schema = z.object({
    main_goal: z.string().min(1, 'Selecione seu objetivo principal'),
    pain_points: z.array(z.string()).min(1, 'Selecione pelo menos uma dor'),
    biggest_bottleneck: z.string().min(1, 'Selecione seu maior gargalo'),
    challenge_description: z.string().optional(),
});

// Etapa 4: Orçamento & Timeline
export const step4Schema = z.object({
    budget_range: z.string().min(1, 'Selecione uma faixa de investimento'),
    timeline: z.string().min(1, 'Selecione quando pretende começar'),
});

// Etapa 5: Prioridades
export const step5Schema = z.object({
    priorities: z.array(z.string()).min(1, 'Selecione pelo menos 1 prioridade').max(3, 'Máximo 3 prioridades'),
});

// Schema completo do formulário
export const diagnosticFormSchema = step1Schema
    .merge(step2Schema)
    .merge(step3Schema)
    .merge(step4Schema)
    .merge(step5Schema);

// ═══════════════════════════════════════════
// 📦 TYPES - Inferidos dos Schemas
// ═══════════════════════════════════════════

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type DiagnosticFormData = z.infer<typeof diagnosticFormSchema>;

// Tipo para o registro completo do banco (inclui campos de IA e status)
export interface DiagnosticRecord extends DiagnosticFormData {
    id: string;
    created_at: string;
    urgency_score?: number;
    recommended_products?: string[];
    ai_analysis?: {
        summary: string;
        strengths: string[];
        opportunities: string[];
        recommendation: string;
        product_match: string;
    };
    diagnostic_pdf_url?: string;
    status: 'pending' | 'analyzed' | 'contacted' | 'converted' | 'lost';
    contacted_at?: string;
    converted_at?: string;
    notes?: string;
}

// ═══════════════════════════════════════════
// 🎯 HELPERS - Cálculo de Score
// ═══════════════════════════════════════════

export function calculateUrgencyScore(data: DiagnosticFormData): number {
    let score = 5; // Base score

    // Timeline (maior peso)
    if (data.timeline === 'urgent') score += 3;
    else if (data.timeline === '30_days') score += 2;
    else if (data.timeline === '3_months') score += 1;
    else score -= 1; // pesquisando

    // Budget
    if (data.budget_range === 'above_15k') score += 2;
    else if (data.budget_range === '8k_to_15k') score += 1;
    else if (data.budget_range === 'prefer_not') score -= 1;

    // Decisor (Authority - BANT)
    if (data.decision_maker === 'final') score += 2;
    if (data.decision_maker === 'joint') score += 1;

    // Role bonus
    if (data.role === 'ceo') score += 1;

    // Clamp entre 1 e 10
    return Math.max(1, Math.min(10, score));
}

export function getLeadCategory(score: number): 'hot' | 'warm' | 'cold' {
    if (score >= 8) return 'hot';
    if (score >= 5) return 'warm';
    return 'cold';
}

// Mapeamento de produtos baseado no perfil
export function recommendProducts(data: DiagnosticFormData): string[] {
    const products: string[] = [];

    // Lógica de matching baseada nos objetivos e budget
    if (data.main_goal === 'leads') {
        products.push('Acelerador de Leads');
    }
    if (data.main_goal === 'branding') {
        products.push('Identidade Visual 360');
    }
    if (data.main_goal === 'modernize' || data.main_goal === 'launch') {
        products.push('Ecossistema Digital');
    }
    if (data.main_goal === 'automate' || data.priorities?.includes('chatbot')) {
        products.push('Chat SDR com IA');
    }

    // Se prioriza conteúdo
    if (data.priorities?.includes('content')) {
        products.push('SupArt Studio');
    }

    return products;
}
