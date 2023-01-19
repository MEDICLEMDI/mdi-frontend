import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";

import Header from "../../components/Header";

import style from "./style";

import ic_refresh from "../../assets/images/ic_refresh.png";

const Profile = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const isFocus = useIsFocused();

    const changeLanguageHandler = () => {
        if(i18n.language === 'en')
            i18n.changeLanguage('kr');
        else
            i18n.changeLanguage('en');
    }

    return (
        <SafeAreaView style={style.container}>
            <Header />
            <ScrollView horizontal={false}>
                <View style={style.contentWrap}>
                    <TouchableOpacity style={style.languageBtn} onPress={() => changeLanguageHandler()}>
                        <Text>{t('option.changeLang')}</Text>
                    </TouchableOpacity>
                    <View style={style.listWrap}>
                        <Image source={ic_refresh} style={{ width: 63, height: 63, marginTop: 100, marginBottom: 20 }}/>
                        <Text>{t('comingSoon')}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;