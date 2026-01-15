import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateBlogPost(sourceData: any, type: 'tool-review' | 'news') {
    if (!process.env.GOOGLE_API_KEY) {
        throw new Error("GOOGLE_API_KEY is not defined");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
    Atue como um editor sênior de um blog de tecnologia brasileiro (SupArt Agency).
    
    CONTEXTO:
    Encontrei este conteúdo viral:
    Título: ${sourceData.title}
    Link/Texto: ${sourceData.url} ${sourceData.content || ''}
    Fonte: ${sourceData.source}

    TAREFAS:
    1. Crie um post de blog em Português do Brasil.
    2. O tom deve ser profissional mas acessível, para desenvolvedores, empreendedores e donos de agências.
    3. Use formatação Markdown (H2, bullet points, code blocks se necessário).
    4. O conteúdo deve ser original, não apenas uma tradução. Adicione contexto de mercado se possível.
    5. Gere um título SEO-friendly e um slug (url amigável).
    6. No final, adicione uma seção "Opinião da SupArt" sobre por que isso é relevante para automação ou negócios.

    Retorne APENAS um JSON no formato:
    {
      "title": "String",
      "slug": "String",
      "markdown": "String com o corpo do post (sem o título H1 no início)"
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Limpar o markdown de código do JSON se o Gemini colocar ```json ... ```
        const jsonString = text.replace(/```json|```/g, '').trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error generating blog post:", error);
        throw error;
    }
}
