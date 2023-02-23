import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import Icon from "@/icons";
import * as React from "react";

const ItemBox = ({
  item,
  style,
  iconStyle,
  iconColor,
  textStyle,
}:{
  item: any;
  style?: ViewStyle | ViewStyle[];
  iconStyle?: ViewStyle | ViewStyle[];
  iconColor?: string;
  textStyle?: TextStyle | TextStyle[];
}) => {

  const isNullItem = item.route === '';

  return (
    <TouchableOpacity
      onPress={() => null}
      style={[style, isNullItem && { backgroundColor: '#FFFFFF00' }]}
      disabled={isNullItem}
    >
      {item.icon !== '' && (<Icon name={item.icon} color={iconColor} style={iconStyle} />)}
      {item.name !== '' && (<Text style={textStyle}>{item.name}</Text>)}
    </TouchableOpacity>
  )
}

export default ItemBox;
