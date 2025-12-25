"use client";

import Link from "next/link";
import { useState } from "react";

export const BlogHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-[var(--color-apple-black)]/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-2xl font-bold text-white tracking-tight">
                                Sup<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Art</span>
                            </span>
                        </Link>

                        {/* Breadcrumb */}
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <span className="text-white/30">/</span>
                            <Link href="/blog" className="text-white/60 hover:text-white transition-colors">
                                Blog
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/#servicos"
                            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                        >
                            Serviços
                        </Link>
                        <Link
                            href="/#portfolio"
                            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium text-white border-b border-purple-500"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/#contato"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
                        >
                            Contato
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {isMenuOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10">
                        <nav className="flex flex-col gap-4">
                            <Link href="/#servicos" className="text-white/60 hover:text-white transition-colors">
                                Serviços
                            </Link>
                            <Link href="/#portfolio" className="text-white/60 hover:text-white transition-colors">
                                Portfolio
                            </Link>
                            <Link href="/blog" className="text-white border-b border-purple-500 pb-2">
                                Blog
                            </Link>
                            <Link
                                href="/#contato"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all inline-block text-center"
                            >
                                Contato
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
