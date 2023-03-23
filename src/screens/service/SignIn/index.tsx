import * as React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '@/components/Header';

import style from './style';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { MedicleInput } from '@/components/inputs';
import MedicleButton from '@/buttons/MedicleButton';
import { fontStyleCreator } from '@/utils/fonts';
import { Colors } from '@/constants/theme';
import { useTranslation } from 'react-i18next';
import API from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
  const { t } = useTranslation();
  const HEADER_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Brown.Dark,
  });

  const [data, setData] = React.useState<{user_id: string | undefined; password: string | undefined;}>({
    user_id: undefined,
    password: undefined,
  });

  const onChange = ({
    v,
    name
  }:{
    readonly v: string;
    readonly name: string;
  }) => {
    setData({
      ...data,
      [name]:v
    });
  }

  const signIn = async () => {
    try {
      const Api = new API;
      const res = await Api.post('/auth', {user_id: data.user_id, password: data.password});

      await AsyncStorage.removeItem('@Key');
      await AsyncStorage.setItem('@Key', res.data[0]);

      navigation.navigate(Routes.DASHBOARD);
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <View style={style.content}>
        <Text style={[HEADER_FONT, { marginBottom: 25 }]}>로그인</Text>
        <View style={style.signInWrap}>
          <MedicleInput

            textInputStyle={style.input}
            placeholder="이메일을 입력해주세요."
            onChangeText={(v) => onChange({v: v, name: 'user_id'})}
          />
          <MedicleInput
            textInputStyle={style.input}
            placeholder="비밀번호를 입력해주세요."
            password={true}
            onChangeText={(v) => onChange({v: v, name: 'password'})}
          />
        </View>
        <MedicleButton text="로그인" buttonStyle={style.signInButton} onPress={() => signIn()}/>
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
