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
import CopyIcon from '@/assets/images/copy.png';
import Phone from '@/assets/images/ic_phone.png';
import Profile from '@/assets/images/ic_profile.png';
import WalletCard from '@/assets/images/wallet_card.png';
import BoxDropShadow from '@/components/BoxDropShadow';
import { CopiedToast, CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { Colors } from '@/constants/theme';
import { RootScreenProps } from '@/interfaces/navigation';
import { Asset } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletInfo = ({ navigation }: RootScreenProps<Routes.WALLET_INFO>) => {
  const { assets } = useAppSelector(state => state.user);
  const [mdi, setMdi] = useState<Asset | null>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const mdiValue = numberWithCommas(
    Math.floor(Number(mdi?.amount) * 10000) / 10000
  );
  const mdiKrwValue = numberWithCommas(Math.floor(Number(mdi?.value) * 10));
  const lengthKRW = (mdiKrwValue.length + 4) * 9.5;
  const { currentWallet } = useAppSelector(state => state.keyring);
  const { principal } = currentWallet || {};
  const [visibility, setVisibility] = useState(false);

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
                <Text style={styles.referralText}>나의 추천인 코드</Text>
              </View>
              <View style={styles.cardMiddleLayer}>
                <Image
                  source={MedicleLogo}
                  resizeMode="contain"
                  style={styles.mdiLogo}
                />
                <Text style={styles.mdiText}>MDI</Text>
              </View>
              <View style={styles.cardBottomLayer}>
                <Text style={styles.walletTitleText}>지갑주소</Text>
                <View style={styles.walletBottomLayer}>
                  <Text style={styles.walletContentsText}>
                    {principal?.slice(0, 28) + '....'}
                  </Text>
                  <TouchableOpacity
                    onPress={async () => {
                      Clipboard.setString(principal!);
                      setVisibility(true);
                    }}>
                    <Image style={styles.copyIcon} source={CopyIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                <CopiedToast
                  visibility={visibility}
                  setVisibility={setVisibility}
                  // customStyle={styles.toastStyle}
                  // customPointerStyle={styles.toastPointerStyle}
                />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.authContainer}>
            <Text style={styles.authStatus}>인증 상태</Text>
            <BoxDropShadow
              color={
                Platform.OS === 'ios'
                  ? Colors.Medicle.Gray.SemiLight
                  : Colors.Medicle.Gray.Dark
              }
              offset={[0, 7]}
              elevation={10}
              opacity={0.95}
              radius={10}
              style={[styles.identityBox, { padding: 0 }]}>
              <View style={styles.shadowBoxCommon}>
                <View style={styles.shadowInnerCommon}>
                  <Image style={styles.authImage} source={Profile} />
                  <Text>본인 인증</Text>
                </View>
                <CustomCheckbox selected={true} />
              </View>
            </BoxDropShadow>
            <BoxDropShadow
              color={
                Platform.OS === 'ios'
                  ? Colors.Medicle.Gray.SemiLight
                  : Colors.Medicle.Gray.Dark
              }
              offset={[0, 7]}
              elevation={10}
              opacity={0.95}
              radius={10}
              style={[styles.phoneBox, { padding: 0 }]}>
              <View style={styles.shadowBoxCommon}>
                <View style={styles.shadowInnerCommon}>
                  <Image style={styles.authImage} source={Phone} />
                  <Text>핸드폰 인증</Text>
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
              offset={[0, 7]}
              elevation={10}
              opacity={0.95}
              radius={10}
              style={[styles.bottomBox, { padding: 0 }]}></BoxDropShadow>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.WALLET_SEND)}>
            <Text>gd</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletInfo;
