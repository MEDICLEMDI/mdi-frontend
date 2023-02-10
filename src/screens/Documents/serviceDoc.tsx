import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const FONT_GREY = fontStyleCreator({ color: Colors.Medicle.Font.Grey.Light });
  const FONT_BLACK_B = fontStyleCreator({
    color: Colors.Medicle.Black,
    weight: 'bold',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.doc1')} />
      <View style={{ paddingHorizontal: 30 }}>
        <View style={style.documentTabWrap}>
          <TouchableOpacity onPress={() => null} style={style.documentTabButton}>
            <Text>메디클 이용약관</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null} style={style.documentTabButton}>
            <Text>위치기반 서비스 이용약관</Text>
          </TouchableOpacity>
        </View>
        <BoxDropShadow
          color={
            Platform.OS === 'ios'
              ? Colors.Medicle.Grey.Light
              : Colors.Medicle.Grey.Standard
          }
          offset={[0, 7]}
          elevation={8}
          opacity={0.95}
          radius={20}
          style={style.docCard}>
          <View>
            <Text style={[FONT_BLACK_B]}>{t('setting.doc1')}</Text>
            <Text style={[FONT_GREY]}>[현행] 2022년 11월 15일 시행안</Text>
          </View>
        </BoxDropShadow>
      </View>
    </SafeAreaView>
  );
};
