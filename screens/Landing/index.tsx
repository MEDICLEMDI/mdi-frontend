import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image } from "react-native";

import style from "./style";

import logo from "../../assets/images/ic_logo.png"

const Landing = ({navigation}: any) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.push('Home');
        }, 1000)
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <View>
                <Image source={logo} style={style.imageLogo} resizeMode="contain"/>
            </View>
        </SafeAreaView>
    )
}

export default Landing;
