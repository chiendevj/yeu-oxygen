import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppTabParamList, HomeStackParamList } from "../../navigation/types";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import Screen from "../../components/screen";
import Menu from "../../views/main/menu";
import { LinearGradient } from "expo-linear-gradient";
import BaseActionButton from "../../components/commons/base-button-custom";

const LogoImage = require("../../../assets/logo.png");

const { width } = Dimensions.get("window");
const ITEM_GAP = 12;
const CAROUSEL_WIDTH = width - 32;

type THomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, "HomeMain">,
  NativeStackScreenProps<AppTabParamList>
>;


const HomeScreen: React.FC<THomeScreenProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const bannerData = [
    { id: "1", source: require("../../../assets/banner.png") },
    { id: "2", source: require("../../../assets/banner.png") },
    { id: "3", source: require("../../../assets/banner.png") },
  ];

  const menuItems = [
    {
      title: "Quy trình phân loại rác",
      icon: "recycle",
      color: "bg-[#3B9E3E]",
      onPress: () => navigation.navigate("SortingProcess"),
    },
    {
      title: "Lịch sử thu gom",
      icon: "history",
      color: "bg-[#1B8247]",
      onPress: () => navigation.navigate("CollectionHistory"),
    },
    {
      title: "Tích điểm",
      icon: "ticket-alt",
      color: "bg-[#3B8F9E]",
      onPress: () => navigation.navigate("Point"),
    },
    {
      title: "Đổi quà",
      icon: "gift",
      color: "bg-[#B6B61B]",
      onPress: () => navigation.navigate("RedeemGifts"),
    },
    {
      title: "Phân loại tự động",
      icon: "camera",
      color: "bg-[#453FA1]",
      onPress: () => navigation.navigate("AutomaticWaste"),
    },
  ];

  return (
    <Screen scrollable={true}>
      <LinearGradient
        colors={["#00883A", "#3DBC5D", "#28A74500"]}
        locations={[0, 0.6, 1]}
        style={styles.headerBackground}
      >
        <Image
          source={LogoImage}
          style={styles.logoOverlay}
          resizeMode="contain"
        />

        <View className="p-4 pt-24">
          <Text className="text-white text-xl font-semibold mb-1 opacity-90">
            Chào buổi sáng,
          </Text>
          <Text className="text-white text-3xl font-extrabold">
            Trần Trung Chiến
          </Text>
        </View>
      </LinearGradient>

      <View className="px-4 -mt-10 mb-4">
        <BaseActionButton
          onPress={() => console.log("Create new request")}
          mainText="Tạo đơn thu gom"
          mainIconName="plus"
          secondaryIconName="help-circle"
        />
      </View>

      <View className="mb-6">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          className="shadow-md"
        >
          {bannerData.map((item, index) => (
            <Pressable
              key={item.id}
              style={[
                styles.bannerItemContainer,
                index < bannerData.length - 1 && { marginRight: ITEM_GAP },
                { borderRadius: 12, overflow: "hidden" },
              ]}
              onPress={() => console.log(`Banner ${item.id} pressed`)}
            >
              <Image
                source={item.source}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View className="px-4 pb-10">
        <Menu items={menuItems} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    height: 210,
    overflow: "hidden",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  logoOverlay: {
    position: "absolute",
    top: 30,
    right: 0,
    width: 200,
    height: 200,
    opacity: 0.2,
    transform: [{ rotate: "30deg" }],
  },
  carouselContainer: {
    paddingHorizontal: 16,
  },
  bannerItemContainer: {
    width: CAROUSEL_WIDTH,
    height: 160,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
