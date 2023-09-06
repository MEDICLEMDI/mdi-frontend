import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Close from '@/assets/images/close.png';
import MedicleButton from '@/buttons/MedicleButton';
import Accordion from '@/components/Accordion';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import {
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_18,
  STANDARD_GRAY_14,
} from '@/constants/theme';
import { IAppointmentDetail, ResponseDTO } from '@/interfaces/api';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';
import useCustomToast from '@/hooks/useToast';

export default ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const { id } = route.params;
  const chartType = [
    '진료 예약', // 1
    '진료 완료', // 2
    '취소 신청중', // 3
    '취소 완료', // 4
    '문의 내역', // 5
  ];
  const [item, setItem] = React.useState<IAppointmentDetail>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { showToast } = useCustomToast();

  React.useEffect(() => {
    initialize();
  }, [isFocused]);

  const initialize = async () => {
    await getAppointmentDetail();
  };

  
  /**
   * 유저 예약 상세정보를 가져오기
   */
  const getAppointmentDetail = async () => {
    try {
      const res = await api.getAppointmentDetail(id);
      setItem(res);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 예약 취소 프로세스
   */
  const handleCancelAppointment = async () => {
    setLoading(true);
    const request = {
      id: id,
    };
    try {
      const response: ResponseDTO<IAppointmentDetail> = await api.cancelAppointment(request);
      if (response.result) {
        setItem(response.data);
        showToast('예약이 취소되었습니다.')
        setLoading(false);
        navigation.navigate(Routes.CHART, {index: 0});
      } else {
        throw 'error';
      }
    } catch (err) {
      showToast('처리중 오류가 발생하였습니다.')
    } finally {
      setLoading(false);
      setModalVisible(false);
    }

  };

  if (!item) {
    return <></>;
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <ScrollView>
        <Text style={[DARK_GRAY_BOLD_14, style.status, {marginHorizontal: 25, }]}>
          {chartType[item?.status]}
        </Text>
        <BoxDropShadow style={{ marginHorizontal: 25, }}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(item?.appointment_data).format('YYYY.MM.DD')}
                <Text style={STANDARD_GRAY_14}>
                  &nbsp;&nbsp;{chartType[item?.status]}
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
                    {dayjs(item?.create_date).format('YYYY.MM.DD')}
                  </Text>
                </Row>
                {![2, 3].includes(item?.status) && (
                  <Row style={{ marginVertical: 5 }}>
                    <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>
                      진료 완료
                    </Text>
                    <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                      {dayjs(item?.end_date).format('YYYY.MM.DD')}
                    </Text>
                  </Row>
                )}
                {/* <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>진료비</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {convertNumberLocale(item?.price)}
                  </Text>
                </Row> */}
              </View>
            </Accordion.Body>
          </Accordion>
          {item?.status === 0 && (
            <MedicleButton
              buttonStyle={[style.button, { marginTop: 20 }]}
              text={'예약 취소'}
              onPress={() => setModalVisible(true)}
            />
          )}
          {item?.status === 1 && !item?.is_review && (
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
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={style.modal}>
          <View style={style.modalContainer}>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={style.modalHeader}>
                <View style={style.modalHeaderCenter}>
                  <Text style={style.modalTitle}>주의</Text>
                </View>
                <TouchableOpacity
                  style={style.modalHeaderRight}
                  onPress={() => setModalVisible(false)}>
                  <Image style={style.modalCloseButton} source={Close} />
                </TouchableOpacity>
              </View>
              <View style={style.modalContent}>
                <Text style={style.modalText}>
                  정말 예약을 취소하시겠습니까?
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
              <MedicleButton
                textStyle={style.modalCancelText}
                buttonStyle={style.modalCancelButton}
                text="취소"
                onPress={() => setModalVisible(false)}
              />
              <MedicleButton
                buttonStyle={style.modalCheckButton}
                text="계속"
                onPress={handleCancelAppointment}
              />
            </View>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};
