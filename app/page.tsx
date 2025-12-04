"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { TechStackMarquee } from "@/components/TechStackMarquee";

export default function Home() {
    return (
        <main className="min-h-screen bg-[var(--color-apple-off-white)] text-[var(--color-apple-black)] overflow-x-hidden selection:bg-[var(--color-apple-blue)] selection:text-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="spline-container absolute top-0 left-0 w-full h-full">
                        <iframe
                            src="https://my.spline.design/herolightcopy-HWuYMA6IdNGk0VGuyvrItNGB"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            id="aura-spline"
                            className="w-full h-full"
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 text-center max-w-5xl mx-auto space-y-8"
                >
                    <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-balance leading-[0.95]">
                        Design que converte pela <span className="text-[var(--color-apple-gray)]">autoridade estética.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--color-apple-gray)] max-w-2xl mx-auto font-medium">
                        Transformamos sua presença digital em uma experiência cinematográfica de alta fidelidade.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 px-8 py-4 bg-[var(--color-apple-black)] text-white rounded-full text-lg font-medium hover:bg-black/90 transition-colors shadow-lg shadow-black/10"
                    >
                        Inicie seu Projeto
                    </motion.button>
                </motion.div>
            </section>

            {/* Tech Stack Marquee */}
            <TechStackMarquee />

            {/* Project Showcase Section */}
            <ProjectShowcase />

            {/* Services as Products */}
            <section className="px-6 py-32 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-semibold tracking-tight mb-20 text-center"
                    >
                        Soluções
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "O Acelerador de Leads",
                                desc: "Landing pages de alta conversão com copy persuasiva e design hipnótico.",
                                price: "A partir de R$ 5k",
                                gradient: "from-blue-500/10 to-purple-500/10"
                            },
                            {
                                title: "Identidade Visual 360",
                                desc: "Rebranding completo. Logo, tipografia, cores e manual de marca.",
                                price: "A partir de R$ 8k",
                                gradient: "from-orange-500/10 to-red-500/10"
                            },
                            {
                                title: "Ecosistema Digital",
                                desc: "Site institucional, blog e integrações CRM. A presença completa.",
                                price: "Sob Consulta",
                                gradient: "from-green-500/10 to-emerald-500/10"
                            }
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "group relative p-8 rounded-[32px] border border-black/5 bg-gradient-to-br hover:shadow-2xl transition-all duration-500",
                                    service.gradient
                                )}
                            >
                                <div className="h-48 mb-8 rounded-2xl bg-white/50 backdrop-blur-sm shadow-inner flex items-center justify-center">
                                    {/* Product Image Placeholder */}
                                    <span className="text-[var(--color-apple-gray)] font-medium opacity-50">Product Shot</span>
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-[var(--color-apple-gray)] mb-6 leading-relaxed">
                                    {service.desc}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm font-medium text-[var(--color-apple-black)]">{service.price}</span>
                                    <button className="w-8 h-8 rounded-full bg-[var(--color-apple-black)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                        →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[var(--color-apple-off-white)] py-32 border-t border-black/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="font-semibold mb-6">SupArt Agency</h4>
                            <p className="text-sm text-[var(--color-apple-gray)] leading-relaxed max-w-xs">
                                Criando o futuro das interfaces digitais com precisão e arte.
                            </p>
                        </div>

                        {[
                            { title: "Serviços", links: ["Design System", "Web Development", "Mobile Apps", "Consultoria"] },
                            { title: "Empresa", links: ["Sobre", "Carreiras", "Blog", "Contato"] },
                            { title: "Legal", links: ["Privacidade", "Termos", "Cookies"] }
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="font-semibold mb-6 text-sm">{col.title}</h4>
                                <ul className="space-y-4">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-sm text-[var(--color-apple-gray)] hover:text-[var(--color-apple-black)] transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[var(--color-apple-gray)]">
                            © 2025 SupArt Agency. Todos os direitos reservados.
                        </p>
                        <p className="text-xs text-[var(--color-apple-gray)]">
                            São Paulo, Brasil
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
