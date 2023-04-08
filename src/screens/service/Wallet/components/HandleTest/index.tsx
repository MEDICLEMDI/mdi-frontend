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
import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { createICPWalletWithMnemonic } from '@/utils/wallet/feature';

import CommonStyle from '../../common_style';
import styles from './styles';

const HandleTest = ({ navigation }: RootScreenProps<Routes.HANDLE_TEST>) => {
  const { t } = useTranslation();

  const handleCreateWallet = async () => {
    createICPWalletWithMnemonic('12341234');
  };
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={false} title={t('header.wallet')} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
        <View style={styles.titleContainer}>
          <MedicleButton text="지갑생성" onPress={handleCreateWallet} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HandleTest;
