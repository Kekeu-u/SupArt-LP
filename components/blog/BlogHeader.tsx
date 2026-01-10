"use client";

import React, { useState, useEffect } from 'react';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import { PremiumDivider } from "@/components/ui/PremiumDivider";
import { SupArtLogo } from "@/components/ui/SupArtLogo";


const BlogHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80/80 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo Area - SVG from main header logic but simplified */}
                    <a
                        href="/"
                        className="flex items-center gap-2 group"
                        aria-label="Voltar para Home"
                    >
                        <SupArtLogo className="w-10 h-10 group-hover:scale-105 transition-transform duration-300" />
                        <span className="font-bold text-xl tracking-tight text-[var(--color-apple-black)]">
                            SupArt
                        </span>
                    </a>

                    {/* Minimalist Nav */}
                    <nav className="flex items-center gap-4">

                        <a
                            href="/blog"
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                        >
                            <FaHome className="w-4 h-4" />
                            <span className="hidden md:inline">Home</span>
                        </a>
                    </nav>
                </div>
            </div>

            {/* Bottom Metallic Divider - Only visible when scrolled or always if preferred */}
            <div className={`absolute bottom-0 left-0 w-full transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
                <PremiumDivider className="my-0" />
            </div>
        </header>
    );
};

export default BlogHeader;
