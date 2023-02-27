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

import Warning from '@/assets/icons/info-circle.png';
import Header from '@/components/Header';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletNmemonic = ({
  navigation,
  goBack,
}: RootScreenProps<Routes.WALLET_MNEMONIC>) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.wallet')} />
      {/* <ScrollView horizontal={false} style={CommonStyle.contentWrap}> */}
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>비밀 복구 구문 공개</Text>
          <Text style={styles.subTitleText}>
            계정을 연결하려면 이 비밀 복구 구문이 필요합니다. {'\n'}
            기밀이 보장된안전한 곳에 보관하세요.
          </Text>
          <View style={styles.warningCard}>
            <Image source={Warning} style={styles.warningImage} />
            <Text style={styles.warningText}>
              이 구문은 누구와도 공유하지 마세요! {'\n'}이 구문은 계정 전체를
              도용하는데 사용 될 수 있습니다.
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              // { backgroundColor: !isMnemonicValid ? '#989898' : '#E7E1D5' },
            ]}
            // disabled={!isMnemonicValid}
            // onPress={importWalletFromSeedPhrase}
          >
            <Text
              style={[
                styles.btnText,
                // { color: !isMnemonicValid ? '#FFFFFF' : '#000000' },
              ]}>
              {t('wallet.import.importButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default WalletNmemonic;
