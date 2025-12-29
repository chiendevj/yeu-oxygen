import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import {
  Cake,
  Users,
  CreditCard,
  Building,
  Phone,
  AtSign,
  Shield,
  Trash2,
  RefreshCcw,
  Edit2,
  X,
  Check,
} from "lucide-react-native";
import Screen from "../../../components/screen";
import { InfoRow } from "../../../components/commons/info-row";

// 1. Định nghĩa kiểu dữ liệu cho Option
type GenderOption = {
  key: string; // Giá trị lưu vào DB (ví dụ: 'male', 'female')
  label: string; // Giá trị hiển thị (ví dụ: 'Nam', 'Nữ')
};

const ProfileDetailScreen: React.FC = () => {
  const [date, setDate] = useState(new Date(2001, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 2. Cập nhật State: Lưu Key mặc định (ví dụ 'male') thay vì 'Nam'
  const [genderKey, setGenderKey] = useState("male"); 
  const [showGenderModal, setShowGenderModal] = useState(false);
  
  const [cccd, setCccd] = useState("01234650192");
  const [phoneNumber, setPhoneNumber] = useState("987654321");
  
  // 3. Cập nhật danh sách Options: Key - Value
  const GENDER_OPTIONS: GenderOption[] = [
    { key: "male", label: "Nam" },
    { key: "female", label: "Nữ" },
    { key: "other", label: "Khác" },
  ];

  const [countryCode, setCountryCode] = useState<CountryCode>("VN");
  const [callingCode, setCallingCode] = useState("84");
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);

  // 4. Helper để lấy Label từ Key đang chọn để hiển thị ra UI
  const selectedGenderLabel = useMemo(() => {
    const option = GENDER_OPTIONS.find((opt) => opt.key === genderKey);
    return option ? option.label : "Chưa chọn";
  }, [genderKey]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === "android") setShowDatePicker(false);
    if (event.type === "set" || Platform.OS === "ios") setDate(currentDate);
  };

  const formatDate = (rawDate: Date) => {
    const day = rawDate.getDate().toString().padStart(2, "0");
    const month = (rawDate.getMonth() + 1).toString().padStart(2, "0");
    const year = rawDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleNumberInput = (text: string, setter: (val: string) => void) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setter(numericText);
  };

  return (
    <Screen className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row justify-between items-center mb-6 mt-2">
          <Text className="text-2xl font-bold text-slate-900">Tài khoản</Text>
          <Edit2 size={18} color="#333" />
        </View>

        <InfoRow
          icon={<Cake size={20} color="#333" />}
          label="Ngày sinh"
          value={formatDate(date)}
          onPress={() => setShowDatePicker(true)}
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        {/* 5. Sử dụng label đã tìm được để hiển thị, và mở modal */}
        <InfoRow
          icon={<Users size={20} color="#333" />}
          label="Giới tính"
          value={selectedGenderLabel} 
          onPress={() => setShowGenderModal(true)}
        />

        <InfoRow
          icon={<CreditCard size={20} color="#333" />}
          label="CCCD"
          value={cccd}
          isEditable={true}
          keyboardType="numeric"
          placeholder="Nhập CCCD"
          onChangeText={(text) => handleNumberInput(text, setCccd)}
        />

        {/* ... (Giữ nguyên phần CountryPicker và các phần khác) ... */}
        
        <InfoRow
          icon={<Building size={20} color="#333" />}
          label="Địa chỉ"
          value="Quận 4, Hồ Chí Minh"
        />

        <InfoRow
          icon={<Phone size={20} color="#333" />}
          label="Số điện thoại"
          renderRight={
            <View className="flex-row items-center justify-end flex-1">
              <TouchableOpacity
                onPress={() => setCountryPickerVisible(true)}
                className="bg-gray-100 p-2 rounded-lg flex-row items-center border border-gray-200 h-12"
              >
                 <View style={{ width: 0, height: 0, opacity: 0, overflow: "hidden" }}>
                  <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCallingCode
                    withEmoji
                    onSelect={onSelectCountry}
                    visible={isCountryPickerVisible}
                    onClose={() => setCountryPickerVisible(false)}
                    modalProps={{ animationType: "slide" }}
                  />
                </View>
                 <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withEmoji
                  withCallingCode={false}
                  withFilter={false}
                  onSelect={() => {}}
                  modalProps={{ visible: false }}
                />
                <Text className="text-slate-800">+{callingCode}</Text>
              </TouchableOpacity>

              <TextInput
                value={phoneNumber}
                onChangeText={(text) => handleNumberInput(text, setPhoneNumber)}
                keyboardType="numeric"
                placeholder="Nhập SĐT"
                placeholderTextColor="#9CA3AF"
                className="text-right text-gray-800 min-w-[100px] p-0"
              />
            </View>
          }
        />

        <InfoRow
          icon={<AtSign size={20} color="#333" />}
          label="Email"
          value="khoa@gmail.com"
          isEditable
        />
        
        {/* ... (Phần Bảo mật giữ nguyên) ... */}
        <Text className="text-xl font-bold text-slate-900 mt-8 mb-4">
          Bảo mật
        </Text>
        <InfoRow icon={<Shield size={20} color="#333" />} label="Đổi mật khẩu" />
        <InfoRow icon={<Trash2 size={20} color="#EF4444" />} label="Xóa tài khoản" isDestructive={true} />
        <InfoRow icon={<RefreshCcw size={20} color="#333" />} label="Chuyển tài khoản" />

        <TouchableOpacity
          className="bg-slate-800 p-4 rounded-2xl mt-8 items-center justify-center shadow-lg shadow-slate-300"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-bold">Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* --- 6. MODAL CHỌN GIỚI TÍNH (Cập nhật logic) --- */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          activeOpacity={1}
          onPress={() => setShowGenderModal(false)}
          className="justify-center items-center p-6"
        >
          <View className="bg-white w-full rounded-2xl overflow-hidden shadow-xl">
            <View className="p-4 border-b border-gray-100 flex-row justify-between items-center bg-gray-50">
              <Text className="text-lg font-bold text-gray-800">
                Chọn giới tính
              </Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <X size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View className="p-2">
              {GENDER_OPTIONS.map((item, index) => {
                // Kiểm tra dựa trên Key
                const isSelected = item.key === genderKey;
                return (
                  <TouchableOpacity
                    key={item.key} // Dùng key làm React Key luôn
                    className={`p-4 flex-row justify-between items-center rounded-xl mb-1 ${
                      isSelected ? "bg-blue-50" : "bg-white"
                    }`}
                    onPress={() => {
                      setGenderKey(item.key); // Lưu Key vào state
                      setShowGenderModal(false);
                    }}
                  >
                    <Text
                      className={`text-base ${
                        isSelected ? "font-bold text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {item.label} {/* Hiển thị Label */}
                    </Text>
                    {isSelected && <Check size={20} color="#2563EB" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
};

export default ProfileDetailScreen;