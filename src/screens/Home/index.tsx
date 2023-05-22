import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Modal,
} from 'react-native';

import ReviewImage from '@/assets/images/Review.png';
import api from '@/components/Api';
import { ScrollViewGrid } from '@/components/GridLayout';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import Tab from '@/components/Tab';
import { covnertIcons } from '@/constants/menuBuilder';
import { Colors } from '@/constants/theme';
import ImageSlider from '@/components/ImageSlider';
import { responseDTO } from '@/interfaces/api';
import Routes from '@/navigation/Routes';
import { convertPrice } from '@/utils/utilities';

import style from './style';
import Config from 'react-native-config';
import { handleUpdateProductLike } from '@/utils/like';
import useCustomToast from '@/hooks/useToast';
import { Portal } from '@gorhom/portal';
import Icon from '@/components/icons';
import useStores from '@/hooks/useStores';

const Home = () => {
  const navigation = useNavigation();
  const { rootStore } = useStores();
  const { appManageStore } = rootStore;

  const { showToast } = useCustomToast();
  const { IMAGESERVER_PREFIX } = Config;

  // menu datas
  const [index, setIndex] = React.useState(appManageStore.selected());
  const [companyTypes, setCompanyTypes] = React.useState<any>([]);

  const [productGroups, setProductGroups] = React.useState<any>([]);
  const [newestProduct, setNewestProduct] = React.useState<any>([]);
  const [eventList, setEventList] = React.useState([]);
  const [exitApp, setExitApp] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const numColumns = 3;
  const categoryPadding = 30;
  const gap = 15;

  
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      const backAction = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else if (exitApp === false) {
          showToast('한번 더 누르면 앱이 종료됩니다.');
          setExitApp(true);
          setTimeout(() => {
            setExitApp(false);
          }, 2000); //2초
        } else {
          BackHandler.exitApp();
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [exitApp, navigation]);

  React.useEffect(() => {
    tabBuilder();
    getEvents();
  }, []);

  React.useEffect(() => {
    pageRenderer(index)
  }, [index])

  const tabBuilder = () => {
    const data = appManageStore.getData();
    // set types
    const { companyGroup } = data;
    setCompanyTypes(companyGroup);
  }

  const pageRenderer = async (_index: number) => {
    const data = appManageStore.getData();
    appManageStore.select(_index);
    const { productGroup } = data;

    const groupFilter = productGroup.filter((group: any) => Number(group.pg_company_type) === Number(_index));
    const generateMenus: any[] = [];

    for (const group of groupFilter) {
      generateMenus.push({ id: group.id, name: group.pg_name, icon: covnertIcons(group.id - 1) })
    }

    if ((generateMenus.length) % 3 !== 0) {
      generateMenus.push({ empty: true });
    } 

    setProductGroups(generateMenus);

    try {
      // set newest product
      const newest = await api.getNewestProducts(_index)
      setNewestProduct(newest);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const getEvents = async () => {
    try {
      // set event list
      const { data } = await api.getEventLists();
      const eventArr: any = [];
      for(const event of data) {
        eventArr.push({ 
          uri: event.main_image, 
          onPress: () => navigation.navigate(Routes.EVENT, { event_id: event.event_id, main_image: event.main_image })
        })
      }
      setEventList(eventArr);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSetProductLike = async (product_id: string) => {
    try {
      const request = {
        product_id: product_id,
      };
      const response: responseDTO = await api.setLikeProducts(request);
      if (response.result) {
        const temp = handleUpdateProductLike(newestProduct, product_id);
        setNewestProduct(temp);
      } else {
        throw 'error';
      }
    } catch (error) {
      console.error(error);
      showToast('처리중 오류가 발생하였습니다.');
    }
  };

  if(isLoading) {
    return (
      <Portal>
        <Modal animationType="fade" transparent={true} visible={true} style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#FFF',
        }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="mdiHorizontal" />
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" />
            </View>
          </View>
        </Modal>
      </Portal>
    )
  }


  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} />
      <ScrollView horizontal={false}>
        <View style={{ flex: 1 }}>
          <ImageSlider data={eventList}/>

          <Tab
            data={companyTypes}
            tabStyle={style.tabWrap}
            buttonStyle={style.tabButton}
            response={setIndex}
            index={appManageStore.selected()}
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
            data={productGroups}
            renderItem="box"
            onPress={item => {
              navigation.navigate(Routes.PRODUCT, { groupId: item.id });
            }}
          />

          <View style={style.reviewWrap}>
            <Image
              source={ReviewImage}
              resizeMode="contain"
              style={style.reviewImage}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            { !isLoading && newestProduct.map((item, key) => (
              <ListItem
                key={item.id}
                image={`${IMAGESERVER_PREFIX}${item.sub_image}`}
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
