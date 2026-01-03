import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ═══════════════════════════════════════════════════════════════════════════
  // PERFORMANCE OPTIMIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  // Remove console.log em produção para bundle menor
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Otimizações experimentais
  experimental: {
    // Otimiza imports de pacotes grandes (framer-motion, gsap)
    optimizePackageImports: ["framer-motion", "gsap", "react-icons"],
  },

  // Configuração de imagens
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "jpcsfzaqaqnokchwdzsk.supabase.co",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;

