import * as React from 'react';
import {SafeAreaView, View, Text, Image, Platform, TouchableOpacity} from 'react-native';

import style from "./style";

import logo from "../../assets/images/ic_logo.png"
import left_arrow from "../../assets/images/ic_arrow_left.png";
import alarm from "../../assets/images/ic_alarm.png";
import {useNavigation} from "@react-navigation/native";

interface IHeader {
  goBack: boolean;
  title: string | undefined;
}

const Header = ({goBack, title}: IHeader)  => {
    const navigation = useNavigation();
    return (
        <View style={[style.headerWrap, [Platform.OS === 'android' ? { paddingTop: 20 } : null]]}>
            {
                goBack
                ?
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={left_arrow} style={style.ic_left_arrow}/>
                </TouchableOpacity>
                :
                <View style={style.ic_left_arrow} />
            }
            {
              title === undefined
              ?
              <Image source={logo} style={style.logo}/>
              :
                <Text>{title}</Text>
            }
            <Image source={alarm} style={style.ic_alarm}/>
        </View>
    );
}

export default Header;