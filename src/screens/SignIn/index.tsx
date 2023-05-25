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
import { ResponseDTO } from '@/interfaces/api';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import eventEmitter from '@/utils/eventEmitter';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
import { setStorage } from '@/utils/localStorage';

const SignIn = ({ navigation }: any) => {
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

  /**
   * 입력 인풋별 값 변경 이벤트 리스너
   * @param param0
   */
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

  /**
   * 인풋 에러메세지 삭제
   * @param name
   */
  const errorClear = (name: string) => {
    setError({
      ...error,
      [name]: undefined,
    });
  };

  /**
   * 인풋 에러메세지 설정
   * @param name
   */
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

  /**
   * 로그인 통신 전 인풋 정규식등 검사
   * @returns
   */
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

    handleSignIn();
  };

  /**
   * 로그인 통신요청
   */
  const handleSignIn = async () => {
    try {
      const response = await api.signIn({
        user_id: signInData.user_id,
        password: signInData.password,
      });

      if (response.result) {
        if (!response.data?.access_token || !response.data?.user) {
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
    </SafeAreaView>
  );
};

export default SignIn;
