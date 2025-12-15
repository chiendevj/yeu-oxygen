import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraView } from "expo-camera";

type TAutomaticWasteScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  "AutomaticWaste"
>;

type CameraFacing = "back" | "front";

const AutomaticWasteScreen: React.FC<TAutomaticWasteScreenProps> = ({
  navigation,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraFacing>("back");

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "white" }}>
          Đang yêu cầu quyền truy cập camera...
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.permissionText}>
          Không có quyền truy cập camera. Vui lòng cấp quyền trong cài đặt.
        </Text>
      </View>
    );
  }

  const handleCapture = () => {
    Alert.alert(
      "Chức năng chụp ảnh",
      "Chức năng phát hiện rác đang được kích hoạt!"
    );
  };

  const handleFlipCamera = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.fullScreen}>
      <CameraView style={styles.camera} facing={type}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="black" />
        </Pressable>

        <View style={styles.controlsContainer}>
          <Pressable style={styles.miniControlButton}>
            <Ionicons name="help-outline" size={24} color="#333" />
          </Pressable>

          <Pressable style={styles.mainCaptureButton} onPress={handleCapture}>
            <Ionicons name="scan-outline" size={32} color="white" />
          </Pressable>

          <Pressable
            style={styles.miniControlButton}
            onPress={handleFlipCamera}
          >
            <Ionicons name="camera-reverse-outline" size={24} color="#333" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    color: "white",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "white", 
    borderRadius: 50, 
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
controlsContainer: {
        position: 'absolute',
        bottom: 30, 
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center', 
        paddingHorizontal: 10,
        paddingVertical: 10, 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },

  miniControlButton: {
    width: 45, 
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 25, 
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },

  mainCaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "rgba(51, 51, 51, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
});

export default AutomaticWasteScreen;
