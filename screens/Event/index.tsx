import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";

import Header from "../../components/Header";

import style from "./style";

import ic_refresh from "../../assets/images/ic_refresh.png";

const Event = ({ navigation }) => {
    const isFocus = useIsFocused();

    return (
        <SafeAreaView style={style.container}>
            <Header />
            <ScrollView horizontal={false}>
                <View style={style.listWrap}>
                    <Image source={ic_refresh} style={{ width: 63, height: 63, marginTop: 100, marginBottom: 20 }}/>
                    <Text>해당 서비스는 아직 준비중이에요.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Event;