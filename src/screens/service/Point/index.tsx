import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import Icons from '@/icons';

import style from './style';
import { fontStyleCreator } from "@/utils/fonts";

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const FONT_BASIC_BLACK = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
      <BoxDropShadow
        color={
          Platform.OS === 'ios'
            ? Colors.Medicle.Gray.SemiLight
            : Colors.Medicle.Gray.Standard
        }
        offset={[0, 7]}
        elevation={10}
        opacity={0.95}
        radius={10}
        style={[style.pointWrap]}>
        <View style={[style.flexRow]}>
          <Text>메디클 포인트</Text>
          <TouchableOpacity style={style.infoButton}>
            <Text style={FONT_BASIC_BLACK}>이용안내</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.flexRow, { marginVertical: 15 }]}>
          <Icons name="mdiIcon" />
          <Text style={[style.point]}>{0}원</Text>
        </View>
        <Text style={style.pointText}>적립 예정 포인트</Text>
        <View style={[style.flexRow, { justifyContent: 'space-between' }]}>
          <Text>{0}원</Text>
          <TouchableOpacity style={style.chargeButton}>
            <Text style={FONT_BASIC_BLACK}>충전하기</Text>
          </TouchableOpacity>
        </View>
      </BoxDropShadow>
      <View style={style.historyWrap}>
        <View style={[style.searchBar]}>
          <View style={style.flexRow}>
            <Text>거래내역</Text>
            <Text>최근 1년</Text>
          </View>
          <TouchableOpacity>
            <Icons name="arrowDown" />
          </TouchableOpacity>
        </View>
        {/*<FlatList data={} renderItem={}>*/}

        {/*</FlatList>*/}
        <View style={style.histories}>
          <Text>사용 포인트 내역이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
