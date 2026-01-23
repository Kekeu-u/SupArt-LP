import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const subscriptionSchema = z.object({
    email: z.string().email('Email inválido'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validation
        const result = subscriptionSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { email } = result.data;

        // Check if already subscribed
        const { data: existing } = await supabase
            .from('subscribers')
            .select('id, status')
            .eq('email', email)
            .single();

        if (existing) {
            if (existing.status === 'active') {
                return NextResponse.json(
                    { message: 'Você já faz parte da nossa comunidade VIP!' },
                    { status: 200 }
                );
            } else {
                // Re-activate
                await supabase
                    .from('subscribers')
                    .update({ status: 'active', source: 'website-reactivation' })
                    .eq('email', email);

                return NextResponse.json(
                    { message: 'Bem-vindo de volta à SupArt!' },
                    { status: 200 }
                );
            }
        }

        // Insert new subscriber
        const { error } = await supabase
            .from('subscribers')
            .insert({
                email,
                source: 'website-widget',
                status: 'active'
            });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Erro ao salvar. Tente novamente.' },
                { status: 500 }
            );
        }

        // FUTURE: Fire n8n Webhook here (await fetch('WEBHOOK_URL', ...))

        return NextResponse.json(
            { message: 'Inscrição confirmada! Verifique seu e-mail em breve.' },
            { status: 201 }
        );

    } catch (err) {
        console.error('API Error:', err);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
