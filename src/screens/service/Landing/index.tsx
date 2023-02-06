import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image } from "react-native";

import style from "./style";
import * as React from "react";
import Icons from "@/icons";

const Landing = () => {
    return (
        <SafeAreaView style={style.container}>
            <View>
              <Icons name='mdiLogo' />
            </View>
        </SafeAreaView>
    )
}

export default Landing;
