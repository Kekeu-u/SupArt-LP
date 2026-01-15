import { Metadata } from 'next';
import { DiagnosticForm } from '@/components/diagnostic';

export const metadata: Metadata = {
    title: 'Formulário de Diagnóstico | SupArt Agency',
    description: 'Preencha o formulário para receber seu diagnóstico personalizado.',
    openGraph: {
        title: 'Formulário de Diagnóstico | SupArt Agency',
        description: 'Preencha o formulário para receber seu diagnóstico personalizado.',
        type: 'website',
    },
};

export default function DiagnosticFormPage() {
    return (
        <main className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black" />

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 py-16 md:py-24">
                <DiagnosticForm />
            </div>
        </main>
    );
}
