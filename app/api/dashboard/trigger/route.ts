import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { agent } = await request.json();

        if (!agent || !['reddit', 'news'].includes(agent)) {
            return NextResponse.json({ error: 'Invalid agent type' }, { status: 400 });
        }

        const agentUrl = agent === 'reddit'
            ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/agents/reddit-hunter`
            : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/agents/news-watcher`;

        // Call the agent endpoint (bypass CRON_SECRET for manual triggers in development)
        const response = await fetch(agentUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // In production, you'd want proper auth here
            }
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error triggering agent:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
