import React from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";

interface IInputCustomProps extends TextInputProps {
  label: string;
  errorMessage?: string;
}

const InputCustom: React.FC<IInputCustomProps> = ({
  label,
  errorMessage,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  ...rest
}) => {
  const inputClassNames = `h-12 bg-white rounded-xl px-4 text-gray-700 shadow-md ${
    errorMessage ? "border border-red-500" : ""
  }`;

  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
  };

  return (
    <View className="mb-6 w-full bg-white rounded-xl py-1 px-2">
      <Text className="text-green-700 font-semibold">{label}:</Text>

      <TextInput
        className={inputClassNames}
        style={inputStyle}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />

      {errorMessage ? (
        <Text className="text-red-500 mt-1 font-semibold text-sm">
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

export default InputCustom;
