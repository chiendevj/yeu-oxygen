import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native";

interface IInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  renderRight?: React.ReactNode;
  isDestructive?: boolean;
  onPress?: () => void;
  isEditable?: boolean;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}

export const InfoRow: React.FC<IInfoRowProps> = ({
  icon,
  label,
  value,
  renderRight,
  isDestructive = false,
  onPress,
  isEditable = false,
  onChangeText,
  keyboardType = "default",
  placeholder,
}) => {
  return (
    <TouchableOpacity
      onPress={isEditable ? undefined : onPress}
      activeOpacity={isEditable ? 1 : 0.7}
      className="bg-slate-50 p-4 rounded-2xl mb-3 flex-row justify-between items-center shadow-sm border border-gray-100 min-h-[60px]"
    >
      <View className="flex-row items-center space-x-3 gap-3">
        {icon}
        <Text
          className={`font-semibold text-[15px] ${isDestructive ? "text-red-500" : "text-gray-800"}`}
        >
          {label}
        </Text>
      </View>

      <View className="flex-1 items-end pl-4">
        {renderRight ? (
          renderRight
        ) : isEditable ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            className="text-right text-gray-800 w-full p-0 m-0"
          />
        ) : value ? (
          <Text className="text-gray-500">{value}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};