import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
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
Você é um consultor de marketing digital da SupArt Agency analisando um lead potencial.

## Dados do Cliente:
- **Nome**: ${data.full_name}
- **Empresa**: ${data.company_name || 'Não informado'}
- **Cargo**: ${data.role || 'Não informado'}

## Situação Atual:
- **Site**: ${data.has_website}
- **URL**: ${data.website_url || 'Não informado'}
- **Redes Sociais**: ${data.social_channels?.join(', ') || 'Nenhuma'}
- **Tráfego Pago**: ${data.uses_paid_traffic || 'Não informado'}
- **Instagram**: ${data.instagram_handle || 'Não informado'}

## Objetivos:
- **Objetivo Principal**: ${data.main_goal}
- **Dores**: ${data.pain_points?.join(', ') || 'Não informado'}
- **Desafio descrito**: ${data.challenge_description || 'Não informado'}

## Orçamento:
- **Faixa**: ${data.budget_range}
- **Timeline**: ${data.timeline}
- **Briefing**: ${data.has_briefing || 'Não informado'}

## Prioridades (Top 3):
${data.priorities?.map((p, i) => `${i + 1}. ${p}`).join('\n') || 'Não informado'}

---

Gere uma análise em JSON com a seguinte estrutura (responda APENAS o JSON, sem markdown):
{
  "summary": "Parágrafo resumindo a situação atual e potencial do cliente",
  "strengths": ["Ponto forte 1", "Ponto forte 2"],
  "opportunities": ["Oportunidade 1 com recomendação", "Oportunidade 2 com recomendação"],
  "recommendation": "Texto explicando porque o produto recomendado é ideal para este cliente",
  "product_match": "Nome do produto SupArt mais adequado"
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

        // 5. Enviar notificação por email via Resend
        if (process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: 'SupArt Diagnóstico <noreply@supart.com.br>',
                    to: process.env.NOTIFICATION_EMAIL || 'contato@supart.com.br',
                    subject: `🔔 Novo Lead: ${data.full_name} (Score: ${urgency_score}/10)`,
                    html: `
                        <h2>Novo Diagnóstico Recebido!</h2>
                        <p><strong>Nome:</strong> ${data.full_name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>WhatsApp:</strong> ${data.phone}</p>
                        <p><strong>Empresa:</strong> ${data.company_name || 'Não informado'}</p>
                        <p><strong>Objetivo:</strong> ${data.main_goal}</p>
                        <p><strong>Budget:</strong> ${data.budget_range}</p>
                        <p><strong>Timeline:</strong> ${data.timeline}</p>
                        <p><strong>Score de Urgência:</strong> ${urgency_score}/10</p>
                        <hr/>
                        <p><strong>Produtos Recomendados:</strong> ${recommended_products.join(', ')}</p>
                        ${ai_analysis?.summary ? `<p><strong>Análise IA:</strong> ${ai_analysis.summary}</p>` : ''}
                    `,
                });
            } catch (emailError) {
                console.error('Erro ao enviar email:', emailError);
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
