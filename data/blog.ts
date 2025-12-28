export interface Author {
    name: string;
    role: string;
    avatar: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    author: Author;
    category: string;
    readTime: string;
    content?: string; // HTML or Markdown content
    featured?: boolean;
}

export const authors: Record<string, Author> = {
    supart: {
        name: "SupArt Agency",
        role: "Agência Digital Premium",
        avatar: "/supart-logo-icon.png",
    },
};

export const blogPosts: BlogPost[] = [
    // ===== ARTIGOS 80/20 - FEATURED =====
    {
        slug: "clientes-2k-custam-mais-que-15k",
        title: "Por Que Clientes de R$2k Custam Mais que Clientes de R$15k",
        excerpt: "A matemática contraintuitiva do posicionamento High-Ticket: como atrair os melhores projetos e escalar sua operação sem burnout.",
        coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
        date: "Dez 20, 2024",
        author: authors.supart,
        category: "Negócios",
        readTime: "8 min",
        featured: true,
        content: `
            <p class="lead">"Mais um projeto de R$2.000. Mais 47 e-mails de revisão. Mais uma sexta à noite no escritório."</p>

            <p>Carlos fechou o notebook e olhou para a parede. Três anos de agência. Dezenas de clientes. E a sensação de que estava correndo numa esteira — se esforçando cada vez mais, mas sem sair do lugar.</p>

            <p>O que ele não sabia é que o problema não era a <em>quantidade</em> de trabalho. Era a <em>qualidade</em> dos clientes.</p>

            <hr>

            <h2>🔥 O Paradoxo Que Ninguém Te Conta</h2>

            <p>Existe uma verdade contraintuitiva no mundo dos negócios de serviço:</p>

            <blockquote>
            <p><em>"Se você está competindo por preço, já perdeu. A única forma de vencer é não jogar esse jogo."</em> — Naval Ravikant</p>
            </blockquote>

            <p>Clientes que pagam menos tendem a:</p>

            <ul>
                <li><strong>Questionar cada decisão:</strong> Cada pixel, cada cor, cada fonte vira uma discussão de 3 dias</li>
                <li><strong>Exigir revisões infinitas:</strong> O escopo expande, mas o orçamento não</li>
                <li><strong>Ter urgência irreal:</strong> Tudo é para ontem, sempre</li>
                <li><strong>Desvalorizar seu trabalho:</strong> Afinal, "é só um site"</li>
            </ul>

            <p>Enquanto isso, clientes que pagam 5x mais:</p>

            <ul>
                <li><strong>Confiam no seu processo:</strong> Eles contrataram você pela expertise, não para microgerenciar</li>
                <li><strong>Respeitam prazos:</strong> Sabem que qualidade leva tempo</li>
                <li><strong>Valorizam resultados:</strong> Focam no ROI, não no custo</li>
                <li><strong>Indicam outros clientes premium:</strong> Ricos conhecem ricos</li>
            </ul>

            <hr>

            <h2>💰 A Matemática Brutal</h2>

            <p>Vamos fazer as contas que ninguém quer fazer:</p>

            <table>
                <thead>
                    <tr>
                        <th>Métrica</th>
                        <th>Cliente R$2k</th>
                        <th>Cliente R$15k</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Reuniões</td>
                        <td>8-12</td>
                        <td>3-5</td>
                    </tr>
                    <tr>
                        <td>Revisões</td>
                        <td>Infinitas</td>
                        <td>2-3</td>
                    </tr>
                    <tr>
                        <td>E-mails trocados</td>
                        <td>100+</td>
                        <td>20-30</td>
                    </tr>
                    <tr>
                        <td>Tempo real gasto</td>
                        <td>80h+</td>
                        <td>40h</td>
                    </tr>
                    <tr>
                        <td>Valor por hora real</td>
                        <td>R$25</td>
                        <td>R$375</td>
                    </tr>
                </tbody>
            </table>

            <p>O cliente "barato" custa <strong>15x mais</strong> por hora trabalhada. E isso sem contar o custo invisível: sua energia mental, sua criatividade, sua saúde.</p>

            <blockquote>
            <p><em>"Preço é o que você paga. Valor é o que você recebe."</em> — Warren Buffett</p>
            </blockquote>

            <hr>

            <h2>🎯 Por Que Isso Acontece?</h2>

            <p>Alex Hormozi explica em "$100M Offers": clientes que pagam pouco estão comprando um <em>commodity</em>. Clientes que pagam muito estão comprando uma <em>transformação</em>.</p>

            <p>Quando você cobra R$2.000 por um site, o cliente pensa: "Estou comprando um site."</p>

            <p>Quando você cobra R$15.000, o cliente pensa: "Estou investindo no crescimento do meu negócio."</p>

            <p>A diferença não está no produto. Está na <strong>percepção de valor</strong>.</p>

            <hr>

            <h2>🚀 O Framework High-Ticket (4 Pilares)</h2>

            <h3>Pilar 1: Posicionamento Premium</h3>

            <p>Seu site, portfólio e comunicação precisam gritar "premium". Clientes de R$15k não contratam agências com sites de template.</p>

            <p>Pergunte-se: se alguém entrasse no meu site agora, pensaria "uau" ou "meh"?</p>

            <p>Como diz Seth Godin em "This is Marketing": <em>"As pessoas não compram o que você faz. Compram a história que você conta."</em></p>

            <h3>Pilar 2: Especialização Nichada</h3>

            <p>Ser "o melhor para todo mundo" significa ser "mediano para ninguém".</p>

            <p>Escolha um nicho e domine-o:</p>
            <ul>
                <li>Empresas de tech SaaS?</li>
                <li>Clínicas odontológicas premium?</li>
                <li>Escritórios de advocacia corporativa?</li>
            </ul>

            <p>Quanto mais específico, mais você pode cobrar. Um "designer" cobra X. Um "especialista em landing pages para dentistas de alto padrão" cobra 5X.</p>

            <h3>Pilar 3: Prova Social Estratégica</h3>

            <p>Seus cases precisam mostrar <strong>resultados</strong>, não entregas.</p>

            <p>"Aumentamos a conversão em 340%" vale mais que "fizemos um site bonito".</p>

            <p>"Geramos R$2.3M em vendas" vale mais que "criamos uma landing page".</p>

            <h3>Pilar 4: Processo Claro e Documentado</h3>

            <p>Clientes premium valorizam previsibilidade. Eles querem saber exatamente:</p>
            <ul>
                <li>O que vai acontecer em cada etapa</li>
                <li>Quando vão receber cada entrega</li>
                <li>Como a comunicação vai funcionar</li>
            </ul>

            <p>Um processo profissional justifica um preço profissional.</p>

            <hr>

            <h2>📋 Plano de Ação (30 Dias)</h2>

            <p><strong>Semana 1-2:</strong></p>
            <ul>
                <li>Redesenhe seu site para comunicar premium</li>
                <li>Refaça 3 cases com foco em resultados (números)</li>
            </ul>

            <p><strong>Semana 3:</strong></p>
            <ul>
                <li>Defina seu nicho específico</li>
                <li>Crie conteúdo direcionado para esse nicho</li>
            </ul>

            <p><strong>Semana 4:</strong></p>
            <ul>
                <li>Documente seu processo em 5-7 etapas claras</li>
                <li>Aumente seus preços em 50-100%</li>
            </ul>

            <hr>

            <h2>🔄 O Efeito Composto</h2>

            <p>Carlos, aquele do início, fez exatamente isso. Seis meses depois:</p>

            <ul>
                <li>4 clientes (antes eram 15)</li>
                <li>Faturamento 40% maior</li>
                <li>Sextas-feiras livres</li>
                <li>Zero e-mails de "só mais uma alteraçãozinha"</li>
            </ul>

            <p>A pergunta não é "como consigo mais clientes?"</p>

            <p>A pergunta é: <strong>como consigo melhores clientes?</strong></p>

            <hr>

            <h2>📚 Leitura Recomendada</h2>

            <ul>
                <li><strong>"$100M Offers"</strong> — Alex Hormozi</li>
                <li><strong>"This is Marketing"</strong> — Seth Godin</li>
                <li><strong>"The Win Without Pitching Manifesto"</strong> — Blair Enns</li>
                <li><strong>"Building a StoryBrand"</strong> — Donald Miller</li>
            </ul>
        `
    },
    {
        slug: "5-automacoes-eliminam-10-horas-semana",
        title: "As 5 Automações que Eliminam 10 Horas/Semana da sua Agência",
        excerpt: "Escalando sua operação sem precisar contratar mais gente imediatamente. Ferramentas e workflows que você pode implementar hoje.",
        coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
        date: "Dez 18, 2024",
        author: authors.supart,
        category: "Automação",
        readTime: "10 min",
        featured: true,
        content: `
            <p class="lead">"Segunda-feira, 8h47. Fernanda abriu o e-mail: 'Pode me mandar a atualização do projeto?'"</p>

            <p>Ela suspirou. Era a terceira vez naquela semana. Abriu o Notion, copiou as tasks concluídas, formatou num e-mail bonito, e enviou.</p>

            <p>15 minutos gastos. Multiplicado por 8 clientes. Multiplicado por 4 semanas.</p>

            <p><strong>8 horas por mês</strong> — só respondendo "como está o projeto?".</p>

            <p>E se eu te dissesse que isso pode ser feito em <em>zero</em> minutos?</p>

            <hr>

            <h2>🤖 O Mito do "Não Tenho Tempo"</h2>

            <p>Você não tem problema de tempo. Você tem problema de <strong>sistemas</strong>.</p>

            <blockquote>
            <p><em>"Trabalhe NO seu negócio, não PARA o seu negócio."</em> — Michael Gerber, The E-Myth Revisited</p>
            </blockquote>

            <p>A maioria das agências opera no modo "bombeiro": apagando incêndios, respondendo urgências, correndo atrás do próprio rabo.</p>

            <p>Mas as agências que escalam operam no modo "arquiteto": criando sistemas que funcionam sem elas.</p>

            <hr>

            <h2>⏰ O Custo Invisível das Tarefas Manuais</h2>

            <p>Toda vez que você para para fazer algo repetitivo:</p>

            <ul>
                <li><strong>Perde contexto:</strong> Leva 23 minutos para voltar ao estado de "flow" criativo</li>
                <li><strong>Gasta energia cognitiva:</strong> Decisões triviais drenam a mesma energia que decisões importantes</li>
                <li><strong>Abre espaço para erros:</strong> Humanos erram. Sistemas não (quando bem configurados)</li>
                <li><strong>Não escala:</strong> Você é o gargalo da operação</li>
            </ul>

            <blockquote>
            <p><em>"Nunca automatize algo que possa ser eliminado, e nunca delegue algo que possa ser automatizado."</em> — Tim Ferriss, The 4-Hour Workweek</p>
            </blockquote>

            <hr>

            <h2>🚀 As 5 Automações Essenciais</h2>

            <h3>Automação 1: Geração de Propostas</h3>

            <p><strong>Ferramentas:</strong> Notion + Make (Integromat) ou Pipedrive</p>

            <p><strong>Como funciona:</strong></p>
            <ul>
                <li>Lead preenche formulário estruturado</li>
                <li>Sistema gera PDF de proposta personalizada</li>
                <li>Envia automaticamente com link para assinatura digital</li>
                <li>Agenda follow-up em 48h se não houver resposta</li>
            </ul>

            <p><strong>Tempo economizado:</strong> 2-3h/semana</p>

            <h3>Automação 2: Onboarding de Clientes</h3>

            <p><strong>Ferramentas:</strong> Notion Templates + Zapier + Calendly</p>

            <p><strong>Trigger:</strong> Cliente assina contrato</p>

            <p><strong>Ações automáticas:</strong></p>
            <ul>
                <li>Cria pasta no Drive com estrutura de projeto</li>
                <li>Envia e-mail de boas-vindas com checklist</li>
                <li>Agenda call de kickoff automaticamente</li>
                <li>Adiciona cliente no canal do Slack</li>
                <li>Cria tasks iniciais no sistema de gestão</li>
            </ul>

            <p><strong>Tempo economizado:</strong> 1-2h/semana</p>

            <h3>Automação 3: Updates Semanais para Clientes</h3>

            <p><strong>Ferramentas:</strong> Linear/Notion + Make + Email</p>

            <p>Toda sexta-feira às 17h, automaticamente:</p>
            <ul>
                <li>Sistema puxa tasks concluídas da semana</li>
                <li>Gera relatório formatado em HTML</li>
                <li>Envia para cada cliente ativo</li>
            </ul>

            <p><strong>Tempo economizado:</strong> 2h/semana (e zero mensagens "como está o projeto?")</p>

            <h3>Automação 4: Cobrança e Faturamento</h3>

            <p><strong>Ferramentas:</strong> Stripe + Notion + Contabilizei</p>

            <p>No dia 1 de cada mês:</p>
            <ul>
                <li>Sistema identifica contratos ativos</li>
                <li>Gera faturas automaticamente</li>
                <li>Envia links de pagamento</li>
                <li>Lembra cliente 3 dias antes do vencimento</li>
                <li>Notifica você se houver atraso</li>
            </ul>

            <p><strong>Tempo economizado:</strong> 3h/mês (e cashflow previsível)</p>

            <h3>Automação 5: Backup e Organização</h3>

            <p><strong>Ferramentas:</strong> Rclone + Drive + Notion</p>

            <p>Toda noite às 2h:</p>
            <ul>
                <li>Sincroniza arquivos de projetos ativos</li>
                <li>Comprime e arquiva projetos finalizados</li>
                <li>Atualiza links no Notion</li>
            </ul>

            <p><strong>Tempo economizado:</strong> 1h/semana (e paz de espírito)</p>

            <hr>

            <h2>💰 O ROI Real</h2>

            <p>Vamos fazer a conta:</p>

            <table>
                <thead>
                    <tr>
                        <th>Automação</th>
                        <th>Tempo Economizado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Propostas</td>
                        <td>2.5h/semana</td>
                    </tr>
                    <tr>
                        <td>Onboarding</td>
                        <td>1.5h/semana</td>
                    </tr>
                    <tr>
                        <td>Updates</td>
                        <td>2h/semana</td>
                    </tr>
                    <tr>
                        <td>Cobrança</td>
                        <td>0.75h/semana</td>
                    </tr>
                    <tr>
                        <td>Backup</td>
                        <td>1h/semana</td>
                    </tr>
                    <tr>
                        <td><strong>TOTAL</strong></td>
                        <td><strong>~10h/semana</strong></td>
                    </tr>
                </tbody>
            </table>

            <p>10 horas por semana = <strong>40 horas por mês</strong>.</p>

            <p>Se sua hora vale R$200, isso é <strong>R$8.000/mês em tempo recuperado</strong>.</p>

            <p>Em 1 ano: <strong>R$96.000</strong>.</p>

            <hr>

            <h2>📋 Plano de Ação (60 Dias)</h2>

            <p><strong>Semana 1-2:</strong> Documente TUDO que você faz repetidamente</p>

            <p><strong>Semana 3-4:</strong> Implemente Automação 1 (Propostas)</p>

            <p><strong>Semana 5-6:</strong> Implemente Automação 2 (Onboarding)</p>

            <p><strong>Semana 7-8:</strong> Implemente Automações 3-5</p>

            <hr>

            <h2>🔄 A Transformação de Fernanda</h2>

            <p>Lembra da Fernanda? 3 meses depois de implementar essas automações:</p>

            <ul>
                <li>Zero e-mails de "como está o projeto?"</li>
                <li>Terças e quintas livres para trabalho estratégico</li>
                <li>2 clientes novos (com o tempo que sobrou)</li>
                <li>Férias de 2 semanas sem apagar incêndio</li>
            </ul>

            <p>A pergunta é: <strong>o que VOCÊ faria com 10 horas extras por semana?</strong></p>

            <hr>

            <h2>📚 Leitura Recomendada</h2>

            <ul>
                <li><strong>"The E-Myth Revisited"</strong> — Michael Gerber</li>
                <li><strong>"The 4-Hour Workweek"</strong> — Tim Ferriss</li>
                <li><strong>"Atomic Habits"</strong> — James Clear</li>
                <li><strong>"Company of One"</strong> — Paul Jarvis</li>
            </ul>
        `
    },
    {
        slug: "roi-design-alta-fidelidade",
        title: "O ROI do Design de Alta Fidelidade: Convertendo Visitantes em Fãs",
        excerpt: "Como a estética premium aumenta a percepção de valor e a taxa de conversão. A ciência por trás do design que vende.",
        coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop",
        date: "Dez 15, 2024",
        author: authors.supart,
        category: "Design",
        readTime: "7 min",
        featured: true,
        content: `
            <p class="lead">"Quanto custa um site?"</p>

            <p>A pergunta chegou por e-mail às 23h47. Renato, dono de uma clínica de estética premium, estava pesquisando agências.</p>

            <p>Ele recebeu 3 orçamentos: R$2.000, R$8.000 e R$18.000.</p>

            <p>Escolheu o de R$2.000. "Site é site, né?"</p>

            <p>6 meses depois, sua taxa de conversão era 0.8%. A clínica ao lado, que investiu R$18.000, convertia a 3.2%.</p>

            <p>Com o mesmo tráfego de 5.000 visitantes/mês, a diferença era de <strong>120 clientes por mês</strong>. Com ticket médio de R$800, isso é <strong>R$96.000/mês</strong> que Renato estava deixando na mesa.</p>

            <p>O "site barato" custou-lhe uma fortuna.</p>

            <hr>

            <h2>🧠 A Ciência dos 0.05 Segundos</h2>

            <p>Estudos de neurociência e eye-tracking revelam uma verdade desconfortável:</p>

            <blockquote>
            <p><em>"Os usuários formam uma opinião sobre seu site em 0.05 segundos. Antes de ler uma única palavra."</em> — Google/Stanford Research</p>
            </blockquote>

            <p>O que acontece nesse instante?</p>

            <ul>
                <li><strong>94%</strong> das primeiras impressões são baseadas em design</li>
                <li><strong>75%</strong> dos usuários julgam a credibilidade pelo visual</li>
                <li><strong>38%</strong> abandonam sites com layout feio</li>
                <li>Design <strong>coerente</strong> aumenta confiança em 57%</li>
            </ul>

            <p>Seu site não compete apenas com concorrentes. Compete com a <em>expectativa</em> que o usuário tem de como um site profissional deve parecer.</p>

            <hr>

            <h2>🎨 O Que é Design de Alta Fidelidade?</h2>

            <p>Não é sobre "ser bonito". É sobre <strong>comunicar valor</strong> através de cada pixel.</p>

            <blockquote>
            <p><em>"Design não é apenas como parece. Design é como funciona."</em> — Steve Jobs</p>
            </blockquote>

            <h3>Os 5 Pilares do Design Premium</h3>

            <p><strong>1. Hierarquia Visual Intencional</strong></p>
            <p>O olho do usuário é guiado exatamente para onde você quer. CTAs são cristalinos. Informações são escaneáveis em segundos.</p>

            <p><strong>2. Espaçamento e Respiração</strong></p>
            <p>Marcas premium usam muito white space. Isso transmite sofisticação e clareza. Compare o site da Apple com um marketplace genérico.</p>

            <p><strong>3. Tipografia Deliberada</strong></p>
            <p>Fontes comunicam personalidade antes das palavras. Inter, SF Pro e Outfit dizem "moderno e profissional". Comic Sans diz... bem, você sabe.</p>

            <p><strong>4. Micro-interações</strong></p>
            <p>Botões que respondem ao hover. Transições suaves. Feedback visual. Cada interação deve ser satisfatória — como apertar um botão de iPhone.</p>

            <p><strong>5. Coerência Absoluta</strong></p>
            <p>Cores, espaçamentos, bordas, sombras — tudo segue um sistema. Isso cria confiança subliminar, mesmo que o usuário não saiba explicar por quê.</p>

            <hr>

            <h2>📊 O Impacto nos Números</h2>

            <p>Redesigns de alta fidelidade geralmente resultam em:</p>

            <table>
                <thead>
                    <tr>
                        <th>Métrica</th>
                        <th>Impacto Médio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tempo de permanência</td>
                        <td>+38%</td>
                    </tr>
                    <tr>
                        <td>Taxa de conversão</td>
                        <td>+25%</td>
                    </tr>
                    <tr>
                        <td>Taxa de rejeição</td>
                        <td>-40%</td>
                    </tr>
                    <tr>
                        <td>Compartilhamentos sociais</td>
                        <td>+60%</td>
                    </tr>
                    <tr>
                        <td>Tempo de navegação</td>
                        <td>+45%</td>
                    </tr>
                </tbody>
            </table>

            <p>Como explica Don Norman em "The Design of Everyday Things":</p>

            <blockquote>
            <p><em>"Bom design é invisível. Você nota quando está faltando, não quando está presente."</em></p>
            </blockquote>

            <hr>

            <h2>💰 A Matemática do ROI</h2>

            <p>Vamos fazer as contas do Renato:</p>

            <table>
                <thead>
                    <tr>
                        <th>Cenário</th>
                        <th>Site Barato</th>
                        <th>Site Premium</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Investimento</td>
                        <td>R$2.000</td>
                        <td>R$18.000</td>
                    </tr>
                    <tr>
                        <td>Taxa de conversão</td>
                        <td>0.8%</td>
                        <td>3.2%</td>
                    </tr>
                    <tr>
                        <td>Clientes/mês (5k visitantes)</td>
                        <td>40</td>
                        <td>160</td>
                    </tr>
                    <tr>
                        <td>Receita/mês (ticket R$800)</td>
                        <td>R$32.000</td>
                        <td>R$128.000</td>
                    </tr>
                    <tr>
                        <td><strong>Diferença/mês</strong></td>
                        <td colspan="2"><strong>R$96.000</strong></td>
                    </tr>
                </tbody>
            </table>

            <p>A diferença de R$16.000 no investimento se paga no <strong>primeiro mês</strong>.</p>

            <p>Em 12 meses, o ROI é de <strong>7.100%</strong>.</p>

            <hr>

            <h2>📋 Checklist de Design Premium</h2>

            <p>Seu site tem:</p>

            <ul>
                <li>☐ Hierarquia visual clara (3 segundos para entender a proposta)</li>
                <li>☐ White space generoso (não parece apertado)</li>
                <li>☐ Tipografia profissional (não fontes do sistema)</li>
                <li>☐ Animações sutis (hover, scroll, transitions)</li>
                <li>☐ Coerência de cores e espaçamentos</li>
                <li>☐ Mobile impecável (60%+ do tráfego)</li>
                <li>☐ Carregamento < 3 segundos</li>
            </ul>

            <p>Se marcou menos de 5, você está perdendo dinheiro.</p>

            <hr>

            <h2>🔄 O Que Aconteceu com Renato?</h2>

            <p>8 meses depois, Renato entrou em contato novamente.</p>

            <p>"Preciso de um site novo. Dessa vez, quero o melhor."</p>

            <p>Ele investiu R$22.000 num redesign completo. Em 90 dias:</p>

            <ul>
                <li>Conversão subiu de 0.8% para 2.9%</li>
                <li>Ticket médio aumentou 15% (percepção de valor)</li>
                <li>Tempo médio no site: de 47s para 3m12s</li>
            </ul>

            <p>O design não mudou o serviço. Mudou como as pessoas <strong>percebiam</strong> o serviço.</p>

            <p>A pergunta é: quanto você está <strong>perdendo</strong> com um design que não comunica seu valor real?</p>

            <hr>

            <h2>📚 Leitura Recomendada</h2>

            <ul>
                <li><strong>"The Design of Everyday Things"</strong> — Don Norman</li>
                <li><strong>"Refactoring UI"</strong> — Adam Wathan & Steve Schoger</li>
                <li><strong>"Don't Make Me Think"</strong> — Steve Krug</li>
                <li><strong>"Hooked"</strong> — Nir Eyal</li>
            </ul>
        `
    }
];

export const categories = [
    { name: "Negócios", count: "01" },
    { name: "Automação", count: "01" },
    { name: "Design", count: "01" },
];
