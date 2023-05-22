import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import Tab from '@/components/Tab';
import {
  Colors,
  DARK_GRAY_BOLD_12,
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_16,
  DARK_GRAY_BOLD_18,
  STANDARD_GRAY_14,
} from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';
import useCustomToast from '@/hooks/useToast';
import { responseDTO } from '@/interfaces/api';
import { mergeNextPageData } from '@/utils/mergeData';
import { Row } from '@/components/layout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ navigation, route }) => {
  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = React.useState(1);
  const [data, setData] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [isInit, setInit] = React.useState(false);
  const [isMore, setIsMore] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const isFocus = useIsFocused();

  const chartType = [
    '진료 예약',
    '진료 완료',
    '취소 신청중',
    '취소 완료',
    '문의 내역',
    '답변 완료',
  ];

  React.useEffect(() => {
    if (route.params !== undefined) {
      const { index } = route.params;
      handleRefreshndexChange();
    }
  }, [route.params]);

  React.useEffect(() => {
    if (refresh) handleGetData();
  }, [refresh]);

  React.useEffect(() => {
    handleGetData();
  }, [tabIndex]);

  React.useEffect(() => {
    if (page !== 1) {
      handleGetData();
    }
  }, [page]);

  const handleTabIndexChange = (newTabIndex: number) => {
    if (newTabIndex !== tabIndex) {
      setPage(1);
      setData([]);
      setInit(false);
      setLoading(false);
      setIsMore(true);
      setTabIndex(newTabIndex);
    }
  };
  const handleRefreshndexChange = () => {
    setPage(1);
    setData([]);
    setInit(false);
    setLoading(false);
    setIsMore(true);
    setRefresh(true);
  };

  const handleGetData = async () => {
    if (tabIndex === 0) {
      await getUserAppointment();
    } else {
      await getQAList();
    }
  };

  const getQAList = async () => {
    if (!loading) {
      setLoading(true);
    }
    try {
      const res = await api.getQAList(page);
      setData(data.concat(res.data));
      setIsMore(res.message === 'isMore');
      setInit(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getUserAppointment = async () => {
    if (!loading) {
      setLoading(true);
    }

    try {
      const user = await AsyncStorage.getItem('@User');
      const userId = JSON.parse(user!).id;
      const res: responseDTO = await api.getUserAppointment(userId, page);
      setData(data.concat(res.data));
      setIsMore(res.message === 'isMore');

      if (!isInit) {
        setInit(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageUp = () => {
    if (isMore && !loading) {
      setPage(page + 1);
    }
  };

  const tab = [{ id: 1, label: '진료내역' }, { id: 2, label: '문의내역' }];
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.chart')} />
      <Row justify="space-around">
        {tab.map((data) => (
          <TouchableOpacity
          key={data.id} 
          onPress={() => handleTabIndexChange(data.id)}
          style={ [tabIndex === data.id && { borderBottomWidth: 3, borderBottomColor: Colors.Medicle.Brown.Standard,}, style.tabButton]}>
          <Text style={ tabIndex === data.id ? DARK_GRAY_BOLD_14 : STANDARD_GRAY_14 }>{data.label}</Text>
        </TouchableOpacity>
        ))}
      </Row>
      {data.length > 0 ? (
        <>
          <FlatList
            keyExtractor={item => item.id}
            data={data}
            onEndReached={handlePageUp}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<>{loading && <ActivityIndicator />}</>}
            renderItem={({ item }) => (
              <BoxDropShadow
                key={item.id}
                style={{ marginBottom: 15, marginHorizontal: 25 }}>
                <View style={[style.justifyTextWrap, style.itemDate]}>
                  <Text style={DARK_GRAY_BOLD_18}>
                    {dayjs(item.date).format('YYYY.MM.DD')}
                    <Text style={STANDARD_GRAY_14}>
                      &nbsp;&nbsp;{chartType[item.status]}
                    </Text>
                  </Text>
                  {/* <Icon name="arrowRight" /> */}
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
                {item.status < 4 && (
                  <View style={[style.justifyTextWrap, style.priceWrap]}>
                    <Text>총 결제금액</Text>
                    <Text>{convertNumberLocale(item.price)}</Text>
                  </View>
                )}
                <MedicleButton
                  buttonStyle={style.button}
                  text={
                    item.status < 4
                      ? '예약내역보기'
                      : item.status === 4
                      ? '문의내역보기'
                      : '답변내용보기'
                  }
                  onPress={() => {
                    setRefresh(false);
                    navigation.navigate(
                      tabIndex === 0 ? Routes.CHART_DETAIL : Routes.QA_DETAIL,
                      {
                        id: item.id,
                      }
                    );
                  }}
                />
              </BoxDropShadow>
            )}
          />
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {isInit ? (
            <Text style={{ fontSize: 16 }}>내역이 없습니다.</Text>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
