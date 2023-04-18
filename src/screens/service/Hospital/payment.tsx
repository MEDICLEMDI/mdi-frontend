import { CommonActions } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import MedicleButton from '@/buttons/MedicleButton';
import Accordion from '@/components/Accordion';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import { CustomCheckbox } from '@/components/common';
import { ScrollViewGrid } from '@/components/GridLayout';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import Li from '@/components/Li';
import RadioInput from '@/components/RadioInput';
import {
  DARK_GRAY_14,
  DARK_GRAY_BOLD_14,
  LIGHT_GRAY_10,
  ORANGE_BOLD_12,
  ORANGE_BOLD_14,
  STANDARD_GRAY_10,
} from '@/constants/fonts';
import { cardList, installmentList, payCondition } from '@/constants/payType';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { getStorageData } from '@/utils/localStorage';
import { convertNumberLocale, convertPrice } from '@/utils/utilities';

import style from './style';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const { itemData, time } = route.params;

  const [radioIndex, setRadioIndex] = React.useState(0);
  const [payIndex, setPayIndex] = React.useState<Number>(0);
  const [selectedCard, setSelectedCard] = React.useState();
  const [installment, setInstallment] = React.useState();
  const [payButtonDisabled, setPayButtonDisabled] = React.useState(true);

  const [documentAgree, setDocumentAgree] = React.useState({
    doc1: false,
    doc2: false,
    doc3: false,
  });

  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  const numColumns = 2;
  const padding = 30;
  const gap = 10;

  // 각 상태 변경시 버튼 활성화 여부 처리
  React.useEffect(() => {
    const bool = buttonDisabledListener();
    setPayButtonDisabled(bool);
  }, [documentAgree, radioIndex, payIndex]);

  // 결제 선택 초기화
  React.useEffect(() => {
    setPayIndex(0);
  }, [radioIndex]);

  // 데이터 초기화
  React.useEffect(() => {
    setSelectedCard(undefined);
    setInstallment(undefined);
  }, [payIndex]);

  const buttonDisabledListener = () => {
    const agree = !(
      documentAgree.doc1 &&
      documentAgree.doc2 &&
      documentAgree.doc3
    );

    // 일반 결제
    if (radioIndex === 1) {
      // 신용카드
      if (payIndex === 0) {
        return !(selectedCard !== undefined && installment !== undefined);
      }
      // 가상계좌
      if (payIndex === 1) {
        return true;
      }
      return false;
    }
    return agree;
  };

  const submit = async () => {
    // 데이터베이스에 데이터만 저장하는 형태로 구성
    // 이후 결제 처리 방식에 따라서 변경
    const user = await getStorageData('@User');

    const payType = {
      0: 'card',
      1: '',
      2: '',
      3: 'mobile',
      4: 'toss',
      5: 'kakao',
    };

    let payment_method = 'point';
    if (radioIndex === 1) {
      payment_method = payType[payIndex];
    }
    
    const request = {
      payment_method: payment_method,
      product_id: itemData.product_id,
      ua_date: time,
      user_id: user.id,
    };

    try {
      const res = await api.productPayment(request);
      if (res.result) {
        console.log(res.message);
        navigation.dispatch([
          navigation.navigate({ name: Routes.MYPAGE }),
          navigation.navigate({ name: Routes.RECEIPT }),
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
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
                {convertPrice(itemData?.discount_price)}
                &nbsp;
                <Text style={LIGHT_GRAY_10}>
                  &nbsp; VAT | 마취/사후관리비 포함
                </Text>
              </Text>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom]}>
          <View style={[style.chargeWrap]}>
            <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
              결제 정보
            </Text>
            <RadioInput
              name="메디클 포인트 결제"
              index={0}
              selected={radioIndex === 0}
              response={setRadioIndex}
            />
            {radioIndex === 0 && (
              <BoxDropShadow style={{ paddingVertical: 35, marginBottom: 30 }}>
                <TouchableOpacity>
                  <Row justify="center" style={{ marginBottom: 25 }}>
                    <Icon name="mdiHorizontal" fill={'#000'} />
                    <Text
                      style={{
                        marginTop: -8,
                        marginLeft: 10,
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      Pay+
                    </Text>
                  </Row>
                  <Row justify="center">
                    <Text>메디클 포인트를 추가하고 빠르게 결제하세요!</Text>
                  </Row>
                </TouchableOpacity>
              </BoxDropShadow>
            )}
            <RadioInput
              name="일반 결제"
              index={1}
              selected={radioIndex === 1}
              response={setRadioIndex}
            />
          </View>
          {radioIndex === 1 && (
            <ScrollViewGrid
              itemStyle={style.itemStyle}
              itemSelected={{
                key: payIndex,
                color: Colors.Medicle.Brown.SemiLight,
              }}
              itemBackground={Colors.Medicle.Gray.Light}
              numColumns={numColumns}
              padding={padding}
              gap={gap}
              data={payCondition}
              renderItem="box"
              onPress={(item, index) => setPayIndex(index)}
            />
          )}

          {
            // 카드결제
            radioIndex === 1 && payIndex === 0 && (
              <View style={[style.chargeWrap]}>
                <SelectList
                  placeholder={'카드선택'}
                  search={false}
                  boxStyles={style.selectBox}
                  inputStyles={style.selectInput}
                  dropdownStyles={style.dropdownStyles}
                  setSelected={val => setSelectedCard(val)}
                  data={cardList}
                />
                <SelectList
                  placeholder={'할부개월'}
                  search={false}
                  boxStyles={style.selectBox}
                  inputStyles={DARK_GRAY_14}
                  dropdownStyles={style.dropdownStyles}
                  setSelected={val => setInstallment(val)}
                  data={installmentList}
                />
              </View>
            )
          }
          {
            // 가상계좌
            radioIndex === 1 && payIndex === 1 && (
              <View style={[style.chargeWrap]}>
                <SelectList
                  placeholder={'입금은행을 선택해주세요.'}
                  search={false}
                  boxStyles={style.selectBox}
                  inputStyles={style.selectInput}
                  dropdownStyles={style.dropdownStyles}
                  setSelected={val => setSelectedCard(val)}
                  data={cardList}
                />
                <MedicleInput />
                <Text style={{ marginVertical: 20 }}>계좌 유효기간</Text>
                <Li
                  text={
                    '가상계좌는 주문 시 고객님께 발급되는 일회성 계좌번호 이므로 입금자명이 다르더라도 입금 확인이 가능합니다.' +
                    '#단, 선택하신 은행을 통해 결제 금액 1원 단위까지 정확히 맞추셔야 합니다.' +
                    '#가상 계좌의 입금 유효 기간은 주문 후 2일 이내이며, 기간 초과 시 계좌번호는 소멸되어 입금되지 않습니다.' +
                    '#인터넷뱅킹, ATM/CD기계, 은행 창구 등에서 입금할 수 있습니다.' +
                    '#ATM 기기는 100원 단위 입금이 되지 않으므로 통장 및 카드로 계좌이체 해주셔야합니다. 은행 창구에서도 1원 단위 입금이 가능합니다.' +
                    '#가상 계좌 입금 전 제휴 업체의 사유로 인한 휴무가 발생할 경우 주문이 취소됩니다.' +
                    '#반복전인 주문 취소는 주문제한 사유가 될 수 있습니다.'
                  }
                  textStyle={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#989898',
                  }}
                />
              </View>
            )
          }
          {
            // 에스크로
            radioIndex === 1 && payIndex === 2 && (
              <View style={[style.chargeWrap]}>
                <Li
                  text={
                    '실시간 계좌이체를 이용하기 위해서는 계좌결제 앱이 설치되어 있어야합니다.' +
                    '#현재 약 20여개의 은행이 가능하며 현금영수증 발행은 결제 시 즉시 발급받으실 수 있습니다.'
                  }
                  textStyle={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#989898',
                  }}
                />
              </View>
            )
          }
          {
            // 휴대폰 결제
            radioIndex === 1 && payIndex === 3 && (
              <View style={[style.chargeWrap]}>
                <Li
                  text={
                    '휴대폰 결제는 통신사와 결제 대행사 정책 / 높은 수수료 / 늦은 정산주기로 인하여 50만원 이하 상품만 가능하며 결제하실 금ㅇ개의 5%가 결제 수수료로 추가됩니다.' +
                    '\n예시) 판매금액 50,000원 상품을 휴대폰으로 결제 할 경우 52,500원이 결제됩니다.' +
                    '\n환불 시 수수료를 포함한 결제금액이 환불됩니다.' +
                    '#저렴한 구매를 원하실 경우 타 결제수단 (신용카드, 가상계좌, 계좌이체)를 이용하시기바랍니다' +
                    '#부분환불/결제 월이 지난경우, 계좌로 환불됩니다.'
                  }
                  textStyle={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#989898',
                  }}
                />
              </View>
            )
          }
          {
            // 토스
            radioIndex === 1 && payIndex === 4 && (
              <View style={[style.chargeWrap]}>
                <Li
                  text={
                    '토스는 간편하게 비밀번호로만 으로 결제 할 수 있는 빠르고 편리한 계좌 간편 결제 서비스입니다.' +
                    '#지원 은행: 모든 은행 계좌 등록/결제 가능' +
                    '#결제 비밀번호 분실 시 재설정 후 이용 가능합니다.'
                  }
                  textStyle={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#989898',
                  }}
                />
              </View>
            )
          }
          {
            // 카카오페이
            radioIndex === 1 && payIndex === 5 && (
              <View style={[style.chargeWrap]}>
                <Li
                  text={
                    '카카오페이는 카카오톡에서 카드를 등록, 간단하게 비밀번호만으로 결제 할 수 있는 빠르고 편리한 모바일 결제 서비스입니다.' +
                    '#지원 은행: 모든 은행 계좌 등록/결제 가능'
                  }
                  textStyle={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#989898',
                  }}
                />
              </View>
            )
          }
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Row justify="space-between" align="center">
            <Text>무이자/부분 무이자 할부 혜택 안내</Text>
            <Icon name="arrowRight" />
          </Row>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14]}>환불 방법</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text>상품 예약시 약관</Text>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.chargeWrap]}>
          <Accordion isOpen={true} style={style.totalPriceWrap}>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
                최종 결제금액
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={[style.totalWrap]}>
                <Text>상품 금액</Text>
                <Text style={DARK_GRAY_BOLD_14}>
                  {convertNumberLocale(itemData?.price)}
                </Text>
              </View>
              <View style={[style.totalWrap]}>
                <Text>할인 합계</Text>
                {itemData?.discount > 0 ? (
                  <Text style={DARK_GRAY_BOLD_14}>
                    <Text style={ORANGE_BOLD_12}>
                      {itemData.discount}& Save
                    </Text>
                    &nbsp;&nbsp;
                    {convertNumberLocale(itemData?.price / itemData?.discount)}
                  </Text>
                ) : (
                  <Text>{convertNumberLocale(0)}</Text>
                )}
              </View>
              <View style={[style.totalWrap]}>
                <Text>결제 수수료</Text>
                <Text style={DARK_GRAY_BOLD_14}>0원</Text>
              </View>
            </Accordion.Body>
          </Accordion>

          <View style={[style.totalWrap]}>
            <Text style={ORANGE_BOLD_14}>결제 금액</Text>
            <Text style={DARK_GRAY_BOLD_14}>
              {convertNumberLocale(itemData?.discount_price)}
            </Text>
          </View>
          <Text />
        </View>
        {radioIndex === 0 && (
          <View style={style.chargeWrap}>
            <Text style={STANDARD_GRAY_10}>
              회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.
            </Text>
            <View style={style.checkDocsWrap}>
              <CustomCheckbox
                style={style.checkDoc}
                selected={documentAgree.doc1}
                onPress={() =>
                  setDocumentAgree({
                    ...documentAgree,
                    doc1: !documentAgree.doc1,
                  })
                }>
                <Text style={style.checkDocLabel}>
                  개인정보 수집 및 이용 동의&nbsp;
                  <Text style={style.detailText}>자세히</Text>
                </Text>
              </CustomCheckbox>
              <CustomCheckbox
                style={style.checkDoc}
                selected={documentAgree.doc2}
                onPress={() =>
                  setDocumentAgree({
                    ...documentAgree,
                    doc2: !documentAgree.doc2,
                  })
                }>
                <Text style={style.checkDocLabel}>
                  개인정보 제 3자 제공 동의&nbsp;
                  <Text style={style.detailText}>자세히</Text>
                </Text>
              </CustomCheckbox>
              <CustomCheckbox
                style={style.checkDoc}
                selected={documentAgree.doc3}
                onPress={() =>
                  setDocumentAgree({
                    ...documentAgree,
                    doc3: !documentAgree.doc3,
                  })
                }>
                <Text style={style.checkDocLabel}>
                  전자결제대행 이용 동의&nbsp;
                  <Text style={style.detailText}>자세히</Text>
                </Text>
              </CustomCheckbox>
            </View>
          </View>
        )}
      </ScrollView>
      <MedicleButton
        buttonStyle={{ height: 52 }}
        onPress={() => submit()}
        textStyle={DARK_GRAY_BOLD_14}
        text={convertNumberLocale(itemData?.discount_price) + ' 결제하기'}
        disabled={payButtonDisabled}
      />
    </SafeAreaView>
  );
};
