import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import Header from '@/components/Header';

import style from './style';
import BoxDropShadow from "@/components/BoxDropShadow";
import MedicleButton from "@/buttons/MedicleButton";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";
import Accordion from "@/components/Accordion";
import {Row} from "@/layout";
import Routes from "@/navigation/Routes";

export default ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const { chartType } = route.params;

  const DETAIL_HEADER_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  })
  const DETAIL_LABEL_FONT = fontStyleCreator({
    size: 14,
    color: Colors.Medicle.Font.Gray.Standard,
  })
  const DETAIL_CONTENT_FONT = fontStyleCreator({
    size: 14,
    color: Colors.Medicle.Font.Gray.Dark,
  })


  const data = [
    { name: '', price: 90000 },
  ]

  const detail = [
    { label: 'A', content: 'medicalState' },
    { label: 'B', content: 'medicalState' },
    { label: 'C', content: 'medicalState' },
    { label: 'D', content: 'medicalState' },
    { label: 'E', content: 'medicalState' },
    { label: 'F', content: 'medicalState' },
    { label: 'G', content: 'medicalState' },
    { label: 'H', content: '오른쪽 상단 어금니 충치 치료 완료' },
  ]

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')}/>
      <View style={style.content}>
        <Text style={style.detailHeader}>{chartType}</Text>
        {/*<View style={style.noData}>*/}
        {/*  <Text>진료내역이 없습니다.</Text>*/}
        {/*</View>*/}
      </View>
      <ScrollView style={style.content}>
        {
          data.map(({ name, price }, key) => (
            <BoxDropShadow key={key} style={style.detailWrap}>
              <Accordion isOpen={true}>
                <Accordion.Header>
                  <Text style={[DETAIL_HEADER_FONT]}>TEST</Text>
                </Accordion.Header>
                <Accordion.Body>
                  <View style={{ marginTop: 10 }}>
                    {
                    detail.map(({ label, content }, key) => (
                      <Row
                        key={key}
                        justify='space-between'
                        align='flex-start'
                        style={style.detailRow}>
                        <Text style={[style.detailText, style.detailTextLabel, DETAIL_LABEL_FONT]}>{label}</Text>
                        <Text style={[style.detailText, style.dentalTextContent, DETAIL_CONTENT_FONT]}>{content}</Text>
                      </Row>
                    ))
                    }
                    {/* 넘어오는 타입에 따라 버튼 이벤트, 텍스트 분기 */}
                    <MedicleButton
                      text="Test"
                      buttonStyle={[style.button, { marginTop: 20 }]}
                      onPress={() => navigation.navigate(Routes.REVIEW)}
                    />
                  </View>
                </Accordion.Body>
              </Accordion>
            </BoxDropShadow>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};
