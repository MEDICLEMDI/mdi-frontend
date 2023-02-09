import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleLogo from '@/assets/icons/wallet_logo.png';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletHome = ({
  navigation,
}: RootScreenProps<Routes.WALLET_HOME>) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={false} title={t('header.wallet')} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
        <View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletHome;
