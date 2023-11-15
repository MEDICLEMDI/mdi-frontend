import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import api from '@/components/Api';
import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { Row } from '@/components/layout';
import ResultPage from '@/components/ResultPage';
import Spacing from '@/components/Spacing';
import { ErrorCode } from '@/constants/error';
import { Colors } from '@/constants/theme';
import { ResponseDTO } from '@/interfaces/api';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export interface UserData {
  name?: string;
  // registrationNumber1?: string;
  // registrationNumber2?: string;
  phone?: string;
  email?: string;
}

export interface FormError {
  name?: string;
  // registrationNumber1?: string;
  // registrationNumber2?: string;
  phone?: string;
  email?: string;
}

const FindAccount = ({ navigation }: any) => {
  const { t } = useTranslation();
  const data = [{ title: '아이디 찾기' }, { title: '비밀번호 찾기' }];

  const [userData, setUserData] = React.useState<UserData>({
    name: undefined,
    email: undefined,
    phone: undefined,
    // registrationNumber1: undefined,
    // registrationNumber2: undefined,
  });
  const [error, setError] = React.useState<FormError>({
    name: undefined,
    // registrationNumber1: undefined,
    // registrationNumber2: undefined,
    phone: undefined,
    email: undefined,
  });
  const regex: { [key: string]: RegExp } = {
    name: /^[가-힣]{2,10}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    phone: /^010[0-9]*$/,
    // registrationNumber1:
    //   /^(0[1-9]|[1-9][0-9])((0[1-9])|(1[0-2]))(([012][0-9])|(3[0-1]))$/,
    // registrationNumber2: /^[1-4]\d{6}$/,
  };
  const [tabIndex, setTabIndex] = React.useState(0); // 아이디찾기, 비밀번호 찾기 탭
  const [result, setResult] = React.useState(false); // 결과여부 (결과페이지 보여주기 용도)
  const [userId, setUserId] = React.useState<string | undefined>(undefined);
  const nameRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const [responseError, setResponseError] = React.useState('');
  const [nextDisabled, setNextDisabled] = React.useState(false); // 다음 버튼 잠금/해제

  React.useEffect(() => {
    if (tabIndex === 0) {
      if (
        userData.name &&
        // userData.registrationNumber1 &&
        // userData.registrationNumber2 &&
        userData.phone &&
        error.name === undefined &&
        // error.registrationNumber1 === undefined &&
        // error.registrationNumber2 === undefined
        error.phone === undefined
      ) {
        setNextDisabled(true);
      }
    } else if (tabIndex === 1) {
      if (
        userData.name &&
        // userData.registrationNumber1 &&
        // userData.registrationNumber2 &&
        userData.phone &&
        userData.email &&
        error.name === undefined &&
        // error.registrationNumber1 === undefined &&
        // error.registrationNumber2 === undefined &&
        error.phone === undefined &&
        error.email === undefined
      ) {
        setNextDisabled(true);
      }
    }
  }, [userData]);

  /**
   * 아이디찾기, 비밀번호찾기 탭 변경
   * @param index
   */
  const tabChangeListener = (index: number) => {
    setTabIndex(index);
    clearDataAndError();
  };

  /**
   * 인풋 입력에 처리 (valid 등)
   * @param value 
   * @param name 
   */
  const onChange = (value: string, name: string) => {
    setNextDisabled(false);
    setResponseError('');
    setUserData({
      ...userData,
      [name]: value,
    });

    handleBlur(value, name);
  };

  /**
   * regex 검사
   * @param value 
   * @param name 
   * @returns 
   */
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

  /**
   * 에러메세지 설정
   * @param _type 
   * @param _error 
   */
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

  /**
   * 에러메세지 삭제
   * @param _type 
   */
  const errorClear = (_type: string) => {
    setError({
      ...error,
      [_type]: undefined,
    });
  };

  /**
   * 아이디 찾기
   */
  const handleRequestUserId = async () => {
    try {
      const request = {
        name: userData.name,
        // registration_number: `${userData.registrationNumber1}${userData.registrationNumber2}`,
        phone: userData.phone,
      };
      const response = await api.getUserLoginId(request);

      if (response.result) {
        setUserId(response.data);
        setResult(true);
      } else {
        if (response.error_code && response.error_code === 103) {
          nameRef.current?.focus();
          setUserData({
            ...userData,
            name: undefined,
            // registrationNumber1: undefined,
            // registrationNumber2: undefined,
            phone: undefined,
          });
          setResponseError(ErrorCode[response.error_code]);
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      console.error(e);
      setResponseError(ErrorCode[101]);
    }
  };

  /**
   * 비밀번호 찾기
   */
  const handleRequestUserPassword = async () => {
    try {
      const request = {
        name: userData.name,
        // registration_number: `${userData.registrationNumber1}${userData.registrationNumber2}`,
        phone: userData.phone,
        email: userData.email,
      };

      const response = await api.getUserPassword(request);

      if (response.result) {
        setResult(true);
      } else {
        if (response.error_code && response.error_code === 103) {
          emailRef.current?.focus();
          setUserData({
            ...userData,
            name: undefined,
            // registrationNumber1: undefined,
            // registrationNumber2: undefined,
            phone: undefined,
            email: undefined,
          });
          setResponseError(ErrorCode[response.error_code]);
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      console.error(e);
      setResponseError(ErrorCode[101]);
    }
  };

  /**
   * 아이지찾기, 비밀번호찾기 탭 변경시 모든 데이터 클리어
   */
  const clearDataAndError = () => {
    setUserData({
      name: undefined,
      email: undefined,
      // registrationNumber1: undefined,
      // registrationNumber2: undefined,
      phone: undefined,
    });

    setError({
      name: undefined,
      email: undefined,
      // registrationNumber1: undefined,
      // registrationNumber2: undefined,
      phone: undefined,
    });

    setResponseError('');

    setNextDisabled(false);
  };

  if (result) {
    return (
      <ResultPage
        navigation={navigation}
        resultText={
          tabIndex === 0
            ? `${userData.name}${t('findAccount.resultTextId')}`
            : '이메일로 임시 비밀번호를 전송하였습니다.'
        }
        buttonText={t('button.goHome')}
        buttonDisabled={true}
        onPress={() => navigation.navigate(Routes.SIGNIN)}
        children={
          tabIndex === 0 && (
            <MedicleInput
              value={userId}
              editable={false}
              clearButton={false}
              textAlign={'center'}
              style={style.resultId}
            />
          )
        }
      />
    );
  }
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
          {tabIndex === 1 && (
            <>
              <Text style={style.labelText}>{t('signUp.emailLabel')}</Text>
              <MedicleInput
                value={userData?.email}
                onChangeText={text => onChange(text, 'email')}
                placeholder={t('signUp.email')}
                ref={emailRef}
                errText={error.email !== undefined ? error.email : undefined}
              />
            </>
          )}

          <Text style={style.labelText}>{t('signUp.nameLabel')}</Text>
          <MedicleInput
            placeholder={t('signUp.name')}
            value={userData?.name}
            ref={nameRef}
            onChangeText={text => onChange(text, 'name')}
            errText={error.name !== undefined ? error.name : undefined}
          />
          <Text style={style.labelText}>
            {t('signUp.phoneLabel')}
          </Text>
          <Row justify="space-between">
            <MedicleInput
              style={{ flex: 1 }}
              value={userData?.phone}
              onChangeText={text => onChange(text, 'phone')}
              errText={
                error.phone !== undefined
                  ? error.phone
                  : undefined
              }
              maxLength={11}
              placeholder={t('signUp.phoneLabel')}
            />
            <Spacing size={10} />
            {/* <MedicleInput
              style={{ flex: 1 }}
              value={userData?.registrationNumber1}
              onChangeText={text => onChange(text, 'registrationNumber1')}

              errText={
                error.registrationNumber1 !== undefined
                  ? error.registrationNumber1
                  : undefined
              }
              maxLength={6}
              placeholder={t('signUp.registrationNumber')}
            />
            <Spacing size={10} />
            <MedicleInput
              style={{ flex: 1 }}
              value={userData?.registrationNumber2}
              maxLength={7}
              password={true}
              onChangeText={text => onChange(text, 'registrationNumber2')}
              errText={
                error.registrationNumber2 !== undefined
                  ? error.registrationNumber2
                  : undefined
              }
            /> */}
          </Row>
          {responseError !== '' && (
            <Text style={style.errorText}>{responseError}</Text>
          )}
        </View>
      </ScrollView>
      <MedicleButton
        disabled={!nextDisabled}
        text={t('findAccount.next')}
        buttonStyle={style.signUpButton}
        onPress={() => {
          if (tabIndex === 0) {
            handleRequestUserId();
          } else if (tabIndex === 1) {
            handleRequestUserPassword();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default FindAccount;
