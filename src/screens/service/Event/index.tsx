import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';
import { convertPrice } from '@/utils/utilities';

import style from './style';

const Event = ({ navigation }) => {
  const { t } = useTranslation();

  const [productList, setProductList] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const EVENT_HEADER_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    weight: 'bold',
    size: 20,
  });
  const EVENT_DISCRIPT_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 14,
  });
  const EVENT_DATE_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 12,
  });

  React.useEffect(() => {
    getEventProducts();
  }, []);

  const getEventProducts = async () => {
    const eventId = 2;
    try {
      // request param < - event id?
      const res = await api.getEventProducts(eventId, page);
      setProductList(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.event')} />
      <View style={style.eventPanel}>
        <Text style={[EVENT_HEADER_FONT, { marginBottom: 8 }]}>
          MDI 토큰 결제시 할인 이벤트
        </Text>
        <Text style={[EVENT_DISCRIPT_FONT, { marginBottom: 30 }]}>
          새로운 결제방식으로 각종 할인혜택을 받으세요!
        </Text>
        <Text style={[EVENT_DATE_FONT]}>2022.11.14 ~ 2023.11.14</Text>
      </View>
      {productList.length > 0 ? (
        <FlatList
          style={style.contentWrap}
          data={productList}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              image={item.main_image}
              type="고객평가우수병원"
              location={item.hospital_address.substring(0, 2)}
              label={item.hospital_name}
              description={item.product_name}
              discount={item.discount}
              price={convertPrice(item?.price)}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT_DETAIL, { id: item.id })
              }
            />
          )}
        />
      ) : (
        <View style={style.contentWrap}>
          <Text style={{ textAlign: 'center' }}>
            등록된 이벤트가 없습니다.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Event;
