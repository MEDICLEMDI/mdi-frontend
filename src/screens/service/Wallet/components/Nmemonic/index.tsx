import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, View } from 'react-native';

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
// import { copy } from '@/utils/copy';
import { passwordCheck } from '@/utils/passwordCheck';

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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const [words, setWords] = useState<string | undefined>(undefined);

  useEffect(() => {
    setErrorMessage(undefined);
    if (password.length > 7) {
      setPasswordVaild(true);
    } else {
      setPasswordVaild(false);
    }
  }, [password]);

  useEffect(() => {}, [words]);

  const handleCheckPassword = async () => {
    if (await passwordCheck(password)) {
      handleGetMnemonic();
      setPage('nmemonic');
    } else {
      setErrorMessage(t('errorMessage.passwordShortError'));
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
    // copy(words);
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.securityWallet')} />
      {/* <ScrollView horizontal={false} style={CommonStyle.contentWrap}> */}
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{t('wallet.nmemonic.title')}</Text>
          <Text style={styles.subTitleText}>
            {t('wallet.nmemonic.subTitle')}
          </Text>
          <View style={styles.warningCard}>
            <Image source={Warning} style={styles.warningImage} />
            <Text style={styles.warningText}>
              {t('wallet.nmemonic.warningText')}
            </Text>
          </View>
        </View>

        <View style={styles.middleContainer}>
          {page === 'password' ? (
            <>
              <Text style={styles.contentText}>
                {t('wallet.nmemonic.continue')}
              </Text>
              <MedicleInput
                placeholder={t('wallet.nmemonic.password')}
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
              <Text style={styles.contentText}>
                {t('wallet.nmemonic.nmemonicDisclosure')}
              </Text>
              <NmemonicInput
                editable={false}
                onPress={() => {
                  handleCopy();
                }}
                color="#989898"
                imgHeight={20}
                imgWidth={20}
                nmemonicValue={words && words}
                copyText={words}
                toastMessage={t('toast.copy')}
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
            text={page === 'password' ? t('button.next') : t('button.goHome')}
            disabled={!passwordVaild}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default WalletNmemonic;
