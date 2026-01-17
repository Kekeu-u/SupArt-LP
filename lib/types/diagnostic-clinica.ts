import { z } from 'zod';

// ═══════════════════════════════════════════
// 📝 CONSTANTES - Opções dos Selects
// ═══════════════════════════════════════════

export const CLINIC_PROCEDURES = [
    { value: 'botox_preenchimento', label: 'Botox e Preenchimentos' },
    { value: 'harmonizacao', label: 'Harmonização Facial' },
    { value: 'corporal', label: 'Tratamentos Corporais' },
    { value: 'laser', label: 'Depilação a Laser/Outros' },
    { value: 'cirurgia', label: 'Cirurgia Plástica' },
    { value: 'dermatologia', label: 'Dermatologia Clínica' },
    { value: 'variados', label: 'Mix de Serviços' },
] as const;

export const WHATSAPP_VOLUME = [
    { value: 'low', label: 'Até 20 mensagens/dia' },
    { value: 'medium', label: '20 a 50 mensagens/dia' },
    { value: 'high', label: '50 a 100 mensagens/dia' },
    { value: 'very_high', label: 'Mais de 100 mensagens/dia' },
] as const;

export const RESPONSAVEL_WHATSAPP = [
    { value: 'recepcionista', label: 'Recepcionista/Secretária' },
    { value: 'dono', label: 'Eu mesmo(a) (Dono/Especialista)' },
    { value: 'equipe_vendas', label: 'Equipe de Vendas (CRC)' },
    { value: 'estagiario', label: 'Estagiário' },
] as const;

export const AGENDA_SYSTEM = [
    { value: 'google_calendar', label: 'Google Agenda' },
    { value: 'papel', label: 'Agenda de Papel/Física' },
    { value: 'sistema_medico', label: 'Software de Gestão (Doctoralia, Feegow, etc)' },
    { value: 'planilha', label: 'Excel/Planilha' },
] as const;

export const EXPECTATIVA_PRAZO = [
    { value: 'imediato', label: 'Imediato (Urgente)' },
    { value: '30_dias', label: 'Em até 30 dias' },
    { value: '60_dias', label: 'Em até 60 dias' },
    { value: 'planejamento', label: 'Apenas planejando' },
] as const;

export const BUDGET_RANGES = [
    { value: 'up_to_1k', label: 'Até R$ 1.000/mês' },
    { value: '1k_to_3k', label: 'R$ 1.000 - R$ 3.000/mês' },
    { value: '3k_to_5k', label: 'R$ 3.000 - R$ 5.000/mês' },
    { value: 'above_5k', label: 'Acima de R$ 5.000/mês' },
] as const;

// ═══════════════════════════════════════════
// 🔍 ZOD SCHEMAS - Blocos de Perguntas
// ═══════════════════════════════════════════

// BLOCO 1: Estrutura do Negócio
export const businessStructureSchema = z.object({
    clinic_name: z.string().min(2, 'Nome da clínica é obrigatório'),
    professionals_count: z.number().min(1, 'Informe o número de profissionais'),
    main_procedures: z.array(z.string()).min(1, 'Selecione pelo menos um procedimento'),
    daily_appointments: z.number().min(0, 'Informe a média de atendimentos'),
    average_ticket: z.number().min(0, 'Informe o ticket médio'),
});

// BLOCO 2: Volume de Atendimento Digital
export const digitalVolumeSchema = z.object({
    daily_messages: z.string().min(1, 'Selecione o volume de mensagens'),
    unanswered_messages_count: z.number().optional().default(0),
    whatsapp_responsible: z.string().min(1, 'Quem responde o WhatsApp?'),
    hours_spent_whatsapp: z.number().optional(),
});

// BLOCO 3: Problemas Atuais
export const currentProblemsSchema = z.object({
    noshow_rate: z.number().min(0).max(100, 'Taxa deve ser entre 0 e 100'),
    confirmation_method: z.string().optional(),
    loses_clients_delay: z.boolean().default(false),
    lost_clients_estimate: z.number().optional().default(0),
});

// BLOCO 4: Infraestrutura Tecnológica
export const techInfraSchema = z.object({
    calendar_system: z.string().min(1, 'Qual sistema de agenda usa?'),
    crm_system: z.string().optional(),
    whatsapp_type: z.enum(['business', 'pessoal', 'api_oficial']).optional(),
    tried_chatbot_before: z.boolean().default(false),
    failure_reason: z.string().optional(),
});

// BLOCO 5: Expectativas e Orçamento
export const expectationsSchema = z.object({
    main_pain_point: z.string().optional(),
    top_priority_fix: z.string().optional(),
    desired_timeline: z.string().min(1, 'Selecione um prazo'),
    monthly_budget: z.string().min(1, 'Selecione uma faixa de investimento'),
});

// Schema Completo
export const clinicDiagnosticSchema = businessStructureSchema
    .merge(digitalVolumeSchema)
    .merge(currentProblemsSchema)
    .merge(techInfraSchema)
    .merge(expectationsSchema);

// ═══════════════════════════════════════════
// 📦 TYPES
// ═══════════════════════════════════════════

export type BusinessStructureData = z.infer<typeof businessStructureSchema>;
export type DigitalVolumeData = z.infer<typeof digitalVolumeSchema>;
export type CurrentProblemsData = z.infer<typeof currentProblemsSchema>;
export type TechInfraData = z.infer<typeof techInfraSchema>;
export type ExpectationsData = z.infer<typeof expectationsSchema>;

export type ClinicDiagnosticData = z.infer<typeof clinicDiagnosticSchema>;

export interface ClinicAnalysisResult {
    summary: string;
    financial_loss_estimate: number;
    efficiency_gain_potential: string;
    recommended_plan: 'Essencial' | 'Profissional' | 'Elite';
    implementation_time_estimate: string;
    key_automation_opportunities: string[];
}
