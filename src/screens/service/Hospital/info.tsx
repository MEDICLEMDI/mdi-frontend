import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
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
} from '@/constants/fonts';
import Icon from '@/icons';
import { Column, Row } from '@/layout';

import style from './style';

const HospitalDetail = ({ navigation, route }) => {
  const isFocus = useIsFocused();
  const { id } = route.params;
  const [hospitalData, setHospitalData] = React.useState<any>();
  const [timeTable, setTimeTable] = React.useState<any>([]);
  const [reviews, setReviews] = React.useState<any>([]);

  React.useEffect(() => {
    initialize();
  }, []);

  const day = ['월', '화', '수', '목', '금', '토', '일'];

  const initialize = async () => {
    await getHospitalDetail();
  };

  const getHospitalDetail = async () => {
    try {
      const { review, company } = await api.getHospitalDetail(id);

      setHospitalData(company);
      setTimeTable(company.timetable);
      setReviews(review);
    } catch (err) {
      console.log(err);
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

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={hospitalData?.name} />
      <ScrollView style={style.container}>
        <Image
          source={{ uri: hospitalData?.ci_image_main }}
          resizeMode="cover"
          style={style.image}
        />
        <View style={style.hospitalInfoWrap}>
          <Text style={[SECTION_HEADER, style.sectionHeader]}>진료시간</Text>
          {timeTable.length > 0
          ? timeTable.map(time => time.ct_holiday === 0 && (
              <Row key={time?.id} style={style.timeTableRow}>
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
          :
          <ActivityIndicator />
          }
          <Column style={style.mapWrap}>
            <Text style={[SECTION_HEADER, style.sectionHeader]}>주소</Text>
            <Row justify="space-between">
              <Text style={style.locationAddress}>
                {hospitalData?.ci_address}
              </Text>
              <TouchableOpacity>
                <Text>주소 복사</Text>
              </TouchableOpacity>
            </Row>
            <View style={style.map} />
          </Column>
        </View>
        <View style={style.reviewWrap}>
          <Text style={[SECTION_HEADER, style.sectionHeader]}>병원 후기</Text>
          {
          reviews.length > 0 
          ? reviews.map(item => (
            <BoxDropShadow key={item?.id} style={style.reviewItem}>
              <Row justify="space-between" align="flex-start">
                <View style={style.reviewIcon}>
                  <Icon name="user" stroke="#333333" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[SECTION_CONTENTS]}>{item.user.name}</Text>
                  <View>
                    <Text style={[SECTION_CONTENTS, { marginVertical: 5 }]}>
                      {item.cr_content}
                    </Text>
                  </View>
                  <Text style={ITEM_INFO_GRAY}>
                    {dayjs(item.appointment.created_at).format('MM.DD')} 예약
                  </Text>
                </View>
              </Row>
            </BoxDropShadow>
          ))
          : <Text>등록된 후기가 없습니다</Text>
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HospitalDetail;
