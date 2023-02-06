import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, View, FlatList} from "react-native";

import Header from "@/components/Header";

import style from "./style";

import {dentist} from "@/components/Menus";
import Icons from "@/icons";

const Hospital = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')}/>
      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dentist(t)}
          renderItem={({item}) => (<Text style={{paddingHorizontal: 12, paddingVertical: 4}}>{item.name}</Text>)} />
      </View>
      <ScrollView horizontal={false}>
        <View style={style.listWrap}>
          <Icons name='refresh' />
          <Text>{t('comingSoon')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Hospital;