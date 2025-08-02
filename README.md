# 🚀 SaaS Boilerplate

Um boilerplate completo e moderno para aplicações SaaS, construído com Next.js 14, TypeScript, Prisma, NextAuth.js e Tailwind CSS.

## ✨ Características

- **🔐 Autenticação Completa** - NextAuth.js com múltiplos provedores
- **📊 Dashboard Responsivo** - Interface moderna e intuitiva
- **🎨 UI/UX Moderna** - Componentes reutilizáveis com Tailwind CSS
- **🗄️ Banco de Dados** - Prisma ORM com PostgreSQL
- **📱 PWA Ready** - Manifest e configurações para PWA
- **🔍 SEO Otimizado** - Metadata, sitemap e robots.txt
- **⚡ Performance** - Next.js 14 com App Router
- **🛡️ TypeScript** - Tipagem completa para maior segurança
- **🎯 Componentes** - Sistema de componentes modular

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Autenticação**: NextAuth.js
- **Banco de Dados**: Prisma + PostgreSQL
- **UI Components**: Shadcn/ui
- **Deploy**: Vercel (recomendado)

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- PostgreSQL (para produção)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/saas-boilerplate.git
cd saas-boilerplate
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

4. **Configure o banco de dados**
```bash
# Execute as migrações do Prisma
npx prisma migrate dev

# Gere o cliente Prisma
npx prisma generate
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

6. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
saas-boilerplate/
├── src/
│   ├── _actions/          # Server Actions
│   │   └── auth/         # Ações de autenticação
│   ├── _components/       # Componentes reutilizáveis
│   │   ├── ui/           # Componentes base (shadcn/ui)
│   │   └── container/    # Containers e layouts
│   ├── _hooks/           # Custom hooks
│   ├── _lib/             # Configurações e utilitários
│   ├── _providers/       # Providers do React
│   ├── _types/           # Definições de tipos
│   ├── _utils/           # Funções utilitárias
│   └── app/              # App Router (Next.js 14)
│       ├── (auth)/       # Rotas de autenticação
│       ├── (pages)/      # Páginas da aplicação
│       └── api/          # API Routes
├── prisma/               # Schema e migrações do banco
├── public/               # Arquivos estáticos
└── docs/                 # Documentação adicional
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saas_boilerplate"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers (opcional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Banco de Dados

1. **Instale o PostgreSQL**
2. **Crie um banco de dados**
3. **Configure a DATABASE_URL**
4. **Execute as migrações**:
```bash
npx prisma migrate dev
```

## 🎨 Personalização

### Cores e Tema

O projeto usa Tailwind CSS. Para personalizar as cores, edite `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... suas cores
        }
      }
    }
  }
}
```

### Componentes

Os componentes estão em `src/_components/`. Para adicionar novos componentes:

1. Crie o componente em `src/_components/ui/`
2. Exporte de `src/_components/ui/index.ts`
3. Use em suas páginas

### Autenticação

Para adicionar novos provedores de autenticação:

1. Configure as variáveis de ambiente
2. Adicione o provedor em `src/app/api/auth/[...nextauth]/route.ts`
3. Atualize os tipos em `src/_types/session.ts`

## 📱 PWA

O boilerplate está configurado como PWA. Para personalizar:

1. **Ícones**: Substitua os ícones em `public/`
2. **Manifest**: Edite `public/manifest.json`
3. **Cores**: Atualize as cores no manifest

## 🔍 SEO

O projeto inclui:

- **Metadata dinâmico** em `src/app/layout.tsx`
- **Sitemap** em `public/sitemap.xml`
- **Robots.txt** em `public/robots.txt`
- **Open Graph** e **Twitter Cards**

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte seu repositório** ao Vercel
2. **Configure as variáveis de ambiente**
3. **Deploy automático** a cada push

### Outras Plataformas

O projeto funciona em qualquer plataforma que suporte Next.js:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 📚 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa o ESLint
npm run type-check   # Verifica tipos TypeScript

# Banco de Dados
npx prisma studio    # Abre o Prisma Studio
npx prisma migrate dev    # Executa migrações
npx prisma generate      # Gera o cliente Prisma
npx prisma db push       # Push do schema para o banco
```

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Prisma](https://prisma.io/) - ORM moderno
- [NextAuth.js](https://next-auth.js.org/) - Autenticação
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes UI

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/saas-boilerplate/issues)
- **Discord**: [Comunidade](https://discord.gg/saas-boilerplate)
- **Email**: suporte@saas-boilerplate.com

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**
