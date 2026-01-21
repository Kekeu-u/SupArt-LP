"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumBorder } from "@/components/ui/PremiumBorder";
import { AIBadge } from "@/components/ui/AIBadge";
import { useI18n } from "@/lib/i18n";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    published_at: string;
    read_time: string;
    category: {
        name: string;
        slug: string;
    };
    author: {
        name: string;
        avatar_url: string;
    };
}

export const BlogCard = ({ post }: { post: Post }) => {
    const { t, locale } = useI18n();

    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <div className="relative h-full flex flex-col rounded-2xl overflow-hidden border border-gray-200/50 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-gray-500/30 hover:-translate-y-1">

                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/0 via-blue-500/0 to-blue-600/0 group-hover:from-gray-500/20 group-hover:via-blue-500/20 group-hover:to-blue-600/20 transition-all duration-500 pointer-events-none" />

                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={post.featured_image || '/placeholder-blog.webp'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* AI Badge */}
                    <AIBadge position="bottom-left" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category tag with gradient */}
                    <div className="absolute top-3 right-3">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-gray-600/90 to-blue-600/90 backdrop-blur-md text-[10px] font-bold text-white rounded-full shadow-lg uppercase tracking-wider border border-white/20">
                            {post.category?.name}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        {/* Avatar with gradient ring */}
                        <PremiumBorder className="relative w-8 h-8 rounded-full p-[2px]">
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                                <Image src={post.author?.avatar_url || '/placeholder-avatar.jpg'} alt={post.author?.name} fill className="object-cover" />
                            </div>
                        </PremiumBorder>
                        <span className="text-xs text-gray-600 font-semibold">{post.author?.name}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">
                            {new Date(post.published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR')}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1 leading-relaxed">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.read_time}
                        </span>
                        <span className="text-xs font-bold bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                            {t("Read more", "Ler mais")}
                            <svg className="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
