import * as React from 'react';
import {SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity} from "react-native";

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
import {useIsFocused} from "@react-navigation/native";
import Routes from "@/navigation/Routes";

const HospitalDetail = ({
  navigation,
  route,
}) => {
  const isFocus = useIsFocused();
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
  const TIME_SELECTED_FONT = fontStyleCreator({
    size: 13,
    weight: 'bold',
    color: Colors.Medicle.Font.Gray.Dark,
  });
  const TIME_FONT = fontStyleCreator({
    size: 12,
    color: Colors.Medicle.Font.Gray.Standard,
  })

  const [date, setDate] = React.useState({ from: '' });
  const [time, setTime] = React.useState('00:00 ~ 00:00');
  const [timeKey, setTimeKey] = React.useState(0);
  const [dateType, setDateType] = React.useState('from')
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setDate({ from: '2023-00-00' })
  }, [isFocus])


  const timeList = [
    {start: '00:00', end: '00:00'},
    {start: '00:00', end: '00:00'},
    {start: '00:00', end: '00:00'},
    {start: '00:00', end: '00:00'},
    {start: '00:00', end: '00:00'},
  ]

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
          <TouchableOpacity onPress={() => setVisible(true)}>
            <BoxDropShadow>
                <Text>{date.from} {time}</Text>
                <Text></Text>
                <Text></Text>
                <View>
                  <Text></Text>
                  <Text>price</Text>
                </View>
            </BoxDropShadow>
          </TouchableOpacity>
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
          onPress={() => navigation.navigate(Routes.HOSPITAL_CONTACT)}
          textStyle={FAQ_BUTTON_FONT}
          text='test' />
        <MedicleButton
          buttonStyle={[
            style.button,
            style.PayButton,
          ]}
          onPress={() => navigation.navigate(Routes.HOSPITAL_PAYMENT)}
          textStyle={PAY_BUTTON_FONT}
          text='test' />
      </Row>
      <CustomModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        name='datePicker'
        modalDirection='center'
      >
        <View style={style.datePickerModal}>
          <Row justify='space-between' align='center' style={style.datePickerHeader}>
            <Text>HEADER</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name='close' />
            </TouchableOpacity>
          </Row>
          <View style={style.container}>
            <Row justify='space-between' align='center'>
              <MedicleInput
                style={style.dataPickerInput}
                direction='row'
                rightInputNode={<Icon name='calendar'/>}
                editable={false}
                clearButton={false}
                onPressIn={() => setDateType('from')}
                value={date.from}
              />
              <Spacing size={10} />
              <MedicleInput
                style={style.dataPickerInput}
                direction='row'
                rightInputNode={<Icon name='clock'/>}
                editable={false}
                clearButton={false}
                onPressIn={() => setDateType('time')}
                value={time}
              />
            </Row>
            {
              dateType === 'from'
                ?
                <View style={style.calendarWrap}>
                  <Calendar date={date} dateResponse={setDate} dateType={dateType}/>
                </View>
                :
                <View style={style.timeWrap}>
                  {
                    timeList.map(({start, end}, key) => (
                      <TouchableOpacity
                        key={key}
                        disabled={key === timeKey}
                        style={style.timeSelectItem}
                        onPress={() => setTimeKey(key)}
                      >
                        <Text style={key === timeKey ? TIME_SELECTED_FONT : TIME_FONT}>{start} ~ {end}</Text>
                      </TouchableOpacity>
                    ))
                  }
                </View>
            }
          </View>
        </View>
      </CustomModal>
    </SafeAreaView>
  )
}

export default HospitalDetail;
