import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import Icons from '@/icons';

import style from './style';
import { fontStyleCreator } from "@/utils/fonts";
import { Colors } from "@/constants/theme";

const Event = ({ navigation }) => {
  const { t } = useTranslation();

  const EVENT_HEADER_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    weight: 'bold',
    size: 20,
  });
  const EVENT_DISCRIPT_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 14,
  });
  const EVENT_DATE_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 12,
  });

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.event')} />
      <ScrollView horizontal={false} style={{ flex: 1, width: '100%' }}>
        <View style={style.eventPanel}>
          <Text style={[EVENT_HEADER_FONT, { marginBottom: 8 }]}>MDI 토큰 결제시 할인 이벤트</Text>
          <Text style={[EVENT_DISCRIPT_FONT, { marginBottom: 30 }]}>새로운 결제방식으로 각종 할인혜택을 받으세요!</Text>
          <Text style={[EVENT_DATE_FONT]}>2022.11.14 ~ 2023.11.14</Text>
        </View>
        <View style={style.contentWrap}>
          <Text style={{ textAlign: 'center' }}>등록된 이벤트가 없습니다.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Event;
