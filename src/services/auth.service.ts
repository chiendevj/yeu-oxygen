import api, { ApiError } from '../api/api';
import { AUTH_ENDPOINTS } from '../api/end-points';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
}

class AuthService {
  /**
   * Đăng nhập
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, {
      email: data.email,
      password: data.password,
    });
    
    // Handle different response structures
    return {
      token: response.token || (response as any).accessToken || (response as any).access_token,
      refreshToken: response.refreshToken || (response as any).refresh_token,
      user: response.user || response as any,
    };
  }

  /**
   * Đăng ký
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, {
      email: data.email,
      password: data.password,
      name: data.name,
    });
    
    // Handle different response structures
    return {
      token: response.token || (response as any).accessToken || (response as any).access_token,
      refreshToken: response.refreshToken || (response as any).refresh_token,
      user: response.user || response as any,
    };
  }

  /**
   * Lấy thông tin user hiện tại
   */
  async getCurrentUser(): Promise<User> {
    return await api.get<User>(AUTH_ENDPOINTS.ME);
  }

  /**
   * Đăng xuất
   */
  async logout(): Promise<void> {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      // Ignore logout errors - vẫn tiếp tục clear tokens
      console.error('Logout error:', error);
    }
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    return await api.post<{ token: string }>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      refreshToken,
    });
  }
}

export const authService = new AuthService();
export default authService;

