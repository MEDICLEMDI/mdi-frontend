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

import Api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import Tab from '@/components/Tab';
import { subscribe } from '@/constants/category';
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
import { ICompanyItem, IProductItem, responseDTO } from '@/interfaces/api';
import { Column, Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';
import { convertPrice } from '@/utils/utilities';

import style from './style';

export default ({ navigation, route }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const TOTAL_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });

  const [index, setIndex] = React.useState(0);
  const [ProductList, setProductList] = React.useState<IProductItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const toastRef = React.useRef(null);
  const [hospitalList, setHospitalList] = React.useState<ICompanyItem[]>([]);

  React.useEffect(() => {
    init();
  }, []);

  async function handleGetProductList() {
    const { data } = await Api.getLikeProducts();
    if (data) {
      setProductList(data);
    }
  }

  async function handleGetCompanyList() {
    const { data } = await Api.getLikeCompanys();
    if (data) {
      setHospitalList(data);
    }
  }

  const init = async () => {
    await handleGetProductList();
    await handleGetCompanyList();
  };

  const hadneSetProductLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response: responseDTO = await Api.setLikeProducts(request);
      if (response.result) {
        removeProductById(product_id);
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
      const response: responseDTO = await Api.setLikeCompanys(request);
      if (response.result) {
        removeCompanyById(company_id);
      } else {
        throw 'error';
      }
    } catch (error) {
      console.error(error);
      toastRef.current.show('처리중 오류가 발생하였습니다.');
    }
  };

  const removeCompanyById = (company_id: string) => {
    const targetHospitalIndex = hospitalList.findIndex(
      hospital => hospital.id === company_id
    );

    if (targetHospitalIndex !== -1) {
      const updatedHospitalList = [...hospitalList]; // 기존 productList를 복사하여 새 배열을 생성
      updatedHospitalList.splice(targetHospitalIndex, 1); // 대상 인덱스에서 1개의 요소를 제거
      setHospitalList(updatedHospitalList);
    }
  };

  const removeProductById = (product_id: string) => {
    const targetProductIndex = ProductList.findIndex(
      product => product.product_id === product_id
    );

    if (targetProductIndex !== -1) {
      const updatedProductList = [...ProductList]; // 기존 productList를 복사하여 새 배열을 생성
      updatedProductList.splice(targetProductIndex, 1); // 대상 인덱스에서 1개의 요소를 제거
      setProductList(updatedProductList);
    }
  };

  const filteredProductList = ProductList.filter(
    item => Number(item.product_group) === index + 1
  );

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.subscribe')} />
      <View style={style.container}>
        <View style={[style.summary, style.content]}>
          {index === 9 ? (
            <Text style={TOTAL_FONT}>전체 {hospitalList.length}개</Text>
          ) : (
            <Text style={TOTAL_FONT}>전체 {ProductList.length}개</Text>
          )}
        </View>
        <View style={style.content}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Tab
              data={subscribe(t)}
              tabStyle={style.tabWrap}
              buttonStyle={style.tabButton}
              response={setIndex}
            />
          </ScrollView>
        </View>
        {index !== 9 ? (
          filteredProductList.length > 0 ? (
            <FlatList
              style={{ paddingHorizontal: 20, flex: 1 }}
              keyExtractor={(item, key) => item.id.toString()}
              ListFooterComponent={<>{loading && <ActivityIndicator />}</>}
              data={ProductList}
              renderItem={({ item }) => {
                if (Number(item.product_group) === index + 1) {
                  return (
                    <BoxDropShadow key={item.id} style={{ marginBottom: 10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(Routes.PRODUCT_DETAIL, {
                            id: item.id,
                          })
                        }>
                        <Image
                          source={{ uri: item.main_image }}
                          style={{
                            minHeight: 85,
                            minWidth: 295,
                            borderRadius: 10,
                          }}
                        />
                        <Row justify="space-between" align="center">
                          <Text style={DARK_GRAY_12}>{item.product_name}</Text>
                          <TouchableOpacity
                            onPress={() => hadneSetProductLike(item.id)}>
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
                        <Text style={DARK_GRAY_BOLD_16}>
                          {item.hospital_name}
                        </Text>
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
                            후기{' '}
                            <Text style={ORANGE_BOLD_10}>
                              {item?.review_count}
                            </Text>
                            개
                          </Text>
                          <View>
                            {Number(item.discount) > 0 && (
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
                  );
                } else {
                  return null;
                }
              }}
            />
          ) : (
            <View style={style.noData}>
              <Text>등록된 관심상품이 없습니다.</Text>
            </View>
          )
        ) : hospitalList.length > 0 ? (
          <FlatList
            style={{ paddingHorizontal: 20, flex: 1 }}
            keyExtractor={(item, key) => item.id.toString()}
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
            <Text>등록된 관심병원이 없습니다.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
