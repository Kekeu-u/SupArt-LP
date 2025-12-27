import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Using anon key, might need service role if RLS blocks updates

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Curated list of "Viral" / High-Tech / Aesthetic images from Unsplash
const viralImages = [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop", // AI/Neural Network
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop", // Abstract AI
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop", // Neon Cyberpunk
    "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop", // VR/AR
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop", // Abstract Fluid
    "https://images.unsplash.com/photo-1614728853913-1e22ba0e982b?q=80&w=1200&auto=format&fit=crop", // Dark Neon
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop", // Cyber Security
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop", // Matrix Code
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop", // Earth Network
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop", // Chip/Tech
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop", // Abstract Purple
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop", // Retro Tech
    "https://images.unsplash.com/photo-1504384308090-c54be3855463?q=80&w=1200&auto=format&fit=crop", // Blue Neon
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop", // Abstract Light
    "https://images.unsplash.com/photo-1531297461136-82lw9f212571?q=80&w=1200&auto=format&fit=crop", // Tech Setup
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop", // Robot/AI
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1200&auto=format&fit=crop", // Laptop/Code
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop", // Team/Tech
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop", // Code Screen
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop", // Code Abstract
];

async function updateImages() {
    console.log('Fetching posts...');
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`Found ${posts.length} posts. Updating images...`);

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        // Pick a random image or sequential to ensure variety
        const imageUrl = viralImages[i % viralImages.length];

        console.log(`Updating post "${post.title}" with image...`);

        const { error: updateError } = await supabase
            .from('posts')
            .update({ featured_image: imageUrl })
            .eq('id', post.id);

        if (updateError) {
            console.error(`Failed to update post ${post.id}:`, updateError);
        } else {
            console.log(`✅ Updated post ${post.id}`);
        }
    }

    console.log('All updates complete!');
}

updateImages();
