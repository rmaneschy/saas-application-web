/**
 * Modelo de autenticação contendo os tokens JWT
 */
export interface AuthModel {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
}

/**
 * Modelo de usuário retornado pela API
 */
export interface UserModel {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: string[];
  enabled: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

/**
 * Requisição de login
 */
export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

/**
 * Requisição de registro
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Requisição de esqueci minha senha
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Requisição de redefinir senha
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Resposta de autenticação da API
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserModel;
}

