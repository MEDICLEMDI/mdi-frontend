import React from 'react';
import { View, ViewStyle } from 'react-native';

import style from './style';
interface Hr {
  color?: string;
  thickness?: number;
  style?: ViewStyle | ViewStyle[];
}

const Hr = ({ color, thickness, style }: Hr) => {
  return (
    <View
      style={[
        style,
        { borderBottomColor: color ? color : 'blcak' },
        { borderBottomWidth: thickness ? thickness : 1 },
      ]}
    />
  );
};

export default Hr;
