import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🔐 Bypass secreto: acesse qualquer página com ?bypass=supart2024
const BYPASS_SECRET = 'supart2024';

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    // ✅ Permite bypass secreto (salva em cookie por 1 hora)
    if (searchParams.get('bypass') === BYPASS_SECRET) {
        const response = NextResponse.next();
        response.cookies.set('maintenance_bypass', 'true', {
            maxAge: 60 * 60, // 1 hora
            httpOnly: true,
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
