import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { NewsletterWidget } from "./NewsletterWidget";

async function getSidebarData() {
    const { data: recentPosts } = await supabase
        .from('posts')
        .select(`
            title,
            slug,
            cover_image_url,
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
        <aside className="space-y-8">
            {/* Recent Posts */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Posts Recentes</h3>
                <div className="space-y-4">
                    {recentPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={post.cover_image_url || '/placeholder-blog.jpg'}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-gray-400">{post.author?.name}</span>
                                    <span className="text-[10px] text-gray-300">•</span>
                                    <span className="text-[10px] text-gray-400">{new Date(post.published_at).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Explore Topics */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Explorar Tópicos</h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 group cursor-pointer">
                            <span className="text-sm text-gray-600 font-medium group-hover:text-blue-600 transition-colors capitalize">{cat.name}</span>
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                {cat.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <NewsletterWidget />
        </aside>
    );
};
