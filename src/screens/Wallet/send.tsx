import Header from '@/components/Header';
import MedicleButton from '@/components/buttons/MedicleButton';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import {
  Colors,
  DARK_GRAY_12,
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_16,
  DARK_GRAY_BOLD_18,
  STANDARD_GRAY_10,
  STANDARD_GRAY_12,
} from '@/constants/theme';
import { MedicleInput } from '@/components/inputs';
import Hr from '@/components/Hr';
import Li from '@/components/Li';
import { Portal } from 'react-native-portalize';
import { Picker } from '@react-native-picker/picker';
import { Row } from '@/components/layout';
import Spacing from '@/components/Spacing';
import Icon from '@/components/icons';
import { getStorageData } from '@/utils/localStorage';
import api from '@/components/Api';
import { textEllipsis } from '@/utils/strings';
import useCustomToast from '@/hooks/useToast';
import Routes from '@/navigation/Routes';

export default ({ navigation }) => {
  const tokenTypes = ['ETH', 'MDI'];
  const { showToast } = useCustomToast();
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [balance, setBalance] = useState({
    eth: 0,
    mdi: 0,
  });
  const [selectedType, setSelectedType] = useState(0);
  const [transfer, setTransfer] = useState('');
  const [totalTransfer, setTotalTransfer] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState();

  const addressRef = useRef<TextInput>(null);
  const transferRef = useRef<TextInput>(null);

  // validChecker
  const [validTransfer, setValidTransfer] = useState('');
  const [validAddress, setValidAddress] = useState('');

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    if (transfer !== '' && toAddress !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [transfer, toAddress]);

  useEffect(() => {
    const fee = 0;
    let resultAmount = 0;
    if (selectedType === 0) {
      resultAmount = Number(transfer) + fee + expectationGasFee();
    } else {
      resultAmount = Number(transfer) + fee;
    }
    setTotalTransfer(resultAmount.toFixed(4));
  }, [transfer]);

  const getBalance = async () => {
    setLoading(true);
    try {
      const _user = await getStorageData('@User');
      setUser(_user);
      const data = await api.getBalance(_user.id, _user.mdi.mw_wallet_address);
      setBalance({
        mdi: data.mdi,
        eth: data.eth,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const isAddress = () => {
    if (
      /^(0x|0X)?[0-9a-f]{40}$/.test(toAddress.toLowerCase()) ||
      /^(0x|0X)?[0-9A-F]{40}$/.test(toAddress.toUpperCase())
    ) {
      if (toAddress === user?.mdi.mw_wallet_address) {
        setValidAddress('자신의 지갑주소로 전송할수 없습니다.');
        return false;
      }
      setValidAddress('');
      return true;
    } else {
      setValidAddress('올바르지 않은 지갑주소입니다.');
      return false;
    }
  };

  const valueValidation = () => {
    const balance = convertTypeBalance();
    if(Number(transfer) <= 0) {
      setValidTransfer('전송수량을 확인하여 주세요.');
      return false;
    }

    if (Number(totalTransfer) <= Number(balance)) {
      setValidTransfer('');
      return true;
    } else {
      setValidTransfer(`${tokenTypes[selectedType]} 보유 잔액이 모자랍니다.`);
      return false;
    }
  };

  const convertTypeBalance = () => {
    return selectedType === 0 ? balance.eth : balance.mdi;
  };

  const expectationGasFee = () => {
    const gasLimit = 21000;
    const gwei = 40;
    const gasPrice = gasLimit * gwei;

    const networkFee = gasPrice / 100000000; // gasPrice / 1ETH->18gwei

    return networkFee;
  };

  const transferValidation = () => {
    const value = valueValidation();
    const address = isAddress();

    if (value && address) {
      console.log('call modal');
      setVisible(true);
    }
  };

  const transferExcute = async () => {
    try {
      setLoading(true);
      const fee = 0;
      const user = await getStorageData('@User');
      const response = await api.transfer({
        id: user.id,
        from: user.mdi.mw_wallet_address,
        to: toAddress,
        amount: Number(transfer) + Number(fee),
        type: selectedType,
      });

      if (!response.result) throw new Error(response.message);

      navigation.dispatch([
        navigation.navigate({ name: Routes.WALLET }),
        navigation.navigate({ name: Routes.TRANSACTION }),
      ]);
    } catch (err) {
      console.error(err);
      showToast('전송에 실패하였습니다.');
      setVisible(false);
    } finally {
      getBalance();
      setLoading(false);
    }
  };

  const options = [
    { label: 'ETH 전송', value: 0 },
    { label: 'MDI 전송', value: 1 },
  ];

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={[style.sendModalWrap]}>
          <View style={style.sendModal}>
            <Row
              justify="space-between"
              align="center"
              style={style.sendOffset}>
              <Spacing size={20} />
              <Text style={[style.sendModalHeader, DARK_GRAY_BOLD_16]}>
                보내기
              </Text>
              <TouchableOpacity
                onPress={() => (isLoading ? null : setVisible(false))}>
                <Icon name="close" />
              </TouchableOpacity>
            </Row>

            <View style={style.sendOffset}>
              <Text style={DARK_GRAY_BOLD_14}>보낼 주소</Text>
              <Text>{textEllipsis(toAddress, 14, 14)}</Text>
              <Hr color={Colors.Medicle.Gray.Standard} style={style.hr} />
            </View>

            <View style={style.sendOffset}>
              <Text style={DARK_GRAY_BOLD_14}>보내는 수량</Text>
              <Text style={style.sendAmount}>
                <Text style={DARK_GRAY_BOLD_18}>{transfer}</Text>
                <Spacing size={4} />
                {tokenTypes[selectedType]}
              </Text>
              <Hr color={Colors.Medicle.Gray.Standard} style={style.hr} />
            </View>

            <View style={style.sendOffset}>
              <Row align="center">
                <Text style={DARK_GRAY_BOLD_16}>TOTAL</Text>
                <Spacing size={10} />
                <Text style={STANDARD_GRAY_10}>
                  수수료가 포함된 최종 수량입니다.
                </Text>
              </Row>
              <Text style={style.sendAmount}>
                <Text style={DARK_GRAY_BOLD_18}>{totalTransfer}</Text>
                <Spacing size={4} />
                {tokenTypes[selectedType]}
              </Text>
            </View>

            <Row justify="space-between" style={style.sendModalButtonWrap}>
              <MedicleButton
                text="취소"
                buttonStyle={[
                  style.sendModalButton,
                  style.sendModalCancelButton,
                ]}
                textStyle={{ color: '#FFF' }}
                onPress={() => setVisible(false)}
                disabled={isLoading}
              />
              {isLoading ? (
                <View
                  style={[
                    style.sendModalButton,
                    { backgroundColor: Colors.Medicle.Primary },
                  ]}>
                  <ActivityIndicator size="small" />
                </View>
              ) : (
                <MedicleButton
                  text="전송"
                  buttonStyle={style.sendModalButton}
                  onPress={() => transferExcute()}
                />
              )}
            </Row>
          </View>
        </View>
      </Modal>
      <Portal>
        {/* <Modal visible={true} animationType="slide"> */}
        <SafeAreaView style={style.containerWrap}>
          <Header goBack={true} title="전송" />
          <ScrollView style={[style.containerOffset]}>
            <View style={style.pickerWrap}>
              <Picker
                style={style.picker}
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedType(itemValue)
                }>
                <Picker.Item style={DARK_GRAY_12} label="ETH 전송" value={0} />
                <Picker.Item style={DARK_GRAY_12} label="MDI 전송" value={1} />
              </Picker>
            </View>

            <MedicleInput
              style={style.inputGap}
              editable={false}
              direction="row"
              value={convertTypeBalance().toString() + ' '}
              textAlign="right"
              leftInputNode={
                <Text style={style.feeInput}>
                  {tokenTypes[selectedType]} 보유 잔액
                </Text>
              }
              rightInputNode={<Text>{' ' + tokenTypes[selectedType]}</Text>}
              clearButton={false}
            />

            <MedicleInput
              ref={addressRef}
              style={style.inputGap}
              textInputStyle={[
                style.input,
                {
                  borderColor: validAddress
                    ? 'red'
                    : Colors.Medicle.Gray.Standard,
                },
              ]}
              direction="row"
              placeholder="보낼 주소를 입력해 주세요."
              value={toAddress}
              errText={validAddress}
              onChangeText={value => setToAddress(value)}
            />

            <MedicleInput
              ref={transferRef}
              style={style.inputGap}
              textInputStyle={[
                style.input,
                {
                  borderColor: validTransfer
                    ? 'red'
                    : Colors.Medicle.Gray.Standard,
                },
              ]}
              keyboardType="numeric"
              direction="row"
              placeholder="보낼 수량을 입력해 주세요."
              value={transfer.toString()}
              onChangeText={value => setTransfer(value)}
              errText={validTransfer}
              // inputButtonNode={<MedicleButton buttonStyle={style.button} text="전액" />}
              rightInputNode={<Text>{tokenTypes[selectedType]}</Text>}
            />

            <MedicleInput
              style={style.inputGap}
              editable={false}
              textInputStyle={style.input}
              label={<Text style={DARK_GRAY_BOLD_16}>TOTAL</Text>}
              direction="row"
              placeholder="수수료가 포함된 최종 수량입니다."
              textAlign="right"
              value={totalTransfer}
              clearButton={false}
              rightInputNode={<Text>{` ${tokenTypes[selectedType]}`}</Text>}
            />

            <MedicleInput
              // style={style.inputGap}
              // textInputStyle={style.input}
              editable={false}
              direction="row"
              value={expectationGasFee().toFixed(4)}
              textAlign="right"
              leftInputNode={
                <Text style={[STANDARD_GRAY_12, style.feeInput]}>
                  예상 수수료
                </Text>
              }
              rightInputNode={<Text> ETH</Text>}
              clearButton={false}
            />

            <Hr color={Colors.Medicle.Gray.Standard} style={style.hr} />

            <Li
              textStyle={STANDARD_GRAY_10}
              highlightStyle={[STANDARD_GRAY_10, { fontWeight: 'bold' }]}
              text="송금시 발생하는 <strong>수수료는 000 MDI</strong> 입니다.
							# 주소를 정확히 입력해야만 입금되며, 잘못 입력한 경우 복구가 불가능합니다.
							# 전송시간은 네트워크 상황에 따라 소요 시간이 달라 질 수 있습니다."
            />
          </ScrollView>
          <MedicleButton
            text="보내기"
            buttonStyle={style.bottomButton}
            disabled={disabled}
            onPress={() => transferValidation()}
          />
        </SafeAreaView>
        {/* </Modal> */}
      </Portal>
    </>
  );
};
