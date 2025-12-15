import React from 'react'
import Screen from '../../../components/screen'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/types';
import { Text } from 'react-native';

type TRedeemGiftsScreenProps = NativeStackScreenProps<HomeStackParamList, "RedeemGifts">;

const RedeemGiftsScreen: React.FC<TRedeemGiftsScreenProps> = () => {
  return (
    <Screen>
        <Text>RedeemGiftsScreen</Text>
    </Screen>
  )
}

export default RedeemGiftsScreen