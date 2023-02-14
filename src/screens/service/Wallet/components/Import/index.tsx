import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import Header from '@/components/Header';
import LoadingModal from '@/components/LoadingModal';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { importWallet } from '@/redux/slices/keyring';

import CommonStyle from '../../common_style';
import styles from './styles';

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
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const password = route?.params.password;
  const [loading, setLoading] = useState(false);

  const onChangeText = (text: string) => {
    setSeedPhrase(text);
    setInvalidSeedPhrase(false);
  };
  const isMnemonicValid =
    !!seedPhrase &&
    seedPhrase.trim().split(/\s+/g).length === 12 &&
    !invalidSeedPhrase;

  const importWalletFromSeedPhrase = async () => {
    // Alert.alert(password);
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
            // navigation.reset({
            //   index: 1,
            //   routes: [{ name: Routes.WALLET_HOME }],
            // });
            setLoading(false);
          },
        })
      ).then(res => {
        setLoading(false);

        console.log(res);
        if (res.error) {
          if (res.payload === 'The provided mnemonic is invalid') {
            setErrorMsg(t('errorMessage.nmemonicError'));
          } else {
            setErrorMsg(t('errorMessage.unknownError'));
          }
          setError(true);
        }
      });
    }, 500);
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('wallet.import.header')} />
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{t('wallet.import.title')}</Text>
          <Text style={styles.subText}>{t('wallet.import.subTitle')}</Text>
        </View>
        <View style={styles.mnemonicContainer}>
          <TextInput
            style={styles.mnemonicInput}
            multiline
            placeholder={t('wallet.import.mnemonicInput')}
            placeholderTextColor={'#989898'}
            selectionColor={'#989898'}
            numberOfLines={4}
            value={seedPhrase}
            onChangeText={onChangeText}
            onFocus={() => setError(false)}
            onSubmitEditing={importWalletFromSeedPhrase}
          />
          {error && <Text style={styles.errMsg}>{errorMsg}</Text>}
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
  );
};

export default WalletImport;
