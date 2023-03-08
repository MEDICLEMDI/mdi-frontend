import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  SafeAreaView, ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { myPageMenus } from '@/constants/menus';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';

import style from './style';
import {ScrollViewGrid} from "@/components/GridLayout";

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const numColumns = 3;
  const menuPadding = 50;
  const gap = 30;

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.profile')} />
      <ScrollView>

        <View style={style.contentWrap}>
          <BoxDropShadow
            color={
              Platform.OS === 'ios'
                ? Colors.Medicle.Gray.SemiLight
                : Colors.Medicle.Gray.Standard
            }
            offset={[0, 7]}
            elevation={10}
            opacity={0.95}
            radius={10}
            style={style.profileWrap}>
            <View style={style.profileNameWrap}>
              <Icon name="userCircle" />
              <Text style={style.name}>Preview</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate(Routes.POINT_CHARGE)}>
              <View style={style.pointBtn}>
                <Icon name="mdiIcon" />
                <Text style={{ marginHorizontal: 10 }}>{t('profile.myPoint')}</Text>
                <Text>0 P</Text>
                <Icon name="arrowRight" />
              </View>
            </TouchableOpacity>
          </BoxDropShadow>

          <TouchableOpacity
            style={style.editProfileBtn}
            onPress={() => navigation.navigate(Routes.EDIT_PROFILE)}>
            <Text>{t('profile.editProfile')}</Text>
            <Icon name="arrowRight" />
          </TouchableOpacity>
        </View>
        <ScrollViewGrid
          itemStyle={style.itemStyle}
          itemBackground={Colors.Medicle.Brown.Light}
          numColumns={numColumns}
          padding={menuPadding}
          gap={gap}
          data={myPageMenus(t)}
          onPress={({ route }) => navigation.navigate(route)}
          renderItem='circle'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
