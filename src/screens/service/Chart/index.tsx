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
import { PRODUCT_INFO_BROWN } from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState();
  const [page, setPage] = React.useState(1);

  const ITEM_DATE_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const ITEM_NAME_FONT = fontStyleCreator({
    size: 16,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const CHART_TYPE_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Standard,
  });

  const chartType = ['진료 예약', '진료 완료', '예약 취소'];

  React.useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    setPage(0);
    await getUserAppointment();
  };

  const getUserAppointment = async () => {
    try {
      const user = await AsyncStorage.getItem('@User');
      const userId = JSON.parse(user).id;
      const res = await api.getUserAppointment(userId, page);
      console.log(res);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

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
      <FlatList
        style={style.content}
        keyExtractor={item => item.id}
        data={data}
        renderItem={({ item }) => (
          <BoxDropShadow key={item.id} style={{ marginBottom: 15 }}>
            <View style={[style.justifyTextWrap, style.itemDate]}>
              <Text style={ITEM_DATE_FONT}>
                {dayjs(item.created_at).format('YYYY.MM.DD')}
                <Text style={CHART_TYPE_FONT}>&nbsp;{chartType[item.ua_status - 1]}</Text>
              </Text>
              <Icon name="arrowRight" />
            </View>
            <View style={style.infoWrap}>
              <Text style={ITEM_NAME_FONT}>{item.company.name}</Text>
              <View style={[style.justifyTextWrap]}>
                <Text>{item.ua_product_name}</Text>
                <View style={[style.flexRow]}>
                  <Text style={PRODUCT_INFO_BROWN}>
                    {item.company.ci_address.split(' ')[0]}
                    &nbsp;|&nbsp;
                    {item.company.ci_address.split(' ')[1]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[style.justifyTextWrap, style.priceWrap]}>
              <Text>총 결제금액</Text>
              <Text>{convertNumberLocale(item.ua_product_price)}</Text>
            </View>
            <MedicleButton
              buttonStyle={style.button}
              text="진료내역보기"
              onPress={() =>
                navigation.navigate(Routes.CHART_DETAIL, {
                  id: item.id,
                })
              }
            />
          </BoxDropShadow>
        )}
      />
    </SafeAreaView>
  );
};
