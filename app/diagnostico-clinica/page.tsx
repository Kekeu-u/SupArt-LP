import { DiagnosticFormEstetica } from '@/components/diagnostic/aesthetic/DiagnosticFormEstetica';
import { HeroLogo } from '@/components/sections/hero/HeroLogo';
import { VideoBackground } from '@/components/ui/VideoBackground';

export default function DiagnosticEsteticaPage() {
    return (
        <main className="min-h-screen relative flex items-center justify-center py-20 px-4 overflow-hidden">
            <VideoBackground />

            {/* Gradient Overlay for better readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

            <div className="relative z-10 w-full max-w-4xl">
                <div className="flex justify-center mb-8">
                    <a href="/" className="hover:scale-105 transition-transform">
                        <HeroLogo size={60} />
                    </a>
                </div>

                <DiagnosticFormEstetica />

                <div className="mt-8 text-center text-xs text-gray-500">
                    <p>SupArt Agency &copy; {new Date().getFullYear()}</p>
                    <p>AI First Methodology</p>
                </div>
            </div>
        </main>
    );
}
