import * as React from 'react';
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import Accordion from "@/components/Accordion";
import {MedicleInput} from "@/components/inputs";
import Header from "@/components/Header";
import style from "./style";
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";
import {CustomCheckbox} from "@/components/common";
import MedicleButton from "@/buttons/MedicleButton";
import {convertPrice} from "@/utils/utilities";

export default ({
  navigation,
  route,
}) => {
  const { itemData } = route.params;

  const SECTION_HEADER_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const SECTION_COMMENT_FONT = fontStyleCreator({
    size: 10,
    weight: 'normal',
    color: Colors.Medicle.Font.Gray.Light,
  });
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title='진료 문의하기' />
      <ScrollView>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text>상품정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text>
                {itemData?.company.name}
                &nbsp;-&nbsp;
                {itemData?.pc_name}
              </Text>
              <Text style={SECTION_HEADER_FONT}>
                {convertPrice(itemData?.pc_price)}
                &nbsp;
                <Text style={SECTION_COMMENT_FONT}>
                  &nbsp;
                  VAT | comment
                </Text>
              </Text>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text>예약자 정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <MedicleInput style={style.input} label={<Text>test</Text>}/>
              <MedicleInput style={style.input} label={<Text>test</Text>}/>
              <MedicleInput style={style.input} label={<Text>test</Text>}/>
              <MedicleInput style={style.input} label={<Text>test</Text>} multiline={true}/>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion>
            <Accordion.Header>
              <Text>TEST</Text>
            </Accordion.Header>
            <Accordion.Body>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={style.chargeWrap}>
          <Text>회원은 ...</Text>
          <View style={style.checkDocsWrap}>
            <CustomCheckbox style={style.checkDoc} selected={false}>
              <Text style={style.checkDocLabel}>doc 1</Text>
            </CustomCheckbox>
            <CustomCheckbox style={style.checkDoc} selected={false}>
              <Text style={style.checkDocLabel}>doc 2</Text>
            </CustomCheckbox>
          </View>
        </View>
      </ScrollView>
      <MedicleButton
        buttonStyle={{ height: 52 }}
        onPress={() => console.log()}
        text="진료 문의하기"
        disabled={true}
      />
    </SafeAreaView>
  )
}
