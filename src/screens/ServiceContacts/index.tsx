import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Header from '@/components/Header';
import MedicleInput from '@/components/inputs/MedicleInput';

import style from './style';
import MedicleButton from '@/components/buttons/MedicleButton';
import { ResponseDTO } from '@/interfaces/api';
import { getStorageData } from '@/utils/localStorage';
import Api from '@/components/Api';
import useCustomToast from '@/hooks/useToast';
import LoadingModal from '@/components/LoadingModal';

export interface partnershipForm {
  name: string;
  company: string;
  phone: string;
  content: string;
}

export default ({navigation}: any) => {
  const { t } = useTranslation();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const { showToast } = useCustomToast();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<partnershipForm>({
    name: '',
    phone: '',
    company: '',
    content: '',
  });
  const [error, setError] = React.useState({
    company: '',
    content: '',
  });

  React.useEffect(() => {
    userInit();
  }, []);

  React.useEffect(() => {
    handleButtonDisabled();
  }, [form]);

  /**
   * 페이지 초기화, (이름과 전화번호는 유저의 정보를 받아옴)
   */
  const userInit = async () => {
    const _user = await getStorageData('@User');
    setForm({
      ...form,
      name: _user.name,
      phone: _user.phone,
    });
  };

  /**
   * 입력 인풋별 변경 이벤트 리스너
   * @param type 
   * @param text 
   */
  const handleOnChange = (type: keyof partnershipForm, text: string) => {
    setButtonDisabled(false);
    setForm({
      ...form,
      [type]: text,
    });

    handleFormValid(type, text);
  };

  /**
   * 인풋별 입력 규칙 (최소~최대 글자갯수등) 검사
   * @param type 
   * @param text 
   */
  const handleFormValid = (type: string, text: string) => {
    if (type === 'content') {
      setError({
        ...error,
        [type]: '',
      });
      if (text.length < 10 && text !== '') {
        setError({
          ...error,
          [type]: '*최소 10글자 부터 최대 200글자 까지 입력가능합니다.',
        });
      }
    }

    if (type === 'company') {
      setError({
        ...error,
        [type]: '',
      });
      if (text.length < 2 && text !== '') {
        setError({
          ...error,
          [type]: '*최소 2글자 부터 최대 50글자 까지 입력가능합니다.',
        });
      }
    }
  };

  /**
   * 입력에 따라 등록버튼 잠금,해제
   */
  const handleButtonDisabled = () => {
    if (
      form.company &&
      form.content &&
      error.company === '' &&
      error.content === ''
    ) {
      setButtonDisabled(true);
    }
  };

  /**
   * 제휴문의 보내기
   */
  const handleSend = async () => {
    setLoading(true);
    let _toastMessage;
    try {
      const response = await Api.partnershipQA(form);
      if (response.result) {
        navigation.goBack();
        _toastMessage = '제휴문의가 성공적으로 등록되었습니다.';
      } else {
        if (response.message) {
          _toastMessage = response.message;
        } else {
          throw 'error';
        }
      }
    } catch (err) {
      _toastMessage = '처리중 오류가 발생하였습니다.';
      console.error(err);
    } finally {
      setLoading(false);
      showToast(_toastMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.contact')} />
      <ScrollView style={style.container}>
        <View>
          {/* Input Wrap */}
          <MedicleInput
            label={<Text>{t('input.name')}</Text>}
            placeholder={t('input.namePlaceholder')}
            maxLength={20}
            value={form.name}
            editable={false}
            clearButton={false}
          />
          <MedicleInput
            label={<Text>{t('input.company')}</Text>}
            placeholder={t('input.companyPlaceholder')}
            style={{ marginTop: 10 }}
            maxLength={50}
            onChangeText={text => handleOnChange('company', text)}
            value={form.company}
            errText={error.company && error.company}
          />
          <MedicleInput
            label={<Text>{t('input.phone')}</Text>}
            placeholder={t('input.phonePlaceholder')}
            style={{ marginTop: 10 }}
            maxLength={11}
            value={form.phone}
            editable={false}
            clearButton={false}
          />
          <MedicleInput
            label={<Text>{t('input.comment')}</Text>}
            placeholder={t('input.commentPlaceholder')}
            onChangeText={text => handleOnChange('content', text)}
            value={form.content}
            editable={true}
            multiline={true}
            numberOfLines={4}
            maxLength={200}
            style={{ marginTop: 10 }}
            customHeight={200}
            errText={error.content && error.content}
          />
        </View>
      </ScrollView>
      <MedicleButton
        text="문의하기"
        onPress={handleSend}
        buttonStyle={{ height: 50 }}
        disabled={!buttonDisabled}
      />
      <LoadingModal visible={loading} />
    </SafeAreaView>
  );
};
