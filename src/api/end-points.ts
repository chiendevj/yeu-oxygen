/**
 * API Endpoints Configuration
 * Tổ chức endpoints theo nhóm để dễ quản lý và tái sử dụng
 */

// ==================== AUTH ENDPOINTS ====================
export const AUTH_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/odata/ApplicationUser/Register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  ME: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  VERIFY_PHONE: '/auth/verify-phone',
} as const;

// ==================== USER ENDPOINTS ====================
export const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  UPLOAD_AVATAR: '/users/avatar',
  DELETE_ACCOUNT: '/users/delete',
} as const;

// ==================== ORDER ENDPOINTS ====================
export const ORDER_ENDPOINTS = {
  LIST: '/orders',
  DETAIL: (id: string | number) => `/orders/${id}`,
  CREATE: '/orders',
  UPDATE: (id: string | number) => `/orders/${id}`,
  DELETE: (id: string | number) => `/orders/${id}`,
  CANCEL: (id: string | number) => `/orders/${id}/cancel`,
  STATUS: (id: string | number) => `/orders/${id}/status`,
} as const;

// ==================== WASTE COLLECTION ENDPOINTS ====================
export const WASTE_ENDPOINTS = {
  COLLECTION_HISTORY: '/waste/collection-history',
  SORTING_PROCESS: '/waste/sorting-process',
  AUTOMATIC_WASTE: '/waste/automatic',
  SORT_DETAIL: (slug: string) => `/waste/sort-detail/${slug}`,
} as const;

// ==================== POINT & REWARD ENDPOINTS ====================
export const POINT_ENDPOINTS = {
  POINTS: '/points',
  HISTORY: '/points/history',
  REDEEM_GIFTS: '/points/redeem-gifts',
  GIFT_LIST: '/points/gifts',
} as const;

// ==================== MAP ENDPOINTS ====================
export const MAP_ENDPOINTS = {
  LOCATIONS: '/map/locations',
  NEARBY: '/map/nearby',
  SEARCH: '/map/search',
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Build endpoint with query parameters
 * @example buildEndpoint('/users', { page: 1, limit: 10 }) => '/users?page=1&limit=10'
 */
export const buildEndpoint = (
  endpoint: string,
  params?: Record<string, string | number | boolean | null | undefined>
): string => {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }

  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return `${endpoint}?${queryString}`;
};

/**
 * Build endpoint with path parameters
 * @example buildPathEndpoint('/users/:id', { id: 123 }) => '/users/123'
 */
export const buildPathEndpoint = (
  template: string,
  params: Record<string, string | number>
): string => {
  let endpoint = template;
  Object.entries(params).forEach(([key, value]) => {
    endpoint = endpoint.replace(`:${key}`, String(value));
  });
  return endpoint;
};

/**
 * Combine multiple endpoint segments
 * @example combineEndpoints('/api', '/v1', '/users') => '/api/v1/users'
 */
export const combineEndpoints = (...segments: string[]): string => {
  return segments
    .map((segment) => segment.replace(/^\/+|\/+$/g, ''))
    .filter((segment) => segment.length > 0)
    .join('/');
};

// ==================== TYPE EXPORTS ====================
export type AuthEndpoint = typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS];
export type UserEndpoint = typeof USER_ENDPOINTS[keyof typeof USER_ENDPOINTS];
export type OrderEndpoint = string; // Dynamic endpoints
export type WasteEndpoint = string; // Dynamic endpoints
export type PointEndpoint = typeof POINT_ENDPOINTS[keyof typeof POINT_ENDPOINTS];
export type MapEndpoint = typeof MAP_ENDPOINTS[keyof typeof MAP_ENDPOINTS];
