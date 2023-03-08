import {GestureResponderEvent, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import * as React from "react";
import Icons from "@/icons";

const ItemCircle = ({
  index,
  item,
  style,
  iconStyle,
  iconColor,
  textStyle,
  circleStyle,
  onPress,
}:{
  readonly index: number;
  readonly item: any;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
  textStyle?: StyleProp<TextStyle>;
  circleStyle?: StyleProp<ViewStyle>;
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
      <View style={circleStyle}>
        {item.icon !== undefined && item.icon !== '' && (<Icons name={item.icon} style={iconStyle} fill={iconColor} />)}
      </View>
      {item.name !== undefined && item.name !== '' && (<Text style={textStyle}>{item.name}</Text>)}
    </TouchableOpacity>
  )
}

export default ItemCircle;
