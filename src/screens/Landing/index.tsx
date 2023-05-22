import { useEffect, useState } from 'react';
import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import Icon from '@/icons';

import style from './style';

const Landing = () => {
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Icon name="mdiLogo" />
      </View>
    </SafeAreaView>
  );
};

export default Landing;
