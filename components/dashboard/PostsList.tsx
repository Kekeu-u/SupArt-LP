'use client';

import { useEffect, useState } from 'react';
import { PostEditor } from './PostEditor';

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: string;
    tags: string[];
    source_url: string;
    created_at: string;
}

export function PostsList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    useEffect(() => {
        fetchPosts();
    }, [filter]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const url = filter === 'all'
                ? '/api/dashboard/posts'
                : `/api/dashboard/posts?status=${filter}`;
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar este post?')) return;

        try {
            await fetch(`/api/dashboard/posts?id=${id}`, { method: 'DELETE' });
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handlePublish = async (post: Post) => {
        try {
            await fetch('/api/dashboard/posts', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: post.id, status: 'published' })
            });
            fetchPosts();
        } catch (error) {
            console.error('Error publishing post:', error);
        }
    };

    if (loading) {
        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="text-center text-gray-400">Carregando posts...</div>
            </div>
        );
    }

    return (
        <>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Posts</h2>

                    {/* Filter tabs */}
                    <div className="flex gap-2">
                        {(['all', 'draft', 'published'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {f === 'all' ? 'Todos' : f === 'draft' ? 'Rascunhos' : 'Publicados'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                    {posts.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            Nenhum post encontrado
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Título</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Origem</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Data</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => (
                                        <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-white font-medium line-clamp-1">{post.title}</div>
                                                <div className="text-gray-500 text-sm">{post.slug}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.status === 'published'
                                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                                                        : 'bg-gradient-to-r from-gray-600 to-slate-600 text-white'
                                                    }`}>
                                                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-400 text-sm">
                                                    {post.tags?.[0] || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 text-sm">
                                                {new Date(post.created_at).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setEditingPost(post)}
                                                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                                                    >
                                                        Editar
                                                    </button>
                                                    {post.status === 'draft' && (
                                                        <button
                                                            onClick={() => handlePublish(post)}
                                                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                                                        >
                                                            Publicar
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                                                    >
                                                        Deletar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {editingPost && (
                <PostEditor
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onSave={() => {
                        setEditingPost(null);
                        fetchPosts();
                    }}
                />
            )}
        </>
    );
}
