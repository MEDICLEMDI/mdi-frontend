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

const WalletHome = ({ navigation }: RootScreenProps<Routes.WALLET_HOME>) => {
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
                  {/* 셋팅버튼은 누르면 셋팅라우트로 이동 */}
                  {/* <TouchableOpacity
                    onPress={() => {
                      handleDeleteWallet();
                    }}> */}
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
                {/* {principal && (
                <>
                  <Text style={styles.walletAddress}>
                    {principal?.slice(0, 35) + '....'}
                  </Text>
                  <TouchableOpacity
                    onPress={async () => {
                      Clipboard.setString(principal!);
                      setVisibility(true);
                    }}>
                    <Image
                      style={styles.copyImage}
                      source={Copy}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </>
              )} */}
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

        {/* <SearchBar onPress={() => setVisible(true)} />
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={true}
          // onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={console.log}
        /> */}
        <View style={styles.historyContainer}>
          <View style={styles.historyTopLayer}>
            <Text style={styles.historyTitle}>
              {t('wallet.home.transactionHistory')}
              <Text style={styles.historySubText}>{' 최근 ' + period}</Text>
            </Text>
            {/* 히스토리 기간설정하기 */}
            <TouchableOpacity
              onPress={() => {
                setModalActive(true);
              }}>
              <Image source={Menu} style={styles.menuButton} />
            </TouchableOpacity>
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
                        offset={[0, 7]}
                        elevation={10}
                        opacity={0.95}
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
      </View>
      {modalActive && (
        <CustomModal
          name="test"
          visible={modalActive}
          transparent={true}
          animationType="slide"
          modalDirection="flex-end"
          onShow={() => {}}>
          <View style={styles.borderForground}>
            <View style={styles.modalCalendarLayer}>
              <View style={styles.calenderTopLayer}>
                <Text style={styles.historyTitle}>
                  전체
                  <Text style={styles.historySubText}>{' 최근 ' + period}</Text>
                </Text>
                <TouchableOpacity onPress={() => setModalActive(false)}>
                  <Image style={styles.closeButton} source={CloseButton} />
                </TouchableOpacity>
              </View>
              <View style={styles.calenderMiddleLayer}>
                {periodList.map(item => (
                  <TouchableOpacity
                    style={
                      period.indexOf(item) !== -1
                        ? styles.periodActive
                        : styles.periodDisabled
                    }
                    onPress={() => {
                      setPeriod(item);
                      console.log(period, item, period.indexOf(item));
                    }}>
                    <Text
                      style={
                        period.indexOf(item) !== -1
                          ? styles.periodActiceText
                          : styles.periodDisabledText
                      }>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.calenderBottomLayer}>
                <Text>전체</Text>
              </View>
            </View>

            <View style={styles.modalButtonLayer}>
              <TouchableOpacity style={styles.resetButton}>
                <Text>초기화</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton}>
                <Text>적용하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
      )}
      {assetsLoading && <LoadingModal name="loading" visible={assetsLoading} />}
    </SafeAreaView>
  );
};

export default WalletHome;
