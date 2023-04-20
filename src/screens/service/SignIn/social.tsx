import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import * as React from 'react';
import {
  GestureResponderEvent,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';

import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';

import style from './style';

const SocialLoginButton = ({
  label,
  color,
  icon,
  textColor = Colors.Medicle.Font.Gray.Dark,
  onPress,
}: {
  label: string;
  color: string;
  icon: string;
  textColor?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  return (
    <TouchableOpacity
      style={[style.socialLoginButton, { backgroundColor: color }]}
      onPress={onPress}>
      <Row align="center" justify="space-between">
        <View style={style.socialLoginButtonIcon}>
          <Icon name={icon} />
        </View>
        <Text style={[style.socialLoginButtonLabel, { color: textColor }]}>
          ,{label}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

const Social = ({ navigation }) => {
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_KEY,
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKakaoSignIn = async () => {
    const token = await login()
      .then(res => console.log(res))
      .catch(err => console.error(err));
    const profile = await getKakaoProfile();
    console.log(token);
    console.log(profile);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <View style={style.content}>
        <SocialLoginButton
          label="카카오톡 계정으로 회원가입"
          color="#FEE500"
          icon="kakao"
          onPress={handleKakaoSignIn}
        />
        <SocialLoginButton
          label="네이버 계정으로 회원가입"
          color="#03CF5D"
          textColor="#FFFFFF"
          icon="naver"
        />
        <SocialLoginButton
          label="Google 계정으로 회원가입"
          color="#E8E8E8"
          icon="google"
          onPress={handleGoogleSignIn}
        />
        <SocialLoginButton
          label="이메일 계정으로 시작하기"
          color="#5F5F5F"
          textColor="#FFFFFF"
          icon="email"
          onPress={() => navigation.navigate(Routes.SIGNIN)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Social;
