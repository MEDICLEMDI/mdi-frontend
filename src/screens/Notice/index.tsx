import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '@/components/Header';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import api from '@/components/Api';

import style from './style';
import { INotice } from '@/interfaces/api';

export default ({ navigation }: any) => {
  const { t } = useTranslation();

  const [notices, setNotices] = React.useState<INotice[]>([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setLoading] = React.useState(false);
  const [isMore, setIsMore] = React.useState(true);

  React.useEffect(() => {
    initialize();
  }, []);

  /**
   * 화면 초기화
   */
  const initialize = async () => {
    setPage(1);
    setIsMore(true);
    getNotices(1);
  };

  /**
   * 공지사항 리스트 가져오기
   */
  const getNotices = async (_page: number) => {
    if(isLoading) return false;
    setLoading(true);
    try {
      const response = await api.getNotices(_page);
      const { message, data } = response;
      setPage(_page);
      setIsMore(message === 'isMore');
      if (_page === 1) {
        setNotices(data!);  
      } else {
        const arr = notices.concat(data!);
        setNotices(arr);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('setting.notice')} />
      {notices.length > 0 ? (
        <FlatList
          style={style.noticeList}
          data={notices}
          keyExtractor={(item) =>item.id}
          onEndReached={() => isMore ? getNotices(page + 1) : null}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<>{isLoading && <ActivityIndicator />}</>}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={style.noticeWrap}
              onPress={() => navigation.navigate(Routes.NOTICE_DETAIL, item)}>
              <Text>{item.title}</Text>
              <Icon name="arrowRight" />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          {
            isLoading
            ?
            <ActivityIndicator size="large" />
            :
            <Text>등록된 공지사항이 없습니다.</Text>
          }
        </View>
      )}
    </SafeAreaView>
  );
};
