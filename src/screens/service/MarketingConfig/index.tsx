import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from "react-native";

import Header from '@/components/Header';

export default () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.marketing')} />
      <View style={{ paddingHorizontal: 30 }}>
        <Text>{t('setting.marketing')}</Text>
        <Text>
          이벤트 및 혜택에 대한 다양한 정보를 미리 받아보실 수 있어요.
        </Text>
        <View>
          <Text>메일 수신동의</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
