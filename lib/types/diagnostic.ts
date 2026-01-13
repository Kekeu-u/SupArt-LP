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

export const WEBSITE_STATUS_OPTIONS = [
    { value: 'none', label: 'Não tenho site' },
    { value: 'outdated', label: 'Tenho, mas está desatualizado' },
    { value: 'active', label: 'Tenho e funciona bem' },
] as const;

export const SOCIAL_CHANNELS_OPTIONS = [
    { value: 'instagram', label: 'Instagram', icon: '📸' },
    { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { value: 'tiktok', label: 'TikTok', icon: '🎵' },
    { value: 'facebook', label: 'Facebook', icon: '👥' },
    { value: 'youtube', label: 'YouTube', icon: '▶️' },
    { value: 'none', label: 'Nenhuma', icon: '❌' },
] as const;

export const PAID_TRAFFIC_OPTIONS = [
    { value: 'never', label: 'Nunca investi' },
    { value: 'failed', label: 'Já tentei sem sucesso' },
    { value: 'active', label: 'Invisto ativamente' },
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
    { value: 'up_to_3k', label: 'Até R$ 3.000/mês' },
    { value: '3k_to_8k', label: 'R$ 3.000 - R$ 8.000/mês' },
    { value: '8k_to_15k', label: 'R$ 8.000 - R$ 15.000/mês' },
    { value: 'above_15k', label: 'Acima de R$ 15.000/mês' },
    { value: 'prefer_not', label: 'Prefiro não dizer' },
] as const;

export const TIMELINE_OPTIONS = [
    { value: 'urgent', label: '🔥 Urgente (esta semana)' },
    { value: '30_days', label: '⏱️ Próximos 30 dias' },
    { value: '3_months', label: '📅 Próximos 3 meses' },
    { value: 'researching', label: '🗓️ Estou só pesquisando' },
] as const;

export const BRIEFING_OPTIONS = [
    { value: 'complete', label: 'Sim, tenho praticamente tudo definido' },
    { value: 'partial', label: 'Tenho algumas ideias' },
    { value: 'need_help', label: 'Preciso de ajuda com isso' },
] as const;

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
});

// Etapa 2: Situação Atual
export const step2Schema = z.object({
    has_website: z.string().min(1, 'Selecione uma opção'),
    website_url: z.string().url().optional().or(z.literal('')),
    social_channels: z.array(z.string()).default([]),
    uses_paid_traffic: z.string().optional(),
    instagram_handle: z.string().optional(),
});

// Etapa 3: Objetivos & Dores
export const step3Schema = z.object({
    main_goal: z.string().min(1, 'Selecione seu objetivo principal'),
    pain_points: z.array(z.string()).min(1, 'Selecione pelo menos uma dor'),
    challenge_description: z.string().optional(),
});

// Etapa 4: Orçamento & Timeline
export const step4Schema = z.object({
    budget_range: z.string().min(1, 'Selecione uma faixa de investimento'),
    timeline: z.string().min(1, 'Selecione quando pretende começar'),
    has_briefing: z.string().optional(),
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

    // Decisor (role)
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
