import * as React from 'react';
import {View, SafeAreaView, Text, ScrollView, TouchableOpacity, Image} from "react-native";

import { useTranslation } from "react-i18next";
import BoxDropShadow from "../../components/BoxDropShadow";
import Header from "../../components/Header";

import ic_arrow_right from "../../assets/images/ic_arrow_right.png"

import style from "./style";
import TestModal from "../../components/Modal";

const Setting = () => {
    const { t, i18n } = useTranslation();
    const [active, setActive] = React.useState(false);

    const languageChangeHandler = () => {
        if(i18n.language === 'kr')
            i18n.changeLanguage('en');
        else
            i18n.changeLanguage('kr')
    }

    const data = [
        { name: t('setting.notice'), route: 'Notice', onPress: () => setActive(true) },
        { name: t('setting.contact'), route: 'Contact', onPress: () => setActive(true) },
        { name: t('setting.doc1'), route: 'Doc1', onPress: () => setActive(true) },
        { name: t('setting.doc2'), route: 'Doc2', onPress: () => setActive(true) },
        { name: t('setting.marketing'), route: 'Marketing', onPress: () => setActive(true) },
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
                        <TouchableOpacity key={key} onPress={item.onPress ? item.onPress : null}>
                            <BoxDropShadow color={'#E8E8E8'} offset={[0, 7]} elevation={5} opacity={0.95} radius={20} viewStyle={style.profileWrap}>
                                <Text>{item.name}</Text>
                                <Image source={ic_arrow_right} style={{ width: 20, height: 20 }}/>
                            </BoxDropShadow>
                        </TouchableOpacity>
                    ))
                }
                </View>
            </ScrollView>
            <TestModal active={active} closeHandler={() => setActive(false)} />
        </SafeAreaView>
    )
}

export default Setting;