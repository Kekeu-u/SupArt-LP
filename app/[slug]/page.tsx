import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

// Rotas estáticas que NÃO devem ser tratadas como apresentações
const STATIC_ROUTES = [
    'blog',
    'cases',
    'dashboard',
    'diagnostico',
    'ferramentas',
    'maintenance',
    'politica-de-privacidade',
    'servicos',
    'test-agent',
    'api',
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Se for rota estática, não gerar metadata customizado
    if (STATIC_ROUTES.includes(slug)) {
        return {};
    }

    return {
        title: `Apresentação | SupArt Agency`,
        description: 'Proposta comercial personalizada powered by SupArt Agency',
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function PresentationPage({ params }: Props) {
    const { slug } = await params;

    // Se for uma rota estática conhecida, deixar o Next.js lidar normalmente
    if (STATIC_ROUTES.includes(slug)) {
        notFound();
    }

    // Validar formato do slug (evitar slugs maliciosos)
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
        notFound();
    }

    try {
        // Buscar HTML do dashboard
        const res = await fetch(
            `https://dash.supart.com.br/api/presentations/${slug}/public`,
            {
                next: { revalidate: 60 }, // Cache por 1 minuto
                headers: {
                    'Accept': 'text/html',
                },
            }
        );

        if (!res.ok) {
            notFound();
        }

        const html = await res.text();

        // Retornar HTML completo da apresentação
        return (
            <div
                className="presentation-container"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    } catch (error) {
        console.error(`[Presentation Proxy] Erro ao buscar apresentação ${slug}:`, error);
        notFound();
    }
}
