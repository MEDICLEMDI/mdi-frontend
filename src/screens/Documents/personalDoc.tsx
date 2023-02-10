import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, Text, View } from "react-native";

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';

import style from './style';

export default () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.doc2')} />
      <View style={{ paddingHorizontal: 30 }}>
        <BoxDropShadow
          color={
            Platform.OS === 'ios'
              ? Colors.Medicle.Grey.Light
              : Colors.Medicle.Grey.Standard
          }
          offset={[0, 7]}
          elevation={5}
          opacity={0.95}
          radius={20}
          style={style.docCard}>
          <View>
            <Text>{t('setting.doc2')}</Text>
            <Text>[현행] 2022년 11월 15일 시행안</Text>
          </View>
        </BoxDropShadow>
      </View>
    </SafeAreaView>
  );
};
