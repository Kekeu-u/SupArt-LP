import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
    diagnosticFormSchema,
    calculateUrgencyScore,
    recommendProducts,
    type DiagnosticFormData
} from '@/lib/types/diagnostic';

export const maxDuration = 60; // Aumentado para permitir análise IA

// Prompt para análise do Gemini
const generateAnalysisPrompt = (data: DiagnosticFormData) => `
Você é um consultor de automação e IA da SupArt Agency analisando um lead potencial para soluções de automação de atendimento.

## Dados do Cliente:
- **Nome**: ${data.full_name}
- **Empresa**: ${data.company_name || 'Não informado'}
- **Cargo**: ${data.role || 'Não informado'}

## Situação Atual:
- **Site**: ${data.has_website}
- **URL**: ${data.website_url || 'Não informado'}
- **Redes Sociais**: ${data.social_channels?.join(', ') || 'Nenhuma'}
- **Instagram**: ${data.instagram_handle || 'Não informado'}

## Métricas de Automação (IMPORTANTE):
- **Volume de Atendimentos/mês**: ${data.attendances_per_month || 'Não informado'}
- **Canal Principal**: ${data.main_communication_channel || 'Não informado'}
- **Nível de Automação Atual**: ${data.automation_level || 'Não informado'}
- **Maior Gargalo**: ${data.biggest_bottleneck || 'Não informado'}

## Objetivos:
- **Objetivo Principal**: ${data.main_goal}
- **Dores**: ${data.pain_points?.join(', ') || 'Não informado'}
- **Desafio descrito**: ${data.challenge_description || 'Não informado'}

## Orçamento:
- **Faixa**: ${data.budget_range}
- **Timeline**: ${data.timeline}

## Prioridades (Top 3):
${data.priorities?.map((p, i) => `${i + 1}. ${p}`).join('\n') || 'Não informado'}

---

Gere uma análise em JSON com a seguinte estrutura (responda APENAS o JSON, sem markdown):
{
  "summary": "Parágrafo resumindo a situação atual e potencial de automação do cliente",
  "strengths": ["Ponto forte 1", "Ponto forte 2"],
  "opportunities": ["Oportunidade de automação 1", "Oportunidade de automação 2"],
  "recommendation": "Texto explicando porque a solução de automação recomendada é ideal para este cliente",
  "product_match": "Nome do produto SupArt mais adequado (ex: Chat SDR com IA, Ecossistema Digital, Acelerador de Leads)"
}
`;

export async function POST(req: Request) {
    try {
        // 1. Parse e validação dos dados
        const body = await req.json();
        const validationResult = diagnosticFormSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Dados inválidos', details: validationResult.error.flatten() },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // 2. Calcular score de urgência e produtos recomendados
        const urgency_score = calculateUrgencyScore(data);
        const recommended_products = recommendProducts(data);

        // 3. Gerar análise com Gemini
        let ai_analysis = null;
        try {
            const { text } = await generateText({
                model: google('gemini-2.0-flash'),
                prompt: generateAnalysisPrompt(data),
            });

            // Parse do JSON retornado
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                ai_analysis = JSON.parse(jsonMatch[0]);
            }
        } catch (aiError) {
            console.error('Erro na análise IA:', aiError);
            // Continua sem a análise IA
        }

        // 4. Inserir no Supabase
        const { data: insertedData, error: dbError } = await supabase
            .from('diagnostics')
            .insert({
                ...data,
                urgency_score,
                recommended_products,
                ai_analysis,
                status: ai_analysis ? 'analyzed' : 'pending',
            })
            .select('id, email, full_name')
            .single();

        if (dbError) {
            console.error('Erro no Supabase:', JSON.stringify(dbError, null, 2));
            return NextResponse.json(
                { error: 'Erro ao salvar diagnóstico', details: dbError.message, code: dbError.code, hint: dbError.hint },
                { status: 500 }
            );
        }

        // 5. Notificar via Dash API (envia email via Resend)
        if (process.env.DASH_API_URL && process.env.LEAD_INGEST_API_KEY) {
            try {
                const dashResponse = await fetch(`${process.env.DASH_API_URL}/api/external/lead-ingest`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.LEAD_INGEST_API_KEY,
                    },
                    body: JSON.stringify({
                        source: 'diagnostic',
                        lead: {
                            // Etapa 1: Identificação
                            full_name: data.full_name,
                            email: data.email,
                            phone: data.phone,
                            company_name: data.company_name,
                            role: data.role,
                            referral_source: data.referral_source,
                            decision_maker: data.decision_maker, // BANT: Authority
                            // Etapa 2: Situação Atual + Automação
                            has_website: data.has_website,
                            website_url: data.website_url,
                            social_channels: data.social_channels,
                            instagram_handle: data.instagram_handle,
                            attendances_per_month: data.attendances_per_month,
                            main_communication_channel: data.main_communication_channel,
                            automation_level: data.automation_level,
                            // Etapa 3: Objetivos & Dores
                            main_goal: data.main_goal,
                            pain_points: data.pain_points,
                            biggest_bottleneck: data.biggest_bottleneck,
                            challenge_description: data.challenge_description,
                            // Etapa 4: Orçamento & Timeline
                            budget_range: data.budget_range,
                            timeline: data.timeline,
                            // Etapa 5: Prioridades
                            priorities: data.priorities,
                            // Dados calculados
                            urgency_score,
                            recommended_products,
                            ai_analysis,
                        },
                    }),
                });

                if (!dashResponse.ok) {
                    console.error('Erro ao notificar Dash:', await dashResponse.text());
                }
            } catch (dashError) {
                console.error('Erro ao conectar com Dash API:', dashError);
            }
        }

        // 6. Webhook Discord (opcional)
        if (process.env.DISCORD_WEBHOOK_URL) {
            try {
                await fetch(process.env.DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `🔔 **Novo Lead!**\n` +
                            `👤 ${data.full_name} (${data.company_name || 'Pessoa Física'})\n` +
                            `📧 ${data.email}\n` +
                            `📱 ${data.phone}\n` +
                            `🎯 Objetivo: ${data.main_goal}\n` +
                            `💰 Budget: ${data.budget_range}\n` +
                            `⏱️ Timeline: ${data.timeline}\n` +
                            `🔥 Score: ${urgency_score}/10`,
                    }),
                });
            } catch (webhookError) {
                console.error('Erro no webhook Discord:', webhookError);
            }
        }

        // 7. Retornar sucesso
        return NextResponse.json({
            success: true,
            id: insertedData.id,
            urgency_score,
            recommended_products,
            ai_analysis,
        });

    } catch (error) {
        console.error('Erro no endpoint diagnostic:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
