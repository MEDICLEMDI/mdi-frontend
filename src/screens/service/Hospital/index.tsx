import * as React from 'react';
import {useTranslation} from "react-i18next";
import { SafeAreaView, ScrollView, View } from "react-native";

import ListItem from "@/components/ListItem";
import Tab from "@/components/Tab";
import Header from "@/components/Header";
import style from "./style";
import Routes from "@/navigation/Routes";
import product from "@/components/ApiProduct";
import {convertPrice} from "@/utils/utilities";

const Hospital = ({ navigation }) => {
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(1);

  const [productGroups, setProductGroups] = React.useState<any>([]);
  const [productItems, setProductItems] = React.useState<any>([]);

  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {
    getProductGroupItems();
  }, [index]);

  const initialize = async () => {
    await getProductGroups();
  };

  const getProductGroups = async () => {
    let tabArray: any = [];
    try {
      const data = await product.getProductGroups();
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
      const data = await product.getProductGroupItems(index);
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

      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        {
          productItems.map((item, key) => (
            <ListItem
              key={key}
              image={item.pc_image_main}
              type="고객평가우수병원"
              location={item.company.ci_address.substring(0,2)}
              label={item.company.name}
              description={item.pc_name}
              discount={20}
              price={convertPrice(item?.pc_price)}
              onPress={() => navigation.navigate(Routes.HOSPITAL_DETAIL, {id: item.id})}
            />
          ))
        }
      </ScrollView>
      {/*<View style={style.noData}>*/}
      {/*  <Text>등록된 병원이 없습니다.</Text>*/}
      {/*</View>*/}
    </SafeAreaView>
  )
}

export default Hospital;
