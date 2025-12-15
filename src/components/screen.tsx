import React from 'react';
import { View, StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 

interface IScreenProps {
  children: React.ReactNode; 
  style?: StyleProp<ViewStyle>; 
  scrollable?: boolean;
  className?: string; 
}

const Screen: React.FC<IScreenProps> = ({ children, style, scrollable = true, className }) => {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView 
      style={styles.safeArea} 
      className={className}
    >
      <ContentWrapper style={[styles.container, style]} showsVerticalScrollIndicator={false}>
        {children}
      </ContentWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: 'white', 
  },
});

export default Screen;