/**
 * ============================================================================
 * HEADER COMPONENT - VERSÃO CONSOLIDADA
 * ============================================================================
 */

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SupArtLogo } from "@/components/ui/SupArtLogo";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  FaHome,
  FaProjectDiagram,
  FaLayerGroup,
  FaEnvelope,
  FaBlog,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useI18n } from "@/lib/i18n";

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SCROLL_THRESHOLD = 20;
const SCROLL_OFFSET = 150;
const HEADER_HEIGHT = 120;

// Ordem correta das seções na página (de cima para baixo)
const SECTIONS = ["home", "method", "solutions", "contact"] as const;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const { t } = useI18n();

  // Determina se estamos na home
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Só rastreia seções na home
    if (!isHomePage) {
      setActiveSection(null);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

      // Detecta se passou do Hero (80% da altura da tela)
      setIsPastHero(window.scrollY > window.innerHeight * 0.8);

      // Encontra a seção mais visível (de baixo para cima)
      let foundSection: string | null = null;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = SECTIONS[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= SCROLL_OFFSET) {
            foundSection = section;
            break;
          }
        }
      }

      setActiveSection(foundSection || "home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Rotas externas (ex: /blog)
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }

    const targetId = href.substring(1);

    // Se não estamos na home, redireciona
    if (!isHomePage) {
      window.location.href = `/${href}`;
      return;
    }

    // Scroll para a seção
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(targetId);
    }
  };

  const navLinks: NavLink[] = [
    { href: "#home", label: t("nav.home", "Home"), icon: FaHome },
    { href: "#method", label: t("nav.method", "Método"), icon: FaProjectDiagram },
    { href: "#solutions", label: t("nav.solutions", "Soluções"), icon: FaLayerGroup },
    { href: "/blog", label: "Blog", icon: FaBlog },
    { href: "#contact", label: t("nav.contact", "Contato"), icon: FaEnvelope },
  ];

  const isLightMode = pathname.startsWith("/blog") || (isHomePage && isPastHero);

  // Base classes
  const headerContainerClasses = "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] transition-all duration-300";

  // Theme-specific classes
  const glassClasses = isLightMode
    ? "bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm" // Light Mode
    : "bg-transparent backdrop-blur-2xl border border-white/10";      // Dark Mode (Default)

  const innerClasses = `relative flex items-center justify-between px-[5%] py-2 rounded-2xl ${glassClasses} transition-all duration-300`;

  const getNavLinkClasses = (href: string) => {
    let isActive = false;

    if (href.startsWith("/")) {
      isActive = pathname.startsWith(href);
    } else if (href.startsWith("#") && isHomePage) {
      isActive = activeSection === href.substring(1);
    }

    const baseClasses = "flex items-center gap-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium";

    // Theme-specific state classes
    const activeText = isLightMode ? "text-black bg-black/5" : "text-white bg-white/10";
    const inactiveText = isLightMode ? "text-gray-600 hover:bg-black/5" : "text-gray-300 hover:bg-white/10";

    const stateClasses = isActive ? `${activeText} font-semibold` : inactiveText;

    return `${baseClasses} ${stateClasses}`;
  };

  return (
    <header className={headerContainerClasses}>
      <div className={innerClasses}>
        <a
          href="/"
          className={`flex-shrink-0 transition-transform duration-300 hover:scale-105 ${isLightMode ? 'text-black' : 'text-white'}`}
          aria-label="SupArt Agency Home"
        >
          <SupArtLogo className="h-8 w-8 md:h-10 md:w-10" />
        </a>

        <nav className="hidden md:flex items-center gap-x-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={getNavLinkClasses(link.href)}
            >
              <link.icon className="text-xs" />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex-shrink-0">
          <GlassButton href="/diagnostico">
            Entender como funciona
          </GlassButton>
        </div>
      </div>
    </header>
  );
};

export default Header;