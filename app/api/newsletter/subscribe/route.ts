import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Criar cliente Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('Missing Supabase environment variables');
            return NextResponse.json(
                { error: 'Configuração do servidor incompleta' },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Salvar no Supabase
        const { error: dbError } = await supabase
            .from('subscribers')
            .insert([{ email }]);

        if (dbError) {
            // Se for erro de duplicata (unique violation)
            if (dbError.code === '23505') {
                return NextResponse.json(
                    { message: 'Este email já está cadastrado!' },
                    { status: 200 }
                );
            }

            console.error('Database error:', dbError);
            return NextResponse.json(
                { error: 'Erro ao processar inscrição' },
                { status: 500 }
            );
        }

        // Sucesso
        return NextResponse.json({
            message: 'Inscrição realizada com sucesso! 🚀'
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
