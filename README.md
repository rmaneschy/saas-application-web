# SaaS Application Web

Aplicação SaaS profissional em React com sistema de autenticação completo integrado à API [auth-security-api-multitenant](https://github.com/rmaneschy/auth-security-api-multitenant).

## 🚀 Características

### Autenticação e Segurança
- ✅ Sistema completo de autenticação (Login, Registro, Recuperação de Senha)
- ✅ Integração com API backend via JWT (Access Token + Refresh Token)
- ✅ Refresh automático de tokens
- ✅ Controle de acesso baseado em roles (RBAC)
- ✅ Proteção de rotas
- ✅ Persistência de sessão

### Layout Profissional (Metronic Layout-8)
- ✅ Sidebar fixa com menu hierárquico
- ✅ Header responsivo para mobile
- ✅ Toolbar avançado para desktop
- ✅ Breadcrumbs de navegação contextual
- ✅ Sistema de notificações
- ✅ Menu de usuário com dropdown
- ✅ Interface totalmente responsiva

### Funcionalidades
- ✅ Dashboard com cards de estatísticas
- ✅ Página de perfil do usuário
- ✅ Página de configurações
- ✅ Menu hierárquico com submenus multinível
- ✅ Badges e indicadores visuais
- ✅ Controle de acesso por roles nos menus
- ✅ Barra de busca global

## 🛠️ Tecnologias

- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS 4** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Wouter** - Roteamento
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+
- pnpm
- API backend rodando ([auth-security-api-multitenant](https://github.com/rmaneschy/auth-security-api-multitenant))

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/rmaneschy/saas-application-web.git
cd saas-application-web
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
# A URL da API backend será solicitada na primeira execução
# Exemplo: http://localhost:8080
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

5. Acesse a aplicação:
```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
saas-application-web/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Componentes de layout
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Toolbar.tsx
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── ui/              # Componentes shadcn/ui
│   │   │   └── RequireAuth.tsx  # HOC para rotas protegidas
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx  # Contexto de autenticação
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useAuthorization.ts
│   │   │   └── useIsMobile.ts
│   │   ├── lib/
│   │   │   └── api-adapter.ts   # Cliente HTTP configurado
│   │   ├── pages/
│   │   │   ├── auth/            # Páginas de autenticação
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Settings.tsx
│   │   ├── config/
│   │   │   └── menu.config.ts   # Configuração do menu
│   │   └── App.tsx
│   └── public/
├── shared/
│   └── types/                   # Tipos compartilhados
│       ├── auth.ts
│       └── menu.ts
└── todo.md                      # Acompanhamento de tarefas
```

## 🔐 Sistema de Autenticação

### Fluxo de Login
1. Usuário insere credenciais
2. API retorna access token e refresh token
3. Tokens são armazenados no localStorage
4. Access token é enviado em todas as requisições
5. Refresh automático quando o token expira

### Controle de Acesso (RBAC)
- **USER**: Acesso básico
- **MODERATOR**: Acesso moderado + recursos de moderação
- **ADMIN**: Acesso total ao sistema

### Rotas Protegidas
```typescript
<Route path="/dashboard">
  <RequireAuth>
    <Dashboard />
  </RequireAuth>
</Route>

<Route path="/users">
  <RequireAuth requiredRoles={['ROLE_ADMIN']}>
    <Users />
  </RequireAuth>
</Route>
```

## 📱 Responsividade

- **Desktop (≥1024px)**: Sidebar fixa + Toolbar
- **Mobile (<1024px)**: Header com menu hambúrguer

## 🎨 Customização

### Menu
Edite `client/src/config/menu.config.ts` para customizar o menu:

```typescript
export const SIDEBAR_MENU: MenuConfig = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    title: 'Configurações',
    icon: Settings,
    children: [
      { title: 'Geral', path: '/settings' },
      { title: 'Segurança', path: '/settings/security' },
    ],
  },
];
```

### Tema
Edite `client/src/index.css` para customizar cores e estilos.

## 🚀 Deploy

O projeto está pronto para deploy em qualquer plataforma que suporte aplicações React:

- Vercel
- Netlify
- AWS Amplify
- GitHub Pages

## 📄 Licença

Este projeto é privado e de propriedade de rmaneschy.

## 🤝 Contribuindo

Este é um projeto privado. Contribuições são aceitas mediante aprovação.

## 📞 Suporte

Para questões ou suporte, entre em contato através do GitHub.

---

Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS
