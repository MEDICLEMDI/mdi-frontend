import * as React from 'react';
import {View, Text, ScrollView, SafeAreaView, Image} from "react-native";
import style from "./style";
import Header from "@/components/Header";

import {useTranslation} from "react-i18next";
import {useIsFocused} from "@react-navigation/native";
import Icons from "@/icons";

export default () => {
    const { t } = useTranslation();
    const isFocus = useIsFocused();

    return (
        <SafeAreaView style={style.container}>
            <Header goBack={true}/>
            <ScrollView horizontal={false}>
                <View style={style.listWrap}>
                  <Icons name='refresh' />
                  <Text>{t('comingSoon')}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}