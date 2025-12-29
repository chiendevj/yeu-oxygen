import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { API_BASE_URL } from './url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const REFRESH_TOKEN_KEY = '@refresh_token';

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
  statusCode?: number;
}

/**
 * API Error response
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - Thêm token vào header
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(this.normalizeError(error));
      }
    );

    // Response interceptor - Xử lý lỗi và refresh token
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Có thể normalize response ở đây nếu cần
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Nếu lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
            if (refreshToken) {
              const response = await axios.post(
                `${API_BASE_URL}/auth/refresh`,
                { refreshToken }
              );

              const responseData = response.data?.data || response.data;
              const token = responseData.token || responseData.accessToken || responseData.access_token;
              
              if (token) {
                await AsyncStorage.setItem(TOKEN_KEY, token);

                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }

                return this.instance(originalRequest);
              }
            }
          } catch (refreshError) {
            // Refresh token failed, logout user
            await this.clearTokens();
            return Promise.reject(this.normalizeError(refreshError as AxiosError));
          }
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  /**
   * Normalize error response
   */
  private normalizeError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as any;
      return {
        message:
          responseData?.message ||
          responseData?.error ||
          error.message ||
          'Đã xảy ra lỗi',
        statusCode: error.response.status,
        errors: responseData?.errors,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.',
        statusCode: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'Đã xảy ra lỗi không xác định',
      };
    }
  }

  /**
   * Normalize success response
   */
  private normalizeResponse<T>(response: AxiosResponse<ApiResponse<T> | T>): T {
    // Handle different response structures
    const responseData = response.data as any;
    
    // If response has nested data structure
    if (responseData?.data !== undefined) {
      return responseData.data;
    }
    
    // Return direct response
    return responseData as T;
  }

  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.get<ApiResponse<T> | T>(url, config);
      return this.normalizeResponse<T>(response);
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.post<ApiResponse<T> | T>(
        url,
        data,
        config
      );
      return this.normalizeResponse<T>(response);
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.put<ApiResponse<T> | T>(
        url,
        data,
        config
      );
      return this.normalizeResponse<T>(response);
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.patch<ApiResponse<T> | T>(
        url,
        data,
        config
      );
      return this.normalizeResponse<T>(response);
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.delete<ApiResponse<T> | T>(
        url,
        config
      );
      return this.normalizeResponse<T>(response);
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  /**
   * Upload file
   */
  async upload<T = any>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progress: number) => void
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(progress);
          }
        },
      };

      const response = await this.instance.post<ApiResponse<T> | T>(
        url,
        formData,
        config
      );
      return this.normalizeResponse<T>(response);
    } catch (error) {
      throw this.normalizeError(error as AxiosError);
    }
  }

  /**
   * Clear tokens from storage
   */
  async clearTokens(): Promise<void> {
    await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
  }

  /**
   * Set tokens to storage
   */
  async setTokens(token: string, refreshToken?: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  /**
   * Get current token
   */
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Get axios instance (for advanced usage)
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export default instance methods
export default apiClient;
