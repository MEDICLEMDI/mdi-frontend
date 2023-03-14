import * as React from 'react';
import {View, SafeAreaView, ScrollView, Text, TouchableOpacity, GestureResponderEvent} from "react-native";
import Header from "@/components/Header";

import style from "./style";
import Icon from "@/icons";
import {Row} from "@/layout";
import Routes from "@/navigation/Routes";
import {MedicleInput} from "@/components/inputs";
import MedicleButton from "@/buttons/MedicleButton";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";
import {useTranslation} from "react-i18next";

const SignIn = ({
  navigation
}) => {
  const { t } = useTranslation();
  const HEADER_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Brown.Dark,
  });

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <View style={style.content}>

        <Text style={[HEADER_FONT, {marginBottom: 25}]}>로그인</Text>
        <View style={style.signInWrap}>
          <MedicleInput textInputStyle={style.input} placeholder='이메일을 입력해주세요.'/>
          <MedicleInput textInputStyle={style.input} placeholder='비밀번호를 입력해주세요.'/>
        </View>
        <MedicleButton text='로그인' buttonStyle={style.signInButton}/>
        <Row align='center' justify='center' style={{ marginVertical: 20 }}>
          <TouchableOpacity>
            <Text>아이디 / 비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text> | </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.SIGNUP)}>
            <Text>회원가입</Text>
          </TouchableOpacity>
        </Row>
      </View>
    </SafeAreaView>
  )
}

export default SignIn;
