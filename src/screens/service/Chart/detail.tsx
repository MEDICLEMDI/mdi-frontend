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
import Routes from '@/navigation/Routes';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const { id } = route.params;
  const chartType = ['진료 예약', '진료 완료', '예약 취소', '문의 내역'];
  const [item, setItem] = React.useState();

  React.useEffect(() => {
    initialize();
  }, [isFocused]);

  const initialize = async () => {
    await getAppointmentDetail();
  };

  const getAppointmentDetail = async () => {
    try {
      const res = await api.getAppointmentDetail(id);
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
        <Text style={[DARK_GRAY_BOLD_14, style.status]}>
          {chartType[item?.status - 1]}
        </Text>
        <BoxDropShadow>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(item?.date).format('YYYY.MM.DD')}
                <Text style={STANDARD_GRAY_14}>
                  &nbsp;&nbsp;{chartType[item?.status - 1]}
                </Text>
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={{ paddingVertical: 10 }}>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>병원</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.hospital_name}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>담당의사</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.doctor_name}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>진료 대상</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.patient}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>증상/요청</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.symptom}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>접수 일시</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {dayjs(item?.appointment_date).format('YYYY.MM.DD')}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>진료 완료</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {dayjs(item?.end_date).format('YYYY.MM.DD')}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>진료비</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {convertNumberLocale(item?.price)}
                  </Text>
                </Row>
              </View>
            </Accordion.Body>
          </Accordion>
          {item?.status == 1 && (
            <MedicleButton
              buttonStyle={[style.button, { marginTop: 20 }]}
              text={'예약 취소'}
            />
          )}
          {item?.status == 2 && !item?.is_review && (
            <MedicleButton
              buttonStyle={[style.button, { marginTop: 20 }]}
              text={'리뷰 작성'}
              onPress={() =>
                navigation.navigate(Routes.REVIEW, {
                  appointment_id: item?.id,
                  company_id: item?.company_id,
                  product_id: item?.product_id,
                  user_id: item?.user_id,
                })
              }
            />
          )}
        </BoxDropShadow>
      </ScrollView>
    </SafeAreaView>
  );
};
