import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Config from 'react-native-config';
import { useToast } from 'react-native-toast-notifications';

import Warning from '@/assets/icons/info-circle.png';
import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import NmemonicInput from '@/components/inputs/NmemonicInput';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch } from '@/redux/hooks';
import { getMnemonic } from '@/redux/slices/keyring';
import { clearState } from '@/redux/slices/walletconnect';
import { copy } from '@/utils/copy';

// import { copy, showToast } from '@/utils/copy';
import CommonStyle from '../../common_style';
import styles from './styles';

const WalletNmemonic = ({
  navigation,
  goBack,
}: RootScreenProps<Routes.WALLET_MNEMONIC>) => {
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [passwordVaild, setPasswordVaild] = useState(false);
  const [page, setPage] = useState('password');
  const [walletPassword, setWalletPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const [words, setWords] = useState<string | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    getWalletPassword();
  }, []);

  useEffect(() => {
    setErrorMessage(undefined);
    if (password.length > 7) {
      setPasswordVaild(true);
    } else {
      setPasswordVaild(false);
    }
  }, [password]);

  useEffect(() => {}, [words]);

  const handleCheckPassword = () => {
    if (walletPassword === password) {
      handleGetMnemonic();
      setPage('nmemonic');
    } else {
      setErrorMessage('*비밀번호가 올바르지 않습니다.');
    }
  };

  const handleGetMnemonic = async () => {
    // setLoading(true);
    dispatch(
      getMnemonic({
        password,
        onError: () => {
          // setError(true);
        },
        onSuccess: mnemonic => {
          clearState();
          setWords(mnemonic);
        },
      })
    );
  };

  const handleCopy = () => {
    copy(words);
    toast.show('복사완료');
  };

  const getWalletPassword = async () => {
    const encryptKey = await AsyncStorage.getItem('password').then(res => {
      setWalletPassword(
        CryptoJS.AES.decrypt(res!, Config.AES_KEY).toString(CryptoJS.enc.Utf8)
      );
    });
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.wallet')} />
      {/* <ScrollView horizontal={false} style={CommonStyle.contentWrap}> */}
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>비밀 복구 구문 공개</Text>
          <Text style={styles.subTitleText}>
            계정을 연결하려면 이 비밀 복구 구문이 필요합니다. {'\n'}
            기밀이 보장된안전한 곳에 보관하세요.
          </Text>
          <View style={styles.warningCard}>
            <Image source={Warning} style={styles.warningImage} />
            <Text style={styles.warningText}>
              이 구문은 누구와도 공유하지 마세요! {'\n'}이 구문은 계정 전체를
              도용하는데 사용 될 수 있습니다.
            </Text>
          </View>
        </View>

        <View style={styles.middleContainer}>
          {page === 'password' ? (
            <>
              <Text style={styles.contentText}>게속하려면 암호 입력</Text>
              <MedicleInput
                placeholder="암호를 입력해주세요."
                textInputStyle={[
                  styles.passwordInput,
                  { borderWidth: errorMessage ? 0 : 1 },
                ]}
                password={true}
                onChangeText={text => {
                  setPassword(text);
                }}
                // textInputStyle={[errorMessage && { borderWidth: 0 }]}
                errText={errorMessage}
              />
            </>
          ) : (
            <>
              <Text style={styles.contentText}>비공개 비밀 복구 구문</Text>
              <NmemonicInput
                editable={false}
                onPress={() => {
                  handleCopy();
                }}
                // value={}
                nmemonicValue={words && words}
              />
            </>
          )}
        </View>

        <View style={styles.btnContainer}>
          <MedicleButton
            buttonStyle={{ height: 50, marginTop: 'auto' }}
            onPress={() => {
              page === 'password'
                ? handleCheckPassword()
                : navigation.navigate(Routes.WALLET_HOME);
            }}
            text={page === 'password' ? '다음' : '홈으로'}
            disabled={!passwordVaild}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default WalletNmemonic;
