import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Close from '@/assets/images/close.png';
import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { ErrorCode } from '@/constants/error';
import { Colors } from '@/constants/theme';
import { responseDTO } from '@/interfaces/api';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import eventEmitter from '@/utils/eventEmitter';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
import { setStorage } from '@/utils/localStorage';

const SignIn = ({ navigation }) => {
  const { t } = useTranslation();
  const HEADER_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Brown.Dark,
  });
  const isFocus = useIsFocused();

  React.useEffect(() => {
    if (isFocus) {
      setError({
        user_id: undefined,
        password: undefined,
        login: undefined,
      });
      setSignInData({
        user_id: undefined,
        password: undefined,
      });
      emailInputRef.current?.clear();
      passwordInputRef.current?.clear();
    }
  }, [isFocus]);

  const [signInData, setSignInData] = React.useState<{
    user_id: string | undefined;
    password: string | undefined;
  }>({
    user_id: undefined,
    password: undefined,
  });

  const [error, setError] = React.useState<{
    user_id: string | undefined;
    password: string | undefined;
    login: string | undefined;
  }>({
    user_id: undefined,
    password: undefined,
    login: undefined,
  });

  const emailInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const onChange = ({
    v,
    name,
  }: {
    readonly v: string;
    readonly name: string;
  }) => {
    errorClear(name);
    setSignInData({
      ...signInData,
      [name]: v,
    });
  };

  const errorClear = (name: string) => {
    setError({
      ...error,
      [name]: undefined,
    });
  };

  const errorSet = (name: string) => {
    let _name = 'user_id';
    let _error = '이메일 아이디';

    if (name !== 'user_id') {
      _name = 'password';
      _error = '비밀번호';
    }

    setError({
      ...error,
      [_name]: `${_error}를 확인해주세요.`,
    });
  };

  const signIn = async () => {
    errorClear('login');
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (
      signInData.user_id === undefined ||
      !emailRegex.test(signInData.user_id)
    ) {
      errorSet('user_id');
      emailInputRef.current?.focus();
      return;
    }

    if (signInData.password === undefined || signInData.password?.length < 8) {
      errorSet('password');
      passwordInputRef.current?.focus();
      return;
    }

    const user_id = await AsyncStorage.getItem('@LastLogin');
    const wallet = await AsyncStorage.getItem('@WalletPassword');
    if (user_id && wallet) {
      if (user_id !== `"${signInData.user_id}"`) {
        setModalVisible(true);
      } else {
        handleSignIn();
      }
    } else {
      handleSignIn();
    }
  };

  const handleSignIn = async () => {
    try {
      const response: responseDTO = await api.signIn({
        user_id: signInData.user_id,
        password: signInData.password,
      });


      if (response.result) {
        if (!response.data.access_token || !response.data.user) {
          throw 'response data error';
        }
        await setStorage(response.data);
        eventEmitter.emit('loggedIn');
      } else {
        if (!response.error_code) {
          throw 'response data error';
        }
        setError({
          ...error,
          login: ErrorCode[response.error_code],
        });
      }
    } catch (err) {
      setError({
        ...error,
        login: ErrorCode[101],
      });
    }
  };


  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <View style={style.content}>
        <Text style={[HEADER_FONT, { marginBottom: 25 }]}>로그인</Text>
        <View style={style.signInWrap}>
          <MedicleInput
            textInputStyle={style.input}
            placeholder="이메일을 입력해주세요."
            onChangeText={v => onChange({ v: v, name: 'user_id' })}
            ref={emailInputRef}
            errText={error.user_id && error.user_id}
          />
          <MedicleInput
            textInputStyle={[style.input, style.mt10]}
            placeholder="비밀번호를 입력해주세요."
            password={true}
            onChangeText={v => onChange({ v: v, name: 'password' })}
            ref={passwordInputRef}
            errText={error.password && error.password}
          />
        </View>
        {error.login !== undefined ? (
          <Text style={style.errorText}>{error.login}</Text>
        ) : (
          <Text>&nbsp;</Text>
        )}
        <MedicleButton
          text="로그인"
          buttonStyle={style.signInButton}
          onPress={() => signIn()}
        />
        <Row align="center" justify="center" style={{ marginVertical: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.FINDACCOUNT)}>
            <Text>아이디 / 비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text> | </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.SIGNUP)}>
            <Text>회원가입</Text>
          </TouchableOpacity>
        </Row>
      </View>
      
      
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={style.modal}>
          <View style={style.modalContainer}>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={style.modalHeader}>
                <View style={style.modalHeaderCenter}>
                  <Text style={style.modalTitle}>경고</Text>
                </View>
                <TouchableOpacity
                  style={style.modalHeaderRight}
                  onPress={handleCloseModal}>
                  <Image style={style.modalCloseButton} source={Close} />
                </TouchableOpacity>
              </View>
              <View style={style.modalContent}>
                <Text>
                  기존 로그인했던 계정과 다른 계정 입니다. 로그인을 계속
                  진행할시 기존 계정의 지갑이 사라집니다. 기존 계정의 지갑
                  니모닉넘버를 저장하지 않으셨다면, 기존 지갑을 다시 찾을수
                  없으니 주의 하시길 바랍니다.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
              <MedicleButton
                textStyle={style.modalCancelText}
                buttonStyle={style.modalCancelButton}
                text="취소"
                onPress={handleCloseModal}
              />
              <MedicleButton
                buttonStyle={style.modalCheckButton}
                text="로그인"
                onPress={() => {
                  handleSignIn();
                  handleCloseModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
                
    </SafeAreaView>
    
  );
};

export default SignIn;
