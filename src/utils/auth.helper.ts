import { apiClient } from '../api/api';
import { store } from '../store';
import { checkAuthAsync, clearAuth } from '../store/slices/auth.slice';

/**
 * Kiểm tra và khôi phục trạng thái đăng nhập từ AsyncStorage
 */
export const initializeAuth = async (): Promise<boolean> => {
  try {
    const token = await apiClient.getToken();
    if (token) {
      // Kiểm tra token có hợp lệ không bằng cách lấy thông tin user
      const result = await store.dispatch(checkAuthAsync());
      return checkAuthAsync.fulfilled.match(result);
    }
    return false;
  } catch (error) {
    console.error('Error initializing auth:', error);
    await store.dispatch(clearAuth());
    return false;
  }
};

/**
 * Kiểm tra xem user đã đăng nhập chưa
 */
export const isAuthenticated = (): boolean => {
  const state = store.getState();
  return state.auth.isAuthenticated && !!state.auth.token;
};

/**
 * Lấy token hiện tại
 */
export const getCurrentToken = async (): Promise<string | null> => {
  return await apiClient.getToken();
};

/**
 * Đăng xuất và clear tất cả dữ liệu
 */
export const logout = async (): Promise<void> => {
  const { logoutAsync } = await import('../store/slices/auth.slice');
  await store.dispatch(logoutAsync());
};



