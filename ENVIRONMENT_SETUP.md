# 🔧 Configuração de Variáveis de Ambiente - Kite Flow Web

## 📋 Visão Geral

Este projeto agora utiliza variáveis de ambiente para configurações dinâmicas. Todas as URLs hardcoded foram substituídas por variáveis de ambiente para facilitar o deploy em diferentes ambientes.

## 🚀 Configuração Rápida

### 1. Copie o arquivo de ambiente apropriado:

```bash
# Para desenvolvimento
cp env.development .env

# Para produção
cp env.production .env
```

### 2. Configure as variáveis conforme necessário:

Edite o arquivo `.env` com os valores corretos para seu ambiente.

## 📝 Variáveis de Ambiente

### **Configurações da API**
- `VITE_API_BASE_URL` - URL base da API backend
  - **Desenvolvimento**: `http://localhost:3000`
  - **Produção**: `https://api.kiteflow.com`

### **Configurações de Desenvolvimento**
- `VITE_DEV` - Modo de desenvolvimento
  - **Desenvolvimento**: `true`
  - **Produção**: `false`

### **Configurações de Autenticação**
- `VITE_ACCESS_TOKEN_KEY` - Chave para armazenar token no localStorage
  - **Padrão**: `accessToken`

### **Configurações do Kubb (Opcional)**
- `VITE_SWAGGER_PATH` - Caminho para o arquivo Swagger
  - **Desenvolvimento**: `/Users/robertojunior/Documents/kite-flow/swagger.json`
  - **Produção**: `https://api.kiteflow.com/swagger.json`

## 🔄 Arquivos Modificados

### **kubb.client.ts**
```typescript
// Antes
baseURL: "http://localhost:3000"
const token = localStorage.getItem("accessToken");

// Depois
baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
const token = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY || "accessToken");
```

### **kubb.config.ts**
```typescript
// Antes
path: "/Users/robertojunior/Documents/kite-flow/swagger.json"
baseURL: "http://localhost:3000"

// Depois
path: process.env.VITE_SWAGGER_PATH || "/Users/robertojunior/Documents/kite-flow/swagger.json"
baseURL: process.env.VITE_API_BASE_URL || "http://localhost:3000"
```

### **AuthProvider.tsx**
```typescript
// Antes
const TOKEN_KEY = "accessToken";

// Depois
const TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY || "accessToken";
```

### **vite.config.ts**
```typescript
// Adicionado suporte para carregar variáveis de ambiente
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // ... configurações existentes
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
      'import.meta.env.VITE_ACCESS_TOKEN_KEY': JSON.stringify(env.VITE_ACCESS_TOKEN_KEY),
      'import.meta.env.VITE_DEV': JSON.stringify(env.VITE_DEV),
      'import.meta.env.VITE_SWAGGER_PATH': JSON.stringify(env.VITE_SWAGGER_PATH),
    },
  };
});
```

## 🛠️ Comandos Úteis

### **Desenvolvimento**
```bash
# Usar configurações de desenvolvimento
cp env.development .env
npm run dev
```

### **Produção**
```bash
# Usar configurações de produção
cp env.production .env
npm run build
```

### **Regenerar clientes da API**
```bash
# Após alterar VITE_SWAGGER_PATH
npm run kubb
```

## 🔒 Segurança

- ✅ Nunca commite arquivos `.env` com dados sensíveis
- ✅ Use `.env.example` como template
- ✅ Configure variáveis de produção no servidor de deploy
- ✅ Valide todas as variáveis antes do deploy

## 🐛 Troubleshooting

### **Problema**: Variáveis não estão sendo carregadas
**Solução**: Verifique se o arquivo `.env` está na raiz do projeto e se as variáveis começam com `VITE_`

### **Problema**: API não conecta
**Solução**: Verifique se `VITE_API_BASE_URL` está configurada corretamente

### **Problema**: Token não é salvo
**Solução**: Verifique se `VITE_ACCESS_TOKEN_KEY` está configurada

## 📚 Arquivos de Ambiente

- `env.example` - Template com todas as variáveis
- `env.development` - Configurações para desenvolvimento
- `env.production` - Configurações para produção
- `.env` - Arquivo local (não versionado)


## Configuração do seed Prisma

Senhas padrão criadas:
Admin: Admin@123
Staff: Staff@123
Instructor: Instructor@123
Member: Member@123
Casual: Casual@123