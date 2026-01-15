import BlogHeader from "@/components/blog/BlogHeader";
import Footer from "@/components/layout/Footer";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen relative text-gray-900 font-sans selection:bg-gray-100 selection:text-gray-900">
            {/* Background CSS Puro - Ultra Leve */}
            <div
                className="fixed top-0 left-0 w-full h-full -z-10"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent),
                        radial-gradient(ellipse 60% 40% at 80% 100%, rgba(255, 105, 180, 0.08), transparent),
                        radial-gradient(ellipse 50% 30% at 20% 80%, rgba(64, 169, 255, 0.08), transparent),
                        linear-gradient(180deg, #fafafa 0%, #ffffff 100%)
                    `
                }}
            />

            {/* Padrão de pontos sutil */}
            <div
                className="fixed top-0 left-0 w-full h-full -z-[9] opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <main className="relative z-10">{children}</main>
            <Footer />
        </div>
    );
}
