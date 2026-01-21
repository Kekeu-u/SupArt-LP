import { supabase } from "@/lib/supabase";
import { BlogSidebarView } from "./BlogSidebarView";

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

    return <BlogSidebarView recentPosts={recentPosts} categories={categories} />;
};
