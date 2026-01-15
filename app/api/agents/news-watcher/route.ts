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
        // 1. Fetch Top Stories from Hacker News
        const topIdsRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', { next: { revalidate: 60 } });
        const topIds = await topIdsRes.json();

        // Fetch details for top 10 stories
        const topStories = await Promise.all(
            topIds.slice(0, 10).map(async (id: number) => {
                const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { next: { revalidate: 60 } });
                return res.json();
            })
        );

        // 2. Filter AI-related news
        const aiKeywords = ['ai ', 'llm', 'gpt', 'claude', 'gemini', 'openai', 'anthropic', 'model', 'agent', 'machine learning'];
        const aiNews = topStories.filter(story =>
            story.title && aiKeywords.some(keyword => story.title.toLowerCase().includes(keyword))
        );

        let generatedPost = null;

        if (aiNews.length > 0) {
            // Pick the first relevant story
            const story = aiNews[0];

            // Check for duplicates
            const { data: existing } = await supabase
                .from('posts')
                .select('id')
                .eq('source_url', story.url || `hn-${story.id}`)
                .single();

            if (!existing) {
                const sourceData = {
                    title: story.title,
                    url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
                    source: 'Hacker News',
                    content: `Score: ${story.score}. Comments: ${story.descendants}`
                };

                // Generate content
                const blogPost = await generateBlogPost(sourceData, 'news');

                // Save to Supabase
                const { data, error } = await supabase.from('posts').insert({
                    title: blogPost.title,
                    slug: blogPost.slug,
                    content: blogPost.markdown,
                    status: 'draft',
                    tags: ['notícias', 'ia', 'tech', 'hacker-news'],
                    source_url: sourceData.url
                }).select();

                if (error) throw error;
                generatedPost = data;
            }
        }

        return NextResponse.json({
            success: true,
            storiesChecked: topStories.length,
            aiStoriesFound: aiNews.length,
            generatedPost
        });

    } catch (error: any) {
        console.error("News Agent Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
