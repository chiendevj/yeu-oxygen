import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AppNavigator from './app-router';
import { View, ActivityIndicator } from 'react-native';
import AuthNavigator from './auth-router';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  // Lấy trạng thái từ Redux Store
  // Giả sử có một state loading để kiểm tra token lúc khởi động
  const isLoading = false; // Thay thế bằng state kiểm tra token/Firebase Init

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Main" component={AppNavigator} />
        </>
    </Stack.Navigator>
  );
};

export default RootNavigator;