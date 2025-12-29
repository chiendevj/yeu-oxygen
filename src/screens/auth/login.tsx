import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, StatusBar, Alert, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import AuthBackground from "../../components/auth-background";
import AuthLogo from "../../components/auth/auth-logo";
import InputCustom from "../../components/commons/input-custom";
import ButtonCustom from "../../components/commons/button-custom";
import OAuth from "../../views/auth/oauth";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginAsync, clearError } from "../../store/slices/auth.slice";

type TLoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<TLoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  React.useEffect(() => {
    // Clear error khi component mount
    dispatch(clearError());
  }, [dispatch]);

  React.useEffect(() => {
    // Hiển thị error nếu có
    if (error) {
      Alert.alert("Lỗi đăng nhập", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateInputs = (): boolean => {
    let isValid = true;

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Vui lòng nhập email.");
      isValid = false;
    } else if (!emailRegex.test(email.trim().toLowerCase())) {
      setEmailError("Email không hợp lệ.");
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const result = await dispatch(
        loginAsync({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        })
      ).unwrap();

      // Navigation sẽ tự động chuyển sang Main vì auth state đã thay đổi
      if (result) {
        // Success - navigation handled by RootNavigator
      }
    } catch (err: any) {
      // Error đã được xử lý trong useEffect
      console.error("Login error:", err);
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
            label="Email"
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            errorMessage={emailError}
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
            title={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            onPress={handleLogin}
            disabled={isLoading}
          />
          {isLoading && (
            <View className="absolute inset-0 justify-center items-center bg-black/20">
              <ActivityIndicator size="large" color="#16a34a" />
            </View>
          )}
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
