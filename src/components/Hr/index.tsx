import React from 'react';
import { View, ViewStyle } from 'react-native';

import style from './style';

interface Hr {
  color?: string;
  thickness?: number;
  style?: ViewStyle | ViewStyle[];
}

/**
 * Hr
 * @param {string} color
 * @param {number} thickness
 * @param {ViewStyle | ViewStyle[]} style
 * @comment 구분선
 */
const Hr = ({ color, thickness, style }: Hr) => {
  return (
    <View
      style={[
        style,
        { borderBottomColor: color ? color : 'black' },
        { borderBottomWidth: thickness ? thickness : 1 },
      ]}
    />
  );
};

export default Hr;
