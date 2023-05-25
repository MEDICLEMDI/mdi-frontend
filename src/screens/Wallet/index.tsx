import Accordion from '@/components/Accordion';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import MedicleButton from '@/components/buttons/MedicleButton';
import { Row } from '@/components/layout';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import style from './style';
import Spacing from '@/components/Spacing';
import {
  Colors,
  DARK_GRAY_BOLD_14,
  DARK_GRAY_BOLD_16,
  STANDARD_GRAY_14,
} from '@/constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Routes from '@/navigation/Routes';
import Icon from '@/components/icons';
import WalletBG from '@/assets/images/WalletBG.png';
import Li from '@/components/Li';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorageData } from '@/utils/localStorage';
import { textEllipsis } from '@/utils/strings';
import api from '@/components/Api';
import CopyButton from '@/components/CopyButton';
import { Portal } from '@gorhom/portal';

export default ({ navigation }: any) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState({
    mdi: 0,
    eth: 0,
  });

  useEffect(() => {
    // getAlretIsOpen();
    initialize();
  }, [isFocus]);

  /**
   * 화면 초기화, 유저정보, 유저지갑 가져오고 잔액갱신
   */
  const initialize = async () => {
    const user = await getStorageData('@User');
    setAddress(user.mdi.mw_wallet_address);
    await getBalance();
  };

  /**
   * 지갑 잔액갱신
   */
  const getBalance = async () => {
    setLoading(true);
    try {
      const user = await getStorageData('@User');
      const data = await api.getBalance(user.id, user.mdi.mw_wallet_address);
      setBalance({
        mdi: Number(data.mdi),
        eth: Number(data.eth),
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // ############# 입금확인 알림창 기능 일부 비활성화 ############
  // 1회만 알림이 노출되도록 설정하려면 아래의 주석을 모두 해제하면 됨
  // const getAlretIsOpen = async () => {
  // 	const isOpen = await AsyncStorage.getItem('@WalletAlert');
  // 	if (isOpen === null || !isOpen) {
  // 		setVisible(true);
  // 	}
  // }

  /**
   * 페이지 진입시 뜨는 모달 닫기 (안드로이드만 모달이 뜨고 ios 는 화면에 문구로 나옴)
   */
  const saveAlretIsOpen = async () => {
    // await AsyncStorage.setItem('@WalletAlert', 'true');
    setVisible(false);
  };
  // ####################################################

  return (
    <SafeAreaView style={style.containerWrap}>
      <Header goBack={true} title="지갑" />
      {isLoading && (
        <Portal>
          <Modal animationType="fade" transparent={true} visible={isLoading}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: Colors.Medicle.ModalBackground,
              }}>
              <Icon name="mdiHorizontal" />
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator size="large" />
              </View>
            </View>
          </Modal>
        </Portal>
      )}

      <ScrollView>
        <Text style={[style.elementOffset, DARK_GRAY_BOLD_14]}>지갑 설정</Text>
        <BoxDropShadow style={[style.elementOffset, style.walletInfoWrap]}>
          <ImageBackground
            source={WalletBG}
            resizeMode="cover"
            style={style.walletInfoWrapBG}>
            <Row justify="space-between" align="center" style={style.rowOffset}>
              <Text style={DARK_GRAY_BOLD_14}>지갑 정보</Text>
              <TouchableOpacity
                onPress={() => {
                  getBalance();
                }}>
                <Icon name="refresh_s" />
              </TouchableOpacity>
            </Row>

            <View style={style.rowOffsetLarge}>
              <Row justify="space-between">
                <Row align="center">
                  <Icon name="mdiIcon" />
                  <Spacing size={10} />
                  <Text style={DARK_GRAY_BOLD_16}>MDI</Text>
                </Row>
                <Text style={DARK_GRAY_BOLD_16}>{balance.mdi.toFixed(2)}</Text>
              </Row>

              <Row justify="space-between" style={style.rowOffset}>
                <Row align="center">
                  {/* <Icon name="eth" />
									<Spacing size={10} /> */}
                  <Text style={STANDARD_GRAY_14}>ETH</Text>
                </Row>
                <Text style={STANDARD_GRAY_14}>{balance.eth.toFixed(2)}</Text>
              </Row>
            </View>

            <Row justify="space-between">
              <Text>지갑주소</Text>
              <Row align="center">
                <Text>{textEllipsis(address, 12, 12)}</Text>
                <Spacing size={10} />
                <CopyButton toastMessage="복사되었습니다." copyText={address} />
              </Row>
            </Row>
          </ImageBackground>
        </BoxDropShadow>

        <BoxDropShadow style={style.elementOffset}>
          <Row justify="space-between">
            <MedicleButton
              text="보내기"
              buttonStyle={style.button}
              onPress={() => navigation.navigate(Routes.SEND)}
            />
            <Spacing size={10} />
            <MedicleButton
              text="전송내역"
              buttonStyle={style.button}
              onPress={() => navigation.navigate(Routes.TRANSACTION)}
            />
          </Row>
        </BoxDropShadow>

        {/* <BoxDropShadow style={[style.walletDeleteButton, style.elementOffset]}>
					<TouchableOpacity>
						<Text style={DARK_GRAY_BOLD_14}>지갑 삭제하기</Text>
					</TouchableOpacity>
				</BoxDropShadow> */}

        {Platform.OS === 'ios' ? (
          <View style={style.warningWrap}>
            <Li
              textStyle={style.warning}
              highlightStyle={style.warningHilight}
              text="제공된 지갑 주소는 메디클 또는 이더리움만 입금 가능합니다. <strong>해당 주소로 다른 디지털 자산을 입금 시도할 경우 발생할 수 있는 오류/손실은 복구 불가능<strong>합니다."
            />
          </View>
        ) : (
          <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={[style.sendModalWrap]}>
              <View style={style.sendModal}>
                <Text style={[style.sendModalHeader, DARK_GRAY_BOLD_16]}>
                  꼭 알아두세요!
                </Text>

                <View style={style.warningWrap}>
                  <Li
                    textStyle={style.warning}
                    highlightStyle={style.warningHilight}
                    text="제공된 지갑 주소는 메디클 또는 이더리움만 입금 가능합니다. <strong>해당 주소로 다른 디지털 자산을 입금 시도할 경우 발생할 수 있는 오류/손실은 복구 불가능<strong>합니다."
                  />
                </View>

                <Row justify="space-between" style={style.sendModalButtonWrap}>
                  <MedicleButton
                    text="확인했습니다."
                    buttonStyle={[style.sendModalButton]}
                    onPress={() => saveAlretIsOpen()}
                  />
                </Row>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
