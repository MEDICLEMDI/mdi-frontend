import * as React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Header from '@/components/Header';
import MedicleButton from "@/buttons/MedicleButton";
import RadioInput from "@/components/RadioInput";
import { ScrollViewGrid} from "@/components/GridLayout";
import { fontStyleCreator } from '@/utils/fonts';
import { MedicleInput } from "@/components/inputs";
import { SelectList } from 'react-native-dropdown-select-list'
import {payType, payCondition, cardList, installmentList} from "@/constants/payType";

import style from './style';
import { Colors } from '@/constants/theme';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [radioIndex, setRadioIndex] = React.useState(0);
  const [payIndex, setPayIndex] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState();
  const [installment, setInstallment] = React.useState();

  const FONT_BASIC_BLACK = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 14,
    weight: 'bold',
  });
  const numColumns = 2;
  const padding = 30;
  const gap = 10;

  React.useEffect(() => {
    // console.log(radioIndex)
  }, [radioIndex])

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
      <ScrollView>

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
        <View style={[style.borderBottom]}>
          <View style={[style.chargeWrap]}>
            <Text style={[FONT_BASIC_BLACK, style.sectionHeader]}>결제 정보</Text>
            <RadioInput data={payType} response={setRadioIndex}/>
          </View>
          {
            radioIndex === 1 && (
              <ScrollViewGrid
                columnWrapperStyle={style.categoryWrap}
                itemStyle={style.itemStyle}
                itemSelected={{key: payIndex, color: Colors.Medicle.Brown.SemiLight}}
                itemBackground={Colors.Medicle.Gray.Light}
                textStyle={style.textStyle}
                numColumns={numColumns}
                padding={padding}
                gap={gap}
                data={payCondition}
                renderItem='box'
                onPress={(item, index) => setPayIndex(index)}
              />
            )
          }
          {radioIndex === 1 && payIndex === 0 && (
            <>
              <SelectList
                placeholder={'카드선택'}
                search={false}
                boxStyles={style.selectBox}
                inputStyles={style.selectInput}
                dropdownStyles={style.dropdownStyles}
                setSelected={(val) => setSelectedCard(val)}
                data={cardList}
              />
              <SelectList
                placeholder={'할부개월'}
                search={false}
                boxStyles={style.selectBox}
                inputStyles={style.selectInput}
                dropdownStyles={style.dropdownStyles}
                setSelected={(val) => setInstallment(val)}
                data={installmentList}
              />
            </>
          )}
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
      </ScrollView>
      <MedicleButton onPress={() => console.log()} text="결제하기" />
    </SafeAreaView>
  );
};
