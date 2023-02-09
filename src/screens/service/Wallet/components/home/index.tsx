import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleLogo from '@/assets/icons/il_medicle.png';
import SettingIcon from '@/assets/images/setting_icon.png';
import WalletCard from '@/assets/images/wallet_card.png';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletHome = ({ navigation }: RootScreenProps<Routes.WALLET_HOME>) => {
  const { t } = useTranslation();

  const mockMDI = '1.23125125';
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={false} title={t('header.wallet')} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
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
              <Text style={styles.mdiBalanceText}>{mockMDI + ' MDI'}</Text>
            </View>
          </ImageBackground>
        </View>

        <View />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletHome;
