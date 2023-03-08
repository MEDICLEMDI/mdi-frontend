import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import { DatePicker } from '@/components/Modals';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
import BoxDropShadow from "@/components/BoxDropShadow";
import MedicleButton from "@/buttons/MedicleButton";
import Spacing from "@/components/Spacing";

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState();

  const SUMMARY_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 18,
    weight: 'bold',
  });
  const DATE_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  })
  const RECEIPT_CONDITION_FONT = fontStyleCreator({
    size: 14,
    color: Colors.Medicle.Font.Gray.Standard,
  })
  const ITEM_NAME_FONT = fontStyleCreator({
    size: 16,
    weight: 'bold',
  })

  const data = [
    { name: 'A', price: 2000 },
  ]

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.receipt')} />
      <View style={style.contentWrap}>
        <SearchBar onPress={() => setVisible(true)} />
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
        />

        {/* 받아온 데이터를 이용하여 map으로 재구성해야함 */}
        <View style={style.summaryWrap}>
          <View style={style.summaryItemWrap}>
            <View
              style={[
                style.summaryItem,
                { backgroundColor: Colors.Medicle.Brown.SemiLight },
              ]}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>전체</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>결제완료</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>취소완료</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={SUMMARY_FONT}>0</Text>
            </View>
            <Text>환불완료</Text>
          </View>
        </View>
        {/*<View style={style.noData}>*/}
        {/*  <Text>결제 목록이 없습니다.</Text>*/}
        {/*</View>*/}
      </View>
      <ScrollView style={style.contentWrap}>
        {
          data.map(({name, price}, key) => (
            <BoxDropShadow style={style.receiptItem} key={key}>
              <View style={[style.flexRow, style.justifyBetween]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={[DATE_FONT]}>2022.11.09</Text>
                  <Text style={[RECEIPT_CONDITION_FONT, {marginLeft: 10}]}>결제 완료</Text>
                </View>
                <Icon name="arrowRight" />
              </View>
              <View style={[style.flexRow, style.infoWrap]}>
                <View style={style.emptyImage}>
                </View>
                <View>
                  <Text style={ITEM_NAME_FONT}>{name}</Text>
                  <Text>진료 내용</Text>
                </View>
              </View>
              <View style={[style.flexRow, style.justifyBetween]}>
                <Text>총 결제금액</Text>
                <Text>{price.toLocaleString()}원</Text>
              </View>
              <View style={[style.flexRow, style.receiptButtonWrap]}>
                <MedicleButton buttonStyle={style.receiptButton} text='진료 예약하기' />
                <Spacing size={10} />
                <MedicleButton buttonStyle={style.receiptButton} text='리뷰 남기기' />
              </View>
            </BoxDropShadow>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};
