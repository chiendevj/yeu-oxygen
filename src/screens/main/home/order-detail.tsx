import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../../components/screen';
import {
  wasteCategories,
  getOrderDetailById,
  generateOrderDetail,
  mockCollectionHistory,
} from '../../../utils/mock-data';

type TOrderDetailScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'OrderDetail'
>;


const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Đã xác nhận';
    case 'collecting':
      return 'Đang thu gom';
    case 'completed':
      return 'Hoàn thành';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return 'Đã xác nhận';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100';
    case 'collecting':
      return 'bg-yellow-100';
    case 'completed':
      return 'bg-blue-100';
    case 'cancelled':
      return 'bg-red-100';
    default:
      return 'bg-green-100';
  }
};

const getStatusTextColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'text-green-600';
    case 'collecting':
      return 'text-yellow-600';
    case 'completed':
      return 'text-blue-600';
    case 'cancelled':
      return 'text-red-600';
    default:
      return 'text-green-600';
  }
};

const OrderDetailScreen: React.FC<TOrderDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const orderId = route.params?.orderId || '26';
  
  // Lấy order detail từ mock data hoặc generate từ collection history
  let orderData = getOrderDetailById(orderId);
  
  if (!orderData) {
    // Nếu chưa có trong mock data, tìm trong collection history và generate
    const entry = mockCollectionHistory.find((e) => e.id === orderId);
    if (entry) {
      orderData = generateOrderDetail(entry);
    } else {
      // Fallback data nếu không tìm thấy
      orderData = {
        id: orderId,
        orderNumber: `Đơn ${orderId.padStart(3, '0')}`,
        orderCode: `ORD${orderId.padStart(6, '0')}`,
        wasteType: 'organic',
        collectionTime: '08:00',
        collectionDate: '01/10/2025',
        collectionAddress: '174, quận 4, Hồ Chí Minh',
        status: 'confirmed',
        collector: {
          name: 'Nguyễn Văn A',
          phone: '0901234567',
          avatar: null,
        },
        notes: 'Không có ghi chú.',
      };
    }
  }

  const wasteType = wasteCategories[orderData.wasteType];

  const handleCopyOrderCode = () => {
    // TODO: Implement copy to clipboard
    Alert.alert('Đã sao chép', `Mã đơn hàng: ${orderData.orderCode}`);
  };

  const handleCallCollector = () => {
    // TODO: Implement phone call
    Alert.alert('Gọi điện', `Gọi đến ${orderData.collector.phone}?`);
  };

  return (
    <Screen>
      <View style={styles.orderSummaryCard}>
          <Ionicons name="cube-outline" size={64} color="#666" />
          <Text className="text-2xl font-bold text-gray-900 mt-4">
            {orderData.orderNumber}
          </Text>
          <View
            className={`${getStatusColor(orderData.status)} px-6 py-2 rounded-full mt-4`}
          >
            <Text className={`text-sm font-semibold ${getStatusTextColor(orderData.status)}`}>
              {getStatusText(orderData.status)}
            </Text>
          </View>
        </View>

        {/* Details Section */}
        <View className="px-4 mt-4">
          {/* Loại rác */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-600 mb-2">
              Loại rác
            </Text>
            <View
              className="rounded-2xl px-4 py-3 flex-row items-center justify-between"
              style={{ backgroundColor: wasteType.color }}
            >
              <Text className="text-white font-semibold text-base">
                {wasteType.title}
              </Text>
              <View className="flex-row items-center gap-2">
                {wasteType.icons.map((icon, idx) => {
                                const baseSize = 15;
                                const step = 10;
                                const size = baseSize + idx * step;
                
                                return (
                                  <Ionicons
                                    key={idx}
                                    name={icon as any}
                                    size={size}
                                    color="rgba(255,255,255,0.2)"
                                  />
                                );
                              })}
              </View>
            </View>
          </View>

          {/* Mã đơn hàng */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-600 mb-2">
              Mã đơn hàng
            </Text>
            <View className="bg-slate-50 rounded-xl px-4 py-3 flex-row items-center justify-between">
              <Text className="text-base font-semibold text-gray-900">
                {orderData.orderCode}
              </Text>
              <TouchableOpacity onPress={handleCopyOrderCode} className="p-1">
                <Ionicons name="copy-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Thời gian thu gom */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-600 mb-2">
              Thời gian thu gom
            </Text>
            <View className="bg-slate-50 rounded-xl px-4 py-3">
              <Text className="text-base font-semibold text-gray-900">
                {orderData.collectionTime} - {orderData.collectionDate}
              </Text>
            </View>
          </View>

          {/* Địa chỉ thu gom */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-600 mb-2">
              Địa chỉ thu gom
            </Text>
            <View className="bg-slate-50 rounded-xl px-4 py-3">
              <Text className="text-base font-semibold text-gray-900">
                {orderData.collectionAddress}
              </Text>
            </View>
          </View>

          {/* Nhân viên thu gom */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-600 mb-2">
              Nhân viên thu gom
            </Text>
            <View className="bg-slate-50 rounded-2xl px-4 py-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
                  {orderData.collector.avatar ? (
                    <Text>Avatar</Text>
                  ) : (
                    <Ionicons name="person" size={24} color="#666" />
                  )}
                </View>
                <Text className="text-base font-medium text-gray-900">
                  {orderData.collector.name}
                </Text>
              </View>
              <TouchableOpacity onPress={handleCallCollector} className="p-2">
                <Ionicons name="call-outline" size={22} color="#16a34a" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Ghi chú */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-600 mb-2">
              Ghi chú
            </Text>
            <View className="bg-slate-50 rounded-xl px-4 py-3 min-h-[80px]">
              <Text className="text-base text-gray-700">
                {orderData.notes || '...'}
              </Text>
            </View>
          </View>
        </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  orderSummaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default OrderDetailScreen;

