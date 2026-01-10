"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const companies = [
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", url: "https://netflix.com" },
    { name: "TikTok", logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg", url: "https://tiktok.com" },
    { name: "Twitch", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg", url: "https://twitch.tv" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", url: "https://notion.so" },
    { name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", url: "https://vercel.com" },
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", url: "https://nike.com" },
    { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", url: "https://uber.com" },
];

// Duplicate for infinite loop
const marqueeCompanies = [...companies, ...companies, ...companies];

export const TechStackMarqueeClassic = () => {
    return (
        <section className="py-24 bg-white overflow-hidden border-b border-black/5">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <div className="relative -mt-20 bg-white inline-flex flex-col items-center justify-center gap-6 px-12 py-8 rounded-full z-20">
                    <span className="text-base font-medium text-[var(--color-apple-gray)] uppercase tracking-widest">Powered by</span>
                    {/* Next.js Logo (Black) - Larger and more prominent */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 180 180"
                            className="h-12 md:h-16 w-auto relative z-10"
                        >
                            <mask height="180" id=":r8:mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
                                <circle cx="90" cy="90" fill="black" r="90"></circle>
                            </mask>
                            <g mask="url(#:r8:mask0_408_134)">
                                <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
                                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#:r8:paint0_linear_408_134)"></path>
                                <rect fill="url(#:r8:paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect>
                            </g>
                            <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5">
                                    <stop stopColor="white"></stop>
                                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                                </linearGradient>
                                <linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875">
                                    <stop stopColor="white"></stop>
                                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <h3 className="mt-8 text-xl md:text-2xl font-medium text-[var(--color-apple-black)] max-w-2xl mx-auto">
                    A mesma tecnologia escolhida pelos líderes globais.
                </h3>
            </div>

            <div className="relative w-full flex overflow-hidden mask-linear-fade">
                <motion.div
                    className="flex gap-20 items-center whitespace-nowrap pr-20"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {marqueeCompanies.map((company, i) => (
                        <a
                            key={i}
                            href={company.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative h-16 w-40 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group"
                        >
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="max-h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </a>
                    ))}
                </motion.div>

                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
};
