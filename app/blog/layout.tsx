import BlogHeader from "@/components/blog/BlogHeader";
import Footer from "@/components/layout/Footer";

import Script from "next/script";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen relative text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900">
            <div data-us-project="qTiAlX0sxkuBOAiL7qHL" className="fixed top-0 left-0 -z-10 w-full h-full"></div>
            {/* White overlay for better readability */}
            <div className="fixed top-0 left-0 -z-[9] w-full h-full bg-white/85"></div>
            <Script
                id="unicorn-studio"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    !function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
                    `
                }}
            />
            <BlogHeader />
            <main className="relative z-10">{children}</main>
            {/* Reusing main footer but maybe we want a simpler one later */}
            <Footer />
        </div>
    );
}
