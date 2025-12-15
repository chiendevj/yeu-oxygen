import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Image } from "react-native";

const googleIcon = require("../../../assets/google-icon.png");
const facebookIcon = require("../../../assets/facebook-icon.png");

interface SocialButtonProps {
  provider: "google" | "facebook";
  onPress: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onPress }) => {
  const isGoogle = provider === "google";
  const text = isGoogle ? "Tiếp tục với Google" : "Tiếp tục với Facebook";
  const iconSource = isGoogle ? googleIcon : facebookIcon;
  return (
    <Pressable
      onPress={onPress}
      style={styles.buttonContainer}
      className="flex-row items-center justify-center p-4 rounded-xl mb-4"
    >
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SocialButton;
