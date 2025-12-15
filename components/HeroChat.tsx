"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ChatState = "idle" | "active" | "minimized";

interface HeroChatProps {
    onStateChange?: (isActive: boolean) => void;
}

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

    // Scroll só dentro do container de mensagens
    useEffect(() => {
        if (chatState === "active" && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages, chatState]);

    // Travar scroll da página APENAS quando chat ativo
    useEffect(() => {
        if (chatState === "active") {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        // Cleanup garantido
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [chatState]);

    // Autofocus no input após enviar ou mudar estado
    useEffect(() => {
        if (chatState === "active" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chatState, messages]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (chatState === "active" && chatRef.current && !chatRef.current.contains(e.target as Node)) {
                setChatState("minimized");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [chatState]);

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
            // Refoca no input após enviar
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

    const glass = "bg-white/80 backdrop-blur-2xl border border-white/40 shadow-xl shadow-black/5";

    return (
        <>
            {/* ===== INPUT NO HERO ===== */}
            <AnimatePresence mode="wait">
                {chatState === "idle" && (
                    <motion.div
                        key="idle-input"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
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
                                        className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                                        style={{
                                            padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1.25rem, 3vw, 1.5rem)',
                                            fontSize: 'clamp(0.875rem, 1.8vw, 1rem)',
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

            {/* ===== CHAT ATIVO ===== */}
            <AnimatePresence>
                {chatState === "active" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
                    >
                        <motion.div
                            ref={chatRef}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full max-w-md mx-4 max-h-[75vh] flex flex-col"
                        >
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className="flex items-center justify-between mb-4 px-1"
                            >
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="w-2 h-2 rounded-full bg-emerald-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                        {isStreaming ? 'Pensando...' : 'Online'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setChatState("minimized")}
                                    className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </motion.div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                                <style jsx>{`
                                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                                `}</style>

                                {messages.length === 0 && !isStreaming && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                        className="text-center text-gray-400 text-sm py-8"
                                    >
                                        Me conte sobre seu projeto.
                                    </motion.p>
                                )}

                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.role === "user"
                                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md"
                                                : "bg-white text-gray-700 shadow-md rounded-bl-md border border-gray-100"
                                                }`}
                                        >
                                            {getMessageText(message)}
                                        </div>
                                    </motion.div>
                                ))}

                                {isStreaming && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-md border border-gray-100">
                                            <div className="flex gap-1.5">
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                                                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                                />
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                                                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                                />
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                                                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <motion.form
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                                onSubmit={handleSubmit}
                                className="mt-4"
                            >
                                <div className={`${glass} rounded-2xl`}>
                                    <div className="flex items-center">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Escreva aqui..."
                                            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none px-5 py-4 text-sm"
                                            disabled={!isReady}
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            disabled={!isReady || !input.trim()}
                                            className="shrink-0 mr-3 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== BOTÃO FLUTUANTE ===== */}
            <AnimatePresence>
                {chatState === "minimized" && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={() => setChatState("active")}
                        className={`fixed bottom-5 left-5 z-50 ${glass} rounded-full px-4 py-2.5 flex items-center gap-2.5 hover:bg-white/90 transition-all cursor-pointer`}
                    >
                        <div className="relative">
                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
                            <motion.span
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full"
                            />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">Chat</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};
