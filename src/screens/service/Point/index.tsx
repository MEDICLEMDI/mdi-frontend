import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import { DatePicker } from '@/components/Modals';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';
import { getStorageData } from '@/utils/localStorage';

import style from './style';
import { defaultDate } from '@/utils/dates';
import { convertNumberLocale } from '@/utils/utilities';
import dayjs from 'dayjs';
import { Row } from '@/components/layout';
import { DARK_GRAY_BOLD_14, STANDARD_GRAY_12 } from '@/constants/fonts';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState({ from: '', to: '' });
  const [histories, setHistories] = React.useState([]);

  React.useEffect(() => {
    initialize();
  }, [date]);

  const FONT_BASIC_BLACK = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

  const initialize = async () => {
    await getPointHistory(defaultDate());
  }

  const getUserId = async () => {
    const user = await getStorageData('@User');
    return user.id;
  };

  const getPointHistory = async (date: any) => {
    try {
      const { data } = await api.getPointHistory(await getUserId(), date);
      setHistories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setVisible(false);
    }
  };

  const type = {
    payment: "상품 결제",
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
      <BoxDropShadow style={[style.pointWrap]}>
        <View style={[style.flexRow]}>
          <Text>메디클 포인트</Text>
          <TouchableOpacity style={style.infoButton}>
            <Text style={FONT_BASIC_BLACK}>이용안내</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.flexRow, { marginVertical: 15 }]}>
          <Icon name="mdiIcon" />
          <Text style={[style.point]}>{0}원</Text>
        </View>
        <Text style={style.pointText}>적립 예정 포인트</Text>
        <View style={[style.flexRow, { justifyContent: 'space-between' }]}>
          <Text>{0}원</Text>
          <TouchableOpacity
            style={style.chargeButton}
            onPress={() => navigation.navigate(Routes.POINT_CHARGE)}>
            <Text style={FONT_BASIC_BLACK}>충전하기</Text>
          </TouchableOpacity>
        </View>
      </BoxDropShadow>
      <View style={style.historyWrap}>
        <View style={{ paddingHorizontal: 20 }}>
          <SearchBar onPress={() => setVisible(true)} />
        </View>
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
          submitEvent={() => getPointHistory(date)}
          resetEvent={() => getPointHistory(defaultDate())}
          date={date.from === '' ? defaultDate() : date}
        />
        {
          histories.length > 0
          ?
          <FlatList style={style.histories} data={histories} renderItem={({ item }) => (
            <BoxDropShadow style={style.historyItem}>
              <Text style={STANDARD_GRAY_12}>{dayjs(item.date).format('YYYY.MM.DD')}</Text>
              <Row justify="space-between" align="center">
                <Text style={DARK_GRAY_BOLD_14}>{type[item.type]}</Text>
                <Text style={DARK_GRAY_BOLD_14}>{convertNumberLocale(item.point)}</Text>
              </Row>
            </BoxDropShadow>
          )} />
          :
          <View style={style.histories}>
            <Text>사용 포인트 내역이 없습니다.</Text>
          </View>
        }
      </View>
    </SafeAreaView>
  );
};
