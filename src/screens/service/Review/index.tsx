import * as React from 'react';
import {ScrollView, View, Text, SafeAreaView} from "react-native";
import Accordion from "@/components/Accordion";
import MedicleButton from "@/buttons/MedicleButton";

import style from './style'
import Header from "@/components/Header";
import {MedicleInput} from "@/components/inputs";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";

const Review = ({
  navigation,
  route,
}) => {
  // const { data } = route.params;

  const REVIEW_HEADER_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const REVIEW_HEADER_COMMENT = fontStyleCreator({
    size: 10,
    weight: 'normal',
    color: Colors.Medicle.Font.Gray.Light,
  });

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title="리뷰작성" />
      <ScrollView style={style.container}>
        <View style={[style.content, style.borderBottom]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={REVIEW_HEADER_FONT}>상품 정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={style.accordionBody}>
                <Text style={[REVIEW_HEADER_FONT, { marginBottom: 10 }]}>title</Text>
                <Text style={REVIEW_HEADER_FONT}>
                  price
                  &nbsp;
                  <Text style={REVIEW_HEADER_COMMENT}>
                    &nbsp;
                    VAT | comment
                  </Text>
                </Text>
              </View>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={style.content}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={REVIEW_HEADER_FONT}>예약자 정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={style.accordionBody}>
                <MedicleInput style={style.input} placeholder="placeholder" label={<Text>name</Text>} />
                <MedicleInput style={style.input} placeholder="placeholder" label={<Text>phone</Text>} />
                <MedicleInput style={style.input} placeholder="placeholder" label={<Text>email</Text>} />
                <MedicleInput style={style.input} placeholder="placeholder" label={<Text>coment</Text>} multiline={true}/>
              </View>
            </Accordion.Body>
          </Accordion>
        </View>
      </ScrollView>
      <MedicleButton buttonStyle={style.button} text='리뷰작성' />
    </SafeAreaView>
  )
}

export default Review;
