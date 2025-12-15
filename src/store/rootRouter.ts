import { combineReducers } from '@reduxjs/toolkit';

// Thêm các slices khác vào đây
const rootReducer = combineReducers({
  // Ví dụ: settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;