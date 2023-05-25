import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import api from '@/components/Api';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import Routes from '@/navigation/Routes';
import { convertPrice } from '@/utils/utilities';

import style from './style';
import Config from 'react-native-config';
import { ResponseDTO } from '@/interfaces/api';
import { handleUpdateProductLike } from '@/utils/like';
import useCustomToast from '@/hooks/useToast';

const Event = ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const { showToast } = useCustomToast();

  const { IMAGESERVER_PREFIX } = Config;
  const width = Dimensions.get('window').width;

  const [productList, setProductList] = React.useState<any>([]);
  const [imageUri, setImageUri] = React.useState('');
  const [isMore, setIsMore] = React.useState(true); // 다음페이지 존재여부
  const [eventId, setEventId] = React.useState<number>(); // 이벤트 카테고리 넘저
  const [page, setPage] = React.useState(1);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    initialize();
    return () => (route.params = undefined);
  }, []);

  /**
   * 페이지 초기화
   */
  const initialize = async () => {
    setImageUri('');
    setPage(1);
    setProductList([]);
    setIsMore(true);

    // 특정 이벤트 배너를 클릭하며 페이지 접근했는지 여부 확인 및 그에 따라 다른 처리
    if (route.params !== undefined) {
      setEventId(route.params.event_id);
      await getEventProducts(1, route.params.event_id);
    } else {
      await getEventProducts(1);
    }
  };

  /**
   * 이벤트에 소속된 상품 리스트 가져오기
   * @param _page 
   * @param _eventId 
   */
  const getEventProducts = async (
    _page: number,
    _eventId?: number | undefined
  ) => {
    try {
      setLoading(true);

      const response = await api.getEventProducts(_page, _eventId);
      const { data, message } = response;

      setPage(_page);
      setIsMore(message === 'isMore');
      setEventId(Number(data?.event_id));
      setImageUri(`${IMAGESERVER_PREFIX}${data?.event_banner}`);

      const arr = productList.concat(data?.item);
      setProductList(arr);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 상품 좋아요 등록/해제
   * @param product_id 
   */
  const handleSetLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response = await api.setLikeProducts(request);
      if (response.result) {
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
      <Header goBack={false} title={t('header.event')} />
      <View style={style.eventPanel}>
        {imageUri === '' ? (
          <ActivityIndicator />
        ) : (
          <Image
            source={{ uri: imageUri }}
            style={{ width: width, height: width / 2 }}
            resizeMode="contain"
          />
        )}
      </View>
      {productList.length > 0 ? (
        <FlatList
          style={style.contentWrap}
          keyExtractor={({ item }, index) => index.toString()}
          onEndReached={() =>
            isMore ? getEventProducts(page + 1, eventId) : null
          }
          onEndReachedThreshold={0.1}
          ListFooterComponent={<>{isLoading && <ActivityIndicator />}</>}
          data={productList}
          renderItem={({ item }: any) => (
            <ListItem
              key={item.id}
              image={`${IMAGESERVER_PREFIX}${item.sub_image}`}
              type="고객평가우수병원"
              location={item.hospital_address.substring(0, 2)}
              label={item.hospital_name}
              description={item.product_name}
              discount={item.discount}
              price={convertPrice(item.price)}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT_DETAIL, { id: item.id })
              }
              likeOnpress={() => handleSetLike(item.id)}
              like={item.like}
            />
          )}
        />
      ) : (
        <View style={style.contentWrap}>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <Text style={{ textAlign: 'center' }}>등록된 상품이 없습니다.</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Event;
