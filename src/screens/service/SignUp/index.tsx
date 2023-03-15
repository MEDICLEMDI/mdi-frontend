import axios from 'axios';
import { sign } from 'crypto';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TextInputChangeEventData,
  TextInputFocusEventData,
  View,
} from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { MedicleInput } from '@/components/inputs';
import Spacing from '@/components/Spacing';
import { Colors } from '@/constants/theme';
import { Row } from '@/layout';
import API from '@/utils/api';

import style from './style';

interface ISignUpData {
  reg_type?: string;
  user_id?: string;
  password?: string;
  name?: string;
  registrationNumber1?: string;
  registrationNumber2?: string;
  phone?: string;
  email?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  post_code?: string;
  referral_code?: string;
  [key: string]: string | undefined;
}

interface FormError {
  name?: string;
  phone?: string;
  password?: string;
  email?: string;
  registrationNumber1?: string;
  registrationNumber2?: string;
  [key: string]: string | undefined;
}

const SignUp = () => {
  const [regiNumber, setRegiNumber] = React.useState<string[]>([]);
  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
    reg_type: 'normal',
    post_code: '123123',
  });
  const [error, setError] = React.useState<FormError>({
    name: undefined,
    phone: undefined,
    password: undefined,
    email: undefined,
    registrationNumber1: undefined,
    registrationNumber2: undefined,
  });
  const [termsOfService, setTermsOfService] = React.useState<boolean>(false);
  const [privacyPolicy, setPrivacyPolicy] = React.useState<boolean>(false);
  const [marketing, setMarketing] = React.useState<boolean>(false);
  const [agreeAll, setAgreeAll] = React.useState<boolean>(false);
  const [registerDisabed, setRegisterDisabed] = React.useState<boolean>(false);
  const { t } = useTranslation();

  const regex: { [key: string]: RegExp } = {
    name: /^[가-힣]{2,10}$/,
    registrationNumber1:
      /^(0[1-9]|[1-9][0-9])((0[1-9])|(1[0-2]))(([012][0-9])|(3[0-1]))$/,
    registrationNumber2: /^[1-4]\d{6}$/,
    phone: /^01([0|1|6|7|8|9])(\d{7}|\d{8})$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    password:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
  };

  React.useEffect(() => {
    setAgreeAll(privacyPolicy && termsOfService && marketing);
  }, [privacyPolicy, termsOfService, marketing]);

  const onChange = (value: string, name: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleBlur = (type: string) => {
    let _word = signUpData[type];
    if (_word === '') {
      errorClear(type);
      return;
    }

    let _regex = regex[type];

    if (_regex.test(_word!)) {
      errorClear(type);
    } else {
      setError({
        ...error,
        [type]: t(`errorMessage.${type}Error`),
      });
    }
  };

  const errorClear = (type: string) => {
    setError({
      ...error,
      [type]: undefined,
    });
  };

  const handleAgreeAll = (status: boolean) => {
    setTermsOfService(!status);
    setPrivacyPolicy(!status);
    setMarketing(!status);
  };

  const register = async () => {
    try {
      const data: ISignUpData = setupSignUpData();
      console.log(data);

      // await API.post('/register', data)
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err))
      //   .finally(() => console.log('end second'));
    } catch (e) {
      console.log(e);
    }
  };

  const setupSignUpData = (): ISignUpData => {
    return {
      // reg_type: signUpData?.reg_type,
      reg_type: 'normal',
      // user_id: signUpData?.user_id,
      user_id: 'asdasd',
      password: signUpData?.password,
      name: signUpData?.name,
      registrationNumber: `${regiNumber[0]}${regiNumber[1]}`,
      phone: signUpData?.phone,
      email: signUpData?.email,
      address1: signUpData?.address1,
      address2: signUpData?.address2,
      address3: signUpData?.address3,
      // post_code: signUpData?.post_code,
      post_code: '123123',
      referral_code: signUpData?.referral_code,
    };
  };

  const registrationNumber = (value: string, index: number) => {
    setRegiNumber({
      ...regiNumber,
      [index]: value,
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <ScrollView style={style.content}>
        <View style={style.userInfo}>
          <Text style={style.labelText}>{t('signUp.nameLabel')}</Text>
          <MedicleInput
            placeholder={t('signUp.name')}
            value={signUpData?.name}
            onChangeText={text => onChange(text, 'name')}
            onBlur={() => handleBlur('name')}
            errText={error.name !== undefined ? error.name : undefined}
          />
          <View>
            <Text style={style.labelText}>
              {t('signUp.registrationNumberLabel')}
            </Text>
            <Row justify="space-between">
              <MedicleInput
                style={{ flex: 1 }}
                value={regiNumber[0]}
                onChangeText={text => onChange(text, 'registrationNumber1')}
                onBlur={() => handleBlur('registrationNumber1')}
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
                value={regiNumber[1]}
                maxLength={7}
                password={true}
                onChangeText={text => onChange(text, 'registrationNumber2')}
                onBlur={() => handleBlur('registrationNumber2')}
                errText={
                  error.registrationNumber2 !== undefined
                    ? error.registrationNumber2
                    : undefined
                }
              />
            </Row>
          </View>
          <View>
            <Text style={style.labelText}>{t('signUp.addressLabel')}</Text>
            <MedicleInput
              value={signUpData?.address1}
              onChangeText={text => onChange(text, 'address1')}
              direction="row"
              placeholder={t('signUp.address1')}
              inputButtonNode={
                <MedicleButton
                  buttonStyle={style.button}
                  text={t('signUp.addressSearch')}
                />
              }
            />
            <MedicleInput
              value={signUpData?.address2}
              onChangeText={text => onChange(text, 'address2')}
              placeholder={t('signUp.address2')}
              style={style.mt10}
            />
            <MedicleInput
              value={signUpData?.address3}
              onChangeText={text => onChange(text, 'address3')}
              placeholder={t('signUp.address3')}
              style={style.mt10}
            />
          </View>
          <Text style={style.labelText}>{t('signUp.phoneLabel')}</Text>
          <MedicleInput
            value={signUpData?.phone}
            onChangeText={text => onChange(text, 'phone')}
            placeholder={t('signUp.phone')}
            direction="row"
            inputButtonNode={
              <MedicleButton
                buttonStyle={style.button}
                text={t('signUp.phoneRequestSms')}
                disabled={true}
              />
            }
          />
          <Text style={style.labelText}>{t('signUp.emailLabel')}</Text>
          <MedicleInput
            value={signUpData?.email}
            onChangeText={text => onChange(text, 'email')}
            placeholder={t('signUp.email')}
          />
          <Text style={style.labelText}>{t('signUp.passwordLabel')}</Text>
          <MedicleInput
            value={signUpData?.password}
            onChangeText={text => onChange(text, 'password')}
            placeholder={t('signUp.password')}
          />
          <MedicleInput
            value={signUpData?.password}
            onChangeText={text => onChange(text, 'password')}
            placeholder={t('signUp.confirmPassword')}
            style={style.mt10}
          />
          <Text style={style.labelText}>{t('signUp.referralLabel')}</Text>
          <MedicleInput
            value={signUpData?.referral_code}
            onChangeText={text => onChange(text, 'referral_code')}
            placeholder={t('signUp.referral')}
          />
        </View>
        <Hr style={style.hr} color={Colors.Medicle.Gray.Light} thickness={12} />

        <View style={style.terms}>
          <View style={style.termsHeader}>
            <CustomCheckbox
              selected={agreeAll}
              onPress={() => {
                handleAgreeAll(agreeAll);
              }}
              style={style.checkBox}
            />
            <Text style={style.termsHeaderText}>{t('signUp.agreeAll')}</Text>
          </View>
          <Hr color={Colors.Medicle.Gray.Light} thickness={1} />
          <View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={termsOfService}
                onPress={() => {
                  setTermsOfService(!termsOfService);
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>
                [필수]메디컬 서비스이용약관 동의
              </Text>
            </View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={privacyPolicy}
                onPress={() => {
                  setPrivacyPolicy(!privacyPolicy);
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>
                [필수]메디컬 이용약관 및 개인정보처리방침 동의
              </Text>
            </View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={marketing}
                onPress={() => {
                  setMarketing(!marketing);
                }}
                style={style.checkBox}
              />
              <Text style={style.optionsText}>
                [선택]마케팅 활용 및 광고성 정보 수신 동의 자세히
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <MedicleButton
        // disabled={true}
        text="동의하고 회원가입"
        buttonStyle={style.signUpButton}
        onPress={() => register()}
        disabled={!registerDisabed}
      />
    </SafeAreaView>
  );
};

export default SignUp;
