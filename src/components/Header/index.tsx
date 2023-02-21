import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

import Icon from '@/icons';

import style from './style';

interface IHeader {
  goBack: boolean;
  title?: string | undefined;
}

const Header = ({ goBack, title }: IHeader) => {
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
        <Icon name="mdiHorizontal" color={'#000000'} />
      ) : (
        <Text>{title}</Text>
      )}
      {/*<Icon name="alarm" />*/}
      <View style={style.ic_left_arrow} />
    </View>
  );
};

export default Header;
