import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, SafeAreaView, Text, View } from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
import Accordion from "@/components/Accordion";

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
        <BoxDropShadow>
          <Accordion>
            <Accordion.Header>
              <Text style={[FONT_BLACK_B]}>{t('setting.doc2')}</Text>
              <Text style={[FONT_GRAY]}>[현행] 2022년 11월 15일 시행안</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text style={{ padding: 10 }}>
                {
                  `[개인정보의 수집 및 이용]
  회사는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
  
  수집한 개인정보는 서비스 제공, 계약 이행, 고객 관리, 서비스 개선 등 목적으로 이용됩니다.
  
  [개인정보의 보유 및 이용기간]
  회사는 개인정보를 수집시에 명시한 이용 목적을 달성한 경우 즉시 파기합니다.
  다만, 관계 법령에 따라 보존할 필요가 있는 경우, 회사는 해당 법령에서 정한 기간 동안 개인정보를 보관합니다.
  
  [개인정보의 제3자 제공]
  회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다.
  그러나, 관계 법령에서 정한 경우나, 이용자의 동의를 받은 경우에는 제3자에게 개인정보를 제공할 수 있습니다.
  
  [개인정보의 파기]
  회사는 개인정보의 수집 및 이용목적이 달성된 경우, 개인정보 보유 및 이용기간이 종료된 경우, 이용자의 동의 철회 등 해당 개인정보가 불필요하게 된 경우 즉시 파기합니다.
  개인정보보호를 위한 기술적/관리적 대책
  
  회사는 이용자의 개인정보를 안전하게 관리하기 위해 기술적/관리적 대책을 시행합니다.
  개인정보보호 담당자의 지정, 정기적인 교육, 접근 제한 등의 조치를 통해 개인정보를 보호합니다.
  `
                }
              </Text>
            </Accordion.Body>
          </Accordion>
        </BoxDropShadow>
      </View>
    </SafeAreaView>
  );
};
