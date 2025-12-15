import React from "react";
import { View, Text } from "react-native";
import SocialButton from "../../components/auth/social-button";

const OAuth: React.FC = () => {
  const handleGoogleLogin = () => {
    console.log("Thực hiện logic đăng nhập với Google...");
  };

  const handleFacebookLogin = () => {
    console.log("Thực hiện logic đăng nhập với Facebook...");
  };

  return (
    <View className="w-full">
      <Text className="text-lg text-center mb-6">
        hoặc
      </Text>

      <SocialButton
        provider="google"
        onPress={handleGoogleLogin} 
      />

      <SocialButton
        provider="facebook"
        onPress={handleFacebookLogin} 
      />
    </View>
  );
};

export default OAuth;