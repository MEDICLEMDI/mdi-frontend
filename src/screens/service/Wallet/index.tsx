import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { CountUp } from 'use-count-up';

import Header from '@/components/Header';
import Icons from '@/icons';
import KeyRing from '@/modules/keyring';

import HomeWallet from './components/Home';
import WelcomeWallet from './components/Welcome';
import CommonStyle from './common_style';
import Routes from '@/navigation/Routes';

const MOCK_VALUE = 0;

const Wallet = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [wallet, setWallet] = React.useState(false);

  const [balance, setBalance] = React.useState(0);
  const [krw, setKrw] = React.useState(0);

  const keyring = KeyRing.getInstance();
  React.useEffect(() => {
    if (keyring.isInitialized) {
      setWallet(true);
    }
  }, []);

  return (
    // <SafeAreaView style={style.container}>
    //   <Header goBack={false} title={t('header.wallet')} />
    //   <ScrollView horizontal={false} style={style.contentWrap}>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default Wallet;
