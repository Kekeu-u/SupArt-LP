import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        // Get total counts
        const { count: totalCount } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true });

        const { count: draftCount } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'draft');

        const { count: publishedCount } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'published');

        return NextResponse.json({
            total: totalCount || 0,
            drafts: draftCount || 0,
            published: publishedCount || 0
        });
    } catch (error: any) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
