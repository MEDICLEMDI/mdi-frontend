import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import MedicleLogo from '@/assets/icons/wallet_logo.png';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import styles from './styles';

const HomeWallet = ({
  navigation,
}: RootScreenProps<Routes.WALLET_HOME>) => {
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.wallet')} />
      <ScrollView horizontal={false} style={style.contentWrap}>
        <View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeWallet;
