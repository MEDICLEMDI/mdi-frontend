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

/**
 * Header
 * @param {boolean} goBack - 뒤로가기 버튼 활성화 여부
 * @param {string | undefined} title - 헤더 타이틀, 타이틀이 없는경우 로고가 노출됩니다.
 * @param {React.ReactNode} rightNode - 헤더 우측 영영에 표시될 노드
 * @comment 공용 페이지 헤더 컴포넌트입니다.
 */
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
