import React from "react";
import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const itemWidth = (width - 16 * 2 - 16) / 2;

interface MenuItemProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, color, onPress }) => {
  const isDarkColor =
    color === "#4A90E2" || color === "#50E3C2" || color === "#9B59B6";

  const IconOverlay = () => (
    <FontAwesome5
      name={icon as any}
      size={60}
      color="white"
      style={{ opacity: 0.2, position: "absolute", bottom: -10, right: -10 }}
    />
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`rounded-xl mb-4 overflow-hidden shadow-md ${color} justify-end`}
      style={{ width: itemWidth, height: 100 }}
    >
      <View className="p-3 justify-end h-full relative">
        <IconOverlay />
        <Text
          className="text-lg font-semibold"
          style={{ color: color === "#f1f1f1" ? "#A0A0A0" : "white" }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
