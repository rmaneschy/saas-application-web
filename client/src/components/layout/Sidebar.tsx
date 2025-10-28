import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SIDEBAR_MENU } from '@/config/menu.config';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/useAuthorization';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/../../shared/types/menu';
import { Home } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { hasAnyRole } = useAuthorization();

  const isActive = (path?: string) => path && location === path;

  const hasActiveChild = (items?: MenuItem[]): boolean => {
    if (!items) return false;
    return items.some((item) => {
      if (item.path && isActive(item.path)) return true;
      if (item.children) return hasActiveChild(item.children);
      return false;
    });
  };

  const canAccessMenuItem = (item: MenuItem) => {
    if (!item.requiredRoles || item.requiredRoles.length === 0) {
      return true;
    }
    return hasAnyRole(...item.requiredRoles);
  };

  const buildMenuChildren = (items: MenuItem[]) => {
    return items.map((item, index) => {
      if (item.disabled) return null;
      if (item.separator) return <DropdownMenuSeparator key={index} />;
      
      if (!canAccessMenuItem(item)) return null;

      if (item.children) {
        return (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger
              data-here={hasActiveChild(item.children) || undefined}
              className="data-[here=true]:bg-accent data-[here=true]:text-accent-foreground"
            >
              {item.title}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-[200px]">
              <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
              {buildMenuChildren(item.children)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem key={index} asChild>
          <Link href={item.path || '#'}>
            <a className="w-full">{item.title}</a>
          </Link>
        </DropdownMenuItem>
      );
    });
  };

  const buildMenu = () => {
    return SIDEBAR_MENU.map((item, index) => {
      if (!canAccessMenuItem(item)) return null;

      return (
        <div key={index} className="flex flex-col items-center">
          {item.children ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  data-here={hasActiveChild(item.children) || undefined}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 rounded-xl shadow-none relative',
                    'w-14 h-14 p-2',
                    'text-[10px] font-medium text-gray-700 bg-transparent border border-transparent',
                    'hover:text-gray-900 hover:bg-white hover:shadow-sm hover:border-gray-100',
                    'data-[state=open]:text-gray-900 data-[state=open]:bg-white data-[state=open]:shadow-sm data-[state=open]:border-gray-100',
                    'data-[here=true]:text-gray-900 data-[here=true]:bg-white data-[here=true]:shadow-sm data-[here=true]:border-gray-100',
                    'transition-all duration-200'
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5 stroke-[1.5] shrink-0" />}
                  <span className="leading-none text-center whitespace-nowrap">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        'absolute top-1 right-1 h-2 w-2 rounded-full',
                        item.badgeVariant === 'destructive' && 'bg-pink-500',
                        item.badgeVariant === 'secondary' && 'bg-purple-500',
                        item.badgeVariant === 'default' && 'bg-yellow-400',
                        !item.badgeVariant && 'bg-blue-500'
                      )}
                    />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right" className="w-[200px]">
                <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                {buildMenuChildren(item.children)}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={item.path || '#'}>
              <a
                data-active={isActive(item.path) || undefined}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 rounded-xl relative',
                  'w-14 h-14 p-2',
                  'text-[10px] font-medium text-gray-700 bg-transparent border border-transparent',
                  'hover:text-gray-900 hover:bg-white hover:shadow-sm hover:border-gray-100',
                  'data-[active=true]:text-gray-900 data-[active=true]:bg-white data-[active=true]:shadow-sm data-[active=true]:border-gray-100',
                  'transition-all duration-200'
                )}
              >
                {item.icon && <item.icon className="h-5 w-5 stroke-[1.5] shrink-0" />}
                <span className="leading-none text-center whitespace-nowrap">
                  {item.title}
                </span>
                {item.badge && (
                  <span
                    className={cn(
                      'absolute top-1 right-1 h-2 w-2 rounded-full',
                      item.badgeVariant === 'destructive' && 'bg-pink-500',
                      item.badgeVariant === 'secondary' && 'bg-purple-500',
                      item.badgeVariant === 'default' && 'bg-yellow-400',
                      !item.badgeVariant && 'bg-blue-500'
                    )}
                  />
                )}
              </a>
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[90px] bg-gray-50/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col items-center py-5">
      {/* Logo */}
      <Link href="/dashboard">
        <a className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white mb-6 hover:bg-blue-700 transition-colors shadow-sm">
          <Home className="h-5 w-5" />
        </a>
      </Link>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto scrollbar-none px-2">
        {buildMenu()}
      </nav>

      {/* User Avatar */}
      <div className="mt-auto pt-4 border-t border-gray-200/50 w-full flex justify-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-sm ring-2 ring-white">
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </div>
      </div>
    </aside>
  );
}

