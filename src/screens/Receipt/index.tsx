import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import { DatePicker } from '@/components/Modals';
import {
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_16,
  DARK_GRAY_BOLD_18,
  STANDARD_GRAY_14,
} from '@/constants/theme';
import { Colors } from '@/constants/theme';
import { dateSetup } from '@/utils/dates';
import { getStorageData } from '@/utils/localStorage';
import { convertNumberLocale } from '@/utils/utilities';

import style from './style';
import Config from 'react-native-config';
import { IPaymnetProduct } from '@/interfaces/api';

export default () => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState({ from: '', to: '' });
  const [histories, setHistories] = React.useState<IPaymnetProduct[]>([]);
  const [statusCount, setStatusCount] = React.useState({
    pending: 0,
    confirm: 0,
    refund: 0,
    cancel: 0,
  });
  const [isInit, setInit] = React.useState(false);
  const { IMAGESERVER_PREFIX } = Config;

  React.useEffect(() => {
    initialize();
  }, []);

  const statusType = ['결제중', '결제 완료', '결제 취소', '환불 완료'];

  /**
   * 화면 초기화
   */
  const initialize = async () => {
    try {
      await getPaymentHistory(dateSetup(1, 'week')); // 히스토리 불러오기
      await getInfoCount(); // 히스토리 상태별 갯수 불러오기
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 유저 아이디 가져오기
   * @returns 
   */
  const getUserId = async () => {
    const user = await getStorageData('@User');
    return user.id;
  };

  /**
   * 결제 내역 리스트 가져오기
   * @param date 
   */
  const getPaymentHistory = async (date: any) => {
    setHistories([]);
    try {
      setInit(false);
      const { data } = await api.getPaymentHistory(await getUserId(), date);
      setHistories(data!);
    } catch (e) {
      console.error(e);
    } finally {
      setVisible(false);
      setInit(true);
    }
  };

  /**
   * 결제 내역리스트 갯수 가와서 진행 상태별 랜더링처리
   */
  const getInfoCount = async () => {
    try {
      const { data } = await api.getInfoCount(await getUserId());
      console.log(data);
      const newStatusCount = { ...statusCount };
      for (const v of data) {
        if (v.up_status === 0) {
          newStatusCount.pending = Number(v.status_count);
        }
        if (v.up_status === 1) {
          newStatusCount.confirm = Number(v.status_count);
        }
        if (v.up_status === 2) {
          newStatusCount.cancel = Number(v.status_count);
        }
        if (v.up_status === 3) {
          newStatusCount.refund = Number(v.status_count);
        }
      }
      setStatusCount(newStatusCount);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.receipt')} />
      <View style={style.contentWrap}>
        <SearchBar
          onPress={() => setVisible(true)}
          title="전체"
          period=""
        />
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
          submitEvent={() => getPaymentHistory(date)}
          resetEvent={() => getPaymentHistory(dateSetup(1, 'week'))}
        />

        <View style={style.summaryWrap}>
          <View style={style.summaryItemWrap}>
            <View
              style={[
                style.summaryItem,
                { backgroundColor: Colors.Medicle.Brown.SemiLight },
              ]}>
              <Text style={DARK_GRAY_BOLD_18}>
                {statusCount.confirm + statusCount.refund + statusCount.cancel + statusCount.pending}
              </Text>
            </View>
            <Text>전체</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={DARK_GRAY_BOLD_18}>{statusCount.confirm}</Text>
            </View>
            <Text>결제완료</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={DARK_GRAY_BOLD_18}>{statusCount.cancel}</Text>
            </View>
            <Text>취소완료</Text>
          </View>

          <View style={style.summaryItemWrap}>
            <View style={style.summaryItem}>
              <Text style={DARK_GRAY_BOLD_18}>{statusCount.refund}</Text>
            </View>
            <Text>환불완료</Text>
          </View>
        </View>
      </View>
      {histories.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          // keyExtractor={(item, key) => item.id.toString()}
          // onEndReached={getMoreProductItems}
          // onEndReachedThreshold={0.4}
          ListFooterComponent={<>{loading && <ActivityIndicator />}</>}
          data={histories}
          renderItem={({ item }) => (
            <BoxDropShadow style={style.receiptItem} key={item.id}>
              <View style={[style.flexRow, style.justifyBetween]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={[DARK_GRAY_BOLD_18]}>
                    {dayjs(item.date).format('YYYY.MM.DD')}
                  </Text>
                  <Text style={[STANDARD_GRAY_14, { marginLeft: 10 }]}>
                    {statusType[item.status]}
                  </Text>
                </View>
              </View>
              <View style={[style.flexRow, style.infoWrap]}>
                <Image
                  style={style.imageWrap}
                  source={{ uri: `${IMAGESERVER_PREFIX}${item.sub_image}` }}
                />
                <View>
                  <Text style={DARK_GRAY_BOLD_16}>{item.hospital_name}</Text>
                  <Text>{item.product_name}</Text>
                </View>
              </View>
              <View style={[style.flexRow, style.justifyBetween]}>
                <Text>총 결제금액</Text>
                <Text style={DARK_GRAY_BOLD_14}>
                  {convertNumberLocale(item.price)}
                </Text>
              </View>
            </BoxDropShadow>
          )}
        />
      ) : (
        <View style={{ paddingHorizontal: 25, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {isInit ?
          <Text>조회된 결제 목록이 없습니다.</Text>
          : 
          <ActivityIndicator size="large" />}
        </View>
      )}
    </SafeAreaView>
  );
};
