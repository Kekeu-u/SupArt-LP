# Especificação do Editor de Blog - Elementos HTML Suportados

Para manter a tipografia premium do blog, o editor de texto precisa suportar os seguintes elementos HTML:

## Elementos Obrigatórios

### 1. Parágrafos
- **Tag:** `<p>`
- **Uso:** Texto corrido normal
- **Nota:** O primeiro parágrafo terá drop-cap automático (primeira letra grande)

### 2. Títulos (Hierarquia)
- **Tags:** `<h2>`, `<h3>`
- **Uso:** 
  - H2 = Seções principais
  - H3 = Subseções
- **Importante:** Nunca usar H1 (reservado pro título do post)

### 3. Linha Horizontal
- **Tag:** `<hr>`
- **Uso:** Separar grandes seções do artigo
- **Visual:** Linha gradiente centralizada

### 4. Listas
- **Tags:** `<ul>`, `<ol>`, `<li>`
- **Uso:** 
  - `<ul>` = Bullets (bolinhas gradiente)
  - `<ol>` = Numeradas (números em círculos gradiente)

### 5. Citações/Blockquotes
- **Tag:** `<blockquote><p>Texto aqui</p></blockquote>`
- **Uso:** Destacar frases importantes, citações de livros/autores
- **Visual:** Caixa com gradiente, aspas decorativas, borda lateral

### 6. Texto em Negrito
- **Tag:** `<strong>`
- **Uso:** Destacar palavras-chave
- **Visual:** Negrito com highlight sutil

### 7. Texto em Itálico
- **Tag:** `<em>`
- **Uso:** Ênfase, termos estrangeiros, pensamentos

### 8. Links
- **Tag:** `<a href="URL">texto</a>`
- **Visual:** Cor roxa com underline on hover

### 9. Tabelas
- **Tags:** `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- **Uso:** Comparações, dados estruturados
- **Visual:** Header gradiente roxo, hover nas linhas

### 10. Imagens (Inline)
- **Tag:** `<img src="URL" alt="descrição">`
- **Visual:** Bordas arredondadas, sombra

---

## Toolbar Recomendada do Editor

1. **Formatação básica:** Bold, Italic
2. **Títulos:** Dropdown com H2, H3
3. **Listas:** Bullet list, Numbered list
4. **Citação:** Blockquote
5. **Link:** Inserir hyperlink
6. **Imagem:** Upload/inserir imagem
7. **Tabela:** Inserir tabela (linhas x colunas)
8. **Divisor:** Inserir `<hr>`

---

## Exemplo de Estrutura de Artigo

```html
<p>Parágrafo de abertura com gancho emocional...</p>

<hr>

<h2>🔥 Seção Principal 1</h2>

<p>Texto explicativo...</p>

<blockquote>
<p>"Citação impactante de um autor famoso."</p>
</blockquote>

<h3>Subseção</h3>

<p>Mais detalhes...</p>

<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>

<h2>💡 Seção Principal 2</h2>

<table>
<thead>
<tr><th>Coluna 1</th><th>Coluna 2</th></tr>
</thead>
<tbody>
<tr><td>Dado 1</td><td>Dado 2</td></tr>
</tbody>
</table>

<hr>

<h2>📚 Leitura Recomendada</h2>

<ul>
<li><strong>"Livro 1"</strong> — Autor</li>
<li><strong>"Livro 2"</strong> — Autor</li>
</ul>
```

---

## Notas Importantes

1. **Emojis nos títulos:** São bem-vindos para dar personalidade (🔥💡🎯📚)
2. **Não usar:** `<h1>`, `<h4>`, `<h5>`, `<h6>` - quebram a hierarquia
3. **Parágrafos curtos:** Máximo 3-4 linhas para melhor leitura mobile
4. **Blockquotes:** Usar para frases de impacto, não para texto longo
