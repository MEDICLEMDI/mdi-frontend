import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import Accordion from '@/components/Accordion';
import api from '@/components/Api';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import {
  DARK_GRAY_BOLD_14,
  STANDARD_GRAY_10,
  STANDARD_GRAY_12,
} from '@/constants/theme';
import { convertPrice } from '@/utils/utilities';

import style from '../Hospital/style';
import { termsList } from '@/interfaces/sign';
import useCustomToast from '@/hooks/useToast';
import WebViewModal from '@/components/Modals/WebView';
import { handleGetTerms } from '@/utils/terms';
import LoadingModal from '@/components/LoadingModal';

export default ({ navigation, route }: any) => {
  const { itemData } = route.params;
  const [disabled, setDisabled] = React.useState(true); // 문의버튼 잠금,해제
  const [userInfo, setUserInfo] = React.useState<any>();
  const [comment, setComment] = React.useState(''); // 문의내용
  const { showToast } = useCustomToast();
  const [isTerms, setIsTerms] = React.useState(false); // 약관 url 받아오는게 성공했는지 확인
  const [webViewVisible, setWebViewVisible] = React.useState(false); // 약관 웹뷰모달
  const [webViewUrl, setWebViewUrl] = React.useState<string | undefined>( // 약관에 따른 웹뷰 url
    undefined
  );
  const [agrees, setAgrees] = React.useState({
    doc1: false,
    doc2: false,
  });

  const [terms, setTerms] = React.useState<termsList>({
    privacy: '',
    provision: '',
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    initialize();
  }, []);

  // 문의하기 버튼 잠금,해제 설정
  React.useEffect(() => {
    const commentCounter = comment.trim().length >= 10;
    const bool = agrees.doc1 && agrees.doc2 && commentCounter;
    setDisabled(!bool);
  }, [comment, agrees]);

  /**
   * 화면 초기화
   */
  const initialize = async () => {
    await getUserInfo();
    await initTerms();
  };

  /**
   * 필요약관 가져오기
   */
  const initTerms = async () => {
    const tempTerms = await handleGetTerms();
    if (tempTerms) {
      setTerms(tempTerms);
      setIsTerms(true);
    }
  };

  /**
   * 유저정보 가져오기
   */
  const getUserInfo = async () => {
    const data = await AsyncStorage.getItem('@User');
    if (typeof data === 'string') {
      setUserInfo(JSON.parse(data));
    }
  };

  /**
   * 문의 등록
   */
  const submit = async () => {
    setLoading(true);
    const data = {
      user_id: userInfo.id,
      company_id: itemData.company_id,
      product_id: itemData.product_id,
      cq_type: '진료문의',
      cq_title: `${itemData?.hospital_name} ${itemData?.product_name}`,
      cq_content: comment,
    };

    try {
      const res = await api.insertProductQA(data);
      if (res.result === true) {
        navigation.goBack();
        showToast('문의가 등록되었습니다.');
      } else {
        throw res.message;
      }
    } catch (err) {
      console.error(err);
      showToast('처리중 오류가 발생하였습니다.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 약관 상세보기 (웹뷰 모달)
   * @param url 
   */
  const handleViewDetail = (url: keyof termsList) => {
    setWebViewUrl(terms[url]);
    if (isTerms) {
      setWebViewVisible(true);
    } else {
      showToast('처리중 오류가 발생하였습니다.');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title="진료 문의하기" />
      <ScrollView>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={DARK_GRAY_BOLD_14}>상품정보</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text style={[DARK_GRAY_BOLD_14, { marginTop: 15 }]}>
                {itemData?.hospital_name}
                &nbsp;-&nbsp;
                {itemData?.product_name}
              </Text>
              <Text style={[DARK_GRAY_BOLD_14, { marginTop: 10 }]}>
                {convertPrice(itemData?.price)}
                &nbsp;
                <Text style={STANDARD_GRAY_10}>
                  &nbsp; VAT | 마취/사후관리비 포함
                </Text>
              </Text>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion isOpen={true}>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
                예약자 정보
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <MedicleInput
                style={style.input}
                label={<Text>예약자 성함</Text>}
                clearButton={false}
                value={userInfo?.name}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>연락처</Text>}
                clearButton={false}
                value={userInfo?.phone}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>이메일</Text>}
                clearButton={false}
                value={userInfo?.email}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>요청사항</Text>}
                multiline={true}
                placeholder="업체에 요청하실 내용을 작성해주세요."
                onChangeText={text => setComment(text)}
              />
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
                판매자 정보
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <MedicleInput
                style={style.input}
                label={<Text>상호명</Text>}
                clearButton={false}
                value={itemData?.hospital_name}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>대표자명</Text>}
                clearButton={false}
                value={itemData?.doctor_name}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>사업자번호</Text>}
                clearButton={false}
                value={itemData?.trader_number}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>소재지</Text>}
                clearButton={false}
                value={itemData?.hospital_address}
                editable={false}
              />
              <MedicleInput
                style={style.input}
                label={<Text>연락처</Text>}
                clearButton={false}
                value={itemData?.hospital_phone}
                editable={false}
              />
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={style.chargeWrap}>
          <Text style={STANDARD_GRAY_12}>
            회원 본인은 진료문의에 대한 해당 이용약관에 동의합니다.
          </Text>
          <View style={style.checkDocsWrap}>
          <View style={style.termBox}>
                <CustomCheckbox
                  style={style.checkDoc}
                  selected={agrees.doc1}
                  onPress={() =>
                    setAgrees({
                      ...agrees,
                      doc1: !agrees.doc1,
                    })
                  }>
                  <Text style={style.checkDocLabel}>
                    개인정보 수집 및 이용 동의
                  </Text>
                </CustomCheckbox>
                <TouchableOpacity onPress={() => handleViewDetail('privacy')}>
                  <Text style={style.detailText}>자세히</Text>
                </TouchableOpacity>
              </View>
              <View style={style.termBox}>
                <CustomCheckbox
                  style={style.checkDoc}
                  selected={agrees.doc2}
                  onPress={() =>
                    setAgrees({
                      ...agrees,
                      doc2: !agrees.doc2,
                    })
                  }>
                  <Text style={style.checkDocLabel}>
                    개인정보 제3자 제공 동의
                  </Text>
                </CustomCheckbox>
                <TouchableOpacity
                  onPress={() => {
                    handleViewDetail('provision');
                  }}>
                  <Text style={style.detailText}>자세히</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </ScrollView>
      <MedicleButton
        buttonStyle={{ height: 52 }}
        onPress={() => submit()}
        text="진료 문의하기"
        disabled={disabled}
      />
      <WebViewModal
        url={webViewUrl!}
        visible={webViewVisible}
        onClose={() => setWebViewVisible(false)}
      />
      <LoadingModal visible={loading} />
      
    </SafeAreaView>
  );
};
