import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import Icon from "@/icons";
import * as React from "react";

const ItemCircle = ({
  item,
  style,
  iconStyle,
  textStyle,
  circleStyle,
}:{
  item: any;
  style?: ViewStyle | ViewStyle[];
  iconStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  circleStyle?: ViewStyle | ViewStyle[];
}) => {

  const isNullItem = item.route === '';

  return (
    <TouchableOpacity
      onPress={() => null}
      style={[style, isNullItem && { backgroundColor: '#FFFFFF00' }]}
      disabled={isNullItem}
    >
      <View style={circleStyle}>
        {item.icon !== '' && (<Icon name={item.icon} style={iconStyle} />)}
      </View>
      {item.name !== '' && (<Text style={textStyle}>{item.name}</Text>)}
    </TouchableOpacity>
  )
}

export default ItemCircle;
