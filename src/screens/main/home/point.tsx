import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../../components/screen";
import BaseActionButton from "../../../components/commons/base-button-custom";
import GiftCard from "../../../components/commons/gift-card";

type TPointScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "Point"
>;

// Mock data
const mockPoints = {
  current: 125,
  pending: 15,
  pendingOrder: "ABCDE",
};

const mockHotGifts = [
  {
    id: "1",
    name: "Bình Nước Tái Chế",
    points: 125,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "2",
    name: "Bình Nước Tái Chế",
    points: 125,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "3",
    name: "Bình Nước Tái Chế",
    points: 125,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "4",
    name: "Túi Vải Thân Thiện",
    points: 200,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
  {
    id: "5",
    name: "Ống Hút Tre",
    points: 80,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv_S32OViPQ3F9HUtKTz9yCTb76mvff8JiwxrQrFBxR_QWgQKUcsbGk7o3GX4nfJxoi2qN7H7o6YmmP2xnhvahF5p6cmSTVyQ0SHSUnLt2-puA0inxT0nYYMgpQJ3X3ySb3h34wROXO9U&usqp=CAc",
  },
];

const mockTransactions = [
  {
    id: "1",
    type: "redeem",
    title: "Đổi quà",
    date: "24/11/2025",
    time: "9:30",
    points: -125,
  },
  {
    id: "2",
    type: "collect",
    title: "Thu gom rác",
    date: "24/11/2025",
    time: "9:30",
    points: +25,
  },
  {
    id: "3",
    type: "collect",
    title: "Thu gom rác",
    date: "23/11/2025",
    time: "14:20",
    points: +30,
  },
  {
    id: "4",
    type: "redeem",
    title: "Đổi quà",
    date: "22/11/2025",
    time: "10:15",
    points: -200,
  },
  {
    id: "5",
    type: "collect",
    title: "Thu gom rác",
    date: "21/11/2025",
    time: "16:45",
    points: +50,
  },
];

const PointScreen: React.FC<TPointScreenProps> = ({
  navigation,
}) => {
  return (
    <Screen>
      {/* Points Display Card */}
      <View className="p-4 flex items-center">
        <View style={styles.pointsCard}>
          <Text className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Điểm của bạn
          </Text>
          <View className="flex-row items-center justify-center gap-2">
            <Text style={{ 
              fontSize: 30, 
              fontWeight: 'bold', 
              color: '#15803d', 
              lineHeight: 45 
            }}>
              {mockPoints.current}
            </Text>
            <Ionicons name="leaf" size={28} color="#15803d" />
          </View>
        </View>
        
        {/* Pending Points */}
        {mockPoints.pending > 0 && (
          <Text className="font-medium text-gray-700 mt-2">
            +{mockPoints.pending} điểm đang chờ xử lý từ đơn hàng{" "}
            {mockPoints.pendingOrder}
          </Text>
        )}
      </View>

      {/* Redeem Gifts Button */}
      <View className="px-4 mb-6">
        <BaseActionButton
          onPress={() => navigation.navigate("RedeemGifts")}
          mainText="Đổi quà"
          secondaryIconName="gift"
        />
      </View>

      {/* Hot Gifts Section */}
      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 px-4 mb-3">
          Quà đang hot
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hotGiftsContainer}
        >
          {mockHotGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              id={gift.id}
              name={gift.name}
              points={gift.points}
              image={gift.image}
              variant="vertical"
              onPress={() => {
                // Navigate to gift detail
                console.log("Gift detail:", gift.id);
              }}
            />
          ))}
        </ScrollView>
      </View>

      {/* Transaction History Section */}
      <View className="px-4 pb-6">
        <Text className="text-lg font-bold text-gray-900 mb-3">
          Lịch Sử Giao Dịch
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  {transaction.title}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {transaction.date} - {transaction.time}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text
                  style={[
                    styles.transactionPoints,
                    transaction.points > 0
                      ? styles.transactionPointsPositive
                      : styles.transactionPointsNegative,
                  ]}
                >
                  {transaction.points > 0 ? "+" : ""}
                  {transaction.points}
                </Text>
                <Ionicons name="leaf" size={18} color="#16a34a" />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  pointsCard: {
    backgroundColor: "#E3FAD6",
    borderRadius: 24,
    paddingHorizontal: 100,
    paddingVertical: 20,
    marginBottom: 16,
  },
  hotGiftsContainer: {
    paddingHorizontal: 16,
    paddingRight: 16,
  },
  transactionCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionPoints: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionPointsPositive: {
    color: "#16a34a",
  },
  transactionPointsNegative: {
    color: "#dc2626",
  },
});

export default PointScreen;
