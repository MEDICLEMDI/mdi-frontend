import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, View, FlatList} from "react-native";

import Header from "../../components/Header";

import style from "./style";

import ic_refresh from "../../assets/images/ic_refresh.png";
import {dentist} from "../../components/Menus";

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
          <Image source={ic_refresh} style={{ width: 63, height: 63, marginTop: 100, marginBottom: 20 }}/>
          <Text>{t('comingSoon')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Hospital;