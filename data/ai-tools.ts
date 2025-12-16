export interface AITool {
    slug: string;
    name: string;
    category: string;
    title: string; // SEO Title
    description: string; // SEO Description
    content: string; // Short description of usage
}

export const aiTools: AITool[] = [
    {
        slug: "midjourney",
        name: "Midjourney",
        category: "Geração de Imagens",
        title: "Agência Especialista em Midjourney | Criação de Imagens com IA",
        description: "Crie visuais deslumbrantes para sua marca com Midjourney. A SupArt domina a engenharia de prompt para gerar imagens únicas.",
        content: "Utilizamos o Midjourney v6 para criar assets visuais que seriam impossíveis ou custariam milhares de reais com fotografia tradicional. De ilustrações conceituais a fotorrealismo de produtos."
    },
    {
        slug: "chatgpt",
        name: "ChatGPT (OpenAI)",
        category: "Processamento de Texto",
        title: "Consultoria e Integração ChatGPT para Empresas | SupArt",
        description: "Automatize atendimento e criação de conteúdo com ChatGPT. Implementamos soluções personalizadas da OpenAI no seu negócio.",
        content: "Integramos a API do GPT-4 para criar assistentes virtuais, analisadores de dados e geradores de conteúdo que entendem o contexto da sua empresa."
    },
    {
        slug: "n8n",
        name: "n8n",
        category: "Automação de Fluxos",
        title: "Especialistas em Automação com n8n | SupArt",
        description: "Conecte seus apps e automatize processos complexos com n8n. Reduza custos operacionais com fluxos de trabalho inteligentes.",
        content: "O n8n é a espinha dorsal das nossas automações. Conectamos seu CRM, Email Marketing e IA para trabalharem em sintonia, sem intervenção humana."
    },
    {
        slug: "stable-diffusion",
        name: "Stable Diffusion",
        category: "Geração de Imagens",
        title: "Serviços de Stable Diffusion e Fine-Tuning | SupArt",
        description: "Treinamento de modelos e geração de imagens controlada com Stable Diffusion. Tenha uma IA que entende seu estilo visual.",
        content: "Diferente de outras ferramentas, com Stable Diffusion podemos treinar modelos (LoRAs) específicos com o rosto dos seus modelos ou produtos."
    },
    {
        slug: "claude",
        name: "Claude (Anthropic)",
        category: "IA Conversacional",
        title: "Integração Claude AI para Análise de Dados | SupArt",
        description: "Utilize o poder do Claude para análise de grandes volumes de texto e raciocínio complexo. Soluções avançadas de IA.",
        content: "O Claude se destaca em tarefas que exigem grande janela de contexto e raciocínio sutil. Ideal para análise jurídica, resumo de documentos e coding."
    }
];
