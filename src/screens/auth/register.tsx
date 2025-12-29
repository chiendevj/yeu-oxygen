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
import { registerAsync, clearError } from "../../store/slices/auth.slice";

type TRegisterScreenProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const RegisterScreen: React.FC<TRegisterScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState(""); 

  const [emailError, setEmailError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(""); 

  React.useEffect(() => {
    // Clear error khi component mount
    dispatch(clearError());
  }, [dispatch]);

  React.useEffect(() => {
    // Hiển thị error nếu có
    if (error) {
      Alert.alert("Lỗi đăng ký", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateInputs = (): boolean => {
    let isValid = true;

    // Clear previous errors
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Vui lòng nhập email.");
      isValid = false;
    } else if (!emailRegex.test(email.trim().toLowerCase())) {
      setEmailError("Email không hợp lệ.");
      isValid = false;
    }

    // Validate name (optional but recommended)
    if (name.trim() && name.trim().length < 2) {
      setNameError("Tên phải có ít nhất 2 ký tự.");
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

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Vui lòng nhập lại mật khẩu.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Xác nhận mật khẩu không khớp.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const result = await dispatch(
        registerAsync({
          email: email.trim().toLowerCase(),
          password: password.trim(),
          name: name.trim() || undefined,
        })
      ).unwrap();

      // Navigation sẽ tự động chuyển sang Main vì auth state đã thay đổi
      if (result) {
        Alert.alert("Thành công", "Đăng ký thành công!");
        // Success - navigation handled by RootNavigator
      }
    } catch (err: any) {
      // Error đã được xử lý trong useEffect
      console.error("Register error:", err);
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
            label="Tên (tùy chọn)"
            placeholder="Nhập tên của bạn"
            value={name}
            onChangeText={setName}
            errorMessage={nameError}
            className="mb-0"
          />

          <InputCustom
            label="Mật khẩu"
            placeholder="Tối thiểu 6 ký tự"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            errorMessage={passwordError}
            className="mb-0"
          />

          <InputCustom
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            errorMessage={confirmPasswordError}
            className="mb-0"
          />

          <View className="flex-row justify-center mb-6 mt-4">
            <Text>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-green-700 font-semibold underline">
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>

          <ButtonCustom 
            title={isLoading ? "Đang đăng ký..." : "Đăng ký"} 
            onPress={handleRegister}
            disabled={isLoading}
          />
          {isLoading && (
            <View className="absolute inset-0 justify-center items-center bg-black/20">
              <ActivityIndicator size="large" color="#16a34a" />
            </View>
          )}

          <OAuth/>
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

export default RegisterScreen;
