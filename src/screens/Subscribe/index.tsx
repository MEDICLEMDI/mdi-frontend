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
import {
  DARK_GRAY_10,
  DARK_GRAY_12,
  DARK_GRAY_BOLD_16,
  ORANGE_BOLD_10,
  ORANGE_BOLD_12,
  STANDARD_GRAY_10,
} from '@/constants/theme';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { ICompanyItem, IProductItem, ResponseDTO } from '@/interfaces/api';
import { Column, Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';
import { convertPrice } from '@/utils/utilities';

import style from './style';
import Config from 'react-native-config';
import useCustomToast from '@/hooks/useToast';
import useStores from '@/hooks/useStores';

export default ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const { rootStore } = useStores();
  const { appManageStore } = rootStore;

  const TOTAL_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const [index, setIndex] = React.useState(1);
  const [productList, setProductList] = React.useState<IProductItem[]>([]);
  const [productGroup, setProductGroup] = React.useState<any[]>([]);
  const { showToast } = useCustomToast();
  const [hospitalList, setHospitalList] = React.useState<ICompanyItem[]>([]);
  const [isInit, setIsInit] = React.useState(false);

  const { IMAGESERVER_PREFIX } = Config;

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

  /**
   * 페이지초기화 (관심상품,병원리스트 불러오기)
   */
  const init = async () => {
    await handleGetProductList();
    await handleGetCompanyList();
    initProductGroup();
    setIsInit(true);
  };

  /**
   * 상품 진료 항목그룹 가져오기 (치아미백, 치아교정, 임플란트 등)
   */
  const initProductGroup = () => {
    const data = appManageStore.getData();
    const index = appManageStore.selected();
    const { productGroup } = data;

    const groupFilter = productGroup.filter((group: any) => Number(group.pg_company_type) === (index));
    const generateMenus: any[] = [];

    for (const group of groupFilter) {
      generateMenus.push({ id: group.id, name: group.pg_name })
    }

    generateMenus.push({id: 999, name: '병원'})

    setProductGroup(generateMenus);
    setIndex(generateMenus[0].id);
  }

  /**
   * 관심상품 좋아요 해제 (목록에서 삭제)
   * @param product_id 
   */
  const hadneSetProductLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response = await Api.setLikeProducts(request);
      if (response.result) {
        removeProductById(product_id);
      } else {
        throw 'error';
      }
    } catch (error) {
      console.error(error);
      showToast('처리중 오류가 발생하였습니다.');
    }
  };

  /**
   * 관심병원 좋아요 해제 (목록에서 삭제)
   * @param company_id 
   */
  const handleSetHospitalLike = async (company_id: string) => {
    try {
      const request = {
        company_id: company_id,
      };
      const response = await Api.setLikeCompanys(request);
      if (response.result) {
        removeCompanyById(company_id);
      } else {
        throw 'error';
      }
    } catch (error) {
      console.error(error);
      showToast('처리중 오류가 발생하였습니다.');
    }
  };

  /**
   * 좋아요 해제된 병원 가지고 있는 데이터에서 삭제하기 (화면에서도 삭제됨)
   * @param company_id 
   */
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

  /**
   * 좋아요 해제된 상품 가지고 있는 데이터에서 삭제하기 (화면에서도 삭제됨)
   * @param product_id 
   */
  const removeProductById = (product_id: string) => {
    const targetProductIndex = productList.findIndex(
      product => product.product_id === product_id
    );

    if (targetProductIndex !== -1) {
      const updatedProductList = [...productList]; // 기존 productList를 복사하여 새 배열을 생성
      updatedProductList.splice(targetProductIndex, 1); // 대상 인덱스에서 1개의 요소를 제거
      setProductList(updatedProductList);
    }
  };

  const filteredProductList = productList.filter(
    item => Number(item.product_group) === Number(index)
  );

  const fillterHospitalList = hospitalList.filter(
    item => Number(item.cg_type_id) === Number(appManageStore.selected())
  );

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.subscribe')} />
      <View style={style.container}>
        <View style={[style.summary, style.content]}>
          {index === 9 ? (
            <Text style={TOTAL_FONT}>전체 {hospitalList.length}개</Text>
          ) : (
            <Text style={TOTAL_FONT}>전체 {productList.length}개</Text>
          )}
        </View>
        <View style={style.content}>
          <Tab
            data={productGroup}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            index={index}
            response={setIndex}
          />
        </View>
        {index !== 999 ? (
          filteredProductList.length > 0 ? (
            <FlatList
              style={{ paddingHorizontal: 20, flex: 1 }}
              keyExtractor={(item, key) => item.id}
              // ListFooterComponent={<>{loading && <ActivityIndicator />}</>}
              data={productList}
              renderItem={({ item }) => {
                if (Number(item.product_group) === Number(index)) {
                  return (
                    <BoxDropShadow key={item.id} style={{ marginBottom: 10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(Routes.PRODUCT_DETAIL, {
                            id: item.id,
                          })
                        }>
                        <View style={style.imageBox}>
                          <Image
                            source={{ uri: `${IMAGESERVER_PREFIX}${item.main_image}` }}
                            style={{
                              flex: 1,
                              borderRadius: 10,
                            }}
                            resizeMode="contain"
                          />
                        </View>

                        <Row justify="space-between" align="center">
                          <Text style={DARK_GRAY_12}>{item.product_name}</Text>
                          <TouchableOpacity
                            onPress={() => hadneSetProductLike(item.id)}>
                            {item?.like ? (
                             <Icon name="heart" fill="#EDDFCC" />
                             ) : (
                             <Icon name="heart" stroke="#CECECE" />
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
            isInit && (
              <View style={style.noData}>
                <Text>등록된 관심상품이 없습니다.</Text>
              </View>
            )
          )
        ) : hospitalList.length > 0 ? (
          <FlatList
            style={{ paddingHorizontal: 20, flex: 1 }}
            keyExtractor={(item, key) => item.id.toString()}
            data={fillterHospitalList}
            renderItem={({ item }) => (
              <BoxDropShadow style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Routes.HOSPITAL_DETAIL, { id: item.id })
                  }>
                  <Row justify="space-between" align="center">
                    <Image
                      source={{ uri: `${IMAGESERVER_PREFIX}${item.ci_image_main}` }}
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
                            <Icon name="heart" fill="#EDDFCC" />
                            ) : (
                            <Icon name="heart" stroke="#CECECE" />
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
          isInit && (
            <View style={style.noData}>
              <Text>등록된 관심병원이 없습니다.</Text>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};
