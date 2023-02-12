import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, Text, View } from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const FONT_GRAY = fontStyleCreator({ color: Colors.Medicle.Font.Gray.Light });
  const FONT_BLACK_B = fontStyleCreator({
    color: Colors.Medicle.Black,
    weight: 'bold',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.doc2')} />
      <View style={{ paddingHorizontal: 30 }}>
        <BoxDropShadow
          color={
            Platform.OS === 'ios'
              ? Colors.Medicle.Gray.SemiLight
              : Colors.Medicle.Gray.Standard
          }
          offset={[0, 7]}
          elevation={5}
          opacity={0.95}
          radius={20}
          style={style.docCard}>
          <View>
            <Text style={[FONT_BLACK_B]}>{t('setting.doc2')}</Text>
            <Text style={[FONT_GRAY]}>[현행] 2022년 11월 15일 시행안</Text>
          </View>
        </BoxDropShadow>
      </View>
    </SafeAreaView>
  );
};
