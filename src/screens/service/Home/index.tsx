import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';

import ReviewImage from '@/assets/images/Review.png';
import CategoryTab from '@/components/CategoryTab';
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

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const SELECTED_TAB_FONT = fontStyleCreator({
    size: 16,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const TAB_FONT = fontStyleCreator({
    size: 16,
    color: Colors.Medicle.Font.Gray.Standard,
  });

  const [tabIndex, setTabIndex] = React.useState(0)

  const numColumns = 3;
  const categoryPadding = 30;
  const gap = 15;
  const categories = [dentist, dermatology];

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <ScrollView horizontal={false}>
        <View>
          <ImageSlide />

          <View style={style.searchInput}>
            <MedicleInput
              placeholder={t('home.inputPlaceholder')}
              rightInputNode={<Icons name="search" />}
              direction='row'
            />
          </View>

          <Tab
            data={tabs}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            textStyle={TAB_FONT}
            tabSelectedStyle={[SELECTED_TAB_FONT, style.tabSelected]}
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
          />

          <View style={style.reviewWrap}>
            <Image
              source={ReviewImage}
              resizeMode="contain"
              style={style.reviewImage}
            />
          </View>
          {/*<View style={style.listWrap}>*/}
          {/*  <Icon name="refresh" />*/}
          {/*  <Text>{t('comingSoon')}</Text>*/}
          {/*</View>*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
