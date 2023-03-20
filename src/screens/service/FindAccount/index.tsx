import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';

import { FormError, Data } from '../SignUp';
import style from './style';

const FindAccount = ({ navigation }) => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = React.useState(0);
  const data = [{ title: '아이디 찾기' }, { title: '비밀번호 찾기' }];
  const tabChangeListener = (index: number) => {
    setTabIndex(index);
  };
  const [userData, setUserData] = React.useState<UserData>({
    reg_type: 'normal',
    password: undefined,
    name: undefined,
    registrationNumber1: undefined,
    registrationNumber2: undefined,
    phone: undefined,
    email: undefined,
    address1: undefined,
    address2: undefined,
    address3: undefined,
    post_code: undefined,
    referral_code: undefined,
    is_marketing_agree: '0',
  });
  const [error, setError] = React.useState<FormError>({
    name: undefined,
    phone: undefined,
    password: undefined,
    confirmPassword: undefined,
    email: undefined,
    sms: undefined,
  });
  const regex: { [key: string]: RegExp } = {
    name: /^[가-힣]{2,10}$/,
    phone: /^010[0-9]*$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    password:
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+\-=\[\]\{\}\|\:\;\"\'\<\>\,\.\?\/]).{8,20}$/,
    sms: /^[0-9]*$/,
  };
  const [smsStatus, setSmsStatus] = React.useState<
    'before' | 'progress' | 'timeout' | 'completed'
  >('before');
  const [sms, setSms] = React.useState<string | undefined>(undefined);
  const [smsAuthDisabled, setSmsAuthDisabled] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = React.useState<
    string | undefined
  >(undefined);
  const [smsAuthText, setSmsAuthText] = React.useState<string>(
    t('signUp.phoneRequestSms')
  );
  const [initialTime, setInitialTime] = React.useState<number | undefined>(
    undefined
  );
  const [smsCheckDisabled, setSmsCheckDisabled] =
    React.useState<boolean>(false);
  const minutes = Math.floor(initialTime / 60)
    .toString()
    .padStart(1, '0');
  const seconds = (initialTime! % 60).toString().padStart(2, '0');

  const onChange = (value: string, name: string) => {
    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === 'phone') {
      setSmsAuthDisabled(regex.phone.test(value) && value.length === 11);
      handlePhoneVaild(value);
      return;
    }

    if (name === 'password') {
      handlePasswordVaild(value);
      return;
    }

    if (name === 'address3') {
      return;
    }

    handleBlur(value, name);
  };

  const handleBlur = (value: string, name: string) => {
    if (value === '' || value === undefined) {
      errorClear(name);
      return;
    }

    let _regex = regex[name];

    if (_regex.test(value!)) {
      errorClear(name);
    } else {
      errorSet(name);
    }
  };

  const handlePhoneVaild = (value: string) => {
    errorClear('phone');
    if (
      value !== '' &&
      value !== '0' &&
      value !== '01' &&
      !regex.phone.test(value)
    ) {
      errorSet('phone');
    }
  };

  const handlePasswordVaild = (value: string) => {
    errorClear('password');
    if (value !== '' && !regex.password.test(value)) {
      errorSet('password', 'passwordValid');
    }
  };

  const handleConfirmPasswordVaild = (_text: string) => {
    errorClear('confirmPassword');
    setConfirmPassword(_text);
    if (
      _text === '' ||
      _text === undefined ||
      userData.password === '' ||
      userData.password === undefined
    ) {
      return;
    }
    if (_text !== signUpData.password) {
      errorSet('confirmPassword', 'passwordShort');
    }
  };

  const errorSet = (_type: string, _error?: string) => {
    let _errorMessage;
    if (_error) {
      _errorMessage = _error;
    } else {
      _errorMessage = _type;
    }

    setError({
      ...error,
      [_type]: t(`errorMessage.${_errorMessage}Error`),
    });
  };

  const errorClear = (_type: string) => {
    setError({
      ...error,
      [_type]: undefined,
    });
  };
  const handleSmsCheck = (text: string) => {
    if (text === '111111') {
      clearInterval(intervalRef.current!);
      setSmsStatus('completed');
    } else {
      setError({
        ...error,
        ['sms']: t('errorMessage.smsCheckError'),
      });
    }
  };

  const handleSmsTiomeOut = () => {
    errorSet('sms', 'smsTimeout');
    setSmsStatus('timeout');
    setSms(undefined);
    setSmsCheckDisabled(false);
  };
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <ScrollView style={style.content}>
        <View style={style.documentTabWrap}>
          {data.map(({ title }, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => tabChangeListener(key)}
              style={[
                style.documentTabButton,
                data.length === key + 1
                  ? style.borderRadiusRight
                  : style.borderRadiusLeft,
                tabIndex === key ? style.tabActive : null,
              ]}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                  },
                  tabIndex === key
                    ? fontStyleCreator({
                        size: 12,
                        color: Colors.Medicle.Font.Gray.Dark,
                        weight: 'bold',
                      })
                    : fontStyleCreator({
                        size: 12,
                        color: Colors.Medicle.Font.Gray.Standard,
                      }),
                ]}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={style.inputLayer}>
          <MedicleInput
            value={userData?.email}
            onChangeText={text => onChange(text, 'email')}
            placeholder={t('signUp.email')}
            // onBlur={() => handleBlur('email')}
            errText={error.email !== undefined ? error.email : undefined}
          />
          <Text style={style.labelText}>{t('signUp.nameLabel')}</Text>
          <MedicleInput
            placeholder={t('signUp.name')}
            value={userData?.name}
            onChangeText={text => onChange(text, 'name')}
            // onBlur={() => handleBlur('name')}
            errText={error.name !== undefined ? error.name : undefined}
          />
          <Text style={style.labelText}>{t('signUp.phoneLabel')}</Text>
          <MedicleInput
            value={userData?.phone}
            onChangeText={text => onChange(text, 'phone')}
            placeholder={t('signUp.phone')}
            direction="row"
            maxLength={11}
            errText={error.phone !== undefined ? error.phone : undefined}
            editable={smsStatus !== 'completed'}
            clearButton={smsStatus !== 'completed'}
            inputButtonNode={
              <MedicleButton
                buttonStyle={style.button}
                text={smsAuthText}
                disabled={smsStatus === 'completed' ? true : !smsAuthDisabled}
                onPress={handleRequestSms}
              />
            }
          />
          {(smsStatus === 'progress' || smsStatus === 'timeout') && (
            <>
              <MedicleInput
                style={style.mt10}
                value={sms}
                onChangeText={text => handleSmsValid(text)}
                placeholder={t('signUp.phoneAuthNumInput')}
                direction="row"
                maxLength={6}
                editable={smsStatus === 'timeout' ? false : true}
                errText={error.sms !== undefined ? error.sms : undefined}
                rightInputNode={
                  <View>
                    <Text
                      style={[
                        style.timer,
                        initialTime === 0 && { color: Colors.Medicle.Font.Red },
                      ]}>{`${minutes}:${seconds}`}</Text>
                  </View>
                }
                inputButtonNode={
                  <MedicleButton
                    buttonStyle={style.button}
                    text={t('signUp.phoneAuthNumCheck')}
                    disabled={!smsCheckDisabled}
                    onPress={() => {
                      handleSmsCheck(sms!);
                    }}
                  />
                }
              />
            </>
          )}
        </View>
      </ScrollView>
      <MedicleButton
        // disabled={true}
        text={t('findAccount.next')}
        buttonStyle={style.signUpButton}
      />
    </SafeAreaView>
  );
};

export default FindAccount;
