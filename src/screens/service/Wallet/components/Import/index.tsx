import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Header from '@/components/Header';
import LoadingModal from '@/components/LoadingModal';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { importWallet } from '@/redux/slices/keyring';

import CommonStyle from '../../common_style';
import styles from './styles';
import Config from 'react-native-config';
import { AES } from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NmemonicInput from '@/components/inputs/NmemonicInput';

const WalletImport = ({
  route,
  navigation,
  goBack,
}: RootScreenProps<Routes.WALLET_IMPORT>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { icpPrice } = useAppSelector(state => state.icp);
  const [seedPhrase, setSeedPhrase] = useState<string>();
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);
  const [error, setError] = useState<
    'nmemonic' | 'unknown' | 'over' | undefined
  >(undefined);
  const password = route?.params.password;
  const [loading, setLoading] = useState(false);

  const onChangeText = (text: string) => {
    setSeedPhrase(text);
    setInvalidSeedPhrase(false);
    setError(undefined);
    if (text.trim().split(/\s+/g).length > 12) {
      setError('over');
    }
  };

  const isMnemonicValid =
    !!seedPhrase &&
    seedPhrase.trim().split(/\s+/g).length === 12 &&
    !invalidSeedPhrase;

  const importWalletFromSeedPhrase = async () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(
        importWallet({
          icpPrice,
          mnemonic: seedPhrase!,
          password,
          onError: () => {
            setLoading(false);
          },
          onSuccess: async () => {
            const encryptKey = AES.encrypt(password, Config.AES_KEY).toString();
            await AsyncStorage.setItem('password', encryptKey);
          },
        })
      ).then(res => {
        setLoading(false);

        if (res.error) {
          if (res.payload === 'The provided mnemonic is invalid') {
            setError('nmemonic');
          } else {
            setError('unknown');
          }
        }
      });
    }, 500);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={CommonStyle.container}>
        <Header goBack={true} title={t('wallet.import.header')} />
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{t('wallet.import.title')}</Text>
            <Text style={styles.subText}>{t('wallet.import.subTitle')}</Text>
          </View>
          <View style={styles.mnemonicContainer}>
            <NmemonicInput
              error={error && error}
              onChangeText={onChangeText}
              onSubmitEditing={importWalletFromSeedPhrase}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: !isMnemonicValid ? '#989898' : '#E7E1D5' },
              ]}
              disabled={!isMnemonicValid}
              onPress={importWalletFromSeedPhrase}>
              <Text
                style={[
                  styles.btnText,
                  { color: !isMnemonicValid ? '#FFFFFF' : '#000000' },
                ]}>
                {t('wallet.import.importButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <LoadingModal name="loading" visible={loading} />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default WalletImport;
