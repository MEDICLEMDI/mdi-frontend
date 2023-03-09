import React, { useEffect } from 'react';
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
import KeyRing from '@/modules/keyring';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletWelcome = ({
  navigation,
}: RootScreenProps<Routes.WALLET_WELCOME>) => {
  const { t } = useTranslation();
  const { isInitialized } = useAppSelector(state => state.keyring);

  const keyring = KeyRing.getInstance();

  const onPress = (flow: 'create' | 'import') => () =>
    navigation.navigate(Routes.WALLET_CREATE_PASSWORD, {
      flow,
    });

  const goHome = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: Routes.WALLET_HOME }],
    });
  };

  useEffect(() => {
    if (isInitialized) {
      goHome();
    }
  }, [isInitialized]);

  if (keyring.isInitialized) {
    navigation.navigate(Routes.WALLET_HOME);
  }
  return isInitialized ? null : (
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
            <MedicleButton
              text={t('wallet.welcome.createButton')}
              buttonStyle={styles.createButton}
              onPress={onPress('create')}
            />
            <MedicleButton
              text={t('wallet.welcome.importButton')}
              buttonStyle={styles.importButton}
              textStyle={styles.importButtonText}
              onPress={onPress('import')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletWelcome;
