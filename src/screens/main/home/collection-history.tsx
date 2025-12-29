import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../../components/screen';
import {
  mockCollectionHistory,
  CollectionEntry,
  wasteCategories,
} from '../../../utils/mock-data';

type TCollectionHistoryScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'CollectionHistory'
>;

// Sử dụng mock data từ utils/mock-data.ts
const mockData: CollectionEntry[] = mockCollectionHistory;

const CollectionHistoryScreen: React.FC<TCollectionHistoryScreenProps> = ({
  navigation,
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedWasteType, setSelectedWasteType] = useState<
    'organic' | 'plastic' | 'glass' | 'paper' | 'hazardous' | 'all'
  >('all');

  // Generate years: 5 years before and 5 years after current year
  const availableYears = useMemo(() => {
    const years: number[] = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years.reverse(); // Most recent first
  }, [currentYear]);

  // Filter và group entries theo năm/tháng/loại rác đã chọn
  const filteredAndGroupedEntries = useMemo(() => {
    // Filter entries theo năm, tháng và loại rác
    const filtered = mockData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth() + 1; // getMonth() returns 0-11
      
      const matchesDate = entryYear === selectedYear && entryMonth === selectedMonth;
      const matchesWasteType =
        selectedWasteType === 'all' || entry.wasteType === selectedWasteType;
      
      return matchesDate && matchesWasteType;
    });

    // Group entries by date
    return filtered.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {} as Record<string, CollectionEntry[]>);
  }, [selectedYear, selectedMonth, selectedWasteType]);

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

  const formatDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    return `Ngày ${day}`;
  };

  const getMonthName = (month: number) => {
    const months = [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ];
    return months[month - 1];
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 1) {
        setSelectedMonth(12);
        setSelectedYear((prev) => prev - 1);
      } else {
        setSelectedMonth((prev) => prev - 1);
      }
    } else {
      if (selectedMonth === 12) {
        setSelectedMonth(1);
        setSelectedYear((prev) => prev + 1);
      } else {
        setSelectedMonth((prev) => prev + 1);
      }
    }
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setShowYearPicker(false);
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100">
        <TouchableOpacity
          className="flex-row items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 min-w-[80px]"
          onPress={() => setShowYearPicker(true)}
          activeOpacity={0.7}
        >
          <Text className="text-xl font-medium text-gray-900">{selectedYear}</Text>
          <Ionicons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="p-1"
            onPress={() => handleMonthChange('prev')}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={20} color="#111" />
          </TouchableOpacity>
          <View className="px-3 py-1.5 rounded-lg bg-gray-100">
            <Text className="text-base font-medium text-gray-900">
              {getMonthName(selectedMonth)}
            </Text>
          </View>
          <TouchableOpacity
            className="p-1"
            onPress={() => handleMonthChange('next')}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={20} color="#111" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Waste Type Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-100"
        contentContainerStyle={styles.wasteFilterContainer}
      >
        <TouchableOpacity
          className={`px-4 py-2 rounded-full mr-2 ${
            selectedWasteType === 'all'
              ? 'bg-gray-900'
              : 'bg-gray-100'
          }`}
          onPress={() => setSelectedWasteType('all')}
          activeOpacity={0.7}
        >
          <Text
            className={`text-sm font-semibold ${
              selectedWasteType === 'all' ? 'text-white' : 'text-gray-700'
            }`}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        {Object.entries(wasteCategories).map(([key, category]) => (
          <TouchableOpacity
            key={key}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedWasteType === key ? 'opacity-100' : 'opacity-60'
            }`}
            style={{ backgroundColor: category.color }}
            onPress={() =>
              setSelectedWasteType(
                key as 'organic' | 'plastic' | 'glass' | 'paper' | 'hazardous'
              )
            }
            activeOpacity={0.7}
          >
            <Text className="text-sm font-semibold text-white">
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Year Picker Modal */}
      <Modal
        visible={showYearPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowYearPicker(false)}>
          <View className="flex-1 bg-black/50 justify-center items-center p-5">
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                  <Text className="text-lg font-bold text-gray-900">Chọn năm</Text>
                  <TouchableOpacity
                    onPress={() => setShowYearPicker(false)}
                    className="p-1"
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={availableYears}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className={`flex-row items-center justify-between px-5 py-4 border-b border-gray-100 ${
                        selectedYear === item ? 'bg-green-50' : ''
                      }`}
                      onPress={() => handleYearSelect(item)}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`text-base ${
                          selectedYear === item
                            ? 'font-bold text-green-600'
                            : 'font-medium text-gray-900'
                        }`}
                      >
                        {item}
                      </Text>
                      {selectedYear === item && (
                        <Ionicons name="checkmark" size={20} color="#16a34a" />
                      )}
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.yearListContent}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Collection List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(filteredAndGroupedEntries).length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="calendar-outline" size={64} color="#d1d5db" />
            <Text className="text-base text-gray-500 mt-4">
              Không có dữ liệu thu gom trong tháng này
            </Text>
          </View>
        ) : (
          Object.entries(filteredAndGroupedEntries)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([date, entries]) => (
            <View key={date} className="mb-6">
              <Text className="text-base font-bold text-gray-900 mb-3">
                {formatDateLabel(date)}
              </Text>
              {entries.map((entry) => {
                const wasteType = entry.wasteType
                  ? wasteCategories[entry.wasteType]
                  : null;

                return (
                  <TouchableOpacity
                    key={entry.id}
                    style={styles.entryCard}
                    onPress={() =>
                      navigation.navigate('OrderDetail', {
                        orderId: entry.id,
                      })
                    }
                    activeOpacity={0.7}
                  >
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1 flex-wrap">
                        <Text className="text-base font-semibold text-gray-900">
                          {entry.orderNumber}
                        </Text>
                        {wasteType && (
                          <View
                            className="px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: wasteType.color }}
                          >
                            <Text className="text-xs font-semibold text-white">
                              {wasteType.title}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-sm text-gray-600">{entry.time}</Text>
                    </View>
                    <View className="ml-4">
                      <View className={`${getStatusColor(entry.status)} px-4 py-2 rounded-full`}>
                        <Text className={`text-sm font-semibold ${getStatusTextColor(entry.status)}`}>
                          {getStatusText(entry.status)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
};

// Chỉ giữ StyleSheet cho những phần phức tạp (shadow, elevation, dynamic styles)
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 320,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  yearListContent: {
    paddingVertical: 8,
  },
  wasteFilterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default CollectionHistoryScreen;
