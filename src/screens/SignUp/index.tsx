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
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import Close from '@/assets/images/close.png';
import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { MedicleInput } from '@/components/inputs';
import LoadingModal from '@/components/LoadingModal';
import ResultPage from '@/components/ResultPage';
import Spacing from '@/components/Spacing';
import { ErrorCode } from '@/constants/error';
import { Colors } from '@/constants/theme';
import { ResponseDTO } from '@/interfaces/api';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';

import style from './style';
import useCustomToast from '@/hooks/useToast';
import {
  agreeList,
  FormError,
  ISignUpData,
  termsList,
} from '@/interfaces/sign';
import { handleGetTerms } from '@/utils/terms';
import WebViewModal from '@/components/Modals/WebView';

const SignUp = ({ navigation, route }: any) => {
  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
    reg_type: 'normal',
    password: undefined,
    name: undefined,
    registrationNumber1: undefined,
    // registrationNumber2: undefined,
    phone: undefined,
    email: undefined,
    address1: undefined,
    address2: undefined,
    address3: undefined,
    post_number: undefined,
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
    // registrationNumber2: undefined,
    smsCode: undefined,
    mailCode: undefined,
  });

  const [agrees, setAgrees] = React.useState<agreeList>({
    service: false,
    privacy: false,
    provision: false,
    financial: false,
    fourteen: false,
    location: false,
  });

  const [terms, setTerms] = React.useState<termsList>({
    service: '',
    privacy: '',
    provision: '',
    financial: '',
    location: '',
  });

  const regex: { [key: string]: RegExp } = {
    name: /^[가-힣]{2,10}$/,
    registrationNumber1:
      /^(0[1-9]|[1-9][0-9])((0[1-9])|(1[0-2]))(([012][0-9])|(3[0-1]))$/,
    // registrationNumber2: /^[1-4]\d{6}$/,
    phone: /^010[0-9]*$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    password:
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+\-=\[\]\{\}\|\:\;\"\'\<\>\,\.\?\/]).{8,20}$/,
    sms: /^[0-9]*$/,
  };
  const { t } = useTranslation();
  const [marketing, setMarketing] = React.useState<boolean>(false); // 마케팅 수신동의
  const [agreeAll, setAgreeAll] = React.useState<boolean>(false); // 약관 모두동의

  const [registerDisabed, setRegisterDisabed] = React.useState<boolean>(false); // 회원가입버튼 잠금,해제

  const [addressModal, setAddressModal] = React.useState<boolean>(false); // 주소 검색 모달

  const [smsAuthDisabled, setSmsAuthDisabled] = React.useState<boolean>(false); // 인증번호 받기 버튼 잠금,해제
  const [smsCode, setSmsCode] = React.useState<string | undefined>(undefined); // 문자 인증코드
  const [smsInitialTime, setSmsInitialTime] = React.useState<
    number | undefined
  >(undefined); // 인증시간 설정
  const [smsCheckDisabled, setSmsCheckDisabled] =
    React.useState<boolean>(false); // 인증번호 확인 버튼 잠금,해제
  const [smsStatus, setSmsStatus] = React.useState<
    'before' | 'progress' | 'timeout' | 'completed'
  >('before'); // 인증상태 (단계별 ui)
  const [smsAuthText, setSmsAuthText] = React.useState<string>(
    t('signUp.phoneRequestSms')
  ); // 인증관련 플레이스홀더
  const smsMinutes = Math.floor(smsInitialTime! / 60)
    .toString()
    .padStart(1, '0'); // 인증시간 분단위
  const smsSeconds = (smsInitialTime! % 60).toString().padStart(2, '0'); // 인증시간 초단위
  const smsIntervalRef = React.useRef<NodeJS.Timeout | undefined>();

  const [mailCode, setMailCode] = React.useState<string | undefined>(undefined); // 메일 인증코드
  const [emailAuthDisabled, setEmailAuthDisabled] =
    React.useState<boolean>(false); // 이메일 인증 요청하기 버튼 잠금,해제
  const [mailInitialTime, setMailInitialTime] = React.useState<
    number | undefined
  >(undefined); // 메일 인증시간 설정
  const [mailCheckDisabled, setMailCheckDisabled] =
    React.useState<boolean>(false); // 메일 인증코드 확인버튼 잠금,해제
  const [emailStatus, setEmailStatus] = React.useState<
    'before' | 'progress' | 'timeout' | 'completed'
  >('before'); // 메일 인증단계 (단계별 ui)
  const [emailAuthText, setEmailAuthText] =
    React.useState<string>('인증메일받기'); // 인증메일코드 받기 버튼 잠금,해제
  const mailMinutes = Math.floor(mailInitialTime! / 60)
    .toString()
    .padStart(1, '0'); // 메일인증시간 분단위
  const mailSeconds = (mailInitialTime! % 60).toString().padStart(2, '0'); // 메일 인증시간 초단위
  const mailIntervalRef = React.useRef<NodeJS.Timeout | undefined>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false); // result 페이지 보여주기 

  const [confirmPassword, setConfirmPassword] = React.useState<
    string | undefined
  >(undefined); // 비밀번호 확인 인풋

  const registrationNumberRef1 = React.useRef<TextInput>(null);
  const { showToast } = useCustomToast();

  const [webViewVisible, setWebViewVisible] = React.useState(false); // 약관 상세보기 웹뷰 보이기, 숨기기
  const [webViewUrl, setWebViewUrl] = React.useState<string | undefined>(
    undefined
  ); // 약관별 웹뷰 url
  const [isTerms, setIsTerms] = React.useState(false); // 약관 url 받아오는게 성공했는지 확인


  // 약관클릭 이벤트 리스너 (모두동의 버튼)
  React.useEffect(() => {
    const allAgreesTrue = Object.values(agrees).every(value => value === true);
    setAgreeAll(allAgreesTrue && marketing);
    setSignUpData({
      ...signUpData,
      is_marketing_agree: marketing ? '1' : '0',
    });
  }, [marketing, agrees]);

  // 회원가입 버튼 이벤트 리스너 (인풋 입력값, 필수약관 등 이벤트 리슨하며 회원가입 버튼 잠금,해제)
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
    const allAgreesTrue = Object.values(agrees).every(value => value === true);
    setRegisterDisabed(
      _errorValid &&
        _dataValid &&
        _regexValid &&
        allAgreesTrue &&
        smsStatus === 'completed' &&
        emailStatus === 'completed' &&
        signUpData.password === confirmPassword
    );
  }, [error, signUpData, smsStatus, confirmPassword, emailStatus, agrees]);

  // 문자 인증단계별 ui 조절
  React.useEffect(() => {
    if (smsStatus === 'completed') {
      setSmsAuthText(t('signUp.phoneAuthCompleted'));
    } else if (smsStatus !== 'before') {
      setSmsAuthText(t('signUp.phoneRequestSmsAgain'));
    } else {
      setSmsAuthText('인증문자받기');
    }
  }, [smsStatus]);

  // 메일 인증 단계별 ui 조절
  React.useEffect(() => {
    if (emailStatus === 'completed') {
      setEmailAuthText('인증완료');
    } else if (emailStatus !== 'before') {
      setEmailAuthText('재전송');
    }
  }, [emailStatus]);

  // 문자 인증시간 초단위 감소 ui
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

  // 메일 인증시간 초단위 감소 ui
  React.useEffect(() => {
    mailIntervalRef.current = setInterval(() => {
      setMailInitialTime(mailInitialTime! - 1);
    }, 1000);

    if (mailInitialTime === 0) {
      clearInterval(mailIntervalRef.current);
      handleMailTiomeOut();
    }

    return () => clearInterval(mailIntervalRef.current!);
  }, [mailInitialTime]);

  // 페이지 진입시 약관들 url 가져오기
  React.useEffect(() => {
    initTerms();
  }, []);

  React.useEffect(() => {}, [terms]);

  /**
   * 약관 가져오기 통신
   */
  const initTerms = async () => {
    const tempTerms = await handleGetTerms();
    if (tempTerms) {
      setTerms(tempTerms);
      setIsTerms(true);
    }
  };

  /**
   * 인풋별 값 변경 이벤트 리스너 (각 인풋별 정규식 검사 등)
   * @param value 
   * @param name 
   * @returns 
   */
  const onChange = (value: string, name: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    if (name === 'phone') {
      handlePhoneVaild(value);
      return;
    }

    if (name === 'email') {
      handleEmailVaild(value);
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

  /**
   * 포커스 아웃 이벤트 리스너
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
   * 전화번호 정규식 검사
   * @param value 
   */
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
    setSmsAuthDisabled(regex.phone.test(value) && value.length === 11);
  };

  /**
   * 이메일 정규식 검사
   * @param value 
   */
  const handleEmailVaild = (value: string) => {
    errorClear('email');
    if (!regex.email.test(value) && value !== '') {
      errorSet('email');
    }

    setEmailAuthDisabled(regex.email.test(value));
  };

  /**
   * 비밀번호 정규식 검사
   * @param value 
   */
  const handlePasswordVaild = (value: string) => {
    let _password = undefined;
    let _confirmPassword = undefined;

    if (value !== '' && !regex.password.test(value)) {
      _password = '*영문/숫자/특수문자 혼합 8~20자로 입력해주세요.';
    }

    if (value !== confirmPassword) {
      _confirmPassword = '*비밀번호가 일치하지 않습니다.';
    }

    if (!value || !confirmPassword) {
      _confirmPassword = undefined;
    }

    setError({
      ...error,
      password: _password,
      confirmPassword: _confirmPassword,
    });
  };

  /**
   * 비밀번호확인 정규식등 검사
   * @param _text 
   * @returns 
   */
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

  /**
   * 대상에 에러메세지 설정
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
   * 대상 에러메세지 삭제
   * @param _type 
   */
  const errorClear = (_type: string) => {
    setError({
      ...error,
      [_type]: undefined,
    });
  };

  /**
   * 약관 모두동의 설정,해제
   * @param value 
   */
  const handleAgreeAll = (value: boolean) => {
    setAgrees({
      service: value,
      privacy: value,
      provision: value,
      financial: value,
      fourteen: value,
      location: value,
    });
    setAgreeAll(value);
    setMarketing(value);
  };

  /**
   * 회원가입 통신 handler
   */
  const register = async () => {
    setLoading(true);
    try {
      const request: ISignUpData = setupSignUpData();
      const response = await api.normalSignUp(request);

      if (response.result) {
        setSuccess(true);
      } else {
        if (response.error_code === 108) {
          setSignUpData({
            ...signUpData,
            registrationNumber1: undefined,
            // registrationNumber2: undefined,
          });
          setError({
            ...error,
            registrationNumber1: ErrorCode[response.error_code],
          });
          registrationNumberRef1.current?.focus();
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      console.error(e);
      showToast('처리중 오류가 발생하였습니다.');
      // navigation.navigate(Routes.SIGNIN);
    }
    setLoading(false);
  };

  /**
   * 인풋입력값들 회원가입 요청에 담을 파라미터로 변환
   * @returns 
   */
  const setupSignUpData = (): ISignUpData => {
    return {
      reg_type: signUpData.reg_type,
      user_id: signUpData.email,
      password: signUpData.password,
      name: signUpData.name,
      // registration_number: `${signUpData.registrationNumber1}${signUpData.registrationNumber2}`,
      registration_number: `${signUpData.registrationNumber1}`,
      phone: signUpData.phone,
      email: signUpData.email,
      address1: signUpData.address1,
      address2: signUpData.address2,
      address3: signUpData.address3,
      post_number: signUpData.post_number,
      referral_code: signUpData.referral_code,
      is_marketing_agree: signUpData.is_marketing_agree,
      sms_auth_code: smsCode,
    };
  };

  /**
   * sms 인증코드 요청하기
   */
  const handleRequestSms = async () => {
    setLoading(true);
    setError({
      ...error,
      phone: undefined,
      smsCode: undefined,
    });

    let _success = false;
    let _errorMessage = 'unknown';

    try {
      const response = await api.getPhoneAuthCode({
        phone: signUpData.phone,
        type: 'register',
      });

      if (response.result) {
        setSmsInitialTime(300);
        setSmsStatus('progress');
        _success = true;
      } else {
        if (response.error_code) {
          setSmsStatus('before');
          _errorMessage = ErrorCode[response.error_code];
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      _errorMessage = ErrorCode[101];
    } finally {
      setLoading(false);
    }

    if (!_success) {
      clearInterval(smsIntervalRef.current!);
      setError({
        ...error,
        phone: _errorMessage,
      });
    }
  };

  /**
   * email 인증코드 요청하기
   */
  const handleRequestEmail = async () => {
    setLoading(true);
    setError({
      ...error,
      email: undefined,
      mailCode: undefined,
    });

    let _success = false;
    let _errorMessage = 'unknown';

    try {
      const request = {
        email: signUpData.email,
      };

      const response = await api.getEmailAuthCode(request);

      if (response.result) {
        setMailInitialTime(300);
        setEmailStatus('progress');
        _success = true;
      } else {
        if (response.error_code) {
          setEmailStatus('before');
          _errorMessage = ErrorCode[response.error_code];
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      _errorMessage = ErrorCode[101];
    }

    if (!_success) {
      clearInterval(mailIntervalRef.current!);
      setError({
        ...error,
        email: _errorMessage,
      });
    }
    setLoading(false);
  };

  /**
   * sms 인증코드 규칙검사 
   * @param text 
   */
  const handleSmsValid = (text: string) => {
    errorClear('smsCode');
    setSmsCode(text);
    let _regex = regex.sms;
    setSmsCheckDisabled(_regex.test(text) && text.length === 6);

    if (!_regex.test(text)) {
      setError({
        ...error,
        ['smsCode']: t('errorMessage.smsRegexError'),
      });
    }
  };

  /**
   * 이메일 인증코드 규칙검사
   * @param text 
   */
  const handleMailValid = (text: string) => {
    errorClear('mailCode');
    setMailCode(text);
    let _regex = regex.sms;
    setMailCheckDisabled(_regex.test(text) && text.length === 6);

    if (!_regex.test(text)) {
      setError({
        ...error,
        ['mailCode']: t('errorMessage.smsRegexError'),
      });
    }
  };

  /**
   * sms 인증번호 확인 동작
   */
  const handleSmsCheck = async () => {
    setLoading(true);
    try {
      const request = {
        phone: signUpData.phone,
        auth_code: smsCode,
        type: 'register',
      };
      const response = await api.checkPhoneAuthCode(request);

      if (response.result) {
        clearInterval(smsIntervalRef.current!);
        setSmsStatus('completed');
      } else {
        if (response.error_code) {
          setError({
            ...error,
            smsCode: ErrorCode[response.error_code],
          });
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      setError({
        ...error,
        smsCode: ErrorCode[101],
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 메일 인증번호 확인하기
   */
  const handleMailCheck = async () => {
    setLoading(true);
    let _success = false;
    let _errorMessage = ErrorCode[101];

    try {
      const request = {
        email: signUpData.email,
        auth_code: mailCode,
      };
      const response = await api.checkEmailAuthCode(request);

      if (response.result) {
        clearInterval(mailIntervalRef.current!);
        setEmailStatus('completed');
        _success = true;
      } else {
        if (response.error_code) {
          _errorMessage = ErrorCode[response.error_code];
        } else {
          throw 'error';
        }
      }
    } catch (e: any) {
      setError({
        ...error,
        mailCode: ErrorCode[101],
      });
    } finally {
      setLoading(false);
    }

    if (!_success) {
      setError({
        ...error,
        mailCode: _errorMessage,
      });
    }
  };

  /**
   * 문자 인증시간 만료 
   */
  const handleSmsTiomeOut = () => {
    errorSet('smsCode', 'smsTimeout');
    setSmsStatus('timeout');
    setSmsCode(undefined);
    setSmsCheckDisabled(false);
  };

  /**
   * 메일 인증시간 만료
   */
  const handleMailTiomeOut = () => {
    errorSet('mailCode', 'smsTimeout');
    setEmailStatus('timeout');
    setMailCode(undefined);
    setMailCheckDisabled(false);
  };

  /**
   * 약관동의하기 (단일타겟)
   * @param type 
   */
  const handleAgree = (type: keyof agreeList) => {
    setAgrees({
      ...agrees,
      [type]: !agrees[type],
    });
  };

  if (success) {
    return (
      <ResultPage
        navigation={navigation}
        resultText={t('signUp.result')}
        buttonText={t('button.goHome')}
        buttonDisabled={true}
        onPress={() => {
          navigation.navigate(Routes.SOCIAL);
        }}
      />
    );
  }

  const handleViewDetail = (url: keyof termsList) => {
    setWebViewUrl(terms[url]);
    if (isTerms) {
      setWebViewVisible(true);
    } else {
      showToast('처리중 오류가 발생하였습니다.');
    }
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
                ref={registrationNumberRef1}
                errText={
                  error.registrationNumber1 !== undefined
                    ? error.registrationNumber1
                    : undefined
                }
                maxLength={6}
                placeholder={t('signUp.registrationNumber')}
              />
              <Spacing size={10} />
            </Row>
          </View>
          {/* <View>
            <Text style={style.labelText}>
              {t('signUp.registrationNumberLabel')}
            </Text>
            <Row justify="space-between">
              <MedicleInput
                style={{ flex: 1 }}
                value={signUpData?.registrationNumber1}
                onChangeText={text => onChange(text, 'registrationNumber1')}
                // onBlur={() => handleBlur('registrationNumber1')}
                ref={registrationNumberRef1}
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
          </View> */}
          <View>
            <Text style={style.labelText}>{t('signUp.addressLabel')}</Text>
            <MedicleInput
              value={signUpData?.post_number}
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
                value={smsCode}
                onChangeText={text => handleSmsValid(text)}
                placeholder={t('signUp.phoneAuthNumInput')}
                direction="row"
                maxLength={6}
                editable={smsStatus === 'timeout' ? false : true}
                errText={
                  error.smsCode !== undefined ? error.smsCode : undefined
                }
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
                    buttonStyle={style.button}
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
          <Text style={style.labelText}>{t('signUp.emailLabel')}</Text>
          <MedicleInput
            value={signUpData?.email}
            onChangeText={text => onChange(text, 'email')}
            placeholder={t('signUp.email')}
            direction="row"
            errText={error.email !== undefined ? error.email : undefined}
            editable={emailStatus !== 'completed'}
            clearButton={emailStatus !== 'completed'}
            inputButtonNode={
              <MedicleButton
                buttonStyle={style.button}
                text={emailAuthText}
                disabled={
                  emailStatus === 'completed' ? true : !emailAuthDisabled
                }
                onPress={handleRequestEmail}
              />
            }
          />
          {(emailStatus === 'progress' || emailStatus === 'timeout') && (
            <>
              <MedicleInput
                style={style.mt10}
                value={mailCode}
                onChangeText={text => handleMailValid(text)}
                placeholder={t('signUp.phoneAuthNumInput')}
                direction="row"
                maxLength={6}
                editable={emailStatus === 'timeout' ? false : true}
                errText={
                  error.mailCode !== undefined ? error.mailCode : undefined
                }
                rightInputNode={
                  <View>
                    <Text
                      style={[
                        style.timer,
                        mailInitialTime === 0 && {
                          color: Colors.Medicle.Font.Red,
                        },
                      ]}>{`${mailMinutes}:${mailSeconds}`}</Text>
                  </View>
                }
                inputButtonNode={
                  <MedicleButton
                    buttonStyle={style.button}
                    text={t('signUp.phoneAuthNumCheck')}
                    disabled={!mailCheckDisabled}
                    onPress={() => {
                      handleMailCheck();
                    }}
                  />
                }
              />
            </>
          )}
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
                handleAgreeAll(!agreeAll);
              }}
              style={style.checkBox}
            />
            <Text style={style.termsHeaderText}>{t('signUp.agreeAll')}</Text>
          </View>
          <Hr color={Colors.Medicle.Gray.Light} thickness={1} />
          <View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={agrees.fourteen}
                onPress={() => {
                  handleAgree('fourteen');
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>[필수]만 14세 이상 동의</Text>
            </View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={agrees.service}
                onPress={() => {
                  handleAgree('service');
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>
                [필수]MDI 서비스 이용약관 동의
              </Text>
              <TouchableOpacity onPress={() => handleViewDetail('service')}>
                <Text style={style.detail}>상세보기</Text>
              </TouchableOpacity>
            </View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={agrees.privacy}
                onPress={() => {
                  handleAgree('privacy');
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>
                [필수]개인정보 처리방침 동의
              </Text>
              <TouchableOpacity onPress={() => handleViewDetail('privacy')}>
                <Text style={style.detail}>상세보기</Text>
              </TouchableOpacity>
            </View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={agrees.provision}
                onPress={() => {
                  handleAgree('provision');
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>
                [필수]개인정보 제3자 제공 동의
              </Text>
              <TouchableOpacity onPress={() => handleViewDetail('provision')}>
                <Text style={style.detail}>상세보기</Text>
              </TouchableOpacity>
            </View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={agrees.financial}
                onPress={() => {
                  handleAgree('financial');
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>
                [필수]전자금융거래 이용약관 동의
              </Text>
              <TouchableOpacity onPress={() => handleViewDetail('financial')}>
                <Text style={style.detail}>상세보기</Text>
              </TouchableOpacity>
            </View>
            <View style={style.termsContents}>
              <CustomCheckbox
                selected={agrees.location}
                onPress={() => {
                  handleAgree('location');
                }}
                style={style.checkBox}
              />
              <Text style={style.essentialText}>
                [필수]위치기반서비스 이용약관 동의
              </Text>
              <TouchableOpacity onPress={() => handleViewDetail('location')}>
                <Text style={style.detail}>상세보기</Text>
              </TouchableOpacity>
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
                [선택]마케팅 활용 및 광고성 정보 수신 동의
              </Text>
            </View>
          </View>
        </View>
        <MedicleButton
          text={t('signUp.register')}
          buttonStyle={style.signUpButton}
          onPress={() => register()}
          disabled={!registerDisabed}
        />
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
                      post_number: data.zonecode.toString(),
                    });
                    setAddressModal(false);
                  }}
                  onError={() => {
                    console.error('에러');
                  }}
                />
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      <WebViewModal
        url={webViewUrl!}
        visible={webViewVisible}
        onClose={() => setWebViewVisible(false)}
      />
      <LoadingModal visible={loading} />
    </SafeAreaView>
  );
};

export default SignUp;
