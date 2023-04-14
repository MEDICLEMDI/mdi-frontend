import { CommonActions, useIsFocused } from '@react-navigation/native';
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
import Tab from '@/components/Tab';
import Toast from '@/components/Toast';
import {
  DARK_GRAY_10,
  DARK_GRAY_12,
  DARK_GRAY_BOLD_16,
  ORANGE_BOLD_10,
  ORANGE_BOLD_12,
  STANDARD_GRAY_10,
} from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { IProductItem, responseDTO } from '@/interfaces/api';
import { Column, Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { convertPrice } from '@/utils/utilities';

import style from './style';

const HospitalCategory = ({ navigation, route }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const { groupId } = route.params;
  const cooldownRef = React.useRef(null);

  const [index, setIndex] = React.useState(1);
  const [productGroups, setProductGroups] = React.useState<any>([]);
  const [productList, setProductList] = React.useState<IProductItem[]>([]);
  const [search, setSearch] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const toastRef = React.useRef(null);

  React.useEffect(() => {
    getProductGroups();
    // 화면 이동시 기본 병원 화면으로 초기화
    return () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Routes.HOSPITAL }],
        })
      );
      setIndex(groupId);
      setPage(1);
      setProductList([]);
    };
  }, []);

  React.useEffect(() => {
    setIndex(groupId);
  }, [isFocus]);

  React.useEffect(() => {
    setPage(1);
    getProductGroupItems();
  }, [index]);

  const getProductGroups = async () => {
    let tabArray: any = [];
    try {
      const data = await api.getProductGroups(search);
      data.forEach((item, key) => {
        tabArray[key] = {
          label: item.pg_name.split(' '),
          index: Number(item.id),
        };
      });
    } catch (err) {
      console.error(err);
    }
    setProductGroups(tabArray);
  };

  const getProductGroupItems = React.useCallback(async () => {
    try {
      const data = await api.getProductGroupItems(index, 1, search);
      setProductList(data);
    } catch (err) {
      console.error(err);
    }
  }, [index, groupId]);

  const getMoreProductItems = async () => {
    if (cooldownRef.current) {
      // the function has already been called recently
      return;
    }

    // handle button press
    setLoading(true);
    const nextPage = page + 1;
    try {
      const data = await api.getProductGroupItems(index, nextPage, search);
      if (data.length !== 0) {
        setProductList(productList.concat(data));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setPage(nextPage);
    }

    // set a timeout to prevent the function from being called again too soon
    cooldownRef.current = setTimeout(() => {
      cooldownRef.current = null;
    }, 3000);
  };

  const handleSetLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response: responseDTO = await api.setLikeProducts(request);
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

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')} />
      <View style={style.searchInput}>
        <MedicleInput
          placeholder={t('input.searchInputPlaceHolder')}
          rightInputNode={
            <TouchableOpacity onPress={() => getProductGroupItems()}>
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
            data={productGroups}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            index={groupId}
            response={setIndex}
          />
        </ScrollView>
      </View>

      {productList.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 20, flex: 1 }}
          keyExtractor={(item, key) => item.id.toString()}
          onEndReached={getMoreProductItems}
          onEndReachedThreshold={0.4}
          ListFooterComponent={<>{loading && <ActivityIndicator />}</>}
          data={productList}
          renderItem={({ item }) => (
            <BoxDropShadow key={item.id} style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.PRODUCT_DETAIL, { id: item.id })
                }>
                <Image
                  source={{ uri: item.main_image }}
                  style={{ minHeight: 85, minWidth: 295, borderRadius: 10 }}
                />
                <Row justify="space-between" align="center">
                  <Text style={DARK_GRAY_12}>{item.product_name}</Text>
                  <TouchableOpacity onPress={() => handleSetLike(item.id)}>
                    {item?.like ? (
                      <Icon name="heart" fill={Colors.Medicle.Brown.Standard} />
                    ) : (
                      <Icon
                        name="heart"
                        stroke={Colors.Medicle.Gray.Standard}
                      />
                    )}
                  </TouchableOpacity>
                </Row>
                <Text style={DARK_GRAY_BOLD_16}>{item.hospital_name}</Text>
                <Row
                  align="center"
                  justify="space-between"
                  style={{ marginTop: 8 }}>
                  <Column>
                    <Text style={DARK_GRAY_10}>
                      {item?.hospital_address.split(' ')[0]}
                      &nbsp;|&nbsp;
                      {item?.hospital_address.split(' ')[1]}
                    </Text>
                  </Column>
                </Row>
                <Row align="flex-end" justify="space-between">
                  <Text style={STANDARD_GRAY_10}>
                    후기 <Text style={ORANGE_BOLD_10}>{item?.review}</Text>개
                  </Text>
                  <View>
                    {item.discount > 0 && (
                      <Text
                        style={[
                          ORANGE_BOLD_12,
                          { marginBottom: 5, marginTop: -19 },
                        ]}>
                        {item.discount}%
                      </Text>
                    )}
                    <Text style={DARK_GRAY_BOLD_16}>
                      {convertPrice(item.price)}
                      <Text style={STANDARD_GRAY_10}> VAT 포함</Text>
                    </Text>
                  </View>
                </Row>
              </TouchableOpacity>
            </BoxDropShadow>
          )}
        />
      ) : (
        <View style={style.empty}>
          <Text style={style.emptyText}>현재 등록된 상품이 없습니다.</Text>
        </View>
      )}

      {/*<View style={style.noData}>*/}
      {/*  <Text>등록된 병원이 없습니다.</Text>*/}
      {/*</View>*/}
      <Toast ref={toastRef} />
    </SafeAreaView>
  );
};

export default HospitalCategory;
