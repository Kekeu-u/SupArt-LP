# 📋 Instruções para Integrar Revalidação no Dashboard

## URLs do Projeto:
- **Site:** https://www.supart.com.br
- **Blog:** https://www.supart.com.br/blog
- **Dashboard:** https://dash.supart.com.br

---

## Código para adicionar no Dashboard:

```typescript
// Adicione esta função em algum lugar do seu projeto (ex: lib/revalidate.ts)
async function revalidateSiteCache(slug?: string) {
  try {
    const response = await fetch('https://www.supart.com.br/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: '9fa4cf6894a97e5adac088b0d214a426a90f7c0e7855e2d93142cc1a38a612efd',
        slug: slug // opcional: se passar, revalida só esse post
      })
    });
    
    if (!response.ok) {
      console.error('Erro ao revalidar cache:', await response.text());
    } else {
      console.log('✅ Cache do site atualizado com sucesso!');
    }
  } catch (error) {
    console.error('❌ Falha na revalidação:', error);
  }
}
```

---

## Onde chamar:
No código que **salva** o post (após o sucesso da operação no Supabase):

```typescript
// Exemplo: depois de criar/editar post
const { data: post, error } = await supabase
  .from('posts')
  .insert({ ... })
  .select()
  .single();

if (!error && post) {
  // 🔥 ADICIONE ESTA LINHA:
  await revalidateSiteCache(post.slug);
  
  // Agora o blog em www.supart.com.br/blog estará atualizado!
}
```

---

## Para Desenvolvimento Local:
Se estiver testando localmente, use:
```typescript
const SITE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://www.supart.com.br'
  : 'http://localhost:3000';

await fetch(`${SITE_URL}/api/revalidate`, { ... })
```

---

## Alternativa: Webhook Automático do Supabase (Recomendado!)
Se não quiser mexer no código do Dashboard, configure um webhook no painel do Supabase:

1. Acesse: https://supabase.com/dashboard/project/jpcsfzaqaqnokchwdzsk
2. Vá em **Database** → **Webhooks** → **Create a new hook**
3. Configure:
   - **Name:** Blog Revalidation
   - **Table:** `posts`
   - **Events:** ✅ INSERT, ✅ UPDATE, ✅ DELETE
   - **Type:** HTTP Request
   - **Method:** POST
   - **URL:** `https://www.supart.com.br/api/revalidate`
   - **HTTP Headers:** `Content-Type: application/json`
   - **HTTP Params:**
     ```json
     {
       "secret": "9fa4cf6894a97e5adac088b0d214a426a90f7c0e7855e2d93142cc1a38a612efd",
       "slug": "{{ record.slug }}"
     }
     ```

Pronto! Toda alteração na tabela `posts` vai revalidar o blog automaticamente. 🚀

---

## Testando:
1. Publique um post no Dashboard (dash.supart.com.br)
2. Acesse www.supart.com.br/blog
3. O post deve aparecer instantaneamente! ✨
