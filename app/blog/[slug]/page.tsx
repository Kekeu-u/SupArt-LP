import { supabase } from "@/lib/supabase";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { PostContent } from "@/components/blog/PostContent";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
    const { data: posts } = await supabase.from('posts').select('slug');
    return posts?.map((post) => ({
        slug: post.slug,
    })) || [];
}

async function getPost(slug: string) {
    const { data: post } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(name, avatar_url, role, bio),
            category:categories(name, slug)
        `)
        .eq('slug', slug)
        .single();

    if (!post) return null;

    return {
        ...post,
        author: Array.isArray(post.author) ? post.author[0] : post.author,
        category: Array.isArray(post.category) ? post.category[0] : post.category
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <PostContent post={post} />
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
