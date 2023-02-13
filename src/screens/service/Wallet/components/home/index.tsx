import { platform } from 'process';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';

import MedicleLogo from '@/assets/icons/il_medicle.png';
import CloseButton from '@/assets/images/ic_close.png';
import Menu from '@/assets/images/ic_menu.png';
import Refresh from '@/assets/images/refresh.png';
import SettingIcon from '@/assets/images/setting_icon.png';
import WalletCard from '@/assets/images/wallet_card.png';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import CustomModal from '@/components/Modal';
import { Colors } from '@/constants/theme';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch } from '@/redux/hooks';
import { reset as resetICPStore } from '@/redux/slices/icp';
import { lock, reset as resetKeyringStore } from '@/redux/slices/keyring';
import { reset as resetUserStore } from '@/redux/slices/user';
import { clearState as resetWalletConnectStore } from '@/redux/slices/walletconnect';
import { clearStorage } from '@/utils/localStorage';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletHome = ({ navigation }: RootScreenProps<Routes.WALLET_HOME>) => {
  const { t } = useTranslation();
  const deleteWalletRef = useRef<Modalize>(null);

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
    { num: 11 },
  ];
  const [modalActive, setModalActive] = useState(false);
  const [historyList, setHistoryList] = useState(data.slice(0, 4));
  const [isMoreData, setIsMoreData] = useState(
    data.length > historyList.length
  );

  // 나중에 히스토리 객체 타입지정 해놔야할듯
  const moreHandle = () => {
    setHistoryList(data.slice(0, historyList.length + 4));
  };

  function numberWithCommas(x) {
    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  const mockTrasactionBal = numberWithCommas(1200000);
  const mockTxID = 'asdasfkneknqwkenkqwnekqwnekqnewkqnewkqne';
  const mockValue = '1000000.23233';
  const mockMDI = numberWithCommas(
    Math.floor(Number(mockValue) * 10000) / 10000
  );
  const mockKRW = numberWithCommas(Math.floor(Number(mockValue) * 10));
  const lengthKRW = (mockKRW.length + 4) * 9.5;

  const periodList = ['1년', '6개월', '3개월', '1개월', '1주일'];
  const [period, setPeriod] = useState('1년');

  const dispatch = useAppDispatch();
  const handleDeleteWallet = () => {
    clearStorage();
    dispatch(resetUserStore());
    dispatch(resetICPStore());
    dispatch(resetWalletConnectStore());
    dispatch(resetKeyringStore());
    deleteWalletRef.current?.close();
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.WALLET_WELCOME }],
    });
  };
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
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteWallet();
                  }}>
                  <Image source={SettingIcon} style={styles.settingIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardMiddleLayer}>
              {/* 누르면 다른화면 표현 */}
              <TouchableOpacity>
                <Text style={styles.mdiBalanceText}>{mockMDI + ' MDI'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardBottomLayer}>
              <View style={[styles.krwBalanceLayer, { width: lengthKRW }]}>
                <Text style={styles.krwBalance}>{mockKRW + ' KRW'}</Text>
              </View>
              {/* 잔액새로고침 이벤트 */}
              <TouchableOpacity>
                <Image source={Refresh} style={styles.refreshButton} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

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

        {/* </ScrollView> */}
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
    </SafeAreaView>
  );
};

export default WalletHome;
