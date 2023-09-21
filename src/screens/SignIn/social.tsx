import * as React from 'react';
import {
  BackHandler,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
import Header from '@/components/Header';
import Routes from '@/navigation/Routes';
import style from './style';
import { handleGoogle, handleKakao, handleNaver } from '@/utils/social';
import { SocialLoginButton } from '@/components/buttons/SocialLoginButton';
import useCustomToast from '@/hooks/useToast';
import LoadingModal from '@/components/LoadingModal';
import { Platform } from 'react-native';

import MDILogo from '@/assets/icons/medicle-logo-full.png';

const Social = ({ navigation }) => {
  const { showToast } = useCustomToast();
  const [exitApp, setExitApp] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // 안드로이드 디바이스 백버튼 핸들러
    if (Platform.OS === 'android') {
      const backAction = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else if (exitApp === false) {
          showToast('한번 더 누르면 앱이 종료됩니다.');
          setExitApp(true);
          setTimeout(() => {
            setExitApp(false);
          }, 2000); //2초
        } else {
          BackHandler.exitApp();
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [exitApp, navigation]);

  /**
   * 소셜로그인 실행
   * @param type 
   */
  const handleSocial = async (type: string) => {
    if (Platform.OS !== 'ios' && type !== 'naver') {
      setVisible(true);
    }
    try {
      if (type === 'kakao') {
        await handleKakao(navigation);
      } else if (type === 'naver') {
        await handleNaver(navigation);
      } else {
        await handleGoogle(navigation);
      }
    } catch (error) { 
      showToast('처리중 오류가 발생하였습니다.');
    } finally {
      setVisible(false);
    }
  }
  
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <Image
          source={MDILogo}
          resizeMode="contain"
          style={style.MdiLogoImage}
      />

      {Platform.OS !== 'ios' && (
        <View style={style.content}>
        <SocialLoginButton
          label="카카오톡 계정으로 시작"
          color="#FEE500"
          icon="kakao"
          onPress={() => handleSocial('kakao')}
        />
        <SocialLoginButton
          label="네이버 계정으로 시작"
          color="#03CF5D"
          textColor="#FFFFFF"
          icon="naver"
          onPress={() => handleSocial('naver')}
        />
        <SocialLoginButton
          label="Google 계정으로 시작"
          color="#E8E8E8"
          icon="google"
          onPress={() => handleSocial('google')}
        />
        <SocialLoginButton
          label="이메일 계정으로 시작하기"
          color="#5F5F5F"
          textColor="#FFFFFF"
          icon="email"
          onPress={() => navigation.navigate(Routes.SIGNIN)}
        />
        </View>
      )}

      {Platform.OS === 'ios' && (
        <View style={style.content}>
        <SocialLoginButton
          label="이메일 계정으로 시작하기"
          color="#5F5F5F"
          textColor="#FFFFFF"
          icon="email"
          onPress={() => navigation.navigate(Routes.SIGNIN)}
        />
        </View>
      )}
      
      <LoadingModal visible={visible}/>
    </SafeAreaView>
  );
};

export default Social;
