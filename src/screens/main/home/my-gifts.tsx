import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../../components/screen";
import GiftCard from "../../../components/commons/gift-card";

// Lấy chiều rộng màn hình để tính toán kích thước overlay
const { width: SCREEN_WIDTH } = Dimensions.get("window");

type TMyGiftsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "MyGifts"
>;

// Mock data - quà đã đổi của user
const categories = ["Voucher", "Đa dụng", "Thực phẩm"];
const mockMyGifts = [
  {
    id: "1",
    name: "Bình Nước Tái Chế",
    points: 125,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
    status: "active", // active, used, expired
    redeemedDate: "24/11/2025",
  },
  {
    id: "2",
    name: "Túi Vải Thân Thiện",
    points: 200,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
    status: "used",
    redeemedDate: "22/11/2025",
  },
  {
    id: "3",
    name: "Ống Hút Tre",
    points: 80,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
    status: "active",
    redeemedDate: "20/11/2025",
  },
];

const MyGiftsScreen: React.FC<TMyGiftsScreenProps> = ({ navigation }) => {
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
        {/* Category Filters */}
        <View className="mb-6 mt-4">
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

        {/* My Gifts List */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 px-4 mb-4">
            Quà của tôi
          </Text>
          <View className="px-4">
            {mockMyGifts.map((gift) => (
              <View key={gift.id} style={styles.giftItemContainer}>
                <GiftCard
                  id={gift.id}
                  name={gift.name}
                  points={gift.points}
                  image={gift.image}
                  variant="horizontal"
                  onPress={() => console.log("Gift detail:", gift.id)}
                />
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-xs text-gray-500">
                    Đã đổi: {gift.redeemedDate}
                  </Text>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      gift.status === "active"
                        ? "bg-green-100"
                        : gift.status === "used"
                        ? "bg-gray-100"
                        : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        gift.status === "active"
                          ? "text-green-600"
                          : gift.status === "used"
                          ? "text-gray-600"
                          : "text-red-600"
                      }`}
                    >
                      {gift.status === "active"
                        ? "Có thể dùng"
                        : gift.status === "used"
                        ? "Đã dùng"
                        : "Hết hạn"}
                    </Text>
                  </View>
                </View>
              </View>
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
  // Main curved background - top left
  mainCurvedBg: {
    position: "absolute",
    top: -SCREEN_WIDTH * 0.5,
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH * 0.75,
    backgroundColor: "#4ade80",
    opacity: 0.3,
    transform: [{ scaleX: 1.2 }],
  },
  // Circle overlay - medium right
  bgCircleMediumRight: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.2,
    right: -SCREEN_WIDTH * 0.4,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    backgroundColor: "#4ade80",
    opacity: 0.4,
  },
  // Circle overlay - large bottom left
  bgCircleLargeBottom: {
    position: "absolute",
    bottom: -SCREEN_WIDTH * 0.5,
    right: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 1.3,
    height: SCREEN_WIDTH * 1.3,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: "#86efac",
    opacity: 0.4,
  },
  // Circle overlay - small center
  bgCircleSmallCenter: {
    position: "absolute",
    top: "20%",
    left: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: "#86efac",
    opacity: 0.2,
  },
  giftItemContainer: {
    marginBottom: 16,
  },
});

export default MyGiftsScreen;



