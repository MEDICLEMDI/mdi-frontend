import * as React from 'react';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

const Tab = ({
  data,
  tabStyle,
  buttonStyle,
  textStyle,
  tabSelectedStyle,
  index,
  response,
}:{
  readonly data: {label: string}[];
  readonly tabStyle?: ViewStyle | ViewStyle[];
  readonly buttonStyle?: ViewStyle | ViewStyle[];
  readonly textStyle?: TextStyle | TextStyle[];
  readonly tabSelectedStyle: [TextStyle, ViewStyle];
  readonly index: number;
  response?: React.ComponentState;
}) => {
  const selected_style_text = tabSelectedStyle[0];
  const selected_style_tab = tabSelectedStyle[1];

  return (
    <View style={tabStyle}>
      {
        data.map(({label}, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => response(key)}
            style={[buttonStyle, index === key && selected_style_tab]}>
            <Text style={[textStyle, index === key && selected_style_text]}>{label}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default Tab;
