import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {Image, Platform, SafeAreaView, ScrollView, Text, View} from 'react-native';

import ReviewImage from '@/assets/images/Review.png';
import Header from '@/components/Header';
import ImageSlide from '@/components/ImageSlide';
import { dentist, dermatology, tabs } from '@/constants/category';

import style from './style';
import { ScrollViewGrid } from "@/components/GridLayout";
import Tab from "@/components/Tab";
import { MedicleInput } from "@/components/inputs";
import Icon from "@/icons";
import ListItem from "@/components/ListItem";
import {Colors} from "@/constants/theme";
import product from "@/components/ApiProduct";
import {convertPrice} from "@/utils/utilities";

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [tabIndex, setTabIndex] = React.useState(0)
  const [productGroups, setProductGroups] = React.useState<any>([]);
  const [newestProduct, setNewestProduct] = React.useState<any>([]);

  const numColumns = 3;
  const categoryPadding = 30;
  const gap = 15;

  React.useEffect(() => {
    initialize();
  }, [])

  const initialize = async () => {
    try{
      await getProductGroups();
      await getNewestProducts();
    }
    catch (err) {
      console.error(err);
    }
  }

  // constant에 선언되어있는 데이터에 DB에서 불러운 각 항목의 id 값을 추가
  const getProductGroups = async () => {
    try {
      const data = await product.getProductGroups();
      const productGroupList = dentist(t); // constant 상품 그룹

      productGroupList.map((row: any) => {
        const index = data.findIndex((item) => item.pg_name === row.name);

        if(index !== -1 ) {
          productGroupList[index] = {...productGroupList[index], id: Number(data[index].id)}
        }
      })
      setProductGroups(productGroupList);
    }
    catch (err) {
      console.error(err);
    }
  };

  const getNewestProducts = async () => {
    try {
      const data = await product.getNewestProducts();
      setNewestProduct(data);
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <ScrollView horizontal={false}>
        <View>
          <ImageSlide />

          <View style={style.searchInput}>
            <MedicleInput
              placeholder={t('input.searchInputPlaceHolder')}
              rightInputNode={<Icon name="search" />}
              direction='row'
            />
          </View>

          <Tab
            data={tabs(t)}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            index={tabIndex}
            response={setTabIndex}
          />
          <ScrollViewGrid
            columnWrapperStyle={style.categoryWrap}
            itemStyle={style.itemStyle}
            itemBackground='#F3F1EB'
            iconStyle={style.iconStyle}
            iconColor={{ fill: Colors.Medicle.Black }}
            textStyle={style.textStyle}
            numColumns={numColumns}
            padding={categoryPadding}
            gap={gap}
            data={productGroups === undefined ? dentist(t) : productGroups}
            renderItem='box'
            onPress={(item) => console.log(item)}
          />

          <View style={style.reviewWrap}>
            <Image
              source={ReviewImage}
              resizeMode="contain"
              style={style.reviewImage}
            />
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
            {
              newestProduct.map((item, key) => (
                <ListItem
                  key={key}
                  image={item.pc_image_main}
                  type="고객평가우수병원"
                  location={item.company.ci_address.substring(0,2)}
                  label={item.company.name}
                  description={item.pc_name}
                  discount={20}
                  price={convertPrice(item?.pc_price)}
                />
              ))
            }

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
