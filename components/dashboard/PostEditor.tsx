'use client';

import { useState } from 'react';

interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: string;
    tags: string[];
}

interface PostEditorProps {
    post: Post;
    onClose: () => void;
    onSave: () => void;
}

export function PostEditor({ post, onClose, onSave }: PostEditorProps) {
    const [title, setTitle] = useState(post.title);
    const [slug, setSlug] = useState(post.slug);
    const [content, setContent] = useState(post.content);
    const [tags, setTags] = useState((post.tags || []).join(', '));
    const [saving, setSaving] = useState(false);

    const handleSave = async (publish = false) => {
        setSaving(true);

        try {
            await fetch('/api/dashboard/posts', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: post.id,
                    title,
                    slug,
                    content,
                    tags: tags.split(',').map(t => t.trim()),
                    status: publish ? 'published' : post.status
                })
            });

            onSave();
        } catch (error) {
            console.error('Error saving post:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white">Editar Post</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Título
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Slug (URL)
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Tags (separadas por vírgula)
                            </label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="ia, tech, ferramentas"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Conteúdo (Markdown)
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="px-6 py-3 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                    >
                        {saving ? 'Salvando...' : 'Salvar Rascunho'}
                    </button>
                    {post.status === 'draft' && (
                        <button
                            onClick={() => handleSave(true)}
                            disabled={saving}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                        >
                            {saving ? 'Publicando...' : 'Publicar'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
