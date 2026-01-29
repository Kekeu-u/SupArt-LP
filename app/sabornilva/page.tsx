import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bot IA WhatsApp | Sabor Nilva - Proposta Comercial',
    description: 'Proposta comercial para automação de atendimento via WhatsApp com IA para a Sabor Nilva.',
    robots: 'noindex, nofollow',
}

export default function SaborNilvaPage() {
    return (
        <iframe
            src="/apresentacao-sabornilva.html"
            className="w-full h-screen border-0"
            title="Proposta Comercial - Sabor Nilva"
        />
    )
}
