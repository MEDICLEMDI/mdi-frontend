import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import {
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
      const data = await api.getHospitalDetail(id);
      setHospitalData(data.company);
      setTimeTable(data.company.timeTable);
      setReviews(data.review);

      sorting();
    } catch (err) {
      console.log(err);
    }
  };

  const sorting = () => {
    const sortingArr = [];
    const prevData: {
      ct_work_start: string | undefined;
      ct_work_end: string | undefined;
    } = { ct_work_start: undefined, ct_work_end: undefined };
    timeTable.forEach(time => {
      if (time.ct_work_start === prevData.ct_work_start) {
        console.log(time.ct_day);
      }
      if (
        prevData.ct_work_end === undefined &&
        prevData.ct_work_start === undefined
      ) {
        prevData.ct_work_start = time.ct_work_start;
        prevData.ct_work_end = time.ct_work_end;
      }
    });
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
        <View
          style={{
            padding: 30,
            borderBottomWidth: 10,
            borderBottomColor: '#efefef',
          }}>
          <Text>진료시간</Text>
          {timeTable.map(
            time =>
              time.ct_holiday === 0 && (
                <Row key={time?.id}>
                  <Text>{day[time.ct_day - 1]}요일 </Text>
                  <Text>{timeConvertor(time?.ct_work_start)}</Text>
                  <Text>~</Text>
                  <Text>{timeConvertor(time?.ct_work_end)}</Text>
                </Row>
              )
          )}
          <Column>
            <Row justify="space-between">
              <Text>{hospitalData?.ci_address}</Text>
              <TouchableOpacity>
                <Text>주소 복사</Text>
              </TouchableOpacity>
            </Row>
            <View
              style={{
                height: 125,
                borderRadius: 10,
                backgroundColor: '#efefef',
              }}
            />
          </Column>
        </View>
        <View style={{ padding: 30 }}>
          {reviews.map(item => (
            <BoxDropShadow
              key={item?.id}
              style={{ marginBottom: 10, paddingLeft: 25 }}>
              <Row justify="space-between" align="flex-start">
                <View
                  style={{
                    marginRight: 20,
                    padding: 15,
                    borderRadius: 50,
                    borderColor: '#EFEFEF',
                    borderWidth: 1,
                  }}>
                  <Icon name="user" stroke="#333333" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{item.user.name}</Text>
                  <View>
                    <Text>{item.cr_contents}</Text>
                  </View>
                  <Text>{item.appointment.created_at}</Text>
                </View>
              </Row>
            </BoxDropShadow>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HospitalDetail;
