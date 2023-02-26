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
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import CommonStyle from '../../common_style';
import styles from './styles';
import { sendToken } from '@/redux/slices/user';
import { Asset } from '@/interfaces/redux';

const WalletSend = ({ navigation }: RootScreenProps<Routes.WALLET_SEND>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [mdiAmount, setMdiAmount] = useState(0);
  const { assets, assetsLoading } = useAppSelector(state => state.user);
  const [sendAmount, setSendAmount] = useState<string>();
  const [receiverId, setReceiverId] = useState<string>();
  const canisterId: string = 'h4gr6-maaaa-aaaap-aassa-cai';
  const { icpPrice } = useAppSelector(state => state.icp);
  const [selectedToken, setSelectedToken] = useState<Asset | undefined>();
  const liChild =
    '송금시 발생하는 <strong>수수료는 000 MDI<strong> 입니다.#주소를 정확히 입력해야만 입금되며, 잘못 입력하는 경우 복구가 불가능합니다. #전송 시간은 네트워크 상황에 따라 소요 시간이 달라질 수 있습니다.';

  const [mdi, setMdi] = useState<Asset | null>(null);
  useEffect(() => {
    assets.map(token => {
      if (token.name === 'MDI') {
        setMdiAmount(token.amount);
        saveMdiAmount(token.amount);
        setMdi(token);
      }
    });
  }, [assets]);

  useEffect(() => {
    console.log(sendAmount);
  }, [sendAmount])

  const saveMdiAmount = async (amount: number) => {
    await AsyncStorage.setItem('MDI_AMOUNT', amount.toString());
  };

  const handleSendToken = () => {
    if (sendAmount && receiverId && mdi) {
      // setLoading(true);
      const amount = Number(sendAmount);
      dispatch(
        sendToken({
          to: receiverId,
          amount,
          canisterId: canisterId,
          icpPrice,
          opts: {
            fee:
              mdi?.fee && mdi?.decimals
                ? mdi.fee * Math.pow(10, mdi.decimals)
                : 0, // TODO: Change this to selectedToken.fee only when dab is ready
          },
          onSuccess: () => { console.log('성공') },
          // setLoading(false),
          onFailure: () => { console.log('실패') },
        })
      );
    }
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={'보내기'} />
      <ScrollView horizontal={false} style={CommonStyle.contentWrap}>
        <View style={styles.amountLayer}>
          <Text style={styles.amountText}>보유 MDI</Text>
          <MedicleInput placeholder={mdiAmount.toString()} editable={false} />
        </View>
        <View style={styles.sendLayer}>
          <MedicleInput
            placeholder={'보낼 주소를 입력해 주세요.'}
            style={{ width: '100%' }}
            onChangeText={value => {
              setReceiverId(value);
            }}
            value={receiverId}
          />
          <View style={styles.sendLayerMiddle}>
            <MedicleInput
              placeholder={'보낼 수량을 입력해주세요.'}
              style={{ width: '75%' }}
              onChangeText={value => {
                setSendAmount(value);
              }}
              value={sendAmount}
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
              editable={false}
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
      <MedicleButton
        text='보내기'
        buttonStyle={{
          height: 50,
        }}
        onPress={handleSendToken} />
    </SafeAreaView>
  );
};
1
export default WalletSend;
