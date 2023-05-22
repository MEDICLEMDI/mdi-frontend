import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, View } from 'react-native';

import imageTemplate from '@/assets/template_image.jpg';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import style from './style';
import Config from 'react-native-config';
import dayjs from 'dayjs';

export default ({
  route,
  navigation,
}: RootScreenProps<Routes.NOTICE_DETAIL>) => {
  const { t } = useTranslation();
  const notice = route.params;
  const { IMAGESERVER_PREFIX } = Config;

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('setting.notice')} />
      <View style={style.imageBox}>
        <Image source={{ uri: `${IMAGESERVER_PREFIX}${notice.main_image}` }} style={style.image} resizeMode="cover"/>
      </View>
      <View style={style.titleWrap}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{notice.title}</Text>
        <Text>{dayjs(notice.date).format('YYYY.MM.DD hh:s')}</Text>
      </View>
      <View style={style.contentWrap}>
        <Text>{notice.content}</Text>
      </View>
    </SafeAreaView>
  );
};
