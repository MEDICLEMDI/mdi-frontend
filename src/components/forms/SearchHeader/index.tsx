import * as React from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '@/constants/theme';
import Icons from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

const SearchBar = ({
  onPress,
  title,
  period,
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  period: string;
}) => {
  const SEARCH_TYPE_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    weight: 'bold',
    size: 14,
  });
  const DATE_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Standard,
    size: 10,
  });

  return (
    <View style={[style.searchBar]}>
      <View style={[style.searchCondition]}>
        <Text style={SEARCH_TYPE_FONT}>{title}</Text>
        <Text style={[DATE_FONT, { marginLeft: 10 }]}>{period}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Icons name="menu" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
