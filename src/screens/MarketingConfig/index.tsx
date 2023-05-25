import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';

import Header from '@/components/Header';
import MedicleSwitch from '@/components/buttons/MedicleSwitch';
import api from '@/components/Api';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';
import { getStorageData } from '@/utils/localStorage';

import style from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCustomToast from '@/hooks/useToast';

export default () => {
  const { t } = useTranslation();
  const [marketingAgree, setMarketingAgree] = React.useState(false);
  const { showToast } = useCustomToast();

  React.useEffect(() => {
    getMarketingFlag();
  }, [])

  /**
   * 스토리지 유저 데이터에서 유저의 마켓팅 수신 동의 상태를 확인
   */
  const getMarketingFlag = async () => {
    const userInfo = await getStorageData("@User");
    if (userInfo.is_marketing_agree) setMarketingAgree(true)
    else setMarketingAgree(false)
  }

  /**
   * 마케팅 수신동의, 비동의 처리
   */
  const updateMarketingFlag = async () => {
    try {
      const reulst = await api.updateMarketingFlag(!marketingAgree);
      await AsyncStorage.setItem("@User", JSON.stringify(reulst));
      setMarketingAgree(!marketingAgree);
    } catch (err) {
      console.error(err);
      showToast('처리중 오류가 발생하였습니다.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.marketing')} />
      <View style={{ paddingHorizontal: 30 }}>
        <View style={style.pageHeaderWrap}>
          <Text style={[fontStyleCreator({ weight: 'bold', size: 14 }), {marginBottom: 10}]}>
            {t('setting.marketing')}
          </Text>
          <Text
            style={fontStyleCreator({
              weight: 'bold',
              color: Colors.Medicle.Font.Gray.Standard,
              size: 12,
            })}>
            이벤트 및 혜택에 대한 다양한 정보를 미리 받아보실 수 있어요.
          </Text>
        </View>
        <MedicleSwitch
          viewStyle={style.switchLayout}
          label="마케팅 수신동의 (메일/SMS)"
          direction="row"
          value={marketingAgree}
          onValueChange={() => updateMarketingFlag()}
        />
      </View>
      
    </SafeAreaView>
  );
};
