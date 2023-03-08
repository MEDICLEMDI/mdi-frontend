import * as React from 'react';
import {SafeAreaView, ScrollView, View, Text, Image} from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import Header from "@/components/Header";
import BoxDropShadow from "@/components/BoxDropShadow";
import MedicleButton from "@/buttons/MedicleButton";
import {MedicleInput} from "@/components/inputs";
import {CustomCheckbox} from "@/components/common";
import {fontStyleCreator} from "@/utils/fonts";
import {Row} from "@/layout";

import {Colors} from "@/constants/theme";
import style from './style';

import SAMPLE_IMAGE from '@/assets/template_image.jpg';
import {CustomModal} from "@/components/Modals";
import Icon from "@/icons";
import Spacing from "@/components/Spacing";
import Calendar from "../../../Calendar";

const HospitalDetail = ({
  navigation,
  route,
}) => {
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
  const WISH_BUTTON_FONT = fontStyleCreator({
    size: 10,
    color: Colors.Medicle.Font.Gray.Standard,
  });
  const FAQ_BUTTON_FONT = fontStyleCreator({
    size: 12,
    weight: 'bold',
    color: Colors.Medicle.Font.White,
  });
  const PAY_BUTTON_FONT = fontStyleCreator({
    size: 12,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const ALL_CHECK_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const RESERVE_COMMENT_FONT = fontStyleCreator({
    size: 12,
    color: Colors.Medicle.Font.Gray.Standard,
  });

  const [dateType, setDateType] = React.useState('from');
  const [date, setDate] = React.useState({ from: '', to: '' });

  React.useEffect(() => {
    console.log(date);
  }, [date])

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title='예약하기' />
      <ScrollView style={style.container}>
        <View>
          <Image source={SAMPLE_IMAGE} resizeMode='cover' style={style.image}/>
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text></Text>
          <Text style={SECTION_HEADER_FONT}>
            price
            &nbsp;
            <Text style={SECTION_COMMENT_FONT}>
              &nbsp;
              VAT | comment
            </Text>
          </Text>
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text style={[SECTION_HEADER_FONT, style.sectionHeader]}>test</Text>
          <MedicleInput style={style.input} label={<Text>test</Text>} />
          <MedicleInput style={style.input} label={<Text>test</Text>} />
          <MedicleInput style={style.input} label={<Text>test</Text>} />
          <MedicleInput style={style.input} label={<Text>test</Text>} />
          <MedicleInput style={style.input} label={<Text>test</Text>} multiline={true} />
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text style={[SECTION_HEADER_FONT, style.sectionHeader]}>test</Text>
          <MedicleInput style={style.input} label={<Text>test</Text>} editable={false} />
          <MedicleInput style={style.input} label={<Text>test</Text>} editable={false} />
          <MedicleInput style={style.input} label={<Text>test</Text>} editable={false} />
          <MedicleInput style={style.input} label={<Text>test</Text>} editable={false} />
          <MedicleInput style={style.input} label={<Text>test</Text>} editable={false} />
        </View>
        <View style={style.itemDetailWrap}>
            <CustomCheckbox selected={false}>
              <Text style={[style.checkboxLabel, ALL_CHECK_FONT]}>test</Text>
            </CustomCheckbox>
          <View style={style.hr} />
          <CustomCheckbox selected={false} style={style.checkbox}>
            <Text style={style.checkboxLabel}>test</Text>
          </CustomCheckbox>
          <CustomCheckbox selected={false} style={style.checkbox}>
            <Text style={style.checkboxLabel}>test</Text>
          </CustomCheckbox>
          <Text style={[RESERVE_COMMENT_FONT, style.reserveComment]}>document</Text>
        </View>
        <View style={style.itemDetailWrap}>
          <BoxDropShadow>
            <Text>{date}</Text>
            <Text></Text>
            <Text></Text>
            <View>
              <Text></Text>
              <Text>price</Text>
            </View>
          </BoxDropShadow>
        </View>
      </ScrollView>
      <Row align='center' justify='space-between'>
        <MedicleButton
          textStyle={WISH_BUTTON_FONT}
          buttonStyle={[
            style.button,
            style.wishButton,
          ]}
          iconName='heart'
          iconProps={{ stroke: '#CECECE' }}
          text='test' />
        <MedicleButton
          buttonStyle={[
            style.button,
            style.FAQButton,
          ]}
          textStyle={FAQ_BUTTON_FONT}
          text='test' />
        <MedicleButton
          buttonStyle={[
            style.button,
            style.PayButton,
          ]}
          textStyle={PAY_BUTTON_FONT}
          text='test' />
      </Row>
      <CustomModal
        visible={true}
        name='datePicker'
        modalDirection='center'
      >
        <View style={style.datePickerModal}>
          <Row justify='space-between' align='center' style={style.datePickerHeader}>
            <Text>HEADER</Text>
            <Icon name='close' />
          </Row>
          <View>
            <Row justify='space-between' align='center'>
              <MedicleInput
                style={style.dataPickerInput}
                direction='row'
                rightInputNode={<Icon name='calendar'/>}
                editable={false}
              />
              <Spacing size={10} />
              <MedicleInput
                style={style.dataPickerInput}
                direction='row'
                rightInputNode={<Icon name='clock'/>}
                editable={false}
              />
            </Row>
            <Calendar date={date} dateResponse={setDate} dateType={dateType}/>
          </View>
        </View>
      </CustomModal>
    </SafeAreaView>
  )
}

export default HospitalDetail;
