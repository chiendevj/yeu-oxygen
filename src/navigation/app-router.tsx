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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom > 0 ? insets.bottom : 10;
  const tabBarHeight = 60 + paddingBottom;

  const getTabBarStyle = (isVisible: boolean) => ({
    display: isVisible ? "flex" : "none",
    height: tabBarHeight,
    paddingBottom:  paddingBottom,
    paddingTop: 10, 
    borderTopWidth: 1,
    backgroundColor: 'white',
    borderTopColor: '#f3f4f6',
    elevation: 0,
  } as const);

  const getLabelStyle = (focused: boolean, color: string) => ({
    color,
    fontSize: focused ? 13 : 12,
    fontWeight: focused ? ("600" as const) : ("500" as const),
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: getTabBarStyle(false),

      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          const hideTab = [
            "SortingProcess",
            "CollectionHistory",
            "Point",
            "RedeemGifts",
            "SortDetail",
            "AutomaticWaste",
            "OrderDetail",
            "MyGifts",
          ].includes(routeName);

          return {
            tabBarStyle: getTabBarStyle(!hideTab),
            tabBarLabel: ({ color, focused }) => (
              <Text style={getLabelStyle(focused, color)}>Trang chủ</Text>
            ),
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          };
        }}
      />

      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarStyle: getTabBarStyle(true),
          tabBarLabel: ({ color, focused }) => (
            <Text style={getLabelStyle(focused, color)}>Quản lý đơn</Text>
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
          tabBarStyle: getTabBarStyle(true),
          tabBarLabel: ({ color, focused }) => (
            <Text style={getLabelStyle(focused, color)}>Bản đồ</Text>
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
            tabBarStyle: getTabBarStyle(!hideTab),
            tabBarLabel: ({ color, focused }) => (
              <Text style={getLabelStyle(focused, color)}>Tôi</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <CircleUserRound color={color} size={size} />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;