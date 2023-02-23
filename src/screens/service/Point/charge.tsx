import * as React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Platform, Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '@/components/Header';
import MedicleButton from "@/buttons/MedicleButton";
import RadioInput from "@/components/RadioInput";
import GridLayout, {deviceWidthCalculator} from "@/components/GridLayout";
import { fontStyleCreator } from '@/utils/fonts';
import { MedicleInput } from "@/components/inputs";
import { payType, payCondition } from "@/constants/payType";

import style from './style';
import { Colors } from '@/constants/theme';

const PayConditionItems = ({item, numColumns}: any) => {
  const gap = 10;
  return (
    <MedicleButton
      onPress={() => null}
      text={item.label}
      buttonStyle={{
        paddingVertical: 8,
        borderRadius: 5,
        flex: 1,
        maxWidth: deviceWidthCalculator({padding: 60, gap: gap, numColumns: numColumns}),
        marginVertical: gap / 2
      }}/>
  )
}

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [radioIndex, setRadioIndex] = React.useState(0);

  const FONT_BASIC_BLACK = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 14,
    weight: 'bold',
  });
  const numColumns = 2;

  React.useEffect(() => {
    // console.log(radioIndex)
  }, [radioIndex])

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
      <View style={[style.borderBottom, style.chargeWrap]}>
        <Text style={[FONT_BASIC_BLACK, style.sectionHeader]}>메디클 포인트 충전</Text>
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
        <Text style={[FONT_BASIC_BLACK, style.sectionHeader]}>결제 정보</Text>
        <RadioInput data={payType} response={setRadioIndex}/>
        {
          radioIndex === 1 && (
            <GridLayout
              numColumns={numColumns}
              data={payCondition}
              renderItem={({item}) => (
                <PayConditionItems item={item} numColumns={numColumns}/>
              )}
            />
          )
        }
      </View>
      <View style={[style.borderBottom, style.chargeWrap]}>
        <Text style={[FONT_BASIC_BLACK, style.sectionHeader]}>환불 방법</Text>
        <Text>상품 예약시 약관</Text>
      </View>
      <View style={[style.chargeWrap]}>
        <Text style={[FONT_BASIC_BLACK, style.sectionHeader]}>최종 결제금액</Text>
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
