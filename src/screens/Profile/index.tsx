import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Close from '@/assets/images/close.png';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import MedicleButton from '@/components/buttons/MedicleButton';
import { ScrollViewGrid } from '@/components/GridLayout';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { ErrorCode } from '@/constants/error';
import { myPageMenus } from '@/constants/menus';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { ResponseDTO, User } from '@/interfaces/api';
import Routes from '@/navigation/Routes';
import { getStorageData } from '@/utils/localStorage';

import style from './style';
import { convertPrice } from '@/utils/utilities';
import { userRefresh } from '@/utils/userRefresh';

const Profile = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false); // 내정보로 가기전 비밀번호 검사 모달
  const [passwordErrMessage, setPasswordErrMessage] = React.useState<
    string | undefined
  >(undefined);
  const [passwordVaild, setPasswordVaild] = React.useState(false);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [user, setUser] = React.useState<User | undefined>();
  const [isInit, setInit] = React.useState(false);
  const numColumns = 3;
  const menuPadding = 50;
  const gap = 30;

  React.useEffect(() => {
    initialize();
  }, []);

  /**
   * 페이지 초기화
   */
  const initialize = async () => {
    const user = await userRefresh();
    setUser(user);
    setInit(true);
  };

  /**
   * 비밀번호 체크 모달 닫기
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setPassword(undefined);
    setPasswordVaild(false);
  };

  /**
   * 모달창 패스워드 인풋 이벤트 리스너
   * @param text 
   */
  const handlePasswordOnChageText = (text: string) => {
    setPasswordErrMessage(undefined);
    setPasswordVaild(text.length > 7);
    setPassword(text);
  };

  /**
   * 비밀번호 검증과 함께 프로필 수정페이지로 진입요청
   */
  const handleProfileEdit = async () => {
    try {
      const request = {
        password: password,
      };
      const response = await api.getMyPage(request);

      if (response.result) {
        handleCloseModal();
        navigation.navigate(Routes.EDIT_PROFILE);
      } else {
        if (response.error_code && response.error_code === 109) {
          setPasswordErrMessage(ErrorCode[response.error_code]);
        } else {
          throw 'error';
        }
      }
    } catch (err) {
      console.error(err);
      setPasswordErrMessage(ErrorCode[101]);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.profile')} />
      <ScrollView>
        <View style={style.contentWrap}>
          <BoxDropShadow
            color={
              Platform.OS === 'ios'
                ? Colors.Medicle.Gray.SemiLight
                : Colors.Medicle.Gray.Standard
            }
            offset={[0, 7]}
            elevation={10}
            opacity={0.95}
            radius={10}
            style={style.profileWrap}>
              {isInit ?
            <>
              <View style={style.profileNameWrap}>
                <Icon name="userCircle" />
                <Text style={style.name}>{user?.name}</Text>
              </View>
              {/* <View style={style.pointBtn}>
                <Icon name="mdiIcon" />
                <Text style={{ marginHorizontal: 10 }}>
                  포인트
                </Text>
                <Text>{convertPrice(user?.mdi.mw_mdi_point)}</Text>
              </View> */}
            </>
              :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator />
                </View>
              }
          </BoxDropShadow>

          <TouchableOpacity
            style={style.editProfileBtn}
            // onPress={() => navigation.navigate(Routes.EDIT_PROFILE)}
            onPress={() => {
              if (user?.reg_type === 'normal') {
                setModalVisible(true);
              } else {
                navigation.navigate(Routes.EDIT_PROFILE);
              }
            }}>
            <Text>{t('profile.editProfile')}</Text>
            <Icon name="arrowRight" />
          </TouchableOpacity>
        </View>
        <ScrollViewGrid
          itemStyle={style.itemStyle}
          itemBackground={Colors.Medicle.Brown.Light}
          numColumns={numColumns}
          padding={menuPadding}
          iconColor={{ stroke: Colors.Medicle.Brown.SemiDark }}
          gap={gap}
          data={myPageMenus(t)}
          onPress={({ route }: any) => navigation.navigate(route)}
          renderItem="circle"
        />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={style.modalContainer}>
          <View style={style.modal}>
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
                  {/* <Image source={Warning} style={style.warningImage} /> */}
                  <Text style={style.warningTitle}>비밀번호 확인</Text>
                </View>
              </View>
              <View style={style.passwordLayer}>
                <Text style={{ marginBottom: 10 }}>
                  {t('wallet.setting.password')}
                </Text>
                <MedicleInput
                  placeholder={t('wallet.setting.password')}
                  onChangeText={(text: string) => {
                    handlePasswordOnChageText(text);
                  }}
                  errText={passwordErrMessage && passwordErrMessage}
                  password={true}
                />
              </View>
            </View>
            <MedicleButton
              text={'내 정보 확인'}
              buttonStyle={style.deleteButton}
              disabled={!passwordVaild}
              onPress={handleProfileEdit}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
