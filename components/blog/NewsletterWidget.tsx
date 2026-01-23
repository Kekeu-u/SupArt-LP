"use client";

import { useState } from "react";

export const NewsletterWidget = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Email inválido");
            return;
        }

        setStatus("loading");

        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage(data.message || "Bem-vindo à elite!");
                setEmail("");
                // Removed timeout to let the success message shine
            } else {
                setStatus("error");
                setMessage(data.error || "Erro ao se inscrever");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Erro ao conectar. Tente novamente.");
        }
    };

    return (
        <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50/50 via-white/80 to-gray-50/50 backdrop-blur-sm p-6 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-blue-500/5 animate-pulse pointer-events-none" />

            <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">Junte-se à Comunidade</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    <span className="font-semibold text-gray-700">Insights de IA</span> direto no seu inbox.
                </p>

                <form className="space-y-3" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading" || status === "success"}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-gray-500 focus:ring-4 focus:ring-gray-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 backdrop-blur-sm"
                    />

                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="w-full bg-gradient-to-r from-gray-600 to-blue-600 text-white py-3 rounded-xl text-sm font-bold hover:from-gray-500 hover:to-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-gray-500/25 flex items-center justify-center gap-2"
                    >
                        {status === "loading" && (
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        {status === "loading" ? "Inscrevendo..." : status === "success" ? "✓ Inscrito!" : "Inscrever-se"}
                    </button>

                    {message && (
                        <div className={`text-xs text-center py-2 px-3 rounded-lg ${status === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                            }`}>
                            {message}
                        </div>
                    )}

                    <p className="text-[10px] text-gray-500 text-center leading-tight">
                        Sem spam. Cancele quando quiser.
                    </p>
                </form>
            </div>
        </div>
    );
};
