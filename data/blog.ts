export interface Author {
    name: string;
    role: string;
    avatar: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    author: Author;
    category: string;
    readTime: string;
    content?: string; // HTML or Markdown content
    featured?: boolean;
}

export const authors: Record<string, Author> = {
    adrio: {
        name: "Adrio David",
        role: "Senior Engineer",
        avatar: "https://i.pravatar.cc/150?u=adrio",
    },
    ryna: {
        name: "Ryna Kenter",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?u=ryna",
    },
};

export const blogPosts: BlogPost[] = [
    {
        slug: "traveller-visiting-ice-cave",
        title: "Traveller Visiting Ice Cave With Amazing eye catching view with nature",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.adrio,
        category: "Travel",
        readTime: "12 min read",
        featured: true,
        content: `
            <p>In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper. As we navigate the complexities of modern living, there's an increasing desire to strip away the unnecessary and embrace a life of authenticity, intention, and balance.</p>
            <h3>Introduction: Finding Bliss in Simplicity</h3>
            <p>In a culture that often celebrates excess and constant activity, the idea of a lifestyle centered around simplicity might seem counterintuitive. However, at its core, simplicity is about focusing on what truly matters and letting go of the superfluous. It's a mindful approach that can lead to a more meaningful and fulfilling existence.</p>
            <h3>Clearing the Clutter</h3>
            <p>Simplicity starts at home. Decluttering your living space is an invigorating process that allows you to create physical and mental space for what truly resonates with you. Whether it's cleaning out your closet, reorganizing your kitchen, or letting go of sentimental items, the act of decluttering can be liberating.</p>
            <h3>Mindful Consumption</h3>
            <p>In a consumer-driven society, practicing mindful consumption is a revolutionary act. Embracing quality over quantity and making intentional choices about what you bring into your life can lead to a sense of contentment and reduced environmental impact. Consider supporting sustainable and ethical brands that align with your values.</p>
        `
    },
    {
        slug: "wellness-unveiled",
        title: "Wellness Unveiled: Empowering Your Journey to a Balanced and Vibrant Life",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1544367563-121910aa662f?q=80&w=2070&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.ryna,
        category: "Health",
        readTime: "8 min read",
    },
    {
        slug: "culinary-expeditions",
        title: "Culinary Expeditions: Tasting the World's Flavors in the Heart of Local Culture",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.ryna,
        category: "Health",
        readTime: "6 min read",
    },
    {
        slug: "hidden-gems-unveiled",
        title: "Hidden Gems Unveiled: Off-the-Beaten-Path Adventures Around the Globe",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.ryna,
        category: "Travel",
        readTime: "10 min read",
    },
    {
        slug: "tech-savvy-chronicles",
        title: "TechSavvy Chronicles: Navigating the Digital Frontier",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.adrio,
        category: "Technology",
        readTime: "5 min read",
    },
    {
        slug: "wanderlust-chronicles",
        title: "Wanderlust Chronicles: Tales of Exploration and Discovery from Faraway Lands",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.ryna,
        category: "Travel",
        readTime: "7 min read",
    },
    {
        slug: "tradition-and-transformation",
        title: "Tradition and Transformation: Exploring the Evolving Facets of Cultural Heritage",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?q=80&w=2074&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.ryna,
        category: "Culture",
        readTime: "9 min read",
    },
    {
        slug: "innovative-architectural-designs",
        title: "14 Innovative Architectural Designs to Create a Vast Interior Space",
        excerpt: "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
        coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
        date: "Aug 24, 2023",
        author: authors.adrio,
        category: "Technology",
        readTime: "6 min read",
    }
];

export const categories = [
    { name: "Health", count: "03" },
    { name: "Lifestyle", count: "01" },
    { name: "Travel", count: "02" },
    { name: "Technology", count: "02" },
    { name: "Culture", count: "01" },
];
