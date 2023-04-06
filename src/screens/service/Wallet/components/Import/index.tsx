import AsyncStorage from '@react-native-async-storage/async-storage';
import { AES } from 'crypto-js';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Config from 'react-native-config';

import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import NmemonicInput from '@/components/inputs/NmemonicInput';
import LoadingModal from '@/components/LoadingModal';
import { FungibleStandard } from '@/interfaces/keyring';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { importWallet } from '@/redux/slices/keyring';
import { addCustomToken, getBalance, getTokenInfo } from '@/redux/slices/user';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletImport = ({ route }: RootScreenProps<Routes.WALLET_IMPORT>) => {
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
  const canisterId: string = 'h4gr6-maaaa-aaaap-aassa-cai';
  const standard: FungibleStandard = 'DIP20';

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
            addMdiToken().then(() => {
              dispatch(getBalance());
            });
            const encryptKey = AES.encrypt(password, Config.AES_KEY).toString();
            await AsyncStorage.setItem('@WalletPassword', encryptKey);
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

  const addMdiToken = async () => {
    dispatch(
      getTokenInfo({
        token: { canisterId, standard },
        onSuccess: res => {
          const token = res.token;
          dispatch(
            addCustomToken({
              token,
              onSuccess() {},
              onError(e) {
                console.log(e);
              },
            })
          );
        },
        onError: err => {
          console.log(err);
        },
      })
    );
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
        </View>
        <View style={styles.btnContainer}>
          <MedicleButton
            text={t('wallet.import.importButton')}
            disabled={!isMnemonicValid}
            buttonStyle={{ height: 50 }}
            onPress={importWalletFromSeedPhrase}
          />
        </View>
        <LoadingModal name="loading" visible={loading} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default WalletImport;
