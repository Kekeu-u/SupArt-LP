---
description: Solução para erros de replace_file_content quando o conteúdo alvo não é encontrado
---

# Problema: "target content not found in file"

O erro `target content not found in file` ocorre quando o conteúdo especificado no `TargetContent` não corresponde EXATAMENTE ao conteúdo do arquivo. Isso pode acontecer por:

1. **Espaços em branco diferentes**: O arquivo pode ter `\r\n` (Windows) enquanto o target tem apenas `\n`.
2. **Indentação diferente**: Tabs vs espaços, ou quantidade diferente de espaços.
3. **Conteúdo modificado**: O arquivo foi alterado entre a leitura e a tentativa de edição.
4. **Múltiplas linhas**: Blocos grandes têm mais chances de ter discrepâncias.

## Solução: Edições Atômicas (Linha por Linha)

**NUNCA** tente substituir blocos grandes de código. **SEMPRE** faça edições linha por linha:

### ❌ ERRADO (Bloco grande):
```
TargetContent: "::webkit-scrollbar-thumb {\n  background: gradiente...\n  border-radius: 100px;\n}\n\n::webkit-scrollbar-thumb:hover {\n  background: gradiente...\n}"
```

### ✅ CORRETO (Linha única):
```
StartLine: 255
EndLine: 255
TargetContent: "  background: linear-gradient(180deg, rgba(168, 85, 247, 0.4) 0%, ...);"
ReplacementContent: "  background: #525252;"
```

## Passos para edição segura:

1. **Ler o arquivo** com `view_file` imediatamente antes de editar.
2. **Copiar a linha EXATA** do output (incluindo espaços).
3. **Editar UMA linha por vez** com `replace_file_content`.
4. **Se falhar repetidamente**, usar `write_to_file` com `Overwrite: true` para substituir o arquivo inteiro.

// turbo-all
