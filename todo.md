# Project TODO

## Fase 2: Estrutura Inicial e Autenticação

### Configuração Base
- [x] Criar projeto React com Vite
- [x] Configurar variáveis de ambiente
- [x] Instalar dependências necessárias (axios)

### Sistema de Autenticação
- [x] Criar modelos TypeScript (AuthModel, UserModel)
- [x] Implementar API adapter para comunicação com backend
- [x] Criar AuthContext e AuthProvider
- [x] Implementar hook useAuth

### Páginas de Autenticação
- [x] Página de Login
- [x] Página de Registro
- [x] Página de Esqueci Minha Senha
- [x] Página de Redefinir Senha

### Layout Base
- [x] Implementar Layout-8 (sidebar + header)
- [x] Criar componente Sidebar
- [x] Criar componente Header (mobile)
- [x] Criar componente Footer
- [x] Implementar menu de navegação

### Controle de Acesso
- [x] Implementar hook useAuthorization
- [x] Criar componente RequireAuth para rotas protegidas
- [x] Implementar verificação de roles
- [x] Renderização condicional baseada em permissões

### Dashboard
- [x] Página inicial do dashboard (completa)
- [x] Página de perfil do usuário
- [x] Página de configurações

## Melhorias Futuras
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Documentação de componentes
- [ ] Internacionalização (i18n)
- [ ] Modo escuro/claro
- [ ] Notificações push



## Melhorias do Layout-8

### Header Avançado
- [x] Implementar Breadcrumbs para navegação contextual
- [x] Adicionar barra de busca global
- [x] Implementar sistema de notificações com dropdown
- [x] Criar menu de usuário com dropdown (perfil, configurações, logout)
- [x] Adicionar ações rápidas no header



### Sidebar Avançado
- [x] Implementar menu hierárquico com submenus
- [x] Adicionar badges e indicadores nos itens
- [x] Implementar animações de expansão/colapso (via DropdownMenu)
- [x] Criar agrupamento de itens por categoria
- [x] Adicionar tooltip expandido com descrição (via DropdownMenu)



## Ajustes e Correções

### Layout-8 Refinamentos
- [x] Corrigir imperfeições da sidebar (espaçamento, alinhamento, cores)
- [x] Ajustar título da aplicação (remover %VITE_APP_TITLE%)
- [x] Alinhar design com Layout-8 original do Metronic
- [x] Revisar responsividade e transições



## Dashboard Widgets

### Componentes de Dashboard
- [x] Cards de estatísticas com ícones e tendências
- [x] Gráficos (linha, barra)
- [x] Tabela de atividades recentes
- [x] Lista de tarefas pendentes
- [x] Widgets de progresso
- [x] Cards informativos



## Correções Layout-8

### Ajustes Visuais
- [x] Corrigir sidebar e toolbar para ficarem interligadas com bordas arredondadas
- [x] Ajustar tamanho dos ícones da sidebar (não comprimir)
- [x] Melhorar espaçamento interno dos itens do menu



## Ajustes Finais Layout-8

### Dimensões e Continuidade Visual
- [x] Ajustar largura da sidebar para 90px (era 72px)
- [x] Definir altura do header/toolbar para 60px
- [x] Criar efeito de continuidade visual entre sidebar e toolbar



## Refinamento CSS Layout-8

### Variáveis CSS e Espaçamento
- [x] Adicionar variáveis CSS --sidebar-width e --header-height
- [x] Usar margin-inline-start para o conteúdo principal
- [x] Adicionar margem de 20px no desktop (lg:m-5)

