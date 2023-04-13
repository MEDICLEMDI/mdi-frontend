import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import { DatePicker } from '@/components/Modals';
import Tab from '@/components/Tab';
import {
  DARK_GRAY_BOLD_12,
  DARK_GRAY_BOLD_16,
  DARK_GRAY_BOLD_18,
  STANDARD_GRAY_14,
} from '@/constants/fonts';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [visible, setVisible] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState();
  const [page, setPage] = React.useState(1);

  const chartType = [
    '진료 예약',
    '진료 완료',
    '취소 신청중',
    '취소 완료',
    '문의 내역',
  ];

  React.useEffect(() => {
    initialize();
  }, [tabIndex]);

  React.useEffect(() => {
    if (isFocus) initialize();
  }, [isFocus]);

  const initialize = async () => {
    setPage(1);
    setData([]);
    if (tabIndex === 0) {
      await getUserAppointment();
    } else {
      await getQAList();
    }
  };

  const getQAList = async () => {
    try {
      const user = await AsyncStorage.getItem('@User');
      const userId = JSON.parse(user).id;
      const res = await api.getQAList(userId);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserAppointment = async () => {
    try {
      const user = await AsyncStorage.getItem('@User');
      const userId = JSON.parse(user).id;
      const res = await api.getUserAppointment(userId, page);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <View style={style.content}>
        {/* <SearchBar onPress={() => setVisible(true)} /> */}
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
        />
      </View>
      <Tab
        data={[{ label: '진료내역' }, { label: '문의내역' }]}
        response={setTabIndex}
        tabStyle={style.tabWrap}
        buttonStyle={style.tabButton}
      />
      <FlatList
        style={style.content}
        keyExtractor={item => item.id}
        data={data}
        renderItem={({ item }) => (
          <BoxDropShadow key={item.id} style={{ marginBottom: 15 }}>
            <View style={[style.justifyTextWrap, style.itemDate]}>
              <Text style={DARK_GRAY_BOLD_18}>
                {dayjs(item.date).format('YYYY.MM.DD')}
                <Text style={STANDARD_GRAY_14}>
                  &nbsp;&nbsp;{chartType[item.status]}
                </Text>
              </Text>
              <Icon name="arrowRight" />
            </View>
            <View style={style.infoWrap}>
              <Text style={DARK_GRAY_BOLD_16}>{item.hospital_name}</Text>
              <View style={[style.justifyTextWrap]}>
                <Text>{item.product_name}</Text>
                <View style={[style.flexRow]}>
                  <Text style={DARK_GRAY_BOLD_12}>
                    {item.hospital_address.split(' ')[0]}
                    &nbsp;|&nbsp;
                    {item.hospital_address.split(' ')[1]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[style.justifyTextWrap, style.priceWrap]}>
              <Text>총 결제금액</Text>
              <Text>{convertNumberLocale(item.price)}</Text>
            </View>
            <MedicleButton
              buttonStyle={style.button}
              text="진료내역보기"
              onPress={() =>
                navigation.navigate(
                  tabIndex === 0 ? Routes.CHART_DETAIL : Routes.QA_DETAIL,
                  {
                    id: item.id,
                  }
                )
              }
            />
          </BoxDropShadow>
        )}
      />
    </SafeAreaView>
  );
};
