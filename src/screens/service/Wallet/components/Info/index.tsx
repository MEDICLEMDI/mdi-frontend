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

const WalletInfo = ({ navigation }: RootScreenProps<Routes.WALLET_INFO>) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={'내 정보'} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}></Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.WALLET_SEND);
          }}>
          <Text>보내기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletInfo;
