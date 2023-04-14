import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import ReviewImage from '@/assets/images/Review.png';
import api from '@/components/Api';
import { ScrollViewGrid } from '@/components/GridLayout';
import Header from '@/components/Header';
import ImageSlide from '@/components/ImageSlide';
import { MedicleInput } from '@/components/inputs';
import ListItem from '@/components/ListItem';
import Tab from '@/components/Tab';
import { dentist, tabs } from '@/constants/category';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { IProductItem, responseDTO } from '@/interfaces/api';
import Routes from '@/navigation/Routes';
import { convertPrice } from '@/utils/utilities';

import style from './style';

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [tabIndex, setTabIndex] = React.useState(0);
  const [productGroups, setProductGroups] = React.useState<any>([]);
  const [newestProduct, setNewestProduct] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const toastRef = React.useRef(null);

  const numColumns = 3;
  const categoryPadding = 30;
  const gap = 15;

  React.useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      await getProductGroups();
      await getNewestProducts();
    } catch (err) {
      console.error(err);
    }
  };

  /*
   * 데이터베이스에서 상품 종류를 가져와 각 종류에 맞는 라우터 경로를 설정하여 데이터를 재구성
   * */
  const getProductGroups = async () => {
    try {
      const data = await api.getProductGroups();
      const productGroupList = dentist(t); // constant 상품 그룹

      productGroupList.map((row: any) => {
        const index = data.findIndex(item => item.pg_name === row.name);

        if (index !== -1) {
          productGroupList[index] = {
            ...productGroupList[index],
            id: data[index].id,
          };
        }
      });
      setProductGroups(productGroupList);
    } catch (err) {
      console.error(err);
    }
  };

  const getNewestProducts = async () => {
    try {
      const data = await api.getNewestProducts(page, search);
      setNewestProduct(data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleUpdateProductLike = (product_id: string) => {
    const targetProductIndex = newestProduct.findIndex(
      product => product.product_id === product_id
    );

    const updatedProductList = newestProduct.map((product, _index) => {
      if (_index === targetProductIndex) {
        return {
          ...product,
          like: !product.like,
        };
      }
      return product;
    });

    setNewestProduct(updatedProductList);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <ScrollView horizontal={false}>
        <View>
          {/* 이미지 슬라이더 기능 미구현 상태 */}
          <ImageSlide />

          <View style={style.searchInput}>
            <MedicleInput
              placeholder={t('input.searchInputPlaceHolder')}
              rightInputNode={
                <TouchableOpacity onPress={() => getNewestProducts()}>
                  <Icon name="search" />
                </TouchableOpacity>
              }
              direction="row"
              onChangeText={text => setSearch(text)}
            />
          </View>

          <Tab
            data={tabs(t)}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            response={setTabIndex}
          />
          <ScrollViewGrid
            columnWrapperStyle={style.categoryWrap}
            itemStyle={style.itemStyle}
            itemBackground="#F3F1EB"
            iconStyle={style.iconStyle}
            iconColor={{ fill: Colors.Medicle.Black }}
            textStyle={style.textStyle}
            numColumns={numColumns}
            padding={categoryPadding}
            gap={gap}
            data={productGroups === undefined ? dentist(t) : productGroups}
            renderItem="box"
            onPress={item => {
              const { HOSPITAL, HOSPITAL_CATEGORY } = Routes;
              navigation.navigate(HOSPITAL, {
                params: { groupId: item.id },
                screen: HOSPITAL_CATEGORY,
              });
            }}
          />

          <View style={style.reviewWrap}>
            <Image
              source={ReviewImage}
              resizeMode="contain"
              style={style.reviewImage}
            />
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
            {newestProduct.map((item, key) => (
              <ListItem
                key={item.id}
                image={item.main_image}
                type="고객평가우수병원"
                location={item.hospital_address.substring(0, 2)}
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
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
