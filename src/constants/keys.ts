/**
 * Định nghĩa các hằng số (keys) được sử dụng trong toàn bộ ứng dụng.
 * Chủ yếu dùng cho React Query và Storage Keys.
 */
export const QUERY_KEYS = {
  // Query Keys cho React Query (Dùng để cache và invalidation data từ API RESTful)
  WASTE_REQUESTS: 'wasteRequests', // Dùng cho danh sách các yêu cầu thu gom
  USER_PROFILE: 'userProfile',       // Dùng cho thông tin cá nhân người dùng
  COLLECTOR_ROUTES: 'collectorRoutes', // Dùng cho các tuyến đường của nhân viên thu gom
  
  // Storage Keys cho AsyncStorage/MMKV (dùng để lưu token hoặc settings)
  AUTH_TOKEN: 'authToken',
  APP_SETTINGS: 'appSettings',
};
