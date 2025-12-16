import { Metadata } from "next";
import { aiTools } from "@/data/ai-tools";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const tool = aiTools.find((t) => t.slug === params.slug);

    if (!tool) {
        return { title: "Ferramenta não encontrada" };
    }

    return {
        title: tool.title,
        description: tool.description,
        keywords: [tool.name, tool.category, "IA", "Automação", "SupArt"],
    };
}

export async function generateStaticParams() {
    return aiTools.map((tool) => ({
        slug: tool.slug,
    }));
}

export default function ToolPage({ params }: Props) {
    const tool = aiTools.find((t) => t.slug === params.slug);

    if (!tool) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--color-apple-off-white)] text-[var(--color-apple-black)] pt-32 pb-20 px-6">
            <section className="max-w-4xl mx-auto text-center mb-20">
                <Link href="/" className="text-sm text-[var(--color-apple-gray)] hover:text-[var(--color-apple-black)] mb-8 inline-block transition-colors">
                    ← Voltar para Home
                </Link>
                <div className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-sm font-medium mb-6">
                    {tool.category}
                </div>
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8">
                    {tool.name}
                </h1>
                <p className="text-xl md:text-2xl text-[var(--color-apple-gray)] leading-relaxed max-w-2xl mx-auto">
                    {tool.description}
                </p>
            </section>

            <section className="max-w-3xl mx-auto mb-32">
                <div className="prose prose-lg prose-neutral mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Como a SupArt utiliza o {tool.name}</h2>
                    <p className="text-lg text-[var(--color-apple-gray)] leading-relaxed">
                        {tool.content}
                    </p>
                    {/* Aqui poderíamos adicionar mais conteúdo rico, exemplos, etc. */}
                </div>
            </section>

            <section className="max-w-4xl mx-auto text-center bg-white border border-black/5 rounded-[40px] p-12 md:p-16">
                <h2 className="text-3xl font-semibold mb-6">Precisa de especialistas em {tool.name}?</h2>
                <p className="text-[var(--color-apple-gray)] mb-10 max-w-lg mx-auto">
                    Nossa equipe domina essa tecnologia para entregar resultados excepcionais para sua empresa.
                </p>
                <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                >
                    Falar com Especialista em {tool.name}
                </a>
            </section>
        </main>
    );
}
