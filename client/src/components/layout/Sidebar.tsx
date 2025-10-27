import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/useAuthorization';
import {
  Home,
  LayoutDashboard,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  requiredRoles?: string[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Perfil',
    path: '/profile',
    icon: <User className="h-5 w-5" />,
  },
  {
    title: 'Configurações',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: 'Usuários',
    path: '/users',
    icon: <Users className="h-5 w-5" />,
    requiredRoles: ['ROLE_ADMIN'],
  },
  {
    title: 'Segurança',
    path: '/security',
    icon: <Shield className="h-5 w-5" />,
    requiredRoles: ['ROLE_ADMIN', 'ROLE_MODERATOR'],
  },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { hasAnyRole } = useAuthorization();

  const isActive = (path: string) => location === path;

  const canAccessMenuItem = (item: MenuItem) => {
    if (!item.requiredRoles || item.requiredRoles.length === 0) {
      return true;
    }
    return hasAnyRole(...item.requiredRoles);
  };

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-20 bg-muted border-r border-border flex flex-col items-center py-6">
      {/* Logo */}
      <Link href="/dashboard">
        <a className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground mb-8 hover:opacity-90 transition-opacity">
          <Home className="h-6 w-6" />
        </a>
      </Link>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          if (!canAccessMenuItem(item)) return null;

          return (
            <Link key={item.path} href={item.path}>
              <a
                className={`
                  flex items-center justify-center w-12 h-12 rounded-lg
                  transition-colors relative group
                  ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
                title={item.title}
              >
                {item.icon}
                
                {/* Tooltip */}
                <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border shadow-md">
                  {item.title}
                </span>
              </a>
            </Link>
          );
        })}
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

