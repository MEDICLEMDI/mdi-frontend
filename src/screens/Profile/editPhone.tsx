import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import apis from '@/components/Api';
import Api from '@/components/Api';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import ResultModal from '@/components/ResultModal';
import { ErrorCode } from '@/constants/error';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { ResponseDTO } from '@/interfaces/api';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export interface User {
  name?: string;
  email?: string;
  phone?: string;
}

const EditPhone = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [result, setResult] = React.useState(false); // 결과페이지 랜더링용 bool
  const [smsCheckDisabled, setSmsCheckDisabled] = React.useState(false); // sms 인증코드 확인하기 버튼 잠금,해제
  const [buttonDisabled, setButtonDisabled] = React.useState(false); // 변경하기 버튼 잠금,해제
  const [smsAuthDisabled, setSmsAuthDisabled] = React.useState(false); // 인증문자 받기 버튼 잠금,해제
  const [smsCode, setSmsCode] = React.useState<string | undefined>(undefined); // 인증코드 인풋
  const smsIntervalRef = React.useRef<NodeJS.Timeout | undefined>(); // 5분 시간설정 ref
  const [smsStatus, setSmsStatus] = React.useState<
    'before' | 'progress' | 'timeout' | 'completed'
  >('before');
  const [smsInitialTime, setSmsInitialTime] = React.useState<
    number | undefined
  >(undefined); // 인증시간 
  const smsMinutes = Math.floor(smsInitialTime! / 60)
    .toString()
    .padStart(1, '0'); // 인증시간 분단위 랜더링
  const smsSeconds = (smsInitialTime! % 60).toString().padStart(2, '0'); // 인증시간 초단위 랜더링
  const [smsAuthText, setSmsAuthText] = React.useState<string>(
    t('signUp.phoneRequestSms')
  ); // 진행상태에 따라 인증문자받기, 인증하기, 인증완료 버튼 글자변경
  const [originPhone, setOriginPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [smsError, setSmsError] = React.useState('');
  const smsRef = React.useRef<TextInput>(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // 유저데이터 가져오기
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@User');
        if (userData) {
          let _user = JSON.parse(userData);
          setUser({
            ...user,
            phone: undefined,
            name: _user.name,
            email: _user.email,
          });
          setOriginPhone(_user.phone);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    phoneVaild();
  }, [user]);

  const USER_NAME_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 16,
    weight: 'bold',
  });
  const USER_EMAIL_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

  // sms 인증시간용도 (1초 지날때마다 재랜더링)
  React.useEffect(() => {
    smsIntervalRef.current = setInterval(() => {
      setSmsInitialTime(smsInitialTime! - 1);
    }, 1000);

    if (smsInitialTime === 0) {
      clearInterval(smsIntervalRef.current);
      handleSmsTiomeOut();
    }

    return () => clearInterval(smsIntervalRef.current!);
  }, [smsInitialTime]);

  // 인증상태에 따라 인증문자받기 버튼 텍스트변경
  React.useEffect(() => {
    if (smsStatus === 'completed') {
      setSmsAuthText(t('signUp.phoneAuthCompleted'));
    } else if (smsStatus !== 'before') {
      setSmsAuthText(t('signUp.phoneRequestSmsAgain'));
    } else {
      setSmsAuthText('인증문자받기');
    }

    setButtonDisabled(smsStatus === 'completed');
  }, [smsStatus]);

  /**
   * 인증시간 만료 될경우 초기화
   */
  const handleSmsTiomeOut = () => {
    setSmsError('*인증시간이 만료되었습니다, 다시 요청해주세요.');
    setSmsStatus('timeout');
    setSmsCode(undefined);
    setSmsCheckDisabled(false);
    clearInterval(smsIntervalRef.current!);
  };

  /**
   * 전화번호 입력 인풋 이벤트 리스너
   * @param text
   */
  const handlePhoneChage = (text: string) => {
    setUser({
      ...user,
      phone: text,
    });
  };

  /**
   * 전화번호 규칙 검사
   */
  const phoneVaild = () => {
    setSmsAuthDisabled(false);
    setPhoneError('');
    if (user !== undefined && user.phone) {
      const _phone = user!.phone;
      const regex1 = /^[0-9]+$/;
      if (_phone === originPhone) {
        setPhoneError('기존 전화번호와 동일합니다.');
      } else if (!regex1.test(_phone!)) {
        setPhoneError('전화번호 양식을 확인해주세요.');
      } else if (_phone.length > 2 && !_phone.startsWith('010')) {
        setPhoneError('전화번호 양식을 확인해주세요.');
      } else if (_phone.length === 11) {
        setSmsAuthDisabled(true);
      }
    }
  };

  /**
   * 인증문자 요청하기
   */
  const handleRequestSms = async () => {
    clearInterval(smsIntervalRef.current!);
    let _success = false;
    let _errorMessage = ErrorCode[101];

    setSmsError('');
    setPhoneError('');

    try {
      const request = {
        phone: user!.phone,
        type: 'update',
      };
      const response = await Api.getPhoneAuthCode(request);

      if (response.result) {
        setSmsInitialTime(300);
        setSmsStatus('progress');
        _success = true;
        smsRef.current?.focus();
      } else {
        setSmsStatus('before');
        if (response.error_code && response.error_code === 104) {
          _errorMessage = ErrorCode[response.error_code];
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      console.error(e);
    }

    if (!_success) {
      clearInterval(smsIntervalRef.current!);
      setPhoneError(_errorMessage);
    }
  };

  /**
   * 인증번호 6자리 규칙 검사 (인증하기 버튼 활성,비활성)
   * @param text 
   */
  const handleSmsValid = (text: string) => {
    setSmsError('');
    setSmsCode(text);
    let _regex = /^[0-9]*$/;
    setSmsCheckDisabled(_regex.test(text) && text.length === 6);

    if (!_regex.test(text)) {
      setSmsError('*인증번호 양식이 올바르지 않습니다.');
    }
  };

  /**
   * 인증번호 유효한지 확인하기
   */
  const handleSmsCheck = async () => {
    let _success = false;
    let _errorMessage = ErrorCode[101];

    try {
      const request = {
        phone: user!.phone,
        auth_code: smsCode,
        type: 'update',
      };
      const response = await Api.checkPhoneAuthCode(request);
      if (response.result) {
        clearInterval(smsIntervalRef.current!);
        setSmsStatus('completed');
        _success = true;
      } else {
        if (response.error_code) {
          _errorMessage = ErrorCode[response.error_code];
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      console.error(e);
    }

    if (!_success) {
      setSmsError(_errorMessage);
    }
  };

  /**
   * 모든 인증절차를 완료하고 전화번호 변경하기
   */
  const handleEditPhone = async () => {
    try {
      const data = await apis.editPhone(user!.phone!, smsCode!);

      if (data.result) {
        await AsyncStorage.setItem('@User', JSON.stringify(data.data.user));
        setResult(true);
      } else {
        throw 'error';
      }
    } catch (err) {
      console.error(err);
      setError('*처리중 오류가 발생하였습니다.');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('header.editProfile')} />
      <ScrollView horizontal={false}>
        <View style={[style.contentWrap, style.profileHeader]}>
          <Icon name="userCircle" />
          <View style={{ marginLeft: 15 }}>
            <Text style={USER_NAME_FONT}>{user?.name}</Text>
            <Text style={USER_EMAIL_FONT}>{user?.email}</Text>
          </View>
        </View>
        <View style={style.contentWrap}>
          {/* Input Wrap */}
          <View style={style.inputGroup}>
            <Text style={style.title}>전화번호 변경</Text>
            <View style={style.changeLayer}>
              <MedicleInput
                value={user?.phone}
                onChangeText={text => handlePhoneChage(text)}
                placeholder={t('signUp.phone')}
                direction="row"
                maxLength={11}
                errText={phoneError !== '' ? phoneError : undefined}
                editable={smsStatus !== 'completed'}
                clearButton={smsStatus !== 'completed'}
                inputButtonNode={
                  <MedicleButton
                    buttonStyle={style.smsAuthButton}
                    text={smsAuthText}
                    disabled={
                      smsStatus === 'completed' ? true : !smsAuthDisabled
                    }
                    onPress={handleRequestSms}
                  />
                }
              />
              {(smsStatus === 'progress' || smsStatus === 'timeout') && (
                <>
                  <MedicleInput
                    style={style.mt10}
                    value={smsCode}
                    onChangeText={text => handleSmsValid(text)}
                    placeholder={t('signUp.phoneAuthNumInput')}
                    direction="row"
                    maxLength={6}
                    editable={smsStatus === 'timeout' ? false : true}
                    ref={smsRef}
                    errText={smsError !== '' ? smsError : undefined}
                    rightInputNode={
                      <View>
                        <Text
                          style={[
                            style.timer,
                            smsInitialTime === 0 && {
                              color: Colors.Medicle.Font.Red,
                            },
                          ]}>{`${smsMinutes}:${smsSeconds}`}</Text>
                      </View>
                    }
                    inputButtonNode={
                      <MedicleButton
                        buttonStyle={style.smsAuthButton}
                        text={t('signUp.phoneAuthNumCheck')}
                        disabled={!smsCheckDisabled}
                        onPress={() => {
                          handleSmsCheck();
                        }}
                      />
                    }
                  />
                </>
              )}
            </View>
            <MedicleButton
              text="변경하기"
              buttonStyle={style.changeButton}
              disabled={!buttonDisabled}
              onPress={handleEditPhone}
            />
            {error && <Text style={style.resultErrorMessage}>{error}</Text>}
          </View>
        </View>

        <ResultModal
          visible={result}
          buttonText="확인"
          resultText="변경이 완료되었습니다."
          onPress={() => {
            setResult(false);
            navigation.navigate(Routes.EDIT_PROFILE);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPhone;
