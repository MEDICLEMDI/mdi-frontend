import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import Header from '@/components/Header';

import style from './style';
import {dentist, subscribe} from "@/constants/category";
import Tab from "@/components/Tab";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const TOTAL_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  })

  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.subscribe')} />
      <View style={[style.container, style.content]}>
        <View style={style.summary}>
          <Text style={TOTAL_FONT}>전체 {0}개</Text>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Tab
              data={subscribe(t)}
              tabStyle={style.tabWrap}
              buttonStyle={style.tabButton}
              index={index}
              response={setIndex}
            />
          </ScrollView>
        </View>
        <View style={style.noData}>
          <Text>등록된 관심상품이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
