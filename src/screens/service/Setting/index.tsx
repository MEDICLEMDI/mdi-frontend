import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import Icons from '@/icons';
import Routes from '@/navigation/Routes';

import style from './style';

const Setting = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const languageChangeHandler = () => {
    if (i18n.language === 'kr') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('kr');
    }
  };
  const pageRoute = (route: string) => {
    navigation.navigate(route);
  };
  const data = [
    {
      name: t('setting.notice'),
      route: 'Notice',
      onPress: () => pageRoute(Routes.NOTICE),
    },
    {
      name: t('setting.contact'),
      route: 'Contact',
      onPress: () => pageRoute(Routes.SERVICE_CONTACTS),
    },
    {
      name: t('setting.doc1'),
      route: 'Doc1',
      onPress: () => pageRoute(Routes.SERVICE_DOCUMENT),
    },
    {
      name: t('setting.doc2'),
      route: 'Doc2',
      onPress: () => pageRoute(Routes.PERSONAL_DOCUMENT),
    },
    {
      name: t('setting.marketing'),
      route: 'Marketing',
      onPress: () => pageRoute(Routes.MARKETING),
    },
    {
      name: t('setting.language'),
      route: 'Language',
      onPress: languageChangeHandler,
    },
    {
      name: t('setting.signOut'),
      route: 'SignOut',
      onPress: () => pageRoute(Routes.SIGNOUT),
    },
  ];
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('header.settings')} />
        <FlatList
            style={style.settingWrap}
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity onPress={item.onPress ? item.onPress : null} >
                <BoxDropShadow
                    color={
                      Platform.OS === 'ios'
                          ? Colors.Medicle.Gray.SemiLight
                          : Colors.Medicle.Gray.Dark
                    }
                    offset={[0, 7]}
                    elevation={10}
                    opacity={0.95}
                    radius={10}
                    style={[style.profileWrap, { opacity: 0.99 }]}>
                  <Text>{item.name}</Text>
                  <Icons name="arrowRight" />
                </BoxDropShadow>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => <View style={{ marginTop: 20 }} />}
        />

    </SafeAreaView>
  );
};

export default Setting;
