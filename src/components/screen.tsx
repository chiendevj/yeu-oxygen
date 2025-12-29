import React from 'react';
import { View, StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
// 1. Import hook lấy insets
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'; 

interface IScreenProps {
  children: React.ReactNode; 
  style?: StyleProp<ViewStyle>; 
  contentContainerStyle?: StyleProp<ViewStyle>; // Thêm prop này để flexible hơn
  scrollable?: boolean;
  className?: string; 
  background?: string;
}

const Screen: React.FC<IScreenProps> = ({ 
  children, 
  style, 
  contentContainerStyle,
  scrollable = true, 
  className, 
  background = 'white' 
}) => {
  // 2. Lấy thông số safe area
  const insets = useSafeAreaInsets();
  
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView 
      style={[styles.safeArea, background ? { backgroundColor: background } : {}]} 
      className={className}
      // 3. QUAN TRỌNG: Bỏ 'bottom' ở đây để View tràn xuống đáy
      edges={['left', 'right', 'bottom']} 
    >
      <ContentWrapper 
        style={[style]} 
        // 4. Xử lý padding bottom
        // Nếu là ScrollView: dùng contentContainerStyle
        // Nếu là View: dùng style thường (paddingBottom)
        {...(scrollable ? {
          contentContainerStyle: [
            // Padding mặc định để nội dung không sát đáy quá
            { paddingBottom: insets.bottom + 20 }, 
            contentContainerStyle
          ]
        } : {
          style: [
            style, 
            { paddingBottom: insets.bottom +20 } // View thường thì padding trực tiếp
          ]
        })}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ContentWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
});

export default Screen;