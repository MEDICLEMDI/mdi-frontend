import * as React from 'react';
import {
  Switch,
  SwitchProps,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/theme';

interface MedicleSwitchProps extends SwitchProps {
  label?: string;
  direction?: 'column' | 'row';
  textStyle?: TextStyle;
  viewStyle?: ViewStyle;
}

/**
 * MedicleSwitch
 * @param {string} label
 * @param {"column" | "row"} direction - "column", "row"
 * @param {StyleProp<TextStyle>} textStyle
 * @param {StyleProp<ViewStyle>} viewStyle
 * @comment 스위치 컴포넌트입니다. 안드로이드와 IOS는 각 Native에 맞는 형태로 화면에 렌더링됩니다.
 * 내부에서 스위치의 값이 변경되면 onChange를 반환합니다.
 */
const MedicleSwitch = (props: MedicleSwitchProps) => {
  const { onValueChange, onChange, value, label, direction, viewStyle, textStyle } = props;

  const trackBackground = {
    true: Colors.Medicle.Switch.TrackAble,
    false: Colors.Medicle.Switch.TrackEnable,
  };

  const switchTracHandler = () => {
    if (value) {
      return Colors.Medicle.Switch.thumbAble;
    } else {
      return Colors.Medicle.Switch.thumbEnable;
    }
  };

  return (
    <View
      style={[
        viewStyle,
        {
          flexDirection: direction,
        },
      ]}>
      <Text style={textStyle}>{label}</Text>
      <Switch
        value={value}
        onChange={onChange}
        onValueChange={onValueChange}
        thumbColor={switchTracHandler()}
        ios_backgroundColor={Colors.Medicle.Switch.TrackEnable}
        trackColor={trackBackground}
      />
    </View>
  );
};

export default MedicleSwitch;
