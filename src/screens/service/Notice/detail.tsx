import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, View } from 'react-native';

import imageTemplate from '@/assets/template_image.jpg';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import style from './style';

export default ({
  route,
  navigation,
}: RootScreenProps<Routes.NOTICE_DETAIL>) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const { title, content } = route.params;

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('setting.notice')} />
      <View style={style.imageBox}>
        <Image source={imageTemplate} style={style.image} resizeMode="cover" />
      </View>
      <View style={style.titleWrap}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {route.params.title}
        </Text>
        <Text>Sub title</Text>
        <Text style={{ marginTop: 30 }}>2023.01.01 ~ 2023.01.01</Text>
      </View>
      <View style={style.contentWrap}>
        <Text>{route.params.content}</Text>
      </View>
    </SafeAreaView>
  );
};
