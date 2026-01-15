import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status'); // 'draft', 'published', or null (all)

        let query = supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (status) {
            query = query.eq('status', status);
        }

        const { data: posts, error } = await query;

        if (error) throw error;

        return NextResponse.json({ posts });
    } catch (error: any) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, title, slug, content, status, tags } = body;

        if (!id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        const updates: any = {};
        if (title) updates.title = title;
        if (slug) updates.slug = slug;
        if (content) updates.content = content;
        if (tags) updates.tags = tags;
        if (status) {
            updates.status = status;
            if (status === 'published' && !updates.published_at) {
                updates.published_at = new Date().toISOString();
            }
        }

        const { data, error } = await supabase
            .from('posts')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ post: data });
    } catch (error: any) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
