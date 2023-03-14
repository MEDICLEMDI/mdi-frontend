import * as React from 'react';
import {View, SafeAreaView, ScrollView, Text, TouchableOpacity, GestureResponderEvent} from "react-native";
import Header from "@/components/Header";

import style from "./style";
import {Colors} from "@/constants/theme";
import Icon from "@/icons";
import {Row} from "@/layout";
import Routes from "@/navigation/Routes";


const SocialLoginButton = ({
  label,
  color,
  icon,
  textColor = Colors.Medicle.Font.Gray.Dark,
  onPress,
}:{
  label: string;
  color: string;
  icon: string;
  textColor?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}) => {
  return (
    <TouchableOpacity style={[
        style.socialLoginButton,
        { backgroundColor: color }
      ]}
      onPress={onPress}
    >
      <Row align='center' justify='space-between'>
        <View style={style.socialLoginButtonIcon}>
          <Icon name={icon}/>
        </View>
        <Text style={[
          style.socialLoginButtonLabel,
          { color: textColor }
        ]}>{label}</Text>
      </Row>
    </TouchableOpacity>
  )
}

const Social = ({
  navigation
}) => {
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <View style={style.content}>
        <SocialLoginButton label='카카오톡 계정으로 회원가입' color='#FEE500' icon='kakao'/>
        <SocialLoginButton label='네이버 계정으로 회원가입' color='#03CF5D' textColor='#FFFFFF' icon='naver'/>
        <SocialLoginButton label='Google 계정으로 회원가입' color='#E8E8E8' icon='google'/>
        <SocialLoginButton label='이메일 계정으로 시작하기' color='#5F5F5F'  textColor='#FFFFFF' icon='email' onPress={() => navigation.navigate(Routes.SIGNIN)}/>
      </View>
    </SafeAreaView>
  )
}

export default Social;
