import * as React from 'react';
import {View, SafeAreaView, Text, ScrollView, Image, Platform, Pressable} from "react-native";

import { useTranslation } from "react-i18next";
import BoxDropShadow from "@/components/BoxDropShadow";
import Header from "@/components/Header";
import Icons from "@/icons";

import style from "./style";
import TestModal from "@/components/Modal";
import Routes from "@/navigation/Routes";

const Setting = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [active, setActive] = React.useState(false);

    const languageChangeHandler = () => {
        if(i18n.language === 'kr')
            i18n.changeLanguage('en');
        else
            i18n.changeLanguage('kr')
    }
    const pageRoute = (route: string) => {
        navigation.navigate(route);
    }
    const data = [
        { name: t('setting.notice'), route: 'Notice', onPress: () => pageRoute(Routes.NOTICE) },
        { name: t('setting.contact'), route: 'Contact', onPress: () => pageRoute(Routes.SERVICE_CONTACTS) },
        { name: t('setting.doc1'), route: 'Doc1', onPress: () => pageRoute(Routes.SERVICE_DOCUMENT) },
        { name: t('setting.doc2'), route: 'Doc2', onPress: () => pageRoute(Routes.PERSONAL_DOCUMENT) },
        { name: t('setting.marketing'), route: 'Marketing', onPress: () => pageRoute(Routes.MARKETING) },
        { name: t('setting.language'), route: 'Language', onPress: languageChangeHandler },
        { name: t('setting.signOut'), route: 'SignOut', onPress: () => setActive(true) },
    ]
    return (
        <SafeAreaView style={style.container}>
            <Header goBack={true} title={t('header.settings')}/>
            <ScrollView horizontal={false} style={{flex: 1, width: '100%'}}>
                <View style={{marginTop: 20}}>
                {
                    data.map((item, key) => (
                        <Pressable key={key} onPress={item.onPress ? item.onPress : null}>
                            <BoxDropShadow color={Platform.OS === 'ios' ? '#E8E8E8' : '#454545'} offset={[0, 7]} elevation={10} opacity={0.95} radius={20} viewStyle={style.profileWrap}>
                                <Text>{item.name}</Text>
                                <Icons name='arrowRight' />
                            </BoxDropShadow>
                        </Pressable>
                    ))
                }
                </View>
            </ScrollView>
            <TestModal active={active} closeHandler={() => setActive(false)} />
        </SafeAreaView>
    )
}

export default Setting;