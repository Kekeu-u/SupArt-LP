import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0; // Disable cache for debugging

async function getPosts() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors!posts_author_id_fkey(name, avatar_url),
            category:categories!posts_category_id_fkey(name, slug)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    console.log('Fetched posts:', JSON.stringify(posts, null, 2)); // Debug log

    return posts?.map(post => ({
        ...post,
        author: Array.isArray(post.author) ? post.author[0] : post.author,
        category: Array.isArray(post.category) ? post.category[0] : post.category
    })) || [];
}

export default async function BlogPage() {
    const posts = await getPosts();
    const featuredPost = posts.find(p => p.is_featured) || posts[0];
    const otherPosts = posts.filter(p => p.id !== featuredPost?.id);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="text-center mb-16 space-y-4">
                <div className="inline-block">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/50 backdrop-blur-sm px-3 py-1 rounded-full mb-4 inline-block">
                        Impulsionado por IA
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Insights & Inovação
                </h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                    Explore o futuro do design digital, tecnologia e inteligência artificial.
                    <span className="block mt-1 text-purple-400 font-semibold">Conteúdo premium para mentes criativas.</span>
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    {featuredPost && (
                        <Link href={`/blog/${featuredPost.slug}`} className="group block cursor-pointer">
                            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-6">
                                <Image
                                    src={featuredPost.cover_image_url || '/placeholder-blog.jpg'}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="px-4 py-1.5 bg-amber-400 text-white text-xs font-bold rounded-md shadow-sm uppercase tracking-wider">
                                        DESTAQUE
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-gray-300 leading-relaxed line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-3 pt-2">
                                    <img src={featuredPost.author?.avatar_url || '/placeholder-avatar.jpg'} alt={featuredPost.author?.name} className="w-8 h-8 rounded-full" />
                                    <span className="text-sm font-medium text-gray-200">{featuredPost.author?.name}</span>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-sm text-gray-400">{new Date(featuredPost.published_at).toLocaleDateString('pt-BR')}</span>
                                    <span className="ml-auto px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                        {featuredPost.category?.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Grid of Other Posts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
