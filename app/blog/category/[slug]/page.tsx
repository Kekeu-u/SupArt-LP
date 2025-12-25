import { supabase } from "@/lib/supabase";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { PremiumCard } from "@/components/ui/PremiumCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
    const { data: categories } = await supabase.from('categories').select('slug');
    return categories?.map((cat) => ({
        slug: cat.slug,
    })) || [];
}

async function getCategoryPosts(slug: string) {
    // Primeiro pega a categoria para ter o nome
    const { data: category } = await supabase
        .from('categories')
        .select('name')
        .eq('slug', slug)
        .single();

    if (!category) return null;

    // Depois pega os posts dessa categoria
    const { data: posts } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(name, avatar_url),
            category:categories!inner(name, slug)
        `)
        .eq('category.slug', slug)
        .order('published_at', { ascending: false });

    return {
        category,
        posts: posts?.map(post => ({
            ...post,
            author: Array.isArray(post.author) ? post.author[0] : post.author,
            category: Array.isArray(post.category) ? post.category[0] : post.category
        })) || []
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getCategoryPosts(slug);

    if (!data) {
        notFound();
    }

    const { category, posts } = data;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Tópico: <span className="text-purple-600">{category.name}</span>
                        </h1>
                        <p className="text-gray-500">
                            {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                <PremiumCard className="overflow-hidden bg-white border border-gray-100 hover:border-purple-200 transition-all duration-300">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="relative h-48 md:h-full min-h-[200px]">
                                            <Image
                                                src={post.cover_image_url || '/placeholder-blog.jpg'}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 md:col-span-2 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider">
                                                    {post.category?.name}
                                                </span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-600 line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 mt-auto">
                                                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                                    <Image
                                                        src={post.author?.avatar_url || '/placeholder-avatar.jpg'}
                                                        alt={post.author?.name || 'Author'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {post.author?.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </PremiumCard>
                            </Link>
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
