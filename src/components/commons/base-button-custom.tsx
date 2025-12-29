import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";

interface BaseActionButtonProps {
  onPress: () => void;
  mainText: string;
  bgColorClass?: string;
  mainIconName?: ComponentProps<typeof AntDesign>["name"];
  secondaryIconName: ComponentProps<typeof Feather>["name"];
  mainIconColor?: string;
  secondaryIconColor?: string;
}

const BaseActionButton: React.FC<BaseActionButtonProps> = ({
  onPress,
  mainText,
  bgColorClass = 'bg-[#00B14B]',
  mainIconName,
  secondaryIconName,
  mainIconColor = "white",
  secondaryIconColor = "#28A745",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className={`flex-row items-center justify-between rounded-full p-5 shadow-xl ${bgColorClass}`}
      style={styles.buttonShadow}
    >
      <View className="flex-row items-center">
        <AntDesign name={mainIconName} size={24} color={mainIconColor} />
        <Text className="text-white text-xl font-bold ml-3">{mainText}</Text>
      </View>

      <View className="w-10 h-10 rounded-full bg-white items-center justify-center ml-4">
        <Feather
          name={secondaryIconName}
          size={24}
          color={secondaryIconColor}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});

export default BaseActionButton;
