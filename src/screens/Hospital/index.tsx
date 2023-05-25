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
  TouchableOpacityBase,
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
} from '@/constants/theme';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { ICompanyItem, IProductItem, ResponseDTO } from '@/interfaces/api';
import { Column, Row } from '@/layout';
import Routes from '@/navigation/Routes';
import style from './style';
import { convertPrice } from '@/utils/utilities';
import Config from 'react-native-config';
import useCustomToast from '@/hooks/useToast';
import { handleUpdateProductLike } from '@/utils/like';
import useStores from '@/hooks/useStores';

const { IMAGESERVER_PREFIX } = Config;

const Hospital = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { showToast } = useCustomToast();
  const isFocused = useIsFocused();
  const { rootStore } = useStores();
  const { appManageStore } = rootStore;

  const [productList, setProductList] = React.useState<IProductItem[]>([]);
  const [hospitalList, setHospitalList] = React.useState<ICompanyItem[]>([]);

  const [tabIndex, setTabIndex] = React.useState(1); // 진료항목 카테고리 (교정, 충치, 스케일링 등)
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const [isMore, setIsMore] = React.useState(true);
  const [serachEditable, setSerachEditable] = React.useState(true); // 검색인풋 잠금
  const [isLoading, setLoading] = React.useState(true);
  const [isLoadingList, setLoadingList] = React.useState(true);

  React.useEffect(() => {
    initialize();
  }, [tabIndex, isFocused]);

  /**
   * 화면 초기 셋팅
   */
  const initialize = () => {
    setLoading(true);
    setPage(1); // 페이지 초기화
    setSearch('');
    setSerachEditable(true);
    searchRenderer(tabIndex, 1);
  };

  /**
   * 다음페이지 존재 확인
   * @param isMore 
   */
  const isMoreListener = (isMore: string) => {
    if (isMore === 'isMore') {
      setIsMore(true);
    } else {
      setIsMore(false);
    }
  };

  /**
   * 상품 검색
   */
  const searchHandler = async () => {
    if (search !== '') {
      setSerachEditable(false);
      await searchRenderer(tabIndex, 1, search);
    }
  };

  
  /**
   * 검색결과 탭별로 분기
   * @param _tabIndex 
   * @param _page 
   * @param _search 
   * @returns 
   */
  const searchRenderer = async (
    _tabIndex: number,
    _page: number,
    _search = ''
  ) => {
    setLoadingList(true);
    switch (_tabIndex) {
      case 1:
        return await getEventItemLists(_page, _search);
      case 2:
        return await getReviewRankLists(_page, _search);
      case 3:
        return await getHospitalList(_page, _search);
      default:
        return;
    }
  };

  /**
   * 이벤트 상품리스트 호출
   * @param _page 
   * @param _search 
   */
  const getEventItemLists = async (_page: number, _search: string) => {
    try {
      const response = await api.getAllEventProducts(
        _page,
        appManageStore.selected(),
        _search
      );
      isMoreListener(response.message);
      setPage(_page);
      if (_page > 1) {
        const arr = productList.concat(response.data!);
        setProductList(arr);
      } else {
        setProductList(response.data!);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingList(false);
    }
  };

  /**
   * 리뷰 많은순으로 상품 리스트 호출
   * @param _page 
   * @param _search 
   */
  const getReviewRankLists = async (_page: number, _search: string) => {
    try {
      const response = await api.getReviewRankLists(
        _page,
        appManageStore.selected(),
        _search
      );
      isMoreListener(response.message);
      setPage(_page);
      if (_page > 1) {
        const arr = productList.concat(response.data!);
        setProductList(arr);
      } else {
        setProductList(response.data!);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingList(false);
    }
  };

  /**
   * 등록된 병원 목록 가져오기
   * @param _page 
   * @param _search 
   */
  const getHospitalList = async (_page: number, _search: string) => {
    try {
      const response = await api.getHospital(
        _page,
        appManageStore.selected(),
        _search
      );
      isMoreListener(response.message);
      setPage(_page);
      if (_page > 1) {
        const arr = hospitalList.concat(response.data!);
        setHospitalList(arr);
      } else {
        setHospitalList(response.data!);
      }
      if (isLoading) {
        setHospitalList(() => response.data!);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingList(false);
    }
  };

  /**
   * 병원 좋아요 설정/해제
   * @param company_id 
   */
  const handleSetHospitalLike = async (company_id: string) => {
    try {
      const request = {
        company_id: company_id,
      };
      const response = await api.setLikeCompanys(request);
      if (response.result) {
        handleUpdateHospitalLike(company_id);
      } else {
        throw 'error';
      }
    } catch (error) {
      showToast('처리중 오류가 발생하였습니다.');
    }
  };

  /**
   * 병원 좋아요 설정/해제 에 따른 ui처리작업 (하트 색, 공백)
   * @param company_id 
   */
  const handleUpdateHospitalLike = (company_id: string) => {
    const targetHospitalIndex = hospitalList.findIndex(
      hospital => hospital.id === company_id
    );

    const updatedHospitalList = hospitalList.map((hospital, index) => {
      if (index === targetHospitalIndex) {
        return {
          ...hospital,
          like: !hospital.like,
        };
      }
      return hospital;
    });
    setHospitalList(updatedHospitalList);
  };

  /**
   * 상품 좋아요 설정/해제
   * @param product_id 
   */
  const handleSetProductLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response = await api.setLikeProducts(request);
      if (response.result) {
        // 공용함수 상품리스트에서 특정 상품에 대해 좋아요 설정/해제 시 상품 리스트를 재 취합해줌 (화면 랜더링용도)
        const temp = handleUpdateProductLike(productList, product_id);
        setProductList(temp);
      } else {
        throw 'error';
      }
    } catch (error) {
      showToast('처리중 오류가 발생하였습니다.');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')} />
      <View style={style.searchInput}>
        <MedicleInput
          placeholder={t('input.searchInputPlaceHolder')}
          rightInputNode={
            serachEditable ? (
              <TouchableOpacity
                onPress={searchHandler}
                disabled={!serachEditable}>
                <Icon name="search" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSearch('');
                  setSerachEditable(true);
                  searchRenderer(tabIndex, 1);
                }}>
                <Icon name="close" />
              </TouchableOpacity>
            )
          }
          direction="row"
          onChangeText={text => setSearch(text)}
          value={search}
          editable={serachEditable}
        />
      </View>
      <View>
        <Tab
          data={[
            { id: 1, name: '이벤트 상품' },
            { id: 2, name: '리뷰 많은 순' },
            { id: 3, name: '병원 찾기' },
          ]}
          tabStyle={style.tabWrap}
          buttonStyle={style.tabButton}
          index={tabIndex}
          response={setTabIndex}
          useScrollIndex={true}
        />
      </View>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : tabIndex === 3 ? (
        <HospitalItem
          dataList={hospitalList}
          navigation={navigation}
          onEndReached={() =>
            isMore ? searchRenderer(tabIndex, page + 1, search) : null
          }
          likeHandler={handleSetHospitalLike}
          isLoading={isLoadingList}
        />
      ) : (
        <ProductItem
          dataList={productList}
          navigation={navigation}
          onEndReached={() =>
            isMore ? searchRenderer(tabIndex, page + 1, search) : null
          }
          likeHandler={handleSetProductLike}
          isLoading={isLoadingList}
        />
      )}
    </SafeAreaView>
  );
};

const HospitalItem = ({
  dataList,
  onEndReached,
  navigation,
  likeHandler,
  isLoading,
}: any) => {
  const [hospitals, setHospitals] = React.useState([]);

  React.useEffect(() => {
    setHospitals(dataList);
  }, [dataList]);

  const convertAddressText = (str: string) => {
    const splitAddr = str.split(' ');
    return `${splitAddr[0]} | ${splitAddr[1]}`;
  };

  if (hospitals.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>조회된 병원이 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      keyExtractor={({ item }, index) => index.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={<>{isLoading && <ActivityIndicator />}</>}
      data={hospitals}
      renderItem={({ item }: any) => (
        <BoxDropShadow
          key={item.id}
          style={{ marginBottom: 10, marginHorizontal: 25 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(Routes.HOSPITAL_DETAIL, {
                id: item.id,
                name: item.name,
              })
            }>
            <Row justify="space-between" align="center">
              <Image
                style={{ minWidth: 90, minHeight: 90, borderRadius: 10 }}
                source={{ uri: `${IMAGESERVER_PREFIX}${item.sub_image}` }}
                resizeMode="contain"
              />
              <Column style={{ flex: 1, marginLeft: 20 }}>
                <Text style={[DARK_GRAY_BOLD_16, { marginTop: 10 }]}>
                  {item.name}
                </Text>
                <Text style={{ marginTop: 5, marginBottom: 15 }}>
                  <Text style={DARK_GRAY_10}>
                    {convertAddressText(item.ci_address)}
                  </Text>
                </Text>
                <Row justify="space-between" align="flex-start">
                  <Text style={STANDARD_GRAY_10}>
                    후기{' '}
                    <Text style={ORANGE_BOLD_10}> {item.review_count} </Text> 개
                  </Text>
                  <TouchableOpacity onPress={() => likeHandler(item.id)}>
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
  );
};

const ProductItem = ({
  dataList,
  onEndReached,
  navigation,
  likeHandler,
  isLoading,
}: any) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    setProducts(dataList);
  }, [dataList]);

  if (products.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>조회된 상품이 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      keyExtractor={({ item }, index) => index.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={<>{isLoading && <ActivityIndicator />}</>}
      data={products}
      renderItem={({ item }: any) => (
        <ListItem
          key={item.id}
          image={`${IMAGESERVER_PREFIX}${item.sub_image}`}
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
          likeOnpress={() => likeHandler(item.id)}
        />
      )}
    />
  );
};

export default Hospital;
