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
import Close from '@/assets/images/close.png';
import Accordion from '@/components/Accordion';
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
import LoadingModal from '@/components/LoadingModal';

const WalletSetting = ({
  navigation,
  goBack,
}: RootScreenProps<Routes.WALLET_SETTING>) => {
  const { t } = useTranslation();
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
      setPasswordErrMessage(t('errorMessage.passwordShortError'));
    }
  };

  const handlePasswordonChageText = (text: string) => {
    setPasswordErrMessage(undefined);
    setPasswordVaild(text.length > 7);
    setPassword(text);
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header goBack={true} title={t('header.walletSettings')} />
      <ScrollView horizontal={true}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {t('wallet.setting.walletSetting')}
            </Text>
          </View>

          <View style={styles.menuContainer}>
            <BoxDropShadow>
              <Accordion>
                <Accordion.Header>
                  <Text style={styles.animatedTitleBoxText}>
                    {t('wallet.setting.walletInfo')}
                  </Text>
                </Accordion.Header>
                <Accordion.Body>
                  <View style={styles.animatedContents}>
                    <Text style={styles.animatedContentsText}>
                      {t('wallet.setting.balance')}
                    </Text>
                    <Text style={styles.animatedContentsText}>
                      {mdiAmount + ' ' + t('wallet.mdi')}
                    </Text>
                  </View>
                  <View style={styles.animatedContents}>
                    <Text style={styles.animatedContentsText}>
                      {t('wallet.walletAddress')}
                    </Text>
                    <Text style={styles.animatedContentsText}>
                      {principal?.slice(0, 8) + '...'}
                    </Text>
                  </View>
                </Accordion.Body>
              </Accordion>
            </BoxDropShadow>
            <View style={{ marginTop: 10 }}>
              <BoxDropShadow>
                <Accordion>
                  <Accordion.Header>
                    <Text style={styles.animatedTitleBoxText}>
                      {t('wallet.setting.securityInfo')}
                    </Text>
                  </Accordion.Header>
                  <Accordion.Body>
                    <View style={styles.animatedContents}>
                      <Text style={styles.animatedContentsText}>
                        {t('wallet.setting.nmemonicDisclosure')}
                      </Text>
                    </View>
                    <View style={styles.animatedContents}>
                      <TouchableOpacity
                        style={styles.nmemonicButton}
                        onPress={() => {
                          navigation.navigate(Routes.WALLET_MNEMONIC);
                        }}>
                        <Text style={styles.nmemonicButtonText}>
                          {t('wallet.setting.nmemonicDisclosure')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Accordion.Body>
                </Accordion>
              </BoxDropShadow>
            </View>

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
                  <Text style={styles.animatedTitleBoxText}>
                    {t('wallet.setting.deleteWallet')}
                  </Text>
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
                    {t('wallet.setting.deleteWalletCheck')}
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
                  {t('wallet.setting.password')}
                </Text>
                <MedicleInput
                  placeholder={t('wallet.setting.password')}
                  onChangeText={(text: string) => {
                    handlePasswordonChageText(text);
                  }}
                  errText={passwordErrMessage && passwordErrMessage}
                  password={true}
                />
              </View>
            </View>
            <MedicleButton
              text={t('button.deleteWallet')}
              buttonStyle={styles.deleteButton}
              disabled={!passwordVaild}
              onPress={() => {
                handleCloseModal();
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
