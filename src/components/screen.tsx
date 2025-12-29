import React from 'react';
import { View, StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 

interface IScreenProps {
  children: React.ReactNode; 
  style?: StyleProp<ViewStyle>; 
  scrollable?: boolean;
  className?: string; 
  background?: string;
}

const Screen: React.FC<IScreenProps> = ({ children, style, scrollable = true, className, background = 'white' }) => {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView 
      style={[styles.safeArea, background ? { backgroundColor: background } : {}]} 
      className={className}
      edges={['bottom', 'left', 'right']}
    >
      <ContentWrapper style={[style]} showsVerticalScrollIndicator={false}>
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