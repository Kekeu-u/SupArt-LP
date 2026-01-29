import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bot IA WhatsApp | Sabor Nilva - Proposta Comercial',
    description: 'Proposta comercial para automação de atendimento via WhatsApp com IA para a Sabor Nilva.',
    robots: 'noindex, nofollow',
}

export default function SaborNilvaPage() {
    return (
        <div className="pt-16 min-h-screen bg-[#F5F5F7]">
            <iframe
                src="/apresentacao-sabornilva.html"
                className="w-full h-[calc(100vh-64px)] border-0"
                title="Proposta Comercial - Sabor Nilva"
            />
        </div>
    )
}
