import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { secret, slug } = body;

        // Valida o secret token
        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json(
                { message: 'Invalid secret' },
                { status: 401 }
            );
        }

        // Revalida as páginas do blog
        if (slug) {
            // Revalida post específico
            revalidatePath(`/blog/${slug}`);
            return NextResponse.json({
                revalidated: true,
                paths: [`/blog/${slug}`],
                now: Date.now()
            });
        } else {
            // Revalida toda a listagem
            revalidatePath('/blog');
            return NextResponse.json({
                revalidated: true,
                paths: ['/blog'],
                now: Date.now()
            });
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Error revalidating', error: String(err) },
            { status: 500 }
        );
    }
}
