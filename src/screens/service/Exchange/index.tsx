import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import Header from '@/components/Header';
import Icons from '@/icons';

import style from './style';
import BoxDropShadow from "@/components/BoxDropShadow";
import {Row} from "@/layout";

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.exchange')} />
      <View style={style.content}>
        <BoxDropShadow>
          <Row align='center'>
            <Icons name='facebook' />
            <Row justify='space-between' align='center' style={{ flex: 1 }}>
              <Text style={{ marginLeft: 15, }}>거래소</Text>
              <Icons name='arrowRight' />
            </Row>
          </Row>
        </BoxDropShadow>
        {/*<View style={style.noData}>*/}
        {/*  <Text>등록된 거래소 정보가 없습니다.</Text>*/}
        {/*</View>*/}
      </View>
    </SafeAreaView>
  );
};
