import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { CustomModal } from '@/components/Modals';
import Spacing from '@/components/Spacing';
import {
  DARK_GRAY_BOLD_14,
  STANDARD_GRAY_10,
  STANDARD_GRAY_12,
  DARK_GRAY_BOLD_16,
  WHITE_BOLD_12,
  DARK_GRAY_BOLD_12,
  DARK_GRAY_12,
  ORANGE_BOLD_16,
  DARK_GRAY_10,
} from '@/constants/theme';
import Icon from '@/icons';
import { IProductDetail, ResponseDTO } from '@/interfaces/api';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { convertPrice } from '@/utils/utilities';

import Calendar from '../../components/Calendar';
import style from '../Hospital/style';
import { dateSetup } from '@/utils/dates';
import Config from 'react-native-config';
import { getStorageData } from '@/utils/localStorage';
import useCustomToast from '@/hooks/useToast';
import { textEllipsis } from '@/utils/strings';

const ProductDetail = ({ navigation, route }: any) => {
  const { id } = route.params;
  const { IMAGESERVER_PREFIX } = Config;

  const [itemData, setItemData] = React.useState<IProductDetail>();
  const [userInfo, setUserInfo] = React.useState<any>();
  const [date, setDate] = React.useState({ from: '', to: '' }); // 캘린더 기본양식이기 떄문에 from, to 두개를 사용하지만 실제로는 to만 사용
  const [time, setTime] = React.useState('시간 선택'); //
  const [timeKey, setTimeKey] = React.useState(0);
  const [dateType, setDateType] = React.useState('to'); 
  const [visible, setVisible] = React.useState(false); // 시간선택 모달 보이기/숨기기
  const [timeTable, setTimeTable] = React.useState<any>([]); // 병원 운영시간
  const { showToast } = useCustomToast();

  const [documentAgree, setDocumentAgree] = React.useState({
    doc1: false,
    doc2: false,
  });
  const [payButtonDisabled, setPayButtonDisabled] = React.useState(true);

  React.useEffect(() => {
    initialize();
  }, []);

  /**
   * 상태에 따라 앱에서 결제하기 버튼 잠금,해제
   */
  React.useEffect(() => {
    setPayButtonDisabled(
      !(
        documentAgree.doc1 &&
        documentAgree.doc2 &&
        date.from !== '' &&
        time !== '시간 선택'
      )
    );
  }, [documentAgree, date, time]);

  React.useEffect(() => {}, [itemData]);

  /**
   * 화면 초기화
   */
  const initialize = async () => {
    await getUserInfo();
    await getItemDetail();
    setDate(dateSetup());
  };

  /**
   * 유저정보 가져오기
   */
  const getUserInfo = async () => {
    const data = await getStorageData('@User');
    setUserInfo(data);
  };

  /**
   * 상품 상세정보 가져오기
   */
  const getItemDetail = async () => {
    try {
      const data = await api.getProductInfo(id);
      setItemData(data);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 약관 모두 동의 
   */
  const agreeAll = () => {
    setDocumentAgree({
      doc1: !(documentAgree.doc1 && documentAgree.doc2),
      doc2: !(documentAgree.doc1 && documentAgree.doc2),
    });
  };

  /**
   * 병원 운영시간 가져오기
   */
  const timetableHandler = async () => {
    try {
      const selectedDate = new Date(date.to);
      let dayOfWeek = selectedDate.getDay();

      const data = await api.getTimetable(
        Number(itemData?.company_id),
        dayOfWeek
      );
      if (data !== null) {
        const { ct_work_start, ct_work_end, ct_break_start, ct_break_end } =
          data;
        createTimeTable(
          ct_work_start,
          ct_work_end,
          ct_break_start,
          ct_break_end
        );
      } else {
        setTimeTable(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 백엔드에서 가져온 병원 운영시간 화면에 랜더링
   * @param startTime 
   * @param endTime 
   * @param startBreakTime 
   * @param endBreakTime 
   */
  const createTimeTable = (
    startTime: string,
    endTime: string,
    startBreakTime?: string,
    endBreakTime?: string
  ) => {
    const newTimeTable = [];
    const start = Number(startTime.split(':')[0]);
    const end = Number(endTime.split(':')[0]);
    const breakStart = Number(startBreakTime?.split(':')[0]);
    const breakEnd = Number(endBreakTime?.split(':')[0]);

    for (let i = start; i <= end; i++) {
      if (i !== breakStart) {
        newTimeTable.push({
          start: `${Number(i)}:00`,
          end: `${Number(i + 1)}:00`,
        });
      }
    }
    setTime(`${start}:00 ~ ${start + 1}:00`);
    setTimeTable(newTimeTable);
  };

  if (userInfo) {
    return (
      <SafeAreaView style={style.container}>
        <Header goBack={true} title="예약하기" />
        <ScrollView style={style.container}>
          <View style={[style.imageBox, { marginHorizontal: 25 }]}>
            {itemData ? (
              <Image
                style={{ flex: 1, borderRadius: 10 }}
                source={{
                  uri: `${IMAGESERVER_PREFIX}${itemData?.main_image}`,
                }}
                resizeMode="contain"
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
          <View style={[style.itemDetailWrap, style.borderBottom]}>
            <Text style={[DARK_GRAY_BOLD_14, { marginBottom: 10 }]}>
              {itemData?.hospital_name}-{itemData?.product_name}
            </Text>
            <Text style={DARK_GRAY_BOLD_14}>
              {convertPrice(itemData?.discount_price)}
              &nbsp;
              <Text style={STANDARD_GRAY_10}>
                &nbsp; VAT | 마취/사후관리비 포함
              </Text>
            </Text>
          </View>

          <View style={[style.itemDetailWrap, style.borderBottom]}>
            <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
              예약자 정보
            </Text>
            <View>
              <MedicleInput
                style={style.input}
                label={<Text>예약자 성함</Text>}
                clearButton={false}
                value={userInfo?.name}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>연락처</Text>}
                clearButton={false}
                value={userInfo?.phone}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>이메일</Text>}
                clearButton={false}
                value={userInfo?.email}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>예약 일자</Text>}
                clearButton={false}
                value={`${date.from} (${time})`}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>요청사항</Text>}
                multiline={true}
                placeholder="치과 진료에 요청하실 내용을 작성해주세요."
              />
            </View>
          </View>
          <View style={[style.itemDetailWrap, style.borderBottom]}>
            <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
              판매자 정보
            </Text>
            <View>
              <MedicleInput
                style={style.input}
                label={<Text>상호명</Text>}
                clearButton={false}
                value={itemData?.hospital_name}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>대표자명</Text>}
                clearButton={false}
                value={itemData?.doctor_name}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>사업자번호</Text>}
                clearButton={false}
                value={itemData?.trader_number}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>소재지</Text>}
                clearButton={false}
                value={itemData?.hospital_address}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>연락처</Text>}
                clearButton={false}
                value={itemData?.hospital_phone}
                editable={false}
              />
            </View>
          </View>
          <View style={style.itemDetailWrap}>
            <CustomCheckbox
              selected={documentAgree.doc1 && documentAgree.doc2}
              onPress={() => agreeAll()}>
              <Text style={[style.checkboxLabel, DARK_GRAY_BOLD_14]}>
                약관 전체 동의하기
              </Text>
            </CustomCheckbox>
            <View style={style.hr} />
            <CustomCheckbox
              selected={documentAgree.doc1}
              style={style.checkbox}
              onPress={() =>
                setDocumentAgree({
                  ...documentAgree,
                  doc1: !documentAgree.doc1,
                })
              }>
              <Text style={style.checkboxLabel}>[필수]개인정보 수집 동의</Text>
            </CustomCheckbox>
            <CustomCheckbox
              selected={documentAgree.doc2}
              style={style.checkbox}
              onPress={() =>
                setDocumentAgree({
                  ...documentAgree,
                  doc2: !documentAgree.doc2,
                })
              }>
              <Text style={style.checkboxLabel}>[필수]개인정보 제공 동의</Text>
            </CustomCheckbox>
            <Text style={[STANDARD_GRAY_12, style.reserveComment]}>
              예약 서비스 이용시 필요한 개인정보 수집 및 제3자 제공규정을
              확인하였으며 이에 동의합니다.
            </Text>
          </View>
          <View style={style.itemDetailWrap}>
            <BoxDropShadow>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Text style={DARK_GRAY_BOLD_16}>희망 진료 일자</Text>
                <Text style={[ORANGE_BOLD_16, { marginBottom: 5 }]}>
                  {date.from} ({time})
                </Text>
                {/* <Text style={DARK_GRAY_BOLD_16}>{itemData?.hospital_name}</Text>
                <Text style={DARK_GRAY_10}>
                  {itemData?.hospital_address.split(' ')[0]}
                  &nbsp;|&nbsp;
                  {itemData?.hospital_address.split(' ')[1]}
                </Text> */}
                <View style={style.hr} />
                <Row justify="space-between">
                  {/* <Text>진료 항목</Text> */}
                  <Text style={DARK_GRAY_BOLD_14}>
                    {itemData && textEllipsis(itemData?.product_name, 15, 12)}
                    {/* {convertPrice(itemData?.discount_price)} */}
                  </Text>
                </Row>
              </TouchableOpacity>
            </BoxDropShadow>
          </View>
        </ScrollView>
        <Row align="center" justify="space-between">
          <MedicleButton
            buttonStyle={[style.button, style.FAQButton]}
            onPress={() =>
              navigation.navigate(Routes.PRODUCT_CONTACT, {
                itemData: itemData,
              })
            }
            textStyle={WHITE_BOLD_12}
            text="진료 문의하기"
          />
          <MedicleButton
            buttonStyle={[style.button, style.PayButton]}
            onPress={() =>
              navigation.navigate(Routes.PRODUCT_PAYMENT, {
                itemData: itemData,
                time: `${date.to} ${time.split('~')[0].trim()}`,
              })
            }
            textStyle={DARK_GRAY_BOLD_12}
            disabled={payButtonDisabled}
            // text="앱에서 결제하기"
            text="앱에서 에약하기"
          />
        </Row>
        <CustomModal
          visible={visible}
          onRequestClose={() => setVisible(false)}
          name="datePicker"
          modalDirection="center">
          <View style={style.datePickerModal}>
            <Row
              justify="space-between"
              align="center"
              style={style.datePickerHeader}>
              <Text style={DARK_GRAY_BOLD_16}>일정 선택</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Icon name="close" />
              </TouchableOpacity>
            </Row>
            <View style={style.container}>
              <Row justify="space-between" align="center">
                <TouchableOpacity
                  style={style.dataPickerInput}
                  onPress={() => setDateType('to')}>
                  <Row align="center" justify="space-between">
                    <Text style={DARK_GRAY_12}>{date.to}</Text>
                    <Icon name="calendar" />
                  </Row>
                </TouchableOpacity>
                <Spacing size={10} />
                <TouchableOpacity
                  style={style.dataPickerInput}
                  onPress={() => {
                    setDateType('time');
                    timetableHandler();
                  }}>
                  <Row align="center" justify="space-between">
                    <Text style={DARK_GRAY_12}>{time}</Text>
                    <Icon name="clock" />
                  </Row>
                </TouchableOpacity>
              </Row>
              {dateType === 'to' ? (
                <View style={style.calendarWrap}>
                  <Calendar
                    date={date}
                    dateResponse={setDate}
                    dateType={dateType}
                    initialDate={date.to}
                    minDate={new Date()}
                  />
                </View>
              ) : (
                <View style={style.timeWrap}>
                  {timeTable === null ? (
                    <Text>병원 휴무일 입니다.</Text>
                  ) : (
                    timeTable.map(({ start, end }, key) => (
                      <TouchableOpacity
                        key={key}
                        disabled={key === timeKey}
                        style={style.timeSelectItem}
                        onPress={() => {
                          setTimeKey(key);
                          setTime(`${start} ~ ${end}`);
                        }}>
                        <Text
                          style={
                            key === timeKey
                              ? DARK_GRAY_BOLD_14
                              : STANDARD_GRAY_12
                          }>
                          {start} ~ {end}
                        </Text>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              )}
            </View>
          </View>
        </CustomModal>
      </SafeAreaView>
    );
  }
};

export default ProductDetail;
