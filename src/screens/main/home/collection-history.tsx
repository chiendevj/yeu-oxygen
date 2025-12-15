import React from 'react'
import Screen from '../../../components/screen'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/types';
import { Text } from 'react-native';

type TCollectionHistoryScreenProps = NativeStackScreenProps<HomeStackParamList, "CollectionHistory">;

const CollectionHistoryScreen: React.FC<TCollectionHistoryScreenProps> = () => {
  return (
    <Screen>
        <Text>CollectionHistoryScreen</Text>
    </Screen>
  )
}

export default CollectionHistoryScreen