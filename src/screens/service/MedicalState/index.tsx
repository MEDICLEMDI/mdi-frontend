import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import Header from '@/components/Header';
import Icons from '@/icons';

import style from './style';
import BoxDropShadow from "@/components/BoxDropShadow";
import MedicleButton from "@/buttons/MedicleButton";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";
import SearchBar from "@/components/forms/SearchHeader";
import {DatePicker} from "@/components/Modals";
import Routes from "@/navigation/Routes";

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


  const data = [
    { name: '', price: 90000 }
  ]

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.medicalState')}/>
      <View style={[style.content, { marginTop: 20 }]}>
        <SearchBar onPress={() => setVisible(true)} />
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
        />
        {/*<View style={style.noData}>*/}
        {/*  <Text>진료내역이 없습니다.</Text>*/}
        {/*</View>*/}
      </View>
      <ScrollView style={style.content}>
        {
          data.map(({ name, price }, key) => (
            <BoxDropShadow key={key}>
              <View style={[style.justifyTextWrap, style.itemDate]}>
                <Text style={ITEM_DATE_FONT}>2022.11.03</Text>
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
                onPress={() => navigation.navigate(Routes.MEDICAL_STATE_DETAIL)}
              />
            </BoxDropShadow>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};
