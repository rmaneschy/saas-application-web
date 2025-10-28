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
                    'flex flex-col items-center justify-center w-[60px] h-[60px] gap-1 rounded-lg shadow-none relative',
                    'text-xs font-medium text-muted-foreground bg-transparent border border-transparent',
                    'hover:text-primary hover:bg-background hover:border-border',
                    'data-[state=open]:text-primary data-[state=open]:bg-background data-[state=open]:border-border',
                    'data-[here=true]:text-primary data-[here=true]:bg-background data-[here=true]:border-border'
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="text-[10px] leading-tight text-center">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        'absolute top-1 right-1 px-1 py-0.5 text-[8px] font-semibold rounded',
                        item.badgeVariant === 'destructive' && 'bg-red-500 text-white',
                        item.badgeVariant === 'secondary' && 'bg-blue-500 text-white',
                        item.badgeVariant === 'default' && 'bg-green-500 text-white',
                        !item.badgeVariant && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {item.badge}
                    </span>
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
                  'flex flex-col items-center justify-center w-[60px] h-[60px] gap-1 rounded-lg relative',
                  'text-xs font-medium text-muted-foreground bg-transparent border border-transparent',
                  'hover:text-primary hover:bg-background hover:border-border',
                  'data-[active=true]:text-primary data-[active=true]:bg-background data-[active=true]:border-border'
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                <span className="text-[10px] leading-tight text-center">
                  {item.title}
                </span>
                {item.badge && (
                  <span
                    className={cn(
                      'absolute top-1 right-1 px-1 py-0.5 text-[8px] font-semibold rounded',
                      item.badgeVariant === 'destructive' && 'bg-red-500 text-white',
                      item.badgeVariant === 'secondary' && 'bg-blue-500 text-white',
                      item.badgeVariant === 'default' && 'bg-green-500 text-white',
                      !item.badgeVariant && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-20 bg-muted border-r border-border flex flex-col items-center py-6">
      {/* Logo */}
      <Link href="/dashboard">Dashboard</Link>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {buildMenu()}
      </nav>

      {/* User Avatar */}
      <div className="mt-auto">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </div>
      </div>
    </aside>
  );
}

