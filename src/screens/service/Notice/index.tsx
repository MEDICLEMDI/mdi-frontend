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
import Icon from '@/icons';
import Routes from '@/navigation/Routes';

import style from './style';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [notices, setNotices] = React.useState<{title: string, content: string}[]>();

  const initialize = () => {

    const data = [
      { title: 'Test Notice', content: 'This is test notice.' },
    ];
    setNotices(data);
  }

  React.useMemo(() => initialize(), [isFocus]);

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('setting.notice')} />
      <FlatList
        style={style.noticeList}
        data={notices}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.noticeWrap}
            onPress={() => navigation.navigate(Routes.NOTICE_DETAIL, item)}>
            <Text>{item.title}</Text>
            <Icon name="arrowRight" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
