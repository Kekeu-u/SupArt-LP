'use client';

import { motion } from 'framer-motion';
import {
    FaWhatsapp,
    FaCalendarAlt,
    FaBrain,
    FaClock,
    FaDatabase,
    FaCheckCircle,
    FaArrowRight
} from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';

// Feature badges at top
const features = [
    { icon: FaClock, label: '24h Auto-Response' },
    { icon: FaCalendarAlt, label: 'Multi-Calendar' },
    { icon: FaDatabase, label: 'Smart CRM' },
    { icon: FaBrain, label: 'Context Memory' },
    { icon: FaClock, label: '<3s response time' },
];

export default function PreviewPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0a2e] to-[#0a0014] overflow-x-hidden font-sans">
            {/* Background glow effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">

                {/* Feature badges - Top */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {features.map((feat, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                        >
                            <feat.icon className="w-3 h-3 text-purple-400" />
                            <span className="text-xs text-gray-300">{feat.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Main content */}
                <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-12 items-center">

                    {/* LEFT SIDE - Headline + Phone */}
                    <motion.div
                        className="space-y-10"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                                    Seu Negócio No
                                </span>
                                <br />
                                <span className="text-white drop-shadow-sm">Piloto Automático</span>
                            </h1>
                            <p className="text-gray-400 text-lg font-light tracking-wide">Sistema Multi-Agente com IA</p>
                        </div>

                        {/* Feature list */}
                        <div className="space-y-4">
                            {['Memória Contextual', 'Agendamento Inteligente', 'CRM Integrado'].map((feat) => (
                                <div key={feat} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                    <span className="text-sm tracking-wide">{feat}</span>
                                </div>
                            ))}
                        </div>

                        {/* iPhone 15 Pro Titanium Mockup */}
                        <div className="relative w-[280px] mx-auto lg:mx-0 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out will-change-transform perspective-1000">
                            {/* Outer Frame (Titanium Glow) */}
                            <div className="relative rounded-[55px] p-[4px] bg-gradient-to-b from-[#555] via-[#2a2a2a] to-[#4a4a4a] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-black/40">
                                {/* Antenna lines */}
                                <div className="absolute top-20 -left-[1px] w-[1px] h-3 bg-[#666] opacity-60" />
                                <div className="absolute top-20 -right-[1px] w-[1px] h-3 bg-[#666] opacity-60" />
                                <div className="absolute bottom-20 -left-[1px] w-[1px] h-3 bg-[#666] opacity-60" />
                                <div className="absolute bottom-20 -right-[1px] w-[1px] h-3 bg-[#666] opacity-60" />

                                {/* Buttons - Volume/Power */}
                                <div className="absolute top-32 -left-[2px] w-[3px] h-10 bg-[#333] rounded-l-md shadow-sm border-l border-[#555]/30" />
                                <div className="absolute top-48 -left-[2px] w-[3px] h-14 bg-[#333] rounded-l-md shadow-sm border-l border-[#555]/30" />
                                <div className="absolute top-40 -right-[2px] w-[3px] h-20 bg-[#333] rounded-r-md shadow-sm border-r border-[#555]/30" />

                                {/* Inner Bezel (Black Glass Edge) */}
                                <div className="relative bg-black rounded-[51px] p-[10px] border-[1px] border-black/80 h-[580px] w-full shadow-[inset_0_0_5px_rgba(255,255,255,0.05)] ring-1 ring-white/5">
                                    {/* Screen Content */}
                                    <div className="relative w-full h-full bg-[#111] rounded-[42px] overflow-hidden mask-image-linear-gradient">

                                        {/* Dynamic Island */}
                                        <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-50">
                                            <div className="bg-black w-[96px] h-[28px] rounded-[24px] flex items-center justify-between px-3 shadow-sm ring-1 ring-white/[0.08] transition-all hover:w-[125px] duration-300 group">
                                                <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1a]/90 shadow-inner blur-[0.4px] ring-1 ring-white/5" /> {/* Camera */}
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/20 group-hover:bg-green-500/80 transition-colors duration-500" /> {/* Privacy indicator */}
                                            </div>
                                        </div>

                                        {/* Status Bar */}
                                        <div className="absolute top-3.5 left-7 right-7 flex justify-between items-center z-40 text-white mix-blend-difference opacity-90 pointer-events-none">
                                            <span className="text-[12px] font-medium tracking-wide">14:02</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex gap-[2px] items-end h-3">
                                                    <div className="w-[3px] h-[4px] bg-white rounded-[1px]" />
                                                    <div className="w-[3px] h-[6px] bg-white rounded-[1px]" />
                                                    <div className="w-[3px] h-[8px] bg-white rounded-[1px]" />
                                                    <div className="w-[3px] h-[10px] bg-white rounded-[1px]" />
                                                </div>
                                                <div className="w-6 h-3 border-[1.5px] border-white/40 rounded-[4px] flex items-center justify-start px-[1.5px] relative">
                                                    <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1.5px] h-1.5 bg-white/40 rounded-r-[1px]" />
                                                    <div className="w-4 h-full bg-white rounded-[1px]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actual Screen UI */}
                                        <div className="w-full h-full bg-[#0b141a] pt-14 flex flex-col font-sans select-none">
                                            {/* WhatsApp Header */}
                                            <div className="bg-[#1f2c34] px-5 py-3 flex items-center gap-3 border-b border-[#2a373f]/50 backdrop-blur-md bg-opacity-95 z-30">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg relative group overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
                                                    <FaWhatsapp className="w-6 h-6 text-white relative z-10" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[#e9edef] text-[15px] font-semibold leading-tight">SupArt Business</p>
                                                    <p className="text-[#00a884] text-[11px] font-medium mt-0.5 animate-pulse">online</p>
                                                </div>
                                            </div>

                                            {/* Chat Area */}
                                            <div className="flex-1 bg-[#0b141a] p-4 relative overflow-hidden flex flex-col justify-end pb-6">
                                                {/* Chat Background Pattern Overlay - subtle doodle */}
                                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

                                                {/* Date divider */}
                                                <div className="flex justify-center mb-6">
                                                    <span className="bg-[#1f2c34] text-[#8696a0] text-[10px] px-3 py-1 rounded-lg border border-[#2a373f] shadow-sm font-medium uppercase tracking-wider">
                                                        Hoje
                                                    </span>
                                                </div>

                                                {/* Bot message bubble */}
                                                <div className="relative bg-[#1f2c34] rounded-xl rounded-tl-none p-3.5 max-w-[90%] shadow-lg mb-4 group animate-in slide-in-from-left-4 duration-500 border border-[#2a373f]/30">
                                                    <p className="text-[#e9edef] text-[13px] leading-relaxed">
                                                        Olá! Vi que você baixou nosso material. 🚀 <br />
                                                        Como posso ajudar a escalar seu negócio hoje?
                                                    </p>
                                                    <div className="flex justify-end items-center gap-1 mt-1.5">
                                                        <span className="text-[#8696a0] text-[10px]">14:02</span>
                                                    </div>
                                                </div>

                                                {/* User Smart Reply Suggestion */}
                                                <div className="flex justify-center mt-4">
                                                    <div className="flex gap-2">
                                                        <span className="bg-[#00a884]/10 text-[#00a884] text-[11px] px-4 py-2.5 rounded-full border border-[#00a884]/20 cursor-pointer hover:bg-[#00a884]/20 transition-all active:scale-95 duration-200 font-medium">
                                                            Quero agendar uma demo
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Bar Input Area (Mock) */}
                                            <div className="bg-[#1f2c34] px-3 py-3 flex items-center gap-3 border-t border-[#2a373f]/50 pb-8 backdrop-blur-md bg-opacity-95">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#8696a0] hover:bg-white/5 transition-colors cursor-pointer">
                                                    <span className="text-xl leading-none pb-1">+</span>
                                                </div>
                                                <div className="flex-1 bg-[#2a3942] rounded-full h-9 px-4 flex items-center cursor-text">
                                                    <span className="text-[#8696a0] text-[13px]">Mensagem</span>
                                                </div>
                                                <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform hover:bg-[#008f6f]">
                                                    <div className="text-white text-xs">
                                                        <FaArrowRight className="w-3.5 h-3.5" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Home Indicator */}
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[110px] h-[4px] bg-white/20 rounded-full backdrop-blur-sm shadow-sm" />
                                        </div>
                                    </div>

                                    {/* Screen Reflection Gradient - Classic Apple Gloss */}
                                    <div className="absolute inset-0 rounded-[43px] bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 pointer-events-none z-50" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - Flow Diagram */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Flow visualization - Horizontal Layout */}
                        <div className="flex items-center gap-4 lg:gap-8 overflow-x-visible py-4">

                            {/* Orchestrator */}
                            <div className="flex-shrink-0 relative group">
                                <motion.div
                                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 border-2 border-purple-400/50 flex flex-col items-center justify-center shadow-lg shadow-purple-500/30 z-10 relative"
                                    animate={{
                                        boxShadow: ['0 0 30px rgba(139, 92, 246, 0.3)', '0 0 60px rgba(139, 92, 246, 0.5)', '0 0 30px rgba(139, 92, 246, 0.3)']
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <SiOpenai className="w-7 h-7 lg:w-9 lg:h-9 text-white mb-1.5" />
                                    <span className="text-white text-[9px] lg:text-[10px] font-medium text-center px-2">Orquestrador IA</span>
                                </motion.div>
                                {/* Ripple effect */}
                                <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping" />
                            </div>

                            {/* Connecting lines visual */}
                            <div className="flex-shrink-0 w-8 lg:w-16 flex flex-col items-center gap-8 py-8 opacity-50">
                                <div className="w-px h-16 bg-gradient-to-b from-purple-500 to-transparent" />
                                <div className="w-px h-4 bg-purple-500" />
                                <div className="w-px h-16 bg-gradient-to-t from-purple-500 to-transparent" />
                            </div>

                            {/* Specialists Column */}
                            <div className="flex flex-col gap-5 flex-shrink-0">
                                {/* Specialist 1 - Dr. Francisco */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 w-40 lg:w-44 shadow-lg shadow-purple-500/20 border border-white/10"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm shadow-inner">👨‍⚕️</div>
                                        <div>
                                            <p className="text-white text-xs font-bold">Dr. Francisco</p>
                                            <p className="text-pink-100 text-[9px] font-light">Plastic Surgery</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Lipo HD', 'Silicone'].map(t => (
                                            <span key={t} className="text-[8px] bg-black/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Specialist 2 - Dr. Roberto */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 w-40 lg:w-44 shadow-lg shadow-emerald-500/20 border border-white/10"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm shadow-inner">👨‍⚕️</div>
                                        <div>
                                            <p className="text-white text-xs font-bold">Dr. Roberto</p>
                                            <p className="text-emerald-100 text-[9px] font-light">Bariatric</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Bypass', 'Consultation'].map(t => (
                                            <span key={t} className="text-[8px] bg-black/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Specialist 3 - Dra. Janaína */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 w-40 lg:w-44 shadow-lg shadow-blue-500/20 border border-white/10"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm shadow-inner">👩‍⚕️</div>
                                        <div>
                                            <p className="text-white text-xs font-bold">Dra. Janaína</p>
                                            <p className="text-blue-100 text-[9px] font-light">Gynecology</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Preventive', 'Exam'].map(t => (
                                            <span key={t} className="text-[8px] bg-black/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Connecting arrow */}
                            <div className="flex-shrink-0 text-emerald-400 animate-pulse">
                                <FaArrowRight className="w-5 h-5" />
                            </div>

                            {/* CRM Cards Column */}
                            <div className="flex flex-col gap-6 flex-shrink-0">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-[#111111]/80 backdrop-blur-xl rounded-xl p-3 border border-white/10 w-36 shadow-xl relative group hover:border-emerald-500/50 transition-colors">
                                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className="w-4 h-4 rounded bg-orange-500/20 flex items-center justify-center">
                                                <FaDatabase className="w-2 h-2 text-orange-400" />
                                            </div>
                                            <span className="text-gray-300 text-[9px] font-semibold tracking-wide">CRM SYNC</span>
                                        </div>
                                        <div className="space-y-1 text-[8px] text-gray-500 font-mono bg-black/30 p-2 rounded">
                                            <div className="flex justify-between"><span>Nome</span> <span className="text-gray-700">***</span></div>
                                            <div className="flex justify-between"><span>Tel</span> <span className="text-gray-700">***</span></div>
                                        </div>
                                        <p className="text-emerald-400 text-[8px] mt-2 flex items-center justify-end gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                                            Active
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Final flow: Calendar + Success */}
                            <div className="flex-shrink-0 flex flex-col gap-4">
                                {/* Google Calendar */}
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    className="bg-blue-600/10 backdrop-blur-xl rounded-2xl p-3 border border-blue-400/20 w-32 shadow-lg shadow-blue-900/20"
                                >
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <FaCalendarAlt className="w-3 h-3 text-blue-400" />
                                        <span className="text-blue-300 text-[9px] font-semibold">Google Calendar</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="bg-blue-500 rounded-md px-2 py-1 text-[8px] text-white font-medium flex justify-between shadow-sm">
                                            <span>Hoje</span>
                                            <span className="opacity-80">14:00</span>
                                        </div>
                                        <div className="bg-white/5 rounded-md px-2 py-1 text-[8px] text-gray-400 flex justify-between">
                                            <span>Amanhã</span>
                                            <span>09:00</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Success */}
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    className="bg-emerald-600/10 backdrop-blur-xl rounded-2xl p-3 border border-emerald-400/20 w-32 shadow-lg shadow-emerald-900/20 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                        <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <p className="text-emerald-300 text-[10px] font-bold text-center">Agendado!</p>
                                    <p className="text-emerald-400/60 text-[8px] text-center mt-0.5">Confirmação enviada</p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Pipeline Legend */}
                        <motion.div
                            className="mt-8 flex items-center justify-center gap-3 flex-wrap opacity-70"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            {['Lead Capture', 'AI Analysis', 'Routing', 'Conversion'].map((step, idx) => (
                                <div key={step} className="flex items-center gap-3">
                                    <div className="text-[10px] text-gray-400 tracking-wider uppercase font-medium">{step}</div>
                                    {idx < 3 && <div className="h-[1px] w-4 bg-gray-700" />}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
