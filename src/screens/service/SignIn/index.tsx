import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { Colors } from '@/constants/theme';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

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

    try {
      const data = await api.signIn({
        user_id: signInData.user_id,
        password: signInData.password,
      });

      if (!data.access_token || !data.user) {
        throw 'response error';
      }
      await AsyncStorage.setItem('@Key', data.access_token);
      await AsyncStorage.setItem('@User', JSON.stringify(data.user));

      navigation.navigate(Routes.DASHBOARD);
    } catch (err) {
      setError({
        ...error,
        login:
          err === '유저 아이디와 비밀번호를 확인해 주세요'
            ? err
            : '처리중 오류가 발생하였습니다.',
      });
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
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
