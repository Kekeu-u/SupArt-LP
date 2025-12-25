# Estratégia de Newsletter para SupArt

## Visão Geral
Para implementar uma newsletter profissional e escalável, recomendamos a integração do **Supabase** (para armazenar leads) com um serviço de envio de emails transacionais/marketing como **Resend** (recomendado para devs) ou **Mailchimp** (mais visual).

## Arquitetura Recomendada

1.  **Frontend (Next.js):**
    *   Componente `NewsletterWidget` (já existente) coleta o email.
    *   Envia requisição POST para uma API Route (`app/api/newsletter/subscribe/route.ts`).

2.  **Backend (Next.js API Route):**
    *   Recebe o email.
    *   **Passo 1:** Salva o email na tabela `leads` ou `subscribers` no Supabase.
    *   **Passo 2:** Chama a API do provedor de email (Resend/Mailchimp) para adicionar o contato à lista de audiência.
    *   **Passo 3:** Envia um email de boas-vindas automático (opcional).

## Implementação Passo a Passo

### 1. Banco de Dados (Supabase)
Crie uma tabela para armazenar os inscritos:

```sql
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'active' -- active, unsubscribed
);
```

### 2. Provedor de Email (Resend)
O Resend é excelente para projetos Next.js.
1.  Crie conta em [resend.com](https://resend.com).
2.  Adicione seu domínio.
3.  Pegue a API Key.

### 3. API Route (`app/api/newsletter/subscribe/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // 1. Salvar no Supabase
  const { error: dbError } = await supabase
    .from('subscribers')
    .insert([{ email }]);

  if (dbError) {
    if (dbError.code === '23505') { // Unique violation
      return NextResponse.json({ message: 'Email já cadastrado!' }, { status: 200 });
    }
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // 2. Enviar Email de Boas-vindas (Opcional)
  try {
    await resend.emails.send({
      from: 'SupArt <contato@seudominio.com>',
      to: email,
      subject: 'Bem-vindo à SupArt!',
      html: '<p>Obrigado por se inscrever em nossa newsletter!</p>'
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    // Não falhar a requisição se o email falhar, pois o lead já foi salvo
  }

  return NextResponse.json({ message: 'Inscrição realizada com sucesso!' });
}
```

### 4. Automação (Opcional)
Para enviar emails semanais/mensais, você pode:
*   Usar a interface do **Mailchimp** (se escolher ele).
*   Usar **Resend Broadcasts** (novo recurso).
*   Criar uma **Edge Function** no Supabase que roda via CRON job para enviar emails de resumo.

## Por que essa abordagem?
*   **Propriedade dos Dados:** Você tem todos os emails no seu banco (Supabase), não fica refém da plataforma de email.
*   **Flexibilidade:** Pode trocar de Resend para Mailchimp ou AWS SES sem perder a base de dados.
*   **Performance:** A API Route do Next.js processa tudo rapidamente.
