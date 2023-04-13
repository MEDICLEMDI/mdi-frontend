import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import Api from '@/components/Api';
import Header from '@/components/Header';
import Tab from '@/components/Tab';
import { dentist, subscribe } from '@/constants/category';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const TOTAL_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });

  const [index, setIndex] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isMore, setIsMore] = React.useState(true);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    console.log('인덱스변화', index);
    setPage(1);
    handleGetProductList(index + 1);
  }, [index]);

  const handleGetProductList = async (type: number) => {
    const response = Api.getLikeProducts(type, page);
    console.log(response);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.subscribe')} />
      <View style={[style.container, style.content]}>
        <View style={style.summary}>
          <Text style={TOTAL_FONT}>전체 {0}개</Text>
        </View>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Tab
              data={subscribe(t)}
              tabStyle={style.tabWrap}
              buttonStyle={style.tabButton}
              response={setIndex}
            />
          </ScrollView>
        </View>

        {products.length > 0 ? (
          <View>
            <Text>gd</Text>
          </View>
        ) : (
          <View style={style.noData}>
            <Text>등록된 관심상품이 없습니다.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
