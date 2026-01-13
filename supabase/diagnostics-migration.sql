-- =====================================================
-- MIGRATION: Tabela de Diagnósticos de Clientes
-- Descrição: Armazena respostas do formulário de diagnóstico
-- e análises geradas pela IA para qualificação de leads
-- =====================================================

-- Tabela principal de diagnósticos
CREATE TABLE IF NOT EXISTS public.diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- ═══════════════════════════════════════════
    -- Etapa 1: Identificação
    -- ═══════════════════════════════════════════
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT,
    role TEXT, -- CEO/Fundador, Diretor de Marketing, Gerente, Freelancer, Outro
    referral_source TEXT, -- Como nos conheceu?
    
    -- ═══════════════════════════════════════════
    -- Etapa 2: Situação Atual
    -- ═══════════════════════════════════════════
    has_website TEXT, -- Não tenho / Desatualizado / Funciona bem
    website_url TEXT,
    social_channels TEXT[], -- Array: Instagram, LinkedIn, TikTok, Facebook, YouTube
    uses_paid_traffic TEXT, -- Nunca / Tentei sem sucesso / Invisto ativamente
    instagram_handle TEXT,
    
    -- ═══════════════════════════════════════════
    -- Etapa 3: Objetivos & Dores
    -- ═══════════════════════════════════════════
    main_goal TEXT, -- Gerar leads, Fortalecer marca, Lançar produto, Modernizar, Automatizar
    pain_points TEXT[], -- Array de dores selecionadas
    challenge_description TEXT, -- Descrição livre do desafio
    
    -- ═══════════════════════════════════════════
    -- Etapa 4: Orçamento & Timeline
    -- ═══════════════════════════════════════════
    budget_range TEXT, -- Até R$3k, R$3-8k, R$8-15k, Acima R$15k, Prefiro não dizer
    timeline TEXT, -- Urgente, 30 dias, 3 meses, Pesquisando
    has_briefing TEXT, -- Tudo definido, Algumas ideias, Preciso de ajuda
    
    -- ═══════════════════════════════════════════
    -- Etapa 5: Prioridades (Top 3)
    -- ═══════════════════════════════════════════
    priorities TEXT[], -- Array ordenado das 3 prioridades
    
    -- ═══════════════════════════════════════════
    -- Processamento IA
    -- ═══════════════════════════════════════════
    urgency_score INTEGER CHECK (urgency_score >= 1 AND urgency_score <= 10),
    recommended_products TEXT[], -- Produtos sugeridos baseado no perfil
    ai_analysis JSONB, -- Análise completa gerada pela IA
    diagnostic_pdf_url TEXT, -- URL do PDF gerado (futuro)
    
    -- ═══════════════════════════════════════════
    -- Status & Tracking
    -- ═══════════════════════════════════════════
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'analyzed', 'contacted', 'converted', 'lost')),
    contacted_at TIMESTAMPTZ,
    converted_at TIMESTAMPTZ,
    notes TEXT -- Notas internas do time
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_diagnostics_email ON public.diagnostics(email);
CREATE INDEX IF NOT EXISTS idx_diagnostics_status ON public.diagnostics(status);
CREATE INDEX IF NOT EXISTS idx_diagnostics_created_at ON public.diagnostics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostics_urgency ON public.diagnostics(urgency_score DESC);

-- Enable Row Level Security
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Qualquer um pode inserir (formulário público)
CREATE POLICY "Anyone can submit diagnostic" 
    ON public.diagnostics 
    FOR INSERT 
    WITH CHECK (true);

-- Apenas usuários autenticados podem ler
CREATE POLICY "Authenticated users can view diagnostics" 
    ON public.diagnostics 
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Apenas usuários autenticados podem atualizar
CREATE POLICY "Authenticated users can update diagnostics" 
    ON public.diagnostics 
    FOR UPDATE 
    USING (auth.role() = 'authenticated');

-- Comentário da tabela
COMMENT ON TABLE public.diagnostics IS 'Armazena diagnósticos de clientes potenciais para qualificação de leads';
