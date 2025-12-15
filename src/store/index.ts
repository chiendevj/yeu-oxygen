import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootRouter';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  // Middleware được cấu hình để bỏ qua kiểm tra tuần tự hóa cho các action liên quan đến Firebase/React Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom Hooks cho type-safety
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;