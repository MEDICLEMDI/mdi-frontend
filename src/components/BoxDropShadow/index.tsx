import {Platform, StyleProp, View, ViewStyle} from 'react-native';

import BoxShadow from './style';
import { Colors } from '@/constants/theme';

/**
 * BoxDropShadow
 * @param {StyleProp<ViewStyle>} style 아코디언 스타일 (내부 헤더 또는 바디는 자식요소에 직접 스타일을 적용)
 * @comment 메디클에서 사용되는 공통 DropShadow가 적용된 박스입니다. 스타일 옵션을 세분화하여 커스터마이징이 가능하며,
 * 안드로이드와 아이폰의 그림자 색상이 다른 이슈가 있어 Platform을 확
 */
const BoxDropShadow = ({
  color = Platform.OS === 'ios'
    ? Colors.Medicle.Gray.SemiLight
    : Colors.Medicle.Gray.Standard,
  offset = [0, 7],
  elevation = 8,
  opacity = 0.95,
  radius = 20,
  style,
  children,
}: {
  color?: string;
  offset?: number[];
  opacity?: number;
  radius?: number;
  elevation?: number;
  style?:StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) => {
  const defaultStyle = {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Medicle.Gray.SemiLight,
    backgroundColor: '#FFFFFF',
  }
  return (
    <View
      style={[
        BoxShadow(color, offset, opacity, radius, elevation).boxWrap,
        defaultStyle,
        style,
      ]}>
      {children}
    </View>
  );
};

export default BoxDropShadow;
