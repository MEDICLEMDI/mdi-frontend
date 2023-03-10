import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import GridList from '@/components/GridList';
import Header from '@/components/Header';
import { profileMenus } from '@/components/Menus';
import { Colors } from '@/constants/theme';
import Icons from '@/icons';
import Routes from '@/navigation/Routes';

import style from './style';

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [menus, setMenus] = React.useState([]);

  React.useEffect(() => {
    initialize();
  }, [i18n.language]);

  const initialize = () => {
    setMenus(profileMenus(t));
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.profile')} />
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
            <Icons name="userCircle" />
            <Text style={style.name}>Preview</Text>
          </View>

          <TouchableOpacity onPress={() => null} style={{ marginBottom: 20 }}>
            <View style={style.pointBtn}>
              <Icons name="mdiIcon" />
              <Text>{t('profile.myPoint')}</Text>
              <Text style={{ marginLeft: 10, marginRight: 5 }}>0 P</Text>
              <Icons name="arrowRight" />
            </View>
          </TouchableOpacity>
        </BoxDropShadow>

        {/*<TouchableOpacity*/}
        {/*  style={style.editProfileBtn}*/}
        {/*  onPress={() => navigation.navigate(Routes.EDIT_PROFILE)}>*/}
        {/*  <Text>{t('profile.editProfile')}</Text>*/}
        {/*  <Icons name="arrowRight" />*/}
        {/*</TouchableOpacity>*/}

        <GridList
          data={menus}
          itemStyle={style.menuItems}
          onPress={() => null}
          type="circle"
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
