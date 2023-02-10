import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { PasswordInput } from '@/components/common';
// import MedicleLogo from '@/assets/icons/wallet_logo.png';
import Header from '@/components/Header';
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
  const [disable, setDisable] = useState(true);
  const dispatch = useAppDispatch();
  const { icpPrice } = useAppSelector(state => state.icp);
  const flow = route.params?.flow;

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
  }, [password, confirmPassword]);

  const handleCreateWallet = async () => {
    if (flow === 'import') {
      navigation.navigate(Routes.WALLET_IMPORT, {
        password,
      });
    } else {
      try {
        dispatch(createWallet({ password, icpPrice }))
          .unwrap()
          .then(async result => {
            console.log(result);
          });
      } catch (e) {
        console.log('Error:', e);
        Alert.alert('오류가 발생하였습니다, 나중에 다시 시도해주세요.');
      }
    }
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.wallet')} />
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{t('wallet.createPassword')}</Text>
          <Text style={styles.subText}>지갑 비밀번호를 입력해주세요.</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.pwInput]}
            placeholder="영문/숫자/특수문자 혼합 8~20자"
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
            placeholder="비밀번호를 한번 더 입력해주세요."
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
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletCreatePassword;
