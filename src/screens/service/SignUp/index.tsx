import Postcode from '@actbase/react-daum-postcode';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native';

import Close from '@/assets/images/close.png';
import Result from '@/assets/images/result_icon.png';
import MedicleButton from '@/buttons/MedicleButton';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { MedicleInput } from '@/components/inputs';
import LoadingModal from '@/components/LoadingModal';
import ResultPage from '@/components/Result';
import Spacing from '@/components/Spacing';
import { Colors } from '@/constants/theme';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import API from '@/utils/api';

import style from './style';

interface ISignUpData {
  reg_type?: string;
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
  is_marketing_agree: string;
  [key: string]: string | undefined;
}

interface FormError {
  phone?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  sms?: string;
  registrationNumber1?: string;
  registrationNumber2?: string;
  [key: string]: string | undefined;
}

const SignUp = ({ navigation }) => {
  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
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
    registrationNumber1: undefined,
    registrationNumber2: undefined,
    sms: undefined,
  });

  const regex: { [key: string]: RegExp } = {
    name: /^[가-힣]{2,10}$/,
    registrationNumber1:
      /^(0[1-9]|[1-9][0-9])((0[1-9])|(1[0-2]))(([012][0-9])|(3[0-1]))$/,
    registrationNumber2: /^[1-4]\d{6}$/,
    phone: /^010[0-9]*$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    password:
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+\-=\[\]\{\}\|\:\;\"\'\<\>\,\.\?\/]).{8,20}$/,
    sms: /^[0-9]*$/,
  };
  const { t } = useTranslation();
  const [termsOfService, setTermsOfService] = React.useState<boolean>(false);
  const [privacyPolicy, setPrivacyPolicy] = React.useState<boolean>(false);
  const [marketing, setMarketing] = React.useState<boolean>(false);
  const [agreeAll, setAgreeAll] = React.useState<boolean>(false);
  const [registerDisabed, setRegisterDisabed] = React.useState<boolean>(false);
  const [addressModal, setAddressModal] = React.useState<boolean>(false);
  const [sms, setSms] = React.useState<string | undefined>(undefined);
  const [smsAuthDisabled, setSmsAuthDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [initialTime, setInitialTime] = React.useState<number | undefined>(
    undefined
  );

  const [smsCheckDisabled, setSmsCheckDisabled] =
    React.useState<boolean>(false);
  const [smsStatus, setSmsStatus] = React.useState<
    'before' | 'progress' | 'timeout' | 'completed'
  >('before');
  const [smsAuthText, setSmsAuthText] = React.useState<string>(
    t('signUp.phoneRequestSms')
  );
  const [confirmPassword, setConfirmPassword] = React.useState<
    string | undefined
  >(undefined);
  const minutes = Math.floor(initialTime / 60)
    .toString()
    .padStart(1, '0');
  const seconds = (initialTime % 60).toString().padStart(2, '0');
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>();

  React.useEffect(() => {
    setAgreeAll(privacyPolicy && termsOfService && marketing);
    if (marketing) {
      setSignUpData({
        ...signUpData,
        is_marketing_agree: '1',
      });
    } else {
      setSignUpData({
        ...signUpData,
        is_marketing_agree: '0',
      });
    }
  }, [privacyPolicy, termsOfService, marketing]);

  React.useEffect(() => {
    setRegisterDisabed(false);

    const _error = Object.values(error);
    const _errorValid = _error.every(value => value === undefined);

    const _data = Object.keys(signUpData);
    const _dataValid = _data
      .filter(
        key =>
          key !== 'name' &&
          key !== 'referral_code' &&
          key !== 'is_marketing_agree'
      )
      .every(key => signUpData[key] !== undefined && signUpData[key] !== '');

    const _regex = Object.keys(regex);
    const _regexValid = _regex
      .filter(key => key !== 'sms')
      .every(key => regex[key].test(signUpData[key]!));

    setRegisterDisabed(
      _errorValid &&
        _dataValid &&
        _regexValid &&
        privacyPolicy &&
        termsOfService &&
        smsStatus === 'completed' &&
        signUpData.password === confirmPassword
    );
  }, [
    error,
    signUpData,
    privacyPolicy,
    termsOfService,
    smsStatus,
    confirmPassword,
  ]);

  React.useEffect(() => {
    if (smsStatus === 'completed') {
      setSmsAuthText(t('signUp.phoneAuthCompleted'));
    } else if (smsStatus !== 'before') {
      setSmsAuthText(t('signUp.phoneRequestSmsAgain'));
    }
  }, [smsStatus]);

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setInitialTime(initialTime - 1);
    }, 1000);

    if (initialTime === 0) {
      clearInterval(intervalRef.current);
      handleSmsTiomeOut();
    }

    return () => clearInterval(intervalRef.current!);
  }, [initialTime]);

  const onChange = (value: string, name: string) => {
    setSignUpData({
      ...signUpData,
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
      signUpData.password === '' ||
      signUpData.password === undefined
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

  const handleAgreeAll = (_status: boolean) => {
    setTermsOfService(!_status);
    setPrivacyPolicy(!_status);
    setMarketing(!_status);
  };

  const register = async () => {
    setLoading(true);
    try {
      const data: ISignUpData = setupSignUpData();
      await API.post('/register', data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(typeof err);
          console.log(err.message);
          console.log('에러');
          console.log(err);
          console.log('에러');
          console.log(err.data);
        })
        .finally(() => {
          // setSuccess(true)
        });
    } catch (e: any) {
      console.log('에러e');
      console.log(e);
      console.log('에러e');
    }
    setLoading(false);
  };

  const setupSignUpData = (): ISignUpData => {
    return {
      reg_type: signUpData?.reg_type,
      // user_id: signUpData?.email,
      user_id: 'gdgd',
      password: signUpData?.password,
      name: signUpData?.name,
      registration_number: `${signUpData.registrationNumber1}${signUpData.registrationNumber2}`,
      phone: signUpData?.phone,
      email: signUpData?.email,
      address1: signUpData?.address1,
      address2: signUpData?.address2,
      address3: signUpData?.address3,
      post_code: signUpData?.post_code,
      referral_code: signUpData?.referral_code,
      is_marketing_agree: signUpData?.is_marketing_agree,
    };
  };

  const handleRequestSms = () => {
    errorClear('sms');
    setInitialTime(300);
    setSmsStatus('progress');
  };

  const handleSmsValid = (text: string) => {
    errorClear('sms');
    setSms(text);
    let _regex = regex.sms;
    setSmsCheckDisabled(_regex.test(text) && text.length === 6);

    if (!_regex.test(text)) {
      setError({
        ...error,
        ['sms']: t('errorMessage.smsRegexError'),
      });
    }
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

  if (success) {
    return (
      <ResultPage
        navigation={navigation}
        resultText={t('signUp.result')}
        buttonText={t('button.goHome')}
        buttonDisabled={true}
        buttonRoute={Routes.SIGNIN}
      />
    );
  }

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
            // onBlur={() => handleBlur('name')}
            errText={error.name !== undefined ? error.name : undefined}
          />
          <View>
            <Text style={style.labelText}>
              {t('signUp.registrationNumberLabel')}
            </Text>
            <Row justify="space-between">
              <MedicleInput
                style={{ flex: 1 }}
                value={signUpData?.registrationNumber1}
                onChangeText={text => onChange(text, 'registrationNumber1')}
                // onBlur={() => handleBlur('registrationNumber1')}
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
                value={signUpData?.registrationNumber2}
                maxLength={7}
                password={true}
                onChangeText={text => onChange(text, 'registrationNumber2')}
                // onBlur={() => handleBlur('registrationNumber2')}
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
              value={signUpData?.post_code}
              direction="row"
              placeholder={t('signUp.address1')}
              editable={false}
              clearButton={false}
              inputButtonNode={
                <MedicleButton
                  buttonStyle={style.button}
                  text={t('signUp.addressSearch')}
                  onPress={() => {
                    setAddressModal(true);
                  }}
                />
              }
            />
            <MedicleInput
              value={
                signUpData.address1 &&
                signUpData.address2 &&
                `${signUpData?.address1} ${signUpData?.address2}`
              }
              placeholder={t('signUp.address2')}
              style={style.mt10}
              editable={false}
              clearButton={false}
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
          <Text style={style.labelText}>{t('signUp.emailLabel')}</Text>
          <MedicleInput
            value={signUpData?.email}
            onChangeText={text => onChange(text, 'email')}
            placeholder={t('signUp.email')}
            // onBlur={() => handleBlur('email')}
            errText={error.email !== undefined ? error.email : undefined}
          />
          <Text style={style.labelText}>{t('signUp.passwordLabel')}</Text>
          <MedicleInput
            value={signUpData?.password}
            onChangeText={text => onChange(text, 'password')}
            placeholder={t('signUp.password')}
            password={true}
            errText={error.password !== undefined ? error.password : undefined}
          />
          <MedicleInput
            value={confirmPassword}
            onChangeText={text => {
              handleConfirmPasswordVaild(text);
            }}
            password={true}
            placeholder={t('signUp.confirmPassword')}
            errText={
              error.confirmPassword !== undefined
                ? error.confirmPassword
                : undefined
            }
            style={style.mt10}
          />
          {/* <Text style={style.labelText}>{t('signUp.referralLabel')}</Text>
          <MedicleInput
            value={signUpData?.referral_code}
            onChangeText={text => onChange(text, 'referral_code')}
            placeholder={t('signUp.referral')}
          /> */}
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
        {addressModal && (
          <Modal animationType="fade" transparent={true} visible={addressModal}>
            <View style={style.modalContainer}>
              <View style={style.modal}>
                <View style={style.modalHeader}>
                  <Text style={style.modalTitle}>
                    {t('signUp.addressModal')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setAddressModal(false);
                    }}>
                    <Image source={Close} style={style.modalClose} />
                  </TouchableOpacity>
                </View>
                <Postcode
                  style={style.postCode}
                  jsOptions={{ animation: true }}
                  onSelected={data => {
                    setSignUpData({
                      ...signUpData,
                      address1: data.sido,
                      address2: data.roadAddress.slice(data.sido.length + 1),
                      post_code: data.zonecode.toString(),
                    });
                    setAddressModal(false);
                  }}
                  onError={() => {
                    console.log('에러');
                  }}
                />
              </View>
            </View>
          </Modal>
        )}
        <MedicleButton
          // disabled={true}
          text={t('signUp.register')}
          buttonStyle={style.signUpButton}
          onPress={() => register()}
          disabled={!registerDisabed}
        />
      </ScrollView>
      <LoadingModal visible={loading} />
    </SafeAreaView>
  );
};

export default SignUp;
