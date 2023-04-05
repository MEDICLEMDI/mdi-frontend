import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import Accordion from '@/components/Accordion';
import api from '@/components/Api';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import {
  DARK_GRAY_BOLD_14,
  STANDARD_GRAY_10,
  STANDARD_GRAY_12,
} from '@/constants/fonts';
import { convertPrice } from '@/utils/utilities';

import style from './style';

export default ({ navigation, route }) => {
  const { itemData } = route.params;
  const [disabled, setDisabled] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState<any>();
  const [comment, setComment] = React.useState('');
  const [agrees, setAgrees] = React.useState({
    doc1: false,
    doc2: false,
  });

  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {
    const commentCounter = comment.trim().length >= 10;
    const bool = agrees.doc1 && agrees.doc2 && commentCounter;
    setDisabled(!bool);
  }, [comment, agrees]);

  const initialize = async () => {
    await getUserInfo();
  };

  const getUserInfo = async () => {
    const data = await AsyncStorage.getItem('@User');
    if (typeof data === 'string') {
      setUserInfo(JSON.parse(data));
    }
  };

  const submit = async () => {
    const data = {
      user_id: userInfo.id,
      company_id: itemData.company_id,
      product_id: itemData.product_id,
      cq_type: '진료문의',
      cq_title: `${itemData?.hospital_name} ${itemData?.product_name}`,
      cq_content: comment,
    };

    try {
      const res = await api.insertProductQA(data);
      if (res.result === true) {
        navigation.goBack();
      } else {
        throw res.message;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title="진료 문의하기" />
      <ScrollView>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_14}>상품정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text style={[DARK_GRAY_BOLD_14, { marginTop: 15 }]}>
                {itemData?.hospital_name}
                &nbsp;-&nbsp;
                {itemData?.product_name}
              </Text>
              <Text style={[DARK_GRAY_BOLD_14, { marginTop: 10 }]}>
                {convertPrice(itemData?.price)}
                &nbsp;
                <Text style={STANDARD_GRAY_10}>
                  &nbsp; VAT | 마취/사후관리비 포함
                </Text>
              </Text>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
                예약자 정보
              </Text>
            </Accordion.Header>
            <Accordion.Body>
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
                label={<Text>요청사항</Text>}
                multiline={true}
                placeholder="업체에 요청하실 내용을 작성해주세요."
                onChangeText={text => setComment(text)}
              />
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
                판매자 정보
              </Text>
            </Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={style.chargeWrap}>
          <Text style={STANDARD_GRAY_12}>
            회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.
          </Text>
          <View style={style.checkDocsWrap}>
            <CustomCheckbox
              style={style.checkDoc}
              selected={agrees.doc1}
              onPress={() =>
                setAgrees({
                  ...agrees,
                  doc1: !agrees.doc1,
                })
              }>
              <Text style={style.checkDocLabel}>
                개인정보 수집 및 이용 동의&nbsp;
                <Text style={style.detailText}>자세히</Text>
              </Text>
            </CustomCheckbox>
            <CustomCheckbox
              style={style.checkDoc}
              selected={agrees.doc2}
              onPress={() =>
                setAgrees({
                  ...agrees,
                  doc2: !agrees.doc2,
                })
              }>
              <Text style={style.checkDocLabel}>
                개인정보 제 3자 제공 동의&nbsp;
                <Text style={style.detailText}>자세히</Text>
              </Text>
            </CustomCheckbox>
          </View>
        </View>
      </ScrollView>
      <MedicleButton
        buttonStyle={{ height: 52 }}
        onPress={() => submit()}
        text="진료 문의하기"
        disabled={disabled}
      />
    </SafeAreaView>
  );
};
