import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View } from 'react-native';

import Icon from '@/icons';

import style from './style';

interface IHeader {
  goBack: boolean;
  title?: string | undefined;
  rightNode?: React.ReactNode;
}

const Header = ({ goBack, title, rightNode }: IHeader) => {
  const navigation = useNavigation();
    return (
      <View style={style.headerWrap}>
        {goBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowLeft" />
          </TouchableOpacity>
        ) : (
          <View style={style.ic_left_arrow} />
        )}
        {title === undefined ? (
          <Icon name="mdiHorizontal" fill={'#000'} />
        ) : (
          <Text>{title}</Text>
        )}
        {rightNode ? (
          rightNode
        ) : (
          <View style={style.ic_left_arrow} />
        )}
      </View>
    );
};

export default Header;
