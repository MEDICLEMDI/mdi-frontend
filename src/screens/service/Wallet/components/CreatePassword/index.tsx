import AsyncStorage from '@react-native-async-storage/async-storage';
import { AES } from 'crypto-js';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NativeModules,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { TextInput } from 'react-native-gesture-handler';

// import MedicleLogo from '@/assets/icons/wallet_logo.png';
import Header from '@/components/Header';
import LoadingModal from '@/components/LoadingModal';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createWallet } from '@/redux/slices/keyring';

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
  const [buttonText, setButtonText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (flow) {
      setButtonText(t('wallet.create.importButton'));
    } else {
      setButtonText(t('wallet.create.newCreateButton'));
    }
  }, []);

  // const [confirmPasswordVaild, setDisable] = useState(true);

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
              const encryptKey = AES.encrypt(
                password,
                Config.AES_KEY
              ).toString();
              AsyncStorage.setItem('password', encryptKey);
              // navigation.navigate(Routes.WALLET_HOME);
            }
          });
      } catch (e) {
        console.log('실패');
        setShowCreateError(true);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={CommonStyle.container}>
        <Header goBack={true} title={t('wallet.create.header')} />
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
              onSubmitEditing={handleCreateWallet}
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
                {/* {t('errorMessage.passwordConfirmError')} */}
                *지갑생성 중 오류가 발생하였습니다. 다시 시도해주세요.
              </Text>
            ) : null}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: disable ? '#989898' : '#E7E1D5' },
              ]}
              disabled={disable}
              onPress={handleCreateWallet}>
              <Text
                style={[
                  styles.btnText,
                  { color: disable ? '#FFFFFF' : '#000000' },
                ]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <LoadingModal name="loading" visible={loading} />}
      </SafeAreaView>
    </>
  );
};

export default WalletCreatePassword;
