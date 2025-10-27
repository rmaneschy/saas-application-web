import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook para verificar permissões e roles do usuário
 */
export function useAuthorization() {
  const { user } = useAuth();

  /**
   * Verifica se o usuário possui uma role específica
   */
  const hasRole = (role: string): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  /**
   * Verifica se o usuário possui qualquer uma das roles fornecidas
   */
  const hasAnyRole = (...roles: string[]): boolean => {
    if (!user || !user.roles) return false;
    return roles.some((role) => user.roles.includes(role));
  };

  /**
   * Verifica se o usuário possui todas as roles fornecidas
   */
  const hasAllRoles = (...roles: string[]): boolean => {
    if (!user || !user.roles) return false;
    return roles.every((role) => user.roles.includes(role));
  };

  /**
   * Verifica se o usuário é administrador
   */
  const isAdmin = (): boolean => {
    return hasRole('ROLE_ADMIN');
  };

  /**
   * Verifica se o usuário é moderador
   */
  const isModerator = (): boolean => {
    return hasRole('ROLE_MODERATOR');
  };

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isModerator,
  };
}

