import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./types";
import ProfileScreen from "../screens/main/profile";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileDetailScreen from "../screens/main/profile/detail";
import MyGiftsScreen from "../screens/main/home/my-gifts";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen 
        name="ProfileDetail" 
        component={ProfileDetailScreen} 
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: "Thông tin cá nhân", 
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
            color: "#111",
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <Pressable
              style={{ paddingHorizontal: 12 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={26} color="#111" />
            </Pressable>
          ),
          // Nút Home
          headerRight: () => (
            <Pressable
              style={{ paddingHorizontal: 12 }}
              onPress={() => navigation.popToTop()}
            >
              <Ionicons name="home-outline" size={24} color="#111" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen 
        name="MyGifts" 
        component={MyGiftsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Quà của tôi",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
            color: "#111",
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <Pressable
              style={{ paddingHorizontal: 12 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={26} color="#111" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              style={{ paddingHorizontal: 12 }}
              onPress={() => navigation.popToTop()}
            >
              <Ionicons name="home-outline" size={24} color="#111" />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
