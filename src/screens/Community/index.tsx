import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';

import style from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Row } from '@/components/layout';
import { IExtLink } from '@/interfaces/api';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const [communityList, setCommunityList] = React.useState<IExtLink[]>([]);

  React.useEffect(() => {
    getCommunityList();
  }, [])

  /**
   * 등록된 커뮤니티 리스트 가져오기 (카카오톡, 트위터 등)
   */
  const getCommunityList = async () => {
    try {
      const data = await api.getCommunityList();
      setCommunityList(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('menus.community')} />
      <ScrollView>
        {/* <ImageSlide /> */}
        <View style={style.content}>
          <Text style={{ marginTop: 30, marginLeft: 30, }}>공식 SNS</Text>
          <View style={style.snsLinkWrap}>
            {
            communityList.length > 0
            ?
            communityList.map((community, key) => (
              <BoxDropShadow key={key} style={{ marginBottom: 20 }}>
                <TouchableOpacity onPress={() => Linking.openURL(community.link)}>
                  <Row justify="space-between" align="center">
                    <Row justify="space-between" align="center">
                      <Icon name={community.name} />
                      <Text style={{ marginLeft: 20 }}>{community.name.toUpperCase()} 바로가기</Text>
                    </Row>
                    <Icon name="arrowRight" />
                  </Row>
                </TouchableOpacity>
              </BoxDropShadow>
            ))
            :
            <View>
              <Text>데이터를 불러올 수 없습니다.</Text>
            </View>
          }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
