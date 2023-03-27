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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({
  navigation,
  route,
}) => {
  const { itemData } = route.params;
  const [userInfo, setUserInfo] = React.useState<any>();
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
  const DOCUMENT_HEADER_FONT = fontStyleCreator({
    size: 11,
    color: Colors.Medicle.Font.Gray.Standard,
  })

  React.useEffect(() => {
    initialize();
  }, [])

  const initialize = async () => {
    await getUserInfo();
  }

  const getUserInfo = async () => {
    const data = await AsyncStorage.getItem('@User');
    if (typeof data === "string") setUserInfo(JSON.parse(data));
  }

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title='진료 문의하기' />
      <ScrollView>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={SECTION_HEADER_FONT}>상품정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text style={[SECTION_HEADER_FONT, { marginTop: 15, }]}>
                {itemData?.company.name}
                &nbsp;-&nbsp;
                {itemData?.pc_name}
              </Text>
              <Text style={[SECTION_HEADER_FONT, { marginTop: 10, }]}>
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
              <Text style={[SECTION_HEADER_FONT, style.sectionHeader]}>예약자 정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <MedicleInput style={style.input} label={<Text>예약자 성함</Text>} clearButton={false} value={userInfo?.name} editable={false} />
              <MedicleInput style={style.input} label={<Text>연락처</Text>} clearButton={false} value={userInfo?.phone} editable={false} />
              <MedicleInput style={style.input} label={<Text>이메일</Text>} clearButton={false} value={userInfo?.email} editable={false} />
              <MedicleInput style={style.input} label={<Text>요청사항</Text>} multiline={true} placeholder='업체에 요청하실 내용을 작성해주세요.' />
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion>
            <Accordion.Header>
              <Text style={[SECTION_HEADER_FONT, style.sectionHeader]}>판매자 정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <MedicleInput style={style.input} label={<Text>상호명</Text>} clearButton={false} value={itemData?.company.name} editable={false} />
              <MedicleInput style={style.input} label={<Text>대표자명</Text>} clearButton={false} value={itemData?.company.ci_owner_name} editable={false} />
              <MedicleInput style={style.input} label={<Text>사업자번호</Text>} clearButton={false} value={itemData?.company.ci_trader_number} editable={false} />
              <MedicleInput style={style.input} label={<Text>소재지</Text>} clearButton={false} value={itemData?.company.ci_address} editable={false} />
              <MedicleInput style={style.input} label={<Text>연락처</Text>} clearButton={false} value={itemData?.company.ci_phone} editable={false} />
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={style.chargeWrap}>
          <Text style={DOCUMENT_HEADER_FONT}>회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.</Text>
          <View style={style.checkDocsWrap}>
            <CustomCheckbox style={style.checkDoc} selected={false}>
              <Text style={style.checkDocLabel}>
                개인정보 수집 및 이용 동의&nbsp;
                <Text style={style.detailText}>자세히</Text>
              </Text>
            </CustomCheckbox>
            <CustomCheckbox style={style.checkDoc} selected={false}>
              <Text style={style.checkDocLabel}>
                개인정보 제 3자 제공 동의&nbsp;
                <Text style={style.detailText}>자세히</Text>
              </Text>
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
