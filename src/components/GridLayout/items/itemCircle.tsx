import {GestureResponderEvent, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import Icon from "@/icons";
import * as React from "react";

const ItemCircle = ({
  index,
  item,
  style,
  iconStyle,
  textStyle,
  circleStyle,
  onPress,
}:{
  readonly index: number;
  readonly item: any;
  style?: ViewStyle | ViewStyle[];
  iconStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  circleStyle?: ViewStyle | ViewStyle[];
  onPress?: Function;
}) => {
  const isNullItem = item.route === '';

  const onPressEventHandler = () => {
    if(onPress !== undefined) onPress(item, index);
  };

  return (
    <TouchableOpacity
      onLayout={(e)=>console.log(e.nativeEvent.layout)}
      onPress={() => onPressEventHandler()}
      style={[style, isNullItem && { backgroundColor: '#FFFFFF00' }]}
      disabled={isNullItem}
    >
      <View style={circleStyle}>
        {item.icon !== undefined && item.icon !== '' && (<Icon name={item.icon} style={iconStyle} />)}
      </View>
      {item.name !== undefined && item.name !== '' && (<Text style={textStyle}>{item.name}</Text>)}
    </TouchableOpacity>
  )
}

export default ItemCircle;
