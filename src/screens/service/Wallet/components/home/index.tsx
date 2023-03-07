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
import Refresh from '@/assets/images/refresh.png';
import SettingIcon from '@/assets/images/setting_icon.png';
import WalletCard from '@/assets/images/wallet_card.png';
import BoxDropShadow from '@/components/BoxDropShadow';
import { CopiedToast } from '@/components/common';
import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import LoadingModal from '@/components/LoadingModal';
import { DatePicker } from '@/components/Modals';
import { Colors } from '@/constants/theme';
import { FungibleStandard } from '@/interfaces/keyring';
import { RootScreenProps } from '@/interfaces/navigation';
import { Asset } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCustomToken, getBalance, getTokenInfo } from '@/redux/slices/user';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletHome = ({ navigation }: RootScreenProps<Routes.WALLET_HOME>) => {
  const { assets } = useAppSelector(state => state.user);
  const [mdi, setMdi] = useState<Asset | null>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const canisterId: string = 'h4gr6-maaaa-aaaap-aassa-cai';
  const standard: FungibleStandard = 'DIP20';
  const data = [];
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

  const [visible, setVisible] = useState(false);

  // set mdi
  useEffect(() => {
    const mdiAsset = assets.find(token => token.name === 'MDI');
    if (mdiAsset === undefined) {
      addMdiToken();
    } else {
      setMdi(mdiAsset);
    }
  }, [assets]);

  useEffect(() => {
    handleRefresh();
  }, []);

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

  const handleRefresh = async () => {
    setLoading(true);
    dispatch(getBalance()).then(() => {
      setLoading(false);
    });
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
      <Header goBack={false} title={t('header.wallet')} />
      {/* <ScrollView horizontal={false} style={CommonStyle.contentWrap}> */}
      <View style={styles.homeContainer}>
        <View style={styles.cardContainer}>
          <ImageBackground
            source={WalletCard}
            resizeMode="contain"
            style={styles.card}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 25,
              }}>
              <View style={styles.cardTopLayer}>
                <View style={styles.topLeftLayer}>
                  <Image
                    source={MedicleLogo}
                    resizeMode="contain"
                    style={styles.mdiLogo}
                  />
                  <Text style={styles.mdiTitleText}>MDI</Text>
                </View>
                <View style={styles.topRightLayer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(Routes.WALLET_SETTING);
                    }}>
                    <Image source={SettingIcon} style={styles.settingIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cardMiddleLayer}>
                {/* 누르면 다른화면 표현 */}
                {mdi && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(Routes.WALLET_INFO);
                    }}>
                    <Text style={styles.mdiBalanceText}>
                      {mdiValue + ' MDI'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.cardBottomLayer}>
                <View
                  style={mdi && [styles.krwBalanceLayer, { width: lengthKRW }]}>
                  {mdi && (
                    <Text style={styles.krwBalance}>
                      {mdiKrwValue + ' KRW'}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={handleRefresh}>
                  <Image source={Refresh} style={styles.refreshButton} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <CopiedToast
                  visibility={visibility}
                  setVisibility={setVisibility}
                  customStyle={styles.toastStyle}
                  customPointerStyle={styles.toastPointerStyle}
                />
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.historyContainer}>
          <View style={styles.historyTopLayer}>
            <SearchBar
              onPress={() => setVisible(true)}
              title="거래내역"
              period="1년 "
            />
            <DatePicker
              name="dataPicker"
              modalDirection="flex-end"
              visible={visible}
              onRequestClose={() => setVisible(false)}
              animationType="slide"
              dateResponse={console.log}
            />
          </View>

          <View style={styles.historyList}>
            {historyList.length > 0 ? (
              <FlatList
                style={styles.flatList}
                data={historyList}
                renderItem={({ item }) => (
                  <>
                    <TouchableOpacity>
                      <BoxDropShadow
                        color={
                          Platform.OS === 'ios'
                            ? Colors.Medicle.Gray.Light
                            : Colors.Medicle.Gray.Standard
                        }
                        radius={20}
                        style={[
                          styles.historyCard,
                          {
                            width: Dimensions.get('window').width - 60,
                            maxWidth: 420,
                            opacity: 0.99,
                          },
                          item.num === historyList.length && {
                            marginBottom: 20,
                          },
                          ,
                        ]}>
                        <View style={styles.historyCardTopLayer}>
                          <Text style={styles.trasactionDate}>날짜</Text>
                          <Text style={styles.trasactionType}>거래유형</Text>
                        </View>
                        <View style={styles.historyCardMiddleLayer}>
                          <Text style={styles.trasactionTxID}>
                            {mockTxID.substring(0, 10) + '...'}
                          </Text>
                        </View>
                        <View style={styles.historyCardBottomLayer}>
                          <Text style={styles.trasactionBal}>
                            {mockTrasactionBal + ' MDI'}
                          </Text>
                        </View>
                      </BoxDropShadow>
                    </TouchableOpacity>
                    {isMoreData && item.num === historyList.length ? (
                      <View style={[styles.moreButtonLayer]}>
                        <TouchableOpacity
                          style={[
                            styles.moreButton,
                            historyList.length === data.length && {
                              display: 'none',
                            },
                          ]}
                          onPress={moreHandle}>
                          <Text style={styles.moreButtonText}>
                            거래내역 더보기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </>
                )}
              />
            ) : (
              <View style={styles.emptyHistory}>
                <Text style={styles.emptyText}>
                  {t('wallet.home.emptyHistory')}
                </Text>
              </View>
            )}
          </View>
        </View>
        <LoadingModal name="loading" visible={loading} />
      </View>
    </SafeAreaView>
  );
};

export default WalletHome;
