WasteCollectionApp - Technical Architecture Blueprint
=====================================================

1\. Tech Stack Overview
-----------------------

-   **Core:** React Native (0.76+), TypeScript.

-   **Styling:** NativeWind (v4) - Tailwind CSS for React Native.

-   **State Management (Client):** Redux Toolkit (Auth state, App settings, UI state).

-   **State Management (Server):** TanStack Query (React Query) v5.

-   **Navigation:** React Navigation v7 (Native Stack).

-   **Network:** Axios + Interceptors.

-   **Architecture:** Feature-based + Clean Architecture principles.

2\. Directory Structure (Cấu trúc thư mục)
------------------------------------------

Đây là cấu trúc thư mục được tối ưu cho khả năng mở rộng (Scalability) và bảo trì (Maintainability).

```
src/
├── api/                    # Cấu hình Axios và xử lý HTTP requests cơ bản
│   ├── client.ts           # Axios instance (interceptors, headers)
│   └── endpoints.ts        # Định nghĩa các API URL
├── assets/                 # Images, Fonts, Icons
├── components/             # Reusable UI components (Atomic Design nhẹ)
│   ├── common/             # Button, Input, Card, Modal (Global use)
│   └── layout/             # Container, SafeAreaWrapper, Header
├── config/                 # Environment variables, App configuration
│   └── theme.ts            # Theme constants
├── constants/              # Fixed data, strings, enum
│   └── keys.ts             # Storage keys, Query keys
├── hooks/                  # Custom Hooks
│   ├── useAuth.ts          # Hook xử lý logic Auth
│   └── useLocation.ts      # Hook xử lý vị trí
├── navigation/             # Navigation configurations
│   ├── RootNavigator.tsx
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── types.ts            # Type definitions cho routes
├── screens/                # Các màn hình chính (Feature-based)
│   ├── auth/               # Login, Register
│   ├── home/               # Dashboard, Overview
│   ├── map/                # Map view, Tracking
│   └── request/            # Create collection request
├── services/               # Gọi API cụ thể (tách biệt logic business)
│   ├── auth.service.ts
│   └── waste.service.ts
├── store/                  # Redux Setup (Client State only)
│   ├── slices/
│   │   └── authSlice.ts
│   ├── rootReducer.ts
│   └── index.ts
├── types/                  # TypeScript Global Definitions
│   ├── api.d.ts
│   └── models.d.ts
└── utils/                  # Helper functions
    ├── format.ts
    └── validation.ts
App.tsx                     # Entry point
babel.config.js
tailwind.config.js
tsconfig.json

```

3\. Implementation Details (Source Code Mẫu)
--------------------------------------------

Dưới đây là code mẫu cho các phần quan trọng nhất để thiết lập nền móng dự án.

### A. Configuration (Tailwind & Types)

**1\. `types/models.d.ts`** *Định nghĩa các interface dữ liệu cốt lõi.*

```
export interface User {
  id: string;
  name: string;
  role: 'customer' | 'collector';
  avatar?: string;
}

export interface WasteRequest {
  id: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  wasteType: 'organic' | 'recycle' | 'hazardous';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  pickupTime: string; // ISO String
  imageUrl?: string;
}

```

### B. Network Layer (Axios)

**2\. `src/api/client.ts`** *Thiết lập Axios với Interceptors để xử lý Token tự động.*

```
import axios from 'axios';
import { getToken } from '@/utils/storage'; // Giả sử có hàm lấy token từ MMKV/AsyncStorage

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || '[https://api.wasteapp.com/v1](https://api.wasteapp.com/v1)',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động gắn Bearer Token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý lỗi chung (401, 500)
apiClient.interceptors.response.use(
  (response) => response.data, // Trả về data trực tiếp
  (error) => {
    // Handle Global Errors (ví dụ: logout nếu 401)
    if (error.response?.status === 401) {
      // Dispatch logout action here
    }
    return Promise.reject(error);
  }
);

export default apiClient;

```

### C. Service & React Query (Server State)

**3\. `src/services/waste.service.ts`** *Service chỉ chịu trách nhiệm gọi API, không chứa logic UI.*

```
import apiClient from '@/api/client';
import { WasteRequest } from '@/types/models';

export const WasteService = {
  getRequests: async (): Promise<WasteRequest[]> => {
    return apiClient.get('/requests');
  },

  createRequest: async (data: Omit<WasteRequest, 'id' | 'status'>): Promise<WasteRequest> => {
    return apiClient.post('/requests', data);
  },

  getRequestById: async (id: string): Promise<WasteRequest> => {
    return apiClient.get(`/requests/${id}`);
  }
};

```

**4\. `src/hooks/useWasteQuery.ts`** *Custom Hook sử dụng React Query để quản lý data fetching, caching.*

```
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WasteService } from '@/services/waste.service';
import { QUERY_KEYS } from '@/constants/keys'; // e.g., 'WASTE_REQUESTS'

export const useWasteRequests = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.WASTE_REQUESTS],
    queryFn: WasteService.getRequests,
    staleTime: 1000 * 60 * 5, // Data được coi là mới trong 5 phút
  });
};

export const useCreateWasteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: WasteService.createRequest,
    onSuccess: () => {
      // Invalidate cache để API tự gọi lại list mới
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WASTE_REQUESTS] });
    },
  });
};

```

### D. Redux Toolkit (Client State)

**5\. `src/store/slices/authSlice.ts`** *Quản lý trạng thái đăng nhập người dùng.*

```
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/models';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // App loading checking token
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

```

**6\. `src/store/index.ts`**

```
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other slices here (e.g., theme, ui)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

```

### E. Components & Styling (NativeWind)

**7\. `src/components/common/Button.tsx`** *Reusable Component với NativeWind.*

```
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { clsx } from 'clsx'; // Optional: for better class merging

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  className?: string; // Cho phép override style
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  className,
}) => {
  // Dynamic Styles based on variant
  const baseStyle = "py-3 px-6 rounded-xl flex-row justify-center items-center shadow-sm";
  const variantStyles = {
    primary: "bg-green-600",
    secondary: "bg-gray-200",
    danger: "bg-red-500",
  };
  const textStyles = {
    primary: "text-white font-bold text-lg",
    secondary: "text-gray-800 font-bold text-lg",
    danger: "text-white font-bold text-lg",
  };

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyles[variant]} ${isLoading ? 'opacity-70' : ''} ${className}`}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      {isLoading && <ActivityIndicator color={variant === 'secondary' ? 'black' : 'white'} className="mr-2" />}
      <Text className={textStyles[variant]}>{title}</Text>
    </TouchableOpacity>
  );
};

```

### F. Screens

**8\. `src/screens/home/HomeScreen.tsx`** *Màn hình chính kết hợp Redux, React Query và NativeWind.*

```
import React from 'react';
import { View, Text, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { useAppSelector } from '@/store';
import { useWasteRequests } from '@/hooks/useWasteQuery';
import { Button } from '@/components/common/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // 1. Client State (Redux) - Lấy thông tin user
  const { user } = useAppSelector((state) => state.auth);

  // 2. Server State (React Query) - Lấy danh sách yêu cầu
  const { data: requests, isLoading, refetch, isRefetching } = useWasteRequests();

  const handleCreateRequest = () => {
    navigation.navigate('CreateRequest');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-5 py-4 bg-white shadow-sm flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500 text-sm">Welcome back,</Text>
          <Text className="text-2xl font-bold text-gray-800">{user?.name || 'Guest'}</Text>
        </View>
        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
          <Text className="text-green-700 font-bold">{user?.name?.charAt(0)}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-5 pt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">Recent Collections</Text>
          <Text className="text-green-600 font-medium">See All</Text>
        </View>

        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-400">Loading schedules...</Text>
          </View>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            renderItem={({ item }) => (
              <View className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100">
                <View className="flex-row justify-between">
                  <Text className="font-bold text-gray-800 text-lg uppercase">{item.wasteType}</Text>
                  <View className={`px-2 py-1 rounded-lg ${item.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <Text className={`text-xs font-bold ${item.status === 'completed' ? 'text-green-700' : 'text-yellow-700'}`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-500 mt-2">{item.location.address}</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  Pickup: {new Date(item.pickupTime).toLocaleDateString()}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <View className="py-10 items-center">
                <Text className="text-gray-400">No collection requests found.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Floating Action / Bottom Button */}
      <View className="p-5 bg-white border-t border-gray-100">
        <Button
          title="+ New Request"
          onPress={handleCreateRequest}
          className="shadow-lg shadow-green-200"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

```

### G. App Entry Point

**9\. `App.tsx`** *Nơi kết nối các Providers (Redux, Query, Navigation).*

```
import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@/store';
import RootNavigator from '@/navigation/RootNavigator';
import './global.css'; // Import file CSS của NativeWind

// Khởi tạo Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

```

4\. Best Practices Summary for this Architecture
------------------------------------------------

1.  **Separation of State:**

    -   Sử dụng **Redux** *chỉ* cho các state đồng bộ, global và ít thay đổi (User session, Theme mode, Modal visibility).

    -   Sử dụng **React Query** cho mọi data đến từ API (Async Server State). Đừng lưu API data vào Redux trừ khi thật sự cần thiết.

2.  **NativeWind Styling:**

    -   Viết style trực tiếp (Utility-first) giúp phát triển nhanh.

    -   Với các logic phức tạp (conditional styles), hãy dùng thư viện `clsx` hoặc `class-variance-authority` (CVA) để code sạch hơn.

3.  **Strict Typing:**

    -   Luôn define interface cho API response và Props của Component. Không dùng `any`.

4.  **Folder Aliases:**

    -   Cấu hình `babel-plugin-module-resolver` để dùng import ngắn gọn: `import { Button } from '@/components'` thay vì `../../components`.