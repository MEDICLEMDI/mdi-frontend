import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import Clipboard from '@react-native-clipboard/clipboard';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import Header from '@/components/Header';
import {
  ITEM_INFO_GRAY,
  SECTION_CONTENTS,
  SECTION_HEADER,
} from '@/constants/theme';
import Icon from '@/icons';
import { Column, Row } from '@/layout';

import style from './style';
import { Portal } from 'react-native-portalize';
import Review from '../Review';
import MedicleButton from '@/components/buttons/MedicleButton';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import useCustomToast from '@/hooks/useToast';
import Config from 'react-native-config';

const ReviewList = ({ company_id, visible, closeHandler }) => {
  const isFocus = useIsFocused();
  const [page, setPage] = React.useState(1);
  const [reviews, setReviews] = React.useState<any>([]);
  const [isLoading, setLoding] = React.useState(true);
  const [init, setInit] = React.useState(0);
  const [isMore, setIsMore] = React.useState(false);
  const [lastCalled, setLastCalled] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (visible) {
      setPage(1);
      setReviews([]);
      if (init === 0) {
        setInit(1);
        getReviews();
      }
    }
  }, [visible]);

  const getReviews = async () => {
    try {
      const response = await api.getReviews(company_id, page);
      const data = response.data;
      if (response.message === 'isMore') {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoding(false);
    }
  };

  const getMoreReviews = async () => {
    if (visible && isMore) {
      const currentTime = new Date().getTime();

      if (lastCalled === null || currentTime - lastCalled >= 500) {
        try {
          setLastCalled(currentTime);

          const response = await api.getReviews(company_id, page + 1);
          const data = response.data;
          if (response.message === 'isMore') {
            setIsMore(true);
          } else {
            setIsMore(false);
          }

          if (data.length === 5 && data !== null) {
            setPage(page + 1);
          }

          // 중복 제거
          const tempArr = reviews.concat(data);
          const dataFilter = tempArr.filter((review, index, self) => {
            self.findIndex(f => {}) === index;
          });
          setReviews(tempArr);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return (
    <Portal>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          closeHandler(false);
        }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <Row align="center" style={{ padding: 20 }} justify="space-between">
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                closeHandler(!visible);
                setInit(0);
              }}>
              <Icon name="arrowLeft" />
            </TouchableOpacity>
            <Text style={{ flex: 1, textAlign: 'center' }}>병원 리뷰</Text>
            <Text style={{ flex: 1 }}></Text>
          </Row>
          {isLoading && <ActivityIndicator />}
          {reviews.length > 0 ? (
            <FlatList
              style={{ flex: 1 }}
              onEndReached={reviews.length > 0 ? () => getMoreReviews() : null}
              onEndReachedThreshold={0.1}
              nestedScrollEnabled={true}
              contentContainerStyle={{ minHeight: '100%' }}
              keyExtractor={item => item.id}
              data={reviews}
              renderItem={({ item }) => (
                <BoxDropShadow key={item.id} style={style.reviewItem}>
                  <Row justify="space-between" align="flex-start">
                    <View style={style.reviewIcon}>
                      <Icon name="user" stroke="#333333" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[SECTION_CONTENTS]}>
                        {item.user_name}
                        {item.id}
                      </Text>
                      <View>
                        <Text style={[SECTION_CONTENTS, { marginVertical: 5 }]}>
                          {item.content}
                        </Text>
                      </View>
                      <Text style={ITEM_INFO_GRAY}>
                        {dayjs(item.date).format('MM.DD')} 예약
                      </Text>
                    </View>
                  </Row>
                </BoxDropShadow>
              )}
            />
          ) : (
            <View style={style.empty}>
              <Text>등록된 후기가 없습니다.</Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

const HospitalDetail = ({ navigation, route }) => {
  const { id, name } = route.params;
  const [hospitalData, setHospitalData] = React.useState<any>();
  const [timeTable, setTimeTable] = React.useState<any>([]);
  const [isVisible, setVisible] = React.useState(false);
  const { showToast } = useCustomToast();
  const { IMAGESERVER_PREFIX } = Config;

  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {}, [hospitalData]);

  const day = ['월', '화', '수', '목', '금', '토', '일'];
  const P0 = { latitude: 0, longitude: 0 };

  const initialize = async () => {
    await getHospitalDetail();
  };

  const getHospitalDetail = async () => {
    try {
      const company = await api.getHospitalDetail(id);
      setHospitalData(company);
      setTimeTable(company.timetable);
    } catch (err) {
      console.error(err);
    }
  };

  const timeConvertor = (time: string) => {
    if (time === undefined) {
      return null;
    }

    const times = time.split(':');
    let prefix = '';
    let hour: number | string = Number(times[0]);
    let minute: number | string = Number(times[1]);

    if (hour > 11) {
      prefix = '오후';
      if (hour !== 12) {
        hour = hour - 12;
      }
    } else {
      prefix = '오전';
    }

    return `${prefix} ${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  };

  const handleCopyAddress = () => {
    Clipboard.setString(hospitalData.ci_address);
    showToast('복사가 완료되었습니다.');
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={name} />
        {hospitalData ? (
          <ScrollView style={style.container}>
            <View style={style.imageBox}>
              <Image
                source={{
                  uri: `${IMAGESERVER_PREFIX}${hospitalData?.ci_image_main}`,
                }}
                resizeMode="cover"
                style={style.image}
              />
            </View>
            <View style={style.hospitalInfoWrap}>
              <Text style={[SECTION_HEADER, style.sectionHeader]}>
                진료시간
              </Text>
              {timeTable.length > 0 ? (
                timeTable.map(
                  (time, key) =>
                    time.ct_holiday === 0 && (
                      <Row key={key} style={style.timeTableRow}>
                        <Text style={[SECTION_CONTENTS, { flex: 1 }]}>
                          {day[time.ct_day - 1]}요일
                        </Text>
                        <Text style={[SECTION_CONTENTS, { flex: 5 }]}>
                          {timeConvertor(time?.ct_work_start)}
                          &nbsp;~&nbsp;
                          {timeConvertor(time?.ct_work_end)}
                        </Text>
                      </Row>
                    )
                )
              ) : (
                <ActivityIndicator />
              )}
              <Column style={style.mapWrap}>
                <Text style={[SECTION_HEADER, style.sectionHeader]}>주소</Text>
                <Row justify="space-between">
                  <Text style={style.locationAddress}>
                    {hospitalData?.ci_address}
                  </Text>
                  <TouchableOpacity onPress={handleCopyAddress}>
                    <Text>주소 복사</Text>
                  </TouchableOpacity>
                </Row>
                <View style={style.map}>
                  {hospitalData &&
                  hospitalData.ci_latitude + hospitalData.ci_longitude !== 0 ? (
                    <NaverMapView
                      style={{ width: '100%', height: '100%' }}
                      showsMyLocationButton={true}
                      center={{
                        ...{
                          longitude: hospitalData?.ci_longitude,
                          latitude: hospitalData?.ci_latitude,
                        },
                        zoom: 16,
                      }}
                      onTouch={e =>
                        console.warn('onTouch', JSON.stringify(e.nativeEvent))
                      }
                      onCameraChange={e =>
                        console.warn('onCameraChange', JSON.stringify(e))
                      }
                      onMapClick={e =>
                        console.warn('onMapClick', JSON.stringify(e))
                      }>
                      <Marker
                        coordinate={{
                          longitude: hospitalData?.ci_longitude,
                          latitude: hospitalData?.ci_latitude,
                        }}
                        onClick={() => console.warn('onClick! p0')}
                      />
                    </NaverMapView>
                  ) : (
                    <Text>지도가 아직 등록되지 않았습니다.</Text>
                  )}
                </View>
              </Column>
            </View>
            <View style={{ flex: 1 }}>
              <MedicleButton
                text="병원 후기 보기"
                buttonStyle={{ paddingVertical: 15 }}
                onPress={() => {
                  setVisible(!isVisible);
                }}
              />
              <ReviewList
                company_id={id}
                visible={isVisible}
                closeHandler={setVisible}
              />
            </View>
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      
    </SafeAreaView>
  );
};
export default HospitalDetail;
