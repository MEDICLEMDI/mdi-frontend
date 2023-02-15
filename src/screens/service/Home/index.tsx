import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import ReviewImage from '@/assets/images/Review.png';
import CategoryTab from '@/components/CategoryTab';
import Header from '@/components/Header';
import ImageSlide from '@/components/ImageSlide';
import InputIcon from '@/components/InputIcon';
import { dentist, dermatology } from '@/components/Menus';
import Icon from '@/icons';

import style from './style';
import Config from "react-native-config";

const Home = ({ navigation }) => {
  const { t } = useTranslation();

  const isFocus = useIsFocused();
  const [tabs, setTabs] = useState<any[]>([]);

  useEffect(() => {
    initialize();
  }, [isFocus]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      // Prevent default behavior
      // e.preventDefault();

      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  const initialize = () => {
    setTabs([
      { name: t('category.dental'), data: dentist(t) },
      { name: t('category.cosmetic'), data: dermatology(t) },
    ]);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <ScrollView horizontal={false}>
        <View>
          <ImageSlide />

          <InputIcon
            onPress={() => console.log('Test')}
            placeholder={t('home.inputPlaceholder')}
            icon="search"
          />

          <CategoryTab tabs={tabs} itemStyle={style.itemStyle} type="box" />

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
