import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  HomeMain: undefined;
  SortingProcess: undefined;
  CollectionHistory: undefined;
  OrderDetail: {
    orderId: string;
  };
  Point: undefined;
  RedeemGifts: undefined;
  MyGifts: undefined;
  AutomaticWaste: undefined;
  SortDetail: { 
    slug: string; 
    title: string;
  };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ProfileDetail: undefined;
  MyGifts: undefined;
};

export type AppTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>; 
  Order: undefined;
  Map: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<AppTabParamList>;
};
