import { Metadata } from "next";
import { servicesSEO } from "@/data/services-seo";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
    params: {
        slug: string;
    };
}

// Geração de Metadados Dinâmicos
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = servicesSEO.find((s) => s.slug === params.slug);

    if (!service) {
        return {
            title: "Serviço não encontrado",
        };
    }

    return {
        title: service.title,
        description: service.description,
        keywords: service.keywords,
        openGraph: {
            title: service.title,
            description: service.description,
            type: "website",
        },
    };
}

// Geração Estática das Rotas (SSG)
export async function generateStaticParams() {
    return servicesSEO.map((service) => ({
        slug: service.slug,
    }));
}

export default function ServicePage({ params }: Props) {
    const service = servicesSEO.find((s) => s.slug === params.slug);

    if (!service) {
        notFound();
    }

    // Schema.org Service Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "SupArt Agency",
            "url": "https://supart.agency"
        },
        "areaServed": "Brasil",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços SupArt",
            "itemListElement": service.features.map((feature, index) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": feature.title,
                    "description": feature.description
                }
            }))
        }
    };

    return (
        <main className="min-h-screen bg-[var(--color-apple-off-white)] text-[var(--color-apple-black)] pt-32 pb-20 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="max-w-4xl mx-auto text-center mb-24">
                <Link href="/" className="text-sm text-[var(--color-apple-gray)] hover:text-[var(--color-apple-black)] mb-8 inline-block transition-colors">
                    ← Voltar para Home
                </Link>
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-600">
                    {service.heroTitle}
                </h1>
                <p className="text-xl md:text-2xl text-[var(--color-apple-gray)] leading-relaxed max-w-2xl mx-auto">
                    {service.heroSubtitle}
                </p>
            </section>

            {/* Features Grid */}
            <section className="max-w-6xl mx-auto mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {service.features.map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white border border-black/5 hover:shadow-lg transition-all duration-300">
                            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                            <p className="text-[var(--color-apple-gray)] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto mb-32">
                <h2 className="text-3xl font-semibold mb-12 text-center">Perguntas Frequentes</h2>
                <div className="space-y-6">
                    {service.faq.map((item, i) => (
                        <div key={i} className="border-b border-black/10 pb-6">
                            <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                            <p className="text-[var(--color-apple-gray)]">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto text-center bg-black text-white rounded-[40px] p-12 md:p-20 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-semibold mb-6">Pronto para transformar seu negócio?</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
                        Agende uma consultoria gratuita e descubra como podemos aplicar essa solução na sua empresa.
                    </p>
                    <a
                        href="https://wa.me/5511999999999" // Substituir pelo link real
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Falar com Especialista
                    </a>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-gray-900/30 to-transparent pointer-events-none" />
            </section>
        </main>
    );
}
