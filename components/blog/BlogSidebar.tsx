import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { NewsletterWidget } from "./NewsletterWidget";
import { PremiumBorder } from "@/components/ui/PremiumBorder";

async function getSidebarData() {
    const { data: recentPosts } = await supabase
        .from('posts')
        .select(`
            title,
            slug,
            featured_image,
            published_at,
            author:authors(name)
        `)
        .order('published_at', { ascending: false })
        .limit(3);

    const { data: categories } = await supabase
        .from('categories')
        .select('name, slug, posts(count)');

    return {
        recentPosts: recentPosts?.map(post => ({
            ...post,
            author: Array.isArray(post.author) ? post.author[0] : post.author
        })) || [],
        categories: categories?.map(c => ({
            name: c.name,
            slug: c.slug,
            count: c.posts[0]?.count || 0
        })) || []
    };
}

export const BlogSidebar = async () => {
    const { recentPosts, categories } = await getSidebarData();

    return (
        <aside className="space-y-6">
            {/* Recent Posts */}
            <div className="relative rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-6 hover:bg-white/90 transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/5 via-transparent to-blue-500/5 pointer-events-none" />
                <h3 className="relative text-lg font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-5">Posts Recentes</h3>
                <div className="relative space-y-5">
                    {recentPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                            <PremiumBorder className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src={post.featured_image || '/placeholder-blog.webp'}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </PremiumBorder>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[10px] text-gray-500 font-medium">{post.author?.name}</span>
                                    <span className="text-[10px] text-gray-300">•</span>
                                    <span className="text-[10px] text-gray-400">{new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Explore Topics */}
            <div className="relative rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-6 hover:bg-white/90 transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-gray-500/5 pointer-events-none" />
                <h3 className="relative text-lg font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-5">Explorar Tópicos</h3>
                <div className="relative space-y-1">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/blog/category/${cat.slug}`}
                            className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg border-b border-gray-100 last:border-0 group cursor-pointer hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-blue-50/50 transition-all duration-300"
                        >
                            <span className="text-sm text-gray-700 font-semibold group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all capitalize">
                                {cat.name}
                            </span>
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full min-w-[28px] text-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                {cat.count}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <NewsletterWidget />
        </aside>
    );
};
