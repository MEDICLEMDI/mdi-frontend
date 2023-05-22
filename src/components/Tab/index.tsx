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
import { FlatList } from 'react-native-gesture-handler';

const SELECTED_TAB_FONT = fontStyleCreator({
  size: 14,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});
const TAB_FONT = fontStyleCreator({
  size: 14,
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
  useScrollIndex = false,
}: {
  readonly data: any[];
  readonly index: number;
  readonly tabSelectedStyle?: [TextStyle, StyleProp<ViewStyle>];
  readonly tabStyle?: StyleProp<ViewStyle>;
  readonly buttonStyle?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
  response?: React.ComponentState;
  useScrollIndex?: boolean;
}) => {
  const selected_style_text = tabSelectedStyle[0];
  const selected_style_tab = tabSelectedStyle[1];

  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    scrollIndex();
  }, [])
  
  React.useEffect(() => {
    scrollIndex();
  }, [index])

  const scrollIndex = () => {
    if(useScrollIndex && data.length > 0) {
      flatListRef.current?.scrollToIndex({ animated: true, viewOffset: 1, index: index - data[0].id })
    }
  }

  const scrollToIndexFail = ({ index }: any) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ animated: true, viewOffset: 1, index: index })
    }, 1000)
  }

  return (
    <View style={tabStyle}>
      <FlatList
        ref={flatListRef}
        onScrollToIndexFailed={scrollToIndexFail}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => response(item.id)}
            style={[buttonStyle, Number(index) === Number(item.id) && selected_style_tab]}>
            <Text style={[textStyle, Number(index) === Number(item.id) && selected_style_text]}>
              {item.label ? item.label : item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Tab;
