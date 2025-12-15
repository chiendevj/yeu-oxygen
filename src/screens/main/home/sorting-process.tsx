import React from "react";
import { View, Text, Pressable } from "react-native";
import Screen from "../../../components/screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../navigation/types";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<HomeStackParamList, "SortingProcess">;

const categories = [
  {
    title: "Hữu cơ",
    slug: "organic",
    subtitle: "Rác được thải từ những hoạt động hằng ngày",
    color: "#3B9E3E",
    icons: ["leaf-outline", "fast-food-outline", "nutrition-outline"],
  },
  {
    title: "Nhựa",
    slug: "plastic",
    subtitle: "Gồm chai nước, bao bì nhựa, hộp nhựa",
    color: "#347EA9",
    icons: ["water-outline", "beer-outline", "flask-outline"],
  },
  {
    title: "Thủy tinh",
    slug: "glass",
    subtitle: "Chai lọ thuỷ tinh, bình ly, vỏ",
    color: "#818181",
    icons: ["wine-outline", "wine-sharp", "glasses-outline"],
  },
  {
    title: "Giấy",
    slug: "paper",
    subtitle: "Vật liệu từ giấy như: Giấy in, hộp carton, báo cũ",
    color: "#9E9D24",
    icons: ["newspaper-outline", "document-outline", "duplicate-outline"],
  },
  {
    title: "Nguy hại",
    slug: "hazardous",
    subtitle: "Pin, bóng đèn, bình xịt, dầu, thiết bị điện tử",
    color: "#A45454",
    icons: ["warning-outline", "flame-outline", "skull-outline"],
  },
];

const SortingProcessScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen>
      <View className="flex-1 p-4">
        <Text className="font-semibold text-lg mb-4">
          Vui lòng chọn hình thức phân loại rác mà bạn muốn tìm hiểu
        </Text>

        {categories.map((item, index) => (
          <Pressable
            key={index}
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: item.color }}
            onPress={() => 
        navigation.navigate("SortDetail", { 
            slug: item.slug, 
            title: item.title 
        })
    }
          >
            <Text className="text-white font-bold text-lg">{item.title}</Text>
            <Text className="text-white/80 mt-1">{item.subtitle}</Text>

            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 0,
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              {item.icons.map((icon, idx) => {
                const baseSize = 30;
                const step = 10;
                const size = baseSize + idx * step;

                return (
                  <Ionicons
                    key={idx}
                    name={icon}
                    size={size}
                    color="rgba(255,255,255,0.2)"
                  />
                );
              })}
            </View>
          </Pressable>
        ))}

        <Pressable
          className="bg-white mt-3 rounded-xl flex-row items-center justify-between px-4 py-4"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={() => navigation.navigate("AutomaticWaste")}
        >
          <View>
            <Text className="text-gray-500 text-sm font-semibold">
              Bạn chưa biết phải phân loại rác nào?
            </Text>
            <Text className="font-bold text-lg mt-1">Phân loại tự động</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </Pressable>
      </View>
    </Screen>
  );
};

export default SortingProcessScreen;
