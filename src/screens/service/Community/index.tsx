import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeModules } from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import ImageSlide from '@/components/ImageSlide';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const socialMedias = [
    { icon: <Icon name="twitter" />, name: '트위터' },
    { icon: <Icon name="facebook" />, name: '페이스북' },
    { icon: <Icon name="instagram" />, name: '인스타그램' },
    { icon: <Icon name="telegram" />, name: '텔레그램' },
    { icon: <Icon name="github" />, name: '깃허브' },
  ];

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.community')} />
      <ScrollView>
        <ImageSlide />
        <View style={style.content}>
          <Text style={{ marginTop: 30, marginLeft: 30, }}>공식 SNS</Text>
          <View style={style.snsLinkWrap}>
            {socialMedias.map(({ icon, name }, key) => (
              <BoxDropShadow
                key={key}
                color={
                  Platform.OS === 'ios'
                    ? Colors.Medicle.Gray.SemiLight
                    : Colors.Medicle.Gray.Standard
                }
                offset={[0, 7]}
                elevation={8}
                opacity={0.95}
                radius={20}
                style={style.snsLinkItem}>
                <View style={style.snsLink}>
                  {icon}
                  <Text style={{ marginLeft: 20 }}>{name} 바로가기</Text>
                </View>
                <Icon name="arrowRight" />
              </BoxDropShadow>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
