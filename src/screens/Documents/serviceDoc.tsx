import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { termsList } from '@/interfaces/sign';
import { handleGetTerms } from '@/utils/terms';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from './serviceDocStyle';
import Icon from '@/components/icons';
import WebViewModal from '@/components/Modals/WebView';
import useCustomToast from '@/hooks/useToast';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const { showToast } = useCustomToast();
  const [url, setUrl] = React.useState<string>('');
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const [terms, setTerms] = React.useState<termsList>({
    service: '',
    privacy: '',
    provision: '',
    financial: '',
    location: '',
  });
  const data = [
    ['메디클 서비스 이용약관', terms.service],
    ['개인정보 처리방침', terms.privacy],
    ['개인정보 제3자 제공', terms.provision],
    ['전자금융거래 이용약관', terms.financial],
    ['위치기반서비스 이용약관', terms.location],
  ];

  React.useEffect(() => {
    initTerms();
  }, []);

  React.useEffect(() => {
  }, [terms]);

  const initTerms = async () => {
    const tempTerms = await handleGetTerms();
    setTerms(tempTerms);
  };

  const handleWebViewVisible = async (url: string) => {
    if (url) {
      setUrl(url);
      setWebViewVisible(true);
    } else {
      toastRef.current!.show('처리중 오류가 발생하였습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.document')} />
      <View style={{ paddingHorizontal: 30 }}>
        {data.map((item, key) => {
          return (
            <TouchableOpacity
              key={key}
              style={style.mt10}
              onPress={() => handleWebViewVisible(item[1])}>
              <BoxDropShadow style={style.shadowBox}>
                <Text>{item[0]}</Text>
                <Icon name="arrowRight" />
              </BoxDropShadow>
            </TouchableOpacity>
          );
        })}
      </View>
      <WebViewModal
        url={url}
        visible={webViewVisible}
        onClose={() => setWebViewVisible(false)}
      />
      
    </SafeAreaView>
  );
};