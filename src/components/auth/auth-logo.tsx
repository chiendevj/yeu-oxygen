import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const COLOR_LOGO_DARK_GREEN = "#16A34A";
const AuthLogo: React.FC = () => {
  const logoSource = require("../../../assets/logo.png");

  return (
    <View className="items-center mb-10 w-full">
      <View
        className="
          w-[150px] h-[150px] 
          items-center justify-center p-2 
          "
      >
        <View className="items-center justify-center p-2">
          <Image
            source={logoSource}
            style={styles.logoImage} 
            resizeMode="contain"
          />

          <Text style={styles.logoText}>YÊU</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 60,
    height: 60,
    marginBottom: 0,
  },

  logoText: {
    fontSize: 55,
    fontWeight: "900", 
    color: COLOR_LOGO_DARK_GREEN,
    letterSpacing: 1,
  },
});

export default AuthLogo;
