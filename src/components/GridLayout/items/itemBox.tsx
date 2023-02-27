import {GestureResponderEvent, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import Icon from "@/icons";
import * as React from "react";

const ItemBox = ({
  index,
  item,
  style,
  iconStyle,
  iconColor,
  textStyle,
  onPress,
}:{
  readonly index: number;
  readonly item: any;
  style?: ViewStyle | ViewStyle[];
  iconStyle?: ViewStyle | ViewStyle[];
  iconColor?: string;
  textStyle?: TextStyle | TextStyle[];
  onPress?: Function;
}) => {
  const isNullItem = item.route === '';
  const onPressEventHandler = () => {
    if(onPress !== undefined) onPress(item, index);
  };
  return (
    <TouchableOpacity
      onPress={() => onPressEventHandler()}
      style={[style, isNullItem && { backgroundColor: '#FFFFFF00' }]}
      disabled={isNullItem}
    >
      {item.icon !== undefined && item.icon !== '' && (<Icon name={item.icon} color={iconColor} style={iconStyle} />)}
      {item.name !== undefined && item.name !== '' && (<Text style={textStyle}>{item.name}</Text>)}
    </TouchableOpacity>
  )
}

export default ItemBox;
