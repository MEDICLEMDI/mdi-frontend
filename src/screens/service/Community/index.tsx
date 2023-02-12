import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import Header from '@/components/Header';
import Icons from '@/icons';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <ScrollView horizontal={false}>
        <View style={style.listWrap}>
          <Icons name="refresh" />
          <Text>{t('comingSoon')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
