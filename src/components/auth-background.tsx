import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface AuthBackgroundProps {
  children: React.ReactNode;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
  const backgroundImage = require('../../assets/glass-break-overlay.png'); 

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={StyleSheet.absoluteFillObject}
    >
      {children}
    </ImageBackground>
  );
};

export default AuthBackground;