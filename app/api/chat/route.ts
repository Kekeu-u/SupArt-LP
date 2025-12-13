import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, UIMessage } from 'ai';

export const maxDuration = 30;

const systemPrompt = `Você é a assistente de atendimento da SupArt, agência de design e desenvolvimento digital.

REGRAS DE RESPOSTA:
- Máximo 2 frases por resposta
- Tom direto e profissional
- Sem emojis em excesso (máximo 1)
- Nunca liste preços exatos
- Sempre direcione para agendar conversa

INFORMAÇÕES:
- Landing pages: a partir de R$5k
- Identidade visual: a partir de R$8k
- Projetos maiores: sob consulta

Se perguntarem preço: "Depende do escopo. Vamos conversar?"
Se quiserem agendar: "Me passe seu WhatsApp que entramos em contato."`;

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
