import * as React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Icon from '@/icons';

const ItemBox = ({
  index,
  item,
  style,
  iconStyle,
  iconColor,
  textStyle,
  onPress,
}: {
  readonly index: number;
  readonly item: any;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  iconColor?: { fill?: string; stroke?: string };
  textStyle?: StyleProp<TextStyle>;
  onPress?: Function;
}) => {
  const isNullItem = item.route === '';
  const onPressEventHandler = () => {
    if (onPress !== undefined) {
      onPress(item, index);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => onPressEventHandler()}
      style={[style, isNullItem && { backgroundColor: '#FFFFFF00' }]}
      disabled={isNullItem}>
      {item.icon !== undefined && item.icon !== '' && (
        <Icon
          name={item.icon}
          fill={iconColor?.fill}
          stroke={iconColor?.stroke}
          style={iconStyle}
        />
      )}
      {item.name !== undefined && item.name !== '' && (
        <Text style={textStyle}>{item.name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ItemBox;
