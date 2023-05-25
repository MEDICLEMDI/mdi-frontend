import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import {
  Colors,
  DARK_GRAY_BOLD_12,
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_16,
  DARK_GRAY_BOLD_18,
  STANDARD_GRAY_14,
} from '@/constants/theme';
import Routes from '@/navigation/Routes';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';
import { IAppointmentItem, ResponseDTO } from '@/interfaces/api';
import { Row } from '@/components/layout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ navigation, route }: any) => {
  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = React.useState(1); // 진료탭, 문의탭
  const [data, setData] = React.useState<any>([]); // 데이터 리스트 그릇
  const [page, setPage] = React.useState(1); // 페이지 넘버
  const [isInit, setInit] = React.useState(false); // 페이지 랜더링 화면 준비 여부
  const [isMore, setIsMore] = React.useState(true); // 추가 데이터 존재여부 (페이지네이션 다음페이지 존재여부)
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const isFocus = useIsFocused();

  const chartType = [
    '진료 예약', // 1
    '진료 완료', // 2
    '취소 신청중', // 3
    '취소 완료', // 4
    '문의 내역', // 5
    '답변 완료', // 6
  ];

  React.useEffect(() => {
    // 라우트 파라미터로 페이지 초기화
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

  
  /**
   * 예약, 문의 탭변경시 상태 초기화
   * @param newTabIndex 
   */
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

  /**
   * 페이지 초기화
   */
  const handleRefreshndexChange = () => {
    setPage(1);
    setData([]);
    setInit(false);
    setLoading(false);
    setIsMore(true);
    setRefresh(true);
  };

  
  /**
   * 선택된 탭에 따라 데이터 가져오기
   */
  const handleGetData = async () => {
    if (tabIndex === 0) {
      await getUserAppointment();
    } else {
      await getQAList();
    }
  };

  /**
   * 문의내역 가져오기
   */
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

  /**
   * 진료내역 가져오기
   */
  const getUserAppointment = async () => {
    if (!loading) {
      setLoading(true);
    }

    try {
      const user = await AsyncStorage.getItem('@User');
      const userId = JSON.parse(user!).id;
      const res: ResponseDTO<IAppointmentItem> = await api.getUserAppointment(userId, page);
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

  // 내역 리스트 페이지네이션 다음페이지
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
