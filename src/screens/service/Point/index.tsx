import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import SearchBar from '@/components/forms/SearchHeader';
import Header from '@/components/Header';
import { DatePicker } from '@/components/Modals';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';
import { getStorageData } from '@/utils/localStorage';

import style from './style';

export default ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState();

  React.useEffect(() => {
    getUserPoint();
  }, [date]);

  const FONT_BASIC_BLACK = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

  const getUserPoint = async () => {
    const id = (await getStorageData('@User')).id;
    const res = await api.getUserPoint(id);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.point')} />
      <BoxDropShadow style={[style.pointWrap]}>
        <View style={[style.flexRow]}>
          <Text>메디클 포인트</Text>
          <TouchableOpacity style={style.infoButton}>
            <Text style={FONT_BASIC_BLACK}>이용안내</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.flexRow, { marginVertical: 15 }]}>
          <Icon name="mdiIcon" />
          <Text style={[style.point]}>{0}원</Text>
        </View>
        <Text style={style.pointText}>적립 예정 포인트</Text>
        <View style={[style.flexRow, { justifyContent: 'space-between' }]}>
          <Text>{0}원</Text>
          <TouchableOpacity
            style={style.chargeButton}
            onPress={() => navigation.navigate(Routes.POINT_CHARGE)}>
            <Text style={FONT_BASIC_BLACK}>충전하기</Text>
          </TouchableOpacity>
        </View>
      </BoxDropShadow>
      <View style={style.historyWrap}>
        <SearchBar onPress={() => setVisible(true)} />
        <DatePicker
          name="dataPicker"
          modalDirection="flex-end"
          visible={visible}
          onRequestClose={() => setVisible(false)}
          animationType="slide"
          dateResponse={setDate}
        />
        {/*<FlatList data={} renderItem={}>*/}

        {/*</FlatList>*/}
        <View style={style.histories}>
          <Text>사용 포인트 내역이 없습니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
