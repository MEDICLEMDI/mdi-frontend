import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
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
import { dateSetup } from '@/utils/dates';
import { convertNumberLocale } from '@/utils/utilities';
import dayjs from 'dayjs';
import { Row } from '@/components/layout';
import { DARK_GRAY_BOLD_14, STANDARD_GRAY_12 } from '@/constants/theme';
import { IPointHistory } from '@/interfaces/api';

export default ({ navigation }: any) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [point, setPoint] = React.useState(0);
  const [date, setDate] = React.useState({ from: '', to: '' });
  const [histories, setHistories] = React.useState<IPointHistory[]>([]);
  const [isInit, setInit] = React.useState(false);

  React.useEffect(() => {
    initialize();
  }, []);

  const FONT_BASIC_BLACK = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

  /**
   * 화면 초기화 설정
   */
  const initialize = async () => {
    setInit(false);
    const initDate = dateSetup(1, 'week');
    setDate(initDate);
    await getPointHistory(initDate);
    await setUserInformation();
  };

  /**
   * 유저정보 가져오기
   */
  const setUserInformation = async () => {
    const user = await getStorageData('@User');
    setPoint(user.mdi.mw_mdi_point);
  };

  /**
   * 유저 아이디 반환
   * @returns
   */
  const getUserId = async () => {
    const user = await getStorageData('@User');
    return user.id;
  };

  /**
   * 유저 포인트 거래내역
   * @param date 
   */
  const getPointHistory = async (date: any) => {
    setHistories([]);
    setInit(false);
    try {
      const { data } = await api.getPointHistory(await getUserId(), date);
      setHistories(data!);
    } catch (e) {
      console.error(e);
    } finally {
      setVisible(false);
      setInit(true);
    }
  };

  const type = {
    payment: '상품 결제',
    register: '가입 보상',
    refund: '결제 환불',
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
      <BoxDropShadow style={[style.pointWrap]}>
        <View style={[style.flexRow]}>
          <Text>메디클 포인트</Text>
          {/* <TouchableOpacity style={style.infoButton}> */}
          {/* <Text style={FONT_BASIC_BLACK}>이용안내</Text> */}
          {/* </TouchableOpacity> */}
        </View>
        <View style={[style.flexRow, { marginVertical: 15 }]}>
          <Icon name="mdiIcon" />
          <Text style={[style.point]}>{convertNumberLocale(point)}</Text>
        </View>
        <Text style={style.pointText}>적립 예정 포인트</Text>
        <View style={[style.flexRow, { justifyContent: 'space-between' }]}>
          <Text>{0}원</Text>
          {/* <TouchableOpacity
            style={style.chargeButton}
            onPress={() => navigation.navigate(Routes.POINT_CHARGE)}>
            <Text style={FONT_BASIC_BLACK}>충전하기</Text>
          </TouchableOpacity> */}
        </View>
      </BoxDropShadow>
      <View style={style.historyWrap}>
        <View style={{ paddingHorizontal: 20 }}>
          <SearchBar onPress={() => setVisible(true)} title={''} period={''} />
        </View>
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
          submitEvent={() => getPointHistory(date)}
          resetEvent={() => getPointHistory(dateSetup(1, 'week'))}
        />
        {histories.length > 0 ? (
          <FlatList
            style={style.histories}
            data={histories}
            renderItem={({ item }) => (
              <BoxDropShadow style={style.historyItem}>
                <Text style={STANDARD_GRAY_12}>
                  {dayjs(item.date).format('YYYY.MM.DD')}
                </Text>
                <Row justify="space-between" align="center">
                  <Text style={DARK_GRAY_BOLD_14}>{type[item.type]}</Text>
                  <Text style={DARK_GRAY_BOLD_14}>
                    {convertNumberLocale(item.point)}
                  </Text>
                </Row>
              </BoxDropShadow>
            )}
          />
        ) : (
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            {isInit ? (
              <Text style={{ textAlign: 'center' }}>
                포인트 사용 내역이 없습니다.
              </Text>
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
