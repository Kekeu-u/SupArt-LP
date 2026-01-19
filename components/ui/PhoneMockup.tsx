'use client';

import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';

interface PhoneMockupProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

// Internal scale values - component uses fixed pixels internally
const scaleValues = {
    sm: 'scale-50',   // 50%
    md: 'scale-75',   // 75%
    lg: 'scale-100',  // 100%
};

// Wrapper dimensions to contain the scaled component
const wrapperSizes = {
    sm: 'w-[140px] h-[290px]',
    md: 'w-[210px] h-[435px]',
    lg: 'w-[280px] h-[580px]',
};

export const PhoneMockup = ({ className = '', size = 'lg' }: PhoneMockupProps) => {
    return (
        <div className={`${wrapperSizes[size]} ${className}`}>
            <div className={`w-[280px] h-[580px] origin-top-left ${scaleValues[size]}`}>
                {/* Outer Frame (Titanium Glow) */}
                <div className="relative rounded-[55px] p-[4px] bg-gradient-to-b from-[#555] via-[#2a2a2a] to-[#4a4a4a] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-black/40 h-full">
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
                    <div className="relative bg-black rounded-[51px] p-[10px] border-[1px] border-black/80 h-full w-full shadow-[inset_0_0_5px_rgba(255,255,255,0.05)] ring-1 ring-white/5">
                        {/* Screen Content */}
                        <div className="relative w-full h-full bg-[#111] rounded-[42px] overflow-hidden">

                            {/* Dynamic Island */}
                            <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-50">
                                <div className="bg-black w-[96px] h-[28px] rounded-[24px] flex items-center justify-between px-3 shadow-sm ring-1 ring-white/[0.08] transition-all hover:w-[125px] duration-300 group">
                                    <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1a]/90 shadow-inner blur-[0.4px] ring-1 ring-white/5" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/20 group-hover:bg-green-500/80 transition-colors duration-500" />
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
                                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                                    <div className="flex justify-center mb-6">
                                        <span className="bg-[#1f2c34] text-[#8696a0] text-[10px] px-3 py-1 rounded-lg border border-[#2a373f] shadow-sm font-medium uppercase tracking-wider">
                                            Hoje
                                        </span>
                                    </div>
                                    <div className="relative bg-[#1f2c34] rounded-xl rounded-tl-none p-3.5 max-w-[90%] shadow-lg mb-4 group animate-in slide-in-from-left-4 duration-500 border border-[#2a373f]/30">
                                        <p className="text-[#e9edef] text-[13px] leading-relaxed">
                                            Olá! Vi que você baixou nosso material. 🚀 <br />
                                            Como posso ajudar a escalar seu negócio hoje?
                                        </p>
                                        <div className="flex justify-end items-center gap-1 mt-1.5">
                                            <span className="text-[#8696a0] text-[10px]">14:02</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <div className="flex gap-2">
                                            <span className="bg-[#00a884]/10 text-[#00a884] text-[11px] px-4 py-2.5 rounded-full border border-[#00a884]/20 cursor-pointer hover:bg-[#00a884]/20 transition-all active:scale-95 duration-200 font-medium">
                                                Quero agendar uma demo
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Bar Input Area */}
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

                        {/* Screen Reflection Gradient */}
                        <div className="absolute inset-0 rounded-[43px] bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 pointer-events-none z-50" />
                    </div>
                </div>
            </div>
        </div>
    );
};
