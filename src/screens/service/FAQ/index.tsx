import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import Header from '@/components/Header';
import Icon from '@/icons';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.faq')} />
      <View style={style.content}>
        <View style={style.noData}>
          <Text>등록된 FAQ가 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
