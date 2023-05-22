import * as React from "react";
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Colors} from "@/constants/theme";

const RadioInput = ({
  size = 16,
  borderColor = Colors.Medicle.Gray.Standard,
  selected = false,
  circleColor = Colors.Medicle.Orange,
  name,
  index,
  response,
  style,
}:{
  readonly name: string;
  readonly selected: boolean;
  readonly response: React.ComponentState;
  readonly index: number;
  size?: number;
  borderColor?: string;
  circleColor?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const padding = 2;

  const defaultStyle = StyleSheet.create({
    radioCircleWrap: {
      width: size,
      height: size,
      marginRight: 6,
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: 100,
    },
    radioCircle: {
      flex: 1,
      margin: padding,
      backgroundColor: circleColor,
      borderRadius: 100,
    },
    radioWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
  });

  const radioHandler = () => {
    response(index);
  }

  return (
    <View style={style}>
      <Pressable style={defaultStyle.radioWrap} onPress={() => radioHandler()}>
        <View style={defaultStyle.radioCircleWrap}>
          {selected && (
            <View style={defaultStyle.radioCircle}></View>
          )}
        </View>
        <Text>{name}</Text>
      </Pressable>
    </View>
  )
}

export default RadioInput
