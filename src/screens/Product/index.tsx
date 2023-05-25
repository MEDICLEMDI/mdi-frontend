import { CommonActions, useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
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
import useCustomToast from '@/hooks/useToast';
import {
  DARK_GRAY_10,
  DARK_GRAY_12,
  DARK_GRAY_BOLD_16,
  ORANGE_BOLD_10,
  ORANGE_BOLD_12,
  STANDARD_GRAY_10,
} from '@/constants/theme';
import Icon from '@/icons';
import { IProductItem, ResponseDTO } from '@/interfaces/api';
import { Column, Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { convertPrice } from '@/utils/utilities';

import style from '../Hospital/style';
import Config from 'react-native-config';
import { handleUpdateProductLike } from '@/utils/like';
import useStores from '@/hooks/useStores';

const Product = ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const { IMAGESERVER_PREFIX } = Config;
  const isFocus = useIsFocused();
  const { rootStore } = useStores();
  const { appManageStore } = rootStore;

  const { showToast } = useCustomToast();

  const [groupId, setGroupId] = React.useState<number | undefined>(); // 병원과에 따라 치료항목 (임플란트, 충치 등)
  const [productGroups, setProductGroups] = React.useState<any>([]);  // 상품 항목 전체 (ex, 치과일 경우 치과에 대한 진료 항목 전체)
  const [productList, setProductList] = React.useState<IProductItem[]>([]);
  const [serachEditable, setSerachEditable] = React.useState(true); // 검색창 잠금,해제
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const [isMore, setIsMore] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getProductGroups();
  }, [isFocus]);
  
  React.useEffect(() => {
    initialize();
  }, [groupId]);

  React.useEffect(() => {
    // 홈 에서 카테고리를 클릭해서 마운트 했는지 체크
    if (route.params !== undefined) {
      setGroupId(route.params.groupId);
    }
  }, [route.params]);
  
  /**
   * 화면초기화
   */
  const initialize = async () => {
    setLoading(true);
    setProductList([]);
    setPage(1); // 페이지 초기화
    setSearch('');
    setSerachEditable(true);
    getProductGroupItems(groupId, 1, '');
  };

  /**
   * 상품리스트 검색
   */
  const searchHandler = async () => {
    if (search !== '') {
      setSerachEditable(false);
      await getProductGroupItems(groupId, 1, search);
    }
  };

  /**
   * 진료과에 따라 항목들 가져오기
   */
  const getProductGroups = async () => {
    setProductGroups([]);
    const data = appManageStore.getData();
    const index = appManageStore.selected();
    const { productGroup } = data;

    const groupFilter = productGroup.filter((group: any) => Number(group.pg_company_type) === (index));
    const generateMenus: any[] = [];

    for (const group of groupFilter) {
      generateMenus.push({ id: group.id, name: group.pg_name })
    }

    setProductGroups(generateMenus);
    setGroupId(generateMenus[0].id);
  };

  /**
   * 진료 항목에 대한 상품 리스트
   * @param _index 
   * @param _page 
   * @param _search 
   * @returns 
   */
  const getProductGroupItems = async (_index: number | undefined, _page: number, _search: string) => {
    setLoading(true);
    // 페이지 진입시 한번만 조회를 처리하기 위한 조건
    if(_index === undefined) return false;    
    try {
      const response = await api.getProductGroupItems(_index, _page, _search);
      setIsMore(response.message === 'isMore');
      setPage(_page);
      if(_page > 1){
        const arr = productList.concat(response.data!);
        setProductList(arr);
      } else {
        setProductList(response.data!);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * 상품 좋아요 설정/해제
   * @param product_id 
   */
  const handleSetLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response = await api.setLikeProducts(request);
      if (response.result) {
        // 좋아요 설정/해제시 랜더링될 화면 처리
        const arr = handleUpdateProductLike(productList, product_id);
        setProductList(arr);
      } else {
        throw 'error';
      }
    } catch (error) {
      console.error(error);
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
                onPress={initialize}>
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
          data={productGroups}
          tabStyle={style.tabWrap}
          buttonStyle={style.tabButton}
          index={groupId!}
          response={setGroupId}
          useScrollIndex={true}
        />
      </View>

      {productList.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item, key) => item.id.toString()}
          onEndReached={ isMore ? () => getProductGroupItems(groupId, page + 1, search) : null }
          onEndReachedThreshold={0.1}
          ListFooterComponent={<>{isLoading && <ActivityIndicator />}</>}
          data={productList}
          renderItem={({ item }) => (
            <BoxDropShadow
              key={item.id}
              style={{ marginBottom: 10, marginHorizontal: 25 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.PRODUCT_DETAIL, { id: item.id })
                }>
                <View style={style.listImageBox}>
                  <Image
                    source={{ uri: `${IMAGESERVER_PREFIX}${item.main_image}` }}
                    style={{ flex: 1, borderRadius: 10 }}
                    resizeMode="contain"
                  />
                </View>
                <Row justify="space-between" align="center">
                  <Text style={DARK_GRAY_12}>{item.product_name}</Text>
                  <TouchableOpacity onPress={() => handleSetLike(item.id)}>
                    {item?.like ? (
                      <Icon name="heart" fill="#EDDFCC" />
                      ) : (
                      <Icon name="heart" stroke="#CECECE" />
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
                    후기{' '}
                    <Text style={ORANGE_BOLD_10}>{item?.review_count ? item?.review_count : 0}</Text>개
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
          )}
        />
      ) : (
        <View style={style.empty}>
          { isLoading
            ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
              </View>
            : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text>조회된 상품이 없습니다.</Text>
              </View>
          }
        </View>
      )}
      
    </SafeAreaView>
  );
};

export default Product;
