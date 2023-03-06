import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, SafeAreaView, ScrollView, Text, View } from "react-native";

import Header from '@/components/Header';
import Icons from '@/icons';

import style from './style';
import { dentist } from "@/constants/category";

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.subscribe')} />
      <View style={[style.container, style.content]}>
        <View style={style.summary}>
          <Text>전체{0}개</Text>
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={dentist(t)}
            renderItem={({item}) => (<Text style={{paddingHorizontal: 12, paddingVertical: 4}}>{item.name}</Text>)} />
        </View>
        <View style={style.noData}>
          <Text>등록된 관심상품이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
