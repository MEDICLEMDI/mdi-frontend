import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CryptoJS from 'crypto-js';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';

import Close from '@/assets/images/close.png';
import Result from '@/assets/images/result_icon.png';
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
import {
  isOwnAddress,
  validateAccountId,
  validatePrincipalId,
} from '@/utils/ids';

import CommonStyle from '../../common_style';
import styles from './styles';
import LoadingModal from '@/components/LoadingModal';

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
  const { currentWallet } = useAppSelector(state => state.keyring);
  const canisterId: string = 'h4gr6-maaaa-aaaap-aassa-cai';
  const { icpPrice } = useAppSelector(state => state.icp);
  // const [selectedToken, setSelectedToken] = useState<Asset | undefined>();

  const [mdi, setMdi] = useState<Asset | null>(null);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [principalVaildMessage, setPrincipalVaildMessage] = useState<
    string | null
  >(null);
  const [principalInputBorder, setPrincipalInputBorder] = useState(1);
  const [sendAmount, setSendAmount] = useState<string>();
  const [amoutVaild, setAmountVaild] = useState(false);
  const [amountVaildMessage, setAmountVaildMessage] = useState<string | null>();
  const [amountInputBorder, setAmountInputBorder] = useState(1);

  const [receiver, setReceiver] = useState<Receiver>();

  const [total, setTotal] = useState<number | null>(null);
  const [totalVaild, setTotalVaild] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState('send');

  const sendFee = Number(Config.SEND_FEE);
  const liChild = `송금시 발생하는 <strong>수수료는 ${Config.SEND_FEE} MDI<strong> 입니다.#주소를 정확히 입력해야만 입금되며, 잘못 입력하는 경우 복구가 불가능합니다. #전송 시간은 네트워크 상황에 따라 소요 시간이 달라질 수 있습니다.`;
  const [loading, setLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);

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
    if (total! > mdiAmount) {
      setAmountVaildMessage('*수수료 합산시 보유수량을 초과합니다.');
      setAmountInputBorder(0);
      setTotalVaild(false);
    } else {
      setTotalVaild(true);
    }
  }, [total]);

  useEffect(() => {
    if (receiver?.isValid && amoutVaild && totalVaild) {
      setSendDisabled(false);
    } else {
      setSendDisabled(true);
    }
    console.log('버튼검증');
  }, [receiver?.isValid, amoutVaild, totalVaild]);

  useEffect(() => {
    if (receiver?.isValid) {
      setPrincipalVaildMessage(null);
      setPrincipalInputBorder(1);
    } else if (!receiver?.isValid && receiver) {
      setPrincipalVaildMessage('*유효하지 않은 주소입니다.');
      setPrincipalInputBorder(0);
    }
    console.log('리시버');
  }, [receiver]);

  const saveMdiAmount = async (amount: number) => {
    await AsyncStorage.setItem('MDI_AMOUNT', amount.toString());
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const onChangeReceiver = (text: string) => {
    if (!text) {
      setPrincipalVaildMessage(null);
      setPrincipalInputBorder(1);
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
        const isValid =
          !isOwn && (validatePrincipalId(text) || validateAccountId(text));
        setReceiver({ id: text, isValid });
      }
    } else {
      setPrincipalVaildMessage('*지갑주소는 63자리 입니다.');
      setPrincipalInputBorder(0);
    }
  };

  const onChangeAmount = (_amount: string) => {
    setAmountVaild(false);
    setTotal(null);
    if (!_amount) {
      setAmountInputBorder(1);
      setAmountVaildMessage('');
      return;
    }

    let amount = Number(_amount);
    const _regex = /^\d*\.?\d{0,4}$/;

    let floatingPoint = amount + sendFee;
    floatingPoint = Math.round(floatingPoint * 10000) / 10000;
    setTotal(floatingPoint);

    setAmountInputBorder(0);
    if (amount === 0) {
      setAmountVaildMessage('*0 이상의 수량을 입력하여 주세요.');
    } else if (amount > mdiAmount) {
      setAmountVaildMessage('*보유 MDI보다 많은 수량은 전송할 수 없습니다.');
    } else if (!_regex.test(amount.toString())) {
      setAmountVaildMessage('*정확한 수량을 입력하여 주세요.');
    } else {
      setAmountVaildMessage('');
      setAmountInputBorder(1);
      setAmountVaild(true);
    }
  };

  const handleAllSend = () => {
    if (mdiAmount > sendFee) {
      const limit = mdiAmount - sendFee;
      setSendAmount(limit.toString());
      onChangeAmount(limit.toString());
    }
  };

  const handleSendToken = () => {
    setSendStatus(true);
    if (sendAmount && receiver && mdi) {
      setLoading(true);
      handleCloseModal();
      const amount = Number(sendAmount);
      dispatch(
        sendToken({
          to: receiver.id,
          amount: amount,
          canisterId: canisterId,
          icpPrice: icpPrice,
          opts: {
            fee:
              mdi?.fee && mdi?.decimals
                ? mdi.fee * Math.pow(10, mdi.decimals)
                : 0, // TODO: Change this to selectedToken.fee only when dab is ready
          },
          onSuccess: () => {
            console.log('성공');
          },
          onFailure: () => {
            console.log('실패');
          },
        })
      ).then(res => {
        setLoading(false);
        setSendStatus(false);
        setPage('result');
      });
    }
  };

  if (page === 'result') {
    return (
      <SafeAreaView style={CommonStyle.container}>
        <Header goBack={true} title={'보내기'} />
        {/* <ScrollView horizontal={false} style={CommonStyle.contentWrap}> */}
        <View style={styles.resultPage}>
          <Image source={Result} style={styles.resultImage} />
          <Text style={styles.resultText}>전송이 요청되었습니다.</Text>
        </View>
        {/* </ScrollView> */}
        <MedicleButton
          text="홈으로"
          buttonStyle={{
            height: 50,
          }}
          onPress={() => {
            navigation.navigate(Routes.WALLET_HOME);
          }}
        />
      </SafeAreaView>
    );
  }

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
            style={{}}
            maxLength={63}
            onChangeText={value => {
              onChangeReceiver(value);
            }}
            textInputStyle={[
              styles.sendInput,
              { borderWidth: principalInputBorder },
            ]}
            // value={receiver?.id}
            // errText={principalVaildMessage!}
            errText={principalVaildMessage!}
          />
          <View style={styles.sendLayerMiddle}>
            <MedicleInput
              direction="row"
              placeholder={'보낼 수량을 입력해주세요.'}
              onChangeText={value => {
                onChangeAmount(value);
                setSendAmount(value);
              }}
              textInputStyle={[
                styles.sendInput,
                { borderWidth: amountInputBorder },
              ]}
              value={sendAmount}
              errText={amountVaildMessage!}
              inputButtonNode={
                <MedicleButton
                  text={'전액'}
                  buttonStyle={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                  // disabled={mdiAmount > 0 ? false : true}
                  onPress={() => {
                    handleAllSend();
                  }}
                />
              }
            />
          </View>
          <View style={styles.sendLayerBottom}>
            <MedicleInput
              label={<Text style={styles.totalText}>TOTAL</Text>}
              direction="row"
              style={{ flex: 1 }}
              placeholder="수수료가 포함된 최종 수량입니다."
              editable={false}
              value={total ? total.toString() : undefined}
              clearButton={false}
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
        textStyle={styles.sendInputText}
        disabled={sendDisabled}
        // disabled={false}
        onPress={handleOpenModal}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalPaddingLayer}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderCenter}>
                  <Text style={styles.modalTitle}>보내기</Text>
                </View>
                <TouchableOpacity
                  style={styles.modalHeaderRight}
                  onPress={handleCloseModal}>
                  <Image style={styles.modalCloseButton} source={Close} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalContentLayer}>
                <Text style={styles.checkInfotitle}>보낼 주소</Text>
                <Text>{receiver && receiver.id}</Text>
                <Hr style={{ marginTop: 10, marginBottom: 10 }} />
                <Text style={styles.checkInfotitle}>보내는 수량</Text>
                <View>
                  <Text style={styles.checkInfoContent}>
                    {mdiAmount}
                    <Text style={styles.mdi}> MDI</Text>
                  </Text>
                </View>
                <Hr style={{ marginTop: 10, marginBottom: 10 }} />
                <View style={styles.totalLayer}>
                  <Text style={styles.modalTotal}>TOTAL{'  '}</Text>
                  <Text style={styles.fee}>
                    수수료가 포함된 최종 수량입니다.
                  </Text>
                </View>
                <View>
                  <Text style={styles.checkInfoContent}>
                    {total}
                    <Text style={styles.mdi}> MDI</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
              <MedicleButton
                buttonStyle={styles.modalCancel}
                textStyle={styles.modalCancelText}
                onPress={handleCloseModal}
                text="취소"
              />
              <MedicleButton
                buttonStyle={styles.modalSend}
                onPress={() => {
                  if (!sendStatus) {
                    handleSendToken();
                  }
                }}
                text="보내기"
              />
            </View>
          </View>
        </View>
      </Modal>
      {loading && <LoadingModal />}
    </SafeAreaView>
  );
};
export default WalletSend;
