import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import Header from '@/components/Header';
import Icons from '@/icons';
import Routes from '@/navigation/Routes';

import style from './style';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const data = [
    { title: 'Test Notice 1', content: 'This is test notice.' },
    { title: 'Test Notice 2', content: 'This is test notice.' },
    { title: 'Test Notice 3', content: 'This is test notice.' },
    { title: 'Test Notice 4', content: 'This is test notice.' },
    { title: 'Test Notice 5', content: 'This is test notice.' },
    { title: 'Test Notice 6', content: 'This is test notice.' },
    { title: 'Test Notice 7', content: 'This is test notice.' },
  ];

  const pageRoute = (route: string, data: any) => {
    navigation.navigate(route, data);
  };

  const NoticeBox = (item: any) => {
    return (
      <TouchableOpacity
        style={style.noticeWrap}
        onPress={() => pageRoute(Routes.NOTICE_DETAIL, item)}>
        <Text>{item.title}</Text>
        <Icons name="arrowRight" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('setting.notice')} />
      <FlatList
        data={data}
        renderItem={({ item }) => NoticeBox(item)}
        style={style.noticeList}
      />
    </SafeAreaView>
  );
};
