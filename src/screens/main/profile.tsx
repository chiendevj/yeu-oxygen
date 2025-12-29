import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Settings, Camera } from 'lucide-react-native';
import Screen from '../../components/screen';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppTabParamList, ProfileStackParamList } from '../../navigation/types';

type TProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, "ProfileMain">,
  NativeStackScreenProps<AppTabParamList>
>;

const ProfileScreen: React.FC<TProfileScreenProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const userName = "Trần Trung Chiến";

  const menuItems = [
    { 
      id: 1, 
      title: 'Thông tin cá nhân', 
      handle: () => {
        navigation.navigate('ProfileDetail');
      }
    },
    { 
      id: 2, 
      title: 'Quà của bạn',
      handle: () => {
        navigation.navigate('MyGifts');
      }
    },
    { 
      id: 3, 
      title: 'Về YÊU',
      handle: () => {
        console.log('Nagative to Về Yêu');
      }
    },
    { 
      id: 4, 
      title: 'Liên hệ hỗ trợ',
      handle: () => {
        console.log(1);
      }
    },
  ];

  return (
    <Screen>
        <View className="relative">
          <Image 
            source={require('../../../assets/cover-picture.jpg')} 
            className="w-full h-60"
            resizeMode="cover"
          />
          
          <TouchableOpacity className="absolute top-12 right-4 bg-white/80 p-2 rounded-full">
            <Settings size={20} color="#333" />
          </TouchableOpacity>
        </View>

        <View className="items-center -mt-14 mb-6">
          <View className="relative">
            <Image 
              source={require('../../../assets/main-picture.jpg')} 
              className="w-28 h-28 rounded-full border-4 border-white"
            />
            <TouchableOpacity className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm">
              <Camera size={14} color="#333" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 mt-3">{userName}</Text>
        </View>

        <View className="px-4 flex gap-4">
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50 shadow"
              onPress={item.handle}
            >
              <Text className="text-lg font-semibold text-gray-800 flex-1">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
    </Screen>
  );
};

export default ProfileScreen;