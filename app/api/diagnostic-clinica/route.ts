import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
    clinicDiagnosticSchema,
    type ClinicDiagnosticData,
    type ClinicAnalysisResult
} from '@/lib/types/diagnostic-clinica';

export const maxDuration = 60;

const generateClinicAnalysisPrompt = (data: ClinicDiagnosticData) => `
Você é um consultor sênior especialista em automação para CLÍNICAS DE ESTÉTICA da SupArt Agency.
Sua missão é analisar os dados desta clínica e gerar um plano de automação com cálculo de prejuízo estimado.

## DADOS DA CLÍNICA
- Nome: ${data.clinic_name}
- Profissionais: ${data.professionals_count}
- Procedimentos: ${data.main_procedures.join(', ')}
- Atendimentos/dia: ${data.daily_appointments}
- Ticket Médio: R$ ${data.average_ticket}

## DIGITAL & ATENDIMENTO
- Volume Whats: ${data.daily_messages}
- Quem responde: ${data.whatsapp_responsible}
- Msgs sem resposta: ${data.unanswered_messages_count}
- Tempo gasto: ${data.hours_spent_whatsapp || 0} horas/dia

## DORES & PERDAS
- Taxa de No-Show: ${data.noshow_rate}%
- Perda por demora: ${data.loses_clients_delay ? 'SIM' : 'NÃO'} (${data.lost_clients_estimate} clientes/mês)
- Confirmação atual: ${data.confirmation_method || 'Nenhuma'}

## INFRA
- Agenda: ${data.calendar_system}
- CRM: ${data.crm_system || 'Nenhum'}
- Já tentou bot: ${data.tried_chatbot_before ? `Sim (${data.failure_reason})` : 'Não'}

## OBJETIVO
- Maior dor: ${data.main_pain_point}
- Prioridade: ${data.top_priority_fix}
- Prazo desejado: ${data.desired_timeline}
- Budget: ${data.monthly_budget}

---

## TAREFA
Gere um JSON com a seguinte análise:
1. **financial_loss_estimate**: Calcule o prejuízo mensal estimado (Ticket Médio * (No-shows + Clientes Perdidos Delay)).
2. **efficiency_gain_potential**: Texto curto estimando quantas horas/mês seriam economizadas com automação.
3. **recommended_plan**: Escolha entre 'Essencial' (só agendamento), 'Profissional' (triagem + agendamento) ou 'Elite' (SDR IA completo).
4. **key_automation_opportunities**: Liste 3 automações críticas para este caso específico.
5. **summary**: Um resumo executivo poderoso de 2 frases focado em ROI.
6. **implementation_time_estimate**: Estimativa em semanas.

Responda APENAS o JSON.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validationResult = clinicDiagnosticSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Dados inválidos', details: validationResult.error.flatten() },
                { status: 400 }
            );
        }

        const data = validationResult.data;
        let ai_analysis: ClinicAnalysisResult | null = null;

        // Gerar análise com Gemini
        try {
            const { text } = await generateText({
                model: google('gemini-2.0-flash'),
                prompt: generateClinicAnalysisPrompt(data),
            });

            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                ai_analysis = JSON.parse(jsonMatch[0]);
            }
        } catch (aiError) {
            console.error('Erro na análise IA:', aiError);
            // Fallback manual se IA falhar
            ai_analysis = {
                summary: "Análise preliminar indica alto potencial de automação.",
                financial_loss_estimate: (data.average_ticket * data.daily_appointments * 20 * (data.noshow_rate / 100)),
                efficiency_gain_potential: "Recuperação de 40h+ mensais da equipe.",
                recommended_plan: "Profissional",
                implementation_time_estimate: "2 semanas",
                key_automation_opportunities: ["Confirmação automática", "Triagem de leads", "Respostas 24/7"]
            };
        }

        // Salvar no Supabase (tabela genérica 'diagnostics' com flag ou tabela nova se preferir - usando genérica por enquanto com jsonb extra)
        // Nota: Idealmente criar tabela 'clinic_diagnostics', mas vou usar a estrutura existente adaptada
        /*
        const { data: insertedData, error: dbError } = await supabase
            .from('diagnostics') // Usando a mesma tabela por simplificação, mas armazenando o payload específico em 'notes' ou campo JSON se houver
            .insert({
                full_name: data.clinic_name, // Adaptando campos
                email: 'clinic@placeholder.com', // TODO: Adicionar campo email no form se não tiver
                // ... outros campos mapeados
                ai_analysis: ai_analysis,
                status: 'analyzed'
            })
            .select()
            .single();
        */
        // POR ENQUANTO: Retornar o JSON direto para o frontend mostrar o resultado
        // O salvamento no banco pode ser feito em um passo 'Lead Capture' final se desejado.

        return NextResponse.json({
            success: true,
            analysis: ai_analysis,
            original_data: data
        });

    } catch (error) {
        console.error('Erro no endpoint diagnostic-clinica:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
