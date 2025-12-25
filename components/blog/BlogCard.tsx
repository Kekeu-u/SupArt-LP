import Image from "next/image";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image_url: string;
    published_at: string;
    read_time: string;
    category: {
        name: string;
        slug: string;
    };
    author: {
        name: string;
        avatar_url: string;
    };
}

export const BlogCard = ({ post }: { post: Post }) => {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={post.cover_image_url || '/placeholder-blog.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-blue-600 rounded-full shadow-sm">
                            {post.category?.name}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image src={post.author?.avatar_url || '/placeholder-avatar.jpg'} alt={post.author?.name} fill className="object-cover" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{post.author?.name}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">{new Date(post.published_at).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">{post.read_time}</span>
                        <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Ler mais
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
