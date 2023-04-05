import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import {
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
  DARK_GRAY_10, DARK_GRAY_12, DARK_GRAY_BOLD_12,
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_16,
  ORANGE_BOLD_12,
  STANDARD_GRAY_10,
  STANDARD_GRAY_12,
  WHITE_BOLD_12,
} from '@/constants/fonts';
import Icon from '@/icons';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { convertPrice } from '@/utils/utilities';

import Calendar from '../../../Calendar';
import style from './style';

const ProductDetail = ({ navigation, route }) => {
  const { id } = route.params;

  const [itemData, setItemData] = React.useState<any>();
  const [userInfo, setUserInfo] = React.useState<any>();
  const [date, setDate] = React.useState({ from: '' });
  const [time, setTime] = React.useState('');
  const [timeKey, setTimeKey] = React.useState(0);
  const [dateType, setDateType] = React.useState('from');
  const [visible, setVisible] = React.useState(false);

  const [documentAgree, setDocumentAgree] = React.useState({
    doc1: false,
    doc2: false,
  });
  const [payButtonDisabled, setPayButtonDisabled] = React.useState(true);

  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {
    setPayButtonDisabled(
      !(
        documentAgree.doc1 &&
        documentAgree.doc2 &&
        date.from !== '' &&
        time !== ''
      )
    );
  }, [documentAgree, date, time]);

  const initialize = async () => {
    await getUserInfo();
    await getItemDetail();
    // setDate({ from: '2023-00-00' })
  };

  const getUserInfo = async () => {
    const data = await AsyncStorage.getItem('@User');
    if (typeof data === 'string') {
      setUserInfo(JSON.parse(data));
    }
  };

  const getItemDetail = async () => {
    try {
      const data = await api.getProductInfo(id);
      console.log(data);
      setItemData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const agreeAll = () => {
    setDocumentAgree({
      doc1: true,
      doc2: true,
    });
  };

  const timeList = [
    { start: '09:00', end: '10:00' },
    { start: '11:00', end: '12:00' },
    { start: '13:00', end: '14:00' },
    { start: '15:00', end: '16:00' },
    { start: '17:00', end: '18:00' },
  ];

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title="예약하기" />
      <ScrollView style={style.container}>
        <View>
          <Image
            source={{ uri: itemData?.main_image }}
            resizeMode="cover"
            style={style.image}
          />
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text />
          <Text style={DARK_GRAY_BOLD_14}>
            {convertPrice(itemData?.price)}
            &nbsp;
            <Text style={STANDARD_GRAY_10}>&nbsp; VAT | 마취/사후관리비 포함</Text>
          </Text>
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
            예약자 정보
          </Text>
          <View style={{ marginTop: 20 }}>
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
          <View style={{ marginTop: 20 }}>
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
              setDocumentAgree({ ...documentAgree, doc1: !documentAgree.doc1 })
            }>
            <Text style={style.checkboxLabel}>[필수]개인정보 수집 동의</Text>
          </CustomCheckbox>
          <CustomCheckbox
            selected={documentAgree.doc2}
            style={style.checkbox}
            onPress={() =>
              setDocumentAgree({ ...documentAgree, doc2: !documentAgree.doc2 })
            }>
            <Text style={style.checkboxLabel}>[필수]개인정보 제공 동의</Text>
          </CustomCheckbox>
          <Text style={[STANDARD_GRAY_12, style.reserveComment]}>
            예약 서비스 이용시 필요한 개인정보 수집 및 제3자 제공규정을
            확인하였으며 이에 동의합니다.
          </Text>
        </View>
        <View style={style.itemDetailWrap}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <BoxDropShadow>
              <Text style={ORANGE_BOLD_12}>
                {date.from} {time}
              </Text>
              <Text style={DARK_GRAY_BOLD_16}>{itemData?.hospital_name}</Text>
              <Text style={DARK_GRAY_10}>
                {itemData?.hospital_address.split(' ')[0]}
                &nbsp;|&nbsp;
                {itemData?.hospital_address.split(' ')[1]}
              </Text>
              <View style={style.hr} />
              <Row justify="space-between">
                <Text>진료 항목</Text>
                <Text style={DARK_GRAY_BOLD_14}>
                  {itemData?.product_name} {convertPrice(itemData?.price)}
                </Text>
              </Row>
            </BoxDropShadow>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Row align="center" justify="space-between">
        <MedicleButton
          textStyle={STANDARD_GRAY_10}
          buttonStyle={[style.button, style.wishButton]}
          iconName="heart"
          iconProps={{ stroke: '#CECECE' }}
          text="위시리스트"
        />
        <MedicleButton
          buttonStyle={[style.button, style.FAQButton]}
          onPress={() =>
            navigation.navigate(Routes.HOSPITAL_CONTACT, { itemData: itemData })
          }
          textStyle={WHITE_BOLD_12}
          text="진료 문의하기"
        />
        <MedicleButton
          buttonStyle={[style.button, style.PayButton]}
          onPress={() =>
            navigation.navigate(Routes.HOSPITAL_PAYMENT, { itemData: itemData })
          }
          textStyle={DARK_GRAY_BOLD_12}
          disabled={payButtonDisabled}
          text="앱에서 결제하기"
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
              <MedicleInput
                style={style.dataPickerInput}
                direction="row"
                rightInputNode={<Icon name="calendar" />}
                editable={false}
                clearButton={false}
                onPressIn={() => setDateType('from')}
                value={date.from}
              />
              <Spacing size={10} />
              <MedicleInput
                style={style.dataPickerInput}
                direction="row"
                rightInputNode={<Icon name="clock" />}
                editable={false}
                clearButton={false}
                onPressIn={() => setDateType('time')}
                value={time}
              />
            </Row>
            {dateType === 'from' ? (
              <View style={style.calendarWrap}>
                <Calendar
                  date={date}
                  dateResponse={setDate}
                  dateType={dateType}
                />
              </View>
            ) : (
              <View style={style.timeWrap}>
                {timeList.map(({ start, end }, key) => (
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
                        key === timeKey ? DARK_GRAY_BOLD_14 : STANDARD_GRAY_12
                      }>
                      {start} ~ {end}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
};

export default ProductDetail;
