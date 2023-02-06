import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {profileMenus} from "@/components/Menus";

import Header from "@/components/Header";
import BoxDropShadow from "@/components/BoxDropShadow";
import GridList from "@/components/GridList";
import TestModal from "@/components/Modal";

import style from "./style";
import Icons from "@/icons";

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [menus, setMenus] = React.useState([]);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    initialize();
  }, [i18n.language])

  const initialize = () => {
    setMenus(profileMenus(t));
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.profile')}/>
      <ScrollView horizontal={false} style={{flex: 1, width: '100%'}}>
        <View style={style.contentWrap}>
          <BoxDropShadow color={'#E8E8E8'} offset={[0, 7]} elevation={5} opacity={0.95} radius={20} viewStyle={style.profileWrap}>
            <View style={style.profileNameWrap}>
              <Icons name='user' />
              <Text style={style.name}>Preview</Text>
            </View>

            <TouchableOpacity onPress={() => setActive(true)}>
              <View style={style.pointBtn}>
                <Icons name='mdiIcon' />
                <Text>{t('profile.myPoint')}</Text>
                <Text style={{marginLeft: 10, marginRight: 5}}>0 P</Text>
                <Icons name='arrowRight' />
              </View>
            </TouchableOpacity>
          </BoxDropShadow>

          <TouchableOpacity style={style.editProfileBtn} onPress={() => setActive(true)}>
            <Text>{t('profile.editProfile')}</Text>
            <Icons name='arrowRight' />
          </TouchableOpacity>

          <GridList data={menus} itemStyle={style.menuItems} onPress={() => null} type='circle'/>
        </View>
      </ScrollView>
      <TestModal active={active} closeHandler={() => setActive(false)} />
    </SafeAreaView>
  )
}

export default Profile;