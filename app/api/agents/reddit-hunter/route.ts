import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateBlogPost } from '@/lib/ai-writer';

export async function GET(request: Request) {
    // Security Check: Verify if request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // 1. Search hot posts in target subreddits using public JSON API
        const subreddits = ['InternetIsBeautiful', 'SaaS', 'SideProject', 'artificial'];
        let toolsFound: any[] = [];

        for (const sub of subreddits) {
            try {
                // Use Reddit's public JSON API (no auth needed!)
                const response = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=10`, {
                    headers: {
                        'User-Agent': 'SupArtAgencyBot/1.0 (Content Curation)'
                    }
                });

                if (!response.ok) continue;

                const data = await response.json();
                const posts = data.data.children;

                // Filter posts with good engagement (>50 upvotes) and that link to external sites
                const validPosts = posts
                    .map((child: any) => child.data)
                    .filter((p: any) =>
                        p.score > 50 &&
                        !p.stickied &&
                        !p.is_self && // Prefer external links
                        p.url &&
                        !p.url.includes('reddit.com') // Exclude Reddit-only posts
                    );

                toolsFound.push(...validPosts.map((p: any) => ({
                    title: p.title,
                    url: p.url,
                    score: p.score,
                    source: `r/${sub}`,
                    content: p.selftext || ""
                })));
            } catch (e) {
                console.error(`Error fetching r/${sub}:`, e);
            }
        }

        // 2. If found something interesting, send to AI Editor
        let generatedPost = null;
        if (toolsFound.length > 0) {
            // Sort by score and pick top 1
            const bestTool = toolsFound.sort((a, b) => b.score - a.score)[0];

            // Check if we already have this URL to avoid duplicates
            const { data: existing } = await supabase
                .from('posts')
                .select('id')
                .eq('source_url', bestTool.url)
                .single();

            if (!existing) {
                // Generate content
                const blogPost = await generateBlogPost(bestTool, 'tool-review');

                // 3. Save to Supabase as draft
                const { data, error } = await supabase.from('posts').insert({
                    title: blogPost.title,
                    slug: blogPost.slug,
                    content: blogPost.markdown,
                    status: 'draft',
                    tags: ['ferramentas', 'reddit', 'tech', 'ia'],
                    source_url: bestTool.url
                }).select();

                if (error) {
                    console.error("Error saving to Supabase:", error);
                    throw error;
                }
                generatedPost = data;
            } else {
                console.log("Post already exists for URL:", bestTool.url);
            }
        }

        return NextResponse.json({
            success: true,
            toolsFound: toolsFound.length,
            generatedPost
        });
    } catch (error: any) {
        console.error("Agent Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
