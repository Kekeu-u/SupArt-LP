"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SupArtLogo } from "@/components/ui/SupArtLogo";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function DiagnosticIntroPage() {
    const [accepted, setAccepted] = useState(false);

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black pointer-events-none" />

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
                {/* Logo */}
                <div className="mb-8">
                    <SupArtLogo className="h-12 w-12 md:h-16 md:w-16" />
                </div>

                {/* Headline */}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Sua jornada para se tornar uma empresa AI First começa agora
                </h1>

                {/* Subtext */}
                <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                    Para entender como a IA pode trabalhar pela sua empresa, precisamos de algumas informações rápidas.
                    Após o envio, um especialista da SupArt entrará em contato.
                </p>

                {/* Agreement */}
                <div className="flex flex-col items-center gap-6 w-full max-w-md">
                    <p className="text-gray-500 text-sm">
                        Ao clicar em "Iniciar", você concorda com nossa{" "}
                        <Link href="/politica-de-privacidade" className="text-blue-500 hover:text-blue-400 transition-colors underline underline-offset-2">
                            Política de Privacidade
                        </Link>.
                    </p>

                    {/* Checkbox */}
                    <button
                        onClick={() => setAccepted(!accepted)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${accepted
                                ? "bg-blue-500/20 border border-blue-500/50"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                    >
                        {accepted ? (
                            <FaCheckCircle className="text-xl text-blue-500" />
                        ) : (
                            <FaRegCircle className="text-xl text-gray-500" />
                        )}
                        <span className={`font-medium ${accepted ? "text-blue-400" : "text-gray-400"}`}>
                            Eu aceito os termos
                        </span>
                    </button>

                    {/* Start Button */}
                    <Link
                        href={accepted ? "/diagnostico/formulario" : "#"}
                        className="w-full"
                        onClick={(e) => {
                            if (!accepted) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button
                            disabled={!accepted}
                            className={`w-full font-bold py-4 px-8 rounded-full text-lg transition-all transform shadow-lg ${accepted
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-blue-500/20 cursor-pointer"
                                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Iniciar
                        </button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-gray-600 text-xs">
                © 2026 Desenvolvido por SupArt Agency
            </div>
        </main>
    );
}
