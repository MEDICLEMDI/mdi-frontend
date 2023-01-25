import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";

import Header from "../../components/Header";

import style from "./style";

import ic_refresh from "../../assets/images/ic_refresh.png";
import BoxDropShadow from "../../components/BoxDropShadow";

const Wallet = ({ navigation }) => {
    const { t } = useTranslation();
    const isFocus = useIsFocused();

    return (
        <SafeAreaView style={style.container}>
            <Header goBack={false}/>
            <ScrollView horizontal={false}>
                <View style={style.contentWrap}>
                    <BoxDropShadow color={'#E8E8E8'} offset={[0, 7]} elevation={5} opacity={0.95} radius={20} viewStyle={style.profileWrap}>

                    </BoxDropShadow>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Wallet;