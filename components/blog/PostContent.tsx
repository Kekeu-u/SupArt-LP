import Image from "next/image";
import { PremiumBorder } from "@/components/ui/PremiumBorder";
import { CopyButton } from "@/components/ui/CopyButton";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    featured_image: string;
    published_at: string;
    read_time: string;
    category: {
        name: string;
        slug: string;
    };
    author: {
        name: string;
        avatar_url: string;
        role: string;
        bio: string;
    };
}

export const PostContent = ({ post }: { post: Post }) => {
    return (
        <article className="prose prose-lg prose-gray max-w-none">
            {/* Header */}
            <header className="not-prose mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-gray-600 to-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                        {post.category?.name}
                    </span>
                    <span className="text-gray-300 text-sm">•</span>
                    <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.read_time}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 border-y border-gray-100 py-6">
                    <PremiumBorder className="relative w-14 h-14 rounded-full p-[2px]">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                            <Image src={post.author?.avatar_url || '/placeholder-avatar.jpg'} alt={post.author?.name} fill className="object-cover" />
                        </div>
                    </PremiumBorder>
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg">{post.author?.name}</div>
                        <div className="text-sm text-gray-500 font-medium">{post.author?.role}</div>
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                        {new Date(post.published_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </div>
                </div>
            </header>

            {/* Cover Image */}
            <div className="not-prose relative w-full h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <Image src={post.featured_image || '/placeholder-blog.webp'} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>

            {/* Content with premium blog typography */}
            <div
                className="blog-article"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            {/* Share Section */}
            <div className="not-prose mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">Compartilhar:</span>
                    <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all group">
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50 transition-all group">
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-gray-700/50 transition-all group">
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <CopyButton htmlContent={post.content} />
                </div>
            </div>

            {/* Author Bio with glassmorphism */}
            <div className="not-prose mt-12 p-8 rounded-2xl bg-gradient-to-br from-gray-50/50 via-white/80 to-gray-50/50 backdrop-blur-sm border border-gray-200 flex gap-6 items-start relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-blue-500/5 pointer-events-none" />
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-gray-500/20">
                    <Image src={post.author?.avatar_url || '/placeholder-avatar.jpg'} alt={post.author?.name} fill className="object-cover" />
                </div>
                <div className="relative flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Sobre {post.author?.name}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        {post.author?.bio}
                    </p>
                    <div className="flex gap-3">
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};
