import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  TouchableOpacityProps, 
  StyleSheet,
  TextStyle
} from 'react-native';

type TTextAlignment = 'auto' | 'left' | 'right' | 'center' | 'justify';

interface IButtonCustomProps extends TouchableOpacityProps {
  title: string; 
  onPress: () => void; 
  buttonClassName?: string;
  textClassName?: string;
  textAlignment?: TTextAlignment; 
}

const ButtonCustom: React.FC<IButtonCustomProps> = ({
  title,
  onPress,
  buttonClassName = '',
  textClassName = '',
  textAlignment = 'center', 
  style,
  ...rest
}) => {
  
  const defaultButtonClass = "bg-[#006837] p-4 rounded-xl shadow-lg mb-6";
  
  const defaultTextClass = "text-white font-semibold text-lg";

  const textStyle: TextStyle = {
    textAlign: textAlignment, 
    width: '100%', 
  };

  return (
    <TouchableOpacity
      className={`${defaultButtonClass} ${textAlignment === 'center' ? 'items-center' : ''} ${buttonClassName}`}
      onPress={onPress}
      style={style}
      {...rest}
    >
      <Text className={`${defaultTextClass} ${textClassName}`} style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;