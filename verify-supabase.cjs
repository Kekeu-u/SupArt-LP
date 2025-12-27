
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');

try {
    if (fs.existsSync(envPath)) {
        const envFile = fs.readFileSync(envPath, 'utf8');
        envFile.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["'](.*)["']$/, '$1');
                process.env[key] = value;
            }
        });
    } else {
        console.warn('.env.local file not found');
    }
} catch (error) {
    console.error('Error loading .env.local:', error);
    process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing connection to Supabase with complex query...');

    const { data, error } = await supabase
        .from('posts')
        .select(`
        *,
        author:authors!posts_author_id_fkey(name, avatar_url),
        category:categories!posts_category_id_fkey(name, slug)
    `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching posts:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
        console.log('Successfully fetched posts:', data.length);
        const simplified = data.map(p => ({
            id: p.id,
            title: p.title,
            author: p.author,
            category: p.category
        }));
        console.log(JSON.stringify(simplified, null, 2));
    }
}

testConnection();
