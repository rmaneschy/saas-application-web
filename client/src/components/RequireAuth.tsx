import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

/**
 * Componente que protege rotas que exigem autenticação
 * Opcionalmente, pode exigir roles específicas
 */
export function RequireAuth({ children, requiredRoles }: RequireAuthProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redireciona para login se não estiver autenticado
      setLocation('/auth/login');
    }
  }, [loading, isAuthenticated, setLocation]);

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza nada (será redirecionado)
  if (!isAuthenticated) {
    return null;
  }

  // Verifica roles se foram especificadas
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => user?.roles.includes(role));

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
            <p className="text-muted-foreground">
              Você não possui permissão para acessar esta página.
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

