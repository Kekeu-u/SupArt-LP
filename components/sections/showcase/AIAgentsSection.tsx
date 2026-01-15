"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const AIAgentsSection = () => {
    return (
        <section
            className="relative min-h-[100dvh] flex flex-col justify-center py-32 px-6 overflow-hidden"
            style={{ contentVisibility: "auto", containIntrinsicSize: "auto 100dvh" }}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-black pointer-events-none" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gray-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 mb-6 backdrop-blur-sm">
                            AI Automation
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
                            Beyond Human Limits.
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Deploy intelligent voice agents that sound indistinguishable from humans.
                            Automate support, scheduling, and sales with cinematic fidelity.
                        </p>
                    </motion.div>
                </div>

                {/* Visual Showcase */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Card 1: Cloned Voice */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-gray-500/20 flex items-center justify-center mb-6 border border-gray-500/30">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Cloned Voice</h3>
                                <p className="text-gray-400 text-sm">
                                    Neural synthesis that captures the nuance, tone, and emotion of any speaker.
                                </p>
                            </div>

                            {/* Abstract Visualization */}
                            <div className="relative h-32 w-full flex items-center justify-center gap-1">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            height: [20, Math.random() * 80 + 20, 20],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className="w-2 bg-gradient-to-t from-gray-500 to-indigo-500 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-black opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                    </motion.div>

                    {/* Card 2: Real Voice */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="group relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Real Voice</h3>
                                <p className="text-gray-400 text-sm">
                                    Seamlessly integrate pre-recorded human audio for specific segments.
                                </p>
                            </div>

                            {/* Abstract Visualization */}
                            <div className="relative h-32 w-full flex items-center justify-center">
                                <div className="relative w-24 h-24">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border border-emerald-500/50"
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        className="absolute inset-0 rounded-full border border-emerald-500/30"
                                    />
                                    <div className="absolute inset-4 rounded-full bg-emerald-500/20 backdrop-blur-md flex items-center justify-center border border-emerald-500/40">
                                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-black opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
