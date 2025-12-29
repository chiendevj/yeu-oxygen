import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions, // Import Dimensions để tính toán vị trí tương đối
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../../components/screen";
import GiftCard from "../../../components/commons/gift-card";

// Lấy chiều rộng màn hình để tính toán kích thước overlay
const { width: SCREEN_WIDTH } = Dimensions.get("window");

type TRedeemGiftsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "RedeemGifts"
>;

// Mock data giữ nguyên...
const mockUserData = { points: 125, rewards: 2 };
const categories = ["Voucher", "Đa dụng", "Thực phẩm"];
const mockHotGifts = [
  {
    id: "1",
    name: "Bình Nước Tái Chế",
    points: 125,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "2",
    name: "Bình Nước Tái Chế",
    points: 125,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "3",
    name: "Bình Nước Tái Chế",
    points: 125,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
];
const mockAllGifts = [
  {
    id: "1",
    name: "Bình Nước Tái Chế",
    points: 125,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "2",
    name: "Bình Nước Tái Chế",
    points: 125,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "3",
    name: "Bình Nước Tái Chế",
    points: 125,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "4",
    name: "Túi Vải Thân Thiện",
    points: 200,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "5",
    name: "Ống Hút Tre",
    points: 80,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
];

const RedeemGiftsScreen: React.FC<TRedeemGiftsScreenProps> = ({
  navigation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Voucher");

  return (
    <View className="flex-1 bg-gray-50">
      {/* Background Overlay Layer - Fixed */}
      <View style={styles.overlayContainer} pointerEvents="none">
        <View style={styles.mainCurvedBg} />
        <View style={styles.bgCircleMediumRight} />
        <View style={styles.bgCircleLargeBottom} />
        <View style={styles.bgCircleSmallCenter} />
      </View>

      <Screen background="transparent">
        {/* Points & Rewards Summary Card */}
          <View
            style={styles.summaryCard}
            className="bg-white rounded-2xl mx-4 mt-4 mb-6 p-6 flex-row items-center justify-around"
          >
          <TouchableOpacity
            onPress={() => navigation.navigate("Point")}
            activeOpacity={0.7}
            className="items-center flex-1 justify-center"
          >
            <Text className="font-semibold text-gray-900 mb-2">
              Điểm của bạn
            </Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-2xl font-bold text-green-600">
                {mockUserData.points}
              </Text>
              <Ionicons name="leaf" size={20} color="#16a34a" />
            </View>
          </TouchableOpacity>

          <View className="w-px h-12 bg-gray-200 mx-4" />
          <TouchableOpacity
            onPress={() => navigation.navigate("MyGifts")}
            activeOpacity={0.7}
            className="items-center flex-1 justify-center"
          >
            <Text className="font-semibold text-gray-900 mb-2">
              Quà của bạn
            </Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-2xl font-bold" style={{ color: "#eab308" }}>
                {mockUserData.rewards}
              </Text>
              <Ionicons name="gift" size={20} color="#eab308" />
            </View>
          </TouchableOpacity>
        </View>

          {/* Category Filters */}
          <View className="mb-6">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className={`px-6 py-3 rounded-full ${
                  selectedCategory === category
                    ? "bg-green-600 border-green-600"
                    : "bg-white border-gray-100"
                }`}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-sm font-semibold ${
                    selectedCategory === category
                      ? "text-white font-bold"
                      : "text-gray-500"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
            </ScrollView>
          </View>

          {/* Hot Rewards Section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 px-4 mb-4">
              Quà đang hot
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 16 }}
            >
            {mockHotGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                id={gift.id}
                name={gift.name}
                points={gift.points}
                image={gift.image}
                variant="vertical"
                onPress={() => console.log("Gift detail:", gift.id)}
              />
            ))}
            </ScrollView>
          </View>

          {/* All Rewards List */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 px-4 mb-4">
              Tất cả quà
            </Text>
            <View className="px-4">
              {mockAllGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  id={gift.id}
                  name={gift.name}
                  points={gift.points}
                  image={gift.image}
                  variant="horizontal"
                  onPress={() => console.log("Gift detail:", gift.id)}
                />
              ))}
            </View>
          </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  // Overlay Container - Fixed Background Layer
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  // Main curved background - top left (màu xanh lá đậm hơn, nổi bật)
  mainCurvedBg: {
    position: "absolute",
    top: -SCREEN_WIDTH * 0.5,
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH * 0.75,
    backgroundColor: "#4ade80", // green-400 - đậm hơn
    opacity: 0.3, // Tăng opacity để nổi bật hơn
    transform: [{ scaleX: 1.2 }],
  },
  // Circle overlay - medium right (màu vàng nhạt tạo điểm nhấn)
  bgCircleMediumRight: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.2,
    right: -SCREEN_WIDTH * 0.4,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    backgroundColor: "#4ade80", // yellow-200 - màu vàng nhạt
    opacity: 0.4, // Tăng opacity
  },
  // Circle overlay - large bottom left (màu xanh lá sáng)
  bgCircleLargeBottom: {
    position: "absolute",
    bottom: -SCREEN_WIDTH * 0.5,
    right: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 1.3,
    height: SCREEN_WIDTH * 1.3,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: "#86efac", // green-300 - sáng hơn
    opacity: 0.4, // Tăng opacity
  },
  // Circle overlay - small center (màu vàng nhạt tạo điểm nhấn)
  bgCircleSmallCenter: {
    position: "absolute",
    top: "20%",
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: "#86efac",
    opacity: 0.2, // Tăng opacity
  },
  summaryCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    margin: 30,
  },
});

export default RedeemGiftsScreen;
