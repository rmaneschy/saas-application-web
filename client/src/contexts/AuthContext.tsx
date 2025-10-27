import { apiClient } from '@/lib/api-adapter';
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UserModel,
} from '@/../../shared/types/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface AuthContextType {
  user: UserModel | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  forgotPassword: (request: ForgotPasswordRequest) => Promise<{ message: string; token?: string }>;
  resetPassword: (request: ResetPasswordRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  // Inicializa o estado de autenticação ao carregar a aplicação
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verifica se há um token armazenado
        if (apiClient.isAuthenticated()) {
          // Tenta buscar os dados do usuário
          const storedUser = apiClient.getStoredUser();
          if (storedUser) {
            setUser(storedUser);
          } else {
            // Se não houver usuário no storage, busca da API
            const userData = await apiClient.getCurrentUser();
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        // Se falhar, limpa o storage
        await apiClient.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (request: LoginRequest) => {
    setLoading(true);
    try {
      const { user: userData } = await apiClient.login(request);
      setUser(userData);
      setLocation('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (request: RegisterRequest) => {
    setLoading(true);
    try {
      await apiClient.register(request);
      // Após registrar, faz login automaticamente
      await login({
        usernameOrEmail: request.email,
        password: request.password,
      });
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (request: ForgotPasswordRequest) => {
    try {
      return await apiClient.forgotPassword(request);
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      throw error;
    }
  };

  const resetPassword = async (request: ResetPasswordRequest) => {
    try {
      await apiClient.resetPassword(request);
      setLocation('/auth/login');
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiClient.logout();
      setUser(null);
      setLocation('/auth/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await apiClient.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

