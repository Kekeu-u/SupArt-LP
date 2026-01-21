# Integração WhatsApp + Supabase + Dashboard

## 1. Migration SQL (rodar no Supabase)

```sql
-- Tabela de conversas (cada chat = 1 conversa)
CREATE TABLE whatsapp_conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chat_id TEXT UNIQUE NOT NULL, -- 5511999999999@c.us
    contact_name TEXT,
    contact_phone TEXT,
    status TEXT DEFAULT 'active', -- active, closed, archived
    lead_id UUID REFERENCES leads(id), -- link com lead do diagnóstico
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE whatsapp_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
    chat_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    message_id TEXT, -- ID original do WhatsApp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_wpp_messages_chat ON whatsapp_messages(chat_id);
CREATE INDEX idx_wpp_messages_conv ON whatsapp_messages(conversation_id);
CREATE INDEX idx_wpp_conv_status ON whatsapp_conversations(status);

-- RLS
ALTER TABLE whatsapp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Policy (ajustar conforme seu auth)
CREATE POLICY "Authenticated users can read conversations" 
ON whatsapp_conversations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read messages" 
ON whatsapp_messages FOR SELECT TO authenticated USING (true);
```

---

## 2. Nodes n8n para Supabase (copiar e importar)

```json
{
  "nodes": [
    {
      "parameters": {
        "operation": "upsert",
        "schema": "public",
        "table": "whatsapp_conversations",
        "conflictColumns": ["chat_id"],
        "columnList": "chat_id, contact_name, contact_phone, updated_at",
        "options": {}
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [400, 200],
      "id": "supabase-upsert-conv",
      "name": "Upsert Conversation",
      "credentials": {
        "supabaseApi": {
          "id": "SEU_CREDENTIAL_ID",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "operation": "insert",
        "schema": "public",
        "table": "whatsapp_messages",
        "columnList": "chat_id, role, content, message_id, conversation_id",
        "options": {}
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [600, 200],
      "id": "supabase-insert-msg",
      "name": "Save Message",
      "credentials": {
        "supabaseApi": {
          "id": "SEU_CREDENTIAL_ID",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "operation": "select",
        "schema": "public",
        "table": "whatsapp_messages",
        "returnAll": false,
        "limit": 20,
        "filterType": "manual",
        "filters": {
          "conditions": [
            {
              "column": "chat_id",
              "operator": "eq",
              "value": "={{ $('dados').item.json.chatId }}"
            }
          ]
        },
        "orderByField": "created_at",
        "orderByDirection": "DESC"
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [200, 200],
      "id": "supabase-get-history",
      "name": "Get Chat History",
      "credentials": {
        "supabaseApi": {
          "id": "SEU_CREDENTIAL_ID",
          "name": "Supabase account"
        }
      }
    }
  ]
}
```

---

## 3. Fluxo no n8n

```
Webhook → dados → Get History (Supabase) → AI Agent → Upsert Conv → Save Msg User → Save Msg Assistant → Send Seen → ...
```

O histórico vai pro AI Agent assim:

```
{{ $('supabase-get-history').all().reverse().map(m => m.json.role + ': ' + m.json.content).join('\n') }}
```

---

## 4. API no Dashboard para Chat

### Endpoint GET /api/whatsapp/conversations

```typescript
// Lista todas as conversas ativas
const { data } = await supabase
  .from('whatsapp_conversations')
  .select('*, whatsapp_messages(count)')
  .order('updated_at', { ascending: false });
```

### Endpoint GET /api/whatsapp/conversations/[id]/messages

```typescript
// Busca mensagens de uma conversa
const { data } = await supabase
  .from('whatsapp_messages')
  .select('*')
  .eq('conversation_id', id)
  .order('created_at', { ascending: true });
```

### Endpoint POST /api/whatsapp/send (enviar mensagem manual)

```typescript
// 1. Validar dados
const { conversation_id, message } = req.body;

// 2. Buscar chat_id da conversa
const { data: conv } = await supabase
  .from('whatsapp_conversations')
  .select('chat_id')
  .eq('id', conversation_id)
  .single();

// 3. Enviar via WAHA
await fetch('https://sua-waha-url/api/sendText', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    session: 'default',
    chatId: conv.chat_id,
    text: message
  })
});

// 4. Salvar mensagem no Supabase
await supabase.from('whatsapp_messages').insert({
  conversation_id,
  chat_id: conv.chat_id,
  role: 'assistant', // ou 'human_agent'
  content: message
});
```

---

## 5. Arquitetura Visual

```
┌─────────────────────────────────────────────────────────┐
│                    DASHBOARD                            │
│  ┌─────────────────┐  ┌───────────────────────────────┐ │
│  │   Conversas     │  │         Chat View             │ │
│  │                 │  │                               │ │
│  │ • João Silva ●  │  │ [User] Oi, quero saber...    │ │
│  │ • Maria Santos  │  │ [AI] Olá! Como posso ajudar? │ │
│  │ • Pedro Lima    │  │ [User] Quanto custa...       │ │
│  │                 │  │                               │ │
│  │                 │  │ ┌─────────────────────────┐   │ │
│  │                 │  │ │ Digite mensagem...    📤│   │ │
│  │                 │  │ └─────────────────────────┘   │ │
│  └─────────────────┘  └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
          │                        │
          ▼                        ▼
     Supabase               WAHA (WhatsApp)
   (lê/escreve)            (envia mensagem)
```

---

## 6. Fluxo de Mensagem Manual

```
Dashboard "Enviar" → API /api/whatsapp/send → WAHA → WhatsApp do cliente
                                            ↓
                                      Salva no Supabase
```

Quando o cliente responde:

```
WhatsApp → WAHA Webhook → n8n → AI Agent → Resposta → Salva no Supabase
                                                            ↓
                                                   Dashboard atualiza (SSE/polling)
```
