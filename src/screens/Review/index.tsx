import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import Accordion from '@/components/Accordion';
import api from '@/components/Api';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';
import { convertPrice } from '@/utils/utilities';

import style from './style';
import useCustomToast from '@/hooks/useToast';
import LoadingModal from '@/components/LoadingModal';
import { IProductDetail, User } from '@/interfaces/api';

const Review = ({ navigation, route }: any) => {
  const { company_id, appointment_id, product_id, user_id } = route.params;

  const [productData, setProductData] = React.useState<IProductDetail>();
  const [userData, setUserData] = React.useState<User>();
  const [comment, setComment] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const { showToast } = useCustomToast();

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

  React.useEffect(() => {
    dataSetup();
  }, []);

  React.useEffect(() => {
    const lengthCheck = comment.trim().length > 10;
    setDisabled(!lengthCheck);
  }, [comment]);

  /**
   * 페이지 초기화
   */
  const dataSetup = async () => {
    await getProductDetail();
    await getUserData();
  };

  /**
   * 유저정보 가져오기
   */
  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('@User');
      setUserData(JSON.parse(user!));
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 상품의 상세정보 가져오기
   */
  const getProductDetail = async () => {
    try {
      const data = await api.getProductInfo(product_id);
      setProductData(data);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 리뷰 작성하기
   */
  const submit = async () => {
    setLoading(true);
    const request = {
      company_id: company_id,
      appointment_id: appointment_id,
      product_id: product_id,
      user_id: user_id,
      title: `${productData?.hospital_name} - ${productData?.product_name}`,
      comment: comment,
    };

    try {
      const data = await api.insertReview(request);
      if (data.result) {
        navigation.goBack();
        showToast('리뷰작성이 완료되었습니다.');
      }
    } catch (err) {
      console.error(err);
      showToast('처리중 오류가 발생하였습니다.');
    } finally {
      setLoading(false);
    }
  };

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
                <Text style={[REVIEW_HEADER_FONT, { marginBottom: 10 }]}>
                  {productData?.hospital_name} - {productData?.product_name}
                </Text>
                <Text style={REVIEW_HEADER_FONT}>
                  {convertPrice(productData?.price)}
                  &nbsp;
                  <Text style={REVIEW_HEADER_COMMENT}>
                    &nbsp; VAT | 마취/사후관리비 포함
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
                <MedicleInput
                  style={style.input}
                  label={<Text>예약자 성함</Text>}
                  editable={false}
                  clearButton={false}
                  value={userData?.name}
                />
                <MedicleInput
                  style={style.input}
                  label={<Text>연락처</Text>}
                  editable={false}
                  clearButton={false}
                  value={userData?.phone}
                />
                <MedicleInput
                  style={style.input}
                  label={<Text>이메일</Text>}
                  editable={false}
                  clearButton={false}
                  value={userData?.email}
                />
                <MedicleInput
                  style={style.input}
                  placeholder="업체에 대한 리뷰를 작성해주세요."
                  label={<Text>리뷰내용</Text>}
                  clearButton={false}
                  multiline={true}
                  onChangeText={t => setComment(t)}
                />
              </View>
            </Accordion.Body>
          </Accordion>
        </View>
      </ScrollView>
      <MedicleButton
        buttonStyle={style.button}
        text="리뷰 작성"
        onPress={() => submit()}
        disabled={disabled}
      />
      <LoadingModal visible={loading} />
    </SafeAreaView>
  );
};

export default Review;
