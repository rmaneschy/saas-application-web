import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/useAuthorization';
import {
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';
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

export function Header() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { hasAnyRole } = useAuthorization();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const canAccessMenuItem = (item: MenuItem) => {
    if (!item.requiredRoles || item.requiredRoles.length === 0) {
      return true;
    }
    return hasAnyRole(...item.requiredRoles);
  };

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-16 bg-background border-b border-border lg:hidden">
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard">
          <a className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Home className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">SaaS App</span>
          </a>
        </Link>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-6">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.fullName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  if (!canAccessMenuItem(item)) return null;

                  return (
                    <Link key={item.path} href={item.path}>
                      <a
                        onClick={handleNavigate}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg
                          transition-colors
                          ${
                            isActive(item.path)
                              ? 'bg-primary text-primary-foreground'
                              : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                          }
                        `}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.title}</span>
                      </a>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  handleNavigate();
                  logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

