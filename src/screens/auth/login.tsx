import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, StatusBar,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import AuthBackground from "../../components/auth-background";
import AuthLogo from "../../components/auth/auth-logo";
import InputCustom from "../../components/commons/input-custom";
import ButtonCustom from "../../components/commons/button-custom";
import OAuth from "../../views/auth/oauth";

type TLoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<TLoginScreenProps> = ({ navigation }) => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const validateInputs = () => {
    let isValid = true;

    if (phone.length < 10) {
      setPhoneError("Số điện thoại phải có ít nhất 10 số.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      console.log("Logging in with:", phone);
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <AuthBackground>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <AuthLogo />
        <View className="px-6 w-full mt-8">
          <InputCustom
            label="Số điện thoại"
            placeholder="09xx xxx xxx"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            errorMessage={phoneError}
            className="mb-0"
          />

          <InputCustom
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            errorMessage={passwordError}
            className="mb-0"
          />

          <View className="flex-row justify-center mb-6 mt-4">
            <Text>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-green-700 font-semibold underline">
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>

          <ButtonCustom
            title="Đăng nhập"
            onPress={handleLogin}
          />
          <OAuth />
        </View>
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 40,
  },
});

export default LoginScreen;
