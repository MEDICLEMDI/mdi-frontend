import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import { DatePicker } from '@/components/Modals';

import style from './style';
import BoxDropShadow from "@/components/BoxDropShadow";
import Icons from "@/icons";
import MedicleButton from "@/buttons/MedicleButton";
import Routes from "@/navigation/Routes";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState();

  const ITEM_DATE_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  })
  const ITEM_NAME_FONT = fontStyleCreator({
    size: 16,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  })
  const CHART_TYPE_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Standard,
  })


  const data = [
    { name: '', chartType: '진료 완료', price: 90000 },
    { name: '', chartType: '진료 예약', price: 90000 },
    { name: '', chartType: '문의 내역', price: 90000 },
  ]


  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <View style={style.content}>
        <SearchBar onPress={() => setVisible(true)} />
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
        />
      </View>
      <ScrollView style={style.content}>
        {
          data.map(({ name, price,chartType }, key) => (
            <BoxDropShadow key={key} style={{ marginBottom: 15 }}>
              <View style={[style.justifyTextWrap, style.itemDate]}>
                <Text style={ITEM_DATE_FONT}>
                  2022.11.03&nbsp;
                  <Text style={CHART_TYPE_FONT}>
                    &nbsp;{chartType}
                  </Text>
                </Text>
                <Icons name='arrowRight' />
              </View>
              <View style={style.infoWrap}>
                <Text style={ITEM_NAME_FONT}>치과의원</Text>
                <View style={[style.justifyTextWrap]}>
                  <Text>스케일링</Text>
                  <View style={[style.flexRow]}>
                    <Text>서울특별시</Text>
                    <Text> | </Text>
                    <Text>종로5가</Text>
                  </View>
                </View>
              </View>
              <View style={[style.justifyTextWrap, style.priceWrap]}>
                <Text>총 결제금액</Text>
                <Text>{price.toLocaleString()}원</Text>
              </View>
              <MedicleButton
                buttonStyle={style.button}
                text="진료내역보기"
                onPress={() => navigation.navigate(Routes.CHART_DETAIL, { chartType: chartType })}
              />
            </BoxDropShadow>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};
