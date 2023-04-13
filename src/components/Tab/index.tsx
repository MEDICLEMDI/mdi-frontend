import * as React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';

const SELECTED_TAB_FONT = fontStyleCreator({
  size: 16,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});
const TAB_FONT = fontStyleCreator({
  size: 16,
  color: Colors.Medicle.Font.Gray.Standard,
});
const defaultStyle = {
  borderBottomWidth: 3,
  borderBottomColor: Colors.Medicle.Brown.Standard,
};
const Tab = ({
  data,
  tabStyle,
  buttonStyle,
  textStyle = TAB_FONT,
  tabSelectedStyle = [SELECTED_TAB_FONT, defaultStyle],
  index,
  response,
}: {
  readonly data: any[];
  readonly index?: number | undefined;
  readonly tabSelectedStyle?: [TextStyle, StyleProp<ViewStyle>];
  readonly tabStyle?: StyleProp<ViewStyle>;
  readonly buttonStyle?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
  response?: React.ComponentState;
}) => {
  const selected_style_text = tabSelectedStyle[0];
  const selected_style_tab = tabSelectedStyle[1];

  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (index !== undefined) {
      setSelected(index - 1);
    }
  }, [index]);

  return (
    <View style={tabStyle}>
      {data.map((prop, key) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            setSelected(key);
            response(prop.index ? prop.index : key);
          }}
          style={[buttonStyle, selected === key && selected_style_tab]}>
          <Text style={[textStyle, selected === key && selected_style_text]}>
            {prop.label ? prop.label : prop.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tab;
