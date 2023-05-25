import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

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
  iconProps?: { size?: number; fill?: string; stroke?: string };
}

const DEFAULT_FONT_STYLE = fontStyleCreator({
  color: Colors.Medicle.Font.Gray.Dark,
  size: 14,
  weight: 'bold',
});

/**
 * MedicleButton
 * @param {((event: GestureResponderEvent) => void) | undefined} onPress 
 * @param {((event: GestureResponderEvent) => void) | undefined} onLongPress 
 * @param {string} text - require 버튼에 사용할 텍스트
 * @param {StyleProp<TextStyle>} textStyle 
 * @param {string} iconName - icon 컴포넌트에서 선언된 아이콘 이름
 * @param {StyleProp<ViewStyle>} iconStyle - 아이콘 영역 스타일
 * @param {StyleProp<ViewStyle>} buttonStyle - 버튼 스타일
 * @param {boolean} disabled - 버튼 활성화
 * @param {boolean} disableAnimation - 버튼 애니메이션 플래그
 * @param {boolean} loading - 버튼이 로딩중인 경우 인디케이터가 노출됨
 * @param {{ size?: number; fill?: string; stroke?: string }} iconProps 
 * @comment 메디클에서 사용되는 공통 버튼 컴포넌트입니다. 기본 버튼 활성화 비활성화 상태에대한 스타일이 적용되어있읍니다. 
 * 별도의 스타일 선언시 기본 스타일에 override되며, 
 */
const MedicleButton = ({
  onPress,
  onLongPress,
  text,
  textStyle,
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
          <Text
            style={[
              textStyle ? textStyle : DEFAULT_FONT_STYLE,
              disabled && style.disabled,
            ]}>
            {text}
          </Text>
          {iconName && (
            <Icon name={iconName} style={iconStyle} stroke={iconProps?.stroke} fill={iconProps?.fill} size={iconProps?.size} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default MedicleButton;
