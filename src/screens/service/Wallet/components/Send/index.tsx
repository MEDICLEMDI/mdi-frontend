import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Config from 'react-native-config';

import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { MedicleInput } from '@/components/inputs';
import Li from '@/components/Li';
import { RootScreenProps } from '@/interfaces/navigation';
import { Asset } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { sendToken } from '@/redux/slices/user';
import { isOwnAddress, validatePrincipalId } from '@/utils/ids';

import CommonStyle from '../../common_style';
import styles from './styles';

export interface Receiver {
  id: string; // PrincipalId only
  name?: string;
  image?: string;
  icnsId?: string;
  isValid?: boolean;
}

const WalletSend = ({ navigation }: RootScreenProps<Routes.WALLET_SEND>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [mdiAmount, setMdiAmount] = useState(0);
  const { assets, contacts } = useAppSelector(state => state.user);
  const [sendAmount, setSendAmount] = useState<string>();
  const [receiver, setReceiver] = useState<Receiver>();
  const [receiverVaild, setReceiverVaild] = useState(false);
  const { currentWallet } = useAppSelector(state => state.keyring);
  const canisterId: string = 'h4gr6-maaaa-aaaap-aassa-cai';
  const { icpPrice } = useAppSelector(state => state.icp);
  const [selectedToken, setSelectedToken] = useState<Asset | undefined>();
  const liChild = `송금시 발생하는 <strong>수수료는 ${Config.SEND_FEE} MDI<strong> 입니다.#주소를 정확히 입력해야만 입금되며, 잘못 입력하는 경우 복구가 불가능합니다. #전송 시간은 네트워크 상황에 따라 소요 시간이 달라질 수 있습니다.`;

  const [mdi, setMdi] = useState<Asset | null>(null);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [total, setTotal] = useState();
  const [principalVaildMessage, setPrincipalVaildMessage] = useState<
    string | null
  >(null);
  const [amountVaildMessage, setAmountVaildMessage] = useState<string | null>(
    null
  );
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
    if (receiver?.isValid) {
      setPrincipalVaildMessage(null);
    } else if (!receiver?.isValid && receiver?.id.length === 63) {
      setPrincipalVaildMessage('*유효하지 않은 주소입니다.');
    }
    console.log(receiver);
  }, [receiver]);

  const saveMdiAmount = async (amount: number) => {
    await AsyncStorage.setItem('MDI_AMOUNT', amount.toString());
  };

  const onChangeReceiver = (text: string) => {
    if (!text) {
      setPrincipalVaildMessage(null);
      return setReceiver(undefined);
    }

    if (text.length === 63) {
      const savedContact = contacts?.find(c => c.id === text);
      const isOwn = isOwnAddress(text, currentWallet!);

      if (savedContact && !isOwn) {
        setReceiver({
          ...savedContact,
          isValid: true,
        });
      } else {
        const isValid = !isOwn && validatePrincipalId(text);
        setReceiver({ id: text, isValid });
      }
    } else {
      setPrincipalVaildMessage('*principal 주소는 63자리 입니다.');
    }
  };

  const onChangeAmount = (_amount: number) => {
    let amount = _amount;
    const _regex = /^\d*\.?\d{0,4}$/;
    if (amount > mdiAmount) {
      setAmountVaildMessage('*보유 MDI보다 많은 수량은 전송할 수 없습니다.');
    } else if (!_regex.test(amount.toString())) {
      setAmountVaildMessage('*정확한 수량을 입력하여 주세요.');
    } else {
      setAmountVaildMessage(null);
    }
  };

  const handleSendToken = () => {
    if (sendAmount && receiver && mdi) {
      // setLoading(true);
      const amount = Number(sendAmount);
      dispatch(
        sendToken({
          to: receiver.id,
          amount,
          canisterId: canisterId,
          icpPrice,
          opts: {
            fee:
              mdi?.fee && mdi?.decimals
                ? mdi.fee * Math.pow(10, mdi.decimals)
                : 0, // TODO: Change this to selectedToken.fee only when dab is ready
          },
          onSuccess: () => {
            console.log('성공');
          },
          // setLoading(false),
          onFailure: () => {
            console.log('실패');
          },
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
            style={{ }}
            maxLength={63}
            onChangeText={value => {
              onChangeReceiver(value);
            }}
            // value={receiver?.id}
            errText={principalVaildMessage!}
          />
          <View style={styles.sendLayerMiddle}>
            <MedicleInput
              label='TEXT'
              direction='row'
              placeholder={'보낼 수량을 입력해주세요.'}
              style={{ flex: 1, alignItems: 'center' }}
              onChangeText={value => {
                onChangeAmount(Number(value));
              }}
              value={sendAmount}
              errText={amountVaildMessage!}
            />
            <MedicleButton
              text={'전액'}
              buttonStyle={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 10,
                marginBottom: 14,
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
        text="보내기"
        buttonStyle={{
          height: 50,
        }}
        disabled={sendDisabled}
        onPress={handleSendToken}
      />
    </SafeAreaView>
  );
};
1;
export default WalletSend;
