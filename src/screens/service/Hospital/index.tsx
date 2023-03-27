import * as React from 'react';
import {useTranslation} from "react-i18next";
import {ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";

import ListItem from "@/components/ListItem";
import Tab from "@/components/Tab";
import Header from "@/components/Header";
import style from "./style";
import Routes from "@/navigation/Routes";
import api from "@/components/Api";
import {convertPrice} from "@/utils/utilities";

const Hospital = ({ navigation }) => {
  const { t } = useTranslation();
  const cooldownRef = React.useRef(null);

  const [index, setIndex] = React.useState(1);
  const [productGroups, setProductGroups] = React.useState<any>([]);
  const [productItems, setProductItems] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {
    setPage(1);
    getProductGroupItems();
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
      const data = await api.getMoreProductItems(index, nextPage);
      if(data.length !== 0) setProductItems(productItems.concat(data));
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

  const initialize = async () => {
    await getProductGroups();
  };

  const getProductGroups = async () => {
    let tabArray: any = [];
    try {
      const data = await api.getProductGroups();
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
      setProductItems(data);
    }
    catch (err) {
      console.error(err);
    }
  }, [index]);

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.hospital')}/>
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
        data={productItems}
        renderItem={({item}) => (
          <ListItem
            key={item.id}
            image={item.pc_image_main}
            type="고객평가우수병원"
            location={item.company?.ci_address.substring(0,2)}
            label={item.company?.name}
            description={item.pc_name}
            discount={item.pc_discount_percent}
            price={convertPrice(item.pc_price)}
            onPress={() => navigation.navigate(Routes.HOSPITAL_DETAIL, {id: item.id})}
          />
        )}
      />
      {/*<View style={style.noData}>*/}
      {/*  <Text>등록된 병원이 없습니다.</Text>*/}
      {/*</View>*/}
    </SafeAreaView>
  )
}

export default Hospital;
