import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import HomeScreen from "../screens/main/home";
import SortingProcessScreen from "../screens/main/home/sorting-process";
import CollectionHistoryScreen from "../screens/main/home/collection-history";
import OrderDetailScreen from "../screens/main/home/order-detail";
import PointScreen from "../screens/main/home/point";
import RedeemGiftsScreen from "../screens/main/home/redeem-gifts";
import MyGiftsScreen from "../screens/main/home/my-gifts";
import AutomaticWasteScreen from "../screens/main/home/automatic-waste";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SortDetailScreen from "../screens/main/home/sort-detail";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />

      <Stack.Screen
        name="SortingProcess"
        component={SortingProcessScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Hướng dẫn phân loại rác",
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

      <Stack.Screen
        name="CollectionHistory"
        component={CollectionHistoryScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Lịch sử thu gom",
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
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Chi tiết đơn",
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
      <Stack.Screen 
        name="Point" 
        component={PointScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Tích điểm",
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
      <Stack.Screen 
        name="RedeemGifts" 
        component={RedeemGiftsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Đổi quà",
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
      <Stack.Screen name="AutomaticWaste" component={AutomaticWasteScreen} />
      <Stack.Screen 
        name="SortDetail" 
        component={SortDetailScreen} 
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: route.params.title || "Chi tiết phân loại", 
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
      
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
