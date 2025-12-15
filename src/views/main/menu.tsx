import React from "react";
import { View } from "react-native";
import MenuItem from "../../components/commons/menu-item";

interface MenuItem {
  title: string;
  icon: string; 
  color: string;
  onPress: () => void;
}

interface MenuProps {
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <View className="flex-row flex-wrap justify-between">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          icon={item.icon}
          color={item.color}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

export default Menu;