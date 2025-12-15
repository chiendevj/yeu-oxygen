import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  HomeMain: undefined;
  SortingProcess: undefined;
  CollectionHistory: undefined;
  Point: undefined;
  RedeemGifts: undefined;
  AutomaticWaste: undefined;
  SortDetail: { 
    slug: string; 
    title: string;
  };
};

export type AppTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>; 
  Order: undefined;
  Map: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<AppTabParamList>;
};
