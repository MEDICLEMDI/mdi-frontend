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

const WalletWelcome = ({
  navigation,
}: RootScreenProps<Routes.WALLET_WELCOME>) => {
  const { t } = useTranslation();

  const onPress = (flow: 'create' | 'import') => () =>
    navigation.navigate(Routes.WALLET_CREATE_PASSWORD, {
      flow,
    });
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={false} title={t('header.wallet')} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
        <View>
          <View style={styles.imgContainer}>
            <Image
              source={MedicleLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {t('wallet.welcome.textFirst')} {'\n'}
              {t('wallet.welcome.textSecond')}
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={onPress('create')}>
              <Text style={styles.createBtnText}>
                {t('wallet.welcome.createButton')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.importBtn}
              onPress={onPress('import')}>
              <Text style={styles.importBtnText}>
                {t('wallet.welcome.importButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletWelcome;
