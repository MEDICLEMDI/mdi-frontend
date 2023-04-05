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
  CARD_HEADER,
  DARK_GRAY_14,
  DARK_GRAY_BOLD_14, DARK_GRAY_BOLD_18,
  STANDARD_GRAY_14,
} from '@/constants/fonts';
import { Row } from '@/layout';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id } = route.params;

  const [data, setData] = React.useState();

  React.useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    await getAppointmentDetail();
  };

  const getAppointmentDetail = async () => {
    try {
      const res = await api.getAppointmentDetail(id);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <View style={style.content} />
      <ScrollView style={style.content}>
        <BoxDropShadow>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(data?.end_date).format('YYYY.MM.DD')}
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <Row style={{ marginVertical: 5 }}>
                <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>병원</Text>
                <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                  {data?.hospital_name}
                </Text>
              </Row>
              <Row style={{ marginVertical: 5 }}>
                <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>담당의사</Text>
                <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                  {data?.doctor_name}
                </Text>
              </Row>
              <Row style={{ marginVertical: 5 }}>
                <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>진료 대상</Text>
                <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                  {data?.patient}
                </Text>
              </Row>
              <Row style={{ marginVertical: 5 }}>
                <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>증상/요청</Text>
                <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                  {data?.symptom}
                </Text>
              </Row>
              <Row style={{ marginVertical: 5 }}>
                <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>접수 일시</Text>
                <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                  {dayjs(data?.appointment_date).format('YYYY.MM.DD')}
                </Text>
              </Row>
              <Row style={{ marginVertical: 5 }}>
                <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>진료 완료</Text>
                <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                  {dayjs(data?.end_date).format('YYYY.MM.DD')}
                </Text>
              </Row>
              <Row style={{ marginVertical: 5 }}>
                <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>진료비</Text>
                <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                  {convertNumberLocale(data?.price)}
                </Text>
              </Row>
            </Accordion.Body>
          </Accordion>
          <MedicleButton text={'test'} />
        </BoxDropShadow>
      </ScrollView>
    </SafeAreaView>
  );
};
