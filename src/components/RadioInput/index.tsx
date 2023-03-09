import * as React from "react";
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Colors} from "@/constants/theme";

const RadioInput = ({
  size = 16,
  borderColor = Colors.Medicle.Gray.Standard,
  circleColor = Colors.Medicle.Orange,
  data,
  response,
  style,
}:{
  readonly data: { name: string }[],
  readonly response: React.ComponentState,
  size?: number,
  borderColor?: string,
  circleColor?: string,
  style?: StyleProp<ViewStyle>;
}) => {
  const [selectIndex, setIndex] = React.useState(0);
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

  const radioChangeHandler = (key: number) => {
    setIndex(key);
    response(key);
  }

  return (
    data.map(({name}, key) => (
    <View style={style} key={key}>
      <Pressable style={defaultStyle.radioWrap} onPress={() => radioChangeHandler(key)}>
        <View style={defaultStyle.radioCircleWrap}>
          {selectIndex === key && (<View style={defaultStyle.radioCircle}></View>)}
        </View>
        <Text>{name}</Text>
      </Pressable>
    </View>
    ))
  )
}

export default RadioInput
