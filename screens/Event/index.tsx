import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";

import Header from "../../components/Header";
import BoxDropShadow from "../../components/BoxDropShadow";

import style from "./style";

import event_sample from '../../assets/images/event_sample.png';
import ic_refresh from "../../assets/images/ic_refresh.png";

const Event = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.event')}/>
      <ScrollView horizontal={false} style={{flex: 1, width: '100%'}}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={ic_refresh} style={{ width: 63, height: 63, marginTop: 100, marginBottom: 20 }}/>
          <Text>{t('comingSoon')}</Text>
        </View>
        {/*<View style={style.eventPanel}>*/}
        {/*</View>*/}
        {/*<View style={style.contentWrap}>*/}
        {/*  <BoxDropShadow color={'#E8E8E8'} offset={[0, 7]} elevation={5} opacity={0.95} radius={20} viewStyle={style.eventBox}>*/}

        {/*  </BoxDropShadow>*/}
        {/*</View>*/}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Event;