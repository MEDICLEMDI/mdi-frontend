import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
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
}

export interface PasswordList {
  origin: string;
  new: string;
  confirm: string;
}

export interface PasswordErrors {
  origin?: string;
  new?: string;
  confirm?: string;
  result?: string;
}

const EditPassword = ({ navigation }: any) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [passwordData, setPasswordData] = React.useState<PasswordList>({
    origin: '',
    new: '',
    confirm: '',
  });
  const [errors, setErrors] = React.useState<PasswordErrors>({
    origin: undefined,
    new: undefined,
    confirm: undefined,
    result: undefined,
  });
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const originRef = React.useRef<TextInput>(null);
  const [result, setResult] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@User');
        if (userData) {
          let _user = JSON.parse(userData);
          setUser({
            ...user,
            name: _user.name,
            email: _user.email,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    const _passwords: boolean =
      passwordData.confirm !== '' &&
      passwordData.new !== '' &&
      passwordData.origin !== '';

    const _errors: boolean = !errors.confirm && !errors.new && !errors.origin;

    setButtonDisabled(_passwords && _errors);
  }, [user, passwordData]);

  /**
   * 패스워드 인풋 값 변경에 따른 이벤트리슨
   * @param type 
   * @param password 
   */
  const onchange = (type: string, password: string) => {
    setPasswordData({
      ...passwordData,
      [type]: password,
    });
    dataVaild(type, password);
  };

  /**
   * 인풋별 요구 regex 검사
   * @param type 
   * @param password 
   * @returns 
   */
  const dataVaild = (type: string, password: string) => {
    if (!password) {
      errorClear(type);
      return;
    }

    if (type === 'origin') {
      if (password.length < 8 || password.length > 20) {
        setErrors({
          ...errors,
          [type]: '비밀번호는 8~20 글자 입니다.',
        });
      } else {
        if (password === passwordData.new) {
          setErrors({
            ...errors,
            new: '기존 비밀번호와 동일한 비밀번호 입니다.',
            [type]: undefined,
          });
        } else {
          setErrors({
            ...errors,
            new: undefined,
            [type]: undefined,
          });
        }
      }
    }

    if (type === 'new') {
      const regex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+\-=\[\]\{\}\|\:\;\"\'\<\>\,\.\?\/]).{8,20}$/;
      if (!regex.test(password)) {
        setErrors({
          ...errors,
          [type]: '비밀번호는 영문/숫자/특수문자 혼합 8~20자 입니다.',
        });
      } else {
        if (password === passwordData.origin) {
          setErrors({
            ...errors,
            [type]: '기존 비밀번호와 동일한 비밀번호 입니다.',
          });
        } else if (
          password !== passwordData.confirm &&
          passwordData.confirm !== ''
        ) {
          setErrors({
            ...errors,
            confirm: '비밀번호가 일치하지 않습니다.',
            [type]: undefined,
          });
        } else {
          setErrors({
            ...errors,
            confirm: undefined,
            [type]: undefined,
          });
        }
      }
    }

    if (type === 'confirm') {
      if (password !== passwordData.new) {
        setErrors({
          ...errors,
          [type]: '비밀번호가 일치하지 않습니다.',
        });
      } else {
        errorClear(type);
      }
    }
  };

  /**
   * 에러 메세지 삭제
   * @param type 
   */
  const errorClear = (type: string) => {
    setErrors({
      ...errors,
      [type]: undefined,
    });
  };

  /**
   * 비밀번호 변경하기
   */
  const handleEditPassword = async () => {
    try {
      const request = {
        origin_password: passwordData.origin,
        new_password: passwordData.new,
      };

      const response = await api.editPassword(request);

      if (response.result) {
        setResult(true);
      } else {
        if (response.error_code && response.error_code === 110) {
          setErrors({
            ...errors,
            result: ErrorCode[response.error_code],
          });
          setPasswordData({
            ...passwordData,
            origin: '',
          });
          originRef.current?.focus();
        } else {
          throw 'error';
        }
      }
    } catch (err) {
      console.error(err);
      setErrors({
        ...errors,
        result: ErrorCode[101],
      });
    }
  };

  const USER_NAME_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 16,
    weight: 'bold',
  });
  const USER_EMAIL_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

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
            <Text style={style.title}>비밀번호 변경</Text>
            <View style={style.changeLayer}>
              <MedicleInput
                password={true}
                value={passwordData.origin}
                placeholder="기존 비밀번호를 입력해 주세요."
                onChangeText={text => onchange('origin', text)}
                errText={errors.origin && errors.origin}
                ref={originRef}
              />
              <MedicleInput
                password={true}
                value={passwordData.new}
                style={style.mt10}
                placeholder="새로운 비밀번호를 입력해 주세요."
                onChangeText={text => onchange('new', text)}
                errText={errors.new && errors.new}
              />
              <MedicleInput
                password={true}
                value={passwordData.confirm}
                style={style.mt10}
                placeholder="비밀번호를 한번 더 입력해 주세요."
                onChangeText={text => onchange('confirm', text)}
                errText={errors.confirm && errors.confirm}
              />
            </View>
            <MedicleButton
              text="변경하기"
              buttonStyle={style.changeButton}
              disabled={!buttonDisabled}
              onPress={handleEditPassword}
            />
            {errors.result && (
              <Text style={style.resultErrorMessage}>{errors.result}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <ResultModal
        visible={result}
        buttonText="확인"
        resultText="변경이 완료되었습니다."
        onPress={() => {
          setResult(false);
          navigation.navigate(Routes.EDIT_PROFILE);
        }}
      />
    </SafeAreaView>
  );
};

export default EditPassword;
