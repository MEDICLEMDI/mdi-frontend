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
  const DATE_FONT = fontStyleCreator({
    size: 12,
    weight: 'bold',
    color: Colors.Medicle.Orange,
  })
  const PRODUCT_FONT = fontStyleCreator({
    size: 16,
    weight: 'bold',
    color: Colors.Medicle.Font.Brown.Dark,
  });

  const [itemData, setItemData] = React.useState<any>();
  const [userInfo, setUserInfo] = React.useState<any>();
  const [date, setDate] = React.useState({ from: '' });
  const [time, setTime] = React.useState('');
  const [timeKey, setTimeKey] = React.useState(0);
  const [dateType, setDateType] = React.useState('from')
  const [visible, setVisible] = React.useState(false);

  const [documentAgree, setDocumentAgree] = React.useState({
    doc1: false,
    doc2: false,
  });
  const [payButtonDisabled, setPayButtonDisabled] = React.useState(true);

  React.useEffect(() => {
    initialize();
  }, [])

  React.useEffect(() => {
    setPayButtonDisabled(
      !(documentAgree.doc1 && documentAgree.doc2 && date.from !== '' && time !== '')
    )
  }, [documentAgree, date, time])

  const initialize = async () => {
    await getUserInfo();
    await getItemDetail();
    // setDate({ from: '2023-00-00' })
  }

  const getUserInfo = async () => {
    const data = await AsyncStorage.getItem('@User');
    if (typeof data === "string") setUserInfo(JSON.parse(data));
  }

  const getItemDetail = async () => {
    try {
      const data = await api.getProductInfo(id);
      setItemData(data);
    }
    catch (err){
      console.log(err)
    }
  }

  const agreeAll = () => {
    setDocumentAgree({
      doc1: true,
      doc2: true,
    });
  }

  const timeList = [
    {start: '09:00', end: '10:00'},
    {start: '11:00', end: '12:00'},
    {start: '13:00', end: '14:00'},
    {start: '15:00', end: '16:00'},
    {start: '17:00', end: '18:00'},
  ]

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={itemData?.company.name} />
      <ScrollView style={style.container}>
        <View>
          <Image source={{ uri: itemData?.pc_image_main }} resizeMode='cover' style={style.image}/>
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text></Text>
          <Text style={SECTION_HEADER_FONT}>
            {convertPrice(itemData?.pc_price)}
            &nbsp;
            <Text style={SECTION_COMMENT_FONT}>
              &nbsp;
              VAT | comment
            </Text>
          </Text>
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text style={[SECTION_HEADER_FONT, style.sectionHeader]}>예약자 정보</Text>
          <View style={{ marginTop: 20 }}>
            <MedicleInput style={style.input} label={<Text>예약자 성함</Text>} clearButton={false} value={userInfo?.name} editable={false} />
            <MedicleInput style={style.input} label={<Text>연락처</Text>} clearButton={false} value={userInfo?.phone} editable={false} />
            <MedicleInput style={style.input} label={<Text>이메일</Text>} clearButton={false} value={userInfo?.email} editable={false} />
            <MedicleInput style={style.input} label={<Text>예약 일자</Text>} clearButton={false} value={`${date.from} (${time})`} editable={false} />
            <MedicleInput style={style.input} label={<Text>요청사항</Text>} multiline={true} placeholder='치과 진료에 요청하실 내용을 작성해주세요.' />
          </View>
        </View>
        <View style={[style.itemDetailWrap, style.borderBottom]}>
          <Text style={[SECTION_HEADER_FONT, style.sectionHeader]}>판매자 정보</Text>
          <View style={{ marginTop: 20 }}>
            <MedicleInput style={style.input} label={<Text>상호명</Text>} clearButton={false} value={itemData?.company.name} editable={false} />
            <MedicleInput style={style.input} label={<Text>대표자명</Text>} clearButton={false} value={itemData?.company.ci_owner_name} editable={false} />
            <MedicleInput style={style.input} label={<Text>사업자번호</Text>} clearButton={false} value={itemData?.company.ci_trader_number} editable={false} />
            <MedicleInput style={style.input} label={<Text>소재지</Text>} clearButton={false} value={itemData?.company.ci_address} editable={false} />
            <MedicleInput style={style.input} label={<Text>연락처</Text>} clearButton={false} value={itemData?.company.ci_phone} editable={false} />
          </View>
        </View>
        <View style={style.itemDetailWrap}>
          <CustomCheckbox selected={(documentAgree.doc1 && documentAgree.doc2)} onPress={() => agreeAll()}>
            <Text style={[style.checkboxLabel, ALL_CHECK_FONT]}>약관 전체 동의하기</Text>
          </CustomCheckbox>
          <View style={style.hr} />
          <CustomCheckbox selected={documentAgree.doc1} style={style.checkbox} onPress={() => setDocumentAgree({ ...documentAgree, doc1: !documentAgree.doc1})}>
            <Text style={style.checkboxLabel}>[필수]개인정보 수집 동의</Text>
          </CustomCheckbox>
          <CustomCheckbox selected={documentAgree.doc2} style={style.checkbox} onPress={() => setDocumentAgree({ ...documentAgree, doc2: !documentAgree.doc2})}>
            <Text style={style.checkboxLabel}>[필수]개인정보 제공 동의</Text>
          </CustomCheckbox>
          <Text style={[RESERVE_COMMENT_FONT, style.reserveComment]}>예약 서비스 이용시 필요한 개인정보 수집 및 제3자 제공규정을 확인하였으며 이에 동의합니다.</Text>
        </View>
        <View style={style.itemDetailWrap}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <BoxDropShadow>
              <Text style={DATE_FONT}>{date.from} {time}</Text>
              <Text style={PRODUCT_FONT}>{itemData?.company.name}</Text>
              <Text>
                {itemData?.company.ci_address.split(' ')[0]}
                &nbsp;|&nbsp;
                {itemData?.company.ci_address.split(' ')[1]}</Text>
              <View style={style.hr} />
              <Row justify='space-between'>
                <Text>진료 항목</Text>
                <Text style={SECTION_HEADER_FONT}>{itemData?.pc_name} {convertPrice(itemData?.pc_price)}</Text>
              </Row>
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
          text='위시리스트' />
        <MedicleButton
          buttonStyle={[
            style.button,
            style.FAQButton,
          ]}
          onPress={() => navigation.navigate(Routes.HOSPITAL_CONTACT, {itemData: itemData})}
          textStyle={FAQ_BUTTON_FONT}
          text='진료 문의하기' />
        <MedicleButton
          buttonStyle={[
            style.button,
            style.PayButton,
          ]}
          onPress={() => navigation.navigate(Routes.HOSPITAL_PAYMENT, {itemData: itemData})}
          textStyle={PAY_BUTTON_FONT}
          disabled={payButtonDisabled}
          text='앱에서 결제하기' />
      </Row>
      <CustomModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        name='datePicker'
        modalDirection='center'
      >
        <View style={style.datePickerModal}>
          <Row justify='space-between' align='center' style={style.datePickerHeader}>
            <Text style={PRODUCT_FONT}>일정 선택</Text>
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
                        onPress={() => {
                          setTimeKey(key);
                          setTime(`${start} ~ ${end}`);
                        }}
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
