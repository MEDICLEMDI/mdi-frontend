import * as React from 'react';
import {View, Text, ScrollView, SafeAreaView, Image} from "react-native";
import style from "./style";
import Header from "../../components/Header";
import ic_refresh from "../../assets/images/ic_refresh.png";
import {useTranslation} from "react-i18next";
import {useIsFocused} from "@react-navigation/native";

export default () => {
    const { t } = useTranslation();
    const isFocus = useIsFocused();

    return (
        <SafeAreaView style={style.container}>
            <Header goBack={true}/>
            <ScrollView horizontal={false}>
                <View style={style.listWrap}>
                    <Image source={ic_refresh} style={{ width: 63, height: 63, marginTop: 100, marginBottom: 20 }}/>
                    <Text>{t('comingSoon')}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}