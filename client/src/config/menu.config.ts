import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react';
import type { MenuConfig } from '@/../../shared/types/menu';

export const SIDEBAR_MENU: MenuConfig = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    title: 'Perfil',
    icon: User,
    children: [
      {
        title: 'Meu Perfil',
        path: '/profile',
      },
      {
        title: 'Editar Perfil',
        path: '/profile/edit',
      },
      {
        separator: true,
      },
      {
        title: 'Atividades',
        path: '/profile/activity',
      },
    ],
  },
  {
    title: 'Configurações',
    icon: Settings,
    children: [
      {
        title: 'Geral',
        path: '/settings',
      },
      {
        title: 'Segurança',
        path: '/settings/security',
      },
      {
        title: 'Notificações',
        path: '/settings/notifications',
      },
      {
        separator: true,
      },
      {
        title: 'Integrações',
        path: '/settings/integrations',
      },
    ],
  },
  {
    title: 'Usuários',
    icon: Users,
    badge: 'Admin',
    badgeVariant: 'destructive',
    requiredRoles: ['ROLE_ADMIN'],
    children: [
      {
        title: 'Lista de Usuários',
        path: '/users',
      },
      {
        title: 'Adicionar Usuário',
        path: '/users/new',
      },
      {
        separator: true,
      },
      {
        title: 'Grupos',
        path: '/users/groups',
      },
      {
        title: 'Permissões',
        path: '/users/permissions',
      },
    ],
  },
  {
    title: 'Segurança',
    icon: Shield,
    badge: 'Mod',
    badgeVariant: 'secondary',
    requiredRoles: ['ROLE_ADMIN', 'ROLE_MODERATOR'],
    children: [
      {
        title: 'Logs de Acesso',
        path: '/security/logs',
      },
      {
        title: 'Sessões Ativas',
        path: '/security/sessions',
      },
      {
        title: 'Auditoria',
        path: '/security/audit',
      },
    ],
  },
  {
    title: 'Relatórios',
    icon: BarChart3,
    badge: 'Novo',
    badgeVariant: 'default',
    children: [
      {
        title: 'Visão Geral',
        path: '/reports',
      },
      {
        title: 'Análises',
        path: '/reports/analytics',
      },
      {
        separator: true,
      },
      {
        title: 'Exportar',
        path: '/reports/export',
      },
    ],
  },
  {
    title: 'Documentação',
    icon: FileText,
    children: [
      {
        title: 'Guia de Início',
        path: '/docs/getting-started',
      },
      {
        title: 'API',
        path: '/docs/api',
      },
      {
        title: 'FAQ',
        path: '/docs/faq',
      },
    ],
  },
];

