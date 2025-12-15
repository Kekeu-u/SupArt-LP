"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type ChatState = "idle" | "active" | "minimized";

interface HeroChatProps {
    onStateChange?: (isActive: boolean) => void;
}

// Animação simétrica para entrada/saída do popup
const popupVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.85,
        y: 40,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 300,
        }
    },
    exit: {
        opacity: 0,
        scale: 0.85,
        y: 40,
        transition: {
            duration: 0.25,
            ease: "easeIn",
        }
    }
};

// Animação do backdrop
const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

// Animação do ícone minimizado
const minimizedIconVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0,
        x: 100,
    },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 400,
            delay: 0.1,
        }
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        x: 50,
        transition: {
            duration: 0.2,
        }
    }
};

export const HeroChat = ({ onStateChange }: HeroChatProps) => {
    const [chatState, setChatState] = useState<ChatState>("idle");
    const [input, setInput] = useState("");
    const [hasMessages, setHasMessages] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat" }),
    });

    const isStreaming = status === "streaming";
    const isReady = status === "ready";

    // Notifica parent sobre mudança de estado
    useEffect(() => {
        onStateChange?.(chatState === "active");
    }, [chatState, onStateChange]);

    // Scroll no container de mensagens
    useEffect(() => {
        if (chatState === "active" && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages, chatState]);

    // Travar scroll quando chat ativo
    useEffect(() => {
        if (chatState === "active") {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [chatState]);

    // Autofocus no input
    useEffect(() => {
        if (chatState === "active" && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [chatState, messages]);

    // Fechar ao clicar fora do popup
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (chatState === "active" && chatRef.current && !chatRef.current.contains(e.target as Node)) {
                setChatState("minimized");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [chatState]);

    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && chatState === "active") {
                setChatState("minimized");
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [chatState]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && isReady) {
            sendMessage({ text: input });
            setInput("");
            setHasMessages(true);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    const getMessageText = (message: typeof messages[0] | undefined) => {
        if (!message || !message.parts) return "";
        return message.parts
            .filter(part => part.type === "text")
            .map(part => (part as { type: "text"; text: string }).text)
            .join("");
    };

    const glass = "bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-black/10";

    return (
        <>
            {/* ===== INPUT NO HERO ===== */}
            <AnimatePresence mode="wait">
                {chatState === "idle" && (
                    <motion.div
                        key="idle-input"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full max-w-md mx-auto px-4"
                        style={{ marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (input.trim()) {
                                    setChatState("active");
                                    setTimeout(() => {
                                        sendMessage({ text: input });
                                        setInput("");
                                        setHasMessages(true);
                                    }, 200);
                                }
                            }}
                        >
                            <div className={`${glass} rounded-2xl`}>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Descreva seu projeto..."
                                        className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-base"
                                        style={{
                                            padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1.25rem, 3vw, 1.5rem)',
                                            fontSize: '16px',
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="shrink-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                                        style={{
                                            width: 'clamp(2.5rem, 5vw, 2.75rem)',
                                            height: 'clamp(2.5rem, 5vw, 2.75rem)',
                                            marginRight: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                        }}
                                    >
                                        <svg
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            style={{ width: 'clamp(1.125rem, 2.5vw, 1.25rem)', height: 'clamp(1.125rem, 2.5vw, 1.25rem)' }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== POPUP CHAT ATIVO ===== */}
            <AnimatePresence>
                {chatState === "active" && (
                    <motion.div
                        key="chat-backdrop"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    >
                        <motion.div
                            ref={chatRef}
                            variants={popupVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`${glass} w-full max-w-md mx-4 max-h-[80vh] flex flex-col rounded-3xl overflow-hidden`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="w-2 h-2 rounded-full bg-emerald-500"
                                    />
                                    <span className="text-sm text-gray-500 font-medium">
                                        {isStreaming ? 'Pensando...' : 'SupArt AI'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setChatState("minimized")}
                                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                                <style jsx>{`
                                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                                `}</style>

                                {messages.length === 0 && !isStreaming && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center text-gray-400 text-sm py-8"
                                    >
                                        Me conte sobre seu projeto.
                                    </motion.p>
                                )}

                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.role === "user"
                                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md"
                                                : "bg-gray-100 text-gray-700 rounded-bl-md"
                                                }`}
                                        >
                                            {getMessageText(message)}
                                        </div>
                                    </motion.div>
                                ))}

                                {isStreaming && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                                            <div className="flex gap-1.5">
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Escreva aqui..."
                                        className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none py-3"
                                        style={{ fontSize: '16px' }}
                                        disabled={!isReady}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!isReady || !input.trim()}
                                        className="shrink-0 w-9 h-9 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== ÍCONE MINIMIZADO - Canto inferior esquerdo ===== */}
            <AnimatePresence>
                {chatState === "minimized" && (
                    <motion.button
                        key="minimized-icon"
                        variants={minimizedIconVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setChatState("active")}
                        className="fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full bg-white shadow-lg shadow-black/20 border border-gray-200 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group"
                    >
                        {/* Ícone de mensagem cinza */}
                        <svg
                            className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>

                        {/* Pulso azul lento */}
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-full bg-blue-500/30"
                        />

                        {/* Indicador de nova mensagem / online */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};
