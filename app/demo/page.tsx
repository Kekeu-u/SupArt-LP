import { Metadata } from 'next';
import { DemoClientWrapper } from '@/components/demo/DemoClientWrapper';

export const metadata: Metadata = {
    title: 'Demo Interativo | Sistema Multi-Agente | SupArt',
    description: 'Veja como nosso sistema de agentes IA automatiza agendamentos de clínicas médicas em tempo real.',
};

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            <DemoClientWrapper />
        </main>
    );
}
