import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleLogo from '@/assets/icons/wallet_logo.png';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletWelcome = ({
  navigation,
}: RootScreenProps<Routes.WALLET_WELCOME>) => {
  const { t } = useTranslation();

  const onPress = (flow: 'create' | 'import') => () =>
    navigation.navigate(Routes.WALLET_CREATE_PASSWORD, {
      flow,
    });
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={false} title={t('header.wallet')} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
        <View>
          <View style={styles.imgContainer}>
            <Image
              source={MedicleLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              현재 연결 된 지갑이 없습니다. {'\n'}
              지갑을 생성하거나 연결해주세요.
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={onPress('create')}>
              <Text style={styles.createBtnText}>지갑 생성하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.importBtn}
              onPress={onPress('import')}>
              <Text style={styles.importBtnText}>지갑 불러오기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletWelcome;
