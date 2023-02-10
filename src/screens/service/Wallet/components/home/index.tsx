import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleLogo from '@/assets/icons/il_medicle.png';
import Menu from '@/assets/images/ic_menu.png';
import Refresh from '@/assets/images/refresh.png';
import SettingIcon from '@/assets/images/setting_icon.png';
import WalletCard from '@/assets/images/wallet_card.png';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletHome = ({ navigation }: RootScreenProps<Routes.WALLET_HOME>) => {
  const { t } = useTranslation();
  const [historyList, setHistoryList] = useState([]);

  // 나중에 히스토리 객체 타입지정 해놔야할듯
  // const addData = () => {
  //   setHistoryList([...historyList, { key: 'gdgd' }]);
  // };

  function numberWithCommas(x) {
    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  const mockValue = '1000000.23233';
  const mockMDI = numberWithCommas(
    Math.floor(Number(mockValue) * 10000) / 10000
  );
  const mockKRW = numberWithCommas(Math.floor(Number(mockValue) * 10));
  const lengthKRW = (mockKRW.length + 4) * 9.5;

  const period = '최근 1년';
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
                <TouchableOpacity>
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
              {t('wallet.transactionHistory')}
              <Text style={styles.historySubText}>{' ' + period}</Text>
            </Text>
            {/* 히스토리 기간설정하기 */}
            <TouchableOpacity>
              <Image source={Menu} style={styles.menuButton} />
            </TouchableOpacity>
          </View>

          <View style={styles.historyList}>
            {historyList.length > 0 ? (
              <FlatList
                data={historyList}
                renderItem={({ item }) => <Text>{item.key}</Text>}
              />
            ) : (
              <View style={styles.emptyHistory}>
                <Text>Empty</Text>
              </View>
            )}
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default WalletHome;
