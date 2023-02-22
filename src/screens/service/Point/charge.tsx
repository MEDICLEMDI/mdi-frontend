import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Platform, Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import Icons from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
import MedicleButton from "@/buttons/MedicleButton";
import {MedicleInput} from "@/components/inputs";
import RadioInput from "@/components/RadioInput";
import {useEffect} from "react";

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [radioIndex, setRadioIndex] = React.useState(0);

  const FONT_BASIC_BLACK = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

  useEffect(() => {
    console.log(radioIndex)
  }, [radioIndex])

  const radioData = [
    {label: 'MDI 결제'},
    {label: '일반 결제'},
  ]

  const paymentType = [
    {label: '신용카드'},
    {label: '가상계좌'},
    {label: '계좌이체(에스크로)'},
    {label: '휴대폰 결제'},
    {label: '토스'},
    {label: '카카오페이'},
  ]

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
      <View style={[style.borderBottom, style.chargeWrap]}>
        <Text>메디클 포인트 충전</Text>
        <View style={[style.balanceWrapper]}>
          <Text>보유 MDI</Text>
          <Text>0.00 MDI</Text>
        </View>
        <View style={[style.balanceWrapper]}>
          <MedicleInput placeholder="수량을 입력해주세요." style={{ flex: 1 }}/>
          <MedicleButton onPress={() => null} text="전액 사용" />
        </View>
        <View style={[style.balanceWrapper]}>
          <Text>충전 금액</Text>
          <MedicleInput placeholder="금액을 입력해주세요." style={{ flex: 1 }}/>
        </View>
      </View>
      <View style={[style.borderBottom, style.chargeWrap]}>
        <Text>결제 정보</Text>
        <RadioInput data={radioData} response={setRadioIndex}/>
        {
          radioIndex === 1 && (
            <View>
              <FlatList
                data={paymentType}
                renderItem={({item}) => (
                  <MedicleButton key={item.key} onPress={() => null} text={item.label} buttonStyle={{ flex: 1, }} />
                )}
                numColumns={2}
              />
            </View>
          )
        }
      </View>
      <View style={[style.borderBottom, style.chargeWrap]}>
        <Text>환불 방법</Text>
        <Text>상품 예약시 약관</Text>
      </View>
      <View style={[style.chargeWrap]}>
        <Text>최종 결제금액</Text>
        <View style={[style.balanceWrapper]}>
          <Text>상품 금액</Text>
          <Text>0원</Text>
        </View>
        <View style={[style.balanceWrapper]}>
          <Text>결제 수수료</Text>
          <Text>0원</Text>
        </View>
        <View style={[style.balanceWrapper]}>
          <Text>결제 금액</Text>
          <Text>0원</Text>
        </View>
        <Text></Text>
      </View>
      <MedicleButton onPress={() => console.log()} text="결제하기" />
    </SafeAreaView>
  );
};
