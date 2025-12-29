import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Home, Package, Map, CircleUserRound } from "lucide-react-native";
import { AppTabParamList } from "./types";
import OrderScreen from "../screens/main/order";
import MapScreen from "../screens/main/map";
import HomeStackNavigator from "./home-router";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileStackNavigator from "./profile-router";

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          const hideTab = ["SortingProcess", "CollectionHistory", "Point", "RedeemGifts", "SortDetail", "AutomaticWaste", "OrderDetail", "MyGifts"].includes(routeName);
          return {
            tabBarStyle: {
              display: hideTab ? "none" : "flex",
              height: 60,
              paddingBottom: 5,
            },
            tabBarLabel: ({ color, focused }) => (
              <Text
                style={{
                  color,
                  fontSize: focused ? 13 : 12,
                  fontWeight: focused ? "600" : "500",
                }}
              >
                Trang chủ
              </Text>
            ),
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          };
        }}
      />


      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          // tabBarItemStyle: { borderTopColor: "#16a34a", borderTopWidth: 2 },
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 13 : 12,
                fontWeight: focused ? "600" : "500",
              }}
            >
              Quản lý đơn
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Package color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 13 : 12,
                fontWeight: focused ? "600" : "500",
              }}
            >
              Bản đồ
            </Text>
          ),
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Profile";
          const hideTab = ["ProfileDetail", "MyGifts"].includes(routeName);
          return {
            tabBarStyle: {
              display: hideTab ? "none" : "flex",
              height: 60,
              paddingBottom: 5,
            },
            tabBarLabel: ({ color, focused }) => (
              <Text
                style={{
                  color,
                  fontSize: focused ? 13 : 12,
                  fontWeight: focused ? "600" : "500",
                }}
              >
                Tôi
              </Text>
            ),
            tabBarIcon: ({ color, size }) => <CircleUserRound color={color} size={size} />,
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
