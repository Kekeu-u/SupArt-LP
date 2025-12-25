# Integração Dashboard → Site: Revalidação de Posts

## 🎯 Objetivo
Quando você publicar/editar/deletar um post no Dashboard, o Site atualiza instantaneamente.

---

## 📝 Como Usar no Dashboard

### Opção 1: Chamada Manual (após salvar post)
Adicione este código no seu Dashboard após criar/editar um post:

```typescript
// Após salvar o post com sucesso
const revalidateCache = async (slug?: string) => {
  try {
    await fetch('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: '9fa4cf6894a97e5adac088b0d214a426a90f7c0e7855e2d93142cc1a38a612efd',
        slug: slug // opcional: revalida só esse post
      })
    });
  } catch (error) {
    console.error('Erro ao revalidar:', error);
  }
};

// Chamar após salvar
await revalidateCache(post.slug);
```

**Em produção (Vercel):**
Trocar `http://localhost:3000` por `https://seu-site.vercel.app`

---

### Opção 2: Supabase Database Webhook (Automático)
Se não quiser mexer no código do Dashboard:

1. Acesse o painel do Supabase
2. Vá em **Database** → **Webhooks**
3. Clique em **Create a new hook**
4. Configure:
   - **Name:** Blog Revalidation
   - **Table:** `posts`
   - **Events:** `INSERT`, `UPDATE`, `DELETE`
   - **Type:** HTTP Request
   - **Method:** POST
   - **URL:** `https://seu-site.vercel.app/api/revalidate`
   - **HTTP Headers:** `Content-Type: application/json`
   - **HTTP Params/Body:**
     ```json
     {
       "secret": "9fa4cf6894a97e5adac088b0d214a426a90f7c0e7855e2d93142cc1a38a612efd",
       "slug": "{{ record.slug }}"
     }
     ```

Pronto! Toda alteração na tabela `posts` vai revalidar automaticamente.

---

## 🔒 Segurança
- O `REVALIDATE_SECRET` está no `.env.local` do Site
- **IMPORTANTE:** Ao fazer deploy no Vercel, adicione `REVALIDATE_SECRET` nas variáveis de ambiente
- Nunca commite o secret no repositório

---

## ✅ Testando Localmente
```bash
# Terminal
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"9fa4cf6894a97e5adac088b0d214a426a90f7c0e7855e2d93142cc1a38a612efd"}'

# Resposta esperada:
# {"revalidated":true,"paths":["/blog"],"now":1703538000000}
```
