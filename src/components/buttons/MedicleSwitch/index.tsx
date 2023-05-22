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
