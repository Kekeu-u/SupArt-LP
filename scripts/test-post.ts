
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testGetPost() {
    const slug = 'supart-';
    console.log(`Testing fetch for slug: "${slug}"`);

    const { data: post, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(name, avatar_url, role, bio),
            category:categories(name, slug)
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
    } else {
        console.log('Post found:', post ? post.title : 'null');
        console.log('Author:', post?.author);
        console.log('Category:', post?.category);
    }
}

testGetPost();
