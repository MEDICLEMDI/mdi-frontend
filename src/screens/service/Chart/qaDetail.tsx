import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import Accordion from '@/components/Accordion';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import {
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_18,
  STANDARD_GRAY_14,
} from '@/constants/fonts';
import { Row } from '@/layout';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id } = route.params;
  const [item, setItem] = React.useState();

  React.useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    await getQaDetail();
  };

  const getQaDetail = async () => {
    try {
      const res = await api.getQaDetail({ id: id });
      setItem(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <View style={style.content} />
      <ScrollView style={style.content}>
        <Text style={[DARK_GRAY_BOLD_14, style.status]}>문의 내역</Text>
        <BoxDropShadow style={style.itemBox}>
          <Accordion isOpen={true} style={{ marginBottom: 20 }}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(item?.date).format('YYYY.MM.DD')}
                <Text style={STANDARD_GRAY_14}>
                  &nbsp;&nbsp;예약자 정보
                </Text>
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={{ paddingVertical: 10, }}>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>성명</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.name}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>연락처</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.phone}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>이메일</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.email}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>접수 일시</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {dayjs(item?.date).format('YYYY.MM.DD')}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>요청사항</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.content}
                  </Text>
                </Row>
              </View>
            </Accordion.Body>
          </Accordion>
          <MedicleButton buttonStyle={style.button} text={'문의 취소'} />
        </BoxDropShadow>
        <BoxDropShadow style={style.itemBox}>
          <Accordion isOpen={false}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(item?.date).format('YYYY.MM.DD')}
                <Text style={STANDARD_GRAY_14}>
                  &nbsp;&nbsp;판매자 정보
                </Text>
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={{ paddingVertical: 10, }}>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>병원</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.hospital_name}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>대표자명</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.hospital_doctor}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>사업자번호</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.trader_number}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>증상/요청</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.hospital_phone}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>소재지</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.address}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>연락처</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.hospital_phone}
                  </Text>
                </Row>
              </View>
            </Accordion.Body>
          </Accordion>
        </BoxDropShadow>
      </ScrollView>
    </SafeAreaView>
  );
};
