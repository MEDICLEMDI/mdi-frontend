import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';

import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <View style={style.content}>
        <SearchBar onPress={() => console.log('test')} />
        <View style={style.noData}>
          <Text>진료내역이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
