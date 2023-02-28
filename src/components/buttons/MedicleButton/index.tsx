import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Text from '@/components/common/Text';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
  disabled?: boolean;
  disableAnimation?: boolean;
  loading?: boolean;
  iconProps?: { height?: number; width?: number; color?: string };
}

const DEFAULT_FONT_STYLE = fontStyleCreator({
  color: Colors.Medicle.Font.Gray.Dark,
  size: 14,
  weight: 'bold',
});

const MedicleButton = ({
  onPress,
  onLongPress,
  text,
  textStyle = DEFAULT_FONT_STYLE,
  iconName,
  buttonStyle,
  iconStyle,
  disabled = false,
  disableAnimation = false,
  loading = false,
  iconProps,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled || disableAnimation}
      onPress={onPress}
      onLongPress={onLongPress || onPress}
      style={[
        style.button,
        buttonStyle,
        disabled && { backgroundColor: Colors.Medicle.Gray.Standard },
      ]}>
      {loading ? (
        <ActivityIndicator style={StyleSheet.absoluteFill} color="black" />
      ) : (
        <>
          <Text type="button" style={[textStyle, disabled && style.disabled]}>
            {text}
          </Text>
          {iconName && (
            <Icon name={iconName} style={iconStyle} {...iconProps} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default MedicleButton;
