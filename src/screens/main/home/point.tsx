import React from 'react'
import Screen from '../../../components/screen'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/types';
import { Text } from 'react-native';

type TPointScreenProps = NativeStackScreenProps<HomeStackParamList, "Point">;

const PointScreen: React.FC<TPointScreenProps> = () => {
  return (
    <Screen>
        <Text>PointScreen</Text>
    </Screen>
  )
}

export default PointScreen