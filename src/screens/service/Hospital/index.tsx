import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import ListItem from '@/components/ListItem';
import Tab from '@/components/Tab';
import {
  DARK_GRAY_10,
  DARK_GRAY_BOLD_16, ORANGE_BOLD_10, STANDARD_GRAY_10

} from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { Column, Row } from '@/layout';
import Routes from '@/navigation/Routes';
import style from '@/screens/service/Hospital/style';
import { convertPrice } from '@/utils/utilities';

const Hospital = ({ navigation, route }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState<any>([]);
  const [hospitalList, setHospitalList] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    searchList();
    setProductList([]);
    setPage(1);
  }, [index]);

  const searchList = async () => {
    if (index === 0) {
      await getEventItemLists();
    }
    if (index === 1) {
      await getReviewRankLists();
    }
    if (index === 2) {
      await getHospitalList();
    }
  };

  const getEventItemLists = async () => {
    try {
      const data = await api.getEventProducts(page, search);
      setProductList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getReviewRankLists = async () => {
    try {
      const data = await api.getReviewRankLists(page, search);
      setProductList(data);
    } catch (err) {
      console.error(err);
    }
  }

  const getHospitalList = async () => {
    try {
      const data = await api.getHospital(page, search);
      setHospitalList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMoreProductItems = () => {};

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')} />
      <View style={style.searchInput}>
        <MedicleInput
          placeholder={t('input.searchInputPlaceHolder')}
          rightInputNode={
            <TouchableOpacity onPress={() => searchList()}>
              <Icon name="search" />
            </TouchableOpacity>
          }
          direction="row"
          onChangeText={text => setSearch(text)}
        />
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Tab
            data={[
              { name: '이벤트 상품' },
              { name: '리뷰 많은 순' },
              { name: '병원 찾기' },
            ]}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            // index={index}
            response={setIndex}
          />
        </ScrollView>
      </View>
      {index === 2 ? (
        <FlatList
          style={{ paddingHorizontal: 20, flex: 1 }}
          keyExtractor={(item, key) => item.id.toString()}
          onEndReached={getMoreProductItems}
          onEndReachedThreshold={0.4}
          ListFooterComponent={loading && <ActivityIndicator />}
          data={hospitalList}
          renderItem={({ item }) => (
            <BoxDropShadow style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.HOSPITAL_DETAIL, { id: item.id })
                }>
                <Row justify="space-between" align="center">
                  <Image
                    source={{ uri: item.ci_image_main }}
                    style={{ minWidth: 90, minHeight: 90, borderRadius: 10 }}
                  />
                  <Column style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={[DARK_GRAY_BOLD_16, { marginTop: 10 }]}>
                      {item.name}
                    </Text>
                    <Text style={{ marginTop: 5, marginBottom: 15 }}>
                      <Text style={DARK_GRAY_10}>
                        {item?.ci_address.split(' ')[0]}
                        &nbsp;|&nbsp;
                        {item?.ci_address.split(' ')[1]}
                      </Text>
                    </Text>
                    <Row justify="space-between" align="flex-start">
                      <Text style={STANDARD_GRAY_10}>
                        후기 <Text style={ORANGE_BOLD_10}>9999</Text>개
                      </Text>
                      <Icon
                        name="heart"
                        stroke={Colors.Medicle.Gray.Standard}
                      />
                    </Row>
                  </Column>
                </Row>
              </TouchableOpacity>
            </BoxDropShadow>
          )}
        />
      ) : (
        <FlatList
          style={{ paddingHorizontal: 20, flex: 1 }}
          keyExtractor={(item, key) => item.id.toString()}
          // onEndReached={getMoreProductItems}
          onEndReachedThreshold={0.4}
          ListFooterComponent={loading && <ActivityIndicator />}
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
              price={convertPrice(item.price)}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT_DETAIL, { id: item.id })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Hospital;
