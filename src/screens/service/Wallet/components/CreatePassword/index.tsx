import AsyncStorage from '@react-native-async-storage/async-storage';
import { AES } from 'crypto-js';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';
import Config from 'react-native-config';
import { TextInput } from 'react-native-gesture-handler';

import MedicleButton from '@/components/buttons/MedicleButton';
// import MedicleLogo from '@/assets/icons/wallet_logo.png';
import Header from '@/components/Header';
import LoadingModal from '@/components/LoadingModal';
import { FungibleStandard } from '@/interfaces/keyring';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createWallet } from '@/redux/slices/keyring';
import { addCustomToken, getTokenInfo } from '@/redux/slices/user';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletCreatePassword = ({
  route,
  navigation,
  goBack,
}: RootScreenProps<Routes.WALLET_CREATE_PASSWORD>) => {
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);
  const [showCreateError, setShowCreateError] = useState(false);
  const [disable, setDisable] = useState(false);
  const dispatch = useAppDispatch();
  const { icpPrice } = useAppSelector(state => state.icp);
  const flow = route.params?.flow;
  const [loading, setLoading] = useState(false);
  const canisterId: string = 'h4gr6-maaaa-aaaap-aassa-cai';
  const standard: FungibleStandard = 'DIP20';

  const confirmPasswordInputRef = useRef();

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

  useEffect(() => {
    if (password) {
      setPasswordValid(passwordRegex.test(password));
      setShowPasswordError(!passwordValid);
    }
    if (confirmPassword) {
      setShowConfirmPasswordError(!(password === confirmPassword));
    }
    setDisable(!(password === confirmPassword && passwordValid));
  }, [password, confirmPassword, loading]);

  const handleCreateWallet = async () => {
    setLoading(true);
    if (flow === 'import') {
      navigation.navigate(Routes.WALLET_IMPORT, {
        password,
      });
      setLoading(false);
    } else {
      try {
        dispatch(createWallet({ password, icpPrice }))
          .unwrap()
          .then(async result => {
            if (result.wallet) {
              addMdiToken();
              const encryptKey = AES.encrypt(
                password,
                Config.AES_KEY
              ).toString();
              await AsyncStorage.setItem('@WalletPassword', encryptKey);
            }
          });
      } catch (e) {
        setShowCreateError(true);
        setLoading(false);
      }
    }
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
    <>
      <SafeAreaView style={CommonStyle.container}>
        <Header
          goBack={true}
          title={
            flow === 'create'
              ? t('wallet.create.header')
              : t('wallet.import.header')
          }
        />
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{t('wallet.create.title')}</Text>
            <Text style={styles.subText}>{t('wallet.create.subTitle')}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.pwInput]}
              placeholder={t('wallet.create.passwordInput')}
              selectionColor={'#989898'}
              secureTextEntry={true}
              onChangeText={value => setPassword(value)}
              maxLength={20}
              onSubmitEditing={() => {
                confirmPasswordInputRef.current.focus();
              }}
            />
            <TextInput
              style={[styles.pwInput, { marginTop: 10 }]}
              placeholder={t('wallet.create.confirmPasswordInput')}
              selectionColor={'#989898'}
              secureTextEntry={true}
              maxLength={20}
              onChangeText={word => setConfirmPassword(word)}
              ref={confirmPasswordInputRef}
              onSubmitEditing={() => {
                disable && handleCreateWallet;
              }}
            />
            {showPasswordError ? (
              <Text style={styles.errMsg}>
                {t('errorMessage.passwordValidError')}
              </Text>
            ) : null}

            {showConfirmPasswordError ? (
              <Text style={[styles.errMsg, { marginTop: 5 }]}>
                {t('errorMessage.passwordConfirmError')}
              </Text>
            ) : null}

            {showCreateError ? (
              <Text style={[styles.errMsg, { marginTop: 5 }]}>
                {t('errorMessage.unknownError')}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.btnContainer}>
          <MedicleButton
            text={
              flow === 'create'
                ? t('wallet.create.newCreateButton')
                : t('wallet.create.importButton')
            }
            buttonStyle={styles.nextButton}
            disabled={disable}
            onPress={() => {
              handleCreateWallet();
            }}
          />
          <LoadingModal name="loading" visible={loading} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default WalletCreatePassword;
