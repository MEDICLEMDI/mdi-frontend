import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleLogo from '@/assets/icons/il_medicle.png';
import CopyIcon from '@/assets/images/copy_beige.png';
import Phone from '@/assets/images/ic_phone.png';
import Profile from '@/assets/images/ic_profile.png';
import WalletCard from '@/assets/images/wallet_card.png';
import Wave from '@/assets/images/wave.png';
import BoxDropShadow from '@/components/BoxDropShadow';
import MedicleButton from '@/components/buttons/MedicleButton';
import { CustomCheckbox } from '@/components/common';
import CopyButton from '@/components/CopyButton';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { Colors } from '@/constants/theme';
import { RootScreenProps } from '@/interfaces/navigation';
import { Asset } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fontStyleCreator } from '@/utils/fonts';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletInfo = ({ navigation }: RootScreenProps<Routes.WALLET_INFO>) => {
  const { assets } = useAppSelector(state => state.user);
  const [mdi, setMdi] = useState<Asset | null>(null);
  const { t } = useTranslation();
  const mdiValue = numberWithCommas(
    Math.floor(Number(mdi?.amount) * 10000) / 10000
  );
  const mdiKrwValue = numberWithCommas(Math.floor(Number(mdi?.value) * 10));
  const { currentWallet } = useAppSelector(state => state.keyring);
  const { principal } = currentWallet || {};
  const [visibility, setVisibility] = useState(false);

  const normal = fontStyleCreator({
    size: 14,
    color: '#333333',
    weight: 'normal',
  });

  // set mdi
  useEffect(() => {
    assets.map(token => {
      if (token.name === 'MDI') {
        setMdi(token);
        saveMdiAmount();
      }
    });
  }, [assets]);

  // const copyToClipboard = async () => {
  //   Clipboard.setString(principal!);
  // };

  const saveMdiAmount = async () => {
    await AsyncStorage.setItem('MDI_AMOUNT', mdi!.amount.toString());
  };

  function numberWithCommas(x: any) {
    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.wallet')} />
      <ScrollView horizontal={false} style={{}}>
        <View style={styles.homeContainer}>
          <View style={styles.cardContainer}>
            <ImageBackground
              source={WalletCard}
              resizeMode="contain"
              style={styles.card}>
              <View style={styles.cardTopLayer}>
                <Text style={styles.referralText}>
                  {t('wallet.info.referralCode')}
                </Text>
              </View>
              <View style={styles.cardMiddleLayer}>
                <Image
                  source={MedicleLogo}
                  resizeMode="contain"
                  style={styles.mdiLogo}
                />
                <Text style={styles.mdiText}>{t('wallet.mdi')}</Text>
              </View>
              <View style={styles.cardBottomLayer}>
                <Text style={styles.walletTitleText}>
                  {t('wallet.walletAddress')}
                </Text>
                <View style={styles.walletBottomLayer}>
                  <Text style={styles.walletContentsText}>
                    {principal?.slice(0, 28) + '....'}
                  </Text>
                  <CopyButton
                    color="#97876D"
                    imgHeight={18}
                    imgWidth={18}
                    copyText={principal!}
                    toastMessage={t('toastMessage.copy')}
                  />
                </View>
              </View>
              <View style={{ alignItems: 'center' }} />
            </ImageBackground>
          </View>
          <View style={styles.authContainer}>
            <Text style={styles.authStatus}>{t('wallet.info.authStatus')}</Text>
            <BoxDropShadow
              color={
                Platform.OS === 'ios'
                  ? Colors.Medicle.Gray.SemiLight
                  : Colors.Medicle.Gray.Dark
              }
              radius={10}
              style={[styles.identityBox, { padding: 0 }]}>
              <View style={styles.shadowBoxCommon}>
                <View style={styles.shadowInnerCommon}>
                  <Image style={styles.authImage} source={Profile} />
                  <Text>{t('wallet.info.identityVerify')}</Text>
                </View>
                <CustomCheckbox selected={false} />
              </View>
            </BoxDropShadow>
            <BoxDropShadow
              color={
                Platform.OS === 'ios'
                  ? Colors.Medicle.Gray.SemiLight
                  : Colors.Medicle.Gray.Dark
              }
              radius={10}
              style={[styles.phoneBox, { padding: 0 }]}>
              <View style={styles.shadowBoxCommon}>
                <View style={styles.shadowInnerCommon}>
                  <Image style={styles.authImage} source={Phone} />
                  <Text>{t('wallet.info.phoneVerify')}</Text>
                </View>
                <CustomCheckbox selected={true} />
              </View>
            </BoxDropShadow>
          </View>
          <Hr color="#F2F2F2" thickness={12} style={{ marginTop: 30 }} />
          <View style={styles.bottomContainer}>
            <BoxDropShadow
              color={
                Platform.OS === 'ios'
                  ? Colors.Medicle.Gray.SemiLight
                  : Colors.Medicle.Gray.Dark
              }
              radius={10}
              style={[styles.bottomBox, { padding: 0 }]}>
              <View style={[styles.flexRowSpaceBetween, { marginBottom: 15 }]}>
                <Text style={normal}>{t('wallet.info.id')}</Text>
                <Text style={styles.userId}>{t('wallet.mdi')}</Text>
              </View>
              <View
                style={[styles.flexRowSpaceBetween, { alignItems: 'center' }]}>
                <Text style={normal}>{t('wallet.info.balance')}</Text>
                <View>
                  <Text style={styles.mdiAmount}>
                    {mdiValue}{' '}
                    <Text style={{ fontWeight: '700' }}>{t('wallet.mdi')}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <Image style={styles.waveImage} source={Wave} />
                <Text style={styles.mdiKrwAmount}>
                  {mdiKrwValue}
                  <Text style={{ fontWeight: '400' }}> {t('wallet.krw')}</Text>
                </Text>
              </View>
              <MedicleButton
                onPress={() => navigation.navigate(Routes.WALLET_SEND)}
                buttonStyle={styles.sendButton}
                textStyle={styles.sendButtonText}
                text={t('wallet.info.send')}
              />
            </BoxDropShadow>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletInfo;
