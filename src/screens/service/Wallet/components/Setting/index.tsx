import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Warning from '@/assets/icons/info-circle.png';
import Arrow from '@/assets/images/arrow-right.png';
import Close from '@/assets/images/close.png';
import BoxDropShadow from '@/components/BoxDropShadow';
import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { Colors } from '@/constants/theme';
import { RootScreenProps } from '@/interfaces/navigation';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { reset as resetICPStore } from '@/redux/slices/icp';
import { reset as resetKeyringStore } from '@/redux/slices/keyring';
import { reset as resetUserStore } from '@/redux/slices/user';
import { clearState as resetWalletConnectStore } from '@/redux/slices/walletconnect';
import { clearStorage } from '@/utils/localStorage';
import { passwordCheck } from '@/utils/passwordCheck';

import CommonStyle from '../../common_style';
import styles from './styles';
import Accordion from '@/components/Accordion';

const WalletSetting = ({
  navigation,
  goBack,
}: RootScreenProps<Routes.WALLET_SETTING>) => {
  const { t } = useTranslation();
  const [walletExpanded, setWalletExpanded] = useState(false);
  const [securityExpanded, setSecurityExpanded] = useState(false);
  const walletInfoHeight = useRef(new Animated.Value(0)).current;
  const walletInfoOpacity = useRef(new Animated.Value(0)).current;
  const SecurityInfoHeight = useRef(new Animated.Value(0)).current;
  const SecurityInfoOpacity = useRef(new Animated.Value(0)).current;
  const [mdiAmount, setMdiAmount] = useState(0);
  const dispatch = useAppDispatch();
  const deleteWalletRef = useRef<Modalize>(null);
  const principal = useAppSelector(
    state => state.keyring?.currentWallet?.principal
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordVaild, setPasswordVaild] = useState(false);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [passwordErrMessage, setPasswordErrMessage] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    getMdiAmount();
  }, [mdiAmount]);

  useEffect(() => {
    console.log(password);
  }, [password]);

  const getMdiAmount = async () => {
    const amount = await AsyncStorage.getItem('MDI_AMOUNT');
    setMdiAmount(Number(amount));
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDeleteWallet = async () => {
    if (await passwordCheck(password!)) {
      clearStorage();
      dispatch(resetUserStore());
      dispatch(resetICPStore());
      dispatch(resetWalletConnectStore());
      dispatch(resetKeyringStore());
      deleteWalletRef.current?.close();
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.WALLET_WELCOME }],
      });
    } else {
      setPasswordErrMessage('*비밀번호가 일치하지 않습니다.');
    }
  };

  const handlePasswordonChageText = (text: string) => {
    setPasswordErrMessage(undefined);
    setPasswordVaild(text.length > 7);
    setPassword(text);
  };

  const toggleExpanded = (
    height: Animated.Value,
    opacity: Animated.Value,
    target: string
  ) => {
    if (target === 'wallet') {
      setWalletExpanded(!walletExpanded);
      Animated.timing(height, {
        toValue: walletExpanded ? 0 : 70, // 뷰의 높이를 0 또는 100으로 조정
        duration: 400, // 애니메이션 지속 시간
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
      Animated.timing(opacity, {
        toValue: walletExpanded ? 0 : 1, // 뷰의 높이를 0 또는 100으로 조정
        duration: walletExpanded ? 200 : 600, // 애니메이션 지속 시간
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
    } else {
      setSecurityExpanded(!securityExpanded);
      Animated.timing(height, {
        toValue: securityExpanded ? 0 : 70, // 뷰의 높이를 0 또는 100으로 조정
        duration: 400, // 애니메이션 지속 시간
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
      Animated.timing(opacity, {
        toValue: securityExpanded ? 0 : 1, // 뷰의 높이를 0 또는 100으로 조정
        duration: securityExpanded ? 200 : 600, // 애니메이션 지속 시간
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
    }
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.wallet')} />
      <ScrollView horizontal={true}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>지갑 설정</Text>
          </View>

          <View style={styles.menuContainer}>
            <BoxDropShadow
              color={
                Platform.OS === 'ios'
                  ? Colors.Medicle.Gray.SemiLight
                  : Colors.Medicle.Gray.Dark
              }
              radius={10}
              style={[styles.profileWrap, { padding: 0 }]}>
              <View style={styles.walletInfo}>
                <TouchableOpacity
                  onPress={() =>
                    toggleExpanded(
                      walletInfoHeight,
                      walletInfoOpacity,
                      'wallet'
                    )
                  }>
                  <View style={styles.animatedTitleBox}>
                    <Text style={styles.animatedTitleBoxText}>지갑 정보</Text>
                    <Image source={Arrow} style={styles.arrowImage} />
                  </View>
                </TouchableOpacity>
                <Animated.View
                  style={[
                    styles.content,
                    { height: walletInfoHeight, opacity: walletInfoOpacity },
                  ]}>
                  <View style={styles.animatedContents}>
                    <Text style={styles.animatedContentsText}>보유 MDI</Text>
                    <Text style={styles.animatedContentsText}>{mdiAmount}</Text>
                  </View>
                  <View style={styles.animatedContents}>
                    <Text style={styles.animatedContentsText}>지갑주소</Text>
                    <Text style={styles.animatedContentsText}>
                      {principal?.slice(0, 8) + '...'}
                    </Text>
                  </View>
                </Animated.View>
              </View>
            </BoxDropShadow>
            <BoxDropShadow
              color={
                Platform.OS === 'ios'
                  ? Colors.Medicle.Gray.SemiLight
                  : Colors.Medicle.Gray.Dark
              }
              radius={10}
              style={[styles.profileWrap, { padding: 0, marginTop: 10 }]}>
              <View style={styles.walletInfo}>
                <TouchableOpacity
                  onPress={() =>
                    toggleExpanded(
                      SecurityInfoHeight,
                      SecurityInfoOpacity,
                      'security'
                    )
                  }>
                  <View style={styles.animatedTitleBox}>
                    <Text style={styles.animatedTitleBoxText}>보안 정보</Text>
                    <Image source={Arrow} style={styles.arrowImage} />
                  </View>
                </TouchableOpacity>
                <Animated.View
                  style={[
                    styles.content,
                    {
                      height: SecurityInfoHeight,
                      opacity: SecurityInfoOpacity,
                    },
                  ]}>
                  <View style={styles.animatedContents}>
                    <Text style={styles.animatedContentsText}>
                      비밀 복구 구문 공개
                    </Text>
                  </View>
                  <View style={styles.animatedContents}>
                    <TouchableOpacity
                      style={styles.nmemonicButton}
                      onPress={() => {
                        navigation.navigate(Routes.WALLET_MNEMONIC);
                      }}>
                      <Text style={styles.nmemonicButtonText}>
                        비밀 복구 구문 공개
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </View>
            </BoxDropShadow>
            <BoxDropShadow>
              <Accordion>
                <Accordion.Header>
                  <Text style={styles.animatedTitleBoxText}>지갑 정보</Text>
                </Accordion.Header>
                <Accordion.Body>
                  <View style={styles.animatedContents}>
                    <Text style={styles.animatedContentsText}>보유 MDI</Text>
                    <Text style={styles.animatedContentsText}>
                      {mdiAmount + ' MDI'}
                    </Text>
                  </View>
                  <View style={styles.animatedContents}>
                    <Text style={styles.animatedContentsText}>지갑주소</Text>
                    <Text style={styles.animatedContentsText}>
                      {principal?.slice(0, 8) + '...'}
                    </Text>
                  </View>
                </Accordion.Body>
              </Accordion>
            </BoxDropShadow>
            <BoxDropShadow>
              <Accordion>
                <Accordion.Header>
                  <Text style={styles.animatedTitleBoxText}>보안 정보</Text>
                </Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
              </Accordion>
            </BoxDropShadow>

            <TouchableOpacity
              onPress={() => {
                handleOpenModal();
              }}>
              <BoxDropShadow
                color={
                  Platform.OS === 'ios'
                    ? Colors.Medicle.Gray.SemiLight
                    : Colors.Medicle.Gray.Dark
                }
                radius={10}
                style={[
                  styles.profileWrap,
                  { padding: 0, marginTop: 10, opacity: 0.99 },
                ]}>
                <View style={styles.walletDeleteButton}>
                  <Text style={styles.animatedTitleBoxText}>지갑 삭제하기</Text>
                </View>
              </BoxDropShadow>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalPaddingLayer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.modalHeaderRight}
                  onPress={handleCloseModal}>
                  <Image style={styles.modalCloseButton} source={Close} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalTextLayer}>
                <View style={styles.textTop}>
                  <Image source={Warning} style={styles.warningImage} />
                  <Text style={styles.warningTitle}>
                    지갑을 삭제하시겠습니까?
                  </Text>
                </View>
                <Text style={styles.warningDescript}>
                  {`기존 지갑, 계정 및 자산은 이 앱에서 영구히 삭제됩니다.

이작업은 취소할 수 없습니다. 


 
이 지갑은 비밀 복구 구문으로만 복구할 수 있습니다.

MEDICLE에는 비밀 복구 구문이 저장되어있지 않습니다.`}
                </Text>
              </View>
              <View style={styles.passwordLayer}>
                <Text style={{ marginBottom: 10 }}>
                  비밀번호를 입력해주세요.
                </Text>
                <MedicleInput
                  placeholder="비밀번호를 입력해주세요."
                  onChangeText={(text: string) => {
                    handlePasswordonChageText(text);
                  }}
                  errText={passwordErrMessage && passwordErrMessage}
                  password={true}
                />
              </View>
            </View>
            <MedicleButton
              text="지갑 삭제"
              buttonStyle={styles.deleteButton}
              disabled={!passwordVaild}
              onPress={() => {
                handleDeleteWallet();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WalletSetting;
