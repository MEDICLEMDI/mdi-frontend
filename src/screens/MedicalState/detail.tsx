import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import Accordion from '@/components/Accordion';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import Tab from '@/components/Tab';
import { Colors } from '@/constants/theme';
import { Row } from '@/layout';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [tabIndex, setTabIndex] = React.useState(0);

  const DETAIL_HEADER_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const DETAIL_LABEL_FONT = fontStyleCreator({
    size: 14,
    color: Colors.Medicle.Font.Gray.Standard,
  });
  const DETAIL_CONTENT_FONT = fontStyleCreator({
    size: 14,
    color: Colors.Medicle.Font.Gray.Dark,
  });

  const tabs = [{ label: '진료정보' }, { label: '남은진료' }];

  const data = [{ name: '', price: 90000 }];

  const detail = [
    { label: 'A', content: 'medicalState' },
    { label: 'B', content: 'medicalState' },
    { label: 'C', content: 'medicalState' },
    { label: 'D', content: 'medicalState' },
    { label: 'E', content: 'medicalState' },
    { label: 'F', content: 'medicalState' },
    { label: 'G', content: 'medicalState' },
    { label: 'H', content: '오른쪽 상단 어금니 충치 치료 완료' },
  ];

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.medicalState')} />
      <View style={style.content}>
        <Text style={style.detailHeader}>진료 현황 내역</Text>
        <Tab
          data={tabs}
          tabStyle={style.tabWrap}
          buttonStyle={style.tabButton}
          response={setTabIndex}
        />
      </View>
      <ScrollView style={style.content}>
        {data.map(({ name, price }, key) => (
          <BoxDropShadow key={key} style={style.detailWrap}>
            <Accordion isOpen={true}>
              <Accordion.Header>
                <Text style={[DETAIL_HEADER_FONT]}>TEST</Text>
              </Accordion.Header>
              <Accordion.Body>
                <View style={{ marginTop: 10 }}>
                  {detail.map(({ label, content }, key) => (
                    <Row
                      key={key}
                      justify="space-between"
                      align="flex-start"
                      style={style.detailRow}>
                      <Text
                        style={[
                          style.detailText,
                          style.detailTextLabel,
                          DETAIL_LABEL_FONT,
                        ]}>
                        {label}
                      </Text>
                      <Text
                        style={[
                          style.detailText,
                          style.dentalTextContent,
                          DETAIL_CONTENT_FONT,
                        ]}>
                        {content}
                      </Text>
                    </Row>
                  ))}
                </View>
              </Accordion.Body>
            </Accordion>
          </BoxDropShadow>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
