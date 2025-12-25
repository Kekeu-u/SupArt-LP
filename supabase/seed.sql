-- Seed Data for SupArt Blog
-- Strategic, SEO-optimized content about web design, digital marketing, and conversions (2026)

-- LIMPEZA: Remover dados antigos antes de inserir novos
DELETE FROM public.posts;
DELETE FROM public.categories;
DELETE FROM public.authors;

-- Resetar sequences se necessário
ALTER SEQUENCE IF EXISTS posts_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS categories_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS authors_id_seq RESTART WITH 1;

-- 1. Authors
INSERT INTO public.authors (name, role, avatar_url, bio) VALUES
('SupArt Team', 'Especialistas em Web Design', 'https://i.pravatar.cc/150?u=supart', 'Equipe de designers e desenvolvedores especializados em criar experiências digitais de alta conversão.'),
('Lucas Ferreira', 'Head de Marketing Digital', 'https://i.pravatar.cc/150?u=lucas', 'Especialista em estratégias de marketing digital, SEO e growth hacking.')
ON CONFLICT DO NOTHING;

-- 2. Categories
INSERT INTO public.categories (name, slug) VALUES
('Web Design', 'web-design'),
('Landing Pages', 'landing-pages'),
('Marketing Digital', 'marketing-digital'),
('Conversões', 'conversoes'),
('Tecnologia', 'tecnologia'),
('IA & Automação', 'ia-automacao')
ON CONFLICT (slug) DO NOTHING;

-- 3. Posts
INSERT INTO public.posts (title, slug, excerpt, content, cover_image_url, published_at, read_time, is_featured, author_id, category_id)
VALUES
(
    'Como Criar uma Landing Page de Alta Conversão em 2024: Guia Completo',
    'como-criar-landing-page-alta-conversao-2024',
    'Descubra as estratégias e elementos essenciais para criar landing pages que realmente convertem visitantes em clientes. Aprenda com casos reais e dados comprovados.',
    '<h2>O que é uma Landing Page de Alta Conversão?</h2><p>Uma landing page de alta conversão é uma página web estrategicamente projetada com um único objetivo: converter visitantes em leads ou clientes. Diferente de um site tradicional, ela elimina distrações e foca na ação.</p><h3>Elementos Essenciais de uma Landing Page que Converte</h3><p><strong>1. Proposta de Valor Clara:</strong> Nos primeiros 3 segundos, o visitante deve entender exatamente o que você oferece e por que ele deveria se importar.</p><p><strong>2. Design Limpo e Profissional:</strong> Um design moderno, responsivo e com hierarquia visual clara aumenta a credibilidade em até 75%.</p><p><strong>3. CTA (Call-to-Action) Estratégico:</strong> Botões de ação visíveis, com cores contrastantes e textos persuasivos que geram urgência.</p><h3>Psicologia das Cores em Landing Pages</h3><p>Estudos mostram que botões laranja e vermelhos aumentam conversões em 21% comparado a cores neutras. O contraste é fundamental para guiar o olhar do usuário.</p><h3>Velocidade é Conversão</h3><p>Uma landing page que carrega em menos de 2 segundos tem 47% mais chance de converter. A otimização técnica é tão importante quanto o design.</p><h3>Prova Social: O Poder dos Testemunhos</h3><p>Landing pages com depoimentos de clientes reais aumentam a taxa de conversão em até 34%. A prova social é um dos gatilhos mentais mais poderosos.</p>',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    '2024-12-20 10:00:00+00',
    '12 min',
    true,
    (SELECT id FROM public.authors WHERE name = 'SupArt Team' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'landing-pages' LIMIT 1)
),
(
    '15 Gatilhos Mentais que Aumentam as Vendas Online em 300%',
    '15-gatilhos-mentais-vendas-online',
    'Conheça os gatilhos psicológicos mais poderosos do marketing digital e aprenda como aplicá-los em suas campanhas para multiplicar suas conversões.',
    '<h2>Gatilhos Mentais: A Ciência Por Trás das Decisões de Compra</h2><p>Gatilhos mentais são atalhos cognitivos que nosso cérebro usa para tomar decisões rápidas. No marketing digital, eles são ferramentas poderosas para influenciar comportamentos.</p><h3>1. Escassez</h3><p>"Apenas 3 vagas restantes!" - A escassez ativa o medo de perder oportunidades (FOMO) e acelera a decisão de compra.</p><h3>2. Urgência</h3><p>Ofertas com prazo limitado aumentam conversões em até 332% segundo pesquisas da Unbounce.</p><h3>3. Prova Social</h3><p>Mostrar que outras pessoas já compraram cria validação e reduz o risco percebido. "Mais de 10.000 clientes satisfeitos" é um exemplo clássico.</p><h3>4. Autoridade</h3><p>Certificações, prêmios e logos de clientes reconhecidos aumentam a credibilidade instantaneamente.</p><h3>5. Reciprocidade</h3><p>Oferecer algo de valor gratuito (ebook, consultoria) cria uma obrigação psicológica de retribuir.</p>',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    '2024-12-18 14:00:00+00',
    '10 min',
    true,
    (SELECT id FROM public.authors WHERE name = 'Lucas Ferreira' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'conversoes' LIMIT 1)
),
(
    'SEO para Landing Pages: Como Ranquear no Google em 30 Dias',
    'seo-landing-pages-ranquear-google',
    'Estratégias práticas e comprovadas para otimizar sua landing page e aparecer na primeira página do Google. Inclui checklist completo de SEO técnico.',
    '<h2>Por que SEO é Crucial para Landing Pages</h2><p>Enquanto anúncios pagos trazem tráfego imediato, uma landing page otimizada para SEO gera leads de forma consistente e gratuita a longo prazo.</p><h3>Pesquisa de Palavras-Chave: A Fundação do SEO</h3><p>Use ferramentas como Ubersuggest ou SEMrush para encontrar termos com alto volume de busca e baixa concorrência. Foque em long-tail keywords.</p><h3>Otimização On-Page</h3><p><strong>Title Tag:</strong> Deve conter a palavra-chave principal e ter no máximo 60 caracteres.</p><p><strong>Meta Description:</strong> 155 caracteres persuasivos que incluem CTA e palavra-chave.</p><p><strong>Heading Tags:</strong> Use H1 para título principal, H2 para subtítulos e mantenha hierarquia.</p><h3>Core Web Vitals: O Novo Fator de Ranqueamento</h3><p>Google prioriza páginas com LCP menor que 2.5s, FID menor que 100ms e CLS menor que 0.1. A velocidade técnica impacta diretamente o ranking.</p>',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop',
    '2024-12-15 09:00:00+00',
    '15 min',
    false,
    (SELECT id FROM public.authors WHERE name = 'SupArt Team' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'marketing-digital' LIMIT 1)
),
(
    'UX Design: 7 Erros que Estão Matando suas Conversões',
    'ux-design-7-erros-matando-conversoes',
    'Identifique e corrija os erros de experiência do usuário que estão fazendo você perder clientes todos os dias. Com exemplos práticos e soluções imediatas.',
    '<h2>UX Design: Mais que Estética, É Estratégia de Negócio</h2><p>Um site bonito que não converte é apenas um site bonito. UX design trata de criar jornadas que levam naturalmente à conversão.</p><h3>Erro #1: Formulários Muito Longos</h3><p>Cada campo adicional em um formulário reduz conversões em 11%. Peça apenas o essencial: nome e email geralmente são suficientes.</p><h3>Erro #2: Falta de Hierarquia Visual</h3><p>Sem uma hierarquia clara, o usuário não sabe onde focar. Use tamanhos, cores e espaçamento para guiar o olhar.</p><h3>Erro #3: CTAs Genéricos</h3><p>"Enviar" ou "Clique aqui" são péssimos. Use "Quero Minha Landing Page Grátis" - específico e orientado a benefício.</p><h3>Erro #4: Tempo de Carregamento Alto</h3><p>40% dos usuários abandonam sites que levam mais de 3 segundos para carregar. Otimize imagens e remova scripts desnecessários.</p>',
    'https://images.unsplash.com/photo-1586717791821-3f44e8cd7742?q=80&w=2070&auto=format&fit=crop',
    '2024-12-12 11:00:00+00',
    '8 min',
    false,
    (SELECT id FROM public.authors WHERE name = 'SupArt Team' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'web-design' LIMIT 1)
),
(
    'Como Usar IA para Criar Conteúdo que Converte [Guia 2024]',
    'ia-criar-conteudo-que-converte',
    'Descubra como ferramentas de Inteligência Artificial podem acelerar sua produção de conteúdo mantendo qualidade e personalização. Prompts práticos inclusos.',
    '<h2>IA no Marketing de Conteúdo: Ferramenta, Não Substituto</h2><p>A Inteligência Artificial revolucionou a criação de conteúdo, mas o toque humano ainda é essencial para conexão emocional e conversão.</p><h3>Melhores Ferramentas de IA para Marketing</h3><p><strong>ChatGPT:</strong> Geração de textos, ideias e estruturas de conteúdo.</p><p><strong>Midjourney:</strong> Criação de imagens únicas para redes sociais e blogs.</p><p><strong>Jasper AI:</strong> Copywriting otimizado para conversão e SEO.</p><h3>Prompts que Geram Resultados</h3><p>Em vez de "escreva sobre marketing digital", use: "Crie um artigo de 1000 palavras sobre [tópico específico] para [público-alvo], incluindo [benefícios], no tom [profissional/casual]".</p><h3>O Perigo da IA Genérica</h3><p>Conteúdo 100% gerado por IA sem edição humana é facilmente identificável e tem baixo engajamento. Use IA para velocidade, humanos para estratégia.</p>',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2032&auto=format&fit=crop',
    '2024-12-10 16:00:00+00',
    '11 min',
    false,
    (SELECT id FROM public.authors WHERE name = 'Lucas Ferreira' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'ia-automacao' LIMIT 1)
),
(
    'Design Responsivo: Por que 68% das Vendas Vêm do Mobile',
    'design-responsivo-vendas-mobile',
    'Aprenda a otimizar seu site para dispositivos móveis e capture o tráfego que mais cresce no Brasil. Mobile-first não é mais opcional.',
    '<h2>A Revolução Mobile: Números que Não Mentem</h2><p>Em 2024, 68% dos acessos à internet no Brasil vêm de smartphones. Se seu site não é mobile-first, você está literalmente perdendo a maioria dos seus clientes.</p><h3>Mobile-First vs Mobile-Friendly</h3><p>Mobile-friendly ajusta desktop para mobile. Mobile-first projeta PRIMEIRO para mobile, depois adapta para desktop. A diferença no resultado é dramática.</p><h3>Otimizações Essenciais para Mobile</h3><p><strong>Tamanho de Fonte:</strong> Mínimo 16px para textos principais. Menor que isso força zoom.</p><p><strong>Botões:</strong> Mínimo 44x44 pixels para facilitar toque.</p><p><strong>Imagens:</strong> Use formatos modernos como WebP e carregamento lazy.</p><h3>Teste em Dispositivos Reais</h3><p>Emuladores são úteis, mas nada substitui testar em iPhones e Androids reais de diferentes tamanhos.</p>',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    '2024-12-08 13:00:00+00',
    '9 min',
    false,
    (SELECT id FROM public.authors WHERE name = 'SupArt Team' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'web-design' LIMIT 1)
),
(
    'Análise de Conversão: KPIs que Realmente Importam em 2024',
    'analise-conversao-kpis-importantes',
    'Pare de perder tempo com métricas de vaidade. Descubra os indicadores que realmente preveem crescimento e lucratividade no seu negócio digital.',
    '<h2>Métricas de Vaidade vs Métricas de Crescimento</h2><p>Milhões de visualizações são inúteis se não geram vendas. Foque em KPIs que impactam diretamente o faturamento.</p><h3>Taxa de Conversão</h3><p>A rainha das métricas. Se 100 visitantes chegam e 3 compram, você tem 3% de conversão. A média do mercado é 2-5%.</p><h3>Custo por Aquisição (CAC)</h3><p>Quanto você gasta para conquistar um cliente? Se gasta R$100 e cliente paga R$50, seu negócio é insustentável.</p><h3>Lifetime Value (LTV)</h3><p>Quanto um cliente gera de receita ao longo do relacionamento? LTV deve ser no mínimo 3x maior que CAC.</p><h3>Taxa de Rejeição</h3><p>Se 70% dos visitantes saem sem interagir, há problemas graves de UX ou relevância.</p><h3>Ferramentas Essenciais</h3><p>Google Analytics 4, Hotjar para mapas de calor, e Microsoft Clarity são essenciais e gratuitas.</p>',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    '2024-12-05 10:00:00+00',
    '10 min',
    false,
    (SELECT id FROM public.authors WHERE name = 'Lucas Ferreira' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'conversoes' LIMIT 1)
),
(
    'Copywriting Persuasivo: Fórmulas que Vendem Sozinhas',
    'copywriting-persuasivo-formulas-vendas',
    'Domine as fórmulas de copywriting mais eficazes do mercado e transforme textos comuns em máquinas de vendas. Com exemplos práticos aplicáveis hoje.',
    '<h2>Copywriting: A Arte de Vender com Palavras</h2><p>Um bom copy pode multiplicar vendas por 10x. Um copy ruim mata qualquer produto, por melhor que seja.</p><h3>Fórmula AIDA</h3><p><strong>Atenção:</strong> "Pare de perder clientes para concorrentes"</p><p><strong>Interesse:</strong> "Descubra a estratégia que triplicou vendas de 500+ empresas"</p><p><strong>Desejo:</strong> "Imagine fechar 30% mais vendas este mês"</p><p><strong>Ação:</strong> "Clique aqui para começar agora"</p><h3>Fórmula PAS (Problema-Agitação-Solução)</h3><p><strong>Problema:</strong> "Seu site não converte"</p><p><strong>Agitação:</strong> "Você está gastando em anúncios e perdendo clientes para concorrentes com sites melhores"</p><p><strong>Solução:</strong> "Nossa landing page otimizada aumenta conversões em média 240%"</p><h3>Headlines que Convertem</h3><p>Use números, urgência e promessas específicas. "Como Ganhar R$10.000 em 30 Dias" converte 8x mais que "Estratégias de Vendas".</p>',
    'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop',
    '2024-12-01 15:00:00+00',
    '13 min',
    false,
    (SELECT id FROM public.authors WHERE name = 'Lucas Ferreira' LIMIT 1),
    (SELECT id FROM public.categories WHERE slug = 'marketing-digital' LIMIT 1)
)
ON CONFLICT (slug) DO NOTHING;
