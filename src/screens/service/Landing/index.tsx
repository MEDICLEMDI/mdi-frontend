import { useEffect, useState } from 'react';
import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import Icons from '@/icons';

import style from './style';

const Landing = () => {
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Icons name="mdiLogo" />
      </View>
    </SafeAreaView>
  );
};

export default Landing;
