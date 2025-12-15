import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
// CustomCursor removido temporariamente - causando bug de cursor invisível
// import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "SupArt Agency",
    description: "Agência de IA e Curadoria de Dados",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${inter.variable} antialiased`} suppressHydrationWarning>
            <body>
                <LenisProvider>
                    {/* CustomCursor desabilitado - causava cursor invisível */}
                    {/* <CustomCursor /> */}
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
