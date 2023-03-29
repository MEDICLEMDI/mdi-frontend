import * as React from 'react';
import {useTranslation} from "react-i18next";
import {ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";

import ListItem from "@/components/ListItem";
import Tab from "@/components/Tab";
import Header from "@/components/Header";
import style from "./style";
import Routes from "@/navigation/Routes";
import api from "@/components/Api";
import {convertPrice} from "@/utils/utilities";
import {CommonActions, useIsFocused} from "@react-navigation/native";
import {Column, Row} from "@/layout";
import Icon from "@/icons";
import BoxDropShadow from "@/components/BoxDropShadow";
import {Colors} from "@/constants/theme";
import {fontStyleCreator} from "@/utils/fonts";
import {
  COMPANY_LOCATION,
  PRODUCT_COMPANY,
  PRODUCT_GROUP, PRODUCT_HIGHLIGHT, PRODUCT_INFO, PRODUCT_INFO_BROWN, PRODUCT_INFO_GRAY,
  PRODUCT_PRICE,
  PRODUCT_PRICE_DISCOUNT, PRODUCT_REVIEW_COUNT
} from "@/constants/fonts";
import {MedicleInput} from "@/components/inputs";

const HospitalCategory = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const { groupId } = route.params;
  const cooldownRef = React.useRef(null);

  const [index, setIndex] = React.useState(1);
  const [productGroups, setProductGroups] = React.useState<any>([]);
  const [productList, setProductList] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    initialize();

    // 화면 이동시 기본 병원 화면으로 초기화
    return () => navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Routes.HOSPITAL }],
      })
    );
  }, [isFocus]);

  const initialize = React.useCallback(async () => {
    await getProductGroups();
    setIndex(groupId);
  }, [isFocus]);

  React.useEffect(() => {
    setPage(1);
    getProductGroupItems();
  }, [index])

  const getProductGroups = async () => {
    let tabArray: any = [];
    try {
      const data = await api.getProductGroups(search);
      data.forEach((item, key) => {
        tabArray[key] = { label: item.pg_name.split(' '), index: Number(item.id) }
      })
    }
    catch (err) {
      console.error(err);
    }
    setProductGroups(tabArray);
  }

  const getProductGroupItems = React.useCallback(async () => {
    try{
      const data = await api.getProductGroupItems(index);
      setProductList(data);
    }
    catch (err) {
      console.error(err);
    }
  }, [index]);

  const getMoreProductItems = async () => {
    if (cooldownRef.current) {
      // the function has already been called recently
      return;
    }

    // handle button press
    setLoading(true);
    const nextPage = page + 1;
    try {
      const data = await api.getMoreProductItems(index, nextPage, search);
      if(data.length !== 0) setProductList(productList.concat(data));
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
      setPage(nextPage);
    }

    // set a timeout to prevent the function from being called again too soon
    cooldownRef.current = setTimeout(() => {
      cooldownRef.current = null;
    }, 3000);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')}/>
      <View style={style.searchInput}>
        <MedicleInput
          placeholder={t('input.searchInputPlaceHolder')}
          rightInputNode={<Icon name="search" />}
          direction='row'
          onChangeText={(text) => setSearch(text)}
          inputButtonNode={
            <TouchableOpacity onPress={() => getProductGroupItems()}>
              <Text>
                Search
              </Text>
            </TouchableOpacity>}
        />
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Tab
            data={productGroups}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            index={index}
            response={setIndex}
          />
        </ScrollView>
      </View>


      <FlatList
        style={{ paddingHorizontal: 20, flex: 1 }}
        keyExtractor={(item, key) => item.id.toString()}
        onEndReached={getMoreProductItems}
        onEndReachedThreshold={0.4}
        ListFooterComponent={<>{loading && <ActivityIndicator />}</>}
        data={productList}
        renderItem={({item}) => (
          <BoxDropShadow key={item.id} style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.PRODUCT_DETAIL, {id: item.id})}>
              <Image source={{ uri: item.pc_image_main}} style={{ minHeight: 85, minWidth: 295, borderRadius: 10 }} />
              <Row justify='space-between' align='center'>
                <Text style={PRODUCT_GROUP}>{item.pc_name}</Text>
                <Icon name='heart' stroke={Colors.Medicle.Gray.Standard} />
              </Row>
              <Text style={PRODUCT_COMPANY}>{item.company?.name}</Text>
              <Row align='center' justify='space-between' style={{ marginTop: 8 }}>
                <Column>
                  <Text style={PRODUCT_INFO_BROWN}>
                    {item?.company.ci_address.split(' ')[0]}
                    &nbsp;|&nbsp;
                    {item?.company.ci_address.split(' ')[1]}
                  </Text>
                </Column>
              </Row>
              <Row align='flex-end' justify='space-between'>
                <Text style={PRODUCT_INFO_GRAY}>후기 <Text style={PRODUCT_REVIEW_COUNT}>999</Text>개</Text>
                <View>
                  {
                    item.pc_discount_percent> 0 &&
                    <Text style={[PRODUCT_PRICE_DISCOUNT, { marginBottom: 5, marginTop: -19 }]}>{item.pc_discount_percent}%</Text>
                  }
                  <Text style={PRODUCT_PRICE}>
                    {convertPrice(item.pc_price)}
                    <Text style={PRODUCT_INFO}>VAT 포함</Text>
                  </Text>
                </View>
              </Row>
            </TouchableOpacity>
          </BoxDropShadow>
        )}
      />
      {/*<View style={style.noData}>*/}
      {/*  <Text>등록된 병원이 없습니다.</Text>*/}
      {/*</View>*/}
    </SafeAreaView>
  )
};

export default HospitalCategory;
