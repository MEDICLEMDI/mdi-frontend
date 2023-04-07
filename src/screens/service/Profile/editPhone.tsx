import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import apis from '@/components/Api';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import ResultModal from '@/components/ResultModal';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import API from '@/utils/api';
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
  const [result, setResult] = React.useState(false);
  const [smsCheckDisabled, setSmsCheckDisabled] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [smsAuthDisabled, setSmsAuthDisabled] = React.useState(false);
  const [smsCode, setSmsCode] = React.useState<string | undefined>(undefined);
  const smsIntervalRef = React.useRef<NodeJS.Timeout | undefined>();
  const [smsStatus, setSmsStatus] = React.useState<
    'before' | 'progress' | 'timeout' | 'completed'
  >('before');
  const [smsInitialTime, setSmsInitialTime] = React.useState<
    number | undefined
  >(undefined);
  const smsMinutes = Math.floor(smsInitialTime! / 60)
    .toString()
    .padStart(1, '0');
  const smsSeconds = (smsInitialTime! % 60).toString().padStart(2, '0');
  const [smsAuthText, setSmsAuthText] = React.useState<string>(
    t('signUp.phoneRequestSms')
  );
  const [originPhone, setOriginPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [smsError, setSmsError] = React.useState('');
  const smsRef = React.useRef<TextInput>(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
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
        console.log(e);
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

  const handleSmsTiomeOut = () => {
    setSmsError('*인증시간이 만료되었습니다, 다시 요청해주세요.');
    setSmsStatus('timeout');
    setSmsCode(undefined);
    setSmsCheckDisabled(false);
    clearInterval(smsIntervalRef.current!);
  };

  const handlePhoneChage = (text: string) => {
    setUser({
      ...user,
      phone: text,
    });
  };
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

  const handleRequestSms = async () => {
    clearInterval(smsIntervalRef.current!);
    let _success = false;
    let _errorMessage = '';

    setSmsError('');

    try {
      const api = new API();
      const data = {
        phone: user!.phone,
        type: 'update',
      };
      await api
        .post('/phoneauth/reqcode', data)
        .then(res => {
          console.log(res);
          if (res.result) {
            setSmsInitialTime(300);
            setSmsStatus('progress');
            _success = true;
            smsRef.current?.focus();
          } else {
            setSmsStatus('before');
            if (res.message === 'phone auth limit over.') {
              _errorMessage = '*일일 요청 횟수를 초과하였습니다.';
            } else if (res.message === 'phone number already used') {
              _errorMessage = '*이미 사용중인 전화번호 입니다.';
            }
          }
        })
        .catch(err => console.log(err));
    } catch (e: any) {
      console.log(e);
    }

    if (!_success) {
      clearInterval(smsIntervalRef.current!);
      if (_errorMessage === '') {
        setPhoneError('*처리중 오류가 발생하였습니다.');
      } else {
        setPhoneError(_errorMessage);
      }
    }
  };

  const handleSmsValid = (text: string) => {
    setSmsError('');
    setSmsCode(text);
    let _regex = /^[0-9]*$/;
    setSmsCheckDisabled(_regex.test(text) && text.length === 6);

    if (!_regex.test(text)) {
      setSmsError('*인증번호 양식이 올바르지 않습니다.');
    }
  };

  const handleSmsCheck = async () => {
    let _success = false;
    let _errorMessage = '';

    try {
      const api = new API();
      const data = {
        phone: user!.phone,
        auth_code: smsCode,
        type: 'update',
      };
      await api
        .post('/phoneauth/checkcode', data)
        .then(res => {
          console.log(res);
          if (res.result) {
            clearInterval(smsIntervalRef.current!);
            setSmsStatus('completed');
            _success = true;
          } else {
            if (res.message === 'expire time over.') {
              _errorMessage = '*인증시간이 만료되었습니다, 다시 요청해주세요.';
            } else if (
              res.message === 'phone auth fail' ||
              res.message === 'no phone auth data.'
            ) {
              _errorMessage = '*인증정보가 일치하지 않습니다.';
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (e: any) {
      console.log(e);
    }

    if (!_success) {
      if (_errorMessage === '') {
        setSmsError('*처리중 오류가 발생하였습니다.');
      } else {
        setSmsError(_errorMessage);
      }
    }
  };

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
