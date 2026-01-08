import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/apresentacao-adesprs/'],
        },
        sitemap: 'https://supart.agency/sitemap.xml',
    };
}
