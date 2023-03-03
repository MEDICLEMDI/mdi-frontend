import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, View, FlatList, TouchableOpacity} from "react-native";

import ListItem from "@/components/ListItem";
import Tab from "@/components/Tab";
import Header from "@/components/Header";

import style from "./style";

import {dentist} from "@/constants/category";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";

const Hospital = ({ navigation }) => {
  const { t } = useTranslation();
  const SELECTED_TAB_FONT = fontStyleCreator({
    size: 14,
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const TAB_FONT = fontStyleCreator({
    size: 14,
    color: Colors.Medicle.Font.Gray.Standard,
  });

  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')}/>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Tab
            data={dentist(t)}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            textStyle={TAB_FONT}
            tabSelectedStyle={[SELECTED_TAB_FONT, style.tabSelected]}
            index={index}
            response={setIndex}
          />
        </ScrollView>
      </View>

      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <ListItem
          type="고객평가우수병원"
          location="서울"
          label="서울 치과"
          description="치아 미백으로!"
          discount={20}
          price="22만원"/>

      </ScrollView>
      {/*<View style={style.noData}>*/}
      {/*  <Text>등록된 병원이 없습니다.</Text>*/}
      {/*</View>*/}
    </SafeAreaView>
  )
}

export default Hospital;
