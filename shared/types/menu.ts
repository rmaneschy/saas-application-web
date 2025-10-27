import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title?: string;
  path?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children?: MenuItem[];
  separator?: boolean;
  disabled?: boolean;
  requiredRoles?: string[];
}

export type MenuConfig = MenuItem[];

