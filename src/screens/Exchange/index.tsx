import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Header from '@/components/Header';
import Icon from '@/icons';
import api from '@/components/Api';
import style from './style';
import BoxDropShadow from '@/components/BoxDropShadow';
import { Row } from '@/layout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [isInit, setInit] = React.useState(false);
  const [exchangeList, setExchangeList] = React.useState([]);

  React.useEffect(() => {
    getExchangeList();
  }, []);

  const getExchangeList = async () => {
    try {
      const data = await api.getExchangeList();
      setExchangeList(data);
      setInit(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.exchange')} />
      <View style={style.content}>
        {exchangeList.length > 0 ? (
          exchangeList.map(exchange => (
            <BoxDropShadow>
              <TouchableOpacity onPress={() => Linking.openURL(exchange.link)}>
                <Row align="center">
                  <Icon name={exchange.name} style={{ height: 12, width: 12 }} />
                  <Row
                    justify="space-between"
                    align="center"
                    style={{ flex: 1 }}>
                    <Text style={{ marginLeft: 15 }}>{exchange.name.toUpperCase()}</Text>
                    <Icon name="arrowRight" />
                  </Row>
                </Row>
              </TouchableOpacity>
            </BoxDropShadow>
          ))
        ) : (
          <View style={style.noData}>
            {isInit ? (
              <Text>등록된 거래소 정보가 없습니다.</Text>
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
