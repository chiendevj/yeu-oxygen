import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, StatusBar,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import AuthBackground from "../../components/auth-background";
import AuthLogo from "../../components/auth/auth-logo";
import InputCustom from "../../components/commons/input-custom";
import ButtonCustom from "../../components/commons/button-custom";
import OAuth from "../../views/auth/oauth";

type TRegisterScreenProps = NativeStackScreenProps<AuthStackParamList, "Register">;

const RegisterScreen: React.FC<TRegisterScreenProps> = ({ navigation }) => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState(""); 

  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(""); 

  const validateInputs = () => {
    let isValid = true;

    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (phone.length < 10 || isNaN(Number(phone))) {
      setPhoneError("Số điện thoại không hợp lệ.");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
      isValid = false;
    }

    if (confirmPassword.length === 0) {
      setConfirmPasswordError("Vui lòng nhập lại mật khẩu.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Xác nhận mật khẩu không khớp.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = () => {
    if (validateInputs()) {
      console.log("Registering user:", phone);
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

          <ButtonCustom title="Đăng ký" onPress={handleRegister} />

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
