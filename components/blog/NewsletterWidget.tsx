"use client";

export const NewsletterWidget = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">Junte-se a 70.000 inscritos!</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Inscrever-se
                </button>
                <p className="text-[10px] text-gray-400 text-center leading-tight">
                    Ao se inscrever, você concorda com nossa <a href="#" className="underline hover:text-gray-600">Política de Privacidade</a>
                </p>
            </form>
        </div>
    );
};
