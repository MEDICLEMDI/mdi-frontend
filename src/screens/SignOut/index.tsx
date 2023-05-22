import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Warning from '@/assets/icons/info-circle.png';
import Close from '@/assets/images/close.png';
import api from '@/components/Api';
import MedicleButton from '@/components/buttons/MedicleButton';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import MedicleInput from '@/components/inputs/MedicleInput';
import eventEmitter from '@/utils/eventEmitter';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
import { responseDTO, User } from '@/interfaces/api';
import { ErrorCode } from '@/constants/error';
import { getStorageData } from '@/utils/localStorage';
import LoadingModal from '@/components/LoadingModal';
import useCustomToast from '@/hooks/useToast';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [signOutAgree, setSignOutAgree] = React.useState(false);
  // const [page, setPage] = React.useState<'about wallet' | 'user withdraw'>(
  //   'about wallet'
  // );
  const { showToast } = useCustomToast();
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');
  const [passwordErrMessage, setPasswordErrMessage] =
    React.useState<string>('');
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [passwordVaild, setPasswordVaild] = React.useState(false);

  React.useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const user: User = await getStorageData('@User');
    console.log(user);
    setUser(user);
  };

  const handleUserWithdraw = async () => {
    setLoading(true);
    try {
      const request = {
        password: password,
      };

      let response;
      if (user?.reg_type === 'normal') {
        response = await api.normalUserWithdraw(request);
      } else {
        response = await api.socialUserWithdraw();
      }
      if (response.result) {
        await AsyncStorage.clear();
        eventEmitter.emit('loggedOut');
        showToast('탈퇴가 정상적으로 처리되었습니다.');
      } else {
        if (response.error_code && response.error_code === 109) {
          handlePasswordonChageText('');
          showToast('비밀번호가 올바르지 않습니다.');
        } else {
          throw 'error';
        }
      }
    } catch (err) {
      console.error(err);
      setPasswordErrMessage(ErrorCode[101]);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handlePasswordonChageText = (text: string) => {
    setPasswordErrMessage('');
    setPasswordVaild(text.length > 7);
    setPassword(text);
  };

  // if (page === 'about wallet') {
  //   return (
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <Header goBack={true} title={t('setting.logOut')} />
  //       <View style={style.walletContainer}>
  //         <Text style={style.walletTitle}>지갑 유의사항</Text>
  //         <Text style={style.walletSubTitle}>회원탈퇴 전에 꼭 확인하세요.</Text>
  //         <Text style={style.walletContent}>
  //           {
  //             '코인 지갑은 icp네트워크 기반의 지갑으로\n메디클앱 외부 icp 지갑이 사용 가능한 어디서든\n사용할수 있음으로 사용자의 지갑정보를 저장하지 \n않습니다.\n회원탈퇴시 계정에 연결된 지갑의 연결이 해제됨으로 꼭, 지갑의 비밀키를 개인 보관 하시길 부탁드립니다.\n(지갑 -> 지갑설정 -> 보안정보 -> 비밀복구구문공개)\n다시 로그인 하실경우 지갑 불러오기 기능을 이용하여\n지갑은 연결할수 있습니다.'
  //           }
  //         </Text>
  //       </View>
  //       <View style={{ marginTop: 'auto' }}>
  //         <MedicleButton
  //           text="다음"
  //           buttonStyle={{ height: 50 }}
  //           onPress={() => {
  //             setPage('user withdraw');
  //           }}
  //         />
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.logOut')} />
      <View style={style.walletContainer}>
        <Text style={style.walletTitle}>유의사항</Text>
        <Text style={style.walletSubTitle}>회원탈퇴 전에 꼭 확인하세요.</Text>
        <Text style={style.walletContent}>
          {
            '회원탈퇴 이후에는 포인트 사용이 불가능합니다. 회원탈퇴 전, 사용 가능한 포인트가 있다면 반드시 사용해야 하며, 사용하지 않은 포인트는 회원탈퇴 이후 소멸됩니다.'
          }
        </Text>
      </View>
      <View style={{ marginTop: 'auto' }}>
        <Hr color="#F2F2F2" thickness={12} />
        <View style={{ paddingHorizontal: 30 }}>
          <View style={[style.flexDirection, style.pointWrap]}>
            <Text>보유 포인트</Text>
            <Text style={{ fontWeight: 'bold' }}>{0}원</Text>
          </View>
          <CustomCheckbox
            selected={signOutAgree}
            onPress={() => setSignOutAgree(!signOutAgree)}>
            <Text style={style.alertText}>
              유의사항을 모두 확인하였으며, 회원 탈퇴시 쿠폰, 포인트 소멸에
              동의합니다.
            </Text>
          </CustomCheckbox>
        </View>
        <MedicleButton
          disabled={!signOutAgree}
          text="회원탈퇴"
          buttonStyle={{ height: 50 }}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        {!loading ? (
          <View style={style.modalContainer}>
            <View
              style={[
                style.modal,
                user?.reg_type === 'social' && { height: 230 },
              ]}>
              <View style={style.modalPaddingLayer}>
                <View style={style.modalHeader}>
                  <TouchableOpacity
                    style={style.modalHeaderRight}
                    onPress={handleCloseModal}>
                    <Image style={style.modalCloseButton} source={Close} />
                  </TouchableOpacity>
                </View>

                <View style={style.modalTextLayer}>
                  <View style={style.textTop}>
                    <Image source={Warning} style={style.warningImage} />
                    <Text style={style.warningTitle}>
                      {'  계정을 삭제하시겠습니까?'}
                    </Text>
                  </View>
                  <Text style={style.warningDescript}>
                    {`계정 및 자산은 이 앱에서 영구히 삭제됩니다.

이작업은 취소할 수 없습니다.`}
                  </Text>
                </View>
                {user?.reg_type === 'normal' && (
                  <View style={style.passwordLayer}>
                    <Text style={{ marginBottom: 10 }}>
                      {t('wallet.setting.password')}
                    </Text>
                    <MedicleInput
                      placeholder={t('wallet.setting.password')}
                      onChangeText={(text: string) => {
                        handlePasswordonChageText(text);
                      }}
                      errText={passwordErrMessage !== '' && passwordErrMessage}
                      password={true}
                    />
                  </View>
                )}
              </View>
              <View style={style.modalButtonContainer}>
                <MedicleButton
                  text={'취소'}
                  textStyle={{ color: '#FFFFFF' }}
                  buttonStyle={style.cancelButton}
                  onPress={handleCloseModal}
                />
                <MedicleButton
                  text={'회원탈퇴'}
                  buttonStyle={style.deleteButton}
                  disabled={
                    user?.reg_type === 'normal' ? !passwordVaild : false
                  }
                  onPress={() => {
                    handleUserWithdraw();
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </Modal>
    </SafeAreaView>
  );
};
