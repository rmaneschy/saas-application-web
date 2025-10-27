import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';
import { Link, useLocation } from 'wouter';

interface BreadcrumbItem {
  title: string;
  path?: string;
}

const routeMap: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [
    { title: 'Home', path: '/dashboard' },
    { title: 'Dashboard' },
  ],
  '/profile': [
    { title: 'Home', path: '/dashboard' },
    { title: 'Perfil' },
  ],
  '/settings': [
    { title: 'Home', path: '/dashboard' },
    { title: 'Configurações' },
  ],
  '/users': [
    { title: 'Home', path: '/dashboard' },
    { title: 'Usuários' },
  ],
  '/security': [
    { title: 'Home', path: '/dashboard' },
    { title: 'Segurança' },
  ],
};

export function Breadcrumbs() {
  const [location] = useLocation();
  const items = routeMap[location] || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/dashboard">
        <a className="hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
        </a>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={index}>
            <ChevronRight className="h-4 w-4" />
            {item.path && !isLast ? (
              <Link href={item.path}>
                <a className="hover:text-foreground transition-colors">
                  {item.title}
                </a>
              </Link>
            ) : (
              <span className={isLast ? 'text-foreground font-medium' : ''}>
                {item.title}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

