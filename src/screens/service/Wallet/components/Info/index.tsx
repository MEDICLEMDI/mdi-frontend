import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleLogo from '@/assets/icons/il_medicle.png';
import CloseButton from '@/assets/images/ic_close.png';
import Menu from '@/assets/images/ic_menu.png';
import Refresh from '@/assets/images/refresh.png';
import SettingIcon from '@/assets/images/setting_icon.png';
import WalletCard from '@/assets/images/wallet_card.png';
import BoxDropShadow from '@/components/BoxDropShadow';
import { CopiedToast } from '@/components/common';
import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import LoadingModal from '@/components/LoadingModal';
import { CustomModal, DatePicker } from '@/components/Modals';
import { Colors } from '@/constants/theme';
import { FungibleStandard } from '@/interfaces/keyring';
import { RootScreenProps } from '@/interfaces/navigation';
import { Asset } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCustomToken, getBalance, getTokenInfo } from '@/redux/slices/user';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletInfo = ({ navigation }: RootScreenProps<Routes.WALLET_INFO>) => {
  const { assets, assetsLoading } = useAppSelector(state => state.user);
  const [mdi, setMdi] = useState<Asset | null>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const canisterId: string = 'h4gr6-maaaa-aaaap-aassa-cai';
  const standard: FungibleStandard = 'DIP20';
  const data = [
    { num: 1 },
    { num: 2 },
    { num: 3 },
    { num: 4 },
    { num: 5 },
    { num: 6 },
    { num: 7 },
    { num: 8 },
    { num: 9 },
    { num: 10 },
  ];
  const [modalActive, setModalActive] = useState(false);
  const [historyList, setHistoryList] = useState(data.slice(0, 4));
  const [isMoreData, setIsMoreData] = useState(
    data.length > historyList.length
  );
  const [visibility, setVisibility] = useState(false);
  const mockTrasactionBal = numberWithCommas(1200000);
  const mockTxID = 'asdasfkneknqwkenkqwnekqwnekqnewkqnewkqne';
  const mdiValue = numberWithCommas(
    Math.floor(Number(mdi?.amount) * 10000) / 10000
  );
  const mdiKrwValue = numberWithCommas(Math.floor(Number(mdi?.value) * 10));
  const lengthKRW = (mdiKrwValue.length + 4) * 9.5;

  const periodList = ['1년', '6개월', '3개월', '1개월', '1주일'];
  const [period, setPeriod] = useState('1년');

  // set mdi
  useEffect(() => {
    assets.map(token => {
      if (token.name === 'MDI') {
        setMdi(token);
        saveMdiAmount();
      }
    });
    if (mdi === null) {
      addMdiToken();
    }
  }, [assets]);

  const saveMdiAmount = async () => {
    await AsyncStorage.setItem('MDI_AMOUNT', mdi!.amount.toString());
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

  const handleRefresh = () => {
    dispatch(getBalance());
  };

  // 나중에 히스토리 객체 타입지정 해놔야할듯
  const moreHandle = () => {
    setHistoryList(data.slice(0, historyList.length + 4));
  };

  function numberWithCommas(x: any) {
    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.wallet')} />
      {/* <ScrollView horizontal={false} style={CommonStyle.contentWrap}> */}
      <View style={styles.homeContainer}>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={WalletCard}
            resizeMode="contain"
            style={styles.card}>
            <View>
              <Text>나의 추천인 코드</Text>
            </View>
            <View>
              <Image
                source={MedicleLogo}
                resizeMode="contain"
                style={styles.mdiLogo}
              />
              <Text>MDI</Text>
            </View>
            <View>
              <Text>지갑주소</Text>
              <Text>지갑주소</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.authContainer}></View>
        <View style={styles.bottomContainer}></View>
      </View>
    </SafeAreaView>
  );
};

export default WalletInfo;
