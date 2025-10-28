import axios, { AxiosInstance } from 'axios';
import type {
  AuthModel,
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UserModel,
} from '@/../../shared/types/auth';

/**
 * Cliente HTTP configurado para comunicação com a API
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-ID': 'default'
      },
    });

    // Interceptor para adicionar token JWT em todas as requisições
    this.client.interceptors.request.use(
      (config) => {
        const auth = this.getStoredAuth();
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para tratamento de erros
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Se receber 401 e não for a rota de login/refresh, tenta renovar o token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const auth = this.getStoredAuth();
            if (auth?.refreshToken) {
              const newTokens = await this.refreshAccessToken(auth.refreshToken);
              this.saveAuth(newTokens);
              
              // Refaz a requisição original com o novo token
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Se falhar ao renovar, limpa o storage e redireciona para login
            this.clearAuth();
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Salva os tokens de autenticação no localStorage
   */
  private saveAuth(auth: AuthModel): void {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  /**
   * Recupera os tokens de autenticação do localStorage
   */
  private getStoredAuth(): AuthModel | null {
    const authStr = localStorage.getItem('auth');
    if (!authStr) return null;
    try {
      return JSON.parse(authStr) as AuthModel;
    } catch {
      return null;
    }
  }

  /**
   * Remove os tokens de autenticação do localStorage
   */
  private clearAuth(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  }

  /**
   * Autentica um usuário e retorna tokens JWT
   */
  async login(request: LoginRequest): Promise<{ auth: AuthModel; user: UserModel }> {
    const { data } = await this.client.post<AuthResponse>('/api/v1/auth/login', request);

    const auth: AuthModel = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      expiresIn: data.expiresIn,
    };

    this.saveAuth(auth);
    localStorage.setItem('user', JSON.stringify(data.user));

    return { auth, user: data.user };
  }

  /**
   * Registra um novo usuário
   */
  async register(request: RegisterRequest): Promise<UserModel> {
    const { data } = await this.client.post<UserModel>('/api/v1/auth/register', request);
    return data;
  }

  /**
   * Solicita recuperação de senha
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<{ message: string; token?: string }> {
    const { data } = await this.client.post<{ message: string; token?: string }>(
      '/api/v1/auth/forgot-password',
      request
    );
    return data;
  }

  /**
   * Redefine a senha usando um token válido
   */
  async resetPassword(request: ResetPasswordRequest): Promise<{ message: string }> {
    const { data } = await this.client.post<{ message: string }>('/api/v1/auth/reset-password', request);
    return data;
  }

  /**
   * Renova o access token usando o refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<AuthModel> {
    const { data } = await this.client.post<AuthResponse>('/api/v1/auth/refresh', {
      refreshToken,
    });

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      expiresIn: data.expiresIn,
    };
  }

  /**
   * Busca os dados do usuário autenticado
   */
  async getCurrentUser(): Promise<UserModel> {
    const { data } = await this.client.get<UserModel>('/api/v1/users/me');
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

  /**
   * Realiza logout do usuário
   */
  async logout(): Promise<void> {
    const auth = this.getStoredAuth();
    if (auth?.refreshToken) {
      try {
        await this.client.post('/api/v1/auth/logout', {
          refreshToken: auth.refreshToken,
        });
      } catch (error) {
        console.error('Erro ao fazer logout na API:', error);
      }
    }
    this.clearAuth();
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const auth = this.getStoredAuth();
    return !!auth?.accessToken;
  }

  /**
   * Retorna o usuário armazenado localmente
   */
  getStoredUser(): UserModel | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as UserModel;
    } catch {
      return null;
    }
  }
}

// Exporta uma instância única do cliente
export const apiClient = new ApiClient();

