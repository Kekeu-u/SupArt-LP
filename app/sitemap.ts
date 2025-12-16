```typescript
import { MetadataRoute } from 'next';
import { servicesSEO } from '@/data/services-seo';
import { aiTools } from '@/data/ai-tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://supart.agency';

  // Páginas estáticas
  const staticRoutes = [
    '',
  ].map((route) => ({
    url: `${ baseUrl }${ route } `,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas de Serviços
  const serviceRoutes = servicesSEO.map((service) => ({
    url: `${ baseUrl } /servicos/${ service.slug } `,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Páginas de Ferramentas
  const toolRoutes = aiTools.map((tool) => ({
    url: `${ baseUrl } /ferramentas/${ tool.slug } `,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...toolRoutes];
}
```
