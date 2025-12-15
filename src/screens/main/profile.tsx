import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const userName = "Nguyễn Văn A";
  const userEmail = "a.nguyen@company.com";
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-6 bg-white shadow-sm border-b border-gray-100">
        <Text className="text-3xl font-bold text-gray-800 mb-1">Profile</Text>
      </View>

      <ScrollView className="p-4">
        {/* Card Thông tin Cơ bản */}
        <View className="bg-white p-4 rounded-xl mb-6 items-center shadow-md">
            <View className="w-20 h-20 bg-primary/20 rounded-full items-center justify-center mb-3">
                <Text className="text-3xl font-bold text-primary">A</Text>
            </View>
            <Text className="text-xl font-bold text-gray-800">{userName}</Text>
            <Text className="text-gray-500">{userEmail}</Text>
        </View>

        {/* Menu Tùy chọn */}
        <Text className="text-lg font-bold text-gray-700 mb-2">Settings</Text>
        <View className="bg-white rounded-xl shadow-md divide-y divide-gray-100">
            <TouchableOpacity className="p-4">
                <Text className="text-gray-700">Account Information</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4">
                <Text className="text-gray-700">Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4">
                <Text className="text-gray-700">Help & Support</Text>
            </TouchableOpacity>
        </View>

        {/* Nút Logout */}
        <TouchableOpacity 
          className="bg-danger p-3 rounded-xl items-center mt-8 shadow-lg"
          >
          <Text className="text-white font-semibold text-lg">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;