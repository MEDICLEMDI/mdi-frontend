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
  const FONT_GRAY = fontStyleCreator({ color: Colors.Medicle.Font.Gray.Light });
  const FONT_BLACK_B = fontStyleCreator({
    color: Colors.Medicle.Black,
    weight: 'bold',
  });

  const data = [
    { title: '메디클 이용약관' },
    { title: '위치기반 서비스 이용약관' },
  ];

  const [tabIndex, setTabIndex] = React.useState(0);

  const tabChangeListener = (index: number) => {
    setTabIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.document')} />
      <View style={{ paddingHorizontal: 30 }}>
        <View style={style.documentTabWrap}>
          {data.map(({ title }, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => tabChangeListener(key)}
              style={[
                style.documentTabButton,
                data.length === key + 1
                  ? style.borderRadiusRight
                  : style.borderRadiusLeft,
                tabIndex === key ? style.tabActive : null,
              ]}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                  },
                  tabIndex === key
                    ? fontStyleCreator({
                        size: 12,
                        color: Colors.Medicle.Font.Gray.Dark,
                        weight: 'bold',
                      })
                    : fontStyleCreator({
                        size: 12,
                        color: Colors.Medicle.Font.Gray.Standard,
                      }),
                ]}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <BoxDropShadow
          color={
            Platform.OS === 'ios'
              ? Colors.Medicle.Gray.SemiLight
              : Colors.Medicle.Gray.Standard
          }
          offset={[0, 7]}
          elevation={8}
          opacity={0.95}
          radius={20}
          style={style.docCard}>
          <View>
            <Text style={[FONT_BLACK_B]}>{t('setting.doc1')}</Text>
            <Text style={[FONT_GRAY]}>[현행] 2022년 11월 15일 시행안</Text>
          </View>
        </BoxDropShadow>
      </View>
    </SafeAreaView>
  );
};
