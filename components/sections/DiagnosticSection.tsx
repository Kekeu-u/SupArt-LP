"use client";

import { useState } from "react";
import { DiagnosticForm } from "@/components/diagnostic/DiagnosticForm";
import { useI18n } from "@/lib/i18n";
import { Modal } from "@/components/ui/Modal";
import { ShinyButton } from "@/components/ui/ShinyButton";

export const DiagnosticSection = () => {
    const { t } = useI18n();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="contact" className="py-32 relative overflow-hidden">


            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-black/90 border border-black text-white text-xs font-bold uppercase tracking-widest mb-6">
                        {t("Start Now", "Comece Agora")}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight drop-shadow-sm">
                        {t("Start your AI First Journey", "Comece sua Jornada AI First")}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
                        {t(
                            "Receive a personalized diagnosis and discover how AI can scale your business.",
                            "Receba um diagnóstico personalizado e descubra como a IA pode escalar seu negócio."
                        )}
                    </p>

                    <a href="/diagnostico">
                        <ShinyButton className="cursor-pointer">
                            {t("Get Free Diagnosis", "Fazer Diagnóstico Gratuito")}
                        </ShinyButton>
                    </a>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="p-1">
                        <DiagnosticForm onComplete={() => setTimeout(() => setIsModalOpen(false), 2000)} />
                    </div>
                </Modal>
            </div>
        </section>
    );
};
