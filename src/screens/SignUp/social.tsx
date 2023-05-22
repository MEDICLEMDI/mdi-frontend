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
import { responseDTO } from '@/interfaces/api';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';

import style from './style';
import useCustomToast from '@/hooks/useToast';
import { agreeList, FormError, ISignUpData, termsList } from '@/interfaces/sign';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { handleGetTerms } from '@/utils/terms';
import WebViewModal from '@/components/Modals/WebView';


const SocialSignUp = ({ navigation, route }) => {
  const [signUpData, setSignUpData] = React.useState<ISignUpData>({
    reg_type: 'social',
    name: undefined,
    registrationNumber1: undefined,
    registrationNumber2: undefined,
    phone: undefined,
    email: route.params.email,
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
    confirmPassword: undefined,
    registrationNumber1: undefined,
    registrationNumber2: undefined,
    smsCode: undefined,
  });

  const [agrees, setAgrees] = React.useState<agreeList>({
    service: false,
    privacy: false,
    provision: false,
    financial: false,
    fourteen: false,
    location: false,
  })

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
    registrationNumber2: /^[1-4]\d{6}$/,
    phone: /^010[0-9]*$/,
    sms: /^[0-9]*$/,
  };
  const { t } = useTranslation();
  const [marketing, setMarketing] = React.useState<boolean>(false);
  const [agreeAll, setAgreeAll] = React.useState<boolean>(false);
  const [registerDisabed, setRegisterDisabed] = React.useState<boolean>(false);
  const [addressModal, setAddressModal] = React.useState<boolean>(false);
  const [smsCode, setSmsCode] = React.useState<string | undefined>(undefined);
  const [smsAuthDisabled, setSmsAuthDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [isTerms, setIsTerms] = React.useState(false); // 약관 url 받아오는게 성공했는지 확인
  const [smsInitialTime, setSmsInitialTime] = React.useState<
    number | undefined
  >(undefined);
  const [smsCheckDisabled, setSmsCheckDisabled] =
    React.useState<boolean>(false);
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const insets = useSafeAreaInsets();
  
  const [smsStatus, setSmsStatus] = React.useState<
    'before' | 'progress' | 'timeout' | 'completed'
  >('before');
  const [smsAuthText, setSmsAuthText] = React.useState<string>(
    t('signUp.phoneRequestSms')
  );
  const [webViewUrl, setWebViewUrl] = React.useState<string | undefined>(
    undefined
  );
  
  const [confirmPassword, setConfirmPassword] = React.useState<
    string | undefined
  >(undefined);
  const smsMinutes = Math.floor(smsInitialTime! / 60)
    .toString()
    .padStart(1, '0');
  const smsSeconds = (smsInitialTime! % 60).toString().padStart(2, '0');
  const smsIntervalRef = React.useRef<NodeJS.Timeout | undefined>();
  const registrationNumberRef1 = React.useRef<TextInput>(null);
  const { showToast } = useCustomToast();

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
    const allAgreesTrue = Object.values(agrees).every((value) => value === true);
    setRegisterDisabed(
      _errorValid &&
        _dataValid &&
        _regexValid &&
        allAgreesTrue &&
        smsStatus === 'completed' &&
        signUpData.password === confirmPassword
    );
  }, [
    error,
    signUpData,
    smsStatus,
    confirmPassword,
    agrees
  ]);

  React.useEffect(() => {
    if (smsStatus === 'completed') {
      setSmsAuthText(t('signUp.phoneAuthCompleted'));
    } else if (smsStatus !== 'before') {
      setSmsAuthText(t('signUp.phoneRequestSmsAgain'));
    } else {
      setSmsAuthText('인증문자받기');
    }
  }, [smsStatus]);

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

  React.useEffect(()=>{
    initTerms();
  },[])

  React.useEffect(() => {
  }, [terms]);

  const initTerms = async () => {
    const tempTerms = await handleGetTerms();
    if (tempTerms) {
      setTerms(tempTerms);
      setIsTerms(true);
    }
  }


  const onChange = (value: string, name: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    if (name === 'phone') {
      handlePhoneVaild(value);
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
    setSmsAuthDisabled(regex.phone.test(value) && value.length === 11);
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

  const register = async () => {

    setLoading(true);
    try {
      const request: ISignUpData = setupSignUpData();
      const response: responseDTO = await api.socialSignUp(request);
      if (response.result) {
        setSuccess(true);
      } else {
        if (response.error_code === 108) {
          setSignUpData({
            ...signUpData,
            registrationNumber1: undefined,
            registrationNumber2: undefined,
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
    }
    setLoading(false);
  };

  const setupSignUpData = (): ISignUpData => {
    return {
      reg_type: signUpData.reg_type,
      social_type: route.params.social_type,
      social_id: route.params.social_id.toString(),
      name: signUpData.name,
      registration_number: `${signUpData.registrationNumber1}${signUpData.registrationNumber2}`,
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
      const response: responseDTO = await api.getPhoneAuthCode({
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

  const handleSmsCheck = async () => {
    setLoading(true);
    try {
      const request = {
        phone: signUpData.phone,
        auth_code: smsCode,
        type: 'register',
      };
      const response: responseDTO = await api.checkPhoneAuthCode(request);

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

  const handleViewDetail = (url: keyof termsList) => {
    setWebViewUrl(terms[url]);
    if(isTerms) {
      setWebViewVisible(true);
    } else {
      showToast('처리중 오류가 발생하였습니다.');
    }
  };

  const handleAgree = (type: keyof agreeList) => {
    setAgrees({
      ...agrees,
      [type]: !agrees[type]
    })
  };


  const handleSmsTiomeOut = () => {
    errorSet('smsCode', 'smsTimeout');
    setSmsStatus('timeout');
    setSmsCode(undefined);
    setSmsCheckDisabled(false);
  };

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
          <Text style={style.labelText}>이메일</Text>
          <MedicleInput
            value={signUpData.email}
            direction="row"
            editable={false}
            clearButton={false}
          />
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
              <Text style={style.essentialText}>[필수]메디클 서비스 이용약관 동의</Text>
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
        <MedicleButton
          text={t('signUp.register')}
          buttonStyle={style.signUpButton}
          onPress={() => register()}
          disabled={!registerDisabed}
        />
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

export default SocialSignUp;
