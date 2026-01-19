// Demo flow data - Multi-niche with professionals and procedures

export interface Professional {
    id: string;
    name: string;
    specialty: string;
    avatar?: string;
    procedures: string[];
}

export interface Niche {
    id: string;
    name: string;
    icon: string;
    color: string;
    message: {
        text: string;
        sender: string;
        time: string;
        targetProcedure: string; // The procedure mentioned in the message
    };
    botResponse: string; // Bot reply after patient message
    professionals: Professional[];
    crmFields: { label: string; value: string }[];
    timeSlots: { time: string; available: boolean }[];
}

export const niches: Record<string, Niche> = {
    clinic: {
        id: 'clinic',
        name: 'Clínica Médica',
        icon: '🏥',
        color: 'purple',
        message: {
            text: 'Quero marcar uma consulta para lipo HD',
            sender: 'Maria Silva',
            time: '14:02',
            targetProcedure: 'Lipo HD'
        },
        botResponse: 'Entendido, Maria! 💜 Temos profissionais especializados em Lipo HD. Vou te mostrar as opções disponíveis...',
        professionals: [
            {
                id: 'dr-francisco',
                name: 'Dr. Francisco',
                specialty: 'Cirurgião Plástico',
                procedures: ['Lipo HD', 'Silicone', 'Renuvion', 'Mastopexia']
            },
            {
                id: 'dr-roberto',
                name: 'Dr. Roberto',
                specialty: 'Cirurgião Plástico',
                procedures: ['Lipo HD', 'Abdominoplastia', 'Lipoescultura']
            },
            {
                id: 'dra-janaina',
                name: 'Dra. Janaína',
                specialty: 'Ginecologista',
                procedures: ['Preventivo', 'Ninfoplastia', 'Saúde Sexual']
            }
        ],
        crmFields: [
            { label: 'Nome', value: 'Maria Silva' },
            { label: 'CPF', value: '123.456.789-00' },
            { label: 'Telefone', value: '(11) 99999-9999' },
            { label: 'Procedimento', value: 'Lipo HD' },
            { label: 'Indicação', value: 'Instagram' }
        ],
        timeSlots: [
            { time: '09:00', available: true },
            { time: '10:00', available: true },
            { time: '11:00', available: false },
            { time: '14:00', available: true },
            { time: '15:00', available: true },
            { time: '16:00', available: false }
        ]
    },
    automotive: {
        id: 'automotive',
        name: 'Estética Automotiva',
        icon: '🚗',
        color: 'cyan',
        message: {
            text: 'Quero aplicar PPF no meu BMW',
            sender: 'Carlos Eduardo',
            time: '10:15',
            targetProcedure: 'PPF'
        },
        botResponse: 'Perfeito, Carlos! 🚗 Temos especialistas em PPF para o seu BMW. Deixa eu verificar a disponibilidade...',
        professionals: [
            {
                id: 'joao-ppf',
                name: 'João',
                specialty: 'Especialista PPF',
                procedures: ['PPF Total', 'PPF Parcial', 'PPF Premium']
            },
            {
                id: 'carlos-ppf',
                name: 'Carlos',
                specialty: 'PPF & Ceramic',
                procedures: ['PPF', 'Ceramic Pro', 'Vitrificação']
            },
            {
                id: 'ana-polish',
                name: 'Ana',
                specialty: 'Polimento',
                procedures: ['Polimento Técnico', 'Correção de Pintura']
            }
        ],
        crmFields: [
            { label: 'Nome', value: 'Carlos Eduardo' },
            { label: 'Veículo', value: 'BMW M3 2024' },
            { label: 'Placa', value: 'ABC-1234' },
            { label: 'Serviço', value: 'PPF Total' },
            { label: 'Orçamento', value: 'R$ 12.000' }
        ],
        timeSlots: [
            { time: '08:00', available: true },
            { time: '10:00', available: false },
            { time: '13:00', available: true },
            { time: '15:00', available: true }
        ]
    },
    dental: {
        id: 'dental',
        name: 'Protético Dental',
        icon: '🦷',
        color: 'emerald',
        message: {
            text: 'Preciso fazer uma prótese total superior',
            sender: 'José Oliveira',
            time: '09:30',
            targetProcedure: 'Prótese Total'
        },
        botResponse: 'Claro, José! 🦷 Temos ótimos profissionais para prótese total. Vou encontrar os especialistas para você...',
        professionals: [
            {
                id: 'dr-silva',
                name: 'Dr. Silva',
                specialty: 'Implantodontista',
                procedures: ['Implante', 'Enxerto Ósseo', 'Prótese sobre Implante']
            },
            {
                id: 'dra-costa',
                name: 'Dra. Costa',
                specialty: 'Protesista',
                procedures: ['Prótese Total', 'Prótese Parcial', 'Coroas']
            },
            {
                id: 'dr-alves',
                name: 'Dr. Alves',
                specialty: 'Reabilitação Oral',
                procedures: ['Prótese Total', 'Reabilitação Completa']
            }
        ],
        crmFields: [
            { label: 'Nome', value: 'José Oliveira' },
            { label: 'CPF', value: '987.654.321-00' },
            { label: 'Convênio', value: 'Particular' },
            { label: 'Tipo Prótese', value: 'Total Superior' },
            { label: 'Urgência', value: 'Normal' }
        ],
        timeSlots: [
            { time: '09:00', available: true },
            { time: '11:00', available: true },
            { time: '14:00', available: false },
            { time: '16:00', available: true }
        ]
    },
    realestate: {
        id: 'realestate',
        name: 'Imobiliária',
        icon: '🏠',
        color: 'orange',
        message: {
            text: 'Procuro apartamento 2 quartos na zona sul',
            sender: 'Fernanda Lima',
            time: '11:45',
            targetProcedure: 'Apartamento'
        },
        botResponse: 'Oi Fernanda! 🏠 Temos corretores especializados na zona sul. Vou te apresentar os melhores profissionais...',
        professionals: [
            {
                id: 'lucas-vendas',
                name: 'Lucas',
                specialty: 'Vendas Residenciais',
                procedures: ['Apartamento', 'Casa', 'Cobertura']
            },
            {
                id: 'marina-vendas',
                name: 'Marina',
                specialty: 'Alto Padrão',
                procedures: ['Apartamento', 'Cobertura', 'Mansões']
            },
            {
                id: 'pedro-comercial',
                name: 'Pedro',
                specialty: 'Comercial',
                procedures: ['Salas', 'Galpões', 'Lojas']
            }
        ],
        crmFields: [
            { label: 'Nome', value: 'Fernanda Lima' },
            { label: 'Telefone', value: '(11) 98888-8888' },
            { label: 'Tipo Imóvel', value: 'Apartamento 2 quartos' },
            { label: 'Região', value: 'Zona Sul' },
            { label: 'Faixa Preço', value: 'R$ 400-600k' }
        ],
        timeSlots: [
            { time: '10:00', available: true },
            { time: '11:00', available: true },
            { time: '15:00', available: false },
            { time: '17:00', available: true }
        ]
    }
};

// Helper to get professionals who can handle the target procedure
export const getMatchingProfessionals = (niche: Niche): Professional[] => {
    return niche.professionals.filter(p =>
        p.procedures.some(proc =>
            proc.toLowerCase().includes(niche.message.targetProcedure.toLowerCase()) ||
            niche.message.targetProcedure.toLowerCase().includes(proc.toLowerCase())
        )
    );
};

// Default niche for URL parameter
export const defaultNiche = 'clinic';
