import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import Icons from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

const SearchBar = ({ onPress }) => {
  const { t } = useTranslation();
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
        <Text style={SEARCH_TYPE_FONT}>{t('input.all')}</Text>
        <Text style={[DATE_FONT, { marginLeft: 10 }]}>
          {t('input.pastYear')}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Icons name="menu" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
