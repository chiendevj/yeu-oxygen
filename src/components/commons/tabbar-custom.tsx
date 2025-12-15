import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

type TabBarCustomProps = BottomTabBarButtonProps & {
    focused: boolean;
};

const TabBarCustom: React.FC<TabBarCustomProps> = (props) => {
    const { children, onPress, accessibilityState, focused } = props;

    const isFocused = accessibilityState?.selected || focused;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center',
                borderTopColor: isFocused ? '#16a34a' : 'transparent',
                borderTopWidth: isFocused ? 3 : 0, 
                paddingTop: 5, 
            }}
        >
            {children}
        </TouchableOpacity>
    );
};

export default TabBarCustom;