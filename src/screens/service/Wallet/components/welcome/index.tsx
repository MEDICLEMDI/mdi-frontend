import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import MedicleLogo from '@/assets/icons/wallet_logo.png';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import styles from './styles';

const WelcomeWallet = ({
  navigation,
}: RootScreenProps<Routes.WALLET_WELCOME>) => {
  return (
    <View>
      <View style={styles.imgContainer}>
        <Image source={MedicleLogo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          현재 연결 된 지갑이 없습니다. {'\n'}
          지갑을 생성하거나 연결해주세요.
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>지갑 생성하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.importBtn}>
          <Text style={styles.importBtnText}>지갑 불러오기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeWallet;
