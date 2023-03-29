import * as React from 'react';
import {ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import style from "@/screens/service/Hospital/style";
import Header from "@/components/Header";
import Tab from "@/components/Tab";
import {useTranslation} from "react-i18next";
import {useIsFocused} from "@react-navigation/native";
import ListItem from "@/components/ListItem";
import {convertPrice} from "@/utils/utilities";
import Routes from "@/navigation/Routes";
import api from "@/components/Api";
import {MedicleInput} from "@/components/inputs";
import Icon from "@/icons";
import BoxDropShadow from "@/components/BoxDropShadow";
import {
  PRODUCT_INFO_BROWN,
  PRODUCT_INFO_GRAY, PRODUCT_PRICE,
  PRODUCT_PRICE_DISCOUNT_LARGE,
  PRODUCT_PRICE_LARGE, PRODUCT_REVIEW_COUNT
} from "@/constants/fonts";
import {Column, Row} from "@/layout";
import {Colors} from "@/constants/theme";

const Hospital = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState<any>([]);
  const [hospitalList, setHospitalList] = React.useState<any>([]);

  React.useEffect(() => {
    if(index === 0) getEventItemLists();
    if(index === 1) setProductList([]);
    if(index === 2) getHospitalList();

  }, [index]);

  const getEventItemLists = async () => {
    try {
      const data = await api.getEventProducts();
      setProductList(data);
    }
    catch (err) {
      console.error(err);
    }
  }

  const getHospitalList = async () => {
    try {
      const data = await api.getHospital();
      setHospitalList(data);
    }
    catch (err) {
      console.error(err);
    }
  }

  const getMoreProductItems = () => {

  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')}/>
      <View style={style.searchInput}>
        <MedicleInput
          placeholder={t('input.searchInputPlaceHolder')}
          rightInputNode={<Icon name="search" />}
          direction='row'
        />
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Tab
            data={[{ name: '이벤트 상품' }, { name: '리뷰 많은 순' }, { name: '병원 찾기' }]}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            // index={index}
            response={setIndex}
          />
        </ScrollView>
      </View>
      {
        index === 2
        ?
        <FlatList
          style={{ paddingHorizontal: 20, flex: 1 }}
          keyExtractor={(item, key) => item.id.toString()}
          onEndReached={getMoreProductItems}
          onEndReachedThreshold={0.4}
          ListFooterComponent={loading && <ActivityIndicator />}
          data={hospitalList}
          renderItem={({item}) =>(
            <BoxDropShadow style={{ marginBottom: 10, }}>
              <TouchableOpacity onPress={() => navigation.navigate(Routes.HOSPITAL_DETAIL, {id: item.id})}>
                <Row justify='space-between' align='center'>
                  <Image source={{ uri: item.ci_image_main }} style={{ minWidth: 90, minHeight: 90, borderRadius: 10 }} />
                  <Column style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={[PRODUCT_PRICE, { marginTop: 10 }]}>{ item.name }</Text>
                    <Text style={{ marginTop: 5, marginBottom: 15 }}>
                      <Text style={PRODUCT_INFO_BROWN}>
                        {item?.ci_address.split(' ')[0]}
                        &nbsp;|&nbsp;
                        {item?.ci_address.split(' ')[1]}
                      </Text>
                    </Text>
                    <Row justify='space-between' align='flex-start'>
                      <Text style={PRODUCT_INFO_GRAY}>후기 <Text style={PRODUCT_REVIEW_COUNT}>9999</Text>개</Text>
                      <Icon name='heart' stroke={Colors.Medicle.Gray.Standard}/>
                    </Row>
                  </Column>
                </Row>
              </TouchableOpacity>
            </BoxDropShadow>
          )}
        />
        :
        <FlatList
          style={{ paddingHorizontal: 20, flex: 1 }}
          keyExtractor={(item, key) => item.id.toString()}
          onEndReached={getMoreProductItems}
          onEndReachedThreshold={0.4}
          ListFooterComponent={loading && <ActivityIndicator />}
          data={productList}
          renderItem={({item}) =>(
              <ListItem
                key={item.id}
                image={item.pc_image_main}
                type="고객평가우수병원"
                location={item.company?.ci_address.substring(0,2)}
                label={item.company?.name}
                description={item.pc_name}
                discount={item.pc_discount_percent}
                price={convertPrice(item.pc_price)}
                onPress={() => navigation.navigate(Routes.PRODUCT_DETAIL, {id: item.id})}
              />
          )}
        />
      }
    </SafeAreaView>
  )
}

export default Hospital;
