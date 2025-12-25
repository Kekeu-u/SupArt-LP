import Image from "next/image";

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
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
        role: string;
        bio: string;
    };
}

export const PostContent = ({ post }: { post: Post }) => {
    return (
        <article className="prose prose-lg prose-gray max-w-none">
            {/* Header */}
            <header className="not-prose mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full uppercase tracking-wider">
                        {post.category?.name}
                    </span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{post.read_time}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 border-y border-gray-100 py-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image src={post.author?.avatar_url || '/placeholder-avatar.jpg'} alt={post.author?.name} fill className="object-cover" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{post.author?.name}</div>
                        <div className="text-sm text-gray-500">{post.author?.role}</div>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                        {new Date(post.published_at).toLocaleDateString('pt-BR')}
                    </div>
                </div>
            </header>

            {/* Cover Image */}
            <div className="not-prose relative w-full h-[400px] rounded-2xl overflow-hidden mb-12">
                <Image src={post.cover_image_url || '/placeholder-blog.jpg'} alt={post.title} fill className="object-cover" />
            </div>

            {/* Content */}
            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />

            {/* Tags & Share */}
            <div className="not-prose mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-2">
                    <span className="text-gray-400 text-sm">Tags:</span>
                    <span className="text-gray-600 text-sm font-medium">#design</span>
                    <span className="text-gray-600 text-sm font-medium">#tech</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">Compartilhar:</span>
                    <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-14c-1.105 0-2 .895-2 2v6c0 1.105.895 2 2 2s2-.895 2-2v-6c0-1.105-.895-2-2-2z" /></svg>
                    </button>
                </div>
            </div>

            {/* Author Bio */}
            <div className="not-prose mt-12 p-8 bg-gray-50 rounded-2xl flex gap-6 items-start">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                    <Image src={post.author?.avatar_url || '/placeholder-avatar.jpg'} alt={post.author?.name} fill className="object-cover" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Autor: {post.author?.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {post.author?.bio}
                    </p>
                    <div className="flex gap-3">
                        <a href="#" className="text-gray-400 hover:text-blue-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
                        <a href="#" className="text-gray-400 hover:text-blue-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                    </div>
                </div>
            </div>
        </article>
    );
};
