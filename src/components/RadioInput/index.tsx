import * as React from "react";
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Colors} from "@/constants/theme";

/**
 * RadioInput
 * @param {string} name
 * @param {boolean} selected
 * @param {React.ComponentState} response - 선택 정보를 반환할 React state
 * @param {number} index - 선택된 인데스
 * @comment 라디오 버튼 공용 컴포넌트입니다.
 */
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
