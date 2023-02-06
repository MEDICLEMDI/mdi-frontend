import React from 'react';
import {View, Text, Image, Platform, TouchableOpacity} from 'react-native';

import style from "./style";

import Icon from '@/icons';
import { useNavigation } from "@react-navigation/native";

interface IHeader {
  goBack: boolean;
  title: string | undefined;
}

const Header = ({goBack, title}: IHeader)  => {
    const navigation = useNavigation();
    return (
        <View style={style.headerWrap}>
            {
                goBack
                ?
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name='arrowLeft' />
                </TouchableOpacity>
                :
                <View style={style.ic_left_arrow} />
            }
            {
              title === undefined
              ?
                <Icon name='mdiHorizontal' color={'#000000'}/>
              :
                <Text>{title}</Text>
            }
            <Icon name='alarm' />
        </View>
    );
}

export default Header;