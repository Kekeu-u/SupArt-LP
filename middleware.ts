import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🔐 Modo de manutenção ATIVADO (apenas em produção)
const MAINTENANCE_MODE_ENABLED = process.env.NODE_ENV === 'production';

// 🔐 Bypass secreto: acesse /supart-unlock para desbloquear o site
const BYPASS_PATH = '/supart-unlock';

export function middleware(request: NextRequest) {
    // Se manutenção está desativada, permite tudo
    if (!MAINTENANCE_MODE_ENABLED) {
        return NextResponse.next();
    }

    const { pathname } = request.nextUrl;

    // ✅ Bypass secreto via rota /??? (salva em cookie por 24 horas)
    if (pathname === BYPASS_PATH) {
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.set('maintenance_bypass', 'true', {
            maxAge: 60 * 60 * 24, // 24 horas
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
        });
        return response;
    }

    // ✅ Permite se já tem cookie de bypass
    if (request.cookies.get('maintenance_bypass')?.value === 'true') {
        return NextResponse.next();
    }

    // ✅ Permite acesso a /maintenance
    if (pathname.startsWith('/maintenance')) {
        return NextResponse.next();
    }

    // ✅ Permite assets estáticos e API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // arquivos como .ico, .png, etc
    ) {
        return NextResponse.next();
    }

    // 🚧 Rewrite (mantém a URL original) para mostrar a página de manutenção
    return NextResponse.rewrite(new URL('/maintenance', request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
