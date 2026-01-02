"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SupArtLogo } from "@/components/ui/SupArtLogo";
import {
  FaHome,
  FaProjectDiagram,
  FaLayerGroup,
  FaEnvelope,
  FaBlog,
} from "react-icons/fa";
import { useI18n } from "@/lib/i18n";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "work", "solutions", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      setActiveSection(targetId);
    } else if (href === "/blog" || href === "/cases") {
      window.location.href = href;
    }
  };

  const navLinks = [
    { href: "#home", label: t("nav.home", "Home"), icon: FaHome },
    { href: "#work", label: t("nav.work", "Work"), icon: FaProjectDiagram },
    { href: "#solutions", label: t("nav.solutions", "Solutions"), icon: FaLayerGroup },
    { href: "/blog", label: "Blog", icon: FaBlog },
    { href: "#contact", label: t("nav.contact", "Contact"), icon: FaEnvelope },
  ];

  // If not on home page, show simple header or redirect links
  if (pathname !== "/") {
    // Simple header for other pages
    return (
      <header className="fixed top-0 left-0 w-full z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="transition-transform duration-300 hover:scale-105">
            <SupArtLogo className="h-12 w-12 border-2 border-white/10 shadow-lg" />
          </a>
          <nav>
            <ul className="flex gap-x-4">
              <li><a href="/" className="text-gray-900 dark:text-white hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="/blog" className={`text-gray-900 dark:text-white hover:text-purple-400 transition-colors ${pathname === '/blog' ? 'text-purple-400' : ''}`}>Blog</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <>
        {/* Top Logo - Hides on scroll */}
        <div
          className={`fixed top-0 left-0 w-full z-40 flex justify-center p-4 transition-all duration-500 ease-in-out ${isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
            }`}
        >
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="transition-transform duration-300 hover:scale-105"
            aria-label="Voltar para o topo"
          >
            <SupArtLogo className="h-12 w-12 border-2 border-white/10 shadow-lg" />
          </a>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-4 left-0 w-full z-50 flex justify-center px-4">
          <ul className="flex justify-around items-center gap-x-1 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-purple-500/10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex flex-col items-center justify-center text-center w-14 h-14 p-1 rounded-full transition-all duration-300 transform hover:scale-105 ${activeSection === link.href.substring(1)
                    ? "text-purple-400 bg-white/10 scale-105"
                    : "text-gray-400 hover:text-white"
                    }`}
                  aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                  aria-label={link.label}
                >
                  <link.icon className="text-xl mb-1" />
                  <span className="text-[10px] font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  }

  // Desktop Layout
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 pointer-events-none">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-y-3 pointer-events-auto">
          {/* Top Logo - Hides/Shrinks on scroll */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className={`transition-all duration-500 ease-in-out hover:scale-105 ${isScrolled ? "opacity-0 scale-95 h-0 invisible" : "opacity-100 scale-100 h-auto visible"
              }`}
          >
            <SupArtLogo className="h-16 w-16 border-2 border-white/10 shadow-lg" />
          </a>

          {/* Navigation Pill */}
          <nav
            className={`transition-all duration-500 ease-in-out ${isScrolled ? "translate-y-0" : "translate-y-2"
              }`}
          >
            <div className="flex items-center gap-x-1 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-purple-500/10">
              {/* Logo in Nav (Visible only when scrolled) */}
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, "#home")}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? "w-10 opacity-100 mr-2" : "w-0 opacity-0 mr-0"
                  }`}
              >
                <SupArtLogo className="h-10 w-10 border border-white/10 rounded-full" />
              </a>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center gap-x-2 px-4 py-2 rounded-full transition-all duration-300 ${activeSection === link.href.substring(1)
                    ? "bg-white/10 text-purple-400 shadow-inner shadow-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <link.icon className={`text-sm ${activeSection === link.href.substring(1) ? "text-purple-400" : ""}`} />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;