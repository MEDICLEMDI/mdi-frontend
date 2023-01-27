import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { CountUp } from "use-count-up";

import Header from "../../components/Header";
import BoxDropShadow from "../../components/BoxDropShadow";
import { LIGHT_GRAY, DARK_GRAY } from '../../config/Color';

import style from "./style";

import ic_mdi_logo from '../../assets/images/ic_mdi_logo.png'
import ic_menu from '../../assets/images/ic_menu.png'
import ic_refresh from "../../assets/images/ic_refresh.png";

const MOCK_VALUE = 0;

const Wallet = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [balance, setBalance] = React.useState(0);
  const [krw, setKrw] = React.useState(0);

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.wallet')}/>
      <ScrollView horizontal={false} style={style.contentWrap}>
        <View style={style.balanceWrap}>
          <View style={style.symbolWrap}>
            <Image source={ic_mdi_logo} style={{ width: 22, height: 15 }} resizeMode='contain'/>
            <Text style={style.symbolText}>MDI</Text>
          </View>
          <Text style={style.balance}>
            <CountUp
              isCounting
              end={MOCK_VALUE}
              duration={3.5}
              easing='easeOutCubic'
              formatter={value => value.toLocaleString(undefined,{minimumFractionDigits: 2})}
            /> MDI
          </Text>
          <View style={style.toKrwWrap}>
            <Text style={style.toKrwText}>{ MOCK_VALUE.toLocaleString() } KRW</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={ic_refresh} style={{ width: 63, height: 63, marginTop: 100, marginBottom: 20 }}/>
          <Text>{t('comingSoon')}</Text>
        </View>
        {/*<View style={style.searchTx}>*/}
        {/*  <View style={style.historyHeader}>*/}
        {/*    <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{t('wallet.transactionHistory')}</Text>*/}
        {/*    <Text style={{ fontSize: 12, color: '#989898' }}>{t('wallet.pastYear')}</Text>*/}
        {/*  </View>*/}
        {/*  <TouchableOpacity>*/}
        {/*    <Image source={ic_menu} style={{ width: 24, height: 24 }}/>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
        {/*<View>*/}
        {/*  <BoxDropShadow color={'#E8E8E8'} offset={[0, 7]} elevation={5} opacity={0.95} radius={20} viewStyle={style.transactionBox}>*/}
        {/*    <View style={style.transactionHeader}>*/}
        {/*      <Text style={{ color: LIGHT_GRAY }}>2022-11-22-15:12</Text>*/}
        {/*      <Text style={{ color: LIGHT_GRAY }}>충전</Text>*/}
        {/*    </View>*/}
        {/*    <Text style={style.transactionHash}>dd9ed4asd...</Text>*/}
        {/*    <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', color: DARK_GRAY }}>*/}
        {/*      {MOCK_VALUE.toLocaleString()} MDI*/}
        {/*    </Text>*/}
        {/*  </BoxDropShadow>*/}
        {/*</View>*/}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Wallet;