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
import Icons from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

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
        <View style={style.noData}>
          <Text>결제 목록이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
