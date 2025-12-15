import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text>Map Screen</Text>
    </SafeAreaView>
  );
};

export default MapScreen;