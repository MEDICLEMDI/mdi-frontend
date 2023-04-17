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
  DARK_GRAY_BOLD_16,
  ORANGE_BOLD_10,
  STANDARD_GRAY_10,
} from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { ICompanyItem, IProductItem, responseDTO } from '@/interfaces/api';
import { Column, Row } from '@/layout';
import Routes from '@/navigation/Routes';
import style from '@/screens/service/Hospital/style';
import { convertPrice } from '@/utils/utilities';

const Hospital = ({ navigation, route }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState<IProductItem[]>([]);
  const [hospitalList, setHospitalList] = React.useState<ICompanyItem[]>([]);
  const [search, setSearch] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);
  const toastRef = React.useRef(null);

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
      console.log(data);
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
  };

  const getHospitalList = async () => {
    try {
      const data = await api.getHospital(page, search);
      console.log(data);
      setHospitalList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMoreProductItems = () => {};

  const handleSetProductLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response: responseDTO = await api.setLikeProducts(request);
      console.log(response);
      if (response.result) {
        handleUpdateProductLike(product_id);
      } else {
        throw 'error';
      }
    } catch (error) {
      console.error(error);
      toastRef.current.show('처리중 오류가 발생하였습니다.');
    }
  };

  const handleSetHospitalLike = async (company_id: string) => {
    try {
      const request = {
        company_id: company_id,
      };
      const response: responseDTO = await api.setLikeCompanys(request);
      console.log(response);
      if (response.result) {
        handleUpdateHospitalLike(company_id);
      } else {
        throw 'error';
      }
    } catch (error) {
      console.error(error);
      toastRef.current.show('처리중 오류가 발생하였습니다.');
    }
  };

  const handleUpdateProductLike = (product_id: string) => {
    const targetProductIndex = productList.findIndex(
      product => product.product_id === product_id
    );

    const updatedProductList = productList.map((product, _index) => {
      if (_index === targetProductIndex) {
        return {
          ...product,
          like: !product.like,
        };
      }
      return product;
    });

    setProductList(updatedProductList);
  };

  const handleUpdateHospitalLike = (company_id: string) => {
    const targetHospitalIndex = hospitalList.findIndex(
      hospital => hospital.id === company_id
    );

    const updatedHospitalList = hospitalList.map((hospital, _index) => {
      if (_index === targetHospitalIndex) {
        return {
          ...hospital,
          like: !hospital.like,
        };
      }
      return hospital;
    });

    setHospitalList(updatedHospitalList);
  };

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
        hospitalList.length > 0 ? (
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
                          후기{' '}
                          <Text style={ORANGE_BOLD_10}>
                            {item.review_count}
                          </Text>
                          개
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleSetHospitalLike(item.id)}>
                          {item?.like ? (
                            <Icon
                              name="heart"
                              fill={Colors.Medicle.Brown.Standard}
                            />
                          ) : (
                            <Icon
                              name="heart"
                              stroke={Colors.Medicle.Gray.Standard}
                            />
                          )}
                        </TouchableOpacity>
                      </Row>
                    </Column>
                  </Row>
                </TouchableOpacity>
              </BoxDropShadow>
            )}
          />
        ) : (
          <View style={style.noData}>
            <Text>등록된 병원이 없습니다.</Text>
          </View>
        )
      ) : productList.length > 0 ? (
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
              location={item.hospital_address?.substring(0, 2)}
              label={item.hospital_name}
              description={item.product_name}
              discount={item.discount}
              price={convertPrice(item.price)}
              like={item.like}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT_DETAIL, { id: item.id })
              }
              likeOnpress={() => handleSetProductLike(item.id)}
            />
          )}
        />
      ) : (
        <View style={style.noData}>
          <Text>등록된 상품이 없습니다.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Hospital;
