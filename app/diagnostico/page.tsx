import { Metadata } from 'next';
import { DiagnosticForm } from '@/components/diagnostic';

export const metadata: Metadata = {
    title: 'Diagnóstico Digital Gratuito | SupArt Agency',
    description: 'Descubra oportunidades ocultas para sua presença digital. Receba um diagnóstico personalizado com recomendações da nossa IA.',
    openGraph: {
        title: 'Diagnóstico Digital Gratuito | SupArt Agency',
        description: 'Descubra oportunidades ocultas para sua presença digital.',
        type: 'website',
    },
};

export default function DiagnosticoPage() {
    return (
        <main className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 py-16 md:py-24">
                <DiagnosticForm />
            </div>
        </main>
    );
}
