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
import Icons from "@/icons";
import Accordion from "@/components/Accordion";

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
        <BoxDropShadow>
          <Accordion>
            <Accordion.Header>
              <Text style={[FONT_BLACK_B]}>{t('setting.doc1')}</Text>
              <Text style={[FONT_GRAY]}>[현행] 2022년 11월 15일 시행안</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text style={{ padding: 10 }}>
                {
  `[서비스 내용]
  저희 회사는 서비스 중간 공급책을 제공합니다. 이를 통해 사용자가 원하는 상품이나 서비스를 이용할 수 있도록 중간 과정을 관리해 드립니다.
  
  [책임]
  저희 회사는 서비스 중간 공급책을 제공하며, 중간 과정에서 발생하는 문제에 대해 책임을 지지 않습니다. 단, 중간 과정에서 저희의 고의 또는 중대한 과실이 있는 경우는 제외됩니다.
  
  [개인정보 보호]
  저희는 귀하의 개인정보를 존중하며, 개인정보 보호 정책에 따라 귀하의 개인정보를 보호합니다.
  
  [요금]
  저희 회사는 일부 서비스에 대해 수수료를 부과할 수 있습니다. 서비스 이용 전에 해당 요금을 알려드리며, 이를 확인한 후 서비스를 이용해 주시기 바랍니다.
  
  [서비스 중단]
  언제든지 어떤 이유로든, 사전 통보 없이 회사의 서비스를 중단할 수 있습니다.
  
  [지적재산권]
  저희 회사가 제공하는 모든 콘텐츠는 회사의 소유이며, 무단으로 복제, 배포, 수정하는 행위는 금지됩니다.
  
  [약관 변경]
  회사는 필요한 경우 언제든지 이용약관을 변경할 수 있습니다. 변경된 약관은 서비스를 통해 공지됩니다.
  
  본 약관에 대해 궁금하신 점이나 문의사항이 있으시면 언제든지 저희 회사로 문의해 주시기 바랍니다.`
                }
              </Text>
            </Accordion.Body>
          </Accordion>
        </BoxDropShadow>
      </View>
    </SafeAreaView>
  );
};
