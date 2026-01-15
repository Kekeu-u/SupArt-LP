"use client";

import Link from "next/link";

export default function MaintenancePage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gradient-mesh relative overflow-hidden">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 noise-texture opacity-[0.03] pointer-events-none" />

            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-gray-400/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow transform-gpu" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-blue-400/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow transform-gpu" style={{ animationDelay: "1s" }} />

            {/* Content Card */}
            <div className="glass-panel rounded-[32px] p-8 md:p-12 max-w-lg mx-4 text-center relative z-10">
                {/* Logo - SupIArt */}
                <h1 className="headline-hero text-foreground mb-2">
                    Sup<span className="bg-gradient-to-r from-gray-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent italic font-bold">IA</span>rt
                </h1>

                {/* Subtitle */}
                <p className="text-label text-muted mb-8">
                    Agência de IA & Curadoria de Dados
                </p>

                {/* Main Message */}
                <h2 className="headline-section text-foreground mb-4">
                    Em Manutenção
                </h2>

                <p className="text-lead text-muted mb-8 text-balance">
                    Estamos aprimorando nossa experiência digital. Voltamos em breve com novidades incríveis.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* WhatsApp Button */}
                    <Link
                        href="https://wa.me/5551992327127"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full text-body font-medium hover:scale-105 hover:bg-green-500 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </Link>

                    {/* Email Button */}
                    <Link
                        href="mailto:contato@supart.com.br"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-apple-black text-white rounded-full text-body font-medium hover:scale-105 transition-transform duration-300 relative group"
                    >
                        <span className="absolute inset-0 bg-apple-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="M22 7l-10 7L2 7" />
                        </svg>
                        <span className="relative z-10">Email</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-6 text-center w-full">
                <p className="text-caption text-muted">
                    © {new Date().getFullYear()} SupArt Agency. Todos os direitos reservados.
                </p>
            </footer>
        </main>
    );
}
