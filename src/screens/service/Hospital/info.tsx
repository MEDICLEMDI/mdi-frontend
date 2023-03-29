import * as React from 'react';
import {SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity} from "react-native";

import Header from "@/components/Header";
import BoxDropShadow from "@/components/BoxDropShadow";
import MedicleButton from "@/buttons/MedicleButton";
import {MedicleInput} from "@/components/inputs";
import {CustomCheckbox} from "@/components/common";
import {fontStyleCreator} from "@/utils/fonts";
import {Column, Row} from "@/layout";

import {Colors} from "@/constants/theme";
import style from './style';

import {CustomModal} from "@/components/Modals";
import Icon from "@/icons";
import Spacing from "@/components/Spacing";
import Calendar from "../../../Calendar";
import {useIsFocused} from "@react-navigation/native";
import Routes from "@/navigation/Routes";
import api from "@/components/Api";
import {convertPrice} from "@/utils/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HospitalDetail = ({
  navigation,
  route,
}) => {
  const isFocus = useIsFocused();
  const { id } = route.params;
  const [hospitalData, setHospitalData] = React.useState<any>();
  const [timeTable, setTimeTable] = React.useState<any>([]);
  const [reviews, setReviews] = React.useState<any>([]);
  const [date, setDate] = React.useState({ from: '' });


  React.useEffect(() => {
    initialize();
  }, [])

  const initialize = async () => {
    await getHospitalDetail();
  }

  const getHospitalDetail = async () => {
    try {
      const data = await api.getHospitalDetail(id);
      setHospitalData(data);
      setTimeTable(data.timeTable);
      setReviews(data.review);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={hospitalData?.name} />
      <ScrollView style={style.container}>
        <Image source={{ uri: hospitalData?.ci_image_main }} resizeMode='cover' style={style.image}/>
        <View style={{ padding: 30, borderBottomWidth: 10, borderBottomColor: '#efefef' }}>
          <Text>진료시간</Text>
          {
            timeTable.map((time) => (
              <Row>
                <Text>{time.ct_work_start}</Text>
                <Text>~</Text>
                <Text>{time.ct_work_end}</Text>
              </Row>
            ))
          }
          <Column>
            <Row justify='space-between'>
              <Text>{hospitalData?.ci_address}</Text>
              <TouchableOpacity>
                <Text>주소 복사</Text>
              </TouchableOpacity>
            </Row>
            <View style={{ height: 125, borderRadius: 10, backgroundColor: '#efefef' }} />
          </Column>
        </View>
        <View style={{ padding: 30 }}>
          {
            reviews.map((item) => (
              <BoxDropShadow style={{ marginBottom: 10 }}>
                <Text>{item.cr_title}</Text>
                <Text>{item.cr_contents}</Text>
              </BoxDropShadow>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HospitalDetail;
