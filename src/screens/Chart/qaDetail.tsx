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
import { IQaDetail, responseDTO } from '@/interfaces/api';
import { Row } from '@/layout';

import style from './style';
import useCustomToast from '@/hooks/useToast';
import LoadingModal from '@/components/LoadingModal';
import Routes from '@/navigation/Routes';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id } = route.params;
  const [item, setItem] = React.useState<IQaDetail | undefined>(undefined);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { showToast } = useCustomToast();
  const [loading, setLoading] = React.useState(false);

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

  const handleCancelQa = async () => {
    setLoading(true);
    const request = {
      id: id,
    };

    try {
      const response: responseDTO = await api.cancelQa(request);
      if (response.result) {
        showToast('문의가 취소되었습니다.');
        navigation.navigate(Routes.CHART, {index: 1});
      } else {
        throw 'error';
      }
    } catch (err) {
      showToast('처리중 오류가 발생하였습니다.');
    } finally {
      setModalVisible(false);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <View style={style.content} />
      <ScrollView style={[style.content, { paddingHorizontal: 25 }]}>
        <Text style={[DARK_GRAY_BOLD_14, style.status]}>문의 내역</Text>
        <BoxDropShadow style={style.itemBox}>
          <Accordion isOpen={true} style={{ marginBottom: 20 }}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(item?.date).format('YYYY.MM.DD')}
                <Text style={STANDARD_GRAY_14}>&nbsp;&nbsp;문의 내역</Text>
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={{ paddingVertical: 10 }}>
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
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>접수일시</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {dayjs(item?.date).format('YYYY.MM.DD')}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>문의내용</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.content}
                  </Text>
                </Row>
                {item?.status === 5 && (
                  <Row style={{ marginVertical: 5 }}>
                    <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>
                      답변내용
                    </Text>
                    <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                      {item?.reply_content}
                    </Text>
                  </Row>
                )}
              </View>
            </Accordion.Body>
          </Accordion>
          {item?.status === 4 && (
            <MedicleButton
              buttonStyle={style.button}
              text={'문의 취소'}
              onPress={() => setModalVisible(true)}
            />
          )}
        </BoxDropShadow>
        <BoxDropShadow style={style.itemBox}>
          <Accordion isOpen={false}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(item?.date).format('YYYY.MM.DD')}
                <Text style={STANDARD_GRAY_14}>&nbsp;&nbsp;판매자 정보</Text>
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
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>대표자명</Text>
                  <Text style={[DARK_GRAY_BOLD_14, { flex: 2 }]}>
                    {item?.hospital_doctor}
                  </Text>
                </Row>
                <Row style={{ marginVertical: 5 }}>
                  <Text style={[STANDARD_GRAY_14, { flex: 1 }]}>
                    사업자번호
                  </Text>
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
      <LoadingModal visible={loading} />
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
                  정말 문의를 취소하시겠습니까?
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
                onPress={handleCancelQa}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
