import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
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
import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { MedicleInput } from '@/components/inputs';
import Li from '@/components/Li';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';

import CommonStyle from '../../common_style';
import styles from './styles';

const WalletSend = ({ navigation }: RootScreenProps<Routes.WALLET_SEND>) => {
  const { t } = useTranslation();
  const [mdiAmount, setMdiAmount] = useState(0);
  const { assets, assetsLoading } = useAppSelector(state => state.user);
  const liChild =
    '송금시 발생하는 <strong>수수료는 000 MDI<strong> 입니다.#주소를 정확히 입력해야만 입금되며, 잘못 입력하는 경우 복구가 불가능합니다. #전송 시간은 네트워크 상황에 따라 소요 시간이 달라질 수 있습니다.';

  useEffect(() => {
    assets.map(token => {
      if (token.name === 'MDI') {
        setMdiAmount(token.amount);
        saveMdiAmount(token.amount);
      }
    });
  }, [assets]);

  const saveMdiAmount = async (amount: number) => {
    await AsyncStorage.setItem('MDI_AMOUNT', amount.toString());
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={'보내기'} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
        <View style={styles.amountLayer}>
          <Text style={styles.amountText}>보유 MDI</Text>
          <MedicleInput placeholder={mdiAmount.toString()} />
        </View>
        <View style={styles.sendLayer}>
          <MedicleInput
            placeholder={'보낼 주소를 입력해 주세요.'}
            style={{ width: '100%' }}
          />
          <View style={styles.sendLayerMiddle}>
            <MedicleInput
              placeholder={'보낼 수량을 입력해주세요.'}
              style={{ width: '75%' }}
            />
            <MedicleButton
              text={'전액'}
              buttonStyle={{
                borderRadius: 10,
                flex: 1,
                marginLeft: 20,
                height: 37,
                marginTop: 10,
              }}
            />
          </View>
          <View style={styles.sendLayerBottom}>
            <Text style={styles.totalText}>TOTAL</Text>
            <MedicleInput
              placeholder="수수료가 포함된 최종 수량입니다."
              style={{ width: '75%' }}
            />
          </View>
        </View>

        <Hr color={'#989898'} style={{ marginTop: 15 }} />
        <Li
          text={liChild}
          textStyle={{ fontSize: 12, fontWeight: '400', color: '#989898' }}
          highlightStyle={{ fontWeight: '700' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletSend;
