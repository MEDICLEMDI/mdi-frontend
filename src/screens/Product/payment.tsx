import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import Accordion from '@/components/Accordion';
import api from '@/components/Api';
import BoxDropShadow from '@/components/BoxDropShadow';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import RadioInput from '@/components/RadioInput';
import {
  DARK_GRAY_BOLD_14,
  LIGHT_GRAY_10,
  ORANGE_BOLD_12,
  ORANGE_BOLD_14,
  STANDARD_GRAY_10,
} from '@/constants/theme';
import Icon from '@/icons';
import { Row } from '@/layout';
import Routes from '@/navigation/Routes';
import { getStorageData } from '@/utils/localStorage';
import { convertNumberLocale, convertPrice } from '@/utils/utilities';
import IMP from 'iamport-react-native';

import style from '../Hospital/style';
import LoadingModal from '@/components/LoadingModal';
import useCustomToast from '@/hooks/useToast';
import { User } from '@/interfaces/api';
import WebViewModal from '@/components/Modals/WebView';
import { termsList } from '@/interfaces/sign';
import { handleGetTerms } from '@/utils/terms';
import { userRefresh } from '@/utils/userRefresh';

export default ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const { itemData, time } = route.params;
  const [radioIndex, setRadioIndex] = React.useState(0);
  const [payIndex, setPayIndex] = React.useState<Number>(0);
  const [visible, setVisible] = React.useState(false);
  const [payButtonDisabled, setPayButtonDisabled] = React.useState(true);
  const [user, setUser] = React.useState<User>();
  const [data, setData] = React.useState({});
  const [loading, setloading] = React.useState(false);
  const { showToast } = useCustomToast();
  const [isTerms, setIsTerms] = React.useState(false); // 약관 url 받아오는게 성공했는지 확인
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  const [webViewUrl, setWebViewUrl] = React.useState<string | undefined>(
    undefined
  );
  const [documentAgree, setDocumentAgree] = React.useState({
    doc1: false,
    doc2: false,
    doc3: false,
  });

  const [terms, setTerms] = React.useState<termsList>({
    privacy: '',
    provision: '',
    financial: '',
  });

  React.useEffect(() => {
    const initialize = async () => {
      const user_ = await userRefresh();
      setUser(user_);
      setVisible(false);
    };
    initialize();
    initTerms();
  }, []);

  // 각 상태 변경시 버튼 활성화 여부 처리
  React.useEffect(() => {
    const bool = buttonDisabledListener();
    setPayButtonDisabled(bool);
  }, [documentAgree, radioIndex, payIndex]);

  // 결제 선택 초기화
  React.useEffect(() => {
    setPayIndex(0);
  }, [radioIndex]);

  React.useEffect(() => {}, [terms]);

  /**
   * 약관 리스트 가져오기
   */
  const initTerms = async () => {
    const tempTerms = await handleGetTerms();
    if (tempTerms) {
      setTerms(tempTerms);
      setIsTerms(true);
    }
  };


  /**
   * 약관들 동의 체크박스 체크,해제에 따른 이벤트 리스터
   * @returns 
   */
  const buttonDisabledListener = () => {
    const agree = !(
      documentAgree.doc1 &&
      documentAgree.doc2 &&
      documentAgree.doc3
    );

    if (radioIndex === 1) return false;
    return agree;
  };

  /**
   * 결제 진행
   */
  const submit = async () => {
    let payment_method = radioIndex === 0 ? 'point' : 'pg';

    if (payment_method === 'point') await paymentPoint();
    else paymentPg();
  };

  /**
   * 포인트로 결제
   * 포인트로 결제하는 경우 별도의 결제 프로세스 없이 포인트 차감 후 결제 완료 처리를 진행
   * @returns 
   */
  const paymentPoint = async () => {
    setloading(true);
    if (Number(user?.mdi.mw_mdi_point) < Number(itemData?.discount_price)) {
      showToast('포인트가 부족합니다.');
      setloading(false);
      return;
    }

    const request = {
      payment_method: 'point',
      product_id: itemData.product_id,
      ua_date: time,
      user_id: user?.id,
    };

    try {
      const res = await api.productPayment(request);
      if (res.result) {
        navigation.dispatch([
          navigation.navigate({ name: Routes.MYPAGE }),
          navigation.navigate({ name: Routes.RECEIPT }),
        ]);
        showToast('결제가 완료되었습니다.')
      }
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  /**
   * pg결제
   */
  const paymentPg = async () => {
    // set pg pymentprepare
    setloading(true);
    try {
      // 현재 상품의 아이디를 기준으로 상품 가격을 PG 서버에 상품 금액을 사전등록
      // 사전등록된 상품의 금액과 결제 요청시 전송되는 상품의 금액이 다르면 결제 유효성 문제로 결제 실패
      const response = await api.setPaymentPrepare(itemData?.product_id);
      const { data } = response;
      const merchant_uid = data?.merchant_uid;
      if (response.result) {
        /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
        const data_ = {
          pg: 'tosspayments',
          pay_method: 'card',
          name: '메디클 테스트 결제',
          merchant_uid: merchant_uid,
          // amount: '1000',
          amount: itemData.discount_price,
          buyer_name: user?.name,
          buyer_tel: user?.phone,
          buyer_email: user?.email,
          buyer_addr: user?.address,
          buyer_postcode: user?.post_number,
          app_scheme: 'example',
          // [Deprecated v1.0.3]: m_redirect_url
        };
        setData(data_);
        setVisible(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  const callback = async (response: any) => {
    try {
      // 사용자가 뒤로가기 또는 결제 취소를 한 경우 결제 프로세스를 중단하고 결제 팝업을 닫음
      if (response.error_msg !== undefined) {
        setVisible(false);
        throw new Error(response.error_msg);
      }

      // 결제가 완료되면 넘어오는 callback을 포함하여 결제 데이터 저장
      // 결제 데이터는 결제중으로 처리되면 백엔드로 전송되는 webhook으로 결제 완료처리
      const { imp_uid, merchant_uid } = response;
      const request = {
        payment_method: 'pg',
        product_id: itemData.product_id, // 상품 아이디
        ua_date: time,
        user_id: user?.id,

        imp_uid: imp_uid, // 판매점 아이디
        merchant_uid: merchant_uid, // 결제 아이디
      };

      // pg 결제 성공 후 백엔드로 결제처리
      // 앱으로 콜백 되는 데이터는 백엔드와의 검증을 위해 결제중으로 저장
      const res = await api.productPayment(request);
      if (res.result) {
        navigation.dispatch([
          navigation.navigate({ name: Routes.MYPAGE }),
          navigation.navigate({ name: Routes.RECEIPT }),
        ]);
        showToast('결제가 완료되었습니다.')
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 약관 상세보기 클릭시 웹뷰모달
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
      <Header goBack={true} title={t('menus.reserve')} />
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
                {convertPrice(itemData?.discount_price)}
                &nbsp;
                <Text style={LIGHT_GRAY_10}>
                  &nbsp; VAT | 마취/사후관리비 포함
                </Text>
              </Text>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.borderBottom]}>
          <View style={[style.chargeWrap]}>
            <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
              결제 정보
            </Text>
            <RadioInput
              name="메디클 포인트 결제"
              index={0}
              selected={radioIndex === 0}
              response={setRadioIndex}
            />
            {radioIndex === 0 && (
              <BoxDropShadow style={{ paddingVertical: 35, marginBottom: 30 }}>
                <TouchableOpacity>
                  <Row justify="center" style={{ marginBottom: 25 }}>
                    <Icon name="mdiHorizontal" fill={'#000'} />
                    <Text
                      style={{
                        marginTop: -8,
                        marginLeft: 10,
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      Pay+
                    </Text>
                  </Row>
                  <Row justify="center">
                    <Text>메디클 포인트를 추가하고 빠르게 결제하세요!</Text>
                  </Row>
                </TouchableOpacity>
              </BoxDropShadow>
            )}
            <RadioInput
              name="일반 결제"
              index={1}
              selected={radioIndex === 1}
              response={setRadioIndex}
            />
            {radioIndex === 1 && (
              <BoxDropShadow style={{ marginBottom: 30, padding: 0 }}>
                <TouchableOpacity style={{ flex: 1, paddingVertical: 35 }}>
                  <Row justify="center">
                    <Text>일반 결제</Text>
                  </Row>
                </TouchableOpacity>
              </BoxDropShadow>
            )}
          </View>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Row justify="space-between" align="center">
            <Text>무이자/부분 무이자 할부 혜택 안내</Text>
            <Icon name="arrowRight" />
          </Row>
        </View>
        <View style={[style.borderBottom, style.chargeWrap]}>
          <Accordion>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14]}>환불 방법</Text>
            </Accordion.Header>
            <Accordion.Body>
              <Text>상품 예약시 약관</Text>
            </Accordion.Body>
          </Accordion>
        </View>
        <View style={[style.chargeWrap]}>
          <Accordion isOpen={true} style={style.totalPriceWrap}>
            <Accordion.Header>
              <Text style={[DARK_GRAY_BOLD_14, style.sectionHeader]}>
                최종 결제금액
              </Text>
            </Accordion.Header>
            <Accordion.Body>
              <View style={[style.totalWrap]}>
                <Text>상품 금액</Text>
                <Text style={DARK_GRAY_BOLD_14}>
                  {convertNumberLocale(itemData?.price)}
                </Text>
              </View>
              <View style={[style.totalWrap]}>
                <Text>할인 합계</Text>
                {itemData?.discount > 0 ? (
                  <Text style={DARK_GRAY_BOLD_14}>
                    <Text style={ORANGE_BOLD_12}>
                      {itemData.discount}% Sale
                    </Text>
                    &nbsp;&nbsp;
                    {convertNumberLocale(
                      itemData?.price - itemData?.discount_price
                    )}
                  </Text>
                ) : (
                  <Text>{convertNumberLocale(0)}</Text>
                )}
              </View>
              <View style={[style.totalWrap]}>
                <Text>결제 수수료</Text>
                <Text style={DARK_GRAY_BOLD_14}>0원</Text>
              </View>
            </Accordion.Body>
          </Accordion>

          <View style={[style.totalWrap]}>
            <Text style={ORANGE_BOLD_14}>결제 금액</Text>
            <Text style={DARK_GRAY_BOLD_14}>
              {convertNumberLocale(itemData?.discount_price)}
            </Text>
          </View>
          <Text />
        </View>
        {radioIndex === 0 && (
          <View style={style.chargeWrap}>
            <Text style={STANDARD_GRAY_10}>
              회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.
            </Text>
            <View style={style.checkDocsWrap}>
              <View style={style.termBox}>
                <CustomCheckbox
                  style={style.checkDoc}
                  selected={documentAgree.doc1}
                  onPress={() =>
                    setDocumentAgree({
                      ...documentAgree,
                      doc1: !documentAgree.doc1,
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
                  selected={documentAgree.doc2}
                  onPress={() =>
                    setDocumentAgree({
                      ...documentAgree,
                      doc2: !documentAgree.doc2,
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

              <View style={style.termBox}>
                <CustomCheckbox
                  style={style.checkDoc}
                  selected={documentAgree.doc3}
                  onPress={() =>
                    setDocumentAgree({
                      ...documentAgree,
                      doc3: !documentAgree.doc3,
                    })
                  }>
                  <Text style={style.checkDocLabel}>
                    전자금융거래 이용약관 동의
                  </Text>
                </CustomCheckbox>
                <TouchableOpacity onPress={() => handleViewDetail('financial')}>
                  <Text style={style.detailText}>자세히</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        )}
      </ScrollView>
      <WebViewModal
        url={webViewUrl!}
        visible={webViewVisible}
        onClose={() => setWebViewVisible(false)}
      />

      <MedicleButton
        buttonStyle={{ height: 52 }}
        onPress={() => submit()}
        textStyle={DARK_GRAY_BOLD_14}
        text={convertNumberLocale(itemData?.discount_price) + ' 결제하기'}
        disabled={payButtonDisabled}
      />
      <Modal animationType="slide" visible={visible} transparent={false}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <IMP.Payment
              userCode={'imp01464551'} // 가맹점 식별코드
              // tierCode={'AAA'}      // 티어 코드: agency 기능 사용자에 한함
              loading={<ActivityIndicator />} // 로딩 컴포넌트
              data={data} // 결제 데이터
              callback={callback} // 결제 종료 후 콜백
            />
          </View>
        </SafeAreaView>
      </Modal>
      <LoadingModal visible={loading} />
      
    </SafeAreaView>
  );
};
