import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import Header from '@/components/Header';
import Icons from '@/icons';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <View style={style.content}>
        <View style={[style.searchBar]}>
          <View style={style.flexRow}>
            <Text>거래내역</Text>
            <Text>최근 1년</Text>
          </View>
          <TouchableOpacity>
            <Icons name="arrowDown" />
          </TouchableOpacity>
        </View>
        <View style={style.noData}>
          <Text>진료내역이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
