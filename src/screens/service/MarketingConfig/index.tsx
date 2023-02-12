import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';

import Header from '@/components/Header';
import MedicleSwitch from '@/components/MedicleSwitch';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export default () => {
  const { t } = useTranslation();

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
          label="메일 수신동의"
          direction="row"
          // onChange={}
        />
        <MedicleSwitch
          label="SMS 수신동의"
          viewStyle={style.switchLayout}
          direction="row"
          // onChange={}
        />
      </View>
    </SafeAreaView>
  );
};
