import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import Header from '@/components/Header';
import Icons from '@/icons';

import style from './style';
import { fontStyleCreator } from "@/utils/fonts";
import { Colors } from "@/constants/theme";

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const SUMMARY_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 18,
    weight: 'bold',
  });

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.receipt')} />
      <View style={style.contentWrap}>
        <View style={[style.searchBar]}>
          <View style={style.flexRow}>
            <Text>거래내역</Text>
            <Text>최근 1년</Text>
          </View>
          <TouchableOpacity>
            <Icons name="arrowDown" />
          </TouchableOpacity>
        </View>

        {/* 받아온 데이터를 이용하여 map으로 재구성해야함 */}
        <View style={style.summaryWrap}>
          <View style={style.summaryItemWrap}>
            <View style={[style.summaryItem, { backgroundColor: Colors.Medicle.Brown.SemiLight }]}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>전체</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>결제완료</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>취소완료</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>환불완료</Text>
          </View>
        </View>
        <View style={style.noData}>
          <Text>결제 목록이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
