import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {Image, Platform, SafeAreaView, ScrollView, Text, View} from 'react-native';

import ReviewImage from '@/assets/images/Review.png';
import Header from '@/components/Header';
import ImageSlide from '@/components/ImageSlide';
import InputIcon from '@/components/inputs/InputIcon';
import { dentist, dermatology, tabs } from '@/constants/category';

import style from './style';
import { ScrollViewGrid } from "@/components/GridLayout";
import Tab from "@/components/Tab";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";
import {MedicleInput} from "@/components/inputs";
import Icons from "@/icons";
import BoxDropShadow from "@/components/BoxDropShadow";
import ListItem from "@/components/ListItem";

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [tabIndex, setTabIndex] = React.useState(0)

  const numColumns = 3;
  const categoryPadding = 30;
  const gap = 15;
  const categories = [dentist(t), dermatology(t)];

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <ScrollView horizontal={false}>
        <View>
          <ImageSlide />

          <View style={style.searchInput}>
            <MedicleInput
              placeholder={t('input.searchInputPlaceHolder')}
              rightInputNode={<Icons name="search" />}
              direction='row'
            />
          </View>

          <Tab
            data={tabs(t)}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            index={tabIndex}
            response={setTabIndex}
          />
          <ScrollViewGrid
            columnWrapperStyle={style.categoryWrap}
            itemStyle={style.itemStyle}
            itemBackground='#F3F1EB'
            iconStyle={style.iconStyle}
            textStyle={style.textStyle}
            numColumns={numColumns}
            padding={categoryPadding}
            gap={gap}
            data={categories[tabIndex]}
            renderItem='box'
            onPress={({ route }) => navigation.navigate(route)}
          />

          <View style={style.reviewWrap}>
            <Image
              source={ReviewImage}
              resizeMode="contain"
              style={style.reviewImage}
            />
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 30 }}>

            <ListItem
              type="고객평가우수병원"
              location="서울"
              label="서울 치과"
              description="치아 미백으로!"
              discount={20}
              price="22만원"/>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
