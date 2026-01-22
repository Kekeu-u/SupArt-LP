"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { FaUserPlus, FaPhoneAlt, FaBrain, FaFileContract } from "react-icons/fa";

const steps = [
    { icon: FaUserPlus, title: { en: "Registration", pt: "Cadastro" }, description: { en: "Click on 'Hire AI Consultation' and fill out the form.", pt: "Clique em 'Entender como funciona' e preencha o formulário." } },
    { icon: FaPhoneAlt, title: { en: "Contact", pt: "Contato" }, description: { en: "Our team contacts you to understand your moment and confirm hiring.", pt: "Nossa equipe entra em contato para entender seu momento e coletar dados para um diagnóstico." } },
    { icon: FaBrain, title: { en: "AI Consultation", pt: "Consulta de IA" }, description: { en: "We map your pains and opportunities. You leave with total clarity.", pt: "Mapeamos suas dores e oportunidades. Você sai com total clareza." } },
    { icon: FaFileContract, title: { en: "Proposal", pt: "Proposta" }, description: { en: "We present the ideal solutions: analysis, consulting, or agent development.", pt: "Apresentamos as soluções ideais: análise, consultoria ou desenvolvimento de agentes." } }
];

export const Method = () => {
    const { locale, t } = useI18n();

    return (
        <section id="method" className="py-24 px-8 md:px-16 lg:px-24 bg-[#F5F5F7]">
            {/* Header */}
            <motion.div
                className="text-center mb-16 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
                    {t("The SupArt Method", "O Método SupArt")}
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                    {t("AI at the center of your business requires method.", "IA no centro do seu negócio exige método.")}
                </p>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {steps.map((step, i) => (
                    <motion.article
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        transition={{
                            opacity: { delay: i * 0.1, duration: 0.5 },
                            y: { delay: i * 0.1, duration: 0.5 },
                            default: { duration: 0.2 } // Hover instantâneo
                        }}
                        className="group bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-shadow duration-300"
                    >
                        {/* Icon */}
                        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                            <step.icon className="text-white text-xl" />
                        </div>

                        {/* Number */}
                        <span className="text-xs font-bold text-gray-400 mb-2 block tracking-wider">
                            0{i + 1}
                        </span>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {step.title[locale]}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {step.description[locale]}
                        </p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};
